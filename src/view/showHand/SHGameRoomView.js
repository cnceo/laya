/**
 * huangandfly 2016 07 05
 */
function SHGameRoomView()
{
    SHGameRoomView.super(this);
    BasePageView.call(this);
    for(var i in BasePageView.prototype){
        SHGameRoomView.prototype[i] = BasePageView.prototype[i];
    }

    var self = this;    
    this.lstTaskFinish = [];//完成的任务
    this._firstGiveCard = true;//是否是首轮发牌
    this.maxBetMoney = 0;//顶住
    this.bWaitingChangeRoom = false;
    this.room = null;

    this.Init = function(dataInit){
        BasePageView.prototype.Init.call(this,dataInit);
        if( !NetManager.GameClintInstance ) 
        {
            NetManager.GameClintInstance = new ShowHandClient();
        }
        this.imgBg.on(Event.CLICK,this,this.onStageClick);
        this.PlayerControlCom = new PlayerController(5);
        this.initMessageListener();
        this.createJettonPool();
        this.createDiceEffect();
        
        var btns = this.getChildByName('btns');
        this.speekBtn = btns.getChildByName('speekBtn');
        this.intelligenceBtn = btns.getChildByName('intelligenceBtn');
        this.AnswerBtn = btns.getChildByName('AnswerBtn');
        this.allInBtn = btns.getChildByName('allInBtn');
        this.settlementing = this.getChildByName('settlementing');
        this.ChangeRoomBtn = btns.getChildByName("ChangeRoomBtn");
        this.taskBtn = btns.getChildByName("taskBtn");
        this.panelTask = btns.getChildByName('panelTask');
        
        this.speekBtn.visible  = false;
        this.AnswerBtn.visible = false;
        this.allInBtn.visible  = false;
        this.intelligenceBtn.visible  = false;
        this.settlementing.visible = false;
        
        this.gameCountdown.visible = false;
        
        this.addListener();       
        this.setZOrder(); 
        
        this.checkCardPanel = null;
        this.reraisePanel = null;
        this.settlementPro = null;
        
        if(GameData.getInstance().iamBack){
            CLog.log("GameData.getInstance().iamBack:"+GameData.getInstance().iamBack);
            GameData.getInstance().iamBack = false;
            //资源加载完成后请求房间信息
            //this.onRoomInfoAck(GameData.getInstance().gameRoomData);
            NetManager.GameClintInstance.CG_GET_ROOM_INFO_REQ();
        }
        else{
            this.toGetRoomInfo();
        }

        this.initTaskInfo();
        //this.initGameRoomTopView();
    } 

    this.initGameRoomTopView = function()
    {
        var room = SHRoomMgr.getInstance().GetCurRoom();
        if(this.GameRoomTopView) return;
        this.GameRoomTopView = new GameRoomTopView();        
        this.addChild( this.GameRoomTopView );
        this.GameRoomTopView.init(room.GetType() == ROOM_TYPE_DIAMONDS.DEMOROOM.key);
    }

    this.toGetRoomInfo = function(){
        this.bWaitingChangeRoom = false;
        NetManager.GameClintInstance.CG_IM_READY_REQ();
    }
    this.setZOrder = function()
    {
        this.setChildIndex(this.jettonPool,this.getChildIndex(this.getChildByName('players')));        
        
        var btns = this.getChildByName('btns');
        this.setChildIndex( btns,this.numChildren - 1 );
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
        MessageCallbackPro.addCallbackFunc( EventType.Type.turnStateNTF,this.onTurnStateNTF,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.dealCards,this.onDealCards,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.in_ones_turn,this.onIn_ones_turn,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerActionOver,this.onPlayerActionOver,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.gameOverNTF,this.onGameOverNTF,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.leaveCurRoom,this.onLeaveShowHandRoom,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.GC_GAME_BEGIN_COUNTDOWN_NTF,this.GC_GAME_BEGIN_COUNTDOWN_NTF,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.ROOM_STATE_GAME_BEGIN,this.ROOM_STATE_GAME_BEGIN,this );
        //MessageCallbackPro.addCallbackFunc( EventType.Type.CG_ACTIVE_ACK,this.CG_ACTIVE_ACK,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerMoneyChanged,this.setMoneyInfo,this);
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerCharge,this.onPlayerChargeNTF,this);
        MessageCallbackPro.addCallbackFunc( EventType.Type.oprFailed,this.onOprFailed,this); 
        // MessageCallbackPro.addCallbackFunc( EventType.Type.addNotice,this.onResidentNoticeEvent,this); 
        // MessageCallbackPro.addCallbackFunc( EventType.Type.removeNotice,this.onResidentNoticeEvent,this); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.changeRoomEvent,this.onChangeRoomEvent,this); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.reJoinRoomAck,this.onReJoinRoomAck,this);
        MessageCallbackPro.addCallbackFunc( EventType.Type.taskUpdate,this.onTaskUpdate,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.firstPutCardNTF,this.onFirstPutCardNTF,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.leaveGame,this.onLeaveGameSuccess,this );
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
        MessageCallbackPro.removeCallbackFunc( EventType.Type.turnStateNTF ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.dealCards ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.in_ones_turn ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerActionOver ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.gameOverNTF ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.leaveCurRoom ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.GC_GAME_BEGIN_COUNTDOWN_NTF ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.ROOM_STATE_GAME_BEGIN ,this);
        //MessageCallbackPro.removeCallbackFunc( EventType.Type.CG_ACTIVE_ACK ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerMoneyChanged,this.setMoneyInfo,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerCharge,this.onPlayerChargeNTF,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.oprFailed,this.onOprFailed,this);
        // MessageCallbackPro.removeCallbackFunc( EventType.Type.addNotice,this.onResidentNoticeEvent,this);
        // MessageCallbackPro.removeCallbackFunc( EventType.Type.removeNotice,this.onResidentNoticeEvent,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.changeRoomEvent,this.onChangeRoomEvent,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.reJoinRoomAck,this.onReJoinRoomAck,this); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.taskUpdate,this.onTaskUpdate,this );
        MessageCallbackPro.removeCallbackFunc( EventType.Type.firstPutCardNTF,this.onFirstPutCardNTF,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.leaveGame,this.onLeaveGameSuccess,this );
    }
    this.onLeaveGameSuccess = function(){
        ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.GAMEHALL ,resList:PreLoadList.getInstance().gameHall});
    }
    
    this.setMoneyInfo = function(data){
        var localPlayer = this.PlayerControlCom.getLocalPlayer();
        if(!localPlayer) return;
        localPlayer.setPlayerMoney(User.getInstance().GetGameMoney());
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
        
        GameData.getInstance().checkBottomCard = false;               
        this.clearTween();
        this.hideLoading();
        StatePool.clearAllState();
        
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
        SHRoomMgr.getInstance().Reset();
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
    
        //设置底注、锅底
    this.setBasalCistern = function( value )
    {
        this.Antes.text = Tools.getInstance().ChangeUIShow(value);
        this.bottomPot.text = Tools.getInstance().ChangeUIShow(this.room.GetAnte());
    }
    
        //设置顶注
    this.setMaxBet = function( value )
    {
        this.maxBet.text = Tools.getInstance().ChangeUIShow(value);
        this.maxBetMoney = value;
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
        var state = GameData.getInstance().shActionState;
        var tempMoney = data.actionMoney;
        var userMoney = data.money;
        var gameMoneyInTable = data.gameMoneyInTable;
        //CLog.log("解析行动目的  actionMoney:"+tempMoney + "  money:"+userMoney);
        var sex = this.PlayerControlCom.getPlayerByPos(data.userPos).getSex();
        //全梭
        if(parseInt(userMoney) === 0)
        {
            SoundTool.getInstance().PlayGameSound(EnumGameSound.ALL_IN,sex);
            this.PlayerControlCom.showTalk( data.userPos,'All In');
            this.PlayerControlCom.showAllIn(data.userPos,data.allinTime);
            this.operateBtns(); 
        }
        else if(tempMoney === -1)
        {
            //弃牌
            SoundTool.getInstance().PlayGameSound(EnumGameSound.DROP_CARD,sex);
            this.PlayerControlCom.showTalk( data.userPos,'弃牌');
            this.PlayerControlCom.dropCard( data.userPos );
            
            if( this.PlayerControlCom.isLocalPlayer(data.userPos) )
            {
                this.operateBtns();
                this.updateChangeRoomBtn(true);
                        // 关闭加注界面
                if(this.reraisePanel && this.reraisePanel.visible){
                    this.reraisePanel.onCancel();
                }
            }
        }
        //过牌
        else if(data.actionState === state.GuoPai)
        {
            this.PlayerControlCom.showTalk( data.userPos,'过牌');
            SoundTool.getInstance().PlayGameSound(EnumGameSound.PASS_CARD,sex);
        }
        //下注
        else if(data.actionState === state.XiaZhu)
        {
            //SoundTool.getInstance().PlayGameSound(EnumGameSound.STAKE);
            this.PlayerControlCom.showTalk( data.userPos,'押注：' + Tools.getInstance().ChangeUIShow(tempMoney));
        }
        //跟注
        else if(data.actionState === state.GenZhu)
        {
            SoundTool.getInstance().PlayGameSound(EnumGameSound.FOLLOW_CARD,sex);
            this.PlayerControlCom.showTalk( data.userPos,'跟注：' + Tools.getInstance().ChangeUIShow(tempMoney));
        }
        //加注
        else if(data.actionState === state.JiaZhu) 
        {
            SoundTool.getInstance().PlayGameSound(EnumGameSound.RAISE,sex);
            this.PlayerControlCom.showTalk( data.userPos,'加注：' + Tools.getInstance().ChangeUIShow(tempMoney));
        }
        else 
        {
            CLog.log("ShowHandManager???????????出问题了?????????????");
            CLog.log("ShowHandManager 某人回合完毕 money:"+userMoney+"  self.turnMoney:"+data.turnMoney+"  actionMoney:"+tempMoney);
        }
        
        //往桌子上添加筹码
        if( tempMoney > 0 )
        {
            this.PlayerControlCom.addJetion( data,true );
        }

        //显示梭哈效果
        if( userMoney == 0 || tempMoney >= parseFloat(this.maxBetMoney) )
        {
            this.PlayerControlCom.showAllInEffect( data.userPos );
        }
        this.PlayerControlCom.setPlayerGameMoneyInTable( data.userPos,gameMoneyInTable );
    }
    
    this.hideGameCountdown = function()
    {
        this.gameCountdown.visible = false; 
        StatePool.stateProcess(GameData.getInstance().showhandRoomState.eGameBegin);
    }
    
    //结算界面关闭
    this.settlementPanelClose = function( clickClose )
    {
        this.setPoolMoney(0);
        this.PlayerControlCom.clearTable();
        if( clickClose )
        {
            this.showSettlementing();
        }
        this.updateChangeRoomBtn(true);
        this.checkTaskFinish();
    }
    
    this.calcWinOrLose = function(data)
    {
        if( !data.hasOwnProperty('winners') )
            return;
        var localName = User.getInstance().GetName();
        for( var i = 0;i < data.winners.length;i++ )
        {
            var t_data = data.winners[i];
            t_data.win = ((t_data.returnMoney - t_data.inputMoney) > 0);
            t_data.self = ( this.PlayerControlCom.isLocalPlayer( t_data.userPos )) && (localName == t_data.userName);
            t_data.headIconName = t_data.headP;
        }
    }
    
    /**
     * 按钮逻辑处理
     */
    this.buttonProcess = function( data )
    {
        //观看不进行操作
        if( GameData.getInstance().playerState.Watching === this.PlayerControlCom.getLocalPlayerState() 
              || GameData.getInstance().playerState.Abandon === this.PlayerControlCom.getLocalPlayerState() )
            return;
        var lPlayer = this.PlayerControlCom.getLocalPlayer();
        var lMoney = User.getInstance().GetGameMoney() / 100;

        if( (lPlayer.getAllInTimes() > 0)){//(parseInt(lMoney) == 0) ||
            this.intelligenceBtn.visible = false;
        }
        else
        {
            this.intelligenceBtn.visible = true;
            if( this.getIntelligenceSelect() != '' )
            {
                return;
            }
            //有人下过注了 
            if( this.turnMoney > 0 )
            {
                var passOrDropBtn = this.intelligenceBtn.getChildByName('passOrDropBtn');
                passOrDropBtn.visible = false;
                
                var passCardBtn = this.intelligenceBtn.getChildByName('passCardBtn');
                passCardBtn.visible = false;
                
                
                var followBtn = this.intelligenceBtn.getChildByName('followBtn');
                followBtn.visible = true;
                var dropCardBtn = this.intelligenceBtn.getChildByName('dropCardBtn');
                dropCardBtn.visible = true;
            }else
            {
                var passOrDropBtn = this.intelligenceBtn.getChildByName('passOrDropBtn');
                passOrDropBtn.visible = true;
                var passCardBtn = this.intelligenceBtn.getChildByName('passCardBtn');
                passCardBtn.visible = true;
                
                var followBtn = this.intelligenceBtn.getChildByName('followBtn');
                followBtn.visible = false;
                var dropCardBtn = this.intelligenceBtn.getChildByName('dropCardBtn');
                dropCardBtn.visible = false;
            }
        }        
    }
    
     /**
     * 设置按钮显示
     */
    this.setButtonShow = function(data,bDelay)
    {
        this._dataOptr = data;//暂存操作按钮的显示相关数据，以便在下注失败时用到
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

    /**
     * 
     */
    this.speakButtonProcess = function(data)
    {
        if(this.PlayerControlCom.getLocalPlayerState() != GameData.getInstance().playerState.Playing) return;
        var localMoney = this.PlayerControlCom.getLocalPlayerMoney();
        var base = this.room.GetBaseNote();        
        //有人下过注了
        if( this.getFollowValue() >  localMoney
            || base > localMoney)
        {
            this.speekBtn.visible = false;
            this.intelligenceBtn.visible = false;
            this.allInBtn.visible = true;
            this.AnswerBtn.visible = false;
        }else if( this.turnMoney > 0 )
        {
            this.speekBtn.visible = false;
            this.intelligenceBtn.visible = false;
            this.allInBtn.visible = false;
            this.AnswerBtn.visible = true;
            var label = this.AnswerBtn.getChildByName("followBtn").getChildByName("txt");
            label.text = "跟注 (" + Tools.getInstance().ChangeUIShow(this.getFollowValue()) + ")";
            var reraiseBtn = this.AnswerBtn.getChildByName('reraiseBtn');
            reraiseBtn.visible = (data && (data.canAdd == 1));
            //this.AnswerBtn.x = reraiseBtn.visible ? 106 : 235;
        }else 
        {
            this.speekBtn.visible = true;
            var anteBtn = this.speekBtn.getChildByName('anteBtn').getChildByName('txt');
            anteBtn.text = '底注（' + parseInt(base / Tools.getInstance().ExactDigit) + '）';
            
            this.intelligenceBtn.visible = false;
            this.AnswerBtn.visible = false;
            this.allInBtn.visible = false;
        }
    }

     /**
     * 预操作向服务端发起下注请求
     */
    this.intelligenceSelectReq = function(money){        
        var selectName = this.getIntelligenceSelect();
        var myMoney = this.PlayerControlCom.getLocalPlayerMoney();
        var followMoney = this.getFollowValue();
        var base = this.room.GetBaseNote();
        switch( selectName )
        {
            case 'dropCardBtn':
                NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ(-1);
                StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin);
                break;
            case 'passCardBtn':
                if( this.turnMoney == 0 )
                {
                    NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ(0);
                    StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin);
                }else
                {
                    this.speakButtonProcess(this._dataOptr);
                }
                break;
            case 'passOrDropBtn':
                if( this.turnMoney === 0 )
                {
                    NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ(0);
                }else
                {
                    NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ(-1);
                }
                StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin);
                break;
            case 'followAwaysBtn':
                //有人下过注了
                if( this.turnMoney > 0 )
                {
                    NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ(Math.min(myMoney,followMoney));
                }else
                {
                    //没人下注 就下底注
                    NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ( Math.min(myMoney,parseInt( base )) );
                }
                StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin);
                break;    
            case 'followBtn':
                if( this.turnMoney > 0 )
                {
                    NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ( Math.min(myMoney,followMoney) );
                }else
                {
                    //没人下注 就下底注
                    NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ( Math.min(myMoney,parseInt( base )) );
                }
                StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin);
                this.setCheckButtonState(this.intelligenceBtn,'followBtn');
                break;  
            default:
                {
                    this.speakButtonProcess(this._dataOptr);
                }   
                break;    
        }
        
    }
    
    /**
     * 获得智能选择模式
     */
    this.getIntelligenceSelect = function()
    {
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
    this.getCheckButtonState = function( btnName )
    {
        var Btn   = this.intelligenceBtn.getChildByName( btnName );
        //var btnCom = Btn.getComponent('CheckButton');
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
        this.removeLisCheckBtn( this.intelligenceBtn,'passCardBtn' );
        this.removeLisCheckBtn( this.intelligenceBtn,'passOrDropBtn' );
        this.removeLisCheckBtn( this.intelligenceBtn,'followBtn' );
        this.removeLisCheckBtn( this.intelligenceBtn,'followAwaysBtn' );
        this.removeLisCheckBtn( this.intelligenceBtn,'dropCardBtn' );
        
        // //发言阶段按钮   
        this.removeBtnListener( this.speekBtn,'reraiseBtn',this.onReraiseBtn );
        this.removeBtnListener( this.speekBtn,'anteBtn' ,this.onAnteBtn);
        this.removeBtnListener( this.speekBtn,'dropBtn' ,this.onDropBtn);
        this.removeBtnListener( this.speekBtn,'passBtn' ,this.onPassBtn);
        
        // //回答发言
        this.removeBtnListener( this.AnswerBtn,'dropBtn' ,this.onAnswerDropBtn);
        this.removeBtnListener( this.AnswerBtn,'followBtn' ,this.onAnswerFollowBtn);
        this.removeBtnListener( this.AnswerBtn,'reraiseBtn' ,this.onAnswerReraiseBtn);

        this.removeBtnListener( this.ChangeRoomBtn,"reJoinBtn",this.onReJoinBtn);
          
        this.removeBtnListener( this.allInBtn,'dropBtn' ,this.onAllInDropBtn);
        this.removeBtnListener( this.allInBtn,'allInBtn' ,this.onAllInAllInBtn);   
        
        this.backBtn.off( Event.CLICK,this,this.onExit );
        //this.recharge.off( Event.CLICK,this,this.onRecharge );   
        //this.musicBtn.off( Event.CLICK,this,this.onMusicBtnClick );
        this.taskBtn.off( Event.CLICK, this,this.onTaskBtnClick );
            
        Laya.stage.off( 'hide_window',this,this.onHideWindow );
        Laya.stage.off( 'show_window',this,this.onShowWindow );

        //window.removeEventListener("message", this.onAppEvent, false);
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
    
    //监听一些事件
    this.addListener = function () 
    {
        // //智能选择按钮
        this.listenerCheckBtn(this.intelligenceBtn,'passCardBtn',this.onPassCardBtn);
        this.listenerCheckBtn(this.intelligenceBtn,'passOrDropBtn',this.onPassOrDropBtn);
        this.listenerCheckBtn(this.intelligenceBtn,'followBtn',this.onFollowBtn);
        this.listenerCheckBtn(this.intelligenceBtn,'followAwaysBtn',this.onFollowAwaysBtn);
        this.listenerCheckBtn(this.intelligenceBtn,'dropCardBtn',this.onDropCardBtn);
        
        // //发言阶段按钮  
        this.addBtnListener( this.speekBtn,'reraiseBtn',this.onReraiseBtn );
        this.addBtnListener( this.speekBtn,'anteBtn',this.onAnteBtn );
        this.addBtnListener( this.speekBtn,'dropBtn',this.onDropBtn );
        this.addBtnListener( this.speekBtn,'passBtn',this.onPassBtn );
        
        // //回答发言
        this.addBtnListener( this.AnswerBtn,'dropBtn',this.onAnswerDropBtn );
        this.addBtnListener( this.AnswerBtn,'followBtn',this.onAnswerFollowBtn );
        this.addBtnListener( this.AnswerBtn,'reraiseBtn',this.onAnswerReraiseBtn );
        
        this.addBtnListener( this.allInBtn,'dropBtn',this.onAllInDropBtn );
        this.addBtnListener( this.allInBtn,'allInBtn',this.onAllInAllInBtn );  

        this.addBtnListener( this.ChangeRoomBtn,"reJoinBtn",this.onReJoinBtn);
        
        this.backBtn.on( Event.CLICK,this,this.onExit );
        //this.recharge.on( Event.CLICK,this,this.onRecharge );
        this.taskBtn.on( Event.CLICK, this,this.onTaskBtnClick );
        //this.musicBtn.on( Event.CLICK,this,this.onMusicBtnClick );

        // this.gmBtn.visible = GM_OPEN;
        // if(GM_OPEN){
        //     this.gmBtn.on(Event.CLICK,this,this.onGMClick);
        // }

        Laya.stage.on( 'hide_window',this,this.onHideWindow );
        Laya.stage.on( 'show_window',this,this.onShowWindow );

        //this.registerListenerFromAPP();     
    }

        //注册app消息
    //this.registerListenerFromAPP = function(){
    //    window.addEventListener("message", this.onAppEvent, false);
    //},

    // //处理从app发来的消息
    // this.onAppEvent = function(e){
    //     var code = e.data.MSG_CODE;
    //     if(code != GameData.getInstance().WIN_PROTOCOL.MSG_BACKGROUND_MODE)
    //         return;
    //     var params = e.data.PARAMS[0];
    //     switch (params){
    //         case GameData.getInstance().APP_EVENT.GAME_HIDE:
    //             CLog.log("@@@@@@@@@@@@@@@@@@@@@  GameManager.js.......GAME_HIDE........");
    //             //alert("GAME_HIDE");
    //             //cc.game.emit(cc.game.EVENT_HIDE, cc.game);
    //             self.onHideWindow();
    //             break;
    //         case GameData.getInstance().APP_EVENT.GAME_SHOW:
    //             CLog.log("@@@@@@@@@@@@@@@@@@@@@  GameManager.js.........GAME_SHOW......");
    //             //cc.game.emit(cc.game.EVENT_SHOW, cc.game);
    //             //alert("GAME_SHOW");
    //             self.onShowWindow();
    //             break;
    //         default:
    //             break;
    //     }
    // }
    
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
    
    
    this.onHideWindow = function()
    {
        //GameData.getInstance().isGameHide = true; 
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
        //this.initMessageListener();
        //GameData.getInstance().isGameHide = false;        
        this.PlayerControlCom.clearTable();

        this.gameCountdown.visible = false;
        this.operateBtns();
        this.updateChangeRoomBtn();
        TaskDelayManager.getInstance().clear();
        
        if(this.bWaitingChangeRoom){
            this.bWaitingChangeRoom = false;
            this.toGetRoomInfo();
        }
        else{
            NetManager.GameClintInstance.CG_GET_ROOM_INFO_REQ();
        }
        NetManager.GateClintMgr.active();
        
        CLog.log('===============gameshow');
        
    }

    this.clearRoom = function(){
        // this.removeMessageListener();        
        // this.initMessageListener();
        StatePool.clearAllState(true);        
        this.PlayerControlCom.resetController();
        this.onGameStartCountdownOver();
        this.gameCountdown.stop();
        TaskDelayManager.getInstance().clear();
    }
    
    // 弃牌
    this.onAllInDropBtn = function()
    {
        NetManager.GameClintInstance != undefined && NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ(-1);
        this.allInBtn.visible = false;
        StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin);
    }
    
    //allIn 
    this.onAllInAllInBtn = function()
    {
        NetManager.GameClintInstance != undefined && NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ( this.PlayerControlCom.getLocalPlayerMoney() );
        this.allInBtn.visible = false;
        StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin);
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
        NetManager.GameClintInstance.CG_REJOIN_SHOWHAND_ROOM_REQ();
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
        if( this.PlayerControlCom.getLocalPlayerState() === GameData.getInstance().playerState.Playing )
        {
            this.closeExitPanel();
            var mb = new MessageBox();  
            mb.show('退出房间将判定为弃牌',this.onConfirmExit,null,this,MODE.MB_OK | MODE.MB_CANCEL);
            mb = null;
        }else 
        {
             //NetManager.GameClintInstance.CG_LEAVE_SHOWHAND_ROOM_REQ();
             this.onConfirmExit();
        }
    }
    this.closeExitPanel = function(){
        var mb = this.getChildByName("MessageBox");
        if(!mb) return;
        this.removeChild(mb);
    }
    //确定退出
    this.onConfirmExit = function()
    {         
        NetManager.GameClintInstance.CG_LEAVE_SHOWHAND_ROOM_REQ();
    }
    
    //回答弃牌
    this.onAnswerDropBtn = function( event )
    {
        NetManager.GameClintInstance != undefined && NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ(-1);
        this.AnswerBtn.visible = false;
        StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin);
    }
    
    //回答跟注
    this.onAnswerFollowBtn = function( event )
    {
        NetManager.GameClintInstance != undefined && NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ( this.getFollowValue() );
        this.AnswerBtn.visible = false;
        StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin);
    }
    
        //回答加注
    this.onAnswerReraiseBtn = function( event )
    {
        //点击加注弹出界面
        this.reraiseProcess();
    }    
    
     /**
     * 加注处理
     */
    this.reraiseProcess = function()
    {
        if( this.reraisePanel === null )
        {
            this.reraisePanel = new ReraiseView();
            this.reraisePanel.init( this.confirmReraise,this );
            this.addChild( this.reraisePanel );
        }
        
        this.reraisePanel.show( true );    
        var maxBetValue = parseInt(this.maxBetMoney);
        var curMoney = this.PlayerControlCom.getLocalPlayerMoney();
        var maxValue = maxBetValue <  curMoney ? maxBetValue : curMoney;
        this.reraisePanel.setMaxbet( maxValue );        
        this.reraisePanel.y = this.height;
        Tween.to( this.reraisePanel,{y:this.height - this.reraisePanel.height},200 );
    }
    
    this.confirmReraise = function()
    {
        //确认加注
        if( NetManager.GameClintInstance != undefined )
        {
            var value = this.reraisePanel.getReraiseValue();
            (this.turnMoney > 0) && (value += this.turnMoney);  //有人下过注了 就在上家的基础上加注
            //CLog.log("确认加注  this.turnMoney:"+this.turnMoney + "  value:"+value);
            NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ( value );  
            StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin);
        }
        this.AnswerBtn.visible = false;
        this.speekBtn.visible = false;
    }
    
    //设置加注文字显示
    this.setReraiseTxt = function( percent )
    {
        var money = Math.min( parseInt( this.maxBetMoney ), this.PlayerControlCom.getLocalPlayerMoney());
        this.reraiseTxt.text = percent === 1 ? 'All In' : parseInt(percent * money);
    }
    
    //过牌
    this.onPassBtn = function( event )
    {
        NetManager.GameClintInstance != undefined && NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ(0);
        this.speekBtn.visible = false;
        StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin);
    }
    
    //弃牌
    this.onDropBtn = function( event )
    {
        NetManager.GameClintInstance != undefined && NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ(-1);
        this.speekBtn.visible = false;
        StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin); 
    }
    
    //加注
    this.onReraiseBtn = function( event )
    {
        //点击加注弹出界面
        this.reraiseProcess();
    }
    
    //底注
    this.onAnteBtn = function( event )
    {
        var base = this.room.GetBaseNote();
        NetManager.GameClintInstance != undefined && NetManager.GameClintInstance.CG_SHOWHAND_ACTION_REQ( parseInt(base) );
        this.speekBtn.visible = false;
        StatePool.stateProcess(GameData.getInstance().showhandRoomState.eActionBegin);
    }
    
    //智能按钮 总是跟注
    this.onFollowAwaysBtn = function(event)
    {
        if( event.target.getIsCheck() )
        {
            this.setCheckButtonState( this.intelligenceBtn,'passOrDropBtn' );
            this.setCheckButtonState(this.intelligenceBtn,'passCardBtn');
            this.setCheckButtonState(this.intelligenceBtn,'followBtn');
            this.setCheckButtonState(this.intelligenceBtn,'dropCardBtn');
        }
        var txt = event.currentTarget.getChildByName('txt');
        txt.color = event.target.getIsCheck() ? GameData.getInstance().COLOR.BLACK : GameData.getInstance().COLOR.WHITE;
    }
    
    //智能按钮 智能跟注
    this.onFollowBtn = function ( event )
    {
        if( event.target.getIsCheck() )
        {
            this.setCheckButtonState(this.intelligenceBtn,'passOrDropBtn');
            this.setCheckButtonState(this.intelligenceBtn,'passCardBtn');
            this.setCheckButtonState(this.intelligenceBtn,'followAwaysBtn');
            this.setCheckButtonState(this.intelligenceBtn,'dropCardBtn');
        }
        var txt = event.currentTarget.getChildByName('txt');
        txt.color = event.target.getIsCheck() ? GameData.getInstance().COLOR.BLACK : GameData.getInstance().COLOR.WHITE;
    }
    
    //智能按钮 弃或过按钮点击处理
    this.onPassOrDropBtn = function ( event )
    {
        if( event.target.getIsCheck() )
        {
            this.setCheckButtonState(this.intelligenceBtn,'passCardBtn');
            this.setCheckButtonState(this.intelligenceBtn,'followBtn');
            this.setCheckButtonState(this.intelligenceBtn,'followAwaysBtn');
            this.setCheckButtonState(this.intelligenceBtn,'dropCardBtn');
        }
        var txt = event.currentTarget.getChildByName('txt');
        txt.color = event.target.getIsCheck() ? GameData.getInstance().COLOR.BLACK : GameData.getInstance().COLOR.WHITE;
    }
    
    //智能按钮 过牌按钮点击处理
    this.onPassCardBtn = function ( event )
    {
        if( event.target.getIsCheck() )
        {
            this.setCheckButtonState(this.intelligenceBtn,'passOrDropBtn');
            this.setCheckButtonState(this.intelligenceBtn,'followBtn');
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
            this.setCheckButtonState(this.intelligenceBtn,'passOrDropBtn');
            this.setCheckButtonState(this.intelligenceBtn,'followBtn');
            this.setCheckButtonState(this.intelligenceBtn,'followAwaysBtn');
            this.setCheckButtonState(this.intelligenceBtn,'passCardBtn');
        }
        var txt = event.currentTarget.getChildByName('txt');
        txt.color = event.target.getIsCheck() ? GameData.getInstance().COLOR.BLACK : GameData.getInstance().COLOR.WHITE;
    }
    /**
     * 重置智能发言按钮状态g
     */
    this.resetIntelligenceBtn = function()
    {
        this.intelligenceBtn.getChildByName('passOrDropBtn').reset();
        this.intelligenceBtn.getChildByName('passCardBtn').reset();
        //this.intelligenceBtn.getChildByName('followAwaysBtn').reset();
        this.intelligenceBtn.getChildByName('followBtn').reset();
        this.intelligenceBtn.getChildByName('dropCardBtn').reset();
        var white = GameData.getInstance().COLOR.WHITE;
        this.intelligenceBtn.getChildByName('passOrDropBtn').getChildByName('txt').color = white;
        this.intelligenceBtn.getChildByName('passCardBtn').getChildByName('txt').color = white;
        //this.intelligenceBtn.getChildByName('followAwaysBtn').getChildByName('txt').color = white;
        this.intelligenceBtn.getChildByName('followBtn').getChildByName('txt').color = white;
        this.intelligenceBtn.getChildByName('dropCardBtn').getChildByName('txt').color = white;
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
        StatePool.stateProcess(GameData.getInstance().showhandRoomState.eGameOver);
        this.calcWinOrLose( data );
        if( this.settlementPro == null )
        {
            this.settlementPro = new SettlementView();
            var roomType = this.room.GetType();
            this.settlementPro.init(this.PlayerControlCom,roomType);
            this.addChild( this.settlementPro );
        }
        this.ChangeRoomBtn.visible = false;
        this.settlementPro.show( data ,{callBack:this.settlementPanelClose,classObj:this});
        this.checkUserMoney();
        this.closeExitPanel();
    }
    //检测玩家余额 余额不足强制充钱
    this.checkUserMoney = function(){
        var money = User.getInstance().GetGameMoney();
        CLog.log("检测玩家余额.... money:"+money);
        var bank = User.getInstance().GetBankMoney();
        var guodi = this.room.GetBaseNote() * 4;
        //if(money + bank < guodi) return;//玩家所有资产小于最低金额 则不再强制充钱（将会等待被踢）
        if(money < guodi){
            // //当余额比较充裕时 取2倍锅底，否则取最小金钱
            // var suggestMoney = bank > (2 * guodi) ? 2 * guodi : guodi - money;
            // this.GameRoomTopView.rechargeBtn.ForceCharge(suggestMoney);
            new HintMessage("您的余额已不足");
        }        
    }
    this.initRoomKey = function(data){
        this.room = SHRoomMgr.getInstance().GetCurRoom();
        if(this.room == null) {
            this.room = SHRoomMgr.getInstance().CreateRoom(data.roomKey,data.roomSummery.type);
        }
        this.room.SetRoomData(data);
        this.setBasalCistern(this.room.GetBaseNote());
        var lable = this.boxKeyRoom.getChildByName("lblKey");
        if(lable) lable.text = data.roomKey;
        this.boxKeyRoom.visible = (data.roomSummery.type == ROOM_TYPE_DIAMONDS.KEYROOM.key);
    }
    this.onRoomInfoAck = function(data)
    {
        GameData.getInstance().lockPlayerMoney = false;
        GameData.getInstance().checkBottomCard = false;
        this.PlayerControlCom.clearTable();
        this.PlayerControlCom.buttonPos = data.firstPutCardPos;
        this.initRoomKey(data);    
        this.setPoolMoney( data.poolMoney );
        
        this.setMaxBet( data.roomSummery.maxNote );
        this.PlayerControlCom.setUserData( data );
        this.turnMoney = data.turnMoney;
        this.hideDice();
        this.PlayerControlCom.setFCPlayer();
        if(this.reraisePanel && this.reraisePanel.visible){
            this.reraisePanel.onCancel();
        }
        this.dealRoomState(data);
        this.DisconnectButtonProcess( data );
        this.hideLoading(); 
        this.updateChangeRoomBtn();
        this.initGameRoomTopView();
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
            case GameData.getInstance().gfRoomState.eWaitingGameBegin:
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
                    this.buttonProcess(user);
                }    
            }
        }
    }

    //有新玩家加入房间
    this.onPlayerAddNTF = function(data)
    {
        var room = SHRoomMgr.getInstance().GetCurRoom();
        var bDemo = room.GetType() == ROOM_TYPE_DIAMONDS.DEMOROOM.key;
        this.PlayerControlCom.addPlayerData( data,bDemo );
        SoundManager.playSound('audio/sit.mp3');
    }
    //玩家退出
    this.onPlayerRemoveNTF = function(data)
    {
        this.PlayerControlCom.removePlayer( data.userPos );
    }
    //玩家状态更新
    this.onPlayerStateUpdate = function(data)
    {
        this.PlayerControlCom.setPlayerStateAndMoney(data);        
         if(this.PlayerControlCom.isLocalPlayer(data.userPos)){
             this.updateChangeRoomBtn();
             if(data.hasOwnProperty("allinTimes") && data.allinTime > 0){
                 this.operateBtns();
             }
         }
    }
    //更新换房按钮显示与隐藏
    this.updateChangeRoomBtn = function(show){
        var roomType = this.room.GetType();
        if(roomType == ROOM_TYPE_DIAMONDS.KEYROOM.key){
            this.ChangeRoomBtn.visible = false;
        }
        else{
            var state = this.PlayerControlCom.getLocalPlayerState();
            var playing = state === GameData.getInstance().playerState.Playing;
            this.ChangeRoomBtn.visible = !playing || show;
        }        
    }
    //游戏开始
    this.onGameStart = function(data)
    {
        StatePool.clearAllState();
        this.onGameStartOrOver();
        GameData.getInstance().lockPlayerMoney = false;
        this.PlayerControlCom.buttonPos = data.firstPutCardPos;
        this.resetIntelligenceBtn();
        this.setPoolMoney( data.poolMoney );
        this.setBasalCistern( data.base );
        this.updateChangeRoomBtn();
        CLog.log("游戏开始 onGameStart");        
    }
    //游戏回合开始或者是结束
    this.onTurnStateNTF = function(data)
    {
        //0代表开始，1代表结束
        if( data.turnState == 0 )
        {
            this.turnMoney = 0;
            this.PlayerControlCom.onTurnBegin();            
        }else if( data.turnState == 1 ) 
        {
            this._firstGiveCard = false;
            var timeOut = setTimeout(function() 
            {
                clearTimeout( timeOut );
                StatePool.stateProcess(GameData.getInstance().showhandRoomState.eTurnOver);
            }, 1);
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
        if(this._firstGiveCard){
            var task = new TaskDelay();
            task.data = data;
            task.callBack = function(data){this.PlayerControlCom.dealCards();};
            task.classObj = this;
            task.leftTime = 2000;
            TaskDelayManager.getInstance().addTask( task );   
        }
        else{
            this.PlayerControlCom.dealCards();
        }
    }
    /**
     * 某个玩家开始下注
     */
    this.onIn_ones_turn = function(data)
    {
        Tools.getInstance().SetGameCountDown(data.actionTime);
        this.PlayerControlCom.onInOnesturn(data);
        if( this.PlayerControlCom.isLocalPlayer(data.userPos) )
        {
            this.setButtonShow(data,true);
        }else 
        {
            this.buttonProcess(data);
        }
        if(data.hasOwnProperty('cardForm')){
            SoundTool.getInstance().SpeakSHSounds(data.cardForm,data.num,data.suit);
            this.PlayerControlCom.LightCardForm(data);
        }        
    }

    /**
     * 玩家下注完毕
     */
    this.onPlayerActionOver = function(data)
    {
        this.calcCardForms(data);
        this.turnMoney = data.turnMoney;
        
        this.setPoolMoney(data.poolMoney);
        this.PlayerControlCom.playerActionOver(data);
        
        this.buttonProcess(data);

        if( this.PlayerControlCom.isLocalPlayer(data.userPos) )
        {
            this.intelligenceBtn.getChildByName('passCardBtn').reset();
            this.intelligenceBtn.getChildByName('passOrDropBtn').reset();
            var white = GameData.getInstance().COLOR.WHITE;
            this.intelligenceBtn.getChildByName('passCardBtn').getChildByName('txt').color = white;
            this.intelligenceBtn.getChildByName('passOrDropBtn').getChildByName('txt').color = white;
        }
    }
    //当玩家下注失败
    this.onOprFailed = function(content){
        if(StatePool.hasState(GameData.getInstance().showhandRoomState.eGameOver)) return;
        this.speakButtonProcess(this._dataOptr);
    }

    /**
     * 获得跟注金额
     */
    this.getFollowValue = function()
    {
        return this.turnMoney - this.PlayerControlCom.getLocalPlayerTurnMoneyInTable();
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
        this.onGameStartOrOver();
        //SoundManager.stopAllSound();
        this.PlayerControlCom.onGameOver(data);
        //this.setPoolMoney(data.poolMoney);        
        // //所有按钮隐藏
        this.operateBtns();        
        GameData.getInstance().lockPlayerMoney = true;
        CLog.log(">>>>>> 锁住player money >>>>>>>>");
        GameData.getInstance().checkBottomCard = false;
        this.PlayerControlCom.buttonPos = -1;
        this.PlayerControlCom.setFCPlayer();
        var task = new TaskDelay();
        task.data = data;
        task.callBack = this.sendGameOverState;
        task.classObj = this;
        task.leftTime = this.PlayerControlCom.delayTime;//
        TaskDelayManager.getInstance().addTask( task );
    }
    //按钮操作
    this.operateBtns = function(){
        this.speekBtn.visible = false;
        this.intelligenceBtn.visible = false;
        this.AnswerBtn.visible = false;
        this.allInBtn.visible = false;
    }
    //离开梭哈房间
    this.onLeaveShowHandRoom = function(data)
    {
        if(!GATE_CONNECTED) return;
        TaskDelayManager.getInstance().clear();
        GateSocketClient.getInstance().CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ();
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
        var guodi = this.room.GetBaseNote() * 4;
        this.PlayerControlCom.addBasalCisternJetion( guodi );
		this.settlementing.visible = false;
        this._firstGiveCard = true;
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
        //new TaskMessage(TaskInfoManager.getInstance().GetAllTask()[0].TaskID,this.panelTask);
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
}


