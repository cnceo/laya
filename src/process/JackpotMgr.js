/**
 * 奖池数据
 */
var LOOP_JACKPOT_TIME = 10000;//奖池变化时间间隔
var JackpotMgr = (function (){
    function JackpotMgr(){  
        this._curJackpot = 0;
        this._lastJackpotReqT = -1;//上一次产生奖池变化的时间

        //获取当前奖池金额
        this.getCurMoney = function(){
            return this._curJackpot;
        }
        //
        this.loopJackpotReq = function(){            
            var now = new Date().getTime();
            if(now - this._lastJackpotReqT < LOOP_JACKPOT_TIME) return;
            this._lastJackpotReqT = now;           
            GateSocketClient.getInstance().CG_GET_REWARDPOOL_MONEY_REQ();
        }
        this.init = function(){
        }
    }
    JackpotMgr.prototype.SetJackpotMoney = function(content){
        if(content.rpMoney == this._curJackpot) return;
        var tempVlaue = content.rpMoney - this._curJackpot;
        this._curJackpot = content.rpMoney;
        MessageCallbackPro.messageEmit(EventType.Type.jackpot,tempVlaue);
    }
    //循环请求获取奖池金额
    JackpotMgr.prototype.LoopJackpotReq = function(){
        this.loopJackpotReq();
        Laya.timer.loop(LOOP_JACKPOT_TIME,this,this.loopJackpotReq);
    }
    JackpotMgr.prototype.UnLoopJackpotReq = function(){
        Laya.timer.clear(this,this.loopJackpotReq);
    }
    var instance; 
    //返回对象 
    return {
        getInstance: function () {
            if (instance === undefined) { 
                instance = new JackpotMgr(); 
            } 
            return instance; 
        },
        GetCurMoney : function(){
            //return instance.getCurMoney();
            return instance.getCurMoney();
        },
        Init : function(){
            if (instance === undefined) { 
                instance = new JackpotMgr(); 
            } 
            instance.init();
        }
    }; 
})(); 