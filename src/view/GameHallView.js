/**
 * huangandfly 2016 07 03
 * 游戏大厅
 */

function GameHallView()
{
    GameHallView.super(this);
    
    BasePageView.call(this);
    for(var i in BasePageView.prototype){
        GameHallView.prototype[i] = BasePageView.prototype[i];
    }

    this.chatPanel = null;
    this.setingPanel = null;    
	
	this.Init = function(dataInit){
        BasePageView.prototype.Init.call(this,dataInit);
        this.addListener();
        this.updateUserMoney();
        this.initRank();
        this.initChatList();
        Notice.getInstance().InitUiNotice(this.boxNotice);
        this.num = 0;
        this.initCampaign();
        this.initJackpot();
        this.initEffect();
        this.initPeopleOnline();
        EmailManager.getInstance().onDataChanged();
        this.looMethod();
        GameData.getInstance().curGameType = null;
        // if(URLParamParse.getInstance().IsPlatform()){
        //     if(GameData.getInstance().bFirstLogin){
        //         SoundTool.getInstance().CheckAndPlayBgMusic();
        //         GameData.getInstance().bFirstLogin = false;
        //         GateSocketClient.getInstance().connect();
        //     }
        // }
        this.gmBtn.visible = GM_OPEN;
        this.initGameIcon();
        this.initChat();
        this.initSetting();
	}
    //初始化图标
    this.initGameIcon = function(){
        this.lstGameIcon.itemRender = BaseGameIcon;
        this.lstGameIcon.vScrollBarSkin = "";
        this.lstGameIcon.renderHandler = new Handler(this, this.updateItem);

        this.updateGameIcon();
    }
    //更新游戏列表
    this.updateGameIcon = function(){
        for(var i in GameData.getInstance().games){
            var game = GameData.getInstance().games[i];
            for(var j in GameList){
                if(game.name == GameList[j].name){
                    GameList[j].state = game.state;
                    break;
                }
            }            
        }        
		this.lstGameIcon.array = GameList;
    }
    
    this.updateItem = function(item,index){
        item.Init(item.dataSource.name,item.dataSource.state);
    }
    //初始化排行榜
    this.initRank = function(){
        this._boxRank = this.getChildByName('boxRank');
        this._uiListRank = this._boxRank.getChildByName('lstRank');
        this._btnRank = this._boxRank.getChildByName('btnClick');
        this._boxMy = this._boxRank.getChildByName('boxMy');
        this._btnRank.on(Event.CLICK,this, this.toCloseRank);
        this._uiListRank.vScrollBarSkin = "";
        this._uiListRank.renderHandler = new Handler(this, this.updateRankList);
        this.initRankItem([]);

        this.rankBtn.on(Event.CLICK,this,this.onDisRankBtn);
        var e = {target:this.rankBtn};
        this.onDisRankBtn(e);
        this.rankBtn.getChildByName('btnIcon').skin = 'common/paihang_offDown.png';
        this.rankBtn.getChildByName('lblCheck').color = GameData.getInstance().COLOR.YELLOW;
        this._boxRank.visible = GameData.getInstance().bOpenRank;
        this.rankBtn.visible = GameData.getInstance().bOpenRank;
    }
    //初始化背景效果
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

    //初始化聊天列表
    this.initChatList = function()
    {
        this.chatMsgScroll = new ChatSmallView();
        this.chatMsgScroll.init();
        this.chatMsgScroll.x = 0;
        this.chatMsgScroll.y = this.height - this.chatMsgScroll.height -32;
        this.addChild(this.chatMsgScroll);
        this.chatMsgScroll.on(Event.CLICK,this,this.onChatBtn);
    }
    this.initCampaign = function(){
        // this.campaignPanel = new CampaignView();
        // this.addChild( this.campaignPanel );
        // this.campaignPanel.x = 1196;
        // this.campaignPanel.y = 27;
        // this.campaignPanel.Init({parent:this,callback:this.onCampaignPanelClose});
        // this.campaignPanel.Hide();
    }
    //初始化彩金
    this.initJackpot = function(){
        var jack = new JackpotView();
        jack.x = 133;
        jack.y = -5;
        this.addChild(jack);
        jack.Init();
    }
    //初始化在线人数
    this.initPeopleOnline = function(){
        var num = PeopleOnline.getInstance().GetCurTotalNum();
        this.updateUserCount(num);
    }
    
    this.gc = function()
    {
        this.removeListener();
        MessageCallbackPro.removeCallbackFunc( EventType.Type.chat,this);
        TaskDelayManager.getInstance().clearTarget(this);
        Notice.getInstance().ReleaseUiNotice();
        Tween.clearAll(this.bgHallGuang);
        Tween.clearAll(this._boxRank);
        this.star.gc();
        this.star2.gc();
        this.star3.gc();
    }
    //隔一段时间执行一次
    this.looMethod = function(){
        GateSocketClient.getInstance().CG_GET_GAME_LIST_REQ();
        if(!GameData.getInstance().bLoginDemo && GameData.getInstance().bOpenRank){
            GateSocketClient.getInstance().CG_GET_WEEK_RANK_REQ(0,9);
            GateSocketClient.getInstance().CG_GET_MY_WEEK_RANK_REQ();
        }    
    }
    
    this.removeListener = function()
    {
        this.chatBtn.off(Event.CLICK,this, this.onChatBtn);
        this.backBtn.off(Event.CLICK,this, this.onBackBtn);
        this.campaignBtn.off( Event.CLICK,this,this.onCampaignBtn );
        this.setingBtn.off(Event.CLICK,this, this.onSetingBtn);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerMoneyChanged,this.updateUserMoney,this);   
        MessageCallbackPro.removeCallbackFunc( EventType.Type.updateUserCount,this.updateUserCount,this);  
        MessageCallbackPro.removeCallbackFunc( EventType.Type.redPointUpdate,this.onRedPointUpdate,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.getWeekRank,this.onWeekRank,this);  
        MessageCallbackPro.removeCallbackFunc( EventType.Type.getMyWeekRank,this.onMyWeekRank,this);  
        MessageCallbackPro.removeCallbackFunc( EventType.Type.gateLstAck,this.onGateLstAck,this );
        MessageCallbackPro.removeCallbackFunc( EventType.Type.headInfoEvent,this.updateHeadInfo,this );
        MessageCallbackPro.removeCallbackFunc( EventType.Type.gateRegisterAck,this.onGateRegister,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.gmCommond,this.onGMCommond,this );
        Laya.timer.clear(this,this.looMethod);
        PeopleOnline.getInstance().UnLoopTotalUserCountReq();
        JackpotMgr.getInstance().UnLoopJackpotReq();
    }
    
    this.addListener = function()
    {
        this.chatBtn.on(Event.CLICK,this, this.onChatBtn);
        this.backBtn.on(Event.CLICK,this, this.onBackBtn);
        this.setingBtn.on(Event.CLICK,this, this.onSetingBtn);
        this.campaignBtn.on( Event.CLICK,this,this.onCampaignBtn );
        this.gmBtn.on(Event.CLICK,this,this.onGMClick);
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerMoneyChanged,this.updateUserMoney,this); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.updateUserCount,this.updateUserCount,this); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.redPointUpdate,this.onRedPointUpdate,this); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.getWeekRank,this.onWeekRank,this); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.getMyWeekRank,this.onMyWeekRank,this); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.gateLstAck,this.onGateLstAck,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.headInfoEvent,this.updateHeadInfo,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.gateRegisterAck,this.onGateRegister,this);
        MessageCallbackPro.addCallbackFunc( EventType.Type.gmCommond,this.onGMCommond,this );

        //每隔一段时间请求一次在线人数
        Laya.timer.loop(30000,this,this.looMethod);
        PeopleOnline.getInstance().LoopTotalUserCountReq();
        JackpotMgr.getInstance().LoopJackpotReq();
        //活动暂时不开放
        this.campaignBtn.visible = false;
    }
    //当gate链接成功
    this.onGateRegister = function(){
        if(!GameData.getInstance().bLoginDemo){
            GateSocketClient.getInstance().CG_GET_WEEK_RANK_REQ(0,9);
            GateSocketClient.getInstance().CG_GET_MY_WEEK_RANK_REQ();
        }
        CLog.log("gate connected.... then  update  name:"+User.getInstance().GetName());
        this.initPeopleOnline();
        this.updateName();
    }
     //用户余额发生变化
    this.updateUserMoney = function(){
        if(!this.labelUserMoney) return;
        this.updateName();
        this.labelUserMoney.text = '￥'+Tools.getInstance().ChangeUIShow(User.getInstance().GetGameMoney());
        this.updateHeadInfo();
    }
    this.updateName = function(){
        if(!this.lblName) return;
        this.lblName.text =  Tools.getInstance().GetLocalPlayerUIName();
    }
    //更新头像
    this.updateHeadInfo = function(){
        this.head1.skin = "common/head/headIcon"+ User.getInstance().GetHeadIconID()+".png";
        var shiwan = this.head1.getChildByName('iconShiwan');
        if(shiwan){
            shiwan.visible = GameData.getInstance().bLoginDemo;
        }
    }

    //用户在线人数发生变化
    this.updateUserCount = function(count){
        count = parseInt(count)>0 ? count : "获取中..";
        this.onlineNum.text = count;
    }
    //排行榜信息
    this.onWeekRank = function(content){
        if(!content.rankInfo) return;
        this.initRankItem(content.rankInfo);
    }
    //游戏列表信息
    this.onGateLstAck = function(content){
        //this.initGameIcon();
        this.updateGameIcon();
    }
    //自己的排行信息
    this.onMyWeekRank = function(content){
        var txtMyRank = this._boxMy.getChildByName("txtMyRank");
        txtMyRank.text = content.selfRank + ".";
        var txtMoney = this._boxMy.getChildByName("money");
        //txtMoney.text = Tools.getInstance().ChangeUIShow(content.selfWinMoney);
        txtMoney.text = parseInt(parseInt(content.selfWinMoney) / 100);
        var txtMyName = this._boxMy.getChildByName('txtMyName');
        txtMyName.text = Tools.getInstance().GetLocalPlayerUIName();
        this._boxMy.visible = content.selfRank <= 10 ? false : true; 
    }
    this.onDisRankBtn = function(e){
        if(!this._btnRank) return;
        var open = this._boxRank.x == 1260;
        var pX = open ? 1550 : 1260;        
        this._btnRank.getChildByName('btnIcon').scaleY = -this._btnRank.getChildByName('btnIcon').scaleY;
        Tween.to(this._boxRank,{x:pX},200);//Ease['elasticOut']
    }
    //GM开启
    this.onGMCommond = function(commond){
        this.gmBtn.visible = commond == "open";
    }
    //点击GM按钮
    this.onGMClick = function(e){
        if(!this.GMView){
            this.GMView = new GMDialog();
        }
        this.GMView.Show(GateSocketClient.getInstance(),GateSocketClient.getInstance().CG_GMORDER_REQ);
    }
    this.toCloseRank = function(){
        this.onDisRankBtn();
        this.rankBtn.getChildByName('btnIcon').skin = 'common/paihang_off.png';
        this.rankBtn.getChildByName('lblCheck').color = GameData.getInstance().COLOR.GRAY;
    }
    this.initRankItem = function(dataList){
        var arr = [];
        if(!this._uiListRank) return;
        for(var i=0;i < dataList.length;i++){   
            var len = dataList[i].userName.length;
            var playerName = dataList[i].userName;
            playerName = (len < 3) ? playerName : playerName.substring(len - 3,len);
            playerName = Tools.getInstance().GetPlayerName(playerName);          
            arr.push({txtName:playerName,txtMoney:parseInt(parseInt(dataList[i].winMoney) / 100)});
        }
        this._uiListRank.array = arr;
    }
    this.updateRankList = function(item,index){
        var dataSource = item.dataSource;
        if(dataSource == null) return;
        var num = parseInt(index) + 1;
        var txtNum = item.getChildByName('txtNum');
        var txtName = item.getChildByName('txtName');
        var txtMoney = item.getChildByName('txtMoney');
        var imgMe = item.getChildByName('imgMe');
        txtNum.text = num + ".";
        if(num <= 3){
            txtNum.color = num == 1 ? '#ffda5b' : num == 2 ? '#7d8bdb' : '#9e5215';
            txtName.color =  num == 1 ? '#ffda5b' : num == 2 ? '#7d8bdb' : '#9e5215' ;
            txtMoney.color = num == 1 ? '#ffda5b' : num == 2 ? '#7d8bdb' : '#9e5215';
        }
        imgMe.visible = dataSource.txtName == Tools.getInstance().GetLocalPlayerUIName();
    }

    //红点变化
    this.onRedPointUpdate = function(data){
        //if(data.type != GameData.getInstance().redPointType.MAIL) return;
        var label = this.boxRedP.getChildByName('lbRedP');
        if(!label) return;
        label.text = data.num;
        this.boxRedP.visible = data.num != 0;
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
    this.onChatBtn = function(e)
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
    this.onChatPanelClose = function(){
        this.chatMsgScroll.setLock(false); 
        this.chatBtn.onMouseOut();
    }
    this.onBackBtn = function()
    {
        Notice.getInstance().Clear();
        GateSocketClient.getInstance().close();
        if(!URLParamParse.getInstance().IsPlatform()) return;
        if(Browser.onPC){
            window.opener = window;
			var win = window.open("","_self");
			win.close();
			//frame的时候
			top.close();
        }
        else if(document.referrer){
            location.href = document.referrer;
        }
    }
    this.initSetting = function(){
        this.setingPanel = new SetingView();
        this.addChild( this.setingPanel );
        this.setingPanel.Init({obj:this,callback:this.onSettingPanelClose});
        this.setingPanel.visible = false;
    }
    this.onSetingBtn = function(e)
    {
        if(this.setingPanel.visible){
            this.setingPanel.Hide();
        }
        else{
            this.setingPanel.Show();
        }
    }
    this.onSettingPanelClose = function(){
        this.setingBtn.onMouseOut();
    }
    
     //活动按钮
    this.onCampaignBtn = function(e){
        this.num = this.num + 1;
        var test =  "<span style= 'color:#FF6A6A;font-weight:bold'>简介"+this.num+"</span>";
        test += "<span style='color:#FFFFFF'>梭哈是一款扑克游戏，游戏凉快急死了都看见。</span>";
        var content = {count:-1,content:test};
        GateSocketClient.getInstance().GC_ADDTEMPNOTICE_NTF(content);

        for(var i =0;i<5;i++){
            var content = {TaskID:i,ServerType:i/2,Name:"在3局梭哈比赛中获胜",StatusDesc:'2/3',Rewards:[{TID:0,Count:2140}],Status:i};
            TaskInfoManager.getInstance().AddTask(content);
        }

        

        // var bShow = !this.campaignPanel.visible;
        // this.campaignPanel.show(bShow);
    }
    this.onCampaignPanelClose = function(){
        this.campaignBtn.onMouseOut();
    }
}

