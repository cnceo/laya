/**
 * 设置界面
 */
function SetingView()
{
    SetingView.super(this);
    BasePageView.call(this);
    for(var i in BasePageView.prototype){
        SetingView.prototype[i] = BasePageView.prototype[i];
    }

    this.tween = null;
    this.walletPanel = null;
    this.historyRecordPanel = null;
    this.taskPanel = null;
    this.AN_BEGIN = -5;//滑块的初始位置
    this.AN_END = 71;//滑块的末端位置

    this._obj = null;
    this._callback = null;
    
    this.musicEffect = true;       //游戏音效
    this.musicBg = true;           //背景音乐
    this.vibrationEffect = true;   //震动效果
    this.rollingNotice = true;     //滚动公告

    this.lstHeadNode = [];
    this.lstPosHead = [];//头像坐标
    this.indxHeadMin = 0;//头像起始索引
    this.indxHeadMax = 19;//最大索引

    this.bIsLock = false;//是否在滑动头像
    
    this.Init = function(dataInit)
    {
        this._obj = dataInit.obj;
        this._callback = dataInit.callback;
        this.getLocalConfig();
        this.backBtn.on( Event.CLICK,this,this.onBackBtn );               
        this.historyRecordBtn.on( Event.CLICK,this,this.onHistoryRecordBtn );
        this.taskBtn.on( Event.CLICK,this,this.onTaskBtnClick );
        this.mailBtn.on( Event.CLICK,this,this.onMailBtnClick );
        this.initHeadInfo();
        this.initCheckBtns();
        this.lblName.text = Tools.getInstance().GetLocalPlayerUIName();
        this.initBankView();
        this.initHistoryRecordView();
    }
    //用户余额发生变化
    this.updateUserMoney = function(){
        if(!this.lblMoney) return;
        this.lblMoney.text = "￥"+Tools.getInstance().ChangeUIShow(User.getInstance().GetGameMoney());
    }
    this.getLocalConfig = function(){
        this.musicEffect = LocalStorage.getItem("musicEffect");
        this.musicBg = LocalStorage.getItem("musicBg");
        this.vibrationEffect = LocalStorage.getItem("vibrationEffect");
        this.rollingNotice =  LocalStorage.getItem("rollingNotice");
        this.musicEffect = (this.musicEffect === "true") || (this.musicEffect == null);
        this.musicBg = (this.musicBg === "true") || (this.musicBg == null);
        this.vibrationEffect = (this.vibrationEffect === "true") || (this.vibrationEffect == null);
        this.rollingNotice = (this.rollingNotice === "true") || (this.rollingNotice == null);
        GameData.getInstance().bRollingNotice = this.rollingNotice;
    }
    //初始化头像信息
    this.initHeadInfo = function(){
        //this.panelHead.vScrollBarSkin = "";
        this.panelHead.on( Event.MOUSE_DOWN,this,this.onMouseDown );
        //this.panelHead.on( Event.MOUSE_MOVE,this,this.onMouseMove );
        this.btnUp.on( Event.CLICK,this,this.onBtnUpClick);
        this.btnDown.on( Event.CLICK,this,this.onBtnDownClick);

        this.snapY = this.head0.y - this.head1.y;
        this.head0.curIndx = this.getNextHeadId(User.getInstance().GetHeadIconID(),-1);
        this.head1.curIndx =  User.getInstance().GetHeadIconID();
        this.head2.curIndx = this.getNextHeadId(User.getInstance().GetHeadIconID(),1);
        this.head3.curIndx = this.getNextHeadId(User.getInstance().GetHeadIconID(),2);
        this.lstHeadNode.push(this.head0);
        this.lstHeadNode.push(this.head1);
        this.lstHeadNode.push(this.head2);
        this.lstHeadNode.push(this.head3);

        for(var i=0;i<4;i++){
            this.lstHeadNode[i].dataSource = {skin:"common/head/headIcon"+ this.lstHeadNode[i].curIndx+".png"};
        }

        this.lstPosHead.push(this.head0.y + this.snapY);
        this.lstPosHead.push(this.head0.y);
        this.lstPosHead.push(this.head1.y);
        this.lstPosHead.push(this.head2.y);
        this.lstPosHead.push(this.head3.y);
        this.lstPosHead.push(this.head0.y);
    }
    //获取下个头像的ID，step：步长
    this.getNextHeadId = function(curIndx,step){
        var index = curIndx + step;
        if(index < this.indxHeadMin){
            index = this.indxHeadMax;
        }
        else if(index > this.indxHeadMax){
            index = this.indxHeadMin;
        }
        return index;
    }
    this.onBtnUpClick = function(){
        this.moveToUp();
    }
    this.onBtnDownClick = function(){
        this.moveToDown();
    }
    this.moveToUp = function(){
        if(this.bIsLock) return;
        this.bIsLock = true;
        var idx = this.getNextHeadId(this.lstHeadNode[0].curIndx,-1);
        this.setItemInfo(idx);
        this.lstHeadNode[3].y = this.lstPosHead[0];
        for(var i=0;i<4;i++){
            Tween.to(this.lstHeadNode[i],{y : this.lstPosHead[i + 2]},200);
        }
        var task = new TaskDelay();
        task.callBack = this.updateUpItemsInfo;
        task.classObj = this;
        task.leftTime = 250;
        TaskDelayManager.getInstance().addTask( task );

        Laya.stage.off(Event.MOUSE_UP,this,this.onMouseUp);
        Laya.stage.off(Event.MOUSE_MOVE,this,this.onMouseMove);
    }
    
    this.moveToDown = function(){
        if(this.bIsLock) return;
        this.bIsLock = true;
        //var idx = this.lstHeadNode[2].curIndx + 1 > (this.numHeadMax - 1) ? 0 : this.lstHeadNode[2].curIndx + 1;
        var idx = this.getNextHeadId(this.lstHeadNode[2].curIndx,1);
        this.setItemInfo(idx);
        this.lstHeadNode[3].y = this.lstPosHead[4];//this.lstHeadNode[2].y - this.snapY;
        for(var i=0;i<4;i++){
            Tween.to(this.lstHeadNode[i],{y : this.lstPosHead[i]},200);
        }
        var task = new TaskDelay();
        task.callBack = this.updateDownItemsInfo;
        task.classObj = this;
        task.leftTime = 250;
        TaskDelayManager.getInstance().addTask( task );

        Laya.stage.off(Event.MOUSE_UP,this,this.onMouseUp);
        Laya.stage.off(Event.MOUSE_MOVE,this,this.onMouseMove);
    }
    this.updateUpItemsInfo = function(){
        //var idx = this.lstHeadNode[0].curIndx - 1 < 0 ? (this.numHeadMax - 1): this.lstHeadNode[0].curIndx - 1;
        var idx = this.getNextHeadId(this.lstHeadNode[0].curIndx,-1);
        var temp = this.lstHeadNode[3];
        temp.curIndx = idx;
        this.lstHeadNode[3] = this.lstHeadNode[2];
        this.lstHeadNode[2] = this.lstHeadNode[1];
        this.lstHeadNode[1] = this.lstHeadNode[0];
        this.lstHeadNode[0] = temp; 
        this.bIsLock = false;
        //this.headKuang.visible = true;        
    }
    this.updateDownItemsInfo = function(){
        // var idx = this.lstHeadNode[2].curIndx + 1 > (this.numHeadMax - 1) ? 0 : this.lstHeadNode[2].curIndx + 1;
        var idx = this.getNextHeadId(this.lstHeadNode[2].curIndx,1);
        var temp = this.lstHeadNode[3];
        temp.curIndx = idx;
        this.lstHeadNode[3] = this.lstHeadNode[0];
        this.lstHeadNode[0] = this.lstHeadNode[1];
        this.lstHeadNode[1] = this.lstHeadNode[2];
        this.lstHeadNode[2] = temp; 
        this.lstHeadNode[3].y = this.lstPosHead[4];
        this.bIsLock = false;
        //this.headKuang.visible = true;
    }
    this.setItemInfo = function(curIndx){
        var ape = this.lstHeadNode[3];        
        // 更换纹理
        ape.dataSource = {skin:"common/head/headIcon"+curIndx+".png"};
        // 设置交互区域
        // ape.width = 179;
        // ape.height = 182;
    }
    this.onMouseDown = function (e) {
        if(this.bIsLock) return;
        this.startMovePosY = Laya.stage.mouseY;
        //this.headKuang.visible = false;
        Laya.stage.on(Event.MOUSE_UP,this,this.onMouseUp);
        Laya.stage.on(Event.MOUSE_MOVE,this,this.onMouseMove );
    }
    this.onMouseMove = function (e) {
        var deltaY = Laya.stage.mouseY - this.startMovePosY;
        if(deltaY > 50){
            //CLog.log("............down");
            this.moveToDown();
        }
        else if(deltaY < -50){
            //CLog.log("............up");
            this.moveToUp();
        }
        else{
            for(var i = 0;i< 4;i++){
                this.lstHeadNode[i].y += deltaY * 0.1;
            }
        }        
    }
    this.onMouseUp = function(e){
        var deltaY = Laya.stage.mouseY - this.startMovePosY;
        this.onMouseMoveEnd(deltaY > 0);
        Laya.stage.off(Event.MOUSE_UP,this,this.onMouseUp);
        Laya.stage.off(Event.MOUSE_MOVE,this,this.onMouseMove);
    }
    this.onMouseMoveEnd = function(bDown){
        //CLog.log("...onMouseMoveEnd");
        for(var i = 0;i< 4;i++){
            Tween.to(this.lstHeadNode[i],{y : this.lstPosHead[i+1]},100);
        }
    }
    this.initCheckBtns = function() {
        this.musicEffectBtn.on(Event.CLICK, this,this.onMusicEffectBtn );
        this.musicBgBtn.on(Event.CLICK, this,this.onMusicBgBtn );
        this.vibrationEffectBtn.on(Event.CLICK, this,this.onVibrationEffectBtn);
        this.rollingNoticeBtn.on(Event.CLICK, this,this.onRollingNoticeBtn);

        this.initBtnAN(this.musicEffectBtn,this.musicEffect);
        this.initBtnAN(this.musicBgBtn,this.musicBg);
        this.initBtnAN(this.vibrationEffectBtn,this.vibrationEffect);
        this.initBtnAN(this.rollingNoticeBtn,this.rollingNotice);
    }
    this.initBtnAN = function(parentBtn,value){
        var btnNormal = parentBtn.getChildByName("btnNormal");
        var btnDown = parentBtn.getChildByName("btnDown");
        btnNormal.visible = value;
        btnDown.visible = !value;
        var btnAN = parentBtn.getChildByName("imgAN");
        var targetX = !value ? this.AN_BEGIN : this.AN_END;
        btnAN.x = targetX;
    }
    
    this.onBackBtn = function()
    {
        CLog.log("头像:"+this.lstHeadNode[1].curIndx);
        if(User.getInstance().GetHeadIconID() != this.lstHeadNode[1].curIndx){
            GateSocketClient.getInstance().CG_CHANGE_HEAD_PORTRAIT_REQ(this.lstHeadNode[1].curIndx);
        }        
        this.Hide();
        TaskDelayManager.getInstance().clearTarget(this);
    }
    this.initBankView = function(){
        //如果是在大厅
        if(Game.getInstance().currentScene instanceof GameHallView){
            this.bankBtn.visible = true;
            this.bankBtn.on( Event.CLICK,this,this.onBankBtn );
            this.boxBtns.x = 462;
            this.walletPanel = new WalletView();
            this.walletPanel.Init();
            this.addChild( this.walletPanel );
        }
        else{
            this.bankBtn.visible = false;
            this.boxBtns.x = 282;
            this.walletPanel = new ExpressBankView();
            this.addChild( this.walletPanel );
            this.walletPanel.Init(GameData.getInstance().bLoginDemo);
        }
        this.walletPanel.visible = false;
    }
    //个人银行
    this.onBankBtn = function(params)
    {
        this.walletPanel.Show();
    }
    //按钮动画效果
    this.checkBtnChange = function(parentBtn,value){
        var btnNormal = parentBtn.getChildByName("btnNormal");
        var btnDown = parentBtn.getChildByName("btnDown");
       
        var btnAN = parentBtn.getChildByName("imgAN");
        var targetX = !value ? this.AN_BEGIN : this.AN_END;
        Tween.to(btnAN,
		{
			x: targetX
		}, 60);
        var task = new TaskDelay();
        task.callBack = function(){
            btnNormal.visible = value;
            btnDown.visible = !value;
        };
        task.classObj = this;
        task.leftTime = 50;
        TaskDelayManager.getInstance().addTask( task );
    }
    //音效设置
    this.onMusicEffectBtn = function (e) {
        if(e.target == null) return;
        this.musicEffect = !this.musicEffect;
        LocalStorage.setItem("musicEffect",this.musicEffect);
        SoundManager.soundMuted = !this.musicEffect;
        this.checkBtnChange(e.target,this.musicEffect);
    }
    //背景音乐设置
    this.onMusicBgBtn = function (params) {
        if(params.target == null) return;
        this.musicBg = !this.musicBg;
        LocalStorage.setItem("musicBg",this.musicBg);
        SoundManager.musicMuted = !this.musicBg;
        GameData.getInstance().bPlayMusic = this.musicBg;
        this.checkBtnChange(params.target,this.musicBg);
        SoundTool.getInstance().PlayHallBgMusic();
    }
    //震动设置
    this.onVibrationEffectBtn = function (params) {
        if(params.target == null) return;
        this.vibrationEffect = !this.vibrationEffect;
        LocalStorage.setItem("vibrationEffect",this.vibrationEffect);
        this.checkBtnChange(params.target,this.vibrationEffect);
    }
    //滚动公告
    this.onRollingNoticeBtn = function (params) {
        if(params.target == null) return;
        this.rollingNotice = !this.rollingNotice;
        LocalStorage.setItem("rollingNotice",this.rollingNotice);
        GameData.getInstance().bRollingNotice = this.rollingNotice;
        this.checkBtnChange(params.target,this.rollingNotice);
        Notice.getInstance().NoticeScrollUpdate();
    }
    this.initHistoryRecordView = function(){
        this.historyRecordPanel = new HistoryRecordView();
        this.historyRecordPanel.Init();
        this.addChild( this.historyRecordPanel );
        this.historyRecordPanel.visible = false;
    }
    //历史记录
    this.onHistoryRecordBtn = function(params) 
    {
        if( this.historyRecordPanel.visible ){
            this.historyRecordPanel.Hide();
        }else {
            this.historyRecordPanel.Show();
        }
    }
    //任务
    this.onTaskBtnClick = function(){
        if( !this.taskPanel )
        {
            this.taskPanel = new TaskView();
            this.taskPanel.init();
            this.addChild( this.taskPanel );            
        }
        this.taskPanel.show();
    }
    //邮件
    this.onMailBtnClick = function(){
        if( !this.eMailPanel )
        {
            this.eMailPanel = new EmailView();
            this.eMailPanel.init();
            this.addChild( this.eMailPanel );            
        }
        this.eMailPanel.show();
    }
    
    this.Show = function()
    {
        BasePageView.prototype.Show.call(this);
        GateSocketClient.getInstance().CG_GET_MONEY_REQ();
        if(!GameData.getInstance().bLoginDemo){
            GateSocketClient.getInstance().CG_GET_BANK_MONEY_REQ();
        }
        this.addListerner();
        this.initRedPoint();
        this.lblMoney.text = "￥"+Tools.getInstance().ChangeUIShow(User.getInstance().GetGameMoney());
        this.visible = true;
    }
    this.Hide = function(){
        this.removeListener();
        if(this._obj && this._callback){
            this._callback.call(this._obj);
        }
        this.visible = false;
    }
    this.addListerner = function(){
        MessageCallbackPro.addCallbackFunc( EventType.Type.redPointUpdate,this.onRedPointUpdate,this);
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerMoneyChanged,this.updateUserMoney,this); 
    }
    this.removeListener = function(){
        MessageCallbackPro.removeCallbackFunc( EventType.Type.redPointUpdate,this.onRedPointUpdate,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerMoneyChanged,this.updateUserMoney,this);  
    }
    this.initRedPoint = function(){
        var numMail = EmailManager.getInstance().getRedPNum();
        var boxMailRedP = this.mailBtn.getChildByName('boxMailRedP');
        var label = boxMailRedP.getChildByName('lbMailRedP');
        if(!label) return;
        label.text = numMail;
        boxMailRedP.visible = numMail != 0;
    }
    //红点变化
    this.onRedPointUpdate = function(data){
        if(data.type == GameData.getInstance().redPointType.MAIL){
            var boxMailRedP = this.mailBtn.getChildByName('boxMailRedP');
            var label = boxMailRedP.getChildByName('lbMailRedP');
            if(!label) return;
            label.text = data.num;
            boxMailRedP.visible = data.num != 0;
        }        
    }
    this.destroy = function(){
        this.__proto__.destroy();
        this.removeListener();
    }
}

