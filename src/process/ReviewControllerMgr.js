/**
 * 回放游戏控制类
 */
var IS_GAME_REVIEW = false;//当前场景是否是回放场景
var ReviewControllerMgr = (function(_super){
    function _ReviewControllerMgr(){
        this.name = '_ReviewControllerMgr';
    }
    _ReviewControllerMgr.prototype.getSHController = function(){
    }
    _ReviewControllerMgr.prototype.getGFController = function(){
        if (this.instanceGFController === undefined) { 
            this.instanceGFController = new GFReviewController(); 
        } 
        return this.instanceGFController;
    }
    _ReviewControllerMgr.prototype.getFLController = function(){
    }
    // var instance; 
    // return { 
    //     getInstance: function () { 
    //         if (instance === undefined) { 
    //             instance = new _ReviewControllerMgr(); 
    //         } 
    //         return instance; 
    //     } 
    // }; 
    return _ReviewControllerMgr;
})();

ReviewControllerMgr.GetController = function(type){
    switch(type){
        case GameData.getInstance().gameType.eShowhand:
            return this.prototype.getSHController();
        case GameData.getInstance().gameType.eGoldenFlower:
            return this.prototype.getGFController();
        case GameData.getInstance().gameType.eFightLandlord:
            return this.prototype.getFLController();
        default:
            return null;
    }
}