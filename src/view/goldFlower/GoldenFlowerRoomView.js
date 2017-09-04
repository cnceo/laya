
/**
 * huangandfly 2016 07 05
 */

function GoldenFlowerRoomView()
{
     GoldenFlowerRoomView.super(this);
     BasePageView.call(this);
     for(var i in BasePageView.prototype){
         GoldenFlowerRoomView.prototype[i] = BasePageView.prototype[i];
     }

     var ACTION_STATE = {
        GenZhu : 'eGenZhu',
        JiaZhu : 'eJiaZhu',
        ePK : "ePK",
    }

    this.lstTaskFinish = [];//完成的任务
    this.roomInfo = null;
    this.bRoomBtnLocked = false;//是否lock按钮
    this.bLockPlayerState = false;//是否延迟更新玩家状态
    this.bWaitingChangeRoom = false;

    this.Init = function(dataInit){
        BasePageView.prototype.Init.call(this,dataInit);
        if( !NetManager.GameClintInstance ) 
        {
            NetManager.GameClintInstance = new GoldenFlowerClient();
        }
        this.imgBg.on(Event.CLICK,this,this.onStageClick);
        this.PlayerControlCom = new GfPlayerController(5);
        this.initMessageListener();
        this.createJettonPool();
        this.createDiceEffect();
        
        this.btnsAll = this.getChildByName('btns');
        this.speekBtn = this.btnControl.getChildByName('speekBtn');
        this.followBtn = this.speekBtn.getChildByName('followBtn');
        this.intelligenceBtn = this.btnControl.getChildByName('intelligenceBtn');
        this.settlementing = this.getChildByName('settlementing');
        this.ChangeRoomBtn = this.btnControl.getChildByName("ChangeRoomBtn");
        this.taskBtn = this.btnControl.getChildByName("taskBtn");
        this.panelTask = this.btnControl.getChildByName('panelTask');
        this.showCardsBtn = this.btnControl.getChildByName("showCardsBtn");
        this.compareBtn = this.speekBtn.getChildByName('compareBtn');
        this.reraiseBtn = this.speekBtn.getChildByName('reraiseBtn');

        this.boxMinRound = this.boxTitle.getChildByName('boxMinRound');
        this.boxMaxRound = this.boxTitle.getChildByName('boxMaxRound');
        this.boxMinRound.Init(200,1.2,{src:"res/atlas/gfRoom/gfRoundAnim.json",loop:false,width:450,height:100});
        this.boxMaxRound.Init(200,1.2,{src:"res/atlas/gfRoom/gfRoundAnim.json",loop:false,width:450,height:100});
        
        this.speekBtn.visible  = false;
        this.intelligenceBtn.visible  = false;
        this.settlementing.visible = false;
        
        this.gameCountdown.visible = false;
        this.showCardsBtn.visible = false;
        this.boxAutoPK.visible = false;
        
        this.addListener();       
        this.setZOrder(); 
        
        this.reraisePanel = null;
        this.settlementPro = null;
        this.initTaskInfo();
        this.initCompareCardsView();
        if(IS_GAME_REVIEW){
            this.btnsAll.visible = false;
            var contr = ReviewControllerMgr.GetController(GameData.getInstance().gameType.eGoldenFlower);
            contr.SetPlayerControler(this.PlayerControlCom);
            contr.PrepareRoomInfo();
        }
        else if(GameData.getInstance().iamBack){
            CLog.log("GameData.getInstance().iamBack:"+GameData.getInstance().iamBack);
            GameData.getInstance().iamBack = false;
            //资源加载完成后请求房间信息
            NetManager.GameClintInstance.CG_GET_GOLDENFLOWER_ROOM_INFO_REQ();
        }
        else{
            var d = new Date();
            console.log("---------------   " +d.getTime());
            this.toGetRoomInfo();
        }             
    }
    this.initGameRoomTopView = function()
    {
        var room = GFRoomMgr.getInstance().GetCurRoom();
        if(this.GameRoomTopView) return;
        this.GameRoomTopView = new GameRoomTopView();
        this.addChild( this.GameRoomTopView );
        this.GameRoomTopView.init(room.GetType() == ROOM_TYPE_DIAMONDS.DEMOROOM.key);
    }

    this.initCompareCardsView = function(){
        this.compareCardsView = new GFCompareCardsView();
        this.compareCardsView.Init(this.PlayerControlCom);
        this.addChild(this.compareCardsView);
        this.compareCardsView.Show(false);
    }
    this.toGetRoomInfo = function(){
        this.bWaitingChangeRoom = false;
        NetManager.GameClintInstance.CG_IM_READY_REQ();
    }
    this.setZOrder = function()
    {
        this.setChildIndex(this.jettonPool,this.getChildIndex(this.getChildByName('players')));        
        
        this.setChildIndex( this.btnsAll,this.numChildren - 1 );
        this.setChildIndex( this.diceEffect,this.numChildren-1 );
        this.setChildIndex( this.gameCountdown,this.numChildren - 1 );
    }
    
    this.initMessageListener = function()
    {
        //房间信息处理
        MessageCallbackPro.addCallbackFunc( EventType.Type.roomInfoAck,this.onRoomInfoAck,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerAddNTF,this.onPlayerAddNTF,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerRemoveNTF,this.onPlayerRemoveNTF,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerStateUpdate,this.onPlayerStateUpdate,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.gameStart,this.onGameStart,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.in_ones_turn,this.onIn_ones_turn,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerActionOver,this.onPlayerActionOver,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.gameOverNTF,this.onGameOverNTF,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.leaveCurRoom,this.onLeaveRoomACK,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.GC_GAME_BEGIN_COUNTDOWN_NTF,this.GC_GAME_BEGIN_COUNTDOWN_NTF,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.ROOM_STATE_GAME_BEGIN,this.ROOM_STATE_GAME_BEGIN,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerMoneyChanged,this.setMoneyInfo,this);
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerCharge,this.onPlayerChargeNTF,this);
        MessageCallbackPro.addCallbackFunc( EventType.Type.oprFailed,this.onOprFailed,this);
        MessageCallbackPro.addCallbackFunc( EventType.Type.changeRoomEvent,this.onChangeRoomEvent,this); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.reJoinRoomAck,this.onReJoinRoomAck,this);
        MessageCallbackPro.addCallbackFunc( EventType.Type.taskUpdate,this.onTaskUpdate,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.firstPutCardNTF,this.onFirstPutCardNTF,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.lookCardsAck,this.onLookCardsAck,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.pk,this.onPKNTF,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.lastPK,this.onAutoPKNTF,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.countdownWarning,this.onCountdownWarning,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.leaveGame,this.onLeaveGameSuccess,this );
    }
    this.onLeaveGameSuccess = function(){
        ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.GAMEHALL ,resList:PreLoadList.getInstance().gameHall});
    }
    this.onPlayerChargeNTF = function(data){
        var player = this.PlayerControlCom.getPlayerByPos(data.userPos);
        if(player && !this.PlayerControlCom.isLocalPlayer(data.userPos)) {
            new ChargeMessage("充值"+ Tools.getInstance().ChangeUIShow(data.addMoney),player);
        }
    }

    this.removeMessageListener = function()
    {
        MessageCallbackPro.removeCallbackFunc( EventType.Type.roomInfoAck ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerAddNTF ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerRemoveNTF ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerStateUpdate ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.gameStart ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.in_ones_turn ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerActionOver ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.gameOverNTF ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.leaveCurRoom ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.GC_GAME_BEGIN_COUNTDOWN_NTF ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.ROOM_STATE_GAME_BEGIN ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerMoneyChanged,this.setMoneyInfo,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerCharge,this.onPlayerChargeNTF,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.oprFailed,this.onOprFailed,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.changeRoomEvent,this.onChangeRoomEvent,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.reJoinRoomAck,this.onReJoinRoomAck,this); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.taskUpdate,this.onTaskUpdate,this );
        MessageCallbackPro.removeCallbackFunc( EventType.Type.firstPutCardNTF,this.onFirstPutCardNTF,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.lookCardsAck,this.onLookCardsAck,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.pk,this.onPKNTF,this );
        MessageCallbackPro.removeCallbackFunc( EventType.Type.lastPK,this.onAutoPKNTF,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.countdownWarning,this.onCountdownWarning,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.leaveGame,this.onLeaveGameSuccess,this );
    }
    
    this.setMoneyInfo = function(data){
        var localPlayer = this.PlayerControlCom.getLocalPlayer();
        if(!localPlayer) return;
        localPlayer.setPlayerMoney(User.getInstance().GetGameMoney());
        if(this.PlayerControlCom.InMyTurn()){
            this.speakButtonProcess();
        }        
    }
    this.createJettonPool = function()
    {
        this.jettonPool = new Sprite();
        this.jettonPool.name = 'jettonPool';
        this.jettonPool.width = 700;
        this.jettonPool.height = 350;
        this.jettonPool.pos((this.width - this.jettonPool.width) >> 1,280);
        this.addChild( this.jettonPool );
    }
    
    this.gc = function()
    {
        NetManager.GameClintInstance = null;
        this.PlayerControlCom.clearCards();
        this.PlayerControlCom = null;
        this.compareCardsView.removeCards();        
               
        this.clearTween();
        
        this.removeMessageListener();
        this.removeListener();
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
        if(this.GameRoomTopView) this.GameRoomTopView.gc();
        StatePool.clearAllState();
        GFRoomMgr.getInstance().Reset();
        TaskDelayManager.getInstance().clear();
    }
    //清除Tween动画，避免切场景时释放带来的bug
    this.clearTween = function(){
        var numChildren = this.panelTask.numChildren;
        for(var i=0;i<numChildren;i++){
            var tiao = this.panelTask.getChildAt(i);
            var wancheng = tiao.wancheng;
            Tween.clearAll(tiao);
            Tween.clearAll(wancheng);
        }
    }
    this.setPoolMoney = function( value )
    {
         this.poolMoney.text = Tools.getInstance().ChangeUIShow(value); 
    }
    this.setCurTurn = function(value){
        value = (isNaN(parseInt(value)) || (parseInt(value) < 0)) ? 0 : value;
        if(!this.roomInfo){CLog.error("this.roomInfo is null"); return;}
        var textV = value + "/" + this.roomInfo.GetMaxRound();
        if(this.txtMaxTurn.text == textV) return;
        this.txtMaxTurn.text = textV;
        var lblMin = this.boxMinRound.getChildByName('lbl');
        var minPKRound = this.roomInfo.GetMinPKRound();
        if(parseInt(value) < minPKRound){
            this.txtCompareTurn.text = value + "/" + minPKRound;
            lblMin.color = GameData.getInstance().COLOR.WHITE;
            this.txtCompareTurn.color = GameData.getInstance().COLOR.WHITE;
        }
        else if(parseInt(value) == minPKRound){
            this.txtCompareTurn.text = value + "/" + minPKRound;
            lblMin.color = GameData.getInstance().COLOR.YELLOW;
            this.txtCompareTurn.color = GameData.getInstance().COLOR.YELLOW;
            this.boxMinRound.Play();
        }
        var lblMax = this.boxMaxRound.getChildByName('lbl');
        //10轮后播放最大轮特效
        if(parseInt(value) >= 10){
            lblMax.color = GameData.getInstance().COLOR.YELLOW;
            this.txtMaxTurn.color = GameData.getInstance().COLOR.YELLOW;
            this.boxMaxRound.Play();
        }
        else{
            lblMax.color = GameData.getInstance().COLOR.WHITE;
            this.txtMaxTurn.color = GameData.getInstance().COLOR.WHITE;
        }
    }
    
        //设置底注、锅底
    this.setBasalCistern = function( value )
    {
        this.Antes.text = Tools.getInstance().ChangeUIShow(value);
        this.bottomPot.text = Tools.getInstance().ChangeUIShow(this.roomInfo.GetAnte());
    }
    
        //显示结算中
    this.showSettlementing = function()
    {
        this.settlementing.visible = true;
        this.settlementing.pos( (this.width - this.settlementing.width) >> 1,0 );
        Tween.to( this.settlementing,{ y:(this.height - this.settlementing.height) >> 1 },700,Ease['elasticOut'] )
        
        var self = this;
        var task = new TaskDelay();
        task.data = null;
        task.callBack = function(){ this.settlementing.visible = false; };
        task.classObj = this;
        task.leftTime = 10000;//一秒为1
        task.forceExecute = true;
        TaskDelayManager.getInstance().addTask( task );
        this.setShowCardsBtn(false);
        CLog.log('======showSettlementing');
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
        this.hideDice(); 
        this.checkMinCarryMoney();       
    }
    
     /**
     * 游戏开始前倒计时完成
     */
    this.onGameStartCountdownOver = function()
    {
        this.gameCountdown.visible = false;
        this.PlayerControlCom.clearCards();
    }
    //创建骰子
    this.createDiceEffect = function()
    {
        if(!this.diceEffect){
            this.diceEffect = new DiceView();
            this.diceEffect.init(this,this.onDiceComplete);
            this.addChild(this.diceEffect);
            this.hideDice();
        }        
    }
    //掷骰子
    this.playDice = function(){
        var pos = GameData.getInstance().getPlayerSeatPos(this.PlayerControlCom.buttonPos);
        this.diceEffect.play(pos);
    }
    this.onDiceComplete = function(){
        this.PlayerControlCom.setFCPlayer();
    }
    //隐藏骰子
    this.hideDice = function(){
        this.diceEffect.hide();
    }
    this.onFirstPutCardNTF = function(content){
        this.PlayerControlCom.buttonPos = content.firstPutCardPos;
        this.PlayerControlCom.setFCPlayer();
    }
     /**
     * 解析行动目的
     */
    this.calcCardForms = function(data)
    {
        var actionMoney = data.actionMoney;
        var gameMoneyInTable = data.gameMoneyInTable;
        CLog.log("解析行动目的  actionMoney:"+actionMoney );
        var sex = this.PlayerControlCom.getPlayerByPos(data.userPos).getSex();
        //弃牌
        if(actionMoney === -1){
            this.actionFold(data.userPos);
        }
        //比牌
        else if(data.actionState == ACTION_STATE.ePK){                       
            this.actionPK(data.userPos);
        }
        //跟注
        else if(data.actionState === ACTION_STATE.GenZhu){           
            this.actionCall(data.userPos,actionMoney);
        }
        //加注
        else if(data.actionState === ACTION_STATE.JiaZhu){
            this.actionRaise(data.userPos,actionMoney);
        }
        else{
            CLog.log("ShowHandManager???????????出问题了?????????????");
            CLog.error("ShowHandManager 某人回合完毕 money:"+data.money+"  self.turnMoney:"+data.gameMinMoney+"  actionMoney:"+actionMoney);
        }        
        //往桌子上添加筹码
        if( actionMoney > 0 ){
            this.PlayerControlCom.addJetion( data,true );
        }
        this.PlayerControlCom.setPlayerGameMoneyInTable( data.userPos,gameMoneyInTable );
    }
    //玩家行动--弃牌
    this.actionFold = function(userPos){
        var sex = this.PlayerControlCom.getPlayerByPos(userPos).getSex();
        SoundTool.getInstance().PlayGameSound(EnumGameSound.GF_DROP_CARD,sex);
        this.PlayerControlCom.showTalk( userPos,'弃牌');
        this.PlayerControlCom.dropCard( userPos );
        
        if( this.PlayerControlCom.isLocalPlayer(userPos) ){
            this.setSpeakBtnVisible(false);
            this.intelligenceBtn.visible = false;
            this.updateChangeRoomBtn(true);
            // 关闭加注界面
            if(this.reraisePanel && this.reraisePanel.visible){
                this.reraisePanel.onCancel();
            }
        }
    }
    //玩家行动--pk
    this.actionPK = function(userPos){
        var sex = this.PlayerControlCom.getPlayerByPos(userPos).getSex();
        var rdm = Math.random();
        var srcName = "";
        if(sex === ENUM_SEX.FEMALE){
            txtSpeak = rdm >= 0.5 ? "哼！PK一下" : "来！比比看";
        }
        else{
            txtSpeak = rdm >= 0.5 ? "挑战下你！" : "比下看看";                    
        }
        srcName = rdm >= 0.5 ? EnumGameSound.TIAO_ZHAN : EnumGameSound.COMPARE;
        SoundTool.getInstance().PlayGameSound(srcName,sex);
        this.PlayerControlCom.showTalk( userPos,txtSpeak);
    }
    //玩家行动--跟注
    this.actionCall = function(userPos,actionMoney){
        var sex = this.PlayerControlCom.getPlayerByPos(userPos).getSex();
        var player = this.PlayerControlCom.getPlayerByPos(userPos);
        if(!player || !this.roomInfo) return;
        var turnNum = this.roomInfo.GetTurnNum();
        var txtSpeak = "";
        if(turnNum == 1){
            txtSpeak = "跟注：";
            SoundTool.getInstance().PlayGameSound(EnumGameSound.FOLLOW_CARD,sex);
        }
        else if(turnNum == 2){
            txtSpeak = "我再跟：";
            SoundTool.getInstance().PlayGameSound(EnumGameSound.FOLLOW_AGAIN,sex);
        }
        else{
            var rdm = Math.random();
            var srcName = "";
            if(sex === ENUM_SEX.FEMALE){
                if(rdm >= 0.66){
                    txtSpeak = "我就不信了\n";
                    srcName = EnumGameSound.FOLLOW_AGAIN2;
                }
                else if(rdm >= 0.33){
                    txtSpeak = "我还要跟\n";
                    srcName = EnumGameSound.FOLLOW_FOREVER;
                }
                else{
                    txtSpeak = "跟你到底\n";
                    srcName = EnumGameSound.FOLLOW_FOREVER2;
                }
            }
            else{
                txtSpeak = rdm >= 0.5 ? "我继续跟\n" : "跟定你了\n"; 
                srcName = rdm >= 0.5 ? EnumGameSound.FOLLOW_AGAIN2 : EnumGameSound.FOLLOW_FOREVER;             
            }
            
            SoundTool.getInstance().PlayGameSound(srcName,sex);
        }
        this.PlayerControlCom.showTalk( userPos,txtSpeak + Tools.getInstance().ChangeUIShow(actionMoney) );
    }
    //玩家行动--加注
    this.actionRaise = function(userPos,actionMoney){
        var sex = this.PlayerControlCom.getPlayerByPos(userPos).getSex();
        SoundTool.getInstance().PlayGameSound(EnumGameSound.RAISE,sex);
        this.PlayerControlCom.showTalk( userPos,'加注：' + Tools.getInstance().ChangeUIShow(actionMoney) );
    }
    
    this.hideGameCountdown = function()
    {
        this.gameCountdown.visible = false;
        //模拟发牌
        //{"k":"33","v":{"usersAndCards":[{"cards":[{"cardPos":0},{"cardPos":1},{"cardPos":2}],"userPos":2},{"cards":[{"cardPos":0},{"cardPos":1},{"cardPos":2}],"userPos":1}]}},
        var players = this.PlayerControlCom.Players;
        if(!players) return;
        var data = {"usersAndCards":[]};
        for(var i=0;i<players.length;i++){
            if(players[i].getPos() == -1) continue;
            if(players[i].getPlayerState() == GameData.getInstance().playerState.Playing
                && (players[i].cards.length == 0)){
                var info = {};
                info.cards = [{"cardPos":0},{"cardPos":1},{"cardPos":2}];
                info.userPos = players[i].getPos();
                data.usersAndCards.push(info);
            }
            else{
                CLog.log("发牌--------players[i].cards.length:"+players[i].cards.length);
            }
        }
        CLog.log("发牌--------");
        this.onDealCards(data);
    }
    
    //结算界面关闭
    this.settlementPanelClose = function( clickClose )
    {
        
        this.setPoolMoney(0);
        this.setCurTurn(0);
        this.PlayerControlCom.clearTable();
        if( clickClose )
        {
            this.showSettlementing();
        }
        this.updateChangeRoomBtn(true);
        this.initShowCardsBtn();
        this.checkTaskFinish();
        if(IS_GAME_REVIEW && !URLParamParse.getInstance().IsGM()){
            this.onExit();
        }
    }
    
    this.calcWinOrLose = function(data)
    {
        if( !data.hasOwnProperty('players') )
            return;
        var localName = User.getInstance().GetName();
        for( var i = 0;i < data.players.length;i++ )
        {
            var t_data = data.players[i];
            t_data.win = ((t_data.returnMoney - t_data.inputMoney) > 0);
            t_data.self = ( this.PlayerControlCom.isLocalPlayer( t_data.userPos )) && (localName == t_data.userName);
            t_data.headIconName = t_data.headP;
        }
    }
    
    /**
     * 智能发言按钮逻辑处理
     */
    this.showIntelligenceBtn = function( data )
    {
        //观看不进行操作
        if( GameData.getInstance().playerState.Watching === this.PlayerControlCom.getLocalPlayerState() 
              || GameData.getInstance().playerState.Abandon === this.PlayerControlCom.getLocalPlayerState() )
            return;
        this.intelligenceBtn.visible = true;
        this.ChangeRoomBtn.visible = false;
        this.setSpeakBtnVisible(false);
    }
    
     /**
     * 重置智能发言按钮状态
     */
    this.resetIntelligenceBtn = function()
    {
        this.intelligenceBtn.getChildByName('followBtn').reset();
        this.intelligenceBtn.getChildByName('dropCardBtn').reset();
        var white = GameData.getInstance().COLOR.WHITE;
        this.intelligenceBtn.getChildByName('followBtn').getChildByName('txt').color = white;
        this.intelligenceBtn.getChildByName('dropCardBtn').getChildByName('txt').color = white;
    }
    
     /**
     * 按钮处理
     */
    this.setButtonShow = function(data,bDelay)
    {
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
    //设置按钮显示状态
    this.setSpeakBtnVisible = function(bShow){
        this.speekBtn.visible = bShow;
        if(!bShow){//当隐藏操作按钮时 将所有玩家身上的比牌按钮灰掉
            this.PlayerControlCom.ShowCompareBtn(false,this,this.toCompareReq);
        }
        else{
            this.ChangeRoomBtn.visible = false;
            this.intelligenceBtn.visible = false;
        }
    }
    /**
     * 显示操作按钮
     */
    this.speakButtonProcess = function()
    {
        this.updateChangeRoomBtn(false);
        this.intelligenceBtn.visible = false;
        this.setSpeakBtnVisible(true);
        if(!this.roomInfo){CLog.error("this.roomInfo is null"); return;}
        var curTurnNum = this.roomInfo.GetTurnNum();
        var bNoCompare = curTurnNum < this.roomInfo.GetMinPKRound();
        var curMoney = this.PlayerControlCom.getLocalPlayerMoney();
        var bSeenCards = this.PlayerControlCom.getLocalPlayer().getSeenCards();
        var canAdd = this.getCanAdd();
        var followMoney = this.getFollowValue();
        //余额不足时只能弃牌
        var bNoMoney = followMoney > curMoney;
        this.reraiseBtn.disabled = bNoMoney || !canAdd;
        this.followBtn.disabled = bNoMoney;
        this.compareBtn.disabled = bNoMoney || bNoCompare;
        this.followBtn.getChildByName("txt").text = "跟注 (" + Tools.getInstance().ChangeUIShow(followMoney) + ")";
        if(bNoMoney){
            if(!this.tipNoMoney){
                this.tipNoMoney = new MessageBox();
            }
            var strTips = '您的余额:' + Tools.getInstance().ChangeUIShow(curMoney) + ' 不足以跟注:' + Tools.getInstance().ChangeUIShow(followMoney);
            this.tipNoMoney.show(strTips + " 只能弃牌",null,null,this,MODE.MB_OK);            
            SoundTool.getInstance().PlayGameSound(EnumGameSound.NO_MONEY,ENUM_SEX.FEMALE);
        }
    }

     /**
     * 预操作向服务端发起下注请求,没有预操作则显示下注按钮
     */
    this.intelligenceSelectReq = function(money){
        var selectName = this.getIntelligenceSelect();
        var myMoney = this.PlayerControlCom.getLocalPlayerMoney();
        var followMoney = this.getFollowValue();
        switch( selectName )
        {
            case 'dropCardBtn':
                NetManager.GameClintInstance.CG_GOLDENFLOWER_ACTION_REQ(-1);
                break;
            case 'followAwaysBtn':
                if(myMoney < followMoney){
                    this.speakButtonProcess();
                }
                else{
                    NetManager.GameClintInstance.CG_GOLDENFLOWER_ACTION_REQ(followMoney);
                }                
                break;    
            case 'followBtn':
                this.setCheckButtonState(this.intelligenceBtn,'followBtn');
                if(myMoney < followMoney){
                    this.speakButtonProcess();
                }
                else{
                    NetManager.GameClintInstance.CG_GOLDENFLOWER_ACTION_REQ(followMoney);                    
                }
                break;  
            default:
                {
                    this.speakButtonProcess();
                }   
                break;    
        }
        StatePool.stateProcess(GameData.getInstance().gfRoomState.eActionBegin);
    }
    
    /**
     * 获得智能选择模式
     */
    this.getIntelligenceSelect = function()
    {
        var btnList = ['followBtn','followAwaysBtn','dropCardBtn'];
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
    this.getCheckButtonState = function( btnName )
    {
        var Btn   = this.intelligenceBtn.getChildByName( btnName );
        return Btn.getIsCheck();
    }
    
    this.listenerCheckBtn = function ( _node,_name,_callback ) 
    {
        var checkBtn = _node.getChildByName( _name );
        if( checkBtn )
        {
            checkBtn.init(_callback,this);
        }else 
        {
            cc.log('ERROR name = ' + _name + 'not found');
        }
    }
    
    this.removeLisCheckBtn = function ( _node,_name ) 
    {
        var checkBtn = _node.getChildByName( _name );
        if( checkBtn )
        {
            checkBtn.removeListener();
        }else 
        {
            cc.log('path' + btnPath + 'not found');
        }
    }
    
    this.removeListener =  function()
    {
        //智能选择按钮
        this.removeLisCheckBtn( this.intelligenceBtn,'followBtn' );
        this.removeLisCheckBtn( this.intelligenceBtn,'followAwaysBtn' );
        this.removeLisCheckBtn( this.intelligenceBtn,'dropCardBtn' );
        
        // //发言阶段按钮   
        this.removeBtnListener( this.speekBtn,'reraiseBtn',this.onReraiseBtn );
        this.removeBtnListener( this.speekBtn,'dropBtn' ,this.onDropBtn);
        this.removeBtnListener( this.speekBtn,'compareBtn',this.onCompareBtn);
        this.removeBtnListener( this.speekBtn,'followBtn',this.onFollowBtn);

        this.removeBtnListener( this.btnControl,"showCardsBtn",this.onShowCardsBtn);
        this.removeBtnListener( this.ChangeRoomBtn,"reJoinBtn",this.onReJoinBtn);
        
        this.backBtn.off( Event.CLICK,this,this.onExit );  
        this.taskBtn.off( Event.CLICK, this,this.onTaskBtnClick );
            
        Laya.stage.off( 'hide_window',this,this.onHideWindow );
        Laya.stage.off( 'show_window',this,this.onShowWindow );
    }
    
    this.removeBtnListener = function(_node,_name,_callback)
    {
        if(!_node) return;
        var btn = _node.getChildByName( _name );
        if( btn )
        {
            btn.off( Event.CLICK,this,_callback );
        }else 
        {
            CLog.log('ERROR removeListener name = '+_name+' child not find');
        }
    }
    
    //监听一些事件
    this.addListener = function () 
    {
        // //智能选择按钮
        this.listenerCheckBtn(this.intelligenceBtn,'followBtn',this.onFollowOnceBtn);
        this.listenerCheckBtn(this.intelligenceBtn,'followAwaysBtn',this.onFollowAwaysBtn);
        this.listenerCheckBtn(this.intelligenceBtn,'dropCardBtn',this.onDropCardBtn);
        
        // //发言阶段按钮  
        this.addBtnListener( this.speekBtn,'reraiseBtn',this.onReraiseBtn );
        this.addBtnListener( this.speekBtn,'dropBtn',this.onDropBtn );
        this.addBtnListener( this.speekBtn,'compareBtn',this.onCompareBtn);
        this.addBtnListener( this.speekBtn,'followBtn',this.onFollowBtn);

        this.addBtnListener( this.ChangeRoomBtn,"reJoinBtn",this.onReJoinBtn);
        this.addBtnListener( this.btnControl,"showCardsBtn",this.onShowCardsBtn);
        
        this.backBtn.on( Event.CLICK,this,this.onExit );
        this.taskBtn.on( Event.CLICK, this,this.onTaskBtnClick );

        if(!IS_GAME_REVIEW){
            Laya.stage.on( 'hide_window',this,this.onHideWindow );
            Laya.stage.on( 'show_window',this,this.onShowWindow );
        }        
    }
    
    this.addBtnListener = function(_node,_name,_callback)
    {
        if(!_node) return;
        var btn = _node.getChildByName( _name );
        if( btn )
        {
            btn.on( Event.CLICK,this,_callback );
        }else 
        {
            CLog.log('ERROR name = '+_name+' child not find');
        }
    }
    
    
    this.onHideWindow = function()
    {
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
        this.setSpeakBtnVisible(false);
        this.intelligenceBtn.visible = false;
        this.updateChangeRoomBtn();
        TaskDelayManager.getInstance().clear();
        
        if(this.bWaitingChangeRoom){
            this.bWaitingChangeRoom = false;
            this.toGetRoomInfo();
        }
        else{
            NetManager.GameClintInstance.CG_GET_GOLDENFLOWER_ROOM_INFO_REQ();
        }        
        
    }

    this.clearRoom = function(){
        this.setRoomBtnLock(false);
        StatePool.clearAllState(true);        
        this.PlayerControlCom.resetController();
        this.onGameStartCountdownOver();
        this.gameCountdown.stop();
        this.compareCardsView.Show(false);
        TaskDelayManager.getInstance().clear();//该句有可能导致切场景
    }
    this.onChangeRoomEvent = function(e){
        this.toReJoinRoom();
    }
    //换房间按钮
    this.onReJoinBtn = function(e){
        this.toReJoinRoom();
    }
    //更换房间
    this.toReJoinRoom = function(){        
        NetManager.GameClintInstance.CG_REJOIN_GOLDENFLOWER_ROOM_REQ();
        this.showLoading();
    }
    this.onReJoinRoomAck = function(content){
        CLog.log("onReJoinRoomAck...."+content.errorMsg);
        if(content.errorMsg && content.errorMsg != ""){
            this.hideLoading();
        }
        else{
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
     /**
     * 退出游戏房间
     */
    this.onExit = function()
    {
        if(IS_GAME_REVIEW && !URLParamParse.getInstance().IsGM()){
            ReviewControllerMgr.GetController(GameData.getInstance().gameType.eGoldenFlower).EndReview();
        }
        else if( this.PlayerControlCom.getLocalPlayerState() === GameData.getInstance().playerState.Playing )
        {
            this.closeExitPanel();
            var mb = new MessageBox();
            mb.show('退出房间将判定为弃牌',this.onConfirmExit,null,this,MODE.MB_OK | MODE.MB_CANCEL);
            mb = null;
        }else 
        {
             this.onConfirmExit();
        }
    }
    this.closeExitPanel = function(){
        this.tipNoMoney = null;
        while(true){
            var mb = this.getChildByName("MessageBox");
            if(!mb) return;
            this.removeChild(mb);
        }
    }
    //确定退出
    this.onConfirmExit = function()
    {        
        NetManager.GameClintInstance.CG_LEAVE_GOLDENFLOWER_ROOM_REQ();
    }
    //点击看牌按钮
    this.onShowCardsBtn = function(event){
        //TODO 请求看牌
        //this.showMyCards({"cards":[{"cardPos":0,"num":1,"suit":"Spade"},{"cardPos":1,"num":13,"suit":"Club"},{"cardPos":2,"num":12,"suit":"Club"}],"userPos":1});
        NetManager.GameClintInstance.CG_GOLDENFLOWER_LOOK_CARDS_REQ();
    }
    //看牌返回
    this.onLookCardsAck = function(content){
        this.showMyCards(content);
    }
    //展示自己的卡牌
    this.showMyCards = function(data){
        //观看录像
        if(data.hasOwnProperty("userPos") && !this.PlayerControlCom.isLocalPlayer(data.userPos)){
            var player = this.PlayerControlCom.getPlayerByPos(data.userPos);
            if(player) player.showMyCards(data.cards);
        }
        else{
            var i = this.PlayerControlCom.getLocalPlayer();
            i.showMyCards(data.cards);
            this.showCardsBtn.visible = false;
            i.setSeenCards(true);
        }
        
    }
    //获取加注的最低额度
    this.getRaiseMinMoney = function(){
        var base = this.roomInfo.GetBaseNote();
        var bSeenCards = this.PlayerControlCom.getLocalPlayer().getSeenCards();
        var minBase = bSeenCards ? base * 2 : base;
        var minValue = minBase;
        if(bSeenCards){
            minValue = minBase < this.gameMinMoney * 2 ? this.gameMinMoney * 2 : minBase;
        }
        else{
            minValue = minBase < this.gameMinMoney ? this.gameMinMoney : minBase;
        }
        return minValue;
    }
    //获取加注的最大额度
    this.getRaiseMaxMoney = function(){
        var maxBetValue = this.roomInfo.GetBaseNote() * 8;
        var bSeenCards = this.PlayerControlCom.getLocalPlayer().getSeenCards();
        var curMoney = this.PlayerControlCom.getLocalPlayerMoney();
        var maxValue = maxBetValue <  curMoney ? maxBetValue : curMoney;  
        if(maxBetValue <  curMoney){
            if(bSeenCards && (parseInt(maxValue * 2) < curMoney))
                maxValue = parseInt(maxValue * 2);
        }         
        return maxValue;
    }
    //获取是否可以加注
    this.getCanAdd = function(){
        var min = this.getRaiseMinMoney();
        var max = this.getRaiseMaxMoney();
        var curMoney = this.PlayerControlCom.getLocalPlayerMoney();
        var bSeenCards = this.PlayerControlCom.getLocalPlayer().getSeenCards();
        if(curMoney < min){
            return false;
        }
        else{
            var base = this.roomInfo.GetBaseNote();
            var gameMinMoney = bSeenCards ? base * 4 : base * 2;
            return  (max >= gameMinMoney) && (this.gameMinMoney <= (base * 4));
        }        
    }
     /**
     * 加注处理
     */
    this.reraiseProcess = function()
    {
        if( this.reraisePanel === null )
        {
            this.reraisePanel = new ReraiseView();
            this.reraisePanel.init( this.confirmReraise,this,true);
            this.addChild( this.reraisePanel );
        }
        var base = this.roomInfo.GetBaseNote();
        base = parseInt(base / Tools.getInstance().ExactDigit);
        var bSeenCards = this.PlayerControlCom.getLocalPlayer().getSeenCards();
        var fa = bSeenCards ? 2 : 1;
        this.reraisePanel.setBtnValue([base * 2 * fa,base * 4 * fa,base * 8 * fa],bSeenCards);
        this.reraisePanel.show( true );

        this.reraisePanel.setMinbet( this.getRaiseMinMoney() );
        this.reraisePanel.setMaxbet( this.getRaiseMaxMoney() ); 
               
        this.reraisePanel.y = this.height;
        Tween.to( this.reraisePanel,{y:this.height - this.reraisePanel.height},200 );
    }
    
    this.confirmReraise = function()
    {
        //确认加注
        if( NetManager.GameClintInstance != undefined )
        {
            var value = parseInt(this.reraisePanel.getReraiseValue());
             //value = Tools.getInstance().ChangeUIShow(value);
            CLog.log("确认加注  this.gameMinMoney:"+this.gameMinMoney + "  value:"+value);
            if(value > 0){
                NetManager.GameClintInstance.CG_GOLDENFLOWER_ACTION_REQ( value );  
                StatePool.stateProcess(GameData.getInstance().gfRoomState.eActionBegin);
                this.setSpeakBtnVisible(false);
            }            
        }
    }
    
    //比牌按钮
    this.onCompareBtn = function(e){
        var arrPlayer = this.PlayerControlCom.GetPlayersWhomICanCompare();
        if(arrPlayer.length < 0) return;
        if(arrPlayer.length == 1){
            this.toCompareReq(arrPlayer[0]);
        }
        else{
            this.PlayerControlCom.ShowCompareBtn(true,this,this.toCompareReq);
        }        
    }
    //请求比牌
    this.toCompareReq = function(obj){
        CLog.log("请求比牌");
        var posPK = obj.currentTarget ? obj.currentTarget.parent.getPos() : obj.getPos();
        NetManager.GameClintInstance.CG_GOLDENFLOWER_ACTION_REQ(null,posPK);
        this.setSpeakBtnVisible(false);
        StatePool.stateProcess(GameData.getInstance().gfRoomState.eActionBegin);
    }
    //收到服务端发来比牌信息
    this.onPKNTF = function(content){
        CLog.log("比牌返回结果....."); 
        var winner = this.PlayerControlCom.getPlayerByPos(content.winnerPos);
        var loser = this.PlayerControlCom.getPlayerByPos(content.loserPos);
        if(!winner || !loser) {
            CLog.log("PK 获取人物失败！！！  ?????????????????????????");
            return;
        }
        var curAP = this.PlayerControlCom.GetCurActionPos();
        var player1 = curAP == content.winnerPos ? winner : loser;
        var player2 = curAP == content.loserPos ? winner : loser;
        this.PlayerControlCom.lockPlayerUIState([loser]);
        //player1为比牌发起者
        this.compareCardsView.Show(true,player1,player2,winner,this.onPKEnd,this);
        if(this.PlayerControlCom.isLocalPlayer(player1.getPos()) || this.PlayerControlCom.isLocalPlayer(player2.getPos())){
            this.btnControl.visible = false;
        }
    }
    this.onPKEnd = function(loser){
        CLog.log("比牌界面关闭....."); 
        this.btnControl.visible = true;
        this.bLockPlayerState = false;
        this.PlayerControlCom.unLockPlayerUIState([loser]);
        this.updateChangeRoomBtn();
    }
    //点击弃牌按钮
    this.onDropBtn = function( event )
    {
        NetManager.GameClintInstance != undefined && NetManager.GameClintInstance.CG_GOLDENFLOWER_ACTION_REQ(-1);
        this.setSpeakBtnVisible(false);
        StatePool.stateProcess(GameData.getInstance().gfRoomState.eActionBegin); 
    }
    
    //点击加注按钮
    this.onReraiseBtn = function( event )
    {
        this.reraiseProcess();
    }
    //点击跟注按钮
    this.onFollowBtn = function(event){
        NetManager.GameClintInstance != undefined && NetManager.GameClintInstance.CG_GOLDENFLOWER_ACTION_REQ( this.getFollowValue() );
        this.setSpeakBtnVisible(false);
        StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin);
    }
    
    //智能按钮 总是跟注
    this.onFollowAwaysBtn = function(event)
    {
        if( event.target.getIsCheck() )
        {
            this.setCheckButtonState(this.intelligenceBtn,'followBtn');
            this.setCheckButtonState(this.intelligenceBtn,'dropCardBtn');
        }
        var txt = event.currentTarget.getChildByName('txt');
        txt.color = event.target.getIsCheck() ? GameData.getInstance().COLOR.BLACK : GameData.getInstance().COLOR.WHITE;
    }
    
    //智能按钮 智能跟注
    this.onFollowOnceBtn = function ( event )
    {
        if( event.target.getIsCheck() )
        {
            this.setCheckButtonState(this.intelligenceBtn,'followAwaysBtn');
            this.setCheckButtonState(this.intelligenceBtn,'dropCardBtn');
        }
        var txt = event.currentTarget.getChildByName('txt');
        txt.color = event.target.getIsCheck() ? GameData.getInstance().COLOR.BLACK : GameData.getInstance().COLOR.WHITE;
    }
    
    //智能按钮 弃牌
    this.onDropCardBtn = function( event )
    {
        if( event.target.getIsCheck() )
        {
            this.setCheckButtonState(this.intelligenceBtn,'followBtn');
            this.setCheckButtonState(this.intelligenceBtn,'followAwaysBtn');
        }
        var txt = event.currentTarget.getChildByName('txt');
        txt.color = event.target.getIsCheck() ? GameData.getInstance().COLOR.BLACK : GameData.getInstance().COLOR.WHITE;
    }
    
    /**
     * 设置按钮为普通状态
     */
    this.setCheckButtonState = function(_node, _name )
    {
        var Btn  = _node.getChildByName( _name );
        if( Btn === null )
        {
            cc.log('path = ' + path + 'not found');
            return;
        }
        Btn.setActive('btnDown',false);
        Btn.setActive('btnNormal',true);
        var txt = Btn.getChildByName('txt');
        if(txt) txt.color = '#FFFFFF';
    }
    
        //发送游戏结束状态
    this.sendGameOverState = function( data )
    {        
        //倒计时完成后 通知服务器 本轮游戏结束
        StatePool.stateProcess(GameData.getInstance().gfRoomState.eGameOver);
        this.calcWinOrLose( data );
        if( this.settlementPro == null )
        {
            this.settlementPro = new SettlementView();
            var roomType = this.roomInfo.GetType();
            this.settlementPro.init(this.PlayerControlCom,roomType);
            this.addChild( this.settlementPro );
        }
        CLog.log("显示结算界面。。。。。");
        this.ChangeRoomBtn.visible = false;
        this.settlementPro.show( data ,{callBack:this.settlementPanelClose,classObj:this});
        //this.checkUserMoney();
        this.closeExitPanel();
        this.setRoomBtnLock(false);
        this.PlayerControlCom.unLockPlayerUIState();
    }
    //检测玩家余额，不足房间最低门槛值时 提示
    this.checkMinCarryMoney = function(){
        var money = User.getInstance().GetGameMoney();
        var minCarry = this.roomInfo.GetMinCarry();
        if(money < minCarry){
            var mb = null;
            mb = new MessageBox();
            mb.show("您的余额已不足，建议前往“GameHall->系统->个人银行” 进行充值");
            SoundTool.getInstance().PlayGameSound(EnumGameSound.NO_MONEY,ENUM_SEX.FEMALE);
            mb = null;
        }
    }
    //检测玩家余额 余额不足锅底时提示
    this.checkUserMoney = function(){
        var money = User.getInstance().GetGameMoney();
        CLog.log("检测玩家余额.... money:"+money);
        var bank = User.getInstance().GetBankMoney();
        var guodi = this.roomInfo.GetAnte();
        //玩家所有资产小于最低金额 则不再强制充钱（将会等待被踢）
        //if(money + bank < guodi) return;
        if(money < guodi){
            var mb = new HintMessage("您的余额已不足");            
            mb = null;
            // //当余额比较充裕时 取2倍锅底，否则取最小金钱
            // var suggestMoney = bank > 2 * guodi ? 2 * guodi : guodi - money;
            // this.GameRoomTopView.rechargeBtn.ForceCharge(suggestMoney);
        }        
    }
    this.initRoomKey = function(data){
        this.roomInfo = GFRoomMgr.getInstance().GetCurRoom();
        if( this.roomInfo == null) {
            this.roomInfo = GFRoomMgr.getInstance().CreateRoom(data.roomKey,data.roomType.type);
        }
        this.roomInfo.SetRoomData(data);
        this.setCurTurn(this.roomInfo.GetTurnNum());
        var lable = this.boxKeyRoom.getChildByName("lblKey");
        if(lable) lable.text = data.roomKey;
        this.boxKeyRoom.visible = (data.roomType.type == ROOM_TYPE_DIAMONDS.KEYROOM.key);
    }
    this.onRoomInfoAck = function(data)
    {
        this.PlayerControlCom.clearCards();
        //this.PlayerControlCom.SetCurActionPos(-1);
        this.btnControl.visible = true;
        this.initRoomKey(data);
        this.setShowCardsBtn(false);
        
        this.initGameRoomTopView();
        this.bLockPlayerState = false;
        GameData.getInstance().lockPlayerMoney = false;
        this.PlayerControlCom.buttonPos = data.firstPutCardPos;        
        this.setPoolMoney( data.poolMoney );
        if(data.roomType){
            this.setBasalCistern(data.roomType.baseNote);
        }
        this.gameMinMoney = data.gameMinMoney;
        this.PlayerControlCom.setUserData( data );
        this.hideDice();
        this.PlayerControlCom.setFCPlayer();
        if(this.reraisePanel && this.reraisePanel.visible){
            this.reraisePanel.onCancel();
        }
        this.dealRoomState(data);
        this.DisconnectButtonProcess( data );
        this.hideLoading();
        this.updateChangeRoomBtn();
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
                    this.PlayerControlCom.clearTable();
                    this.showSettlementing();
                }
                break;
            case GameData.getInstance().gfRoomState.eActionBegin:
                {
                    CLog.log("onRoomInfoAck.....   eActionBegin   setShowCardsBtn(true).......");
                    this.setShowCardsBtn(true);
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
    this.DisconnectButtonProcess = function( data )
    {
        for( var i = 0; i < data.users.length;i++ )
        {
            var user = data.users[i];
            if( user.isAction )
            {
                if( this.PlayerControlCom.isLocalPlayer(user.userPos) )
                {
                    this.setButtonShow(user);
                }else 
                {
                    this.showIntelligenceBtn(user);
                }    
            }
        }
    }

    //有新玩家加入房间
    this.onPlayerAddNTF = function(data)
    {
        var room = GFRoomMgr.getInstance().GetCurRoom();
        var bDemo = room.GetType() == ROOM_TYPE_DIAMONDS.DEMOROOM.key;
        this.PlayerControlCom.addPlayerData( data,bDemo );
        SoundManager.playSound('audio/sit.mp3');
    }
    //玩家退出
    this.onPlayerRemoveNTF = function(data)
    {
        this.PlayerControlCom.removePlayer( data.userPos );
        if(this.PlayerControlCom.isLocalPlayer(data.userPos)){
            new HintMessage("您于此时离开了房间");
        }
    }
    //玩家状态更新
    this.onPlayerStateUpdate = function(data)
    {
        this.PlayerControlCom.setPlayerStateAndMoney(data);
         if(this.PlayerControlCom.isLocalPlayer(data.userPos) && !this.bLockPlayerState){
             this.updateChangeRoomBtn();
         }
    }
    //更新换房按钮显示与隐藏
    this.updateChangeRoomBtn = function(show){
        if(this.bRoomBtnLocked) return;
        var roomType = this.roomInfo.GetType();
        if(roomType == ROOM_TYPE_DIAMONDS.KEYROOM.key){
            this.ChangeRoomBtn.visible = false;
        }
        else{
            var state = this.PlayerControlCom.getLocalPlayerState();
            var playing = state === GameData.getInstance().playerState.Playing;
            this.ChangeRoomBtn.visible = !playing || show;
            if(this.ChangeRoomBtn.visible){
                this.setSpeakBtnVisible(false);
                this.intelligenceBtn.visible = false;
            }
        }
    }
    //游戏开始
    this.onGameStart = function(data)
    {
        StatePool.clearAllState();
        this.onGameStartOrOver();
        this.setRoomBtnLock(false);
        GameData.getInstance().lockPlayerMoney = false;
        this.PlayerControlCom.buttonPos = data.firstPutCardPos;
        this.gameMinMoney = this.roomInfo.GetBaseNote();
        this.resetIntelligenceBtn();
        this.setPoolMoney( data.poolMoney );
        this.setCurTurn(0);
        this.updateChangeRoomBtn();
        this.initShowCardsBtn();
        this.autoPK = false;        
        CLog.log("游戏开始 onGameStart  firstPutCardPos:"+data.firstPutCardPos);
    }
    this.initShowCardsBtn = function(){
        var i = this.PlayerControlCom.getLocalPlayer();
        this.showCardsBtn.visible = false;
        i.setSeenCards(false);
    }
    //设置看牌按钮的显示与隐藏
    this.setShowCardsBtn = function(bShow){
        var me = this.PlayerControlCom.getLocalPlayer();
        if(!me) return;
        //弃牌后的玩家不许看牌
        var bGaming = me.getPlayerState() == GameData.getInstance().playerState.Playing;
        this.showCardsBtn.visible = !me.getSeenCards() && bGaming && bShow;
    }
    //lock所有按钮
    this.setRoomBtnLock = function(bLock){
        this.bRoomBtnLocked = bLock;
        CLog.log("lock所有按钮?.... bLock:"+bLock);
        if(bLock){
            this.setShowCardsBtn(false);
            this.ChangeRoomBtn.visible = false;
        }         
    }
    
    //发牌处理
    this.onDealCards = function(data)
    {
        if( GameData.getInstance().isGameHide || !data.hasOwnProperty('usersAndCards'))
            return;
        if(data.usersAndCards.length == 0){
            this.PlayerControlCom.dealCardCallBack();
            return;
        }
        this.PlayerControlCom.setCardsInfo(data);
        //首轮发牌延迟一段时间用于掷骰子
        var task = new TaskDelay();
        task.data = data;
        task.callBack = function(data){
            this.PlayerControlCom.dealCards();
            SoundTool.getInstance().PlayGameSound(EnumGameSound.GIVE_CARD,ENUM_SEX.FEMALE);
        };
        task.classObj = this;
        task.leftTime = 2000;
        TaskDelayManager.getInstance().addTask( task );
    }
    /**
     * 某个玩家开始下注
     */
    this.onIn_ones_turn = function(data)
    {
        var room = GFRoomMgr.getInstance().GetCurRoom();
        room.SetTurnNum(data.turnNum);
        Tools.getInstance().SetGameCountDown(data.actionTime);
        this.PlayerControlCom.onInOnesturn(data);
        if( this.PlayerControlCom.isLocalPlayer(data.userPos) )
        {
            this.setButtonShow(data,true);
        }else 
        {
            this.showIntelligenceBtn(data);
        }
        this.setShowCardsBtn(true);
        this.setCurTurn(room.GetTurnNum());
    }

    /**
     * 玩家下注完毕
     */
    this.onPlayerActionOver = function(data)
    {
        this.PlayerControlCom.SetCurActionPos(-1);
        this.calcCardForms(data);
        this.gameMinMoney = data.gameMinMoney;
        CLog.log("玩家下注完毕  gameMinMoney："+data.gameMinMoney);
        
        this.setPoolMoney(data.poolMoney);
        this.PlayerControlCom.playerActionOver(data);
        
        this.showIntelligenceBtn(data);
    }
    //当玩家下注失败
    this.onOprFailed = function(content){
        if(StatePool.hasState(GameData.getInstance().gfRoomState.eGameOver)) return;
        if(this.PlayerControlCom.InMyTurn()){
            this.speakButtonProcess();
        }
    }

    /**
     * 获得跟注金额
     */
    this.getFollowValue = function()
    {
        //return this.gameMinMoney - this.PlayerControlCom.getLocalPlayerTurnMoneyInTable();
        var bSeenCards = this.PlayerControlCom.getLocalPlayer().getSeenCards();
        var multiple = bSeenCards ? 2 : 1;
        return parseInt(this.gameMinMoney) * multiple;
    }
    //当游戏开始或者结束时，处理一下延迟动作和界面操作,主要是因为有可能网络延迟，服务端同一帧发来积压的多条游戏消息，导致界面显示不对
    this.onGameStartOrOver = function(){
        TaskDelayManager.getInstance().clearTarget(this);
        // 关闭加注界面
        if(this.reraisePanel && this.reraisePanel.visible){
            this.reraisePanel.onCancel();
        }
        //关闭结算界面
        if(this.settlementPro && this.settlementPro.visible){
            this.settlementPro.close(true);
        }
        //关闭比牌界面
        if(this.compareCardsView && this.compareCardsView.visible){
            this.compareCardsView.Show(false);
        }
        //关闭掷骰子界面
        if(this.diceEffect && this.diceEffect.visible){
            this.hideDice();
        }
    }
    /**
     * 游戏结束
     */
    this.onGameOverNTF = function(data)
    {     
        // //所有按钮隐藏
        this.setSpeakBtnVisible(false);
        this.intelligenceBtn.visible = false;       
        GameData.getInstance().lockPlayerMoney = true;
        CLog.log("onGameOverNTF  >>>>>> 锁住player money >>>>>>>>");
        this.PlayerControlCom.buttonPos = -1;
        
        this.PlayerControlCom.setFCPlayer();
        this.onGameStartOrOver();
        var delayTime = 100;
        if(this.autoPK){
            this.setRoomBtnLock(true);
            this.autoPK = false;
            //展示所有玩家的牌
            this.PlayerControlCom.ShowPlayersCards(data.players);
            delayTime = this.PlayerControlCom.delayTime;
        }
        var task = new TaskDelay();
        data.showCardForm = true;
        task.data = data;
        task.callBack = this.sendGameOverState;
        task.classObj = this;
        task.leftTime = delayTime;
        TaskDelayManager.getInstance().addTask( task );
    }
    //离开房间
    this.onLeaveRoomACK = function(data)
    {
        TaskDelayManager.getInstance().clear();
        if(!GATE_CONNECTED) return;
        GateSocketClient.getInstance().CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ();
    }
    //游戏开始倒计时
    this.GC_GAME_BEGIN_COUNTDOWN_NTF = function(data)
    {
        this.settlementing.visible = false; 
        if(data.countdown == -1){
            this.gameCountdown.visible = false;
        }
        else{
            this.gameStartCountdown( data.countdown );
        }                     
    }
    

    this.ROOM_STATE_GAME_BEGIN = function(data)
    {
        this.gameCountdown.stop();
        this.gameCountdown.setTxt( 0 );
        //this.gameCountdown.visible = true;
        //this.gameCountdown.zOrder = GameData.getInstance().UIZIndex.gameCountdown;
        this.gameCountdown.scale(5,5);
        
        Tween.to( this.gameCountdown,{ scaleX : 1,scaleY : 1 },700,Ease['elasticOut'] );    
        
        var task = new TaskDelay();
        task.data = null;
        task.callBack = this.hideGameCountdown;
        task.classObj = this;
        task.leftTime = 1000;//一秒为1
        TaskDelayManager.getInstance().addTask( task );
        //设置锅底
        this.PlayerControlCom.addBasalCisternJetion( this.roomInfo.GetAnte() );
		this.settlementing.visible = false;
        this.playDice();
        CLog.log("Room start game begin");
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
        }
        else{
            // this.lstTask.array = [];
            // this.createTaskItem();
            this.updateTaskNum();
        }
    }
    //检查是否有完成的任务
    this.checkTaskFinish = function(){
        if(!this.panelTask) return;
        var delayTime = 0;
        for(var i in this.lstTaskFinish){            
            var id = this.lstTaskFinish[i].TaskID;
            new TaskMessage(id,this.panelTask,delayTime);
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
        var lable = this.taskBtn.getChildByName('lbTaskProgress');
        var compNum = TaskInfoManager.getInstance().GetComplatedTaskNum(curScense); 
        var count = TaskInfoManager.getInstance().GetTaskBySceneType(curScense).length;
        lable.text = compNum + '/' + count;
        var lbl = this.taskView.getChildByName('lblNone');
        if(lbl){
            lbl.visible = count == 0;
        }
    }
    //任务按钮
    this.onTaskBtnClick = function(){
        this.taskView.visible = !this.taskView.visible;
        //this.onPKNTF({loserPos:0,winnerPos:1});
    }
    //点击背景时检测任务界面是否打开
    this.onStageClick = function(e){
        if(this.taskView && this.taskView.visible){
            this.taskView.visible = false;
        }
        if(this.reraisePanel && this.reraisePanel.visible){
            this.reraisePanel.onCancel();
        }
    }
    //自动开牌
    this.onAutoPKNTF = function(content){
        this.autoPK = true;
        this.bLockPlayerState = true;
        this.PlayerControlCom.lockPlayerUIState();
        var task = new TaskDelay();
        task.callBack = function(){ 
            StatePool.stateProcess(GameData.getInstance().gfRoomState.eLastPK);
        };
        task.classObj = this;
        task.leftTime = 1000;
        TaskDelayManager.getInstance().addTask( task );
        this.showAutoPKTips();
    }
    //自动开牌提示
    this.showAutoPKTips = function(str){
        CLog.log(".....自动开牌");
        this.boxAutoPK.visible = true;
        this.animAutoPK.play(0,false);
        this.animAutoPK.on(Event.COMPLETE,this,function(){
            this.boxAutoPK.visible = false;
        });
    }
    //当收到倒计时提醒
    this.onCountdownWarning = function(time){
        var curActionPos = this.PlayerControlCom.GetCurActionPos();
        var iPos = this.PlayerControlCom.getLocalPlayer().getPos();
        if(curActionPos == iPos){
            var sex = this.PlayerControlCom.getLocalPlayer().getSex();
            SoundTool.getInstance().PlayGameSound(EnumGameSound.HURRY_UP,sex);
        }
    }
}

