/*
* name;
*/
var LaPaPlayer = (function (_super) {
    function LaPaPlayer(game) {
        LaPaPlayer.super(this);
        if(game instanceof LaPaGame){
            this._curGame = game;
        }else{
            alert("LaPaPlayer构造函数传入game类型出错！");
        }
        
        this._betIndex = 0;
        var arrTmp = this._curGame.getBetAmountLimit();
        this.setBetAmount(arrTmp[this._betIndex]);
        this._isMaxBet = false;
    };
    Laya.class(LaPaPlayer, "LaPaPlayer", _super);

    LaPaPlayer.prototype.changeBet = function(bPlus){
        bPlus = bPlus === true ? bPlus : false;
        if(this._curGame){
            var arrTmp = this._curGame.getBetAmountLimit();
            if(bPlus){
                this._betIndex++;
                if(this._betIndex >= arrTmp.length){
                    this._betIndex = 0;
                }
            }else{
                this._betIndex--;
                if(this._betIndex < 0){
                    this._betIndex = arrTmp.length - 1;
                }
            }
            this.setBetAmount(arrTmp[this._betIndex]);
            this._isMaxBet = this._betIndex == arrTmp.length - 1;
        }
    };

    LaPaPlayer.prototype.isMaxBet = function(){
        return this._isMaxBet;
    }

    return LaPaPlayer;
}(OABPlayer));