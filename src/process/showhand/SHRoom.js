
var SHRoom = (function(_super){
    function SHRoom(key){
        SHRoom.__super.call(this,key);
        this.poolMoney = 0;
        this.baseNote = 0;
        this.maxNote = 0;
        this.turnMoney = 0;
        this.roomActionTime = 0;//房间行动时间
    }
    Laya.class(SHRoom,"SHRoom",_super);
    SHRoom.prototype.SetRoomData = function(data){
        this.poolMoney = data.poolMoney;
        this.baseNote = data.roomSummery.baseNote;
        this.maxNote = data.roomSummery.maxNote;
        this.turnMoney = data.turnMoney;
        this.roomActionTime = data.roomSummery.roomActionTime;
    }
    SHRoom.prototype.GetBaseNote = function(){
        return this.baseNote;
    }
    SHRoom.prototype.GetAnte = function(){
        return this.baseNote * 4;
    }
    SHRoom.prototype.GetMaxNote = function(){
        return this.maxNote;
    }
    SHRoom.prototype.GetPoolMoney = function(){
        return this.poolMoney;
    }
    SHRoom.prototype.SetPoolMoney = function(pool){
        this.poolMoney = pool;
    }
    SHRoom.prototype.SetTurnMoney = function(turnMoney){
        this.turnMoney = turnMoney;
    }
    SHRoom.prototype.GetTurnMoney = function(){
        return this.turnMoney;
    }
    SHRoom.prototype.GetRoomActionTime = function(){
        return this.roomActionTime;
    }
    return SHRoom;
})(BaseRoom);