//var MessageCallBackPro = MessageCallbackPro;

var LoginSocketClient = (function()
{
    function _LoginSocketClient()
    {
        this.name = '_LoginSocketClient';
    }
    
    var _proto = _LoginSocketClient.prototype;
    _proto.HEART_DELTA = 60000;//心跳检查时间 1min
    var wsSocket = null; 
    
    _proto.connect = function ()
    {
        this.heartTimes = 0;
        var socket = WebSocket || window.WebSocket || window.MozWebSocket;
        if(!socket){
            var hit = new HintMessage('当前浏览器不支持WebSocket!请先升级您的浏览器:');
            hit = null;
            return;
        }
        if(!GameData.getInstance().curLoginAddress) {
            var hit = new HintMessage('error      loginAddress is null');
            hit = null;
            return;
        }
        
        wsSocket = new WebSocket(GameData.getInstance().curLoginAddress + "?ran=" + Math.random());
        //连接建立
        var self = this;
        this.lockUI("正在连接登陆服务器...");
        
        wsSocket.onopen = function(evt){
            //只有平台登陆过来的试玩用户或者非平台用户才会登陆login服务器，否则直接登陆gate
            if(URLParamParse.getInstance().IsPlatform() && GameData.getInstance().bLoginDemo){
                //平台登陆过来的试玩用户
				self.CL_LOGIN_DEMO_REQ();
			}
            else{
                MessageCallbackPro.messageEmit(EventType.Type.socketLoginConnect,true);
            }
            self.heartTime = new Date().getTime();
            Laya.timer.loop(self.HEART_DELTA,self,self.heartTest);
            self.unLockUI();
        };
        wsSocket.onerror = function(evt){
            new HintMessage("连接失败");
            LoginSocketClient.getInstance().unLockUI();
        };
        wsSocket.onmessage = function(evt)
        {
            try{                
                var data = evt.data;
                data = JSON.parse(data);
                var proID = data.proID;

                var errorCode = data.content.errorCode;
                if(!self.errorCheck(errorCode,data.content.errorMsg)){
                    self.unLockUI();
                    CLog.log("errorCheck failed ....  proID:"+proID);
                    return ;
                }
                if(!wsSocket) return;
                if( wsSocket.readyState == WebSocket.CLOSING || wsSocket.readyState == WebSocket.CLOSED )
                {
                    CLog.log("error wsSocket.readyState = " + wsSocket.readyState);
                    wsSocket = null;
                    return;
                }
                if( (typeof self[proID] === "function") )
                {
                    self[proID](data.content);
                }
            }
            catch (e){
                var hit = new HintMessage('login :'+e);
                hit = null;
            }

        };
        wsSocket.onclose = function(evt)
        {
            Laya.timer.clear(self,self.heartTest);
            if(!wsSocket) return;
            wsSocket.needShowLoading = false;
            MessageCallbackPro.messageEmit(EventType.Type.socketLoginConnect,false);
            self.unLockUI();
            if(evt.code != 1000){
                new TipsMessage('连接已关闭',false,false,2000,'loginLoadingTag');
            }        
            CLog.log("login Clint  onClose.....");     
            wsSocket = null;
        };
    };
     _proto.lockUI = function(strMsg){
        var tip = strMsg || '请求中...';
        Game.getInstance().MaskLayer.Show({message:tip, showLoading:true});
    }
    _proto.unLockUI = function(){
        Game.getInstance().MaskLayer.Hide();
    }
    _proto.sendMsg = function(jsonData,waitingKey)
    {
        if (wsSocket.readyState !== 1) {
            wsSocket.close();
            CLog.error("wsSocket");
			return;
        }
        wsSocket.send(jsonData);
        CLog.log(jsonData);
        if(waitingKey) this.lockUI();
    };
    _proto.close = function()
    {
        if(wsSocket){
            wsSocket.close();
        }
    };
    _proto.errorCheck = function(errorCode,errorMsg){
        //Game.getInstance().TipLayer.destroyChildren();
        var strMsg = "";
        if(errorMsg && (errorMsg != "")){
            strMsg = errorMsg;
            new HintMessage( strMsg );
            return false;
        }
        else if((errorCode != undefined) && (errorCode != "0") && (errorCode != "10001")){
            CLog.log("LoginClint failed.. code:" + errorCode  +"errorMsg:" + errorMsg);
            if(LoginClientErrorCode.protocol[errorCode]){
                strMsg = LoginClientErrorCode.protocol[errorCode];
            }
            else{
                strMsg = "未知错误,errorCode:"+errorCode;
            } 
            var hit = new HintMessage( strMsg );
            CLog.log("???????????    "+" strMsg:"+strMsg+"   errorCode:"+errorCode)
            return false;
        }
        return true;
    };
        //网络状态检查
    _proto.webSocketStateCheck = function(){
        if(!wsSocket)return;
        var opened = wsSocket.readyState === WebSocket.OPEN;
        if(!opened){
            CLog.log("webSocket not open!!!!");
        }
        return  opened;
    };
    //登录
    _proto.CL_LOGIN_REQ = function(userName,password){
        if(!this.webSocketStateCheck()){return;}
        //CLog.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<CL_LOGIN_REQ<<<<");
        var jsonData = NetManager.LoginMgr.login(userName,password);
        this.sendMsg(jsonData,"LC_LOGIN_ACK");
    };
    _proto.LC_LOGIN_ACK = function(content){
        if(!content)return;
        
        //var userID = content.userID;
        //PlayerManager.getInstance().me.setId(userID);
        CLog.log('============this.LC_LOGIN_ACK' + content.userID);
        User.getInstance().SetUserID(content.userID);
        User.getInstance().SetTokenID(content.tokenID);
        this.CL_GETClIENTGATE_REQ();
    };
    //登陆Login服务器，试玩请求
    _proto.CL_LOGIN_DEMO_REQ = function () {
        CLog.log("login Clint  LOGIN_DEMO_REQ ....");
        var jsonData = NetManager.LoginMgr.loginDemo();
        this.sendMsg(jsonData,"LC_LOGIN_DEMO_ACK");
    };
    //登陆Login服务器，试玩回应
    _proto.LC_LOGIN_DEMO_ACK = function(content) {
        User.getInstance().SetUserID(content.userID);
        User.getInstance().SetTokenID(content.tokenID);
        User.getInstance().SetName(content.userID);
        this.CL_GETClIENTGATE_REQ();
    }
    //从平台登录
    _proto.CL_PLATFORM_LOGIN_REQ = function(userID,password)
    {
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.LoginMgr.register(userID,password);
        this.sendMsg(jsonData,"LC_PLATFORM_LOGIN_ACK");
    };
    //平台登录回馈
    _proto.LC_PLATFORM_LOGIN_ACK = function( content )
    {
        this.CL_LOGIN_REQ(content.userName,content.password);
    };
    //注册
    _proto.CL_REGISTER_REQ = function(userName,password){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.LoginMgr.register(userName,password);
        this.sendMsg(jsonData,"LC_REGISTER_ACK");
    };
    _proto.LC_REGISTER_ACK = function(content){
        //PFuns.getInstance().showTip("注册成功，请登录");
        var hit = new HintMessage('注册成功，请登录');
        hit = null;
    };
    //请求合理的ClientGate服务器地址，用于WebSocket连接
    _proto.CL_GETClIENTGATE_REQ = function () {
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.LoginMgr.getClintGate();
        this.sendMsg(jsonData,"LC_GET_ClIENTGATE_ACK");
    };
    _proto.LC_GET_CLIENT_GATE_ACK = function(content){
        //wsSocket.needShowLoading = false;
        if(!content)return;
        
        GameData.getInstance().curGateAddress = content.serverUrl+"?ran=" + Math.random();
        if(!GameData.getInstance().curGateAddress){
            var hit = new HintMessage('serverAddr is null');
            hit = null;
        }
        else {
            CLog.log('==============LC_GET_CLIENT_GATE_ACK');
            GateSocketClient.getInstance().connect();
        }
    };
    //T人，但是不断线
    _proto.LC_KICK_NTF = function(content){
        //PFuns.getInstance().showTip("帐号在其他地方登录",2);
        var hit = new HintMessage('帐号在其他地方登录');
        hit = null;
    };
    //收到服务端发来的心跳
    _proto.HEARTBEAT_REQ = function (bActive) {
        if(!this.webSocketStateCheck()){return;}
        if(bActive == true){
            //主动向服务端发送心跳
            var jsonData = NetManager.HeartBeat.req();
            this.heartTimes++;
        }
        else{
            //向服务端回应心跳
            var jsonData = NetManager.HeartBeat.ack();
        }       
        this.sendMsg(jsonData);
    };
    //主动给服务端发送心跳包时收到的回应
    _proto.HEARTBEAT_ACK = function(content) {
        this.heartTimes--;
        CLog.log("<<<<<<<<<<<< Login 收到心跳 ack  .>>>>>>>>>>>");
    }
    //客户端心跳检查
    _proto.heartTest = function(){
        //无心跳 网络断开
        if(this.heartTimes > 5){
            CLog.log("心跳检查发现断线");
            this.close();
            this.heartTimes = 0;
        }
        else{
            this.HEARTBEAT_REQ(true);
        }
    }
    
    //单例实例 
    var instance; 
    // //返回对象 
    return { 
        name: '_LoginSocketClient',
        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _LoginSocketClient(); 
            } 
            return instance; 
        } 
    }; 
 })();