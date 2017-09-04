/*
* name;
*/
var OABGameMgr = (function () {
    function _OABGameMgr() {
        this._arrGame = []
        this._curGame = null;
        this.PlayerInfo = {};
    };

    _OABGameMgr.prototype.addGame = function(game){
        if(game instanceof OABGame){
            var idx = this._arrGame.indexOf(game);
            if(idx === -1){
                this._arrGame.push(game);
                game.onAdd();
                return true;
            }
        }
        return false;
    };

    _OABGameMgr.prototype.getOABGame = function(type, level){
        for(var i in this._arrGame){
            var game = this._arrGame[i];
            if(game.getType() === type && game.getLevel() === level){
                return game;
            }
        }
        return null;
    }

    _OABGameMgr.prototype.setCurGame = function(game){
        if(game instanceof OABGame){
            this._curGame = game;
            return true;
        }
        return false;
    };

    _OABGameMgr.prototype.getCurGame = function(){
        return this._curGame;
    };

    _OABGameMgr.prototype.clear = function(){
        for(var i in this._arrGame){
            this._arrGame[i].onRemove();
        }
        this._arrGame = [];
    };

    //单例实例 
    var instance; 
    //返回对象 
    return { 
        name: '_OABGameMgr', 
        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _OABGameMgr(); 
            } 
            return instance; 
        } 
    }; 
}());