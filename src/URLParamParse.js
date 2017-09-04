/**
 * URL参数解析
 * 当加载完必要文件后 在此分析URL参数 确定跳转流程
 */
//来访者类型
var ENUM_VISITOR_TYPE = {
    LOCAL     : 0,//测试
    PLATFORM : 1,//平台账号登陆
    GM       : 2,//后台GM登陆
}
var URLParamParse = (function(){
    function _URLParamParse(){

        var bTest = false;//是否是测试
        var visitorType = ENUM_VISITOR_TYPE.LOCAL;//默认本地
        //以测试身份登陆
        var loginTest = function(){
            bTest = true;
        }
        //以本地身份登陆
        var loginLocal = function(){
            visitorType = ENUM_VISITOR_TYPE.LOCAL;
            ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.LOGIN ,resList:PreLoadList.getInstance().login});
        }
        //以平台身份登陆
        var loginPlatform = function(){
            visitorType = ENUM_VISITOR_TYPE.PLATFORM;
            ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.PRE_GAME,resList:PreLoadList.getInstance().preGame});
        }
        //以GM身份登陆
        var loginGM = function(param){
            visitorType = ENUM_VISITOR_TYPE.GM;        
            if(param.indexOf('replayInfo') >= 0){
                toGetGameReview(param);
            }
        }
        //获取游戏录像信息
        var toGetGameReview = function(param){
            var arrPara = param.substr(1).split("&");
            var d = {};
            var u = GameData.getInstance().logServer;
            for(var i in arrPara){
                var temp = arrPara[i];
                if(temp.indexOf("record=") >= 0){
                    d.record = temp.split("=")[1];
                }
                if(temp.indexOf("gameType=") >= 0){
                    d.gameType = temp.split("=")[1];
                }
                if(temp.indexOf("name=") >= 0){
                    d.name = temp.split("=")[1];
                }
            }
            var self = this;
            Tools.getInstance().AJAX(u,"POST",d,this,function(data){
                if(!data || ((data.errorMsg) && data.errorMsg != '')){
                    new HintMessage(data.errorMsg);
                    return;
                }
                var controler = ReviewControllerMgr.GetController(d.gameType);
                if(!controler) {    alert("数据错误！type:" + d.gameType);return;}
                controler.ToShowGameReview(d.record,data);
            });
        }
        this.IsTest = function(){
            return bTest;
        }
        this.IsDemo = function(){
            return visitorType === ENUM_VISITOR_TYPE.DEMO;
        }
        this.IsPlatform = function(){
            return visitorType === ENUM_VISITOR_TYPE.PLATFORM;
        }
        this.IsLocal = function(){
            return visitorType === ENUM_VISITOR_TYPE.LOCAL;
        }
        this.IsGM = function(){
            return visitorType === ENUM_VISITOR_TYPE.GM;
        }
        this.GetVisitorType = function(){
            return visitorType;
        }
        //解析URL参数
        this.Analysis = function(){
            // visitorType = ENUM_VISITOR_TYPE.GM;
            // toGetGameReview(window.location.search);
            // return;

            var param = window.location.search;
            //参数中含有test 视为测试;
            if(param.indexOf('test=1') >= 0){
                loginTest();
                var arr = param.split("test=1");
                param = arr.join("");
            }
           
            //URL参数为空--- 非平台登陆 跳转登陆界面
            if( param === '' || param === "?"){
                loginLocal();
            }
            //URL参数不为空
            else{
                //svr(gate地址)为空 
                if(param.indexOf('svr') < 0){
                    //后台GM登陆
                    if(param.indexOf('gm=1') >= 0){
                        loginGM(param);
                    }            
                }
                else{
                    //解析URL参数
                    GameData.getInstance().bLoginDemo = param.indexOf('demo=1') >= 0;
                    var arrPara = param.substr(1).split("&");
                    for(var i in arrPara){
                        var temp = arrPara[i];
                        if(temp.indexOf("svr=") >= 0){
                            GameData.getInstance().curGateAddress = temp.split("=")[1];
                        }
                        else if(temp.indexOf("userID=") >= 0){
                            User.getInstance().SetUserID(temp.split("=")[1]);
                        }
                        else if(temp.indexOf("token=") >= 0){
                            User.getInstance().SetTokenID(temp.split("=")[1]);
                        }
                    }
                    //tokenID登陆
                    if(!GameData.getInstance().bLoginDemo){
                        if(param.indexOf('token')<0){
                            CLog.error("--Erro !!!!!!    token 为空--");
                            return;
                        }
                        if(param.indexOf('userID')<0){
                            CLog.error("--Erro !!!!!!    userID 为空--");
                            return;
                        }
                    }
                    else{
                        //试玩登陆
                    }
                    loginPlatform();
                }
            }
        }
        
    }

    var instance = null;
    return {
        getInstance : function(){
            if(instance === null){
                instance = new _URLParamParse();
            }
            return instance;
        }
    }
})();