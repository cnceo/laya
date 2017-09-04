/**
 * 2017 05 03
 * 斗地主玩家类
 */

var FLPlayerView = (function (_super)
{
    Laya.class(FLPlayerView,"FLPlayerView",_super);
   
    function FLPlayerView()
    {
        FLPlayerView.__super.call(this);

        this.OutPutCards = [];
        this.ShowCardCountforOneLine = 11;
        this.outputType = '';
        this.bDeposit = false;
        this.bShowCards = false;
        this.createCardNumTxt = function()
        {
            if( this.cardNumTxt )
                return;
            this.cardNumTxt = new Text();
            this.cardNumTxt.text = "0";
            this.cardNumTxt.fontSize = 50;
            this.cardNumTxt.font = 'impact';
            this.cardNumTxt.color = GameData.getInstance().COLOR.YELLOW; 
            this.cardNumTxt.visible = false;
            this.addChild( this.cardNumTxt );
        }

        this.hideCardsNum = function()
        {
            if( this.isLocalPlayer || !this.cardNumTxt )
                return;
            this.cardNumTxt.visible = false;    
        }
    }

    var __proto = FLPlayerView.prototype;

    //手上的牌
    __proto.getCards = function()
    {
        return this.cards;
    }

    __proto.getOutputType = function()
    {
        return this.outputType;
    }
    __proto.getOutPutCards = function()
    {
        return this.OutPutCards;
    }
    __proto.showRobot = function()
    {
        this.robot.visible = true;
        var img = this.robot.getChildByName('workImage');
        img.dataSource = {skin:'fightLandlordRoom/robotOn.png'};
    }
    __proto.hideRobot = function()
    {
        this.robot.visible = false;
        var eff = this.robot.getChildByName('work');
        Tween.clearAll( eff );
        eff.visible = false;
        this.removeDepositMask();
    }
    __proto.init = function( data,isLocalPlayer,isDemo )
    {
        this.disabled = false;
        this.setPos(data.userPos);
        this.isLocalPlayer = isLocalPlayer;
        this.setPlayerState( data.state );
        this.setPlayerMoney(data.money);
        this.Speak.visible = false;
        this.setPlayerName(data.name);
        this.countdown.setDirection(this.cardDir == "RIGHT" ? 1 : 0 );
        this.setVip(data.vip || 1);
        this.setIcon(data.headP);
        this.setDemo(isDemo);
        this.initRobot();
        if(this._boxDisconnect && this._boxDisconnect.getChildByName('clock'))
        {
            this._boxDisconnect.getChildByName('clock').setDirection(this.cardDir == "RIGHT" ? 1 : 0);
        }

        if( data.hasOwnProperty( 'bShowCards' ) && data.bShowCards )
        {
            this.bShowCards = true;
        }

        //进入房间的时候 作为观众 直接显示其他玩家的牌
        if( data.hasOwnProperty( 'cards' ) )
        {
            data.cards.reverse();
            for( var i = 0;i < data.cards.length;i++ )
            {
                this.addCard( data.cards[i],0,0,false,null,false );
                if( this.bShowCards && this.cardDir == "RIGHT" )
                {   //明牌的时候 调整显示层次
                    this.cards[i].zOrder = data.cards.length - i;
                }
            }
            this.addCardListener();
            this.showCardNum();
        }

        this.initPlayerBg(1);

        if( data.hasOwnProperty( 'isLandlord' ) && data.isLandlord == 1 )//是地主
        {
            this.LFlg.visible = true;
        }

        this.setActionCountdown( data );

        if( !this.isLocalPlayer && data.hasOwnProperty('discTime') && data.discTime > 0 ) //大于0代表断线中，剩余的断线等待时间，毫秒
        {
            if(data.discTime > GameData.getInstance().discTime) GameData.getInstance().discTime = data.discTime;
            this.showDisconnect( data.discTime );
        }

        if( data.hasOwnProperty( 'bDeposit' ) )//托管
        {
            this.showDeposit( data.bDeposit == 1 );
        }

        if( data.hasOwnProperty( 'curOutputResultType' ) )
        {
            this.outputType = data.curOutputResultType;
        }

        if( this.bShowCards )
        {
            this.showCardFlg();
            this.hideCardsNum();
        }
    }

    __proto.showDeposit = function( _show )
    {
        this.bDeposit = _show;
        if( !this.isLocalPlayer )
        {
            this.robot.visible = _show;
        }else
        {
            var img = this.robot.getChildByName('workImage');
            if( _show )
            {
                img.dataSource = {skin:'fightLandlordRoom/robotOff.png'};
                this.createDepositMask();
            }else
            {
                img.dataSource = {skin:'fightLandlordRoom/robotOn.png'};
                this.removeDepositMask();
            }

            //正式玩的时候 才显示托管按钮
            if( FLRoomMgr.getInstance().GetCurRoom().GetRoomState() == FLRoomMgr.getInstance().flRoomState.eActionBegin )
            {
                this.robot.visible = true;
            } 
        }
        var eff = this.robot.getChildByName('work');
        Tween.clearAll( eff );
        eff.visible = _show;       
        if( _show )
        {   
            eff.alpha = 1;
            this.robotFadeout();
        }
    }

    __proto.removeDepositMask = function()
    {
        if( this.depositMask )
        {
            this.removeChild( this.depositMask );
            this.depositMask.destroy();
            this.depositMask = null;
        }
    }

    __proto.createDepositMask = function()
    {
        this.depositMask = new laya.ui.Image('fightLandlordRoom/maskOpenCard.png');
        var depositingImg = new laya.ui.Image('fightLandlordRoom/depositing.png'); 
        depositingImg.name = 'depositingImg';
        this.depositMask.addChild( depositingImg );

        this.depositMask.mouseEnabled = true;
        this.depositMask.sizeGrid='22,35,43,35';
        this.updateDepositMaskSize();
        this.addChild( this.depositMask );
    }

    __proto.updateDepositMaskSize = function()
    {
        if( !this.isLocalPlayer || !this.bDeposit )
            return;
        CLog.log("this.isLocalPlayer = " + this.isLocalPlayer + " this.bDeposit = " + this.bDeposit);
        if( !this.depositMask || this.cards.length == 0 )
            return;
        this.depositMask.x = this.cards[0].x - (this.cards[0].width >> 1) + 5;
        this.depositMask.y = this.cards[0].y;    
        this.depositMask.width  = this.cards[ this.cards.length - 1 ].x - this.depositMask.x + (this.cards[0].width >> 1) - 5;
        this.depositMask.height = this.cards[0].height - 20;
        this.depositMask.zOrder = this.cards[ this.cards.length - 1 ].zOrder + 1;

        var depositingImg = this.depositMask.getChildByName('depositingImg');
        depositingImg.x = (this.depositMask.width - depositingImg.width) >> 1;
        depositingImg.y = this.depositMask.y + 100;
    }

    __proto.hideDisconnect = function()
    {
        _super.prototype.hideDisconnect.call(this);
        if( this.bDeposit )
        {
            this.showDeposit( true );
        }
    }

    __proto.robotFadeout = function()
    {
        Tween.to( this.robot.getChildByName('work'),{alpha:0.3},1000,null,Handler.create(this,this.robotFadein));
    }

    __proto.robotFadein = function()
    {
        Tween.to( this.robot.getChildByName('work'),{alpha:1},1000,null,Handler.create(this,this.robotFadeout));
    }

    __proto.resetCardPos = function()
    {
        var len = this.cards.length;
        for( var i = 0;i < len;i++ )
        {
            this.cards[i].resetPos();
        }
    }

    __proto.isLandlord = function()
    {
        return this.LFlg.visible;
    }

    //设置行动倒计时
    __proto.setActionCountdown = function( data )
    {
        var isAction = data.hasOwnProperty('isAction') ? data.isAction : false;
        if( isAction && data.hasOwnProperty('actionTime') )
        {
            this.setCountdown( data.actionTime,FLRoomMgr.getInstance().GetCurRoom().GetRoomState(),data );
        }else
        {
            if( data.hasOwnProperty('outputcards') )
            {
                this.showOutputCards( data.outputcards );
            }else if( this.getPlayerState() == 'ePlaying' && 
                      FLRoomMgr.getInstance().GetCurRoom().GetRoomState() == FLRoomMgr.getInstance().flRoomState.eActionBegin  )
            {
                this.cllLev.dataSource = {skin:'fightLandlordRoom/passBtn.png'};
                this.cllLev.visible = true;
            }
        }
    }

    /**
     * 转换数值 A 2转换成14 15 
     */
    __proto.conversionValue = function( _value )
    {
        _value = parseInt( _value );
        if( _value == 1 || _value == 2 )
        {
            _value = _value + 13;
        }
        return _value;
    }

    __proto.outPutCardAction = function( data )
    {
        this.removeOutPutCards();
        this.setCLLLev(false);
        this.setCountdown(data.actionTime,FLRoomMgr.getInstance().flRoomState.eActionBegin,data);
    }

    __proto.setCLLLev = function( _value )
    {
        this.cllLev.visible = _value;
    }

    //添加地主底牌
    __proto.addBaseCards = function( _cards )
    {
        this.LFlg.visible = true;
        if( this.isLocalPlayer )
        {
            this.addLocalPlayerBaseCards( _cards );
        }else
        {
            this.addOtherPlayerBaseCards( _cards );
        }
    }

    //添加其他玩家底牌
    __proto.addOtherPlayerBaseCards = function( _cards )
    {
        if( this.bShowCards )
        {
            var t_p = [];
            for( var i = 0;i < this.cards.length;i++ )
            {
                var card = this.cards[i];
                t_p.push( { suit:card.getType(),num:(card.getNum() == 14 || card.getNum() == 15 ? card.getNum() - 13 : card.getNum()) } );
            }

            for( var i = 0;i < _cards.length;i++ )
            {
                var addC = _cards[i];
                for( var j = 0;j < t_p.length;j++ )
                {
                    var addNum = this.conversionValue( addC.num );
                    var num    = this.conversionValue( t_p[j].num );
                    if( addNum > num || (j+1 == t_p.length) )
                    {
                        if(j+1 == t_p.length && addNum <= num)
                            t_p.push( addC ); 
                        else 
                            t_p.splice(j,0,addC);
                        break;
                    }
                }
            }

            this.removeHandCards();
            for( var i = 0;i < t_p.length;i++ )
            {
                this.addCard( t_p[i],0,0,false,null,false );
                if( this.cardDir == "RIGHT" )
                {   //明牌的时候 调整显示层次
                    this.cards[i].zOrder = t_p.length - i;
                }
            }
        }else
        {
            for( var i = 0;i < _cards.length;i++ )
            {
                this.addCard( {},0,0,false,null,false );
            }
            this.showCardNum();
        }
    }

    //添加本地玩家底牌
    __proto.addLocalPlayerBaseCards = function( _cards )
    {
        var Y = this.cards[0].y;//记录原始的Y位置
        for( var i = 0;i < _cards.length;i++ )
        {
            var addC = _cards[i];
            for( var j = 0;j < this.cards.length;j++ )
            {
                var card = this.cards[j];
                var addNum = this.conversionValue( addC.num );
                var num    = this.conversionValue( card.getNum() );
                if( addNum > num || (j+1 == this.cards.length) )//或者是 和最后一张牌一样大
                {
                    var t_node = null;
                    t_node = Factory.getInstance().createObj('FLCard',FLCard);
                    //t_node.zOrder = data.cardPos;
                    t_node.init();
                    t_node.setNum(addNum);
                    t_node.setType( addC.suit );
                    t_node.setPos(card.cardPos);
                    var index = this.getChildIndex( card );
                    (j+1 == this.cards.length) ? this.addChild( t_node ) : this.addChildAt( t_node,index );
                    //console.log("card index = " + this.getChildIndex(card)+" t_node index " + this.getChildIndex( t_node ));
                    var cardName = addC.suit.toLowerCase() +'s_'+ addC.num;
                    //大小王
                    if( addC.num == 16 || addC.num == 17 )
                    {
                        cardName = addC.num;
                    }
                    t_node.setImage( "card/card_"+cardName+".png" );
                    t_node.x = this.cards[j].x;
                    t_node.y = Y - t_node.getJumpY();
                    t_node.cardMoveEndPos = {};
                    t_node.cardMoveEndPos.y = Y;
                    t_node.scaleX = t_node.scaleY = this.localPlayerScale;
                    t_node.moveDuration = 1000;
                    t_node.onMouseDownCallback = Handler.create(this,this.onCardMouseDown,[t_node],false);
                    (j+1 == this.cards.length && addNum <= num) ? this.cards.push( t_node ) : this.cards.splice(j,0,t_node);
                    //this.cards.splice(j,0,t_node);
                    t_node.baseCardMove();
                    t_node.addClickListener();
                    break;
                }
            }
        }
        this.modifyCardPos();
        this.showCardFlg();
    }

    //重新修正卡牌位置
    __proto.modifyCardPos = function()
    {
        var x = this.cards[0].x;
        this.cards[0].zOrder = 0;
        var len = this.cards.length;
        for( var i = 1;i < len;i++ )
        {
            var card = this.cards[i];
            card.zOrder = i;
            card.x = x + this.localPlayerCardSpacing * 2;
            x = card.x;
        }
    }

    //叫地主
    __proto.callLandlord = function( data )
    {
        this.hideCountdown();
        this.playCallLandlord(data);
        if( data.callLandlordLv == 3 )//如果是地主就不显示
        {
            SoundManager.playSound('audio/fightLandlord/eff_sanfen.mp3');
            //SoundTool.getInstance().PlayGameSound( 'sanfen',this.getSex(),'fightLandlord/' );
            return;
        }
        this.cllLev.dataSource = {skin:'fightLandlordRoom/landlord_'+data.callLandlordLv+'.png'};
        this.cllLev.visible = true;
    }

    __proto.playCallLandlord = function( data )
    {
        var soundName = '';
        switch( data.callLandlordLv )
        {
            case 0:
                soundName = 'bujiao';
                break;
            case 1:
                soundName = 'yifen';
                break;
            case 2:
                soundName = 'liangfen';
                break;   
            case 3:
                soundName = 'sanfen';
                break;                                             
        }
        SoundTool.getInstance().PlayGameSound( soundName,this.getSex(),'fightLandlord/' );
    }

    //获得玩家准备出的牌
    __proto.getLocalPlayerOutPutCardsList = function()
    {
        var len = this.cards.length;
        var cards = [];
        for( var i = 0;i < len;i++ )
        {
            var card = this.cards[i];
            if( card.IsSelect() )
            {
                cards.push( {cardPos:0,suit:card.getType(),num:card.getNum()} );
            }
        }
        return cards;
    }

    //下注CD 显示
    __proto.setCountdown = function( time ,rState,data)
    {
        if(this.isDisconnect()) return;
        this.countdown.visible = true; 

        var tTotal = 0;
        if( FLRoomMgr.getInstance().IsCallLandlord( rState ) )
        {
            tTotal = FLRoomMgr.getInstance().GetCurRoom().GetRoomCallLandActionTime();//叫地主阶段的行动总时间
        }else if( FLRoomMgr.getInstance().IsActionBegin( rState ) )
        {
            tTotal = FLRoomMgr.getInstance().GetCurRoom().GetRoomActionTime();//出牌阶段的行动总时间
        }

        if( data && ( (data.hasOwnProperty('bFstOutPut') && data.bFstOutPut == 1) || (data.hasOwnProperty('isFstOutput') && data.isFstOutput == 1) ) )
        {
            this.bFstOutPut = true;
        }else
        {
            this.bFstOutPut = false;
        }

        var clockParam = 
        {
            timeAction : time,
            timeTotal : tTotal,
            callback : this.countdownFinish,
            targetObj : this,
            playAudio : [8,4],
            playTick : true,
            warningTk : [6],
        }

        this.countdown.startTimer(clockParam);
    }

    //添加卡牌监听
    __proto.addCardListener = function()
    {
        if( !this.isLocalPlayer )
            return;
        //发完牌之后再添加点击事件
        for( var i = 0;i < this.cards.length;i++ )
        {
            var card = this.cards[i];
            card.addClickListener();
        }
    }

        //删除卡牌监听事件
    __proto.removeCardListener = function()
    {
        if( !this.isLocalPlayer )
            return;
        //发完牌之后再添加点击事件
        for( var i = 0;i < this.cards.length;i++ )
        {
            var card = this.cards[i];
            card.removeListener();
        }
    }

    //游戏结束后 显示手上的牌
    __proto.onGameOver = function( cards )
    {   
        this.bShowCards = false;
        this.bDeposit = false;
        this.hideRobot();
        if( this.isLocalPlayer )
        {
            this.removeCardListener();
            this.removeShowCardFlg();
            return;
        }
        //清除掉以前的牌    

        //this.removeOutPutCards();
        this.hideCountdown(); 
        this.hideCardsNum();
        if( !this.bShowCards ) //明牌的时候 牌本来就显示的 不做处理
        {
            this.removeHandCards();
            this.showResidueCards( cards );
        }
    }

    //显示玩家剩余的牌
    __proto.showResidueCards = function( cards )
    {
        if( !cards )
            return;
        cards.reverse();    
        var len = cards.length;
        var startPos = this.WIDTH - 58 - ( len > this.ShowCardCountforOneLine ? this.ShowCardCountforOneLine - 1 : len - 1 ) * 30;
        for( var i = 0;i < len;i++ )
        {
            var card = cards[i];
            var t_node = Factory.getInstance().createObj('FLCard',FLCard);
            t_node.init();
            t_node.setNum(this.conversionValue(card.num));
            t_node.setType( card.suit );
            t_node.scaleX = t_node.scaleY = 0.4;
            t_node.zOrder = i;
            this.addChild( t_node );

            var t_x = 0;
            var t_y = 0;
            if( this.cardDir == 'RIGHT' )
            {
                t_x = startPos + (this.cards.length % this.ShowCardCountforOneLine) * 30;
                t_y = 200 + parseInt(this.cards.length / this.ShowCardCountforOneLine) * 60;
            }else
            {
                t_x = 32 + (this.cards.length % this.ShowCardCountforOneLine) * 30;
                t_y = 200 + parseInt(this.cards.length / this.ShowCardCountforOneLine) * 60;
            }
            t_node.x = t_x;
            t_node.y = t_y;
            var cardName = card.suit.toLowerCase() +'s_'+ card.num;
            if( card.num == 16 || card.num == 17 )
            {
                cardName = card.num;
            }
            t_node.setImage( "card/card_"+cardName+".png" );
            this.cards.push( t_node );
        }
    }

    //添加发牌
    __proto.addCard = function( data,delayTime,moveDuration,lastCard,callBackObj,isFly )
    {
        //if(this.getPos() == -1) return;
        this.moveCards(delayTime,moveDuration,isFly);

        var card = data;
        var cardType = '';
        var cardNum = 0;
        var cardName = 'back';
        if( card.hasOwnProperty('suit') )
            cardType = card.suit;
        if( card.hasOwnProperty('num') )
            cardNum = card.num;   
        
        cardType !=='' && cardNum !=0 && (cardName = cardType.toLowerCase() +'s_'+ cardNum);
        //大小王
        if( cardNum == 16 || cardNum == 17 )
        {
            cardName = cardNum;
        }

        this.localPlayerScale = 0.9;//本地卡牌缩放比例
        this.otherPlayerScale = 0.4;//其他玩家卡牌缩放比例
        this.localPlayerCardSpacing = 30 * this.localPlayerScale;


        var t_node   = null;
        t_node = Factory.getInstance().createObj('FLCard',FLCard);
        t_node.zOrder = this.cards.length;
        t_node.init();
        t_node.setNum( this.conversionValue(cardNum) );
        t_node.setType(cardType);
        t_node.setPos(card.cardPos);
        this.addChild( t_node ); 
        if( this.isLocalPlayer )
        {
            t_node.cardMoveEndPos = this.globalToLocal( new Point(((GameData.getInstance().SCENE_WIDTH) >> 1) + 
            (this.cards.length) * this.localPlayerCardSpacing,700)  );
            t_node.cardEndScale = this.localPlayerScale;
            t_node.onMouseDownCallback = Handler.create(this,this.onCardMouseDown,[t_node],false);
        }else if( this.cardDir == 'RIGHT' )
        {
            var x = this.WIDTH - 55 - (this.cards.length % this.ShowCardCountforOneLine) * 30;
            var y = 200 + parseInt(this.cards.length / this.ShowCardCountforOneLine) * 90;
            t_node.cardMoveEndPos = new Point(x,y);
            t_node.cardEndScale = this.otherPlayerScale;
        }else
        {
            var x = 32 + (this.cards.length % this.ShowCardCountforOneLine) * 30;
            var y = 200 + parseInt(this.cards.length / this.ShowCardCountforOneLine) * 90;
            t_node.cardMoveEndPos = new Point( x ,y );
            t_node.cardEndScale = this.otherPlayerScale;
        }

        t_node.setPlaySound( !this.isLocalPlayer );
        t_node.delayTime = delayTime;
        t_node.moveDuration = moveDuration;
        t_node.lastCard = lastCard;
        t_node.callBackObj = callBackObj;
        t_node.isFly = isFly;
        var pos = this.globalToLocal( new Point(this.pokerDealerPos.x,this.pokerDealerPos.y) );
        
        t_node.pos( pos.x,pos.y ); 
        
        t_node.cardNum = cardNum == 1 ? 999 : cardNum;
        this.cards.push( t_node );

        t_node.setImage( "card/card_"+cardName+".png" );
        t_node.handout();
    }
    __proto.onCardMouseDown = function(e)
    {
        Laya.stage.on( Event.MOUSE_MOVE,this,this.onMouseMove );
        Laya.stage.on( Event.MOUSE_OUT,this,this.onMouseUp );
        Laya.stage.on( Event.MOUSE_UP,this,this.onMouseUp );

        this.startClickPos = new Point( e.parent.mouseX,e.parent.mouseY );
        this.startIndex = this.cards.indexOf( e );
        this.selMin = this.startIndex;
        this.selmax = 0;
    }

    __proto.onMouseUp = function( e )
    {
        Laya.stage.off( Event.MOUSE_MOVE,this,this.onMouseMove );
        Laya.stage.off( Event.MOUSE_OUT,this,this.onMouseUp );
        Laya.stage.off( Event.MOUSE_UP,this,this.onMouseUp );

        this.checkSelect();
    }

    __proto.checkSelect = function()
    {
        var len = this.cards.length;
        for( var i = 0;i < len;i++ )
        {
            this.cards[i].checkSelect();
        }
    }

    //鼠标移动
    __proto.onMouseMove = function( e )
    {
        var eIndex = this.cards.indexOf( e.target );
        var startPos = new Point(0,0);
        var endPos   = new Point(0,0);

        if( this.startClickPos.x > this.mouseX )
        {
            startPos.x = this.mouseX;
            endPos.x   = this.startClickPos.x;
        }else
        {
            startPos.x = this.startClickPos.x;
            endPos.x   = this.mouseX;
        }

        if( this.startClickPos.y > this.mouseY )
        {
            startPos.y = this.mouseY;
            endPos.y   = this.startClickPos.y;
        }else
        {
            startPos.y = this.startClickPos.y;
            endPos.y   = this.mouseY;
        }

        this.selectRect = new Rectangle( startPos.x,startPos.y,endPos.x - startPos.x,Math.abs(endPos.y - startPos.y) );

        if( eIndex >= 0 ) //在卡牌上移动
        {
            var sIndex = this.startIndex;
            if( eIndex - this.startIndex <= 0 ) //判断是正选还是反选
            {
                var temp = eIndex;
                eIndex = this.startIndex;
                sIndex = temp;
            }

            this.selMin = sIndex <= this.selMin ? sIndex : this.selMin;
            this.selmax = eIndex >= this.selmax ? eIndex : this.selmax;
            // CLog.log( 'sIndex = ' + sIndex + ' eIndex = ' + eIndex );
            // CLog.log( 'this.selMin = ' + this.selMin + ' this.selmax = ' + this.selmax );
        }

        var card = this.cards[0];
        if( !card ) return;

        var len = this.cards.length;
        var cWidth  = card.hitArea.width * card.scaleX;
        var cHalfW  = cWidth / 2; //X的锚点在牌的中间
        var cHeight = card.hitArea.height * card.scaleY;
        for( var i = this.selMin;i <= this.selmax;i++ )
        {
            card = this.cards[i];            
            if( i < sIndex )
            {
                card.showSelectEffect( false );
                continue;
            }
            var cardRect = new Rectangle( card.x - cHalfW,card.y + card.hitArea.y,cWidth,cHeight );
            if( cardRect.intersects( this.selectRect ) )
            {
                card.showSelectEffect( true );
            }else
            {
                card.showSelectEffect( false );
            }
        }
    }

    //发牌前的移动
    __proto.moveCards = function( delayTime,moveDuration,isFly )
    {
        if( this.isLocalPlayer ) //本地玩家才会在发牌时移动
        {
            for( var i = 0; i < this.cards.length;i++ ) //现有的牌往左边移
            {
                var transPos = this.localPlayerCardSpacing;
                if( isFly )
                {
                    var t_node = this.cards[i];
                    var task = new TaskDelay();
                    task.data = {pos:transPos,moveDuration:moveDuration};
                    task.callBack = t_node.moveCard;
                    task.classObj = t_node;
                    task.leftTime = delayTime;
                    TaskDelayManager.getInstance().addTask( task );               
                }else 
                {
                    this.cards[i].x -= transPos;
                }
            }
        }
    }

    //初始化
    __proto.initData = function()
    {
        _super.prototype.initData.call(this);

        this.Speak = this.getChildByName('Speak');
        this.LFlg = this.getChildByName('LFlg');
        this.countdown = this.getChildByName( 'countdown' );
        this.bg = this.getChildByName( 'bg' );
        this.cllLev = this.getChildByName('cllLev');
        this.robot = this.getChildByName('robot');

        this.cllLev.visible = false;
        this.Speak.visible  = false;
        this.LFlg.visible   = false;
        this.robot.visible  = false;
        this.countdown.visible  = false;

        this.initPlayerBg( 0.5 );

        this.WIDTH  = this.width;
        this.HEIGHT = this.height;
        this.currentScene = Game.getInstance().currentScene;
        var lPos = new Point(this.currentScene.pokerDealer.x + (this.currentScene.pokerDealer.width>>1),this.currentScene.pokerDealer.y + this.currentScene.pokerDealer.height);
        var gPos = this.currentScene.pokerDealer.localToGlobal(lPos);
        this.pokerDealerPos = gPos;

        Game.getInstance().addUpdate( {callback:this.update,caller:this} );
        this.registerListener();    
    }

    __proto.initRobot = function()
    {
        //this.robot.visible = (this.getPlayerState() == 'ePlaying');
        if( this.isLocalPlayer )
        {
            this.robot.on( Event.CLICK,this,this.onRobot );
        }
    }

    __proto.onRobot = function()
    {
        NetManager.GameClintInstance.CG_FIGHTLANDLORD_SHOWCARDS_DEPOSIT_REQ( FLRoomMgr.getInstance().showCards_Deposit.Deposit );
    }

    //明牌标签
    __proto.showCardFlg = function()
    {
        if( !this.bShowCards || !this.isLocalPlayer) 
            return;
        if( this.cards.length == 0 )
            return;
        if( this.showCardFlgImg == null )
        {
            this.showCardFlgImg = new laya.ui.Image('fightLandlordRoom/showcard.png');
            //this.showCardFlgImg.zOrder = this.cards.length;
            //this.addChild( this.showCardFlgImg );
        }
        this.showCardFlgImg.removeSelf();
        this.cards[ this.cards.length - 1 ].addChild( this.showCardFlgImg );
        this.showCardFlgImg.visible = true;
        this.showCardFlgImg.x = 76;
        this.showCardFlgImg.y = -1;
        this.showCardFlgImg.zOrder = 100;
    }

    //明牌或者是托管
    __proto.ShowCards_Deposit = function( content )
    {
        if( content.type == FLRoomMgr.getInstance().showCards_Deposit.showCards )//明牌
        {
            SoundTool.getInstance().PlayGameSound( 'mingpai',this.getSex(),'fightLandlord/' );
            if( !content.hasOwnProperty('cards') )
                return;
            this.bShowCards = true;
            if( this.isLocalPlayer )
            {
                this.showCardFlg();
                return;
            }
                
            if( content.cards.length != this.cards.length )
            {
                CLog.log('Error ShowCards data.length = ' + content.cards.length + ' cards.length = ' + this.cards.length);
                return;
            }
            content.cards.reverse();
            for( var i = 0;i < content.cards.length && this.cards.length;i++ )
            {
                var addC = content.cards[i];
                var addNum = this.conversionValue( addC.num );

                var card = this.cards[i];
                card.setNum(addNum);
                card.setType( addC.suit );
                var cardName = addC.suit.toLowerCase() +'s_'+ addC.num;
                //大小王
                if( addC.num == 16 || addC.num == 17 )
                {
                    cardName = addC.num;
                }
                card.setImage( "card/card_"+cardName+".png" );
                if( this.cardDir == 'RIGHT' )
                {
                    card.zOrder = this.cards.length - i;
                }
            }
            this.hideCardsNum();
        }else if( content.type == FLRoomMgr.getInstance().showCards_Deposit.Deposit )//托管
        {
            var t_bDeposit = content.val == 1;
            this.showDeposit( t_bDeposit );
            t_bDeposit && SoundManager.playSound('audio/fightLandlord/eff_tuoguan.mp3');
        }
    }
    
    __proto.update = function(){
        if(!this.isUpdate) return;
        this.rollMoney();
    }
    
    __proto.initPlayerBg = function(alpha)
    {
        this.bg.alpha = alpha;
    }

     //重置数据
    __proto.reset = function( _isRemove )
    {
        if( this.getPos() === -1 )
            return;
        this.correctMoney();

        if( _isRemove )
        {
            this.initIcon();
            
            this.setPlayerName( '' );
            this.setPlayerMoney(-1);
            //this.setPlayerState('');
            this.initVIP();
            //this.initFCP();
            //this.initPlayerBg('common/chessgame/normal.png');
            this.initPlayerBg(0.5);
            this.Speak.visible = false;
            this.setPos(-1);  
            //this.seatNum.text = ""; 
            //this.seatNum.parent.visible = false;
            this.setCLLLev( false );
            this.hideDisconnect(); 
            this.hideRobot();
            this.LFlg.visible = false;
            TaskDelayManager.getInstance().clearTarget(this);
        }else
        {
            this.setPlayerState('eWatching');
        }
    }

    //删除手上的牌
    __proto.removeHandCards = function()
    {
        for( var i = 0;i < this.cards.length;i++ )
        {
            this.removeCard( this.cards[i] );
            this.cards[i] = null;
        }
        this.cards = [];
    }

    __proto.clear = function()
    {
        // if( this.getPos() === -1 )
        //     return;

        this.removeHandCards();
        this.removeOutPutCards();
        this.hideCountdown(); 
        this.hideCardsNum();
        this.cllLev.visible = false;      
        this.LFlg.visible   = false;
        this.bShowCards = false;
        this.removeShowCardFlg();
        this.removeDepositMask();
    }

    __proto.removeShowCardFlg = function()
    {
        if( this.showCardFlgImg )
        {
            this.showCardFlgImg.removeSelf();
            this.showCardFlgImg = null;
        }
    }

         /**
     * 倒计时消失
     */
    __proto.hideCountdown = function()
    {
        if( !this.countdown || !this.countdown.visible )
            return;
        this.countdown.stop();
    }

    /**
     * 玩家出牌
     */
    __proto.outputCards = function( data )
    {
        if( data.hasOwnProperty('outputCards') )
        {
            this.assemblyCards( data );
            this.showOutputCards( data.outputCards );
            this.updateDepositMaskSize();
            //this.showOutputCardform( data.resultType );
            this.showCardFlg();
            this.outputType = data.resultType;
            SoundTool.getInstance().SpeakFLSounds(data.resultType,data.outputCards[0].num,this.getSex(),this.bFstOutPut);
        }else //不出
        {
            this.cllLev.dataSource = {skin:'fightLandlordRoom/passBtn.png'};
            this.cllLev.visible = true;
            var soundName = ['buyao','yaobuqi','guopai'];
            SoundTool.getInstance().PlayGameSound( soundName[ parseInt(Math.random() * 3) ],this.getSex(),'fightLandlord/' );
        }
        this.hideCountdown();
    }

    //显示打出的牌
    __proto.showOutputCards = function( cards )
    {
        var len = cards.length;
        var cardsWidth = 0;
        SoundManager.playSound('audio/fightLandlord/eff_chupai.mp3');
        var otherPlayerShowOutPutCardsCount = 10;//其他玩家出牌一行最多显示多少张
        for( var i = 0;i < len;i++ )
        {
            var card = cards[i];
            var t_node = Factory.getInstance().createObj('FLCard',FLCard);
            t_node.init();
            t_node.setNum( this.conversionValue(card.num) );
            t_node.setType( card.suit );
            t_node.scaleX = t_node.scaleY = 0.6;
            t_node.zOrder = i + 100;
            this.addChild( t_node );

            var spacingRate = 1.4;
            var t_pos = null;
            if( this.isLocalPlayer )
            {
                cardsWidth = (cards.length) * this.localPlayerCardSpacing * spacingRate - 40;
                var LocalStartPos = (Game.getInstance().currentScene.width - cardsWidth) >> 1;
                t_pos = this.globalToLocal( new Point(LocalStartPos + i * this.localPlayerCardSpacing * spacingRate,450)  );
            }else if( this.cardDir == 'RIGHT' )
            {
                var val = this.LFlg.visible ? 35 : 90;
                cardsWidth = (cards.length > otherPlayerShowOutPutCardsCount ? otherPlayerShowOutPutCardsCount : cards.length) * this.localPlayerCardSpacing * spacingRate - val;
                t_pos = this.globalToLocal( new Point( (this.x - cardsWidth - 15 + parseInt(i % otherPlayerShowOutPutCardsCount) * this.localPlayerCardSpacing * spacingRate) ,
                this.y + 168 + parseInt(i / otherPlayerShowOutPutCardsCount) * 90)  );
            }else
            {
                var val = this.LFlg.visible ? 106 : 160;
                t_pos = this.globalToLocal( new Point( (this.x + this.width - val + parseInt(i % otherPlayerShowOutPutCardsCount) * this.localPlayerCardSpacing * spacingRate) ,
                this.y + 168 + parseInt(i / otherPlayerShowOutPutCardsCount) * 90)  );
            }
            t_node.x = t_pos.x;
            t_node.y = t_pos.y;
            var cardName = card.suit.toLowerCase() +'s_'+ card.num;
            if( card.num == 16 || card.num == 17 )
            {
                cardName = card.num;
            }
            t_node.setImage( "card/card_"+cardName+".png" );
            this.OutPutCards.push( t_node );
        }
    }

    //删除打出去的牌
    __proto.removeOutPutCards = function()
    {
        for( var i = 0;i < this.OutPutCards.length;i++ )
        {
            this.removeCard( this.OutPutCards[i] );
            this.OutPutCards[i] = null;
        }
        this.OutPutCards = []; 
        this.outputType = '';
    }

    __proto.removeCards = function( data )
    {
        for( var i = 0;i < this.cards.length;i++ )
        {
            for( var j = 0;j < data.outputCards.length;j++ )
            {
                var card = data.outputCards[j];
                var num = this.conversionValue( card.num );
                if( card.suit == this.cards[i].getType() && num == this.cards[i].getNum() )
                {
                    this.removeCard( this.cards[ i ] );
                    this.cards[i] = null;
                    this.cards.splice(i,1);
                    i--;
                    break;
                }
            }
        }
    }

    //删除部分牌
    __proto.assemblyCards = function( data )
    {
        if( this.isLocalPlayer )
        {
            this.removeCards( data );
            for( var i = 0;i < this.cards.length;i++ )
            {
                if( i - 1 >= 0 )
                {
                   for( var j = 0;j <= i - 1;j++ )
                   {
                       this.cards[j].x -= this.localPlayerCardSpacing;
                   }
                }
                var pos = this.globalToLocal( new Point(((GameData.getInstance().SCENE_WIDTH) >> 1) + i * this.localPlayerCardSpacing,0) );
                this.cards[i].x = pos.x;
            }
        }else
        {
            if( !this.bShowCards )
            {
                var reNum = this.cards.length - data.residueCardNum;
                for( var i = 0;i < reNum;i++ )
                {
                    var index = this.cards.length - 1;
                    this.removeCard( this.cards[ index ] );
                    this.cards[ index ] = null;
                    this.cards.splice(-1,1);
                }
                this.showCardNum();
            }else
            {
                this.removeCards( data );
                for( var i = 0;i < this.cards.length;i++ )
                {
                    var x = 0;
                    var y = 200 + parseInt(i / this.ShowCardCountforOneLine) * 90;
                    if( this.cardDir == 'RIGHT' )
                    {
                        x = this.WIDTH - 55 - (i % this.ShowCardCountforOneLine) * 30;
                    }else
                    {
                        x = 32 + (i % this.ShowCardCountforOneLine) * 30;
                    }
                    this.cards[i].x = x;
                    this.cards[i].y = y;
                }
            }
        }
    }

    /**
     * 
     */
    __proto.removeCard = function( card )
    {
        this.removeChild( card );
        Tween.clearAll( card );
        card.reset();
        laya.utils.Pool.recover('FLCard',card);
    }
    
    /**
     * 显示卡牌的数量
     */
    __proto.showCardNum = function()
    {
        if( this.isLocalPlayer || this.bShowCards )
            return;
        this.createCardNumTxt();
        if( this.cards.length == 0 )
            return;
        this.cardNumTxt.text = this.cards.length;
        this.cardNumTxt.pivotX = this.cardNumTxt.width >> 1;
        this.cardNumTxt.visible = true;
        this.cardNumTxt.x = this.cards[ this.cards.length - 1 ].x;
        this.cardNumTxt.y = this.cards[ this.cards.length - 1 ].y + 10;
        this.cardNumTxt.zOrder = this.cards.length;
        this.addChild( this.cardNumTxt );
    }


    return FLPlayerView;
})(BasePlayerView);