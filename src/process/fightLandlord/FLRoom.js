
var RoomName = 
{
    0 : "入门馆",
    1 : "初级馆",
    2 : "中级馆",
    3 : "高级馆",
    4 : "顶级馆",
    5 : "至尊馆",
    100 : "试玩房间",
}
var FLRoom = (function(_super){
    function FLRoom(key){
        FLRoom.__super.call(this,key);
    }
    Laya.class(FLRoom,"FLRoom",_super);
    FLRoom.prototype.SetRoomData = function(data){
        this.rState    = data.rState;
        this.poolMoney = data.poolMoney;
        this.roomType  = data.roomType;
        this.firstPutCardPos = data.firstPutCardPos;
        this.online    = data.online;
        this.roomActionTm    = data.roomType.roomActionTm;/*房间出牌行动时间*/
	    this.roomCallLandActionTm = data.roomType.roomCallLandActionTm;/*房间叫地主行动时间*/
        this.minCarry = data.roomType.minCarry;/*金额最小值*/
    }
    FLRoom.prototype.GetRoomState = function()
    {
        return this.rState;
    }
    FLRoom.prototype.GetMinCarry = function()
    {
        return this.minCarry;
    }
    FLRoom.prototype.GetRoomName = function()
    {
        return RoomName[this.roomType.type];
    }
    FLRoom.prototype.GetRoomActionTime = function()
    {
        return this.roomActionTm;
    }
    FLRoom.prototype.GetRoomCallLandActionTime = function()
    {
        return this.roomCallLandActionTm;
    }
    return FLRoom;
})(BaseRoom);