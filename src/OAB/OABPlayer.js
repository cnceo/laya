/*
* name;
*/
//因为老虎机和玩家是1对1的，所以简化一下，将老虎机和玩家的概念融为一体
var OABPlayer = (function () {
    function OABPlayer() {
        this._totalMoney = 0;
        this._betAmount = 0;
        this.TotalMoneyES = new EventSender();
        this.BetAmountES = new EventSender();
        this.PlayES = new EventSender();
    };

    OABPlayer.prototype.setTotalMoney = function(money){
        if(money < 0) return;
        var oldMoney = this._totalMoney;
        this._totalMoney = money;
        if(money !== oldMoney){
            this.TotalMoneyES.fireEvent(money);
        }
        User.getInstance().SetGameMoney(money);
    };

    OABPlayer.prototype.changeTotalMoney = function(money){
        if(money === 0) return;
        this._totalMoney += money;
        this.TotalMoneyES.fireEvent(this._totalMoney);
        User.getInstance().SetGameMoney(this._totalMoney);
    };

    OABPlayer.prototype.getTotalMoney = function(){
        return this._totalMoney;
    };

    OABPlayer.prototype.setBetAmount = function(betAmount){
        if(betAmount < 0) return;
        var oldVal = this._betAmount;
        this._betAmount = betAmount;
        if(oldVal !== this._betAmount){
            this.BetAmountES.fireEvent(this._betAmount);
        }
    };

    OABPlayer.prototype.getBetAmount = function(){
        return this._betAmount;
    };

    OABPlayer.prototype.play = function(args){
        this.PlayES.fireEvent(args);
    };

    return OABPlayer;
}());