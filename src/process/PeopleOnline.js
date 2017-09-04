/**
 * 在线人数
 */
//请求间隔
var ENUM_PO_STEMP = {
     TOTAL : 10000,
     OTHER : 10000,
}
var PeopleOnline = (function (){
    function PeopleOnline(){  
        this._lastTotalUCountT = -1;//上一次请求总人数的时间
        this._lastOtherUCountT = -1;//上次请求的具体游戏在线人数的时间
        this._totalUCount = 0;
        this._otherUCount = {};

        this.loopTotleUserCountReq = function(){
            var now = new Date().getTime();
            if(now - this._lastTotalUCountT < ENUM_PO_STEMP.TOTAL) return;
            this._lastTotalUCountT = now;
            GateSocketClient.getInstance().CG_GET_TOTAL_USER_COUNT_REQ();
        }
        this.loopGameUserCountReq = function(){
            var now = new Date().getTime();
            if(now - this._lastOtherUCountT < ENUM_PO_STEMP.TOTAL) return;
            this._lastOtherUCountT = now;
            GateSocketClient.getInstance().CG_GET_GAME_USER_COUNT_REQ(GameData.getInstance().curGameType);
        }
        this.setGameUCountNum = function(content){
            var curGameType = GameData.getInstance().curGameType;
            this._otherUCount[curGameType] = content.userCount;
        }
    }
        
    //获取总在线人数
    PeopleOnline.prototype.GetCurTotalNum = function(){
        return this._totalUCount;
    }
    PeopleOnline.prototype.SetCurTotalNum = function(content){
        this._totalUCount = content.userCount;
        //var d = new Date();
        //CLog.log("total在线用户人数："+this._totalUCount + "  now---  "+d.getMinutes()+":"+d.getSeconds());
        MessageCallbackPro.messageEmit(EventType.Type.updateUserCount,content.userCount);
    }
    //获取某游戏在线人数
    PeopleOnline.prototype.GetGameUCountNum = function(gameType){
        return this._otherUCount[gameType];
    }
    PeopleOnline.prototype.SetGameUCountNum = function(content){
        this.setGameUCountNum(content);
        //var d = new Date();
        //CLog.log("game在线用户人数："+content.userCount + "  now---  "+d.getMinutes()+":"+d.getSeconds());
        MessageCallbackPro.messageEmit(EventType.Type.updateUserCount,content.userCount);
    }
    //循环请求获取总在线人数
    PeopleOnline.prototype.LoopTotalUserCountReq = function(){
        this.loopTotleUserCountReq();
        Laya.timer.loop(ENUM_PO_STEMP.TOTAL,this,this.loopTotleUserCountReq);
    }
    PeopleOnline.prototype.UnLoopTotalUserCountReq = function(){
        Laya.timer.clear(this,this.loopTotleUserCountReq);
    }
    //循环请求获取某游戏在线人数
    PeopleOnline.prototype.LoopGameUserCountReq = function(){
        this.loopGameUserCountReq();
        Laya.timer.loop(ENUM_PO_STEMP.OTHER,this,this.loopGameUserCountReq);
    }
    PeopleOnline.prototype.UnLoopGameUserCountReq = function(){
        Laya.timer.clear(this,this.loopGameUserCountReq);
    }
    var instance; 
    //返回对象 
    return {
        getInstance: function () {
            if (instance === undefined) { 
                instance = new PeopleOnline(); 
            } 
            return instance; 
        }
    }; 
})(); 