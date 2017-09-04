/**
 * huangandfly
 * 2017 04 25 
 * 游戏房间类型选择类
 */
function GameRoomTypeView(roomTypeEnum)
{
    this.roomType = roomTypeEnum;
    GameRoomTypeView.super(this);
     BasePageView.call(this);
    for(var i in BasePageView.prototype){
        GameRoomTypeView.prototype[i] = BasePageView.prototype[i];
    }

    this.Init = function(dataInit)
    {
        BasePageView.prototype.Init.call(this,dataInit);
        this.lblName.text = Tools.getInstance().GetLocalPlayerUIName();
        this.initGameRoomType(dataInit.caller,dataInit.callback);

        this.addListener();
        GateSocketClient.getInstance().CG_GET_MONEY_REQ();
        this.updateUserMoney();
        this.initChatList();
        this.initEffect();
        this.initPeopleOnline();
        Notice.getInstance().InitUiNotice(this.boxNotice);
        //GateSocketClient.getInstance().CG_GET_MONEY_REQ();
        this.initDemoRoomBtn();
        this.gmBtn.visible = GM_OPEN;
        EmailManager.getInstance().onDataChanged();
        this.initJackpot();
        this.initChat();
        this.initSetting();
    }

    this.getLadderNum = function()
    {
        return this.gameRoomtype.getLadderNum();
    }
    
    this.initGameRoomType = function( _caller,_callback )
    {
        this.gameRoomtype = new GameRoomType();
        this.gameRoomtype.init(_caller,_callback,this.roomType);
        this.gameRoomtype.mouseThrough = true;
        this.addChild( this.gameRoomtype ); 
        this.bHasDemoRoom = this.gameRoomtype.getHasDemoRoom();
    }

    //初始化试玩按钮
    this.initDemoRoomBtn = function(){
        this.playDemoBtn.visible = this.bHasDemoRoom;
        if(!this.bHasDemoRoom){
            this.playExplainBtn.x = this.playExplainBtn.x + 160;
        }
    }

    //初始化聊天列表
    this.initChatList = function()
    {
        this.chatMsgScroll = new ChatSmallView();
        this.chatMsgScroll.init();
        this.chatMsgScroll.x = 0;
        this.chatMsgScroll.y = this.height - this.chatMsgScroll.height - 32;
        this.addChild(this.chatMsgScroll);
        this.chatMsgScroll.on(Event.CLICK,this,this.onChatBtn);
    }

     //初始化特效
    this.initEffect = function(){
        if(!this.bgHallGuang) return;
        var alphaTo = this.bgHallGuang.alpha > 0 ? 0 : 1;
        Tween.to(this.bgHallGuang,{alpha:alphaTo},2000,Ease["cubicInOut"],new Handler(this,function(){
            this.initEffect();
        }));
        if(!this.star){
            this.star = new StarLight();
            this.star.width   = 700;
            this.star.height  = 700;
            this.star.init(0,"common/effectLight.png");
            this.star.x = 360;
            this.star.y = 228;
            this.addChild(this.star);

            this.star2 = new StarLight(0.005);
            this.star2.init(360,"common/effectLight.png");
            this.star2.x = 1250;
            this.star2.y = 640;
            this.star2.scaleY = this.star2.scaleX = 2.5;
            this.addChild(this.star2);

            this.star3 = new StarLight(-0.005);
            this.star3.init(0,"common/effectLight.png");
            this.star3.x = this.star2.x;
            this.star3.y = this.star2.y;
            this.star3.scaleY = this.star3.scaleX = this.star2.scaleX;
            this.addChild(this.star3);

            this.setChildIndex(this.star,this.getChildIndex(this.bgHallGuang)+1);  
            this.setChildIndex(this.star2,this.getChildIndex(this.bgHallGuang)+1);
            this.setChildIndex(this.star3,this.getChildIndex(this.bgHallGuang)+1);  
        }
    } 

    //初始化彩金
    this.initJackpot = function(){
        var jack = new JackpotView();
        jack.x = 133;
        jack.y = -5;
        this.addChild(jack);
        jack.Init();
    }
    /**
     * 添加监听事件
     */
    this.addListener = function()
    {
        this.backBtn.on( Event.CLICK,this,this.onBackBtn );
        this.chatBtn.on( Event.CLICK,this,this.onChatBtn );
        this.setingBtn.on( Event.CLICK,this,this.onSetingBtn );
        //this.playDemoBtn.on( Event.CLICK,this,this.onPlayDemoBtn);
        this.playExplainBtn.on(Event.CLICK,this, this.onPlayExplainBtn);
        //每隔一段时间请求一次在线人数
        PeopleOnline.getInstance().LoopGameUserCountReq();

        MessageCallbackPro.addCallbackFunc( EventType.Type.playerMoneyChanged,this.updateUserMoney,this); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.headInfoEvent,this.updateHeadInfo,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.updateUserCount,this.updateUserCount,this);  
        MessageCallbackPro.addCallbackFunc( EventType.Type.redPointUpdate,this.onRedPointUpdate,this);
        MessageCallbackPro.addCallbackFunc( EventType.Type.gateLstAck,this.onGateLstAck,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.gmCommond,this.onGMCommond,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerStateUpdate,this.onStateUpdate,this);
        JackpotMgr.getInstance().LoopJackpotReq();
    }

    this.removeListener = function()
    {
        this.backBtn.off( Event.CLICK,this,this.onBackBtn );
        this.chatBtn.off( Event.CLICK,this,this.onChatBtn );
        this.setingBtn.off( Event.CLICK,this,this.onSetingBtn );
        //this.playDemoBtn.off( Event.CLICK,this,this.onPlayDemoBtn);
        this.playExplainBtn.off(Event.CLICK,this, this.onPlayExplainBtn);
        PeopleOnline.getInstance().UnLoopGameUserCountReq();

        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerMoneyChanged,this.updateUserMoney,this);  
        MessageCallbackPro.removeCallbackFunc( EventType.Type.headInfoEvent,this.updateHeadInfo,this );
        MessageCallbackPro.removeCallbackFunc( EventType.Type.updateUserCount,this.updateUserCount,this);   
        MessageCallbackPro.removeCallbackFunc( EventType.Type.redPointUpdate,this.onRedPointUpdate,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.gateLstAck,this.onGateLstAck,this );
        MessageCallbackPro.removeCallbackFunc( EventType.Type.gmCommond,this.onGMCommond,this );
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerStateUpdate,this.onStateUpdate,this );
        JackpotMgr.getInstance().UnLoopJackpotReq();
    }
    //初始化在线人数
    this.initPeopleOnline = function(){
        var num = PeopleOnline.getInstance().GetGameUCountNum(GameData.getInstance().curGameType);
        this.updateUserCount(num);
    }
    //用户在线人数发生变化
    this.updateUserCount = function(count)
    {
        count = parseInt(count)>0 ? count : "获取中..";
        this.onlineNum.text = count;
    }

    //红点变化
    this.onRedPointUpdate = function(data)
    {
        var label = this.boxRedP.getChildByName('lbRedP');
        if(!label) return;
        label.text = data.num;
        this.boxRedP.visible = data.num != 0;
    }
    //GM开启
    this.onGMCommond = function(commond){
        this.gmBtn.visible = commond == "open";
    }

    this.initChat = function(){
        this.chatPanel = new ChatView();
        this.addChild( this.chatPanel );        
        this.chatPanel.Init({obj:this,callback:this.onChatPanelClose});
        this.chatPanel.x = (GameData.getInstance().SCENE_WIDTH - this.chatPanel.width) >> 1;
        this.chatPanel.y = this.chatPanel.height;
        this.chatPanel.visible = false;
        this.chatPanel.scale(0,0);
    }
        //聊天按钮
    this.onChatBtn = function()
    {
        if( this.chatPanel == null ) return;
        if(this.chatPanel.visible)
        {
            this.chatPanel.Hide();
        }else 
        {
            this.chatPanel.Show();
        }
        this.chatMsgScroll.setLock(this.chatPanel.visible);
    }

    this.onChatPanelClose = function()
    {
        this.chatMsgScroll.setLock(false); 
        this.chatBtn.onMouseOut();
    }
    this.onStateUpdate = function(content){
        User.getInstance().SetGameMoney(content.money);
        this.updateUserMoney();
    }
     //用户余额发生变化
    this.updateUserMoney = function(){
        if(!this.labelUserMoney) return;
        this.labelUserMoney.text = '￥'+Tools.getInstance().ChangeUIShow(User.getInstance().GetGameMoney());
        this.updateHeadInfo();
    }

    //更新头像
    this.updateHeadInfo = function(){
        this.head1.skin = "common/head/headIcon"+ User.getInstance().GetHeadIconID()+".png";
        var shiwan = this.head1.getChildByName('iconShiwan');
        if(shiwan){
            shiwan.visible = GameData.getInstance().bLoginDemo;
        }
    }
    this.initSetting = function(){
        this.setingPanel = new SetingView();
        this.addChild( this.setingPanel );
        this.setingPanel.Init({obj:this,callback:this.onSettingPanelClose});
        // this.setingPanel.visible = false;
        this.setingPanel.Hide();
    }
    this.onSetingBtn = function()
    {
        if(this.setingPanel.visible){
            this.setingPanel.Hide();
        }
        else{
            this.setingPanel.Show();
        }
    }

    this.onSettingPanelClose = function()
    {
        this.setingBtn.onMouseOut();
    }

    this.onBackBtn = function()
    {
        GateSocketClient.getInstance().CG_LEAVE_GAME_REQ(GameData.getInstance().curGameType);            
    }

    /**
     * 释放
     */
    this.gc = function()
    {
        MessageCallbackPro.removeCallbackFunc( EventType.Type.chat,this);
        this.removeListener();
        TaskDelayManager.getInstance().clearTarget(this);     
        Notice.getInstance().ReleaseUiNotice(); 
        Tween.clearAll(this.bgHallGuang);
        this.star.gc();
        this.star2.gc();
        this.star3.gc();
    }

    //获取到房间列表
    this.onGateLstAck = function()
    {
        ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.GAMEHALL ,resList:PreLoadList.getInstance().gameHall});
    }

    //玩法说明
    this.onPlayExplainBtn = function()
    {
        if( this.PlayExplainPanel == null )
        {
            this.PlayExplainPanel = new HowToPlayView();
            this.addChild( this.PlayExplainPanel );
            this.PlayExplainPanel.init();
            this.PlayExplainPanel.visible = true;
        }else
        {
            this.PlayExplainPanel.show();
        }
    }
}