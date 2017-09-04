
/**
 * 德州房间
 */
function TexasHoldemRoomView()
{
    var self = this;
    TexasHoldemRoomView.super(this);
    this.Init = function(){
        if( !NetManager.GameClintInstance ){
            NetManager.GameClintInstance = new TexasHoldemClient();
        }
        this.initMessageListener();
        this.lstTaskFinish = [];//完成的任务        
        this._firstGiveCard = true;//是否是首轮发牌
        this.getBtns();  
        this.playerControl = new THPlayerController(9);
        this.addPlayerView();
        this.createDiceEffect();
        this.registerBtnListener();
        this.gameCountdown.visible = false;
        this.initTaskInfo();
        this.setZOrder(); 
        this.registerWindowResize();        
        this.onRoomInfoAck();
    }
    this.getBtns = function(){
        this.settlementing = this.getChildByName('settlementing');
        this.settlementing.visible = false;
        this.panelTaskH = this.boxTsk.getChildByName('panelTask');
        this.intelligenceBtnV = this.btnsV.getChildByName("intelligenceBtn");        
        this.intelligenceBtnH = this.btnsH.getChildByName("intelligenceBtn");
        this.changeRoomBtnH = this.btnsH.getChildByName("changeRoomBtn");
        this.changeRoomBtnV = this.btnsV.getChildByName("changeRoomBtn");
        this.speakBtnV = this.btnsV.getChildByName("speakBtn");
        this.speakBtnH = this.btnsH.getChildByName("speakBtn");
        this.taskBtn = this.boxTsk.getChildByName("taskBtn");
    }
    this.gc = function(){
        NetManager.GameClintInstance = null;
        this.playerControl.Players = [];
        this.playerControl = null;
        this.clearTween();
        this.hideLoading();
        StatePool.clearAllState();
        this.removeBtnListener();
        this.removeMessageListener();
        var arrCards = laya.utils.Pool.getPoolBySign("card");
        for(var i in arrCards){
            arrCards[i].reset();
        }
        laya.utils.Pool.clearBySign('card');
        laya.utils.Pool.clearBySign('jetton');
        laya.utils.Pool.clearBySign('cardForm');
        TaskInfoManager.getInstance().clearRoomTask();
        Notice.getInstance().ReleaseUiNotice();
        Game.getInstance().removeUpdate( this );

        var musicBg = LocalStorage.getItem("musicBg");
        SoundManager.musicMuted = musicBg == 'false';
        SoundTool.getInstance().PlayHallBgMusic();
        this.GameRoomTopView.gc();
        THRoomMgr.getInstance().Reset();
        TaskDelayManager.getInstance().clear(); 
        Laya.timer.clearAll(this);
    }
    this.clearRoom = function(){
        StatePool.clearAllState(true);        
        this.playerControl.resetController();
        this.onGameStartCountdownOver();
        this.gameCountdown.stop();
        TaskDelayManager.getInstance().clear();
    }
    //清除Tween动画
    this.clearTween = function(){
        var numChildren = this.panelTaskH.numChildren;
        for(var i=0;i<numChildren;i++){
            var tiao = this.panelTaskH.getChildAt(i);
            var wancheng = tiao.wancheng;
            if(tiao) Tween.clearAll(tiao);
            if(wancheng) Tween.clearAll(wancheng);
        }
    }
    this.initMessageListener = function(){
        MessageCallbackPro.addCallbackFunc( EventType.Type.roomInfoAck,this.onRoomInfoAck,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.taskUpdate,this.onTaskUpdate,this );
    }
    this.removeMessageListener = function() {
        MessageCallbackPro.removeCallbackFunc( EventType.Type.roomInfoAck ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.taskUpdate,this.onTaskUpdate,this );
    }
    this.registerBtnListener = function(){
        this.backBtn.on( Event.CLICK,this,this.onExit );
        //智能选择按钮
        this.intelligenceBtnH.getChildByName('passCardBtn').init(this.onPassCardBtn,this);
        this.intelligenceBtnV.getChildByName('passCardBtn').init(this.onPassCardBtn,this);
        this.intelligenceBtnH.getChildByName('passOrDropBtn').init(this.onPassOrDropBtn,this);
        this.intelligenceBtnV.getChildByName('passOrDropBtn').init(this.onPassOrDropBtn,this);
        this.intelligenceBtnH.getChildByName('followBtn').init(this.onFollowBtn,this);
        this.intelligenceBtnV.getChildByName('followBtn').init(this.onFollowBtn,this);
        this.intelligenceBtnH.getChildByName('followAwaysBtn').init(this.onFollowAwaysBtn,this);
        this.intelligenceBtnV.getChildByName('followAwaysBtn').init(this.onFollowAwaysBtn,this);
        this.intelligenceBtnH.getChildByName('dropCardBtn').init(this.onDropCardBtn,this);
        this.intelligenceBtnV.getChildByName('dropCardBtn').init(this.onDropCardBtn,this);
        
        //发言阶段按钮  
        this.speakBtnH.getChildByName("reraiseBtn").on( Event.CLICK,this,this.onReraiseBtn );
        this.speakBtnV.getChildByName("boxReraise").getChildByName("reraiseBtn").on( Event.MOUSE_DOWN,this,this.onReraiseBtn );
        this.speakBtnH.getChildByName("dropBtn").on( Event.CLICK,this,this.onDropBtn );
        this.speakBtnV.getChildByName("dropBtn").on( Event.CLICK,this,this.onDropBtn );
        this.speakBtnH.getChildByName("passBtn").on( Event.CLICK,this,this.onPassBtn );
        this.speakBtnV.getChildByName("passBtn").on( Event.CLICK,this,this.onPassBtn );
        this.speakBtnH.getChildByName("allInBtn").on( Event.CLICK,this,this.onAllInBtn );
        this.speakBtnV.getChildByName("allInBtn").on( Event.CLICK,this,this.onAllInBtn );
        this.speakBtnH.getChildByName("followBtn").on( Event.CLICK,this,this.onFollowBtn );
        this.speakBtnV.getChildByName("followBtn").on( Event.CLICK,this,this.onFollowBtn ); 
        //换桌按钮
        this.changeRoomBtnH.on( Event.CLICK,this,this.onReJoinBtn );
        this.changeRoomBtnV.on( Event.CLICK,this,this.onReJoinBtn ); 
        //任务按钮
        this.taskBtn.on( Event.CLICK, this,this.onTaskBtnClick );

        this.bg.on(Event.CLICK,this,this.onStageClick);

        Laya.stage.on( 'hide_window',this,this.onHideWindow );
        Laya.stage.on( 'show_window',this,this.onShowWindow );
        Laya.stage.on( "window_resized",this,this.registerWindowResize);
    }
    this.removeBtnListener = function(){
        this.speakBtnH.getChildByName("reraiseBtn").off( Event.CLICK,this,this.onReraiseBtn );
        this.speakBtnV.getChildByName("boxReraise").getChildByName("reraiseBtn").off( Event.MOUSE_DOWN,this,this.onReraiseBtn );
        this.speakBtnH.getChildByName("dropBtn").off( Event.CLICK,this,this.onDropBtn );
        this.speakBtnV.getChildByName("dropBtn").off( Event.CLICK,this,this.onDropBtn );
        this.speakBtnH.getChildByName("passBtn").off( Event.CLICK,this,this.onPassBtn );
        this.speakBtnV.getChildByName("passBtn").off( Event.CLICK,this,this.onPassBtn );
        this.speakBtnH.getChildByName("allInBtn").off( Event.CLICK,this,this.onAllInBtn );
        this.speakBtnV.getChildByName("allInBtn").off( Event.CLICK,this,this.onAllInBtn );
        this.speakBtnH.getChildByName("followBtn").off( Event.CLICK,this,this.onFollowBtn );
        this.speakBtnV.getChildByName("followBtn").off( Event.CLICK,this,this.onFollowBtn ); 
        //换桌按钮
        this.changeRoomBtnH.off( Event.CLICK,this,this.onReJoinBtn );
        this.changeRoomBtnV.off( Event.CLICK,this,this.onReJoinBtn ); 
        //任务按钮
        this.taskBtn.off( Event.CLICK, this,this.onTaskBtnClick );

        this.bg.off(Event.CLICK,this,this.onStageClick);

        Laya.stage.off( 'hide_window',this,this.onHideWindow );
        Laya.stage.off( 'show_window',this,this.onShowWindow );
        Laya.stage.off( "window_resized",this,this.registerWindowResize);
    }
    this.registerWindowResize = function(){        
        if(CurScreenMode == Stage.SCREEN_HORIZONTAL){
            this.onWindowH();
        }
        else if(CurScreenMode == Stage.SCREEN_VERTICAL){
            this.onWindowV();
        }
    }
    this.toShowScence = function(){
        this.visible = true;
    }
    this.initGameRoomTopView = function(){
        //var room = THRoomMgr.getInstance().GetCurRoom();
        if(this.GameRoomTopView) return;
        this.GameRoomTopView = new GameRoomTopView();        
        this.addChild( this.GameRoomTopView );
        // this.GameRoomTopView.init(room.GetType() == ROOM_TYPE_DIAMONDS.DEMOROOM.key);
        this.GameRoomTopView.init(false);
    }
    this.setZOrder = function(){
        this.setChildIndex( this.btnsH,this.numChildren - 1 );
        this.setChildIndex( this.btnsV,this.numChildren - 1 );
        this.setChildIndex( this.diceEffect,this.numChildren-1 );
        this.setChildIndex( this.gameCountdown,this.numChildren - 1 );
        this.setChildIndex( this.taskView,this.numChildren - 1);
    }
      /**
     * 退出游戏房间
     */
    this.onExit = function(){
        this.visible = false;
        Laya.stage.size(1620,900);
        Laya.timer.once(50, this, this.toChangeScene);
    }
    this.closeExitPanel = function(){
        var mb = this.getChildByName("MessageBox");
        if(!mb) return;
        this.removeChild(mb);
    }
    this.toChangeScene = function(){
        ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.GAMEHALL ,resList:PreLoadList.getInstance().gameHall});
    }

    this.onWindowH = function(){      
        Laya.stage.size(1620,900);
        this.bg.skin = "showhandRoom/zhuozi.png";
        this.playerControl.SetPlayersPosH();
        this.btnsV.visible = false;
        this.btnsH.visible = true;
        this.boxPoolPay.pos(810,270);
        this.gameCountdown.pos(810,320);
        this.boxTsk.pos(1372,665);
        this.taskView.pos(1136,268);
        this.onWindowResize();
    }
    this.onWindowV = function(){
        Laya.stage.size(900,1620);
        this.bg.skin = "texasHoldem/desktop.png";
        this.playerControl.SetPlayersPosV();
        this.btnsV.visible = true;
        this.btnsH.visible = false;
        this.boxPoolPay.pos(450,420);
        this.gameCountdown.pos(450,640);        
        this.taskView.pos(414,958);
        this.boxTsk.pos(670,1343);
        this.onWindowResize();
    }
    this.onWindowResize = function(){
        this.visible = false;  
        this.boxCommunityCards.pos(Laya.stage.width>>1,Laya.stage.height>>1);
        //间隔一段时间防屏幕闪
        var task = new TaskDelay();
        task.callBack = this.toShowScence;
        task.classObj = this;
        task.leftTime = 50;
        TaskDelayManager.getInstance().addTask( task );  
        for(var i=0;i<this.numChildren;i++){
            var child = this.getChildAt(i);
            child && child.updateViewPos && child.updateViewPos();
        }   
    }
    this.addPlayerView = function(){
        for(var i in this.playerControl.Players){
            var player = this.playerControl.Players[i];
            this.boxPlayers.addChild(player);
            player.anchorX = 0.5;
            player.anchorY = 0.5;
        }
    }
    this.initRoomKey = function(data){
        this.room = THRoomMgr.getInstance().GetCurRoom();
        if(this.room == null) {
            this.room = THRoomMgr.getInstance().CreateRoom(data.roomKey,data.roomSummery.type);
        }
        this.room.SetRoomData(data);
        this.setBasalCistern(this.room.GetBaseNote());
        var lable = this.boxKeyRoom.getChildByName("lblKey");
        if(lable) lable.text = data.roomKey;
        this.boxKeyRoom.visible = (data.roomSummery.type == ROOM_TYPE_DIAMONDS.KEYROOM.key);
    }
    this.onRoomInfoAck = function(data){

        // data = {"poolMoney":1055000,"rState":"eSettlement","roomKey":"150",
        // "roomSummery":{"baseNote":5000,"maxNote":50000,"minCarry":20000,"roomActionTime":30000,"type":2},"turn":0,"turnMoney":0,
        // "users":[{"allinTimes":0,"headP":7,"isAction":0,"money":66946689,"name":"Pg6636","self":0,"state":"eWatching","userPos":0},
        //         {"allinTimes":0,"headP":14,"isAction":0,"money":22319971,"name":"pFk384","self":0,"state":"eWatching","userPos":1},
        //         {"allinTimes":0,"headP":13,"isAction":0,"money":4062576,"name":"5","self":1,"state":"eWatching","userPos":3},
        //         {"allinTimes":0,"headP":11,"isAction":0,"money":27954745,"name":"o1A989","self":0,"state":"eWatching","userPos":4}
        //         ]
        // };
        data = {"firstPutCardPos":0,"poolMoney":1055000,"rState":"eActionBegin","roomKey":"150",
        "roomSummery":{"baseNote":5000,"maxNote":50000,"minCarry":20000,"roomActionTime":30000,"type":2},"turn":0,"turnMoney":0,
        "users":
        [
            {"allinTimes":0,"cards":[{"cardPos":0},{"cardPos":1}],"gameMoneyInTable":25000,"headP":7,"isAction":0,"money":66946689,"name":"Pg6636","self":0,"state":"eWatching","userPos":0},
            {"allinTimes":0,"cards":[{"cardPos":0},{"cardPos":1}],"gameMoneyInTable":25000,"headP":14,"isAction":0,"money":22319971,"name":"pFk384","self":0,"state":"eWatching","userPos":1},
            {"allinTimes":0,"cards":[{"cardPos":0},{"cardPos":1}],"gameMoneyInTable":25000,"headP":7,"isAction":0,"money":66946689,"name":"Pg6636","self":0,"state":"eWatching","userPos":2},
            {"allinTimes":0,"cards":[{"cardPos":0,"num":10,"suit":"Spade"},{"cardPos":1,"num":11,"suit":"Heart"}],"gameMoneyInTable":25000,"headP":13,"isAction":0,"money":10000,"name":"5","self":1,"state":"eWatching","userPos":3},
            {"allinTimes":0,"cards":[{"cardPos":0},{"cardPos":1}],"gameMoneyInTable":25000,"headP":11,"isAction":0,"money":27954745,"name":"o1A989","self":0,"state":"eWatching","userPos":4},
            {"allinTimes":0,"cards":[{"cardPos":0},{"cardPos":1}],"gameMoneyInTable":25000,"headP":10,"isAction":0,"money":27954745,"name":"o1A939","self":0,"state":"eWatching","userPos":5},
            {"allinTimes":0,"cards":[{"cardPos":0},{"cardPos":1}],"gameMoneyInTable":25000,"headP":7,"isAction":0,"money":66946689,"name":"Pg6636","self":0,"state":"eWatching","userPos":6},
            {"allinTimes":0,"cards":[{"cardPos":0},{"cardPos":1}],"gameMoneyInTable":25000,"headP":15,"isAction":0,"money":27954745,"name":"o1A929","self":0,"state":"eWatching","userPos":7},
            {"allinTimes":0,"cards":[{"cardPos":0},{"cardPos":1}],"gameMoneyInTable":25000,"headP":7,"isAction":0,"money":66946689,"name":"Pg6636","self":0,"state":"eWatching","userPos":8},
        ]
        };

        GameData.getInstance().lockPlayerMoney = false;
        this.initRoomKey(data);    
        this.setPoolMoney( data.poolMoney );
        
        // this.setMaxBet( data.roomSummery.maxNote );
        this.playerControl.SetUserData( data );
        this.turnMoney = data.turnMoney;
        this.hideDice();
        this.playerControl.setFCPlayer();
        this.hideReraiseView();
        this.dealRoomState(data);
        this.DisconnectButtonProcess( data );
        this.hideLoading(); 
        this.updateChangeRoomBtn();
        this.initGameRoomTopView();
    }    
    //设置底注
    this.setBasalCistern = function( value ){
        this.lableAntes.text = Tools.getInstance().ChangeUIShow(value);
    }
    this.setPoolMoney = function( value ){
        if(!this.poolMoney) return;
        this.poolMoney.text = Tools.getInstance().ChangeUIShow(value); 
    }
    //创建骰子
    this.createDiceEffect = function(){
        if(!this.diceEffect){
            this.diceEffect = new DiceView();
            this.diceEffect.init(this,this.onDiceComplete);
            this.addChild(this.diceEffect);
            this.diceEffect.visible = false;
        }        
    }
    //掷骰子
    this.playDice = function(){
        var pos = GameData.getInstance().getPlayerSeatPos(this.playerControl.buttonPos);
        this.diceEffect.play(pos);
    }
    this.onDiceComplete = function(){
        this.playerControl.setFCPlayer();
    }
     //隐藏骰子
    this.hideDice = function(){
        this.diceEffect.hide();
    }
    this.ROOM_STATE_GAME_BEGIN = function(data){
        this.gameCountdown.stop();
        this.gameCountdown.setTxt( 0 );
        this.gameCountdown.visible = true;
        this.gameCountdown.scale(5,5);
        
        Tween.to( this.gameCountdown,{ scaleX : 1,scaleY : 1 },700,Ease['elasticOut'] );    
        
        var task = new TaskDelay();
        task.data = null;
        task.callBack = this.hideGameCountdown;
        task.classObj = this;
        task.leftTime = 1000;//一秒为1
        TaskDelayManager.getInstance().addTask( task );
        var guodi = this.room.GetBaseNote() * 4;
        this.playerControl.addBasalCisternJetion( guodi );
		this.settlementing.visible = false;
        this._firstGiveCard = true;
        this.playDice();
        CLog.log("Room start game begin");
    }
    this.hideGameCountdown = function(){
        this.gameCountdown.visible = false; 
        //StatePool.stateProcess(GameData.getInstance().showhandRoomState.eGameBegin);
    }
    this.dealRoomState = function(data){
        var rState = data.rState;
        switch(rState){
            case GameData.getInstance().gfRoomState.eSettlement:
                {
                    this.showSettlementing();
                }
                break;
            case GameData.getInstance().gfRoomState.eGameOver:
                {
                    GameData.getInstance().bWaitingESettlement = true;
                    this.playerControl.clearTable();
                    this.showSettlementing();
                }
                break;
            case GameData.getInstance().gfRoomState.eActionBegin:
                {
                }
                break;
            case GameData.getInstance().gfRoomState.eWaitingGameBegin:
                {
                    this.gameStartCountdown( data.countdown );                    
                }
                break;
            default:
                if(this.settlementPro && this.settlementPro.visible){
                    CLog.log("??????????????????  游戏状态:"+data.rState + " ????????");
                    this.settlementPro.close(true);
                }
                break;
        }
    }
    //断线重连后按钮处理
    this.DisconnectButtonProcess = function( data ){
        for( var i = 0; i < data.users.length;i++ ){
            var user = data.users[i];
            if( user.isAction )
            {
                if( this.playerControl.isLocalPlayer(user.userPos) )
                {
                    this.setButtonShow(user);
                }else 
                {
                    this.intelligenceBtnVisibleSet(true);
                }    
            }
        }
    }
     /**
     * 按钮处理
     */
    this.setButtonShow = function(data,bDelay){
        var selectName = this.getIntelligenceSelect();
        if(bDelay && (selectName != '')){
            var task = new TaskDelay();
            task.callBack = function(){
                this.intelligenceSelectReq();
            };

            task.classObj = this;
            task.leftTime = GameData.getInstance().autoActionDelay;//
            TaskDelayManager.getInstance().addTask( task );
        }
        else{
            this.intelligenceSelectReq();
        }
    }
    //隐藏所有操作按钮
    this.invisibleAllOptBtns = function(){
        this.intelligenceBtnVisibleSet(false);
        this.speakBtnVisibleSet(false);
        this.changeRoomBtnVisibleSet(false);
    }
     /**
     * 智能发言按钮显示状态
     */
    this.intelligenceBtnVisibleSet = function(bShow){        
        this.intelligenceBtnV.visible = bShow;        
        this.intelligenceBtnH.visible = bShow;
        if(bShow){
            this.changeRoomBtnH.visible = false;
            this.changeRoomBtnV.visible = false;
            this.speakBtnV.visible = false;
            this.speakBtnH.visible = false;
        }        
    }
    //设置操作按钮显示状态
    this.speakBtnVisibleSet = function(bShow){
        this.speakBtnV.visible = bShow;
        this.speakBtnH.visible = bShow;
        if(bShow){
            this.intelligenceBtnV.visible = false;        
            this.intelligenceBtnH.visible = false;
            this.changeRoomBtnH.visible = false;
            this.changeRoomBtnV.visible = false;
        }        
    }
    
    //设置换房按钮显示状态
    this.changeRoomBtnVisibleSet = function(bShow){
        this.changeRoomBtnV.visible = bShow;
        this.changeRoomBtnH.visible = bShow;
        if(bShow){
            this.intelligenceBtnV.visible = false;        
            this.intelligenceBtnH.visible = false;
            this.speakBtnH.visible = false;
            this.speakBtnV.visible = false;
        }        
    }
     /**
     * 预操作向服务端发起下注请求,没有预操作则显示下注按钮
     */
    this.intelligenceSelectReq = function(money){
        var selectName = this.getIntelligenceSelect();
        var myMoney = this.playerControl.getLocalPlayerMoney();
        var followMoney = this.getFollowValue();
        switch( selectName )
        {
            case 'dropCardBtn':
                //NetManager.GameClintInstance.CG_GOLDENFLOWER_ACTION_REQ(-1);
                break;
            case 'followAwaysBtn':
                if(myMoney < followMoney){
                    this.speakButtonProcess();
                }
                else{
                    //NetManager.GameClintInstance.CG_GOLDENFLOWER_ACTION_REQ(followMoney);
                }                
                break;    
            case 'followBtn':
                this.setCheckButtonState(this.intelligenceBtnH,'followBtn');
                this.setCheckButtonState(this.intelligenceBtnV,'followBtn');
                if(myMoney < followMoney){
                    this.speakButtonProcess();
                }
                else{
                    //NetManager.GameClintInstance.CG_GOLDENFLOWER_ACTION_REQ(followMoney);                    
                }
                break;  
            default:
                {
                    this.speakButtonProcess();
                }   
                break;    
        }
        //StatePool.stateProcess(GameData.getInstance().gfRoomState.eActionBegin);
    }
    /**
     * 获得智能选择模式
     */
    this.getIntelligenceSelect = function(){
        var btnList = ['passCardBtn','passOrDropBtn','followBtn','followAwaysBtn','dropCardBtn'];
        for( var i = 0;i < btnList.length;i++ )
        {
            if( this.getCheckButtonState( btnList[i] ) )
            {
                return btnList[i];
            }
        }
        return '';
    }
    
    /**
     * 获得checkbutton状态
     */
    this.getCheckButtonState = function( btnName ){
        var b = this.intelligenceBtnH.visible ? this.intelligenceBtnH : this.intelligenceBtnV;
        var Btn   = b.getChildByName( btnName );
        return Btn.getIsCheck();
    }
    //换房按钮控制
    this.updateChangeRoomBtn = function(){
        var roomType = this.room.GetType();
        if(roomType == ROOM_TYPE_DIAMONDS.KEYROOM.key){
            this.changeRoomBtnVisibleSet(false);
        }
        else{
            var state = this.playerControl.getLocalPlayerState();
            var playing = (state === TH_PLAYER_STATE.Playing);
            this.changeRoomBtnVisibleSet(!playing);
        }        
    }
     /**
     * 操作按钮控制
     */
    this.speakButtonProcess = function(){
        this.speakBtnVisibleSet(true);
        var localMoney = this.playerControl.getLocalPlayerMoney();
        //余额不足时只能all in
        if( this.getFollowValue() >  localMoney)
        {
            this.speakBtnH.getChildByName("followBtn").visible = false;
            this.speakBtnV.getChildByName("followBtn").visible = false;
            this.speakBtnH.getChildByName("passBtn").visible = false;
            this.speakBtnV.getChildByName("passBtn").visible = false;
            this.speakBtnH.getChildByName("reraiseBtn").visible = false;
            this.speakBtnV.getChildByName("boxReraise").getChildByName("reraiseBtn").visible = false;
            this.speakBtnH.getChildByName("allInBtn").visible = true;
            this.speakBtnV.getChildByName("allInBtn").visible = true;
            SoundTool.getInstance().PlayGameSound(EnumGameSound.NO_MONEY,ENUM_SEX.FEMALE);
        }else if( this.turnMoney > 0 )
        {
            this.speakBtnH.getChildByName("followBtn").visible = true;
            this.speakBtnV.getChildByName("followBtn").visible = true;
            this.speakBtnH.getChildByName("passBtn").visible = false;
            this.speakBtnV.getChildByName("passBtn").visible = false;
            this.speakBtnH.getChildByName("reraiseBtn").visible = true;
            this.speakBtnV.getChildByName("boxReraise").getChildByName("reraiseBtn").visible = true;
            this.speakBtnH.getChildByName("allInBtn").visible = false;
            this.speakBtnV.getChildByName("allInBtn").visible = false;
        }else 
        {
            this.speakBtnH.getChildByName("followBtn").visible = false;
            this.speakBtnV.getChildByName("followBtn").visible = false;
            this.speakBtnH.getChildByName("passBtn").visible = true;
            this.speakBtnV.getChildByName("passBtn").visible = true;
            this.speakBtnH.getChildByName("reraiseBtn").visible = true;
            this.speakBtnV.getChildByName("boxReraise").getChildByName("reraiseBtn").visible = true;
            this.speakBtnH.getChildByName("allInBtn").visible = false;
            this.speakBtnV.getChildByName("allInBtn").visible = false;
        }
    }
    //智能按钮 总是跟注
    this.onFollowAwaysBtn = function(event){
        if( event.target.getIsCheck() ){
            this.setCheckButtonState( this.intelligenceBtnH,'passOrDropBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'passOrDropBtn' );
            this.setCheckButtonState( this.intelligenceBtnH,'passCardBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'passCardBtn' );
            this.setCheckButtonState( this.intelligenceBtnH,'followBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'followBtn' );
            this.setCheckButtonState( this.intelligenceBtnH,'dropCardBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'dropCardBtn' );
        }
        var txt = event.currentTarget.getChildByName('txt');
        txt.color = event.target.getIsCheck() ? GameData.getInstance().COLOR.BLACK : GameData.getInstance().COLOR.WHITE;
    }
    
    //智能按钮 智能跟注
    this.onFollowBtn = function ( event ){
        if( event.target.getIsCheck() )
        {
            this.setCheckButtonState( this.intelligenceBtnH,'passOrDropBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'passOrDropBtn' );
            this.setCheckButtonState( this.intelligenceBtnH,'passCardBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'passCardBtn' );
            this.setCheckButtonState( this.intelligenceBtnH,'followAwaysBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'followAwaysBtn' );
            this.setCheckButtonState( this.intelligenceBtnH,'dropCardBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'dropCardBtn' );
        }
        var txt = event.currentTarget.getChildByName('txt');
        txt.color = event.target.getIsCheck() ? GameData.getInstance().COLOR.BLACK : GameData.getInstance().COLOR.WHITE;
    }
    
    //智能按钮 弃或过按钮点击处理
    this.onPassOrDropBtn = function ( event ){
        if( event.target.getIsCheck() )
        {
            this.setCheckButtonState( this.intelligenceBtnH,'followBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'followBtn' );
            this.setCheckButtonState( this.intelligenceBtnH,'passCardBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'passCardBtn' );
            this.setCheckButtonState( this.intelligenceBtnH,'followAwaysBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'followAwaysBtn' );
            this.setCheckButtonState( this.intelligenceBtnH,'dropCardBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'dropCardBtn' );
        }
        var txt = event.currentTarget.getChildByName('txt');
        txt.color = event.target.getIsCheck() ? GameData.getInstance().COLOR.BLACK : GameData.getInstance().COLOR.WHITE;
    }
    
    //智能按钮 过牌按钮点击处理
    this.onPassCardBtn = function ( event ){
        if( event.target.getIsCheck() )
        {
            this.setCheckButtonState( this.intelligenceBtnH,'followBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'followBtn' );
            this.setCheckButtonState( this.intelligenceBtnH,'passOrDropBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'passOrDropBtn' );
            this.setCheckButtonState( this.intelligenceBtnH,'followAwaysBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'followAwaysBtn' );
            this.setCheckButtonState( this.intelligenceBtnH,'dropCardBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'dropCardBtn' );
        }
        var txt = event.currentTarget.getChildByName('txt');
        txt.color = event.target.getIsCheck() ? GameData.getInstance().COLOR.BLACK : GameData.getInstance().COLOR.WHITE;
    }
    
    //智能按钮 弃牌
    this.onDropCardBtn = function( event ){
        if( event.target.getIsCheck() )
        {
            this.setCheckButtonState( this.intelligenceBtnH,'followBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'followBtn' );
            this.setCheckButtonState( this.intelligenceBtnH,'passOrDropBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'passOrDropBtn' );
            this.setCheckButtonState( this.intelligenceBtnH,'followAwaysBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'followAwaysBtn' );
            this.setCheckButtonState( this.intelligenceBtnH,'passCardBtn' );
            this.setCheckButtonState( this.intelligenceBtnV,'passCardBtn' );
        }
        var txt = event.currentTarget.getChildByName('txt');
        txt.color = event.target.getIsCheck() ? GameData.getInstance().COLOR.BLACK : GameData.getInstance().COLOR.WHITE;
    }
    /**
     * 重置智能发言按钮状态g
     */
    this.resetIntelligenceBtn = function(bExceptFollowAways){
        this.intelligenceBtnH.getChildByName('followBtn').reset();
        this.intelligenceBtnV.getChildByName('followBtn').reset();
        this.intelligenceBtnH.getChildByName('passOrDropBtn').reset();
        this.intelligenceBtnV.getChildByName('passOrDropBtn').reset();
        this.intelligenceBtnH.getChildByName('dropCardBtn').reset();
        this.intelligenceBtnV.getChildByName('dropCardBtn').reset();
        this.intelligenceBtnH.getChildByName('passCardBtn').reset();
        this.intelligenceBtnV.getChildByName('passCardBtn').reset();

        var white = GameData.getInstance().COLOR.WHITE;
        this.intelligenceBtnH.getChildByName('followBtn').getChildByName('txt').color = white;
        this.intelligenceBtnV.getChildByName('followBtn').getChildByName('txt').color = white;
        this.intelligenceBtnH.getChildByName('passOrDropBtn').getChildByName('txt').color = white;
        this.intelligenceBtnV.getChildByName('passOrDropBtn').getChildByName('txt').color = white;
        this.intelligenceBtnH.getChildByName('dropCardBtn').getChildByName('txt').color = white;
        this.intelligenceBtnV.getChildByName('dropCardBtn').getChildByName('txt').color = white;
        this.intelligenceBtnH.getChildByName('passCardBtn').getChildByName('txt').color = white;
        this.intelligenceBtnV.getChildByName('passCardBtn').getChildByName('txt').color = white;
        if(!bExceptFollowAways){
            this.intelligenceBtnH.getChildByName('followAwaysBtn').reset();
            this.intelligenceBtnV.getChildByName('followAwaysBtn').reset();
            this.intelligenceBtnH.getChildByName('followAwaysBtn').getChildByName('txt').color = white;
            this.intelligenceBtnV.getChildByName('followAwaysBtn').getChildByName('txt').color = white;
        }
        
    }
    
    /**
     * 设置按钮为普通状态
     */
    this.setCheckButtonState = function(_node, _name ){
        var Btn  = _node.getChildByName( _name );
        if( Btn === null ) return;
        Btn.setActive('btnDown',false);
        Btn.setActive('btnNormal',true);
        var txt = Btn.getChildByName('txt');
        if(txt) txt.color = '#FFFFFF';
    }
    //过牌
    this.onPassBtn = function( event ){
        // NetManager.GameClintInstance != undefined && NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ(0);
        this.speakBtnH.visible = false;
        this.speakBtnV.visible = false;
        // StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin);
    }
    
    //弃牌
    this.onDropBtn = function( event ){
        // NetManager.GameClintInstance != undefined && NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ(-1);
        // StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin); 
        this.speakBtnH.visible = false;
        this.speakBtnV.visible = false;
    }
    
    //加注
    this.onReraiseBtn = function( event ) {
        this.showReraiseView();
    }    
    //allIn 
    this.onAllInBtn = function(){
        // NetManager.GameClintInstance != undefined && NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ( this.PlayerControlCom.getLocalPlayerMoney() );
        // StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin);
        this.speakBtnH.visible = false;
        this.speakBtnV.visible = false;
    }
    /**
     * 获得跟注金额
     */
    this.getFollowValue = function(){
        return this.turnMoney - this.playerControl.getLocalPlayerTurnMoneyInTable();
    }
     /**
     * 加注处理
     */
    this.showReraiseView = function(){
        var v = null;
        var maxBetValue = parseInt(10000);
        var curMoney = this.playerControl.getLocalPlayerMoney();
        var maxValue = maxBetValue <  curMoney ? maxBetValue : curMoney;
        if(CurScreenMode === Stage.SCREEN_VERTICAL){
            if(!this.reraisePanelV){
                this.reraisePanelV = new ReraiseV();
                this.reraisePanelV.init( this.confirmReraise,this );
                this.addChild( this.reraisePanelV );
                this.reraisePanelV.pos(390,544);
            }
            this.reraisePanelV.show( true );        
            this.reraisePanelV.setMaxbet( maxValue );  
        }
        else{
            if(!this.reraisePanelH){
                this.reraisePanelH = new ReraiseView();
                this.reraisePanelH.init( this.confirmReraise,this );
                this.addChild( this.reraisePanelH );
            }
            this.reraisePanelH.show( true );        
            this.reraisePanelH.setMaxbet( maxValue );        
            this.reraisePanelH.y = Laya.stage.height;
            Tween.to( this.reraisePanelH,{y:Laya.stage.height - this.reraisePanelH.height},200 );
        }
    }
    //关闭加注界面
    this.hideReraiseView = function(){
        if(this.reraisePanelH) this.reraisePanelH.visible = false;
        if(this.reraisePanelV) this.reraisePanelV.visible = false;
    }
    this.confirmReraise = function(){
        //确认加注
        if( NetManager.GameClintInstance != undefined )
        {
            if(CurScreenMode === Stage.SCREEN_VERTICAL){
                var value = this.reraisePanelV.getReraiseValue();
            }
            else{
                value = this.reraisePanelH.getReraiseValue();
            }
            if(value == 0){
                this.hideReraiseView();
            }
            else{                
                (this.turnMoney > 0) && (value += this.turnMoney);  //有人下过注了 就在上家的基础上加注
                //NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ( value );
                StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin);
                this.btnsH.visible = false;
                this.btnsV.visible = false;
            }
        }        
    }
    this.onHideWindow = function(){
        this.clearRoom();
        this.removeMessageListener();
    }

    this.onShowWindow = function(){
        if(!GATE_CONNECTED) return;
        this.initMessageListener();       
        this.playerControl.clearTable();

        this.gameCountdown.visible = false;
        this.updateChangeRoomBtn();
        TaskDelayManager.getInstance().clear();

        if(this.bWaitingChangeRoom){
            this.bWaitingChangeRoom = false;
            this.toGetRoomInfo();
        }
        else{
            //NetManager.GameClintInstance.CG_GET_ROOM_INFO_REQ();
        }        
    }   
    //游戏开始
    this.onGameStart = function(data){
        StatePool.clearAllState();
        this.onGameStartOrOver();
        GameData.getInstance().lockPlayerMoney = false;
        this.playerControl.buttonPos = data.firstPutCardPos;
        this.resetIntelligenceBtn();
        this.setPoolMoney( data.poolMoney );
        this.setBasalCistern( data.base );
        this.updateChangeRoomBtn();
        CLog.log("游戏开始 onGameStart");    
    }
    /**
     * 游戏开始前倒计时完成
     */
    this.onGameStartCountdownOver = function(){
        this.gameCountdown.visible = false;
        this.playerControl.clearCards();
    }
    //当游戏开始或者结束时，处理一下延迟动作和界面操作,主要是因为有可能网络延迟，服务端同一帧发来积压的多条游戏消息，导致界面显示不对
    this.onGameStartOrOver = function(){
        TaskDelayManager.getInstance().clearTarget(this);
        // 关闭加注界面
        this.hideReraiseView();
        //关闭结算界面
        if(this.settlementPro && this.settlementPro.visible){
            this.settlementPro.close(true);
        }
        //关闭掷骰子界面
        if(this.diceEffect && this.diceEffect.visible){
            this.hideDice();
        }
    }
    this.toGetRoomInfo = function(){
        this.bWaitingChangeRoom = false;
        NetManager.GameClintInstance.CG_IM_READY_REQ();
    }
    //显示结算中
    this.showSettlementing = function(){
        this.settlementing.visible = true;
        this.settlementing.pos( (Laya.stage.width) >> 1,0);
        Tween.to( this.settlementing,{ y:(Laya.stage.height) >> 1 },700,Ease['elasticOut'] );
        
        var self = this;
        var task = new TaskDelay();
        task.data = null;
        task.callBack = function(){ this.settlementing.visible = false; };
        task.classObj = this;
        task.leftTime = 10000;//一秒为1
        task.forceExecute = true;
        TaskDelayManager.getInstance().addTask( task );
        CLog.log('======showSettlementing');
    }
    /**
     * 游戏结束
     */
    this.onGameOverNTF = function(data){
        this.onGameStartOrOver();
        this.playerControl.onGameOver(data);     
        GameData.getInstance().lockPlayerMoney = true;
        this.playerControl.buttonPos = -1;
        this.playerControl.setFCPlayer();
        var task = new TaskDelay();
        task.data = data;
        task.callBack = this.sendGameOverState;
        task.classObj = this;
        task.leftTime = this.playerControl.delayTime;//
        TaskDelayManager.getInstance().addTask( task );
    }
    //换房时显示的loading
    this.showLoading = function(){ 
        this.loadingUI = new TipsMessage("换桌请求中，请稍候...",true,true);
    }
    this.hideLoading = function(){
        if(this.loadingUI){
            this.loadingUI.hide();
            this.loadingUI = null;
        }
    }
    //收到游戏开始倒计时消息
    this.onGameStartCountdownEvent = function(data){
        this.settlementing.visible = false; 
        if(data.countdown == -1){
            this.gameCountdown.visible = false;
        }
        else{
            this.gameStartCountdown( data.countdown );
        }                     
    }
     /**
     * 游戏开始前倒计时
     */
    this.gameStartCountdown = function( time ){
        if(time == undefined || time == null || time<= 0) return;
        if(this.settlementPro && this.settlementPro.visible){
            this.settlementPro.close();
        }
        this.gameCountdown.visible = true;
        this.gameCountdown.startTimer(time,this.onGameStartCountdownOver,this,null,false);
        this.hideDice();        
    }
    //发牌处理
    this.onDealCards = function(data){
        if( GameData.getInstance().isGameHide || !data.hasOwnProperty('usersAndCards'))
            return;
        if(data.usersAndCards.length == 0){
            this.playerControl.dealCardCallBack();
            return;
        }        
        //首轮发牌延迟一段时间用于掷骰子
        if(this._firstGiveCard){
            this.playerControl.setCardsInfo(data);
            var task = new TaskDelay();
            task.data = data;
            task.callBack = function(data){this.playerControl.dealCards();};
            task.classObj = this;
            task.leftTime = 2000;
            TaskDelayManager.getInstance().addTask( task );   
        }
        else if(data.usersAndCards[0].userPos == -1){
            this.playerControl.dealCommunityCards(data.usersAndCards,this.boxCommunityCards);
        }
        else{
            this.playerControl.setCardsInfo(data);
            this.playerControl.dealCards();
        }
    }
    
    /**
     * 某个玩家开始下注
     */
    this.onIn_ones_turn = function(data){
        this.playerControl.onInOnesturn(data);
        var lp = this.playerControl.getLocalPlayer();
        if( this.playerControl.isLocalPlayer(data.userPos) ){
            this.setButtonShow(data,true);
        }
        else if(lp && (TH_PLAYER_STATE.Playing == lp.getPlayerState())){
            this.intelligenceBtnVisibleSet(true);
        }
        else{
            this.changeRoomBtnVisibleSet(true);
        }
    }

    /**
     * 玩家下注完毕
     */
    this.onPlayerActionOver = function(data){        
        this.turnMoney = data.turnMoney;        
        this.setPoolMoney(data.poolMoney);
        this.playerControl.playerActionOver(data);

        if( this.playerControl.isLocalPlayer(data.userPos) ){
            this.resetIntelligenceBtn(true);
            this.intelligenceBtnVisibleSet(true);
            this.updateChangeRoomBtn();
            this.hideReraiseView();
        }
        this.calcActionType(data);
    }
     /**
     * 解析行动目的
     */
    this.calcActionType = function(data)
    {
        var tempMoney = data.actionMoney;
        var userMoney = data.money;
        var gameMoneyInTable = data.gameMoneyInTable;
        //CLog.log("解析行动目的  actionMoney:"+tempMoney + "  money:"+userMoney);
        var sex = this.playerControl.getPlayerByPos(data.userPos).getSex();
        //全梭
        if(parseInt(userMoney) === 0)
        {
            SoundTool.getInstance().PlayGameSound(EnumGameSound.ALL_IN,sex);
            this.playerControl.showTalk( data.userPos,'All In');
            this.playerControl.showAllIn(data.userPos,data.allinTime);
            if( this.playerControl.isLocalPlayer(data.userPos) )
            {
                this.invisibleAllOptBtns();
            }
        }
        else if(tempMoney === -1)
        {
            //弃牌
            SoundTool.getInstance().PlayGameSound(EnumGameSound.DROP_CARD,sex);
            this.playerControl.showTalk( data.userPos,'弃牌');
            this.playerControl.dropCard( data.userPos );            
        }
        //过牌
        else if(data.actionState === TH_ACTION_STATE.GuoPai)
        {
            this.playerControl.showTalk( data.userPos,'过牌');
            SoundTool.getInstance().PlayGameSound(EnumGameSound.PASS_CARD,sex);
        }
        //下注
        else if(data.actionState === TH_ACTION_STATE.XiaZhu)
        {
            //SoundTool.getInstance().PlayGameSound(EnumGameSound.STAKE);
            this.playerControl.showTalk( data.userPos,'押注：' + Tools.getInstance().ChangeUIShow(tempMoney));
        }
        //跟注
        else if(data.actionState === TH_ACTION_STATE.GenZhu)
        {
            SoundTool.getInstance().PlayGameSound(EnumGameSound.FOLLOW_CARD,sex);
            this.playerControl.showTalk( data.userPos,'跟注：' + Tools.getInstance().ChangeUIShow(tempMoney));
        }
        //加注
        else if(data.actionState === TH_ACTION_STATE.JiaZhu) 
        {
            SoundTool.getInstance().PlayGameSound(EnumGameSound.RAISE,sex);
            this.playerControl.showTalk( data.userPos,'加注：' + Tools.getInstance().ChangeUIShow(tempMoney));
        }
        else 
        {
            CLog.log("ShowHandManager???????????出问题了?????????????");
            CLog.log("ShowHandManager 某人回合完毕 money:"+userMoney+"  self.turnMoney:"+data.turnMoney+"  actionMoney:"+tempMoney);
        }
        
        //往桌子上添加筹码
        if( tempMoney > 0 )
        {
            this.playerControl.JetionPro( data.actionMoney,data.userPos,true );
        }

        //显示梭哈效果
        if( userMoney == 0 || tempMoney >= parseFloat(this.maxBetMoney) )
        {
            this.playerControl.showAllInEffect( data.userPos );
            
        }
        this.playerControl.setPlayerGameMoneyInTable( data.userPos,gameMoneyInTable );
    }
    //发送游戏结束状态
    this.sendGameOverState = function( data ){
        //倒计时完成后 通知服务器 本轮游戏结束
        //StatePool.stateProcess(GameData.getInstance().showhandRoomState.eGameOver);
        //this.calcWinOrLose( data );
        if( this.settlementPro == null ){
            this.settlementPro = new SettlementView();
            var roomType = this.room.GetType();
            this.settlementPro.init(this.playerControl,roomType);
            this.addChild( this.settlementPro );
        }
        this.changeRoomBtnH.visible = false;
        this.changeRoomBtnV.visible = false;
        this.settlementPro.show( data ,{callBack:this.settlementPanelClose,classObj:this});
        this.checkUserMoney();
        this.closeExitPanel();
    }
    //游戏回合开始或者是结束
    this.onTurnStateNTF = function(data){
        // //0代表开始，1代表结束
        // if( data.turnState == 0 )
        // {
        //     this.turnMoney = 0;
        //     this.PlayerControlCom.onTurnBegin();            
        // }else if( data.turnState == 1 ) 
        {
            this.playerControl.collectJettions(this.boxPoolJettons.localToGlobal(new Point(5,5)));
            //StatePool.stateProcess(GameData.getInstance().showhandRoomState.eTurnOver);
        }        
    }
    //检测玩家余额 余额不足强制充钱
    this.checkUserMoney = function(){
        var money = User.getInstance().GetGameMoney();
        CLog.log("检测玩家余额.... money:"+money);
        var bank = User.getInstance().GetBankMoney();
        var guodi = this.room.GetBaseNote() * 4;
        //if(money + bank < guodi) return;//玩家所有资产小于最低金额 则不再强制充钱（将会等待被踢）
        if(money < guodi){
            new HintMessage("您的余额已不足");
            // //当余额比较充裕时 取2倍锅底，否则取最小金钱
            // var suggestMoney = bank > (2 * guodi) ? 2 * guodi : guodi - money;
            // this.GameRoomTopView.rechargeBtn.ForceCharge(suggestMoney);
        }        
    }
    //结算界面关闭
    this.settlementPanelClose = function( clickClose ){
        this.setPoolMoney(0);
        this.playerControl.clearTable();
        this.playerControl.clearCards();
        if( clickClose ){
            this.showSettlementing();
        }
        this.updateChangeRoomBtn();
        this.checkTaskFinish();
    }   
    //玩家状态更新
    this.onPlayerStateUpdate = function(data){
        this.playerControl.setPlayerStateAndMoney(data);        
         if(this.playerControl.isLocalPlayer(data.userPos)){
             this.updateChangeRoomBtn();
             if(data.hasOwnProperty("allinTimes") && data.allinTime > 0){
                this.invisibleAllOptBtns();
             }
         }
    }
    //初始化任务
    this.initTaskInfo = function(){
        this.taskView = this.getChildByName("taskView");
        TaskInfoManager.getInstance().InitUITaskInfo(this.taskView.getChildByName("lstTask"),true);
        this.updateTaskNum();
        this.taskView.visible = false;
    }
    //任务状态发生变化，包括新增，修改
    this.onTaskUpdate = function(content){
        if(content.Status == TaskStatus.FINISH){
            //var content = {TaskID:3,Name:"在3局梭哈比赛中获胜",StatusDesc:'2/3',Rewards:[{TID:0,Count:2140}],Status:'4'};
            this.lstTaskFinish.push(content);
            this.checkTaskFinish();
        }
        else{
            this.updateTaskNum();
        }
    }
    //检查是否有完成的任务
    this.checkTaskFinish = function(){
        if(!this.panelTaskH) return;
        var delayTime = 0;
        for(var i in this.lstTaskFinish){            
            var id = this.lstTaskFinish[i].TaskID;
            new TaskMessage(id,this.panelTaskH,delayTime);
            delayTime += 5000;
            CLog.log('任务完成   id:'+id + "   i:"+i);
        }
        this.lstTaskFinish = []; 
        // this.lstTask.array = [];
        // this.createTaskItem();
        this.updateTaskNum();       
    }
    //任务完成数量
    this.updateTaskNum = function(){
        var curScense = ChangeScene.getInstance().getSceneType();
        var lableH = this.taskBtn.getChildByName('lbTaskProgress');
        var compNum = TaskInfoManager.getInstance().GetComplatedTaskNum(curScense); 
        var count = TaskInfoManager.getInstance().GetTaskBySceneType(curScense).length;
        lableH.text = compNum + '/' + count;
        var lbl = this.taskView.getChildByName('lblNone');
        if(lbl){
            lbl.visible = count == 0;
        }
    }
    //任务按钮
    this.onTaskBtnClick = function(){
        // this.taskView.visible = !this.taskView.visible;
        // //new TaskMessage(TaskInfoManager.getInstance().GetAllTask()[0].TaskID,this.panelTaskH);

        //测试任务
        // var content = {TaskID:0,ServerType:0,Name:"在3局梭哈比赛中获胜",StatusDesc:'2/3',Rewards:[{TID:0,Count:2140}],Status:4};
        // TaskInfoManager.getInstance().UpdateTask(content);
        // return;
        // //测试公告
        // this.num = this.num ? (this.num + 1) : 0;
        // var test =  "<span style= 'color:#FF6A6A;font-weight:bold'>简介"+this.num+"</span>";
        // test += "<span style='color:#FFFFFF'>梭哈是一款扑克游戏，游戏凉快急死了都看见。</span>";
        // var content = {count:-1,content:test};
        // GateSocketClient.getInstance().GC_ADDTEMPNOTICE_NTF(content);
        // return;


        if(!this.xx) this.xx = 0;
        if(this.xx == 0){
            var data = {"content":{"countdown":5000}};
            this.onGameStartCountdownEvent(data.content);            
        }
        else if(this.xx == 1){
            data = {"base":5000,"firstPutCardPos":1,"poolMoney":100000};
            this.onGameStart(data);
            this.onPlayerStateUpdate({userPos:0,state:'ePlaying'});
            this.onPlayerStateUpdate({userPos:1,state:'ePlaying'});
            this.onPlayerStateUpdate({userPos:2,state:'ePlaying'});
            this.onPlayerStateUpdate({userPos:3,state:'ePlaying'});
            this.onPlayerStateUpdate({userPos:4,state:'ePlaying'});
            this.onPlayerStateUpdate({userPos:5,state:'ePlaying'});
            this.onPlayerStateUpdate({userPos:6,state:'ePlaying'});
            this.onPlayerStateUpdate({userPos:7,state:'ePlaying'});
            this.onPlayerStateUpdate({userPos:8,state:'ePlaying'});
            this.ROOM_STATE_GAME_BEGIN();
        }
        else if(this.xx == 2){
            data = {"usersAndCards":[
            {"cards":[{"cardPos":0},{"cardPos":1}],"userPos":0},
            {"cards":[{"cardPos":0},{"cardPos":1}],"userPos":1},
            {"cards":[{"cardPos":0},{"cardPos":1}],"userPos":2},
            {"cards":[{"cardPos":0,"num":8,"suit":"Diamond"},{"cardPos":1,"num":9,"suit":"Spade"}],"userPos":3},
            {"cards":[{"cardPos":0},{"cardPos":1}],"userPos":4},
            {"cards":[{"cardPos":0},{"cardPos":1}],"userPos":5},
            {"cards":[{"cardPos":0},{"cardPos":1}],"userPos":6},
            {"cards":[{"cardPos":0},{"cardPos":1}],"userPos":7},
            {"cards":[{"cardPos":0},{"cardPos":1}],"userPos":8},
            ]};
            
            this.onDealCards(data);
        }
        else if(this.xx == 3){
            data = {"actionTime":30000,"canAdd":1,"cardForm":"SanPai","num":13,"suit":"Spade","userPos":3};
            this.onIn_ones_turn(data);
        }
        else if(this.xx == 4){
            data = {"actionMoney":-1,"actionState":"eAbandon","allinTime":0,"gameMoneyInTable":25000,"money":65451,
            "poolMoney":105000,"state":"eWatching","turnMoney":5000,"turnMoneyInTable":5000,"userPos":3};
            this.onPlayerActionOver(data);
        }
        else if(this.xx == 5){
            data = {"actionTime":30000,"canAdd":1,"userPos":4};
            this.onIn_ones_turn(data);
        }
        else if(this.xx == 6){
            data = {"actionMoney":3971300,"actionState":"eJiaZhu","allinTime":0,"gameMoneyInTable":39913,"money":3699276,"poolMoney":145000,"state":"ePlaying","turnMoney":55000,"turnMoneyInTable":55000,"userPos":4};
            this.onPlayerActionOver(data);
        }
        else if(this.xx == 7){
            data = {"usersAndCards":[
            {"cards":[
                {"cardPos":0,"num":8,"suit":"Diamond"},
                {"cardPos":1,"num":9,"suit":"Spade"},
                {"cardPos":2,"num":12,"suit":"Spade"},
                {"cardPos":3,"num":3,"suit":"Spade"},
                {"cardPos":4,"num":1,"suit":"Heart"}
                ],"userPos":-1},
            ]};
            this._firstGiveCard = false;
            this.onDealCards(data);            
        }
        else if( this.xx == 8){
            this.onTurnStateNTF();
        }
        else{
            data = {"poolMoney":0,showCardForm:true,"winners":
                [
                    {"abandon":0,"cardForm":"SanPai","holeCards":[{"cardPos":0,"num":2,"suit":"Diamond"},{"cardPos":1,"num":10,"suit":"Diamond"}],"cards":[
                        {"cardPos":0,"num":8,"suit":"Diamond"},
                        {"cardPos":1,"num":10,"suit":"Diamond"},
                        {"cardPos":2,"num":12,"suit":"Spade"},
                        {"cardPos":3,"num":9,"suit":"Spade"},
                        {"cardPos":4,"num":1,"suit":"Heart"}],"escape":0,"headIconName":13,"inputMoney":40000,"returnMoney":0,"userName":"5","userPos":0},
                    {"abandon":0,"cardForm":"erdui","holeCards":[{"cardPos":0,"num":8,"suit":"Spade"},{"cardPos":1,"num":12,"suit":"Club"}],"cards":[
                        {"cardPos":0,"num":8,"suit":"Diamond"},
                        {"cardPos":1,"num":12,"suit":"Club"},
                        {"cardPos":2,"num":8,"suit":"Spade"},
                        {"cardPos":3,"num":1,"suit":"Heart"},
                        {"cardPos":4,"num":12,"suit":"Spade"}],"escape":0,"headIconName":1,"inputMoney":40000,"returnMoney":78000,"userName":"4","userPos":1},
                    // {"abandon":0,"cardForm":"erdui","cards":[
                    //     {"cardPos":0,"num":10,"suit":"Spade"},
                    //     {"cardPos":1,"num":12,"suit":"Club"},
                    //     {"cardPos":2,"num":9,"suit":"Spade"}],"escape":0,"headIconName":0,"inputMoney":40000,"returnMoney":78000,"userName":"48754","userPos":2},
                    {"abandon":0,"cardForm":"DanDui","holeCards":[{"cardPos":0,"num":7,"suit":"Diamond"},{"cardPos":1,"num":1,"suit":"Club"}],"cards":[
                        {"cardPos":0,"num":1,"suit":"Heart"},
                        {"cardPos":1,"num":1,"suit":"Club"},
                        {"cardPos":2,"num":9,"suit":"Spade"},
                        {"cardPos":3,"num":8,"suit":"Diamond"},
                        {"cardPos":4,"num":12,"suit":"Spade"}],"escape":0,"headIconName":14,"inputMoney":40000,"returnMoney":78000,"userName":"4666","userPos":3,"self":true},
                    {"abandon":0,"cardForm":"tonghua","holeCards":[{"cardPos":0,"num":4,"suit":"Spade"},{"cardPos":1,"num":5,"suit":"Spade"}],"cards":[
                        {"cardPos":0,"num":3,"suit":"Spade"},
                        {"cardPos":1,"num":9,"suit":"Spade"},
                        {"cardPos":2,"num":12,"suit":"Spade"},
                        {"cardPos":3,"num":4,"suit":"Spade"},
                        {"cardPos":4,"num":5,"suit":"Spade"}],"escape":0,"headIconName":5,"inputMoney":40000,"returnMoney":78000,"userName":"44233","userPos":4},
                    // {"abandon":0,"cardForm":"DanDui","cards":[
                    //     {"cardPos":0,"num":10,"suit":"Spade"},
                    //     {"cardPos":1,"num":12,"suit":"Club"},
                    //     {"cardPos":2,"num":9,"suit":"Spade"},
                    //     {"cardPos":3,"num":13,"suit":"Diamond"},
                    //     {"cardPos":4,"num":12,"suit":"Spade"}],"escape":0,"headIconName":5,"inputMoney":40000,"returnMoney":78000,"userName":"44233","userPos":5},
                    // {"abandon":0,"cardForm":"DanDui","cards":[
                    //     {"cardPos":0,"num":10,"suit":"Spade"},
                    //     {"cardPos":1,"num":12,"suit":"Club"},
                    //     {"cardPos":2,"num":9,"suit":"Spade"},
                    //     {"cardPos":3,"num":13,"suit":"Diamond"},
                    //     {"cardPos":4,"num":12,"suit":"Spade"}],"escape":0,"headIconName":5,"inputMoney":40000,"returnMoney":78000,"userName":"44233","userPos":6},
                    // {"abandon":0,"cardForm":"DanDui","cards":[
                    //     {"cardPos":0,"num":10,"suit":"Spade"},
                    //     {"cardPos":1,"num":12,"suit":"Club"},
                    //     {"cardPos":2,"num":9,"suit":"Spade"},
                    //     {"cardPos":3,"num":13,"suit":"Diamond"},
                    //     {"cardPos":4,"num":12,"suit":"Spade"}],"escape":0,"headIconName":8,"inputMoney":40000,"returnMoney":78000,"userName":"44233","userPos":7},
                    // {"abandon":0,"cardForm":"DanDui","cards":[
                    //     {"cardPos":0,"num":10,"suit":"Spade"},
                    //     {"cardPos":1,"num":12,"suit":"Club"},
                    //     {"cardPos":2,"num":9,"suit":"Spade"},
                    //     {"cardPos":3,"num":13,"suit":"Diamond"},
                    //     {"cardPos":4,"num":12,"suit":"Spade"}],"escape":0,"headIconName":5,"inputMoney":40000,"returnMoney":78000,"userName":"44233","userPos":8},
                ]
            };
            this.onGameOverNTF(data);
        }
        this.xx++;
    }
    //点击背景时检测任务界面是否打开
    this.onStageClick = function(e){
        if(this.taskView && this.taskView.visible){
            this.taskView.visible = false;
        }
        this.hideReraiseView();
    }
    //
}