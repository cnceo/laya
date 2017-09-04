/*
* name;
*/
var OABGame = (function () {
    function OABGame(args) {
        args = args || {};
        this._type = args.type;
        this._level = args.level;
        this._rewardPoolMoney = 0;
        this._minBetAmount = 0;
        this._maxBetAmount = 0;
        this.RPMES = new EventSender();
        this._arrOABPlayers = [];
        //主角玩家
        this.Me = null;
        //老虎机配置
        this.MacConfig = {};
    };
    OABGame.prototype.getType = function(){
        return this._type;
    };

    OABGame.prototype.getLevel = function(){
        return this._level;
    };

    OABGame.prototype.setRewardPoolMoney = function(rpMoney){
        if(rpMoney < 0){
             rpMoney = 0;
             alert("setRewardPoolMoney出错，奖池变成负数");
        }
        this._rewardPoolMoney = rpMoney;
        this.RPMES.fireEvent(this._rewardPoolMoney);
    };

    OABGame.prototype.getRewardPoolMoney = function(){
        return this._rewardPoolMoney;
    };

    OABGame.prototype.changeRewardPoolMoney = function(deltaMoney){
        this._rewardPoolMoney -= deltaMoney;
        if(this._rewardPoolMoney < 0){
            this._rewardPoolMoney = 0;
            alert("changeRewardPoolMoney出错，奖池变成负数");
        }
        this.RPMES.fireEvent(this._rewardPoolMoney);
    };

    OABGame.prototype.setMinBetAmount = function(min){
        if(min <= 0) min = 0;
        this._minBetAmount = min;
    }

    OABGame.prototype.getMinBetAmount = function(){
        return this._minBetAmount;
    }

    OABGame.prototype.setMaxBetAmount = function(max){
        if(max <= 0) max = 0;
        this._maxBetAmount = max;
    }

    OABGame.prototype.getMaxBetAmount = function(){
        return this._maxBetAmount;
    }

    OABGame.prototype.onAdd = function(){}
    OABGame.prototype.onRemove = function(){}
    OABGame.prototype.addPlayer = function(player){};
    OABGame.prototype.createAndAddMe = function(){};
    OABGame.prototype.removePlayer = function(player){};

    return OABGame;
}());