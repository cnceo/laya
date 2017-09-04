
var THRoom = (function(_super){
    function THRoom(key){
        THRoom.__super.call(this,key);
        this.poolMoney = 0;
        this.baseNote = 0;
        this.maxNote = 0;
        this.turnMoney = 0;
        this.roomActionTime = 0;//房间行动时间
    }
    Laya.class(THRoom,"THRoom",_super);
    THRoom.prototype.SetRoomData = function(data){
        this.poolMoney = data.poolMoney;
        this.baseNote = data.roomSummery.baseNote;
        this.maxNote = data.roomSummery.maxNote;
        this.turnMoney = data.turnMoney;
        this.roomActionTime = data.roomSummery.roomActionTime;
    }
    THRoom.prototype.GetBaseNote = function(){
        return this.baseNote;
    }
    THRoom.prototype.GetMaxNote = function(){
        return this.maxNote;
    }
    THRoom.prototype.GetPoolMoney = function(){
        return this.poolMoney;
    }
    THRoom.prototype.SetPoolMoney = function(pool){
        this.poolMoney = pool;
    }
    THRoom.prototype.SetTurnMoney = function(turnMoney){
        this.turnMoney = turnMoney;
    }
    THRoom.prototype.GetTurnMoney = function(){
        return this.turnMoney;
    }
    THRoom.prototype.GetRoomActionTime = function(){
        return this.roomActionTime;
    }
    return THRoom;
})(BaseRoom);