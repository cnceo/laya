 /**
 * huangandfly 2016 07 05
 * 玩家类
 */

var PlayerView = (function (_super){
    
	Laya.class(PlayerView,"PlayerView",_super);
	function PlayerView()
    {
		PlayerView.__super.call(this);
        this.isWin = false;
        this.winSprite = null;
        this.back = null;
        this.localPlayerScale = 0.9;//本地卡牌缩放比例
        this.otherPlayerScale = 0.4;//其他玩家卡牌缩放比例
        this.localPlayerCardSpacing = 0;
        this.cardDir = 'LEFT';
        this.cardForm = null;
        this.turnMoneyInTable = 0;
        this._boxAllIn = null;
        this.allInEffect = null;
        this.allinTimes = 0;
    }
    var __proto = PlayerView.prototype;
    __proto.initData = function()
    {
        _super.prototype.initData.call(this);
        this.WIDTH  = this.width;
        this.HEIGHT = this.height;
        this.currentScene = Game.getInstance().currentScene;
        var lPos = new Point(this.currentScene.pokerDealer.x + (this.currentScene.pokerDealer.width>>1),this.currentScene.pokerDealer.y + this.currentScene.pokerDealer.height);
        var gPos = this.currentScene.pokerDealer.localToGlobal(lPos);
        this.pokerDealerPos = gPos;//this.globalToLocal(gPos);
        
        this.countdown = this.getChildByName( 'countdown' );
        this.countdown.visible  = false;
        
        this.Speak = this.getChildByName( 'Speak' );
        this.Speak.visible = false;
        
        this.gameMoneyInTable = this.getChildByName( 'numBg' );
        this.gameMoneyInTable.visible = false;
        
        this.bg = this.getChildByName( 'bg' );
        var seatN = this.getChildByName( 'SeatN' );
        this.seatNum = seatN.getChildByName( 'seatNum' );
        this.seatNum.text = "";
        seatN.visible = false;

        this._boxAllIn = this.getChildByName('allIn');
        Game.getInstance().addUpdate( {callback:this.update,caller:this} );
        this.registerListener();    
        this.showAllIn(0);
        //this.initPlayerBg('common/chessgame/normal.png');   
        this.initPlayerBg(0.5);
    }
    //重置数据
    __proto.reset = function( _isRemove )
    {
        if( this.getPos() === -1 )
            return;
        this.correctMoney();
        this.showAllIn(0);
        this.clear(true);
        
        if( _isRemove )
        {
            this.initIcon();
            
            this.setPlayerName( '' );
            this.setPlayerMoney(-1);
            this.setPlayerState('');
            this.initVIP();
            this.initFCP();
            //this.initPlayerBg('common/chessgame/normal.png');
            this.initPlayerBg(0.5);
            this.Speak.visible = false;
            this.setPos(-1);  
            this.seatNum.text = ""; 
            this.seatNum.parent.visible = false;
            this.hideDisconnect(); 
            TaskDelayManager.getInstance().clearTarget(this);
        }else
        {
            this.setPlayerState('eWatching');
        }
    }
    __proto.initPlayerBg = function(/*skin*/alpha){
        //skin = skin || 'common/chessgame/normal.png';
        //this.bg.dataSource = {skin:skin};
        //this.bg.alpha = (skin == 'common/chessgame/normal.png') ? 0.5 : 1;
        this.bg.alpha = alpha;
    }
    
    /**
     * 添加一个筹码
     */
    __proto.addjetion = function( value ,isFly,playSound)
    {
        var am = Tools.getInstance().ChangeUIShow(value);
        //var jettonList = this.getJetonNum( am );
        var jettonList = Jetton.GetJettonNum(am);
        var jettonPool = Game.getInstance().currentScene.jettonPool;
        var jettonsNum = 0;
        for( var index = 0; index < jettonList.length;index++ )
        {
            var numTemp = parseInt( jettonList[index].value );
            jettonsNum += numTemp;
            for( var j = 0; j < numTemp;j++ )
            {
                var t_node = this.createObj('jetton');
                jettonPool.addChild( t_node );
                
                t_node.moveDuration = 400;
                var pos = null;
                if( this.isLocalPlayer )
                {
                    pos = this.cards.length > 0 ? new Point(Game.getInstance().currentScene.width >> 1,Game.getInstance().currentScene.height - 200) :
                        new Point(200,Game.getInstance().currentScene.height - 100);
                    t_node.moveDuration = 200;
                }else if( this.cardDir == "RIGHT" )
                {
                    pos = new Point( this.x + 200,this.y + 100 );
                }else
                {
                    pos = new Point( this.x + 100,this.y + 100 );
                }
                    
                var t_point = jettonPool.globalToLocal( pos );
                t_node.pos(t_point.x,t_point.y );
                t_node.isFly = isFly;
                //t_node.scale(0,0);
                var bCenter = Math.random() > 0.2 ? true : false;//随机是否向中间圆圈倾向
                var prX = 0;
                var prY = 0;
                if(bCenter){
                    //思路就是围绕这个坐标为圆心，产生不同半径的圆，然后在取这个圆上，不同角度或方向的点即可
                    var CycPoint = { x : 0.5 * jettonPool.width, y : 0.5 * jettonPool.height};
                    //随机半径0 - 0.5* jettonPool.height范围内  
                    var CurrentR = 0 + ( Math.random() * ( 0.5 * jettonPool.height - 0 ) ) + 1;  
                    //随机方向 0 - 360度  
                    var CurrentAngle = Math.random() * 361;  
                    prX = CycPoint.x + Math.sin(  CurrentAngle * Math.PI / 180  ) * CurrentR;  
                    prY = CycPoint.y + Math.cos(  CurrentAngle * Math.PI / 180) * CurrentR;       
                }
                else{
                    prX = jettonPool.width * Math.random();
                    prY = jettonPool.height * Math.random();
                }
                
                t_node.cardMoveEndPos = new Point(  prX,prY);
                t_node.setImage( "jetton/jetton_"+jettonList[index].key+".png" );
                this.removeExJettons();
                this.jetions.push( t_node );
                if(isFly)
                {
                    t_node.AddJetionMove();
                }else
                {
                    t_node.scale(1,1);
                    t_node.pos( t_node.cardMoveEndPos.x,t_node.cardMoveEndPos.y );
                }

            }
        }
        playSound = playSound == undefined ? true : playSound;
        if(playSound){//播放声音
            if(jettonsNum > 4){
                SoundManager.playSound('audio/chipfly.mp3');
            }
            else{
                SoundManager.playSound('audio/chip.mp3');
            }
        }
        jettonList = null;
    }
    
    //     /**
    //  * 解析筹码
    //  */
    // __proto.getJetonNum = function( _jetonNum )
    // {
    //     var jetonList = [
    //     {key:'5000',value:0},
    //     {key:'1000',value:0},
    //     {key:'500',value:0},
    //     {key:'100',value:0},
    //     {key:'50',value:0},
    //     {key:'25',value:0},
    //     {key:'5',value:0},
    //     {key:'1',value:0}
    //     ];
    //     var value = _jetonNum;
    //     for( var i = 0; i < jetonList.length;i++ )
    //     {
    //         var t_key = parseInt( jetonList[i].key );
    //         var num = parseInt(value / t_key);
    //         if( num > 0 )
    //         {
    //             jetonList[ i ].value = num;
    //         } 
    //         value %= t_key;
    //         if( value === 0 )
    //         {
    //             break;
    //         }
    //     }    
    //     return jetonList;
    // }
    
    /**
     * 弃牌
     */
    __proto.dropCard = function( _isLocalPlayer )
    {
        //自己的要分开处理 因为第一张牌有可能看了
        if( _isLocalPlayer )
        {
            var cardLength = this.cards.length;
            var startPos = 1;
            //底牌是否查看过了
            (this.back === null) && (startPos = 0);
            (this.back !== null) && this.back.off(Event.CLICK,this,this.checkBottomCard);
            this.dropCardloadBack( startPos );
        }else
        {   //其他玩家起始牌的位置从第二张牌开始
            this.dropCardloadBack( 1 );
        }
    }
    
    /**
     * 弃牌 加载背面
     */
    __proto.dropCardloadBack = function( startPos )
    {
        var cardLength = this.cards.length;
        //第一张本来就是背面
        for( var i = startPos; i < cardLength;i++ )
        {
            var t_node = this.createObj('card');
            t_node.x = this.cards[i].x;
            t_node.y = this.cards[i].y;
            t_node.scale(0,0);
            t_node.zOrder = i;
            this.addChild( t_node );
            this.cards.push( t_node );        
            t_node.setImage( 'card/card_back.png' );
            this.isLocalPlayer ? t_node.cardEndScale = this.localPlayerScale : t_node.cardEndScale = this.otherPlayerScale;
        }
        
        for( var i = startPos; i < cardLength;i++ ) 
        {
            var t_node = this.cards[ i ];
            var corresponding = cardLength + i - startPos;
            t_node.flipCard('BTS',this.onDropCardBackFlipCom,this.cards[ corresponding ]); 
        }
    }
    /**
     * 弃牌翻转完成
     */
    __proto.onDropCardBackFlipCom = function()
    {
        this.flipCard('STB',null,null); 
    }
    
    __proto.setTurnMoneyInTable = function( _value )
    {
        this.turnMoneyInTable = _value;
    }

    __proto.getTurnMoneyInTable = function()
    {
        return this.turnMoneyInTable;
    }
    
    /**
     * 行动结束
     */
    __proto.actionOver = function()
    {
        //this.initPlayerBg('common/chessgame/normal.png');
    }
    
    /**
     * 玩家开始行动
     */
    __proto.action = function()
    {
        //this.initPlayerBg('common/chessgame/normal.png');
        this.setActionState(GameData.getInstance().shActionState.SiKao);
    }
    
    //下注CD 显示
    __proto.setCountdown = function( time )
    {
        if(this.isDisconnect()) return;
        this.countdown.visible = true; 
        //var preTime = Tools.getInstance().GetGameCountDown() - time;
        //this.countdown.startTimer(time,this.countdownFinish,this,[8,4],true,null,GameData.getInstance().COLOR.YELLOW,preTime);
        var tTotal = SHRoomMgr.getInstance().GetCurRoom().GetRoomActionTime();
        var clockParam = 
        {
            timeAction : time,
            timeTotal : tTotal,
            callback : this.countdownFinish,
            targetObj : this,
            playAudio : [8,4],
            playTick : true,
        }
        this.countdown.startTimer(clockParam);
    }
    
    /**
     * 显示说话
     */
    __proto.showTalk = function( content )
    {
        this.Speak.visible = true;
        this.Speak.scale(0,0);
        this.Speak.getChildByName('talkTxt').text = content;
        
        Tween.to( this.Speak,{ scaleX : 1,scaleY : 1 },500,Ease['elasticOut']);
        
        var task = new TaskDelay();
        task.data = null;
        task.callBack = this.hideTalk;
        task.classObj = this;
        task.leftTime = 2000;
        task.forceExecute = true;
        TaskDelayManager.getInstance().addTask( task );       
    }
    //显示all in
    __proto.showAllIn = function(allinTimes){
        if(!this._boxAllIn) return;
        allinTimes = parseInt(allinTimes);
        allinTimes = (isNaN(allinTimes)) ? 0 : allinTimes;
       
        this.allinTimes = allinTimes;
        this._boxAllIn.visible = this.allinTimes > 0;
        if(this._boxAllIn.visible){
            this._boxAllIn.play();
        }
        var txtAllIn = this._boxAllIn.getChildByName("txtAllIn");
        txtAllIn.text = "x" + this.allinTimes;
        txtAllIn.visible = false;//all in 不再允许多次
    }
    __proto.getAllInTimes = function(){
        return this.allinTimes;
    }

    //显示allIn效果
    __proto.showAllInEffect = function()
    {
        if( this.allInEffect == null )
        {
            this.allInEffect = new laya.ui.Image();
            this.allInEffect.dataSource = {skin:'showhandRoom/allInHand.png'};
            this.allInEffect.x = this.globalToLocal( new Point((Laya.stage.width - this.allInEffect.width) >> 1,0) ).x; 
        }
        
        this.addChild( this.allInEffect );
        this.allInEffect.zOrder = 100;
        this.allInEffect.y = 100;;
        this.allInEffect.alpha = 1;
        Tween.clearAll( this.allInEffect );
        Tween.to( this.allInEffect,{y:-350},600,Ease['circIn'] );
        Tween.to( this.allInEffect,{alpha:0},800,null,Handler.create(this,this.reAllInEff = function(){ this.allInEffect.removeSelf(); }),1000 );

        SoundManager.playSound('audio/chipfly.mp3');
    }
    
    /**
     * 隐藏说话泡泡
     */
    __proto.hideTalk = function()
    {
        this.Speak.visible = false;
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
    
    //倒计时结束
    __proto.countdownFinish = function()
    {
        this.countdown.visible = false; 
    }
    //显示赢
    __proto.setWin = function( _win )
    {
        this.isWin = (_win == 1);
    }

    //关掉底牌的事件监听
    __proto.offBackCard = function()
    {
        ( this.back !== null ) && (this.back.off(Event.CLICK,this,this.checkBottomCard));
    }
    
    /**
     * 显示底牌 */    
    __proto.showBottomCard = function( data )
    {
        if( this.cards.length === 0 )
            return;
        var card = data;
        var cardType = '';
        var cardNum = '';
        var cardName = 'back';
        if( card.hasOwnProperty('num') ){
            cardNum = card.num; 
        }
        else{
            //没有num属性，代表是暗牌
            return;
        }
        if( card.hasOwnProperty('suit') )
            cardType = card.suit.toLowerCase();            
        
        var t_node = null;
        t_node = this.createObj('card');
        this.addChild( t_node );
            
        cardType !=='' && cardNum !=='' && (cardName = cardType +'s_'+ cardNum);
        
        //t_node.setPosition( this.cards[0].getPosition() );
        t_node.x = this.cards[0].x;
        t_node.y = this.cards[0].y;
        t_node.zOrder = this.cards[0].zOrder ;//放在第一张牌的下面
        t_node.cardEndScale = this.cards[0].cardEndScale;
        //t_node.cardColor = CardColor[ cardType ];
        t_node.cardNum = cardNum == 1 ? 999 : cardNum;
        this.cards.push( t_node );
        t_node.setImage( 'card/card_' + cardName+'.png' );
        t_node.scale(0,0);

        //第一张牌是背面 开始缩小
        var t_firstCard = this.cards[0];
        //var comp = t_firstCard.getComponent('Card');
        t_firstCard.flipCard('BTS',this.backCardFlipComplete,this); 
        // LoadRes.GetInstance().Load( [cc.SpriteFrame,'card/card_' + cardName], this.onBottomCardLoadComplete,this );
    }
    
    /**
     * 显示本地玩家底牌
     */
    __proto.showLocalPlayerBottom = function()
    {
        if( this.playerState !== GameData.getInstance().playerState.Playing )
            return;
        //表示玩家已经查看过底牌了
        if( this.back === null )
            return;
        //var comp = this.back.getComponent('Card');
        this.back.flipCard('BTS',this.LocalBackCardFlipComplete,this); 
    }
    
    //本地玩家背面底牌翻转完
    __proto.LocalBackCardFlipComplete = function()
    {
        if( this.cards.length == 0 || !this.back)
            return;
        var t_firstCard = this.cards[0];
        //t_firstCard.setPosition( this.back.getPosition() );
        t_firstCard.x = this.back.x;
        t_firstCard.y = this.back.y;
        t_firstCard.cardEndScale = this.localPlayerScale;
        //var comp = t_firstCard.getComponent('Card');
        t_firstCard.flipCard('STB',null,null);
    }
    
    /**
     * 背面牌缩小完成
     */
    __proto.backCardFlipComplete = function()
    {
        if( this.cards.length == 0 )
            return;
        //真正的第一张牌 开始翻过来
        var t_firstCard = this.cards[ this.cards.length - 1 ];
        //var comp = t_firstCard.getComponent('Card');
        t_firstCard.flipCard('STB',this.firstCardFlipComplete,this);
    }
    
    /**
     * 第一张牌旋转完成
     */
    __proto.firstCardFlipComplete = function(){
    }
    __proto.update = function(){
        if(!this.isUpdate) return;
        this.rollMoney();
    }
    
    //设置玩家本轮下注的总和
    __proto.setGameMoneyInTable = function( money )
    {
        if( this.getPos() === -1 )
            return;
        this.gameMoneyInTable.visible = true;
        var moneyInTable = this.gameMoneyInTable.getChildByName('txt');
        if( moneyInTable )
        {
            moneyInTable.text = Tools.getInstance().ChangeUIShow(money); 
        }
    }
    
    /**
     * 显示结果
     */
    __proto.showResult = function(data)
    {
        if(!data.hasOwnProperty('cardForm')) return;
        this.cardForm = this.createObj( 'cardForm' );
        this.cardForm.scale(0.8,0.8);
        this.cardForm.initSkin( 'showhandRoom/cardForm/'+data.cardForm.toLowerCase()+'.png' );
        this.addChild( this.cardForm );

        if( this.isLocalPlayer )
        {
            var pos = this.globalToLocal( new Point( (Game.getInstance().currentScene.width) >>  1 ,Game.getInstance().currentScene.height - 190  ) );
            this.cardForm.x = pos.x;
            this.cardForm.y = pos.y;
        }else 
        {
            this.cardForm.x = 200;
            this.cardForm.y = 120;
        }
        SoundTool.getInstance().SpeakSHSounds(data.cardForm);
        //this.LightCards(data.cardForm,data.num,data.suit);
    }
    
    /**
     * 右边的玩家 移动卡牌
     */
    __proto.moveCards = function(delayTime,moveDuration,isFly)
    {
        if( this.cardDir != 'LEFT' ) //在桌面的右边
        {
            for( var i = 0; i < this.cards.length;i++ ) //现有的牌往左边移
            {
                var pos = this.isLocalPlayer ? this.localPlayerCardSpacing : 30;
                if( isFly )
                {
                    var t_node = this.cards[i];
                    var task = new TaskDelay();
                    task.data = {pos:pos,moveDuration:moveDuration};
                    task.callBack = t_node.moveCard;
                    task.classObj = t_node;
                    task.leftTime = delayTime;
                    TaskDelayManager.getInstance().addTask( task );                      
                }else 
                {
                    this.cards[i].x -= pos;
                }
            }
            
            if( this.back !== null ) 
            {
                if( isFly )
                {
                    var task = new TaskDelay();
                    task.data = {pos:this.localPlayerCardSpacing,moveDuration:moveDuration};
                    task.callBack = this.back.moveCard;
                    task.classObj = this.back;
                    task.leftTime = delayTime;
                    TaskDelayManager.getInstance().addTask( task );
                }else
                {
                    this.back.x -= this.localPlayerCardSpacing;
                }
            }
        }
    }
    
    /**
     * 添加一张牌
     */
    __proto.addCard = function( data,delayTime,moveDuration,lastCard,callBackObj,isFly )
    {
        if(this.getPos() == -1) return;
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
        var t_node   = null;
        
        t_node = this.createObj( 'card' );
        t_node.zOrder = data.cardPos;
        t_node.setNum(cardNum);
        t_node.setType(cardType);
        t_node.setPos(card.cardPos);
        this.addChild( t_node ); 
        if( this.isLocalPlayer )
        {
            this.localPlayerCardSpacing = 35 * this.localPlayerScale;
            t_node.cardMoveEndPos = this.globalToLocal( new Point(((GameData.getInstance().SCENE_WIDTH) >> 1) + 
            (this.cards.length) * this.localPlayerCardSpacing,630)  );
            t_node.cardEndScale = this.localPlayerScale;
        }else if( this.cardDir == 'RIGHT' )
        {
            //t_node.cardMoveEndPos = new Point(this.WIDTH - 33,150);
            t_node.cardMoveEndPos = new Point(this.WIDTH - 55,45);
            t_node.cardEndScale = this.otherPlayerScale;
        }else
        {
            //t_node.cardMoveEndPos = new Point( this.cards.length * 30 + 33 ,150 );
            t_node.cardMoveEndPos = new Point( this.cards.length * 30 + 155 ,45 );
            t_node.cardEndScale = this.otherPlayerScale;
        }
        
        t_node.cardMoveEndPos = t_node.cardMoveEndPos;
        t_node.delayTime = delayTime;
        t_node.moveDuration = moveDuration;
        t_node.lastCard = lastCard;
        t_node.callBackObj = callBackObj;
        t_node.isFly = isFly;
        var pos = this.globalToLocal( new Point(this.pokerDealerPos.x,this.pokerDealerPos.y) );
        //var pos = this.globalToLocal(this.currentScene.pokerDealer.localToGlobal(new Point(0,0)));
        
        t_node.pos( pos.x,pos.y ); 
        
        t_node.cardNum = cardNum == 1 ? 999 : cardNum;
        this.cards.push( t_node );
        
        
        //本地玩家第一张牌处理
        if( this.isLocalPlayer && this.cards.length === 1 && !GameData.getInstance().checkBottomCard )
        {
            t_node.isFly = false;
            this.back = null;//
            this.back = this.createObj( 'card' );
            this.back.zOrder = 0;
            this.mouseThrough = true;
            this.addChild( this.back );
            this.back.cardMoveEndPos = t_node.cardMoveEndPos;//牌的间隔为50 距离头像100的位置开始计算
            this.back.delayTime = t_node.delayTime;
            this.back.moveDuration = t_node.moveDuration;
            this.back.cardEndScale = this.localPlayerScale;
            this.back.lastCard = false;
            this.back.isFly = isFly;
            this.back.callBackObj = callBackObj;
            this.back.pos( pos.x,pos.y );

            this.back.setImage( "card/card_back.png" );

            t_node.cardEndScale = 0;//玩家的第一张牌隐藏                
            this.back.on(Event.CLICK,this,this.checkBottomCard);
            this.back.handout();
        }
        t_node.setImage( "card/card_"+cardName+".png" );
        t_node.handout();
    }
    
    //查看底牌
    __proto.checkBottomCard = function(event)
    {
        //以下注释部分由于引擎有bug导致触摸响应问题
    //    if( this.currentScene.checkCardPanel == undefined || this.currentScene.checkCardPanel == null )
    //    {
    //         this.currentScene.checkCardPanel = new CheckCardView();      
    //         this.currentScene.checkCardPanel.init();         
    //         this.currentScene.addChild( this.currentScene.checkCardPanel );
    //    }
        if(this.getPlayerState() != GameData.getInstance().playerState.Playing) {
            CLog.log(" ????????  playerState:"+this.getPlayerState());
            return;
        }
        if(StatePool.hasState(GameData.getInstance().showhandRoomState.eGotoResult)
            || StatePool.hasState(GameData.getInstance().showhandRoomState.eSettlement)
            || StatePool.hasState(GameData.getInstance().showhandRoomState.eGameOver)){
            CLog.log("?????????????????????????   StatePool:   eGotoResult:"+StatePool.hasState(GameData.getInstance().showhandRoomState.eGotoResult)+" eSettlement:"+StatePool.hasState(GameData.getInstance().showhandRoomState.eSettlement)
            +"  eGameOver:"+StatePool.hasState(GameData.getInstance().showhandRoomState.eGameOver));
            return;
        }
        if( this.currentScene.checkCardPanel){
            this.currentScene.removeChild(this.currentScene.checkCardPanel);
        }
        this.currentScene.checkCardPanel = new CheckCardView();      
        this.currentScene.checkCardPanel.init();         
        this.currentScene.addChild( this.currentScene.checkCardPanel );
        this.currentScene.checkCardPanel.setBottomCardTexture( this.cards[0].path );
        this.currentScene.checkCardPanel.show( true );
        this.currentScene.checkCardPanel.once(Event.CLICK,this,this.onCheckCardPanel);  
    }
    
    /**
     * 看牌界面点击处理
     */
    __proto.onCheckCardPanel = function()
    {
        if( this.back === null )
        {
            if(this.currentScene.checkCardPanel){
                this.currentScene.checkCardPanel.show( false );
            }
            return;
        }
        
        this.currentScene.checkCardPanel.show( false );
        if( this.currentScene.checkCardPanel.isCheck )
        {
            this.back.removeSelf();
            this.back.off( Event.CLICK,this,this.checkBottomCard );
            laya.utils.Pool.recover('card',this.back);
            
            var t_card = this.cards[0];
            t_card.scale(this.localPlayerScale,this.localPlayerScale);
            t_card.visible = true;
            t_card.x = this.back.x;
            t_card.y = this.back.y;
            this.back = null;
            GameData.getInstance().checkBottomCard = true;            
        }
    }

    //玩家重置
    __proto.clear = function( _isRemove )
    {
        if( this.getPos() === -1 )
            return;
        for( var i = 0;i < this.cards.length;i++ )
        {
            this.removeChild( this.cards[i] );
            Tween.clearAll( this.cards[i] );
            this.cards[i].reset();
            laya.utils.Pool.recover('card',this.cards[i]);
            this.cards[i] = null;
        }
        this.cards = [];        
        if( this.back != null )
        {
            this.offBackCard();
            this.removeChild( this.back );
            Tween.clearAll( this.back );
            this.back.reset();
            laya.utils.Pool.recover('card',this.back);          
            this.back = null;
        }
        
        if( this.cardForm != null)
        {
            this.cardForm.removeSelf();
            laya.utils.Pool.recover('cardForm',this.cardForm);       
            this.cardForm = null;   
        }
        
        this.gameMoneyInTable.visible = false;
        this.allinTimes = 0;
        //this.initPlayerBg('common/chessgame/normal.png');
        this.hideCountdown();             
    }
    

    __proto.init = function( data,isLocalPlayer,isDemo )
    {
        this.disabled = false;
        this.setPos(data.userPos);
        this.isLocalPlayer = isLocalPlayer;
        var aState = (data.allinTimes > 0) ? GameData.getInstance().shActionState.AllIn : data.actionState;
        this.setActionState(aState);
        this.setPlayerState( data.state );
        if(data.hasOwnProperty("money")){
            this.setPlayerMoney(data.money);
        }        
        this.setTurnMoneyInTable( data.hasOwnProperty('turnMoneyInTable') ? data.turnMoneyInTable : 0 );
        
        this.Speak.visible = false;
        this.setPlayerName(data.name);
        var seatPos = GameData.getInstance().getPlayerSeatPos(data.userPos);
        this.seatNum.text = seatPos;
        this.seatNum.parent.visible = true;
        this.countdown.setDirection(this.cardDir == "RIGHT" ? 1 : 0 );
        if(this._boxDisconnect && this._boxDisconnect.getChildByName('clock')){
            this._boxDisconnect.getChildByName('clock').setDirection(this.cardDir == "RIGHT" ? 1 : 0);
        }
        this.showAllIn(data.allinTimes);
        this.setVip(data.vip || 1);
        this.setIcon(data.headP);
        this.setDemo(isDemo);
        
        //进入房间的时候 作为观众 直接显示其他玩家的牌
        if( data.hasOwnProperty( 'cards' ) )
        {
            for( var i = 0;i < data.cards.length;i++ )
            {
                this.addCard( data.cards[i],0,0,false,null,false );
            }
        }
        if( data.hasOwnProperty( 'gameMoneyInTable' ) && data.gameMoneyInTable > 0 )
        {
            this.addjetion( data.gameMoneyInTable,false,false);
        }
        // //不是本地玩家  加载正常等待UI
        // if( !isLocalPlayer )
        // {
        //     var t_money = this.getChildByName('money');
        //     t_money.visible = false;//16/11/18 需求修改为非本地玩家不显示余额
        // }//2017/7/24 需求修改为服务端不发余额信息则不显示，发则显示
        //this.initPlayerBg('common/chessgame/normal.png');
        this.initPlayerBg(1);
        var isAction = data.hasOwnProperty('isAction') ? data.isAction : false;
        if( isAction && data.hasOwnProperty('actionTime') )
        {
            this.setCountdown( data.actionTime );
            this.setActionState(GameData.getInstance().shActionState.SiKao);
        }
        
        if( data.hasOwnProperty('gameMoneyInTable') )
        {
            this.setGameMoneyInTable( data.gameMoneyInTable );
        }
        
        if( !this.isLocalPlayer && data.hasOwnProperty('discTime') && data.discTime > 0 ) //大于0代表断线中，剩余的断线等待时间，毫秒
        {
            if(data.discTime > GameData.getInstance().discTime) GameData.getInstance().discTime = data.discTime;
            this.showDisconnect( data.discTime );
        }
    }
    __proto.registerListener = function(){
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerMoneyRoll,this.checkPlayerRollMoney,this );
    }
    __proto.removeListener = function(){
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerMoneyRoll,this.checkPlayerRollMoney,this);
    }
    __proto.destroy = function(){
        this.__proto__.destroy();
        this.removeListener();
        this.hideCountdown();
    }
    //高亮玩家的牌
    __proto.LightCards = function(cardForm,num,suit){
        switch (cardForm){
            case GameData.getInstance().SHCardFormType.SanPai:
                this._lightCard(num,suit);
                break;
            case GameData.getInstance().SHCardFormType.DanDui:
                this._lightCard(num);
                break;
            case GameData.getInstance().SHCardFormType.SanTiao:
                this._lightCard(num);
                break;
            case GameData.getInstance().SHCardFormType.ErDui:
            case GameData.getInstance().SHCardFormType.ShunZi:               
            case GameData.getInstance().SHCardFormType.SiTiao:                
            case GameData.getInstance().SHCardFormType.TongHua:               
            case GameData.getInstance().SHCardFormType.TongHuaShun:
                this._lightCard();
                break;
            default:
                break;
        }
    }
    __proto._lightCard = function(num,suit){
        for(var i in this.cards){
            var card = this.cards[i];
            var pos = card.getPos();
            var cardNum = card.getNum();
            var cardSuit = card.getType();
            //暗牌不做显示
            if(pos <= 0 || cardNum <= 0) continue;
            if(num == undefined){
                card.showLight();
            }
            else{
                if((cardNum != num) || 
                    ((suit != undefined) && (cardSuit != suit))){
                    continue;
                }
                else{
                    card.showLight();
                }
            }
        }
    }
    return PlayerView;
})(BasePlayerView);


   