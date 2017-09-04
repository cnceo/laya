
var GFRoom = (function(_super){
    function GFRoom(key){
        GFRoom.__super.call(this,key);
        this.poolMoney = 0;
        this.baseNote = 0;
        this.maxRound = 0;
        this.gameMinMoney = 0;
        this.rState = "";
        this.turnNum = 0;
        this.roomActionTime = 0;
        this.minCarry = 0;
        this.minPKRound = 0;
    }
    Laya.class(GFRoom,"GFRoom",_super);
    GFRoom.prototype.SetRoomData = function(data){
        this.poolMoney = data.poolMoney;
        this.baseNote = data.roomType.baseNote;
        this.maxRound = data.roomType.maxRound;
        this.minCarry = data.roomType.minCarry;
        this.minPKRound = data.roomType.minPKRound;
        this.gameMinMoney = data.gameMinMoney;
        this.rState = data.rState;
        this.turnNum = data.turnNum;
        this.roomActionTime = data.roomType.roomActionTime;
        this.type = data.roomType.hasOwnProperty("type") ? data.roomType.type : this.type;
    }
    GFRoom.prototype.SetTurnNum = function(num){
        this.turnNum = isNaN(parseInt(num)) ? 0 : num;
    }
    GFRoom.prototype.GetTurnNum = function(){
        return this.turnNum;
    }
    GFRoom.prototype.GetRoomActionTime = function(){
        return this.roomActionTime;
    }
    GFRoom.prototype.GetBaseNote = function(){
        return this.baseNote;
    }
    GFRoom.prototype.GetMaxRound = function(){
        return this.maxRound;
    }
    GFRoom.prototype.GetMinPKRound = function(){
        return this.minPKRound;
    }
    GFRoom.prototype.GetMinCarry = function(){
        return this.minCarry;
    }
    GFRoom.prototype.GetRState = function(){
        return this.rState;
    }
    //获取锅底
    GFRoom.prototype.GetAnte = function(){
        return this.baseNote * 4;
    }
    return GFRoom;
})(BaseRoom);