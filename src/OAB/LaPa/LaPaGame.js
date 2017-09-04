/*
* name;
*/
var LaPaGame = (function (_super) {
    function LaPaGame(args) {
        args = args || {};
        LaPaGame.__super.call(this, args);
        this._arrBetLimit = args.arrBetLimit.concat();
        this.setMinBetAmount(this._arrBetLimit[0]);
        this.setMaxBetAmount(this._arrBetLimit[this._arrBetLimit.length - 1]);
    };
    Laya.class(LaPaGame, "LaPaGame", _super);

    LaPaGame.prototype.addPlayer = function(player){
        if(player instanceof LaPaPlayer){
            var idx = this._arrOABPlayers.indexOf(player);
            if(idx === -1){
                this._arrOABPlayers.push(player);
                return true;
            }
        }
        return false;
    };

    LaPaGame.prototype.removePlayer = function(player){
        if(player instanceof LaPaPlayer){
            var idx = this._arrOABPlayers.indexOf(player);
            if(idx != -1){
                this._arrOABPlayers.splice(idx, 1);
                return true;
            }
        }
        return false;
    };

    LaPaGame.prototype.createAndAddMe = function(){
        var  me = new LaPaPlayer(this);
        me.setTotalMoney(User.getInstance().GetGameMoney());
        this.addPlayer(me);
        this.Me = me;
    };

    LaPaGame.prototype.getBetAmountLimit = function(){
        return this._arrBetLimit.concat();
    }

    LaPaGame.prototype.onRemove = function(){

    }

    return LaPaGame;
}(OABGame));