var Event   = laya.events.Event;
/**
 * 登录界面
 */
function LoginView()
{
	LoginView.super(this);
	BasePageView.call(this);
    for(var i in BasePageView.prototype){
        LoginView.prototype[i] = BasePageView.prototype[i];
    }
	this.arrsAddress = [];
	

	this.Init = function(data)
	{	
		BasePageView.prototype.Init.call(this,data);
		Laya.stage.size(1620,900);
		MessageCallbackPro.addCallbackFunc( EventType.Type.socketLoginConnect,this.onWebSocketConnected,this );
		MessageCallbackPro.addCallbackFunc( EventType.Type.gateLstAck,this.onGateConnected,this );
		this.initBtns();
		SoundTool.getInstance().CheckAndPlayBgMusic();
		this.checkParam();
		this.initCombBox();
		this.initLight();
		this.initStar();
	}	
	
	this.initBtns = function(){
		this.loginBtn.visible = false;
		this.UserName.visible = false;
		this.Password.visible = false;
		this.informalBtn.visible = false;
	}
	//当输入框失去焦点时
	this.onBlur = function(){		
		if(laya.utils.Browser.onIOS){
			SoundTool.getInstance().CheckAndPlayBgMusic();
		}
	}
	this.initCombBox = function()
	{
		var labels = "";
		var addrList = GameData.getInstance().loginAddressList;
		for(var i in addrList){
			labels += i + ",";
			this.arrsAddress.push(addrList[i]);
		}
		labels = labels.substring(0,labels.length -1);
		this.listAddressBox.labels = labels;
		this.listAddressBox.labelColors = "#000000,#000000,#000000,#C0C0C0";
		//this.listAddressBox.selectHandler = new Handler(this,this.onSelectCombBox);
		var index = 0;
		for(var j in addrList){
			if(addrList[j] == GameData.getInstance().curLoginAddress){
				this.listAddressBox.selectedIndex = index;
				break;
			}
			index++;
		}		
		if(!URLParamParse.getInstance().IsTest()){
			this.listAddressBox.visible = false;
			this.ip.visible = false;
		}
	}
	this.initLight = function(){
		this.timeLine0 = new Laya.TimeLine();
		this.timeLine0.addLabel("turnRight0",0).to(this.imgLight0,{rotation:75, scaleX:0.7, scaleY:0.7,alpha:0.5},2000,null,1000)
				.addLabel("turnLeft0",0).to(this.imgLight0,{rotation:35, scaleX:1, scaleY:1, alpha:1},2000,null,0)
		this.timeLine0.play(0,true);

		this.timeLine1 = new Laya.TimeLine();
		this.timeLine1.addLabel("turnRight1",0).to(this.imgLight1,{rotation:65, alpha:0.5},2500,null,0)
				.addLabel("turnLeft1",0).to(this.imgLight1,{rotation:55, alpha:1},2800,null,0)
		this.timeLine1.play(0,true);

		this.timeLine2 = new Laya.TimeLine();
		this.timeLine2.addLabel("turnRight2",0).to(this.imgLight2,{rotation:55},2000,null,0)
				.addLabel("turnLeft2",0).to(this.imgLight2,{rotation:78},3000,null,0)
		this.timeLine2.play(0,true);

		this.timeLine3 = new Laya.TimeLine();
		this.timeLine3.addLabel("turnRight3",0).to(this.imgLight3,{rotation:160, alpha:0.6},1000,null,0)
				.addLabel("turnLeft3",0).to(this.imgLight3,{rotation:130,  alpha:1},1500,null,0)
		this.timeLine3.play(0,true);

		this.timeLine4 = new Laya.TimeLine();
		this.timeLine4.addLabel("turnRight4",0).to(this.imgLight4,{rotation:120,alpha:0.7},2000,null,0)
				.addLabel("turnLeft4",0).to(this.imgLight4,{rotation:100,alpha:1},2400,null,0)
		this.timeLine4.play(0,true);
	}
	this.initStar = function(){
		this.star0 = new Star();
		this.star0.width   = 80;//最左
        this.star0.height  = 78;
        this.star0.init( 0 );
        this.star0.x = 417;
        this.star0.y = 590;        
       this.addChild(this.star0);

		this.star1 = new Star();
		this.star1.width   = 50;//脚
        this.star1.height  = 48;
        this.star1.init( 0 );
        this.star1.x = 975;
        this.star1.y = 125;        
        this.addChild(this.star1);

		this.star2 = new Star();
		this.star2.width   = 90;
        this.star2.height  = 88;
        this.star2.init( 0 );
		this.star2.speed = 0.025;
        this.star2.x = 1130;//右下角
        this.star2.y = 775;
        
        this.addChild(this.star2);
		
		this.star3 = new Star();
		this.star3.width   = 100;//左下角
        this.star3.height  = 98;
        this.star3.init( 0 );
		this.star3.speed = 0.02;
        this.star3.x = 510;
        this.star3.y = 775;        
        this.addChild(this.star3);

		this.star4 = new Star();
		this.star4.width   = 70;//酒杯
        this.star4.height  = 70;
        this.star4.init( 0 );
        this.star4.x = 620;
        this.star4.y = 215;        
        this.addChild(this.star4);

		this.star5 = new Star();
		this.star5.width   = 100;//酒杯下方
        this.star5.height  = 98;
		this.star5.speed = 0.015;
        this.star5.init( 0 );
        this.star5.x = 600;
        this.star5.y = 338;
        
        this.addChild(this.star5);
	}
	this.registerBtn = function(){
		this.loginBtn.visible = true;
		this.UserName.visible = true;
		this.Password.visible = true;
		this.informalBtn.visible = true;
		this.loginBtn.on( Event.CLICK,this, this.onLoginBtn);
		this.UserName.on( Event.BLUR,this,this.onBlur);
		this.Password.on( Event.BLUR,this,this.onBlur);
		this.informalBtn.on(Event.CLICK,this,this.onInformlBtnClick);
		this.UserName.text = User.getInstance().GetName();
	}
	this.closeWin = function() {
		try {
			// window.opener = null;
			// window.open("", "_self");
			// window.close();
			window.opener = window;
			var win = window.open("","_self");
			win.close();
			//frame的时候
			top.close();
		} 
		catch (e) {
		}
	}
	//尝试重连
	this.tryReconnect = function(){
		this.reConnectBtn.visible = false;
		GateSocketClient.getInstance().connect();
	}
	this.checkParam = function(){
		this.forceBg.visible = false;
		if( URLParamParse.getInstance().IsLocal() ){
			this.registerBtn();
			return;
		}
		//如果强制返回平台
		if(GameData.getInstance().bForceToPlatform){
			this.forceBg.visible = true;
			var t = 10;
			var self = this;
			self.forceBg.getChildByName('txt').text = t;
			self.reConnectBtn.on(Event.CLICK,this,this.tryReconnect);
			Laya.timer.loop(1000,self,function(){
				t--;
				self.forceBg.getChildByName('txt').text = t;
				if( t<= 0){
					Laya.timer.clearAll(self);
					// var userAgent = navigator.userAgent;
					// //这两种浏览器无法直接关闭页面
					// if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Chrome") !=-1) {
					// 	//window.location.href="about:blank";
					// } else {
					// 	window.opener = null;
					// 	window.open("", "_self");
					// 	window.close();
					// }
					self.closeWin();
				}				
			});
		}
	}
	this.gc = function()
    {
		this.loginBtn.off( Event.CLICK,this, this.onLoginBtn);
		Laya.timer.clearAll(this);
		this.timeLine0.destroy();
		this.timeLine1.destroy();
		this.timeLine2.destroy();
		this.timeLine3.destroy();
		this.timeLine4.destroy();
		this.star0.gc();
        this.star1.gc();
        this.star2.gc();
		this.star3.gc();
        this.star4.gc();
        this.star5.gc();
		MessageCallbackPro.removeCallbackFunc( EventType.Type.socketLoginConnect,this.onWebSocketConnected );
		MessageCallbackPro.removeCallbackFunc( EventType.Type.gateLstAck,this.onGateConnected );
    }
	//longin服务器链接成功
	this.onWebSocketConnected = function(connected) 
	{
		this.loginBtn.disabled = false;
		if(!connected) return;
		//平台流程
		if( window.location.search != '' && !URLParamParse.getInstance().IsLocal())
		{
			if(GameData.getInstance().bLoginDemo){
				LoginSocketClient.getInstance().CL_LOGIN_DEMO_REQ();
			}
			else{
				CLog.log("---- something error ----");
			}
		}else
		{
			if(GameData.getInstance().bLoginDemo){
				LoginSocketClient.getInstance().CL_LOGIN_DEMO_REQ();
			}
			else{
				if(!this.inputCheck()) return;
				var userName = this.UserName.text;
				var password = this.Password.text;
				User.getInstance().SetName(userName);
				LoginSocketClient.getInstance().CL_LOGIN_REQ(userName,password);
			}
		}
	}
	//输入检查
	this.inputCheck = function(){
		if( this.UserName.text == this.UserName.prompt || this.UserName.text == '' ){
			new HintMessage('请输入您的用户名！');
			return false;
		}

		if( this.Password.text == this.Password.prompt || this.Password.text == '' ){
			new HintMessage('请输入您的密码！');
			return false;
		}
		return true;
	}

	this.onGateConnected = function(evt) 
	{		
		ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.GAMEHALL ,resList:PreLoadList.getInstance().gameHall});
	}

	this.onLoginBtn = function(e)
	{
		if(!this.inputCheck()) return;
		this.loginBtn.disabled = true;
		if(URLParamParse.getInstance().IsLocal()){
			var curSelectedIndex = this.listAddressBox ? this.listAddressBox.selectedIndex : 0;
			GameData.getInstance().curLoginAddress = this.arrsAddress[curSelectedIndex];
		}
		
		if(this.ip && this.ip.text){
			GameData.getInstance().curLoginAddress = "ws://" + this.ip.text + ":15000/LoginServer/Login/ClientEntry";
		}
		GameData.getInstance().bLoginDemo = false;
		LoginSocketClient.getInstance().connect();
	}
	//点击试玩
	this.onInformlBtnClick = function(e){

		if(URLParamParse.getInstance().IsLocal()){
			var curSelectedIndex = this.listAddressBox ? this.listAddressBox.selectedIndex : 0;
			//var addr = this.arrsAddress[curSelectedIndex].split("1500")[0];
			//GameData.getInstance().curLoginAddress = addr + "16000/ClientGateServer/ClientGate/ClientEntry";
			GameData.getInstance().curLoginAddress = this.arrsAddress[curSelectedIndex];
		}
		
		if(this.ip && this.ip.text){
			GameData.getInstance().curLoginAddress = "ws://" + this.ip.text + ":15000/LoginServer/Login/ClientEntry";
		}
		GameData.getInstance().bLoginDemo = true;
		LoginSocketClient.getInstance().connect();
	}
}