
//钻石场房间类型
var ROOM_TYPE_DIAMONDS = {
    SHOWHAND :
        [
            {key:0,type:"blue",type1:"blue",name:"蓝钻场"},
            {key:1,type:"red",type1:"red",name:"红钻场"},
            {key:2,type:"yellow",type1:"yellow",name:"黄钻场"},
            {key:3,type:"purple",type1:"purple",name:"紫钻场"},
            {key:4,type:"gold",type1:"gold",name:"金钻场"},
            {key:5,type:"vip",type1:"vip",name:"vip场"},
        ],
    GOLDENFLOWER :
        [
            {key:0,type:"white",type1:"white",name:"白钻场"},
            {key:1,type:"blue",type1:"blue",name:"蓝钻场"},
            {key:2,type:"red",type1:"red",name:"红钻场"},
            {key:3,type:"yellow",type1:"yellow",name:"黄钻场"},
            {key:4,type:"purple",type1:"purple",name:"紫钻场"},
            {key:5,type:"gold",type1:"gold",name:"金钻场"},            
        ],
    FL :
        [
            {key:0,type:"flRoomType/1",type1:"blue",name:"蓝钻场"},
            {key:1,type:"flRoomType/2",type1:"red",name:"红钻场"},
            {key:2,type:"flRoomType/3",type1:"yellow",name:"黄钻场"},
            {key:3,type:"flRoomType/4",type1:"purple",name:"紫钻场"},
            {key:4,type:"flRoomType/5",type1:"gold",name:"金钻场"},
            {key:5,type:"flRoomType/6",type1:"vip",name:"vip场"},
        ],
    FISH :
        [
            {key:0,type:"fishingRoom/1",type1:"a",name:"菜鸟场"},
            {key:1,type:"fishingRoom/2",type1:"b",name:"平民场"},
            {key:2,type:"fishingRoom/3",type1:"c",name:"官甲场"},
            {key:3,type:"fishingRoom/4",type1:"d",name:"土豪场"},
            {key:4,type:"fishingRoom/5",type1:"e",name:"富豪场"},
            {key:5,type:"fishingRoom/6",type1:"f",name:"尊爵场"},
        ],
    DEMOROOM : {key:100,type:"",name:"试玩场"},
    KEYROOM : {key:200,type:"",name:"组局场"},
}

// var FL_ROOM_TYPE_DIAMONDS = {
//     NORMAL :
//         [
//             {key:0,type:"flRoomType/1",type1:"blue",name:"蓝钻场"},
//             {key:1,type:"flRoomType/2",type1:"red",name:"红钻场"},
//             {key:2,type:"flRoomType/3",type1:"yellow",name:"黄钻场"},
//             {key:3,type:"flRoomType/4",type1:"purple",name:"紫钻场"},
//             {key:4,type:"flRoomType/5",type1:"gold",name:"金钻场"},
//             {key:5,type:"flRoomType/6",type1:"vip",name:"vip场"},
//         ],
//     DEMOROOM : {key:100,type:"",name:"试玩场"},
//     KEYROOM : {key:200,type:"",name:"组局场"},
// }

var BaseRoom = (function(){
    function BaseRoom(key){
        this.roomKey = key;
        this.serverID = null;
        this.type = 0;
        this.bGameReview = false;//是否是游戏回放
    }
    BaseRoom.prototype.GetKey = function(){
        return this.roomKey;
    }
    BaseRoom.prototype.SetServerID = function(sID){
        this.serverID = sID;
    }
    BaseRoom.prototype.GetServerID = function(sID){
        return this.serverID;
    }
    BaseRoom.prototype.GetType = function(){
        return this.type;
    }
    BaseRoom.prototype.SetType = function(type){
        this.type = type;
    }
    BaseRoom.prototype.SetGameReview = function(isGameReview){
        this.bGameReview = isGameReview;
    }
    BaseRoom.prototype.IsGameReview = function(){
        return this.bGameReview;
    }

    BaseRoom.prototype.SetRoomData = function(data){}
    return BaseRoom;
})();