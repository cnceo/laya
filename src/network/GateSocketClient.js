/**
 * 网络 huangandfly 2016 06 30
*/
//不希望被拦截的消息，在ack中处理错误
var CONST_GATE_MSG = [
    "GC_SHOWHAND_ACTION_ACK",
    "GC_CHARGE_BANK_MONEY_ACK",
    "GC_SHOWHAND_CHARGE_BANK_MONEY_ACK",
    "GC_REJOIN_SHOWHAND_ROOM_ACK",
    "GC_LOTTERY_ACK",
    "GC_GOLDENFLOWER_CHARGE_BANK_MONEY_ACK",
    "GC_REJOIN_GOLDENFLOWER_ROOM_ACK",
    "GC_GOLDENFLOWER_ACTION_ACK",
    "GC_ENTER_GAME_ACK",
    "GC_JOIN_GOLDENFLOWER_KEYROOM_ACK",
    "GC_JOIN_SHOWHAND_KEYROOM_ACK",
    "GC_IM_BACK_ACK",
    "GC_GOLDENFLOWER_IM_BACK_ACK",
    "GC_LOGIN_MANAGER_ACK",
    "GC_GET_ROOM_INFO_ACK",
    "GC_GET_GOLDENFLOWER_ROOM_INFO_ACK",
    "GC_LOGIN_DEMO_ACK",
];
var GATE_CONNECTED = false;//gate是否连接成功
var GateSocketClient = (function()
{
    function _GateSocketClient()
    {
        this.name = '_GateSocketClient';
    }
    
    var _proto = _GateSocketClient.prototype;
    _proto.HEART_DELTA = 60000;//心跳检查时间 1min
    var wsSocket = null;   
    var _reReqNum = 0;//重新消息的次数
    var _reqArr = [];//跟踪当前发送的消息
    var RESEND_NUM_MAX = 10;//重复发送请求的最大次数
    var LOOP_REQ_TIME = 2000;//重新发送请求时间间隔
    var curReReqNum = 0;
    
    _proto.GetSocket = function(){
        return wsSocket;
    }
    _proto.connect = function ()
    {
        CLog.log("gate this.connect=============:");
        this.heartTimes = 0;
        var socket = WebSocket || window.WebSocket || window.MozWebSocket;
         if(!socket){
            var hit = new HintMessage('当前浏览器不支持WebSocket!请先升级您的浏览器');
            hit = null;
         }
        if(!GameData.getInstance().curGateAddress) return;
        LoginSocketClient.getInstance().close();
        wsSocket = new WebSocket(GameData.getInstance().curGateAddress);
        wsSocket._lockArr = [];//引用计数用
        wsSocket._lockLoadingTip = null;//锁界面的loading
        // //连接建立
        var self = this;        
        self._gateLoadingTips = new TipsMessage('正在连接游戏服务器...',true,true,null,'gateLoadingTag');
        wsSocket.onopen = function(evt)
        {
            GATE_CONNECTED = true;
            CLog.log("gate clint was opened  readyState:" + wsSocket.readyState);         
            if(self._gateLoadingTips){
                self._gateLoadingTips.hide();
                self._gateLoadingTips = null;                
            }
            self.heartTime = new Date().getTime();
            Laya.timer.loop(self.HEART_DELTA,self,self.heartTest);
            if(GameData.getInstance().bLoginDemo && URLParamParse.getInstance().IsPlatform()){
                self.CG_LOGIN_DEMO_REQ();
            }
            else{
                self.CG_LOGIN_MANAGER_REQ( User.getInstance().GetUserID(), User.getInstance().GetTokenID(),'showloading');
            }
        }
        wsSocket.onerror = function(evt)
        {
            if(self._gateLoadingTips){
                self._gateLoadingTips.hide();
                self._gateLoadingTips = null;
                new TipsMessage('连接超时',false,false,3000,'gateLoadingTag');
            }    
        }
        wsSocket.onmessage = function(evt)
        {
            var data = evt.data;
            data = JSON.parse(data);
            var proID = data.proID;
            // if(proID == "GC_ENTER_GAME_ACK" ){
            //     data.content.errorCode = 10026;
            //     return;
            // }
            if(!self.errorCheck(data)){
                CLog.log("gate errorCheck failed ....  proID:"+proID);
                return ;
            }
            self.removeReq(proID);  
            self.hideLockLoading({key : proID });
            //CLog.log(JSON.stringify(data));
            if( (typeof self[proID] === "function") )
            {
                self[proID](data.content);
            }
            else if( NetManager.GameClintInstance != undefined && (typeof NetManager.GameClintInstance[proID] === "function") )
            {
                NetManager.GameClintInstance[proID](data.content); 
                
            }else if( MessageCallbackPro.find( proID ) != null )
            {
                MessageCallbackPro.messageEmit(proID,data.content);
            }
            else
            {
                //Mlog.e("未找到协议:"+proID);
                CLog.log("未找到协议:"+proID);
                // let hit = new HintMessage('ws onError :'+proID);
                // hit = null;
            }    
        }
        
        wsSocket.onclose = function(evt)
        {
            CLog.log('ws  onClose.....');
            GATE_CONNECTED = false;
            Laya.timer.clear(self,self.heartTest);
            new HintMessage('连接断开');
            if(self._gateLoadingTips){
                self._gateLoadingTips.hide();
                self._gateLoadingTips = null;                
            }
            if(this._lockLoadingTip){
                this._lockLoadingTip.hide();
                this._lockLoadingTip = null;
            }
            this._lockArr.length = 0;
            _reqArr = [];
            curReReqNum = 0;
            Notice.getInstance().Clear();
            SHRoomMgr.getInstance().Clear();
            GFRoomMgr.getInstance().Clear();
            Game.getInstance().MaskLayer.Hide();
            //ChangeScene.getInstance().loadScene(GameData.getInstance().SCENE_TYPE.LOGIN ,PreLoadList.getInstance().login);
            // //自己主动断开
            // if( GameData.getInstance().gateID === null )
            // {
            //     ChangeScene.getInstance().loadScene(GameData.getInstance().SCENE_TYPE.LOGIN ,PreLoadList.getInstance().login);
            // }else
            // {                                       
            //     self.reConnect();
            // }
            if(URLParamParse.getInstance().IsPlatform()){
                GameData.getInstance().bForceToPlatform = true;
            }
            
            var task = new TaskDelay();
            task.callBack = GateSocketClient.getInstance().toLoginView;
            task.classObj = GateSocketClient.getInstance();
            task.leftTime = 1000;
            task.forceExecute = true;
            TaskDelayManager.getInstance().addTask( task );
        }
    }
    _proto.toLoginView = function(){
        ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.LOGIN ,resList:PreLoadList.getInstance().login});
    }
    //当服务端返回说需要等待时，重新发送上一个req
    _proto.resendReq = function(proID){
        var s0 = proID.split("GC_")[1];
        if(!s0) return;
        var s1 = s0.split("_ACK")[0];
        if(!s1) return;
        var req = "CG_" + s1 + "_REQ";
        for(var i in _reqArr){
            if(_reqArr[i].method == this[req]){
                CLog.log("重新发送消息 当前次数："+_reqArr[i].num);
                if(_reqArr[i].num > RESEND_NUM_MAX){
                    GateSocketClient.getInstance().close();
                }
                else{
                    _reqArr[i].method.call(this,_reqArr[i].param);
                }                
                break;
            }
        }
    }
    //保存可能需要等待的req
    _proto.saveReq = function(method,param){
        for(var i in _reqArr){
            if(_reqArr[i].method == method) {
                _reqArr[i].num++;
                return;
            }
        }
        _reqArr.push({method:method,param:param,num:0});
    }
    _proto.removeReq = function(proID){
        var index = -1;
        var s0 = proID.split("GC_")[1];
        if(!s0) return;
        var s1 = s0.split("_ACK")[0];
        if(!s1) return;
        var req = "CG_" + s1 + "_REQ";
        for(var i in _reqArr){
            if(_reqArr[i].method == this[req]){
                index = i;
                break;
            }
        }
        if(index != -1){
            _reqArr.splice(index,1);
        }
    }
    _proto.errorCheck = function(data)
    {
        var errorCode = data.content.errorCode;
        var errorMsg = data.content.errorMsg;
        var proID = data.proID; 
        var strMsg = "";
        //不需要提示的错误ID
        if( NOT_HINT_ERROR_CODE[ errorCode ] )
        {
            return true;
        }
        //当收到服务端返回该错误，需要等待一会重新操作
        if(errorCode == "10023"){
            Laya.timer.once(1000,self,function(){
                GateSocketClient.getInstance().resendReq(proID);
            });
            return;
        }
        this.hideLockLoading({key : proID });
        if( proID == EventType.Type.GC_IM_BACK_ACK && errorCode == "10014")
        {//登录manager时候 在房间内 等请求房间信息的时候已经不在房间里面了 这个时候重新走游戏逻辑
            CLog.log("-----------errorCode == '10014'");
            this.CG_GET_GAME_LIST_REQ('showloading');
            return;
        }
        if(errorMsg && (errorMsg != "")){
            strMsg = errorMsg;
        }
        else if((errorCode != undefined) && (errorCode != "0") && (errorCode != "10001")){
            CLog.log("GateClint failed.. code:" + errorCode  +"  errorMsg:" + errorMsg);
            
            if(CommonErrorCode.protocol[errorCode]){
                strMsg = CommonErrorCode.protocol[errorCode];
                if(errorCode == 10015){
                    if(proID == "GC_GET_BANK_MONEY_ACK" 
                        || proID == "GC_SHOWHAND_CHARGE_BANK_MONEY_ACK"
                        || proID == "GC_GOLDENFLOWER_CHARGE_BANK_MONEY_ACK"){
                        strMsg += "银行功能";
                    }
                    else if(proID == "GC_CHATTING_ACK"){
                        strMsg += "聊天功能";
                    }
                }
                //服务器关闭
                // if(errorCode == 10026){
                //     new HintMessage(strMsg);
                //     Laya.timer.once(1000, GateSocketClient.getInstance(), GateSocketClient.getInstance().close);
                //     return false;
                // }
            }
            else if(ClientGateErrorCode.protocol[errorCode]){
                strMsg = ClientGateErrorCode.protocol[errorCode];
            }
            else if(ManagerClientErrorCode.protocol[errorCode]){
                strMsg = ManagerClientErrorCode.protocol[errorCode];
                //账号被冻结
                if(errorCode == 40001){
                    new HintMessage(strMsg);
                    Laya.timer.once(1000, GateSocketClient.getInstance(), GateSocketClient.getInstance().close);
                    return false;
                }
            } 
            else{
                strMsg = "未知错误,errorCode:"+errorCode;
            }  
        }
        else{
            return true;
        }
        if(strMsg != ""){
            new HintMessage( strMsg );
        }
        //如果在CONST_GATE_MSG中，则消息不再拦截,需要在ack中处理
        for(var i in CONST_GATE_MSG){
            if(proID === CONST_GATE_MSG[i]){
                data.content.errorMsg = strMsg;
                return true;
            }
        }
        return false;
     };
     
    _proto.close = function(){
        if(wsSocket)
        {
            wsSocket.close();
            wsSocket = null;
        }
    };
    //心跳检查
    _proto.heartTest = function(){
        //无心跳 网络断开
        if(this.heartTimes > 5){
            CLog.log("gate心跳检查发现断线");
            new TipsMessage("检测到您与服务器断连",false,false,2000);
            this.close();
            this.heartTimes = 0;
        }
        else{
            this.HEARTBEAT_REQ(true);
        }
    }
    //重新连接
    _proto.reConnect = function()
    {
        var url = wsSocket.url;
        wsSocket = null;
        this.connect( url );                        
    };
    
    _proto.webSocketStateCheck = function(){
        if( wsSocket == null || wsSocket == undefined )
        {
            CLog.log("webSocket is null!!!!");
            return false;
        }
        var opened = wsSocket.readyState === WebSocket.OPEN;
        if(!opened){
            CLog.log("webSocket not open!!!!");
        }
        return  opened;
    };
    //参数key为协议号，delay表示延迟一段时间后显示loading,strMsg:提示信息
    _proto.showLockLoading = function(key,delay,strMsg){
        wsSocket._lockArr.push(key);
        CLog.log('showLockLoading。。。。 key:'+key+ "  cur:"+wsSocket._lockArr.length);
        var dTime = parseFloat(delay);
        if(!isNaN(dTime)  && dTime != 0){
            var taskShow = new TaskDelay();
            taskShow.callBack = this.lockUI;
            taskShow.classObj = this;
            taskShow.data = strMsg;
            taskShow.leftTime = dTime;
            TaskDelayManager.getInstance().addTask( taskShow );
        }
        else{
            this.lockUI(strMsg);
        }              
    }
    _proto.lockUI = function(strMsg){
        if(!wsSocket || wsSocket._lockArr.length == 0) return;
        // if(wsSocket._lockLoadingTip == null){
        //     var tips = strMsg || '请求中...';
        //     wsSocket._lockLoadingTip = new TipsMessage(tips,true,true,null,'lockLoadingTag');
        // }
        var tip = strMsg || '请求中...';
        Game.getInstance().MaskLayer.Show({message:tip, showLoading:true,hideBg:true});
    }
    _proto.hideLockLoading = function(param){
        if(!wsSocket) return;
        var index = -1;
        for(var i in wsSocket._lockArr){
            if(wsSocket._lockArr[i] == param.key){
                index = i;
                break;
            }
        }
        if(index == -1) return;
        wsSocket._lockArr.splice(index,1);
        CLog.log('hideLockLoading。。。。 key:'+param.key+ "  cur:"+wsSocket._lockArr.length);
        // if(wsSocket._lockLoadingTip && wsSocket._lockArr.length == 0){
        //     wsSocket._lockLoadingTip.hide();
        //     wsSocket._lockLoadingTip = null;
        //     if(param.msg != null && param.msg != undefined){
        //         new HintMessage( param.msg );
        //     }
        // }
        if(wsSocket._lockArr.length == 0){
            Game.getInstance().MaskLayer.Hide();
            if(param.msg != null && param.msg != undefined){
                new HintMessage( param.msg );
            }
        }
    }
    _proto.sendMsg = function(jsonData){
        if(!this.webSocketStateCheck()){return;}
        var bShowLoading = arguments[1] && (typeof(arguments[1]) == 'string') && (arguments[1].toLowerCase() === 'showloading');
        if(bShowLoading && arguments[2]){
           this.showLockLoading(arguments[2],arguments[3],arguments[4]);
        }
        //CLog.info(jsonData);
        wsSocket.send(jsonData);
    };
    
    // _proto.CG_LOGIN_GATE_REQ = function(){
    //         if(!this.webSocketStateCheck()){return;}
    //         var jsonData = NetManager.GateClintMgr.login();
    //         wsSocket.send(jsonData);
    //     };
       
    // _proto.GC_LOGIN_GATE_ACK = function(content){
        
    //     if( content.isReconnect !== 2 ) //2队列失效，无法重新连接
    //     {
    //         //GameData.getInstance().gateID = content.gateID;
    //         if( content.isReconnect === 0 ) //0代表连接Gate成功
    //         {
    //             var id = parseInt(Math.random() * 9999);//User.User.id;
    //             this.CG_LOGIN_MANAGER_REQ( User.getInstance().GetUserID() );
    //         }else
    //         {
    //                 //MessageBox.GetInstance().show( '重连成功' );
    //                 //NetManager.GateClintMgr.active();
    //                 this.CG_ACTIVE_REQ();
    //         }
    //     }else 
    //     {
    //             //MessageBox.GetInstance().show( '连接服务器失败' );
    //             var hit = new HintMessage( '连接服务器失败' );
    //             hit = null;
    //             //GameData.getInstance().gateID = null;
    //             this.close();
    //     }
    // };
    _proto.CG_LOGIN_DEMO_REQ = function(){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.loginDemo();
        this.saveReq(this.CG_LOGIN_DEMO_REQ,arguments);
        this.sendMsg(jsonData,'','GC_LOGIN_DEMO_ACK',800,'正在登陆游戏服务器');
        var tip = "正在登陆游戏服务器..";
        if(curReReqNum > 0) tip = "登陆失败，正在重新申请登陆游戏服务器(" + curReReqNum + ")";
        Game.getInstance().MaskLayer.Show({message:tip, showLoading:true});
    }
    _proto.GC_LOGIN_DEMO_ACK = function(content){
        if(content.errorMsg && (content.errorMsg != "")){
            if(curReReqNum > RESEND_NUM_MAX){
                this.close();
            }
            else{
                curReReqNum++;
                var task = new TaskDelay();
                task.callBack = function(){
                    GateSocketClient.getInstance().CG_LOGIN_DEMO_REQ();
                };
                task.classObj = this;
                task.leftTime = LOOP_REQ_TIME;
                TaskDelayManager.getInstance().addTask( task );
            }
        }
        else{
            User.getInstance().SetUserID(content.userID);
            User.getInstance().SetTokenID(content.tokenID);
            this.CG_LOGIN_MANAGER_REQ( User.getInstance().GetUserID(), User.getInstance().GetTokenID());
        }
         
    }
    //聊天请求
    _proto.CG_CHATTING_REQ = function(content)
    {
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.chatting( 'eWorld',content,0,null );
        this.sendMsg(jsonData,arguments[arguments.length - 1]);
    },
    
        //聊天通知
    _proto.GC_CHATTING_NTF = function(content)
    {
        Notice.getInstance().addChatInfo(content);
        MessageCallbackPro.messageEmit(EventType.Type.chat,content);
    };
    
    _proto.CG_LOGIN_MANAGER_REQ = function(userID,tokenID){
        CLog.log("客户端发送CG_LOGIN_MANAGER_REQ.....");
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.loginManager(userID,tokenID);
        this.saveReq(this.CG_LOGIN_MANAGER_REQ,arguments);
        //this.sendMsg(jsonData,arguments[arguments.length - 1],'GC_LOGIN_MANAGER_ACK',null,'正在登陆游戏服务器');        
         this.sendMsg(jsonData);
         var tip = "正在登陆游戏服务器..";
         if(curReReqNum > 0) tip = "登陆失败，正在重新申请登陆游戏服务器(" + curReReqNum + ")";
         Game.getInstance().MaskLayer.Show({message:tip, showLoading:true,hideBg:true});
    };
    
    _proto.GC_LOGIN_MANAGER_ACK = function(content){
        GameData.getInstance().iamBack = false;
        if(content.errorMsg && (content.errorMsg != "")){
            if((content.errorCode == 10025)|| (curReReqNum > RESEND_NUM_MAX)){
                if(!URLParamParse.getInstance().IsLocal()) this.close();
            }
            else{
                curReReqNum++;
                var task = new TaskDelay();
                task.callBack = function(){
                    GateSocketClient.getInstance().CG_LOGIN_MANAGER_REQ(User.getInstance().GetUserID(), User.getInstance().GetTokenID());
                };
                task.classObj = this;
                task.leftTime = LOOP_REQ_TIME;
                TaskDelayManager.getInstance().addTask( task );
            }
            return;
        }
        curReReqNum = 0;
        Game.getInstance().MaskLayer.Hide();
        if(content.userName) User.getInstance().SetName(content.userName);
        CLog.log("收到服务器GC_LOGIN_MANAGER_ACK gameType:"+content.gameType);       
        this.CG_GET_HEAD_PORTRAIT_REQ();
        this.CG_GET_ALL_MAILS_REQ();
        this.CG_GET_ALL_TASK_REQ();
        this.CG_GET_TOTAL_USER_COUNT_REQ();
        this.CG_GET_REWARDPOOL_MONEY_REQ();
        
        if(GameData.getInstance().bLoginDemo){
            User.getInstance().SetBankMoney(0);
        }
        else{
            this.CG_GET_BANK_MONEY_REQ();
        }
        var gameType = content.gameType;
        //null代表在大厅
        if(gameType === null || gameType === undefined){
            CLog.log("------------在总大厅  name:"+content.name);
            this.CG_GET_MONEY_REQ();
            this.CG_GET_GAME_LIST_REQ('showloading');
        }
        else{
            GameData.getInstance().curGameType = gameType;
            //如果不在大厅直接和游戏服务器同步
            switch(gameType){
                case GameData.getInstance().gameType.eShowhand :
                    NetManager.GameClintInstance = new ShowHandClient();
                    SHRoomMgr.getInstance().SetCurServerID(content.gameServerID);
                    //梭哈在房间内
                    if(content.inRoom && content.inRoom == 1){
                        GameData.getInstance().iamBack = true;
                        NetManager.GameClintInstance.CG_IM_BACK_REQ();
                    }
                    else{
                        //在梭哈大厅
                        this.CG_GET_MONEY_REQ();
                        this.CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ();
                    }                    
                    break;
                case GameData.getInstance().gameType.eGoldenFlower :
                    NetManager.GameClintInstance = new GoldenFlowerClient();
                    GFRoomMgr.getInstance().SetCurServerID(content.gameServerID);
                    if(content.inRoom && content.inRoom == 1){
                        GameData.getInstance().iamBack = true;
                        NetManager.GameClintInstance.CG_GOLDENFLOWER_IM_BACK_REQ();
                    }
                    else{
                        this.CG_GET_MONEY_REQ();
                        this.CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ();
                    }
                    break;
                case GameData.getInstance().gameType.eOneArmBandit :
                    NetManager.GameClintInstance = new OneAramBanditClient();
                    this.CG_GET_MONEY_REQ();
                    this.CG_OAB_ROOM_TYPE_LIST_REQ();
                    break;
                case GameData.getInstance().gameType.eFightLandlord:
                    NetManager.GameClintInstance = new FightLandlordClient();
                    FLRoomMgr.getInstance().SetCurServerID(content.gameServerID);
                    //梭哈在房间内
                    if (content.inRoom && content.inRoom == 1) {
                        GameData.getInstance().iamBack = true;
                        NetManager.GameClintInstance.CG_FIGHTLANDLORD_IM_BACK_REQ();
                    }
                    else {
                        //在梭哈大厅
                        this.CG_GET_MONEY_REQ();
                        this.CG_GET_FIGHTLANDLORD_ROOM_TYPE_LIST_REQ();
                    }
                    break;    
                default :
                    break;
            }
        }
        MessageCallbackPro.messageEmit(EventType.Type.gateRegisterAck);
    };
    
    //客户端激活请求 arg:0 LOGIN_MANAGER, 1 客户端激活 ,2 重连成功
    _proto.CG_ACTIVE_REQ = function( arg )
    {
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.active(arg);
        this.sendMsg(jsonData,arguments[arguments.length - 1]);
    }
    
    //客户端激活反馈
    _proto.GC_ACTIVE_ACK = function(content){
        CLog.log("客户端激活反馈<<<<<<<<<<<<   content.userDate:"+content.userDate+ "  content.eUserState :"+content.eUserState)
        var userDate = content.userDate;
        //if(userDate == 0)
        {   //LOGIN_MANAGER
            var curSceneType = content.eUserState;
            if((curSceneType === GameData.getInstance().sceneType.eLobby)){//在大厅的话
                CLog.log("------------------客户端激活");
                this.CG_GET_GAME_LIST_REQ('showloading');
            }
            else if(curSceneType === GameData.getInstance().sceneType.eShowhandLobby)
            {//直接进入房间列表场景
                this.CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ();
            }
            else if(curSceneType === GameData.getInstance().sceneType.ePlayingShowhand)
            {//直接进入游戏场景
                ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.SHOWHANDROOM ,resList:PreLoadList.getInstance().showhandRoom});
            }
            else{
                // SceneManager.getInstance().setCurSceneID(curSceneType);
                // SceneManager.getInstance().changeScene(curSceneType);
                CLog.log('客户端激活反馈 出现错误');
            }
        }
        // else if(userDate == 1){//客户端激活
        //     var event = new cc.EventCustom(EventType.activeAck);
        //     event.setUserData(content);
        //     cc.eventManager.dispatchEvent(event);
        // }
        // else if(userDate == 2){//重连成功
        //     var event = new cc.EventCustom(EventType.activeAck);
        //     event.setUserData(content);
        //     cc.eventManager.dispatchEvent(event);
        // }
    };
    
    //请求具体游戏服务器内容
    _proto.CG_GET_GAME_LIST_REQ = function(){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.gameLstReq();
        this.sendMsg(jsonData,arguments[arguments.length - 1],'GC_GET_GAME_LIST_ACK',800,'正在获取游戏列表');
    };
    _proto.GC_GET_GAME_LIST_ACK = function(content){
        CLog.log('=================GC_GET_GAME_LIST_ACK');
        GameData.getInstance().games = content.games;
        
        //发消息 切换场景
        MessageCallbackPro.messageEmit(EventType.Type.gateLstAck);
        
    };
    //请求进入某具体游戏服务器 
    _proto.CG_ENTER_GAME_REQ = function (entryGame,gameServerID){
        if(!this.webSocketStateCheck()){return;}
        GameData.getInstance().curGameType = entryGame;
        var jsonData = NetManager.GateClintMgr.enterGameReq(entryGame,gameServerID);
        this.saveReq(this.CG_ENTER_GAME_REQ,arguments);
        this.sendMsg(jsonData,'showloading','GC_ENTER_GAME_ACK',0,'正在申请进入游戏');
    };
    _proto.GC_ENTER_GAME_ACK = function(content){
        CLog.log("GC_ENTER_GAME_ACK....  msg:"+content.errorMsg + "  code:"+content.errorCode + "  curGameType:"+GameData.getInstance().curGameType);
        if(!content.errorMsg || (content.errorMsg == "")){
            switch(GameData.getInstance().curGameType){
                case GameData.getInstance().gameType.eShowhand :
                    SHRoomMgr.getInstance().SetCurServerID(content.gameServerID);
                    NetManager.GameClintInstance = new ShowHandClient();
                    if(SHRoomMgr.getInstance().IsJoiningKeyRoomReq()){
                        MessageCallbackPro.messageEmit(EventType.Type.enterGameSuccess,content);
                    }
                    else{
                        this.CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ();
                    }
                    break;
                case GameData.getInstance().gameType.eGoldenFlower:
                    GFRoomMgr.getInstance().SetCurServerID(content.gameServerID);
                    NetManager.GameClintInstance = new GoldenFlowerClient();
                    if(GFRoomMgr.getInstance().IsJoiningKeyRoomReq()){
                        MessageCallbackPro.messageEmit(EventType.Type.enterGameSuccess,content);
                    }
                    else{
                        this.CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ();
                    }
                    break;
				case GameData.getInstance().gameType.eOneArmBandit:
                	this.CG_OAB_ROOM_TYPE_LIST_REQ();
                	break;
                case GameData.getInstance().gameType.eFightLandlord:
                    FLRoomMgr.getInstance().SetCurServerID(content.gameServerID);
                    NetManager.GameClintInstance = new FightLandlordClient();
                    if(FLRoomMgr.getInstance().IsJoiningKeyRoomReq()){
                        MessageCallbackPro.messageEmit(EventType.Type.enterGameSuccess,content);
                    }
                    else{
                        this.CG_GET_FIGHTLANDLORD_ROOM_TYPE_LIST_REQ();
                    }
                    break; 
                default:
            }        
        }
        else{
            GameData.getInstance().curGameType = null;
        }
    };
    //manager踢掉client，并且通知clientGate也踢掉client
    _proto.GC_KICK_USER_NTF = function(content){
        // var MB = new MessageBox();
        // MB.show('帐号在其他地方登录',function()
        // { 
        //     ChangeScene.getInstance().loadScene(GameData.getInstance().SCENE_TYPE.LOGIN ,PreLoadList.getInstance().login); 
        // },
        // null,
        // this,
        // MODE.MB_OK); 
        new TipsMessage('帐号在其他地方登录..',true,false,1000);
    };

       //请求斗地主的房间归类
    _proto.CG_GET_FIGHTLANDLORD_ROOM_TYPE_LIST_REQ = function () {
        if (!this.webSocketStateCheck()) { return; }
        if (NetManager.GameClintInstance && !GameData.getInstance().bLoginDemo) {
            NetManager.GameClintInstance.CG_GET_FIGHTLANDLORD_KEYROOM_REQ();
        }
        var jsonData = NetManager.GateClintMgr.fightLandlordRoomTypeReq();
        this.sendMsg(jsonData, arguments[arguments.length - 1]);
    }
    //请求斗地主的房间归类回馈
    _proto.GC_GET_FIGHTLANDLORD_ROOM_TYPE_LIST_ACK = function (content) {
        GameData.getInstance().types = content.types;
        ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.FLROOMTYPE, resList:PreLoadList.getInstance().FLRoomType});
    };

    //请求梭哈的房间归类
    _proto.CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ = function (){
        if(!this.webSocketStateCheck()){return;}
        if(NetManager.GameClintInstance && !GameData.getInstance().bLoginDemo) {
            NetManager.GameClintInstance.CG_GET_SHOWHAND_KEYROOM_REQ();
        }
        var jsonData = NetManager.GateClintMgr.showHandRoomTypeReq();
        this.sendMsg(jsonData,'showloading','GC_GET_SHOWHAND_ROOM_TYPE_LIST_ACK',0,'正在请求房间列表');   
    };
    _proto.GC_GET_SHOWHAND_ROOM_TYPE_LIST_ACK = function(content){
        GameData.getInstance().types = content.types;
        ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.SHOWHANDROOMTYPE ,resList:PreLoadList.getInstance().showhandGameType});
    };  
    //请求炸金花的房间归类
    _proto.CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ = function (){
        if(!this.webSocketStateCheck()){return;}
        if(NetManager.GameClintInstance && !GameData.getInstance().bLoginDemo){
            NetManager.GameClintInstance.CG_GET_GOLDENFLOWER_KEYROOM_REQ();
        } 
        var jsonData = NetManager.GateClintMgr.goldenFlowerRoomTypeReq();
        this.sendMsg(jsonData,'showloading','GC_GET_GOLDENFLOWER_ROOM_TYPE_LIST_ACK',0,'正在请求房间列表');        
    };
    //炸金花房间归类反馈
    _proto.GC_GET_GOLDENFLOWER_ROOM_TYPE_LIST_ACK = function(content){
        GameData.getInstance().types = content.types;
        // var test = [];
        // for(var i=0;i< content.types.length-1;i++){
        //     test.push(content.types[i]);
        // }
        // GameData.getInstance().types = test;
        ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.GOLDENFLOWERHALL,resList:PreLoadList.getInstance().goldenFlowerHall});
    };
     //进入斗地主的房间
    _proto.CG_JOIN_FIGHTLANDLORD_ROOM_REQ = function (type){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.joinfightLandlordRoomReq(type);
        this.saveReq(this.CG_JOIN_FIGHTLANDLORD_ROOM_REQ,arguments);
        this.sendMsg(jsonData,'showloading','GC_JOIN_FIGHTLANDLORD_ROOM_ACK',0,'正在申请进入房间');
    };
    _proto.GC_JOIN_FIGHTLANDLORD_ROOM_ACK = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.enterRoomSuccess);
    };
    //进入梭哈的房间
    _proto.CG_JOIN_SHOWHAND_ROOM_REQ = function (type){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.joinShowHandRoomReq(type);
        this.saveReq(this.CG_JOIN_SHOWHAND_ROOM_REQ,arguments);
        this.sendMsg(jsonData,'showloading','GC_JOIN_SHOWHAND_ROOM_ACK',0,'正在申请进入房间');
    };
    _proto.GC_JOIN_SHOWHAND_ROOM_ACK = function(content){
        //给当前网络请求实例赋值

        //TODO 有疑问
        //NetManager.GameClintInstance = new ShowHandClint();
        //var event = new cc.EventCustom(EventType.Type.enterRoomSuccess);
        //cc.eventManager.dispatchEvent(event);
        MessageCallbackPro.messageEmit(EventType.Type.enterRoomSuccess);
    };
    //收到服务端发来的心跳
    _proto.HEARTBEAT_REQ = function (active) {
        if(active == true){
            //主动向服务端发送心跳
            var jsonData = NetManager.HeartBeat.req();
            this.heartTimes++;
        }
        else{
             //向服务端回应心跳
            var jsonData = NetManager.HeartBeat.ack();
            CLog.log("666666666 Gate 收到心跳 req  .66666666666 ");
        }
        this.sendMsg(jsonData,arguments[arguments.length - 1]);
    };
    //主动给服务端发送心跳包时收到的回应
    _proto.HEARTBEAT_ACK = function(content) {        
        this.heartTimes--;
        CLog.log("<<<<<<<<<<<< Gate 收到心跳 ack  .>>>>>>>>>>> times:"+this.heartTimes);
    }
     //请求离开某具体游戏服务器
    _proto.CG_LEAVE_GAME_REQ = function(gameName){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.leaveGameReq(gameName);
        this.saveReq(this.CG_LEAVE_GAME_REQ,arguments);
        this.sendMsg(jsonData,'showloading','GC_LEAVE_GAME_ACK',0);
    };
    //离开某具体游戏服务器反馈
    _proto.GC_LEAVE_GAME_ACK = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.leaveGame);
    };

    //获得玩家历史记录
    _proto.CG_GET_PLAYER_RECORD_REQ = function(gameType)
    {
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.GetPlayerRecord(gameType);
        GateSocketClient.getInstance().sendMsg(jsonData);
        HistoryRecordView.isReqRecord = true;
    }
    //获取玩家金额请求
    _proto.CG_GET_MONEY_REQ = function()
    {
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.GetPlayerMoney();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
     //获取玩家金额反馈
    _proto.GC_GET_MONEY_ACK = function(content){
        User.getInstance().SetGameMoney(content.gameMoney);
        //CLog.log("获取玩家游戏余额反馈："+content.gameMoney);
    };
    //获取玩家银行的金额请求
    _proto.CG_GET_BANK_MONEY_REQ = function()
    {
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.GetBankMoney();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
     //获取玩家银行的金额反馈
    _proto.GC_GET_BANK_MONEY_ACK = function(content){
        User.getInstance().SetBankMoney(content.bankMoney);
        //CLog.log("获取玩家银行的金额:"+content.bankMoney);
        MessageCallbackPro.messageEmit(EventType.Type.playerBackMoneyChanged,content);
    };
    //额度转换请求
    _proto.CG_CHARGE_BANK_MONEY_REQ = function(money)
    {
        if(!this.webSocketStateCheck()){return;}
        if(parseFloat(money) == 0) {
            new HintMessage("转换金额不能为0");
            return;
        }
        var jsonData = NetManager.GateClintMgr.ChargeBankMoney(parseInt(money));
        GateSocketClient.getInstance().sendMsg(jsonData);
        //new TipsMessage('转换中...',true,true,null,"chargeMoneyHall");
        Game.getInstance().MaskLayer.Show({message:"转换中...", showLoading:true});
    };
     //额度转换反馈
    _proto.GC_CHARGE_BANK_MONEY_ACK = function(content){
        var strTips = "";
        if(!content.errorMsg || (content.errorMsg == "")){
            //new TipsMessage("转换成功",false,false,2000,"chargeMoneyHall");
            strTips = "转换成功";      
        }
        else{
            //new TipsMessage("转换失败",false,false,2000,"chargeMoneyHall");
            strTips = "转换失败";
        }
        new HintMessage(strTips);
        Game.getInstance().MaskLayer.Hide();
        MessageCallbackPro.messageEmit(EventType.Type.bankChargeEvent,content);
        if(!GameData.getInstance().bLoginDemo)  this.CG_GET_BANK_MONEY_REQ();
    };
    //获取所有玩家在线数量请求
    _proto.CG_GET_TOTAL_USER_COUNT_REQ = function(){
        if(!this.webSocketStateCheck()){return;}
        CLog.log("XXXXXX "+new Date().getSeconds());
        var jsonData = NetManager.GateClintMgr.GetTotalUserCount();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    //获取所有玩家在线数量反馈
    _proto.GC_GET_TOTAL_USER_COUNT_ACK = function(content){
        PeopleOnline.getInstance().SetCurTotalNum(content);
    }
     //取某游戏玩家在线数量请求
    _proto.CG_GET_GAME_USER_COUNT_REQ = function(gameType){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.GetGameUserCount(gameType);
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    //取某游戏玩家在线数量反馈
    _proto.GC_GET_GAME_USER_COUNT_ACK = function(content){
        PeopleOnline.getInstance().SetGameUCountNum(content);
    }
    //添加常驻公告通知
    _proto.GC_ADDNOTICE_NTF = function(content){
        Notice.getInstance().PushResidentInfo(content);
        //MessageCallbackPro.messageEmit(EventType.Type.addNotice,content);
    };
    //删除常驻公告通知
    _proto.GC_REMOVENOTICE_NTF = function(content){
        Notice.getInstance().RemoveResidentInfo(content.noticeID);
        //MessageCallbackPro.messageEmit(EventType.Type.removeNotice,content.noticeID);
    };
    //添加临时公告通知
    _proto.GC_ADDTEMPNOTICE_NTF = function(content){
        //content.count为次数，若等于-1无限循环 视为系统公告
        var bIsSystem = (content.count === -1) ;
        Notice.getInstance().PushRNInfo(content,bIsSystem);
        MessageCallbackPro.messageEmit(EventType.Type.scrollNotice);
    };
     //更换头像请求
    _proto.CG_CHANGE_HEAD_PORTRAIT_REQ = function(headP){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.ChangeHead(headP);
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    //更换头像反馈
    _proto.GC_CHANGE_HEAD_PORTRAIT_ACK = function(content){
        User.getInstance().SetHeadIconID(content.headP);
        MessageCallbackPro.messageEmit(EventType.Type.headInfoEvent);
    }
     //获取头像请求
    _proto.CG_GET_HEAD_PORTRAIT_REQ = function(){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.GetHeadID();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    //获取头像反馈
    _proto.GC_GET_HEAD_PORTRAIT_ACK = function(content){
        User.getInstance().SetHeadIconID(content.headP) ;
        MessageCallbackPro.messageEmit(EventType.Type.headInfoEvent);
    }
     //新邮件通知
    _proto.GC_MAIL_SUMMARY_NTF = function(content){
        if(content.mailID){
            EmailManager.getInstance().AddMail(content);
            MessageCallbackPro.messageEmit(EventType.Type.newEmailNTF,content);
        }
        // else{
        //     //当邮件超出容量上限时，仅提示有一封邮件，不显示具体内容
        //     new TipsMessage("您有一封新邮件",false,false,2000);
        // }
        new TipsMessage("您有一封新邮件",false,false,2000);
    };
     //获取邮件概要请求
    _proto.CG_GET_ALL_MAILS_REQ = function(){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.GetAllMails();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    //获取邮件概要反馈
    _proto.GC_GET_ALL_MAILS_ACK = function(content){
        EmailManager.getInstance().Init(content.Mails || []);
    }
     //获取邮件详细内容
    _proto.CG_GET_MAIL_DETAIL_REQ = function(mailID){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.GetMailDetail(mailID);
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    //获取邮件详细内容反馈
    _proto.GC_GET_MAIL_DETAIL_ACK = function(content){
        EmailManager.getInstance().AddMailDetail(content);
        MessageCallbackPro.messageEmit(EventType.Type.emailDetail,content);
    }
    //玩家操作邮件
    _proto.CG_MAIL_OPERATE_REQ = function(id,type){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.MailOperate(id,type);
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    //玩家操作邮件反馈
    _proto.GC_MAIL_OPERATE_ACK = function(content){
        EmailManager.getInstance().OperateMail(content);
        MessageCallbackPro.messageEmit(EventType.Type.emailOptAck,content);
    }
    //获取所有任务
    _proto.CG_GET_ALL_TASK_REQ = function(){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.GetAllTask();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    //获取所有任务反馈
    _proto.GC_GET_ALL_TASK_ACK = function(content){
        TaskInfoManager.getInstance().SetAllTask(content.Tasks);
    }
    //任务状态变化通知
    _proto.GC_TASK_STATUS_NTF = function(content){
        TaskInfoManager.getInstance().UpdateTask(content);
        //MessageCallbackPro.messageEmit(EventType.Type.taskUpdate,content);
    };
    //转盘抽奖
    _proto.CG_LOTTERY_REQ = function(){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.LotteryReq();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    //转盘抽奖反馈
    _proto.GC_LOTTERY_ACK = function(content){
        GameData.getInstance().lotteryNum--;
        MessageCallbackPro.messageEmit(EventType.Type.wheelFortune,content);
    }
     //转盘奖项通知
    _proto.GC_LOTTERY_NTF = function(content){
        GameData.getInstance().lotterys = content.LotteryReward;
        GameData.getInstance().lotteryNum = content.Chance || 0;
        MessageCallbackPro.messageEmit(EventType.Type.lotteryUpdate);
    };
    //获取总盈利请求
    _proto.CG_GET_TOTAL_WINMONEY_REQ = function(){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.GetTotalWinMoney();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    //获取总盈利请求反馈
    _proto.GC_GET_TOTAL_WINMONEY_ACK = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.totalWinMoney,content);
    }
    //获取周盈利排行
    _proto.CG_GET_WEEK_RANK_REQ = function(beginIndex,endIndex){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.GetWeekRank(beginIndex,endIndex);
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    //获取周盈利排行反馈
    _proto.GC_GET_WEEK_RANK_ACK = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.getWeekRank,content);
    }
    //获取自己周盈利排行
    _proto.CG_GET_MY_WEEK_RANK_REQ = function(){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.GetMyWeekRank();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    //获取自己周盈利排行反馈
    _proto.GC_GET_MY_WEEK_RANK_ACK = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.getMyWeekRank,content);
    }
     //请求拉霸的房间归类
    _proto.CG_OAB_ROOM_TYPE_LIST_REQ = function (){
        if(!this.webSocketStateCheck()){return;}
        var data = {"proID":"CG_OAB_ROOM_TYPE_LIST_REQ","content":{}};
        var jsonData = JSON.stringify(data);
        this.sendMsg(jsonData,arguments[arguments.length - 1]);        
    };
    //拉霸房间归类反馈
    _proto.GC_OAB_ROOM_TYPE_LIST_ACK = function(content){
        for(var i in content.listLaPa){
            var lpInfo = content.listLaPa[i];
            var game = new LaPaGame({
                type : lpInfo.oabType.type,
                level : lpInfo.oabType.level,
                arrBetLimit : lpInfo.betAmountLimit,
            });
            OABGameMgr.getInstance().addGame(game);
        }
        NetManager.GameClintInstance = new OneAramBanditClient();
        ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.OAB_ROOM,resList:PreLoadList.getInstance().oabRoom});
    };
    //获取奖池金额
    _proto.CG_GET_REWARDPOOL_MONEY_REQ = function(){
        if(!this.webSocketStateCheck()){return;}
        var jsonData = NetManager.GateClintMgr.GetJackpotMoney();
        this.sendMsg(jsonData);
        // var random = parseInt(Math.random() * 100000);
        // this.GC_GET_REWARDPOOL_MONEY_ACK({rpMoney:random});
    }
    //获取奖池金额反馈
    _proto.GC_GET_REWARDPOOL_MONEY_ACK = function(content){
        JackpotMgr.getInstance().SetJackpotMoney(content);
    }
    //GM
    _proto.CG_GMORDER_REQ = function(gmOrderType,gmOrderContentStr){
        if(!this.webSocketStateCheck()){return;}
        var data = {proID:"CG_GMORDER_REQ",content:{gmOrderType:gmOrderType,gmOrderContentStr:gmOrderContentStr}};
        var jsonData = JSON.stringify(data);
        this.sendMsg(jsonData);
    }
    //
    _proto.GC_GMORDER_ACK = function(content){
    }
    //单例实例 
     var instance; 
    // //返回对象 
    return { 
        name: '_GateSocketClient',
        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _GateSocketClient(); 
            } 
            return instance; 
        } 
    }; 
 })();
    