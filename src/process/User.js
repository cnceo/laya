/**
 * 用户逻辑数据
 */
var ENUM_SEX = {
    MALE : 0,
    FEMALE : 1
}
var User = (function (){
    function User(){  
        this._gameMoney = 0;//游戏余额
        this._bankMoney = 0;//钱包余额   
        this._userID = 0;
        this._tokenID = 0; 
        this._name = '';
        this._headIconID = 0;
    }
        
    //获取玩家游戏余额
    User.prototype.GetGameMoney = function(){
        return this._gameMoney;
    }
    User.prototype.SetGameMoney = function(gMoney){
        if(isNaN(parseFloat(gMoney)) || gMoney == this._gameMoney) return;
        var delta = gMoney - this._gameMoney;
        this._gameMoney = gMoney;
        MessageCallbackPro.messageEmit(EventType.Type.playerMoneyChanged,delta);
    }
    //获取玩家钱包余额
    User.prototype.GetBankMoney = function(){
        return this._bankMoney;
    }
    User.prototype.SetBankMoney = function(bMoney){
        this._bankMoney = bMoney;
    }
    User.prototype.GetUserID = function(){
        return this._userID; 
    }
    User.prototype.SetUserID = function(userId){
        this._userID = userId;
    }
    User.prototype.GetTokenID = function(){
        return this._tokenID;
    }
    User.prototype.SetTokenID = function(tokenID){
        this._tokenID = tokenID;
    }
    User.prototype.GetName = function(){
        return this._name;
    }
    User.prototype.SetName = function(name){
        this._name = name;
    }
    User.prototype.GetHeadIconID = function(){
        var id = isNaN(parseInt(this._headIconID)) ? 0 : this._headIconID;
        return id;
    }
    User.prototype.SetHeadIconID = function(id){
        this._headIconID = id;
    }
    User.prototype.GetSex = function(){
        var headID = parseInt(this.GetHeadIconID());
        if(isNaN(parseInt(headID))) headID = 0;
        headID = headID.toString();
        return HeadID_SEX[headID] || ENUM_SEX.MALE;
    }
    var instance; 
    //返回对象 
    return {
        getInstance: function () {
            if (instance === undefined) { 
                instance = new User(); 
            } 
            return instance; 
        } 
    }; 
})(); 