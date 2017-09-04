/**
 * huangandfly
 * 2017 04 27
 * 斗地主房间
 */

function FLRoomView()
{
    FLRoomView.super( this );
    BasePageView.call(this);
    for(var i in BasePageView.prototype){
        FLRoomView.prototype[i] = BasePageView.prototype[i];
    }
    
    this.landlordCards = null;

    this.Init = function(dataInit){
        BasePageView.prototype.Init.call(this,dataInit);
        if( !NetManager.GameClintInstance ) 
        {
            NetManager.GameClintInstance = new FightLandlordClient();
        }

        this.PlayerControlCom = new FLPlayerController(3);
        this.PlayerControlCom.setPlayerDir(2,'LEFT');

        this.FLHintAnalysis = new FLHintAnalysis( this.PlayerControlCom );

        this.speakBtn = this.getChildByName('speakBtn');
        this.selLandlordBtn = this.getChildByName('selLandlordBtn');
        this.openCardBtn = this.getChildByName('openCardBtn');
        this.changeRoomBtn = this.getChildByName('changeRoomBtn');
        this.settlementing = this.getChildByName('settlementing');
        this.noWayOutBtn  = this.getChildByName('noWayOutBtn');

        this.speakBtn.visible = false;
        this.selLandlordBtn.visible = false;
        this.gameCountdown.visible  = false;
        this.settlementing.visible  = false;
        this.changeRoomBtn.visible  = false;
        this.noWayOutBtn.visible = false;
        this.openCardBtn.visible = false;

        this.addListener();
        this.initMessageListener();
        this.initGameRoomTopView();
        this.initBaseCards();

        this.JoinRoom();

        this.cardRecord = this.getChildByName('cardRecord');
        this.cardRecord.visible = false;

        this.cardRecordBtn = this.getChildByName('cardRecordBtn');
        this.cardRecordBtn.on(Event.CLICK,this,this.onCardRecordBtn);
        this.cardRecordBtn.visible = false;
    }

    this.setData = function(cardData)
    {
        if( !cardData )
            return;
        for( var i = 0;i < cardData.length;i++ )
        {
            var txt = this.cardRecord.getChildByName('name_' + cardData[i].num);
            var count = parseInt(txt.text);
            txt.text = count + 1;
        }
    }

    this.resetData = function()
    {
        for( var i = 1;i <= 17;i++ )
        {
            var txt = this.cardRecord.getChildByName('name_' + i);
            if( txt == null )
                continue;
            txt.text = '0';
        }
    }

    this.onCardRecordBtn = function()
    {
        this.cardRecord.visible = !this.cardRecord.visible;
    }

    this.initBaseCards = function()
    {
        this.landlordCards = [];
        for( var i = 0;i < 3;i++ )
        {
            var card = Tools.getInstance().CreateACard();
            card.setImage( "card/card_back.png" );
            card.x = this.boxTitle.x + (i * 100) + 30;
            card.y = this.boxTitle.y + this.boxTitle.height + 10;
            this.addChild( card );
            card.scaleX = card.scaleY = 0.6;
            card.visible = false;
            this.landlordCards.push( card );
        }
    }

    this.JoinRoom = function() 
    {
        if(GameData.getInstance().iamBack)
        {
            CLog.log("GameData.getInstance().iamBack:"+GameData.getInstance().iamBack);
            GameData.getInstance().iamBack = false;
            //资源加载完成后请求房间信息
            //this.onRoomInfoAck(GameData.getInstance().gameRoomData);
            NetManager.GameClintInstance.CG_GET_FIGHTLANDLORD_ROOM_INFO_REQ();
        }
        else
        {
            this.toGetRoomInfo();
        }
    }

    this.onDoubleClick = function()
    {
        this.PlayerControlCom.resetCardPos();
    }

    this.onRightMousePlayBtn = function()
    {
        if( !this.speakBtn.visible )
            return;
        var cards = this.PlayerControlCom.getLocalPlayerOutPutCardsList();
        if( cards.length == 0 )
        {
            return;
        }
        this.onPlayBtn();
    }

    //明牌
    this.onOpenCardBtn = function()
    {
        NetManager.GameClintInstance.CG_FIGHTLANDLORD_SHOWCARDS_DEPOSIT_REQ( FLRoomMgr.getInstance().showCards_Deposit.showCards );
    }

        /**
     * 删除监听
     * 
     */
    this.removeListener = function()
    {
        this.backBtn.off( Event.CLICK,this,this.onExit );
        this.openCardBtn.off( Event.CLICK,this,this.onOpenCardBtn );
        this.changeRoomBtn.off( Event.CLICK,this,this.onChangeRoomBtn );
        this.noWayOutBtn.off( Event.CLICK,this,this.onPassBtn );
        this.off( Event.RIGHT_CLICK,this,this.onRightMousePlayBtn );
        this.off( Event.DOUBLE_CLICK,this,this.onDoubleClick );

        this.removeBtnListener( this.speakBtn,'passBtn',this.onPassBtn );
        this.removeBtnListener( this.speakBtn,'hintBtn',this.onHintBtn );
        this.removeBtnListener( this.speakBtn,'playBtn',this.onPlayBtn );


        for( var i = 1;i <= 4;i++  )
        {
            this.removeBtnListener( this.selLandlordBtn,'btn_'+i,this.onSelLandlord );
        }

        Laya.stage.off( 'hide_window',this,this.onHideWindow );
        Laya.stage.off( 'show_window',this,this.onShowWindow );
    }

    /**
     * 添加监听
     */
    this.addListener = function()
    {
        this.backBtn.on( Event.CLICK,this,this.onExit );
        this.openCardBtn.on( Event.CLICK,this,this.onOpenCardBtn );
        this.changeRoomBtn.on( Event.CLICK,this,this.onChangeRoomBtn );
        this.noWayOutBtn.on( Event.CLICK,this,this.onPassBtn );
        this.on( Event.RIGHT_CLICK,this,this.onRightMousePlayBtn );
        this.on( Event.DOUBLE_CLICK	,this,this.onDoubleClick );

        this.addBtnListener( this.speakBtn,'passBtn',this.onPassBtn );
        this.addBtnListener( this.speakBtn,'hintBtn',this.onHintBtn );
        this.addBtnListener( this.speakBtn,'playBtn',this.onPlayBtn );

        for( var i = 1;i <= 4;i++  )
        {
            this.addBtnListener( this.selLandlordBtn,'btn_'+i,this.onSelLandlord );
        }

        Laya.stage.on( 'hide_window',this,this.onHideWindow );
        Laya.stage.on( 'show_window',this,this.onShowWindow );     
    }

    this.addBtnListener = function(_node,_name,_callback)
    {
        var btn = _node.getChildByName( _name );
        if( btn )
        {
            btn.on( Event.CLICK,this,_callback );
        }else 
        {
            CLog.log('ERROR name = '+_name+' child not find');
        }
    }

    this.removeBtnListener = function(_node,_name,_callback)
    {
        var btn = _node.getChildByName( _name );
        if( btn )
        {
            btn.off( Event.CLICK,this,_callback );
        }else 
        {
            CLog.log('ERROR removeListener name = '+_name+' child not find');
        }
    }

    this.onHideWindow = function()
    {
        //StatePool.clearAllState();
        NetManager.GateClintMgr.inactive();
        this.clearRoom();
        this.removeMessageListener();
        CLog.log('===============gameHide');
    }

    this.onShowWindow = function()
    {    
        if(!GATE_CONNECTED) return;
        this.initMessageListener();
        this.PlayerControlCom.clearTable();
        this.gameCountdown.visible = false; 
        this.hideLandlordCards();
        //this.operateBtns();
        this.updateChangeRoomBtn();
        TaskDelayManager.getInstance().clear();
        if(this.bWaitingChangeRoom)
        {
            this.bWaitingChangeRoom = false;
            this.toGetRoomInfo();
        }
        else
        {
            NetManager.GameClintInstance.CG_GET_FIGHTLANDLORD_ROOM_INFO_REQ();
        }
        NetManager.GateClintMgr.active();
        
        CLog.log('===============gameshow');
        
    }

    /**
     * 换桌
     */
    this.onChangeRoomBtn = function()
    {
        this.toReJoinRoom();
    }

    /**
     * 叫地主
     */
    this.onSelLandlord = function( e )
    {
        var index = parseInt( e.target.name.split('_')[1] );
        NetManager.GameClintInstance.CG_FIGHTLANDLORD_ACTION_REQ( FLRoomMgr.getInstance().EFLActionState.eCall,index == 4 ? 0 : index,null );
    }

    /**
     * 出牌
     */
    this.onPlayBtn = function()
    {
        var cards = this.PlayerControlCom.getLocalPlayerOutPutCardsList();
        if( cards.length <= 0 )
        {
            this.showNotRule();
            return;
        }
        for( var i = 0;i < cards.length;i++ )
        {
            var card = cards[i];
            CLog.log( "suit = " + card.suit + " num = " + card.num );
        }
        NetManager.GameClintInstance.CG_FIGHTLANDLORD_ACTION_REQ( FLRoomMgr.getInstance().EFLActionState.eOutputCard,0,cards );
    }

    /**
     * 提示
     */
    this.onHintBtn = function()
    {
        this.FLHintAnalysis.hint();
        this.PlayerControlCom.checkSelect();
    }

    /**
     *  不出
     */
    this.onPassBtn = function()
    {
        NetManager.GameClintInstance.CG_FIGHTLANDLORD_ACTION_REQ( FLRoomMgr.getInstance().EFLActionState.eOutputCard,0,null );
        this.PlayerControlCom.resetCardPos();
    }

    this.toGetRoomInfo = function()
    {
        this.bWaitingChangeRoom = false;
        NetManager.GameClintInstance.CG_IM_READY_REQ();
    }

    this.onRoomInfoAck = function(data)
    {
        this.PlayerControlCom.clearCards();

        this.initRoomKey( data );
        this.PlayerControlCom.setUserData( data );
        this.setPoolMoney( data.poolMoney );
        this.dealRoomState(data);
        this.updateChangeRoomBtn();
        this.hideLoading();
        this.DisconnectButtonProcess( data );
        this.showLandlordCards( data );
    }

    //断线重连后按钮处理
    this.DisconnectButtonProcess = function( data )
    {
        var llLev = 0;
        for( var i = 0; i < data.users.length;i++ )
        {
            var user = data.users[i];
            if( user.callLevel > llLev )
            {
                llLev = user.callLevel;
            }
            //if( user.isAction )
            {
                if( this.PlayerControlCom.isLocalPlayer(user.userPos) )
                {
                    
                    if( data.rState == FLRoomMgr.getInstance().flRoomState.eCallLandlord ) //叫地主
                    {
                        user.isAction && this.callLandlordBtnPro( {userPos:user.userPos,curLevel:llLev} );
                        !user.bShowCards ? this.openCardBtn.visible = true : null;
                    }else if( data.rState == FLRoomMgr.getInstance().flRoomState.eActionBegin )//出牌
                    {
                        user.isAction && this.actionButtonPro( user );
                    }

                    this.setData( user.cards );
                }
            }
        }
    }

    this.hideLoading = function()
    {
        if(this.loadingUI){
            this.loadingUI.hide();
            this.loadingUI = null;
        }
    }

    this.dealRoomState = function(data)
    {
        var rState = data.rState;
        CLog.log("onRoomInfoAck.....   dealRoomState = " + rState);
        switch(rState)
        {
            case FLRoomMgr.getInstance().flRoomState.eSettlement:
                {
                    this.showSettlementing();
                }
                break;
            case FLRoomMgr.getInstance().flRoomState.eGameOver:
                {
                    GameData.getInstance().bWaitingESettlement = true;
                    this.PlayerControlCom.clearTable();
                    this.showSettlementing();
                }
                break;
            case FLRoomMgr.getInstance().flRoomState.eCallLandlord:
                {

                }
                break;
            case FLRoomMgr.getInstance().flRoomState.eActionBegin:
                {
                    //this.setShowCardsBtn(true);
                }
                break;
            case FLRoomMgr.getInstance().flRoomState.eWaitingGameBegin:
                {
                    this.gameStartCountdown( data.countdown );
                }
            default:
                if(this.settlementPro && this.settlementPro.visible){
                    CLog.log("??????????????????  游戏状态:"+data.rState + " ????????");
                    this.settlementPro.close(true);
                }
                break;
        }
    }

    /**
     * 游戏开始前倒计时
     */
    this.gameStartCountdown = function( time )
    {
        if(time == undefined || time == null || time<= 0) return;
        if(this.settlementPro && this.settlementPro.visible){
            this.settlementPro.close();
        }
        this.gameCountdown.visible = true;
        this.gameCountdown.startTimer(time,this.onGameStartCountdownOver,this,null,false);
    }

    this.initRoomKey = function(data)
    {
        this.roomType = data.roomType.type;
        var room = FLRoomMgr.getInstance().GetCurRoom();
        if(room == null) {
            room = FLRoomMgr.getInstance().CreateRoom( data.roomKey,data.roomType.type );
        }
        room.SetRoomData(data);
        var lable = this.getChildByName("gameNumTxt");
        if(lable) lable.text = data.roomKey;
        var roomName = this.getChildByName("roomNameTxt");
        if(roomName) roomName.text = FLRoomMgr.getInstance().GetCurRoom().GetRoomName();
        //this.boxKeyRoom.visible = (this.roomType == ROOM_TYPE.KEYROOM);
    }

    this.setPoolMoney = function( value )
    {
        var val = Tools.getInstance().ChangeUIShow(value);
        if( val == this.poolMoney.text )
            return;
        if( parseFloat( val ) > parseFloat( this.poolMoney.text ) )
        {
            SoundManager.playSound('audio/fightLandlord/eff_fanbei.mp3');
        }
        this.poolMoney.text = Tools.getInstance().ChangeUIShow(value);
        this.poolMoney.scale(2,2);
        Tween.to( this.poolMoney,{ scaleX : 1,scaleY : 1 },700 );

        var eff = new Effect();
        eff.x = ((GameData.getInstance().SCENE_WIDTH) >> 1) - 148;
        eff.y = -5;
        eff.init('res/atlas/fightLandlordRoom/effect/numberJump.json',100,0);
        eff.play();
        this.addChild( eff );
    }

    this.gc = function()
    {
        NetManager.GameClintInstance = null;
        this.PlayerControlCom = null;

        this.removeMessageListener();
        this.removeListener();
    }

    this.initGameRoomTopView = function()
    {
        this.GameRoomTopView = new GameRoomTopView();
        this.addChild( this.GameRoomTopView );
        this.GameRoomTopView.init();
    }

    /**
     * 退出游戏房间
     */
    this.onExit = function()
    {
        if( this.PlayerControlCom.getLocalPlayerState() === GameData.getInstance().playerState.Playing )
        {
            this.closeExitPanel();
            var mb = new MessageBox();  
            var val = parseFloat( this.poolMoney.text ) * 100 * 2; 
            mb.show('强制退出房间将扣除' + Tools.getInstance().ChangeUIShow(val) + ' 确定要退出吗？',this.onConfirmExit,null,this,MODE.MB_OK | MODE.MB_CANCEL);
            mb = null;
        }else 
        {
            this.onConfirmExit();
        }
    }

    //结算界面关闭
    this.settlementPanelClose = function( clickClose )
    {
        this.setPoolMoney(0);
        //this.setCurTurn(0);
        this.PlayerControlCom.clearTable();
        if( clickClose )
        {
            this.showSettlementing();
        }
        this.updateChangeRoomBtn(true);
        //this.initShowCardsBtn();
        //this.checkTaskFinish();
    }

            //显示结算中
    this.showSettlementing = function()
    {
        this.settlementing.visible = true;
        this.settlementing.pos( (this.width - this.settlementing.width) >> 1,0 );
        Tween.to( this.settlementing,{ y:(this.height - this.settlementing.height) >> 1 },700,Ease['elasticOut'] )
        
        var task = new TaskDelay();
        task.data = null;
        task.callBack = function(){ this.settlementing.visible = false; };
        task.classObj = this;
        task.leftTime = 10000;//一秒为1
        task.forceExecute = true;
        TaskDelayManager.getInstance().addTask( task );
        //this.setShowCardsBtn(false);
        CLog.log('======showSettlementing');
    }

    this.closeExitPanel = function()
    {
        var mb = this.getChildByName("MessageBox");
        if(!mb) return;
        this.removeChild(mb);
    }

    //确定退出
    this.onConfirmExit = function()
    {         
        NetManager.GameClintInstance.CG_LEAVE_FIGHTLANDLORD_ROOM_REQ();
    }

        //当收到倒计时提醒
    this.onCountdownWarning = function(time)
    {
        var curActionPos = this.PlayerControlCom.GetCurActionPos();
        var iPos = this.PlayerControlCom.getLocalPlayer().getPos();
        if(curActionPos == iPos){
            var sex = this.PlayerControlCom.getLocalPlayer().getSex();
            SoundTool.getInstance().PlayGameSound(EnumGameSound.HURRY_UP,sex);
        }
    }

    this.onChangeRoomEvent = function(e)
    {
        this.toReJoinRoom();
    }

    //更换房间
    this.toReJoinRoom = function(){        
        NetManager.GameClintInstance.CG_REJOIN_FIGHTLANDLORD_ROOM_REQ();
        this.showLoading();
    }

    //换房时显示的loading
    this.showLoading = function(){ 
        this.loadingUI = new TipsMessage("换桌请求中，请稍候...",true,true);
    }

    this.onReJoinRoomAck = function(content)
    {
        CLog.log("onReJoinRoomAck...."+content.errorMsg);
        if(content.errorMsg && content.errorMsg != ""){
            this.hideLoading();
        }
        else
        {
            this.clearRoom();
            this.bWaitingChangeRoom = true;
            var task = new TaskDelay();
            task.callBack = this.toGetRoomInfo;
            task.classObj = this;
            task.leftTime = 1500;//
            TaskDelayManager.getInstance().addTask( task );
            //this.toGetRoomInfo();
        } 
    }   

    this.clearRoom = function()
    {
        //this.setRoomBtnLock(false);
        StatePool.clearAllState(true);        
        this.PlayerControlCom.resetController();
        this.onGameStartCountdownOver();
        TaskDelayManager.getInstance().clear();
        //this.gameCountdown.stop();
        //this.compareCardsView.Show(false);
    }

    //玩家行动反馈
    this.GC_FIGHTLANDLORD_ACTION_ACK = function(content)
    {
        //CLog.log("GC_FIGHTLANDLORD_ACTION_ACK = " + content.errorMsg);
        if( !content.errorMsg || (content.errorMsg == "") )
        {
            //成功
            this.speakBtn.visible = false;
            this.selLandlordBtn.visible = false;
            this.noWayOutBtn.visible = false;
        }
        else
        {
            //TODO 是否要做些什么
            //当下注返回错误时,重置按钮状态 
            if( content.errorCode == '10027' )//出牌不符合规则
            {
                this.showNotRule();
            }
        }
    }

    this.showNotRule = function()
    {
        if( !this.notRule )
        {
            this.notRule = new laya.ui.Image('fightLandlordRoom/notRule.png');
            this.addChild( this.notRule );
        }
        this.notRule.visible = true;
        this.notRule.alpha = 1;
        this.notRule.x = (Laya.stage.width - this.notRule.width) >> 1;
        this.notRule.y = 500;
        Tween.clearAll( this.notRule );
        Tween.to( this.notRule,{alpha:0},1000,null,Handler.create(this, function(){ this.notRule.visible = false; }),1000 );
    }

    this.showNoWayOut = function()
    {
        if( !this.noWayOut )
        {
            this.noWayOut = new laya.ui.Image('fightLandlordRoom/noWayOut.png');
            this.addChild( this.noWayOut );
        }
        this.noWayOut.visible = true;
        this.noWayOut.alpha = 1;
        this.noWayOut.x = (Laya.stage.width - this.noWayOut.width) >> 1;
        this.noWayOut.y = 500;
        Tween.clearAll( this.noWayOut );
        Tween.to( this.noWayOut,{alpha:0},1000,null,Handler.create(this, function(){ this.noWayOut.visible = false; }),1000 );
    }
         /**
     * 游戏开始前倒计时完成
     */
    this.onGameStartCountdownOver = function()
    {
        this.gameCountdown.visible = false;
        this.PlayerControlCom.clearCards();
    }

    this.onPlayerStateUpdate = function( data )
    {
        this.PlayerControlCom.setPlayerStateAndMoney(data);
    }

    this.setMoneyInfo = function(data)
    {
        var localPlayer = this.PlayerControlCom.getLocalPlayer();
        if(!localPlayer) return;
        localPlayer.setPlayerMoney(User.getInstance().GetGameMoney());     
    }

        //更新换房按钮显示与隐藏
    this.updateChangeRoomBtn = function(show)
    {
        //if(this.bRoomBtnLocked) return;
        if(this.roomType == ROOM_TYPE_DIAMONDS.KEYROOM.key){
            this.changeRoomBtn.visible = false;
        }
        else{
            var state = this.PlayerControlCom.getLocalPlayerState();
            var playing = state === GameData.getInstance().playerState.Playing;
            this.changeRoomBtn.visible = !playing || show;
            if(this.changeRoomBtn.visible)
            {
                this.selLandlordBtn.visible = false;
                this.speakBtn.visible = false;
                this.noWayOutBtn.visible = false;
            }
        }
    }

    this.GC_FIGHTLANDLORD_GAME_BEGIN_COUNTDOWN_NTF = function( data )
    {
        this.settlementing.visible = false; 
        if(data.countdown == -1)
        {
            this.gameCountdown.visible = false;
        }
        else{
            this.gameStartCountdown( data.countdown );
        }
    }

        //离开房间
    this.GC_LEAVE_FIGHTLANDLORD_ROOM_ACK = function(data)
    {
        if(!GATE_CONNECTED) return;
        TaskDelayManager.getInstance().clear();
        GateSocketClient.getInstance().CG_GET_FIGHTLANDLORD_ROOM_TYPE_LIST_REQ();
    }

        //有新玩家加入房间
    this.onPlayerAddNTF = function(data)
    {
        var room = FLRoomMgr.getInstance().GetCurRoom();
        var bDemo = room.GetType() == ROOM_TYPE_DIAMONDS.DEMOROOM.key;
        this.PlayerControlCom.addPlayerData( data,bDemo );
        SoundManager.playSound('audio/sit.mp3');
    }

    //玩家退出
    this.onPlayerRemoveNTF = function(data)
    {
        this.PlayerControlCom.removePlayer( data.userPos );
    }

    this.ROOM_STATE_GAME_BEGIN = function(data)
    {
        this.gameCountdown.stop();
        this.gameCountdown.setTxt( 0 );
        this.gameCountdown.visible = true;
        //this.gameCountdown.zOrder = GameData.getInstance().UIZIndex.gameCountdown;
        this.gameCountdown.scale(5,5);
        
        Tween.to( this.gameCountdown,{ scaleX : 1,scaleY : 1 },700,Ease['elasticOut'] );    
        
        var task = new TaskDelay();
        task.data = null;
        task.callBack = this.hideGameCountdown;
        task.classObj = this;
        task.leftTime = 1000;//一秒为1
        TaskDelayManager.getInstance().addTask( task );
        this.changeRoomBtn.visible = false;

        this.hideLandlordCards();
    }

    this.hideGameCountdown = function()
    {
        this.gameCountdown.visible = false; 
        StatePool.stateProcess(FLRoomMgr.getInstance().flRoomState.eGameBegin);
    }

    //发牌
    this.GC_FIGHTLANDLORD_GIVE_CARD_NTF = function( data )
    {
        if( GameData.getInstance().isGameHide || !data.hasOwnProperty('cards'))
            return;
        this.openCardBtn.visible = false;
        this.selLandlordBtn.visible = false;
        this.PlayerControlCom.dealCards( data );
        this.showLandlordCards(false);

        this.setData( data.cards );
    }

    //隐藏底牌
    this.hideLandlordCards = function()
    {
        for( var i = 0;i < this.landlordCards.length;i++ )
        {
            this.landlordCards[i].visible = false;
        }
    }

    //显示地主牌
    this.showLandlordCards = function( data )
    {
        this.hideLandlordCards();
        //没有数据  显示背面
        if( !data )
        {
            for( var i = 0;i < this.landlordCards.length;i++ )
            {
                this.landlordCards[i].setImage( "card/card_back.png" );
                this.landlordCards[i].visible = true;
            }
        }else if( data.hasOwnProperty('baseCards') )
        {
            for( var i = 0;i < data.baseCards.length;i++ )
            {
                var card = data.baseCards[i];
                var cardType = card.suit;
                var cardNum  = card.num;
                var cardName = cardType.toLowerCase() +'s_'+ cardNum;
                //大小王
                if( cardNum == 16 || cardNum == 17 )
                {
                    cardName = cardNum;
                }
                this.landlordCards[i].setImage("card/card_"+cardName+".png");
                this.landlordCards[i].visible = true;
            }
        }
    }


    /**
     * 叫地主按钮处理
     */
    this.callLandlordBtnPro = function( data )
    {
        this.selLandlordBtn.visible = false;
        if( this.PlayerControlCom.isLocalPlayer( data.userPos ) )
        {
            for( var i = 1;i <= 3;i++ )
            {
                var btn = this.selLandlordBtn.getChildByName("btn_" + i);
                btn.disabled = (i <= data.curLevel);
            }
            this.selLandlordBtn.visible = true;
        }
    }

    //某玩家开始出牌发言
    this.GC_FIGHTLANDLORD_OUTPUTCARD_STATE_NTF = function( data )
    {
        //CLog.log( " GC_FIGHTLANDLORD_OUTPUTCARD_STATE_NTF userPos = " + data.userPos + " 自己的位置 = " + this.PlayerControlCom.getLocalPlayer().getPos() + " actionTime = " + data.actionTime );
        if( this.PlayerControlCom.isLocalPlayer( data.userPos ) )
        {
            this.actionButtonPro( data );
        }
        this.PlayerControlCom.outPutCardAction( data );
    }

    this.actionButtonPro = function( data )
    {
        this.selLandlordBtn.visible = false;
        if( (data.hasOwnProperty('bFstOutPut') && data.bFstOutPut == 1) || (data.hasOwnProperty('isFstOutput') && data.isFstOutput == 1) )
        {
            this.noWayOutBtn.visible = false;
            this.speakBtn.visible = true;
            this.speakBtn.getChildByName('passBtn').disabled = true;
            this.speakBtn.getChildByName('hintBtn').disabled = true;
        }else
        {
            if( this.FLHintAnalysis.canOutput() )
            {
                this.noWayOutBtn.visible = false;
                this.speakBtn.visible = true;
            }else
            {
                this.speakBtn.visible = false;
                this.noWayOutBtn.visible = true;
                this.showNoWayOut();
                this.PlayerControlCom.resetCardPos();
            }
            this.speakBtn.getChildByName('passBtn').disabled = false;
            this.speakBtn.getChildByName('hintBtn').disabled = false;
        }
    }
        /**
     * 叫地主 广播
     */
    this.GC_FIGHTLANDLORD_CALLLANDLORD_STATE_NTF = function( data )
    {
        //Tools.getInstance().SetGameCountDown(data.actionTime);
        this.PlayerControlCom.callLandlordAction( data );
        this.callLandlordBtnPro( data );
    }

    //某玩家出牌结束通知 所有玩家都会收到
    this.GC_FIGHTLANDLORD_OUTPUTCARD_ACTION_NTF = function( data )
    {
        this.openCardBtn.visible = false;
        if( this.PlayerControlCom.isLocalPlayer( data.userPos ) )
        {
            this.speakBtn.visible = false;
            this.noWayOutBtn.visible = false;
            if( !data.hasOwnProperty('outputCards') || (data.hasOwnProperty('outputCards') && data.outputCards.length == 0) )
            {
                this.PlayerControlCom.resetCardPos(); //不出 重置卡牌位置
            }
        }else
        {
            this.setData( data.outputCards );
        }
        CLog.log( " GC_FIGHTLANDLORD_OUTPUTCARD_ACTION_NTF " + data.outputCards );
        this.setPoolMoney( data.roomPoolMoney );
        this.PlayerControlCom.outputCardsOver( data );
        this.showOutputCardform( data.resultType,data.userPos );

        this.delayShowSettlement = false;
        if( data.resultType == FLRoomMgr.getInstance().FLPokerCardsType.LianDui || 
            data.resultType == FLRoomMgr.getInstance().FLPokerCardsType.Shunzi || 
            data.resultType == FLRoomMgr.getInstance().FLPokerCardsType.Feiji || 
            data.resultType == FLRoomMgr.getInstance().FLPokerCardsType.FeijidaiYi || 
            data.resultType == FLRoomMgr.getInstance().FLPokerCardsType.FeijidaiEr || 
            data.resultType == FLRoomMgr.getInstance().FLPokerCardsType.Zhandan || 
            data.resultType == FLRoomMgr.getInstance().FLPokerCardsType.Huojian )
        {
            this.delayShowSettlement = true;
        }
    }

     /**
     * 显示出牌的牌型  
     */
    this.showOutputCardform = function( resultType,userPos )
    {
        this.outputType = resultType;
        switch( resultType )
        {
        case FLRoomMgr.getInstance().FLPokerCardsType.SanDaiYi:
            break;
        case FLRoomMgr.getInstance().FLPokerCardsType.SanDaiEr:
            break;
        case FLRoomMgr.getInstance().FLPokerCardsType.LianDui:
            this.show_LD_SZ('liandui/bg','liandui/ld');
            break;
        case FLRoomMgr.getInstance().FLPokerCardsType.Shunzi:
            this.show_LD_SZ('shunzi/bg','shunzi/sz');
            break;
        case FLRoomMgr.getInstance().FLPokerCardsType.Feiji:
        case FLRoomMgr.getInstance().FLPokerCardsType.FeijidaiYi:
        case FLRoomMgr.getInstance().FLPokerCardsType.FeijidaiEr:
            this.showFeiJi();
            break;  
        case FLRoomMgr.getInstance().FLPokerCardsType.Zhandan:
            this.showZhaDan(userPos);
            break;
        case FLRoomMgr.getInstance().FLPokerCardsType.SiDaiEr:
            break;   
        case FLRoomMgr.getInstance().FLPokerCardsType.Huojian:
            this.showHuoJian();
            break;
        default:
            break;    
        }
    }

    //连队
    this.show_LD_SZ = function(_bg,_word)
    {
        var eff = new Box();
        this.addChild( eff );
        eff.anchorX = 0.5;
        eff.anchorY = 0.5;
        eff.zOrder = 1000;

        var bg = new laya.ui.Image('fightLandlordRoom/effect/'+_bg+'.png');
        eff.addChild( bg );
        bg.anchorX = 0.5;
        bg.anchorY = 0.5;

        var effect = new Effect();
        effect.init('res/atlas/fightLandlordRoom/effect/LD_SZ_E.json',120,0);
        eff.addChild( effect );
        effect.x = -400;
        effect.y = -420;
        effect.scale(4,4);
        effect.play();

        var word = new laya.ui.Image('fightLandlordRoom/effect/'+_word+'.png');
        eff.addChild( word );
        word.anchorX = 0.5;
        word.anchorY = 0.5; 
        word.y = -20;

        var _pos = new Point(((GameData.getInstance().SCENE_WIDTH) >> 1),((GameData.getInstance().SCENE_HEIGHT) >> 1));
        eff.x = _pos.x;
        eff.y = _pos.y;

        Tween.to(eff,{alpha:0},1000,null,Handler.create(this,function()
        {
            this.removeChild( eff );
            eff.destroy();
            eff = null;
        }),1000);

        //eff.scale(0.5,0.5);

        // var t_x = 0;
        // if( this.cardDir == 'LEFT' )
        // {
        //     eff.x = this.x + 418;
        //     eff.y = this.y + 204;
        //     t_x = eff.x + 200;
        // }else if( this.cardDir == 'RIGHT' )
        // {
        //     eff.x = 82;
        //     eff.y = this.y + 204;
        //     t_x = eff.x - 200;
        // }else 
        // {
        //     eff.x = this.OutPutCards[0].x + 170;
        //     eff.y = this.OutPutCards[0].y + 203;
        //     t_x = eff.x + 200;
        // }

        // Tween.to(eff,{alpha:0,x:t_x},1000,null,Handler.create(this,function()
        // {
        //     this.removeChild( eff );
        //     eff.destroy();
        //     eff = null;
        // }));
    }

    //火箭
    this.showHuoJian = function()
    {
        var effect = new Effect();
        effect.init("res/atlas/fightLandlordRoom/effect/huojian.json",130,0);
        this.addChild( effect );

        var _pos = new Point(((GameData.getInstance().SCENE_WIDTH - 806) >> 1),0);
        effect.x = _pos.x;
        effect.y = _pos.y;
        effect.scale(4,4);
        effect.visible = true;
        effect.play();
        effect.zOrder = 1000;

        var hj = new laya.ui.Image('fightLandlordRoom/effect/hj.png');
        hj.x = _pos.x + 96;
        hj.y = _pos.y ;
        this.addChild( hj );
        hj.zOrder = 1001;

        //SoundManager.playSound('audio/fightLandlord/eff_wangzha.mp3');
        SoundManager.playSound('audio/fightLandlord/eff_huojian.mp3');
        Tween.to( hj,{y:-hj.height - 600},1500,null,Handler.create(this,function()
        { 
            Tween.clearAll( hj );
            this.removeChild( hj ); 
            hj.destroy();
            hj = null;
        }
        ));

        var task = new TaskDelay();
        task.data = null;
        task.callBack = function()
        {
            //SoundManager.playSound('audio/fightLandlord/eff_zhadan.mp3');
            Tools.getInstance().EarthQuake(Game.getInstance().currentScene) 
        };
        task.classObj = this;
        task.leftTime = 500;
        task.forceExecute = true;
        TaskDelayManager.getInstance().addTask( task );            
    }

    //炸弹
    this.showZhaDan = function( _userPos )
    {
        var zd = new laya.ui.Image('fightLandlordRoom/effect/zd.png');
        zd.pivotX = (zd.width >> 1);
        zd.pivotY = (zd.height >> 1);
        zd.y = 50;
        zd.zOrder = 1000;

        var effect = new Effect();
        effect.init("res/atlas/fightLandlordRoom/effect/zhadan/fire.json",100,1);
        zd.addChild( effect );

        effect.x = -280;
        effect.y = -220;
        effect.scale(4,4);
        effect.visible = true;
        effect.play();

        var _pos = new Point(((GameData.getInstance().SCENE_WIDTH) >> 1),((GameData.getInstance().SCENE_HEIGHT) >> 1));
        var time = 1000;
        if( this.PlayerControlCom.getPlayerByPos( _userPos ).cardDir == 'LEFT' )
        {
            zd.x = 130;
            Tween.to( zd,{rotation:360},time,null,Handler.create(this,function()
            {
                effect.destroy();
                effect = null;
                this.removeChild( zd );
                this.showZDEffect( zd );
                Tween.clearAll(zd);
                zd.destroy();
                zd = null;
            }));
            Tween.to( zd,{x:_pos.x},time );
            Tween.to( zd,{y:_pos.y},time,Ease['bounceOut'] );
        }else if( this.PlayerControlCom.getPlayerByPos( _userPos ).cardDir == 'RIGHT' )
        {
            zd.x = 1500;
            Tween.to( zd,{rotation:-360},time,null,Handler.create(this,function()
            {
                effect.destroy();
                effect = null;
                this.removeChild( zd );
                this.showZDEffect( zd );
                Tween.clearAll(zd);
                zd.destroy();
                Tween.clearAll( zd );
                zd = null;
            }));
            Tween.to( zd,{x:_pos.x},time ); 
            Tween.to( zd,{y:_pos.y},time,Ease['bounceOut'] );
        }else //自己
        {
            zd.x = 130;
            zd.y = GameData.getInstance().SCENE_HEIGHT - 200;
            Tween.to( zd,{x:_pos.x},time );
            Tween.to( zd,{y:_pos.y},time );
            Tween.to( zd,{rotation:360},time,null,Handler.create(this,function()
            {
                effect.destroy();
                effect = null;
                this.removeChild( zd );
                this.showZDEffect( zd );
                Tween.clearAll(zd);
                zd.destroy();
                Tween.clearAll( zd );
                zd = null;
            }));
        }
        this.addChild( zd );
    }

    this.showZDEffect = function( _img )
    {
        var effect = new Effect();
        effect.init("res/atlas/fightLandlordRoom/effect/zhadan/blast.json",80,0);
        this.addChild( effect );
        effect.visible = true;
        effect.scale(4,4);
        effect.play();
        effect.x = _img.x - 400;
        effect.y = _img.y - 400;
        effect.zOrder = 1001;
        Tools.getInstance().EarthQuake(Game.getInstance().currentScene);
        SoundManager.playSound('audio/fightLandlord/eff_zhadan.mp3');
    }

    //飞机
    this.showFeiJi = function()
    {
        var fjEff = new Box();
        this.addChild( fjEff );
        fjEff.zOrder = 1000;

        var flyLine = new Effect();
        flyLine.init("res/atlas/fightLandlordRoom/effect/feiji/flyLine.json",80,1);
        flyLine.scale(4,4);
        flyLine.play();
        flyLine.x = -400;
        flyLine.y = -400;
        fjEff.addChild( flyLine );

        var fire = new Effect();
        fire.init("res/atlas/fightLandlordRoom/effect/feiji/fire.json",80,1);
        fire.scale(4,4);
        fire.play();
        fire.x = 470;
        fire.y = 25;
        fjEff.addChild( fire );

        var fj = new laya.ui.Image('fightLandlordRoom/effect/fj.png');
        fjEff.addChild(fj);

        var _pos = new Point(GameData.getInstance().SCENE_WIDTH,((GameData.getInstance().SCENE_HEIGHT - fj.height) >> 1));
        fjEff.x = _pos.x;
        fjEff.y = _pos.y;
        
        _pos = new Point(-fj.width,0);
        Tween.to( fjEff,{x:_pos.x},1500,null,Handler.create(this,function()
        {
            Tween.clearAll(fjEff);
            this.removeChild( fjEff );
            flyLine.destroy();
            fire.destroy();
            fjEff.destroy();
            fjEff = null;
        }) );

        SoundManager.playSound('audio/fightLandlord/eff_feiji.mp3');
        // if( this.cardDir == 'LEFT' )
        // {
        //     fjEff.x = 200;
        //     fjEff.y = 150;
        //     fjEff.rotation = -155;

        //     Tween.to( fjEff,{x:2000,y:1200},1200,null,Handler.create(this,function()
        //     {
        //         Tween.clearAll(fjEff);
        //         this.removeChild( fjEff );
        //         flyLine.destroy();
        //         fire.destroy();
        //         fjEff.destroy();
        //         fjEff = null;
        //     }) );

        // }else if( this.cardDir == 'RIGHT' )
        // {
        //     fjEff.x = -300;
        //     fjEff.y = -50;
        //     fjEff.rotation = -35;

        //     Tween.to( fjEff,{x:-2000,y:850},1200,null,Handler.create(this,function()
        //     {
        //         Tween.clearAll(fjEff);
        //         this.removeChild( fjEff );
        //         flyLine.destroy();
        //         fire.destroy();
        //         fjEff.destroy();
        //         fjEff = null;
        //     }) );
        // }else
        // {
        //     fjEff.x = 1300;
        //     fjEff.y = -500;
        //     Tween.to( fjEff,{x:-800},1200,null,Handler.create(this,function()
        //     {
        //         Tween.clearAll(fjEff);
        //         this.removeChild( fjEff );
        //         flyLine.destroy();
        //         fire.destroy();
        //         fjEff.destroy();
        //         fjEff = null;
        //     }) );
        // }
    }

    //某玩家叫地主行动结束，所有家都会收到
    this.GC_FIGHTLANDLORD_CALLLAND_ACTION_NTF = function( data )
    {
        this.PlayerControlCom.callLandlordOver( data );
        this.setPoolMoney( data.poolMoney );
    }

    //加底牌
    this.GC_FIGHTLANDLORD_ADD_BASECARD_NTF = function( data )
    {
        this.showLandlordCards( data );
        this.PlayerControlCom.addBaseCards( data );
        this.setPoolMoney( data.poolMoney );
        this.selLandlordBtn.visible = false;
    }

    //游戏结束
    this.GC_FIGHTLANDLORD_GAMEOVER_STATE_NTF = function( data )
    {
        StatePool.clearAllState();
        TaskDelayManager.getInstance().clearTarget(this);
        this.speakBtn.visible = false;
        this.noWayOutBtn.visible = false;
        this.selLandlordBtn.visible = false;
        this.PlayerControlCom.onGameOver(data);
        this.setPoolMoney( data.roomPoolMoney );
        //显示结算界面  注意 春天字段 bSpring
        this.checkUserMoney();
        this.openCardBtn.visible = false;
        this.bSpring = data.bSpring;
        StatePool.stateProcess(GameData.getInstance().showhandRoomState.eGameOver);

        this.resetData();
    }

    //游戏结算
    this.GC_FIGHTLANDLORD_GAME_OVER_NTF = function( _data )
    {
        //重新组织数据
        var data = {};
        data.players = [];
        for( var i = 0;i < _data.players.length;i++ )
        {
            var t_p = _data.players[i];
            var item = {};
            item.headIconName = t_p.headP;//头像 
            item.escape  = t_p.resultType == FLRoomMgr.getInstance().EFightlandlordResultState.eEscape;
            item.abandon = 0;
            item.win = t_p.resultType == FLRoomMgr.getInstance().EFightlandlordResultState.eWin;
            item.returnMoney = t_p.resultMoney > 0 ? t_p.resultMoney : 0;
            item.inputMoney  = t_p.resultMoney > 0 ? 0 : t_p.resultMoney;
            item.self = this.PlayerControlCom.isLocalPlayer( t_p.userPos ) ? 1 : 0;
            item.userName = t_p.userName;
            item.isLandlord = this.PlayerControlCom.isLandlord( t_p.userPos );
            data.players.push( item );
        }

        //this.setPoolMoney( _data.poolMoney );
        if( this.settlementPro == null )
        {
            this.settlementPro = new SettlementView();
            var roomType = FLRoomMgr.getInstance().GetCurRoom().GetType();
            this.settlementPro.init(this.PlayerControlCom,roomType);
            //this.addChild( this.settlementPro );
        } 

        if( this.delayShowSettlement && !this.bSpring)
        {
            //结束了有特效显示 延迟两秒显示结算界面
            var task = new TaskDelay(); 
            task.data = null;
            task.callBack = function()
            {
                 this.settlementPro.show( data ,{callBack:this.settlementPanelClose,classObj:this}); 
                 this.addChild( this.settlementPro );
            };
            task.classObj = this;
            task.leftTime = 2000;//一秒为1
            task.forceExecute = true;
            TaskDelayManager.getInstance().addTask( task );
        }else if( !this.bSpring )
        {
            this.settlementPro.show( data ,{callBack:this.settlementPanelClose,classObj:this});
            this.addChild( this.settlementPro );
        }

        this.showSpring( data );
    }

    this.showSpring = function( data )
    {
        if( this.bSpring == 1 ) //春天
        {
            var sp = new laya.ui.Image('fightLandlordRoom/effect/spring/bg.png');
            this.addChild( sp );
            sp.pivotX = sp.width >> 1;
            sp.pivotY = sp.width >> 1;
            sp.x = ((GameData.getInstance().SCENE_WIDTH) >> 1);
            sp.y = ((GameData.getInstance().SCENE_HEIGHT) >> 1);
            sp.zOrder = 1100;

            var eff = new Effect();
            eff.init("res/atlas/fightLandlordRoom/effect/spring/eff.json",120,0,Handler.create(this,function()
            {
                eff.visible = true;
                var task = new TaskDelay();
                task.data = null;
                task.callBack = function()
                { 
                    this.removeChild( sp ); 
                    this.settlementPro.show( data ,{callBack:this.settlementPanelClose,classObj:this}); 
                    this.addChild( this.settlementPro );
                };
                task.classObj = this;
                task.leftTime = 500;//一秒为1
                task.forceExecute = true;
                TaskDelayManager.getInstance().addTask( task );
            }));
            sp.addChild( eff );
            eff.play();

            var flower = new laya.ui.Image('fightLandlordRoom/effect/spring/flower.png');
            flower.x = 300;
            flower.y = 400;
            flower.alpha = 0;
            sp.addChild( flower );

            var flower1 = new laya.ui.Image('fightLandlordRoom/effect/spring/flower.png');
            flower1.x = 100;
            flower1.y = 300;
            flower1.alpha = 0;
            flower1.scale(0.5,0.5);
            sp.addChild( flower1 );

            Tween.to(flower,{alpha:1},1000);
            Tween.to(flower1,{alpha:1},1000);

            SoundManager.playSound('audio/fightLandlord/eff_chuntian.mp3');
        }
    }

    //游戏开始
    this.GC_FIGHTLANDLORD_GAME_START_NTF = function()
    {
        StatePool.clearAllState();
        TaskDelayManager.getInstance().clearTarget(this);
        this.setPoolMoney( data.poolMoney );
        this.updateChangeRoomBtn();

    }
    
    //检测玩家余额 余额不足强制充钱
    this.checkUserMoney = function()
    {
        var money = User.getInstance().GetGameMoney();
        CLog.log("检测玩家余额.... money:"+money);
        var bank = User.getInstance().GetBankMoney();
        var minCarry = FLRoomMgr.getInstance().GetCurRoom().GetMinCarry();
        //if(money + bank < FLRoomMgr.getInstance().GetCurRoom().GetMinCarry()) return;//玩家所有资产小于最低金额 则不再强制充钱（将会等待被踢）
        if(money < minCarry)
        {
            new HintMessage("您的余额已不足");
            // //当余额比较充裕时 取2倍锅底，否则取最小金钱
            // var suggestMoney = bank > (2 * minCarry) ? 2 * minCarry : minCarry - money;
            // this.GameRoomTopView.rechargeBtn.ForceCharge(suggestMoney);
        }        
    }

    //明牌或托管
    // this.GC_FIGHTLANDLORD_SHOWCARDS_DEPOSIT_ACK = function(content)
    // {
    //     if( !content.errorMsg || (content.errorMsg == "") )
    //     { //成功

    //     }
    // }

    //明牌或托管 广播
    this.GC_FIGHTLANDLORD_SHOWCARDS_DEPOSIT_NTF = function(content)
    {
        this.setPoolMoney( content.poolMoney );
        if( this.PlayerControlCom.isLocalPlayer( content.userPos ) && content.type == FLRoomMgr.getInstance().showCards_Deposit.showCards )
        {
            this.openCardBtn.visible = false;
        }
        this.PlayerControlCom.ShowCards_Deposit( content );
    }

    //发完牌回调
    this.dealCardCallBack = function()
    {
        this.openCardBtn.visible = true;
    }

    /**
     * 初始化消息监听
     */
    this.initMessageListener = function()
    {
        MessageCallbackPro.addCallbackFunc( EventType.Type.roomInfoAck,this.onRoomInfoAck,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerAddNTF,this.onPlayerAddNTF,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerRemoveNTF,this.onPlayerRemoveNTF,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerStateUpdate,this.onPlayerStateUpdate,this );

        //MessageCallbackPro.addCallbackFunc( EventType.Type.gameStart,this.onGameStart,this );
        //MessageCallbackPro.addCallbackFunc( EventType.Type.in_ones_turn,this.onIn_ones_turn,this );
        //MessageCallbackPro.addCallbackFunc( EventType.Type.playerActionOver,this.onPlayerActionOver,this );
        //TODO 游戏结束待处理
        //MessageCallbackPro.addCallbackFunc( EventType.Type.gameOverNTF,this.onGameOverNTF,this ); 
        //MessageCallbackPro.addCallbackFunc( EventType.Type.leaveCurRoom,this.onLeaveRoomACK,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.ROOM_STATE_GAME_BEGIN,this.ROOM_STATE_GAME_BEGIN,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerMoneyChanged,this.setMoneyInfo,this);
        //MessageCallbackPro.addCallbackFunc( EventType.Type.playerCharge,this.onPlayerChargeNTF,this);

        MessageCallbackPro.addCallbackFunc( EventType.Type.changeRoomEvent,this.onChangeRoomEvent,this);
        MessageCallbackPro.addCallbackFunc( EventType.Type.reJoinRoomAck,this.onReJoinRoomAck,this); 
        //MessageCallbackPro.addCallbackFunc( EventType.Type.firstPutCardNTF,this.onFirstPutCardNTF,this ); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.countdownWarning,this.onCountdownWarning,this ); 
        MessageCallbackPro.addCallbackFunc( 'GC_FIGHTLANDLORD_GIVE_CARD_NTF',this.GC_FIGHTLANDLORD_GIVE_CARD_NTF,this ); 
        MessageCallbackPro.addCallbackFunc( 'GC_FIGHTLANDLORD_GAME_BEGIN_COUNTDOWN_NTF',this.GC_FIGHTLANDLORD_GAME_BEGIN_COUNTDOWN_NTF,this );
        MessageCallbackPro.addCallbackFunc( 'GC_FIGHTLANDLORD_CALLLANDLORD_STATE_NTF',this.GC_FIGHTLANDLORD_CALLLANDLORD_STATE_NTF,this );
        MessageCallbackPro.addCallbackFunc( 'GC_LEAVE_FIGHTLANDLORD_ROOM_ACK',this.GC_LEAVE_FIGHTLANDLORD_ROOM_ACK,this );
        MessageCallbackPro.addCallbackFunc( 'GC_FIGHTLANDLORD_ADD_BASECARD_NTF',this.GC_FIGHTLANDLORD_ADD_BASECARD_NTF,this );
        MessageCallbackPro.addCallbackFunc( 'GC_FIGHTLANDLORD_OUTPUTCARD_STATE_NTF',this.GC_FIGHTLANDLORD_OUTPUTCARD_STATE_NTF,this );
        MessageCallbackPro.addCallbackFunc( 'GC_FIGHTLANDLORD_ACTION_ACK',this.GC_FIGHTLANDLORD_ACTION_ACK,this );
        MessageCallbackPro.addCallbackFunc( 'GC_FIGHTLANDLORD_CALLLAND_ACTION_NTF',this.GC_FIGHTLANDLORD_CALLLAND_ACTION_NTF,this );
        MessageCallbackPro.addCallbackFunc( 'GC_FIGHTLANDLORD_OUTPUTCARD_ACTION_NTF',this.GC_FIGHTLANDLORD_OUTPUTCARD_ACTION_NTF,this );
        MessageCallbackPro.addCallbackFunc( 'GC_FIGHTLANDLORD_GAMEOVER_STATE_NTF',this.GC_FIGHTLANDLORD_GAMEOVER_STATE_NTF,this );
        MessageCallbackPro.addCallbackFunc( 'GC_FIGHTLANDLORD_GAME_START_NTF',this.GC_FIGHTLANDLORD_GAME_START_NTF,this );
        MessageCallbackPro.addCallbackFunc( 'GC_FIGHTLANDLORD_GAME_OVER_NTF',this.GC_FIGHTLANDLORD_GAME_OVER_NTF,this );
        //MessageCallbackPro.addCallbackFunc( 'GC_FIGHTLANDLORD_SHOWCARDS_DEPOSIT_ACK',this.GC_FIGHTLANDLORD_SHOWCARDS_DEPOSIT_ACK,this );
        MessageCallbackPro.addCallbackFunc( 'GC_FIGHTLANDLORD_SHOWCARDS_DEPOSIT_NTF',this.GC_FIGHTLANDLORD_SHOWCARDS_DEPOSIT_NTF,this );
        MessageCallbackPro.addCallbackFunc( 'dealCardCallBack',this.dealCardCallBack,this );
    }

    /**
     * 删除
     */
    this.removeMessageListener = function()
    {
        MessageCallbackPro.removeCallbackFunc( EventType.Type.roomInfoAck,this.onRoomInfoAck,this );
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerAddNTF,this.onPlayerAddNTF,this );
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerRemoveNTF,this.onPlayerRemoveNTF,this );
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerStateUpdate,this.onPlayerStateUpdate,this );

        //MessageCallbackPro.removeCallbackFunc( EventType.Type.gameStart,this.onGameStart,this );
        //MessageCallbackPro.removeCallbackFunc( EventType.Type.in_ones_turn ,this);
        //MessageCallbackPro.removeCallbackFunc( EventType.Type.playerActionOver ,this);
        //MessageCallbackPro.removeCallbackFunc( EventType.Type.gameOverNTF ,this);
        //MessageCallbackPro.removeCallbackFunc( EventType.Type.leaveCurRoom ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.ROOM_STATE_GAME_BEGIN ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerMoneyChanged,this.setMoneyInfo,this);
        //MessageCallbackPro.removeCallbackFunc( EventType.Type.playerCharge,this.onPlayerChargeNTF,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.dealCards,this.onDealCards,this);
        //MessageCallbackPro.removeCallbackFunc( EventType.Type.oprFailed,this.onOprFailed,this);

        MessageCallbackPro.removeCallbackFunc( EventType.Type.changeRoomEvent,this.onChangeRoomEvent,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.reJoinRoomAck,this.onReJoinRoomAck,this); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.firstPutCardNTF,this.onFirstPutCardNTF,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.countdownWarning,this.onCountdownWarning,this ); 
        MessageCallbackPro.removeCallbackFunc( 'GC_FIGHTLANDLORD_GIVE_CARD_NTF',this.GC_FIGHTLANDLORD_GIVE_CARD_NTF,this ); 
        MessageCallbackPro.removeCallbackFunc( 'GC_FIGHTLANDLORD_GAME_BEGIN_COUNTDOWN_NTF',this.GC_FIGHTLANDLORD_GAME_BEGIN_COUNTDOWN_NTF,this );
        MessageCallbackPro.removeCallbackFunc( 'GC_FIGHTLANDLORD_CALLLANDLORD_STATE_NTF',this.GC_FIGHTLANDLORD_CALLLANDLORD_STATE_NTF,this );
        MessageCallbackPro.removeCallbackFunc( 'GC_LEAVE_FIGHTLANDLORD_ROOM_ACK',this.GC_LEAVE_FIGHTLANDLORD_ROOM_ACK,this );
        MessageCallbackPro.removeCallbackFunc( 'GC_FIGHTLANDLORD_ADD_BASECARD_NTF',this.GC_FIGHTLANDLORD_ADD_BASECARD_NTF,this );
        MessageCallbackPro.removeCallbackFunc( 'GC_FIGHTLANDLORD_OUTPUTCARD_STATE_NTF',this.GC_FIGHTLANDLORD_OUTPUTCARD_STATE_NTF,this );
        MessageCallbackPro.removeCallbackFunc( 'GC_FIGHTLANDLORD_ACTION_ACK',this.GC_FIGHTLANDLORD_ACTION_ACK,this );
        MessageCallbackPro.removeCallbackFunc( 'GC_FIGHTLANDLORD_CALLLAND_ACTION_NTF',this.GC_FIGHTLANDLORD_CALLLAND_ACTION_NTF,this );
        MessageCallbackPro.removeCallbackFunc( 'GC_FIGHTLANDLORD_OUTPUTCARD_ACTION_NTF',this.GC_FIGHTLANDLORD_OUTPUTCARD_ACTION_NTF,this );
        MessageCallbackPro.removeCallbackFunc( 'GC_FIGHTLANDLORD_GAMEOVER_STATE_NTF',this.GC_FIGHTLANDLORD_GAMEOVER_STATE_NTF,this );
        MessageCallbackPro.removeCallbackFunc( 'GC_FIGHTLANDLORD_GAME_START_NTF',this.GC_FIGHTLANDLORD_GAME_START_NTF,this );
        MessageCallbackPro.removeCallbackFunc( 'GC_FIGHTLANDLORD_GAME_OVER_NTF',this.GC_FIGHTLANDLORD_GAME_OVER_NTF,this );
        //MessageCallbackPro.removeCallbackFunc( 'GC_FIGHTLANDLORD_SHOWCARDS_DEPOSIT_ACK',this.GC_FIGHTLANDLORD_SHOWCARDS_DEPOSIT_ACK,this );
        MessageCallbackPro.removeCallbackFunc( 'GC_FIGHTLANDLORD_SHOWCARDS_DEPOSIT_NTF',this.GC_FIGHTLANDLORD_SHOWCARDS_DEPOSIT_NTF,this );
        MessageCallbackPro.removeCallbackFunc( 'dealCardCallBack',this.dealCardCallBack,this );
    }

}