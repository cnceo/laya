
var GFRoomMgr = (function(){
    function _GFRoomMgr(){
        BaseRoomMgr.call(this); 
        for(var i in BaseRoomMgr.prototype){
            _GFRoomMgr.prototype[i] = BaseRoomMgr.prototype[i];
        }
        
        this._baseNote = [];//底注
        this._minRound = [];//最小PK回合数
        this._maxRound = [];//最大PK回合数
        this._minCarryRate = 0;//最小携带倍率(底注*最大pK回合数*minCarryRate=入场金额要求)

        this.onEnterKeyRoomSucc = function(content){
            this.SetJoiningKeyRoomReq(false);
            ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.GOLDENFLOWERROOM ,resList:PreLoadList.getInstance().goldenFlowerRoom});
        }
        //成功离开房间
        this.onLeaveGameSuccess = function(){
            if(this.IsJoiningKeyRoomReq()){
                //重新进入GF大厅（指定serverID）
                var serverID = this.GetCurRoom().GetServerID();
                GateSocketClient.getInstance().CG_ENTER_GAME_REQ(GameData.getInstance().gameType.eGoldenFlower,serverID);
            }
        }
        //成功进入GF房间
        this.onEnterGameSuccess = function(content){
            if(this.IsJoiningKeyRoomReq()){
                this.ToJoinKeyRoom(content.gameServerID,this.GetCurRoom().GetKey(),ROOM_TYPE_DIAMONDS.KEYROOM.key);
            }
        }
        
    }
    _GFRoomMgr.prototype.AddLister = function(){
        MessageCallbackPro.addCallbackFunc( EventType.Type.enterGFKeyRoomSucc,this.onEnterKeyRoomSucc,this);
        MessageCallbackPro.addCallbackFunc( EventType.Type.leaveGame,this.onLeaveGameSuccess,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.enterGameSuccess,this.onEnterGameSuccess,this);
    }
    _GFRoomMgr.prototype.RemoveListerner = function(){
        MessageCallbackPro.removeCallbackFunc( EventType.Type.enterGFKeyRoomSucc,this.onEnterKeyRoomSucc,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.leaveGame,this.onLeaveGameSuccess,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.enterGameSuccess,this.onEnterGameSuccess,this ); 
    }
    _GFRoomMgr.prototype.Reset = function(){
        BaseRoomMgr.prototype.Reset.call(this);
    }
    _GFRoomMgr.prototype.Clear = function(){
        BaseRoomMgr.prototype.Clear.call(this);       
        this._baseNote = [];
        this._minRound = [];
        this._maxRound = [];
        this._minCarryRate = 0;
    }
    _GFRoomMgr.prototype.CreateRoom = function(key,type){
        this._curRoom = new GFRoom(key);
        this._curRoom.SetType(type);
        return this._curRoom ;
    }
    _GFRoomMgr.prototype.GetCurRoom = function(key){
        return this._curRoom;
    }   
    _GFRoomMgr.prototype.SetRoomParam = function(param){
        var minCarryRate = parseInt(param.minCarryRate);
        this._baseNote = param.baseNote;
        this._minRound = param.minRound;
        this._maxRound = param.maxRound;
        this._minCarryRate = isNaN(minCarryRate) ? -1 : minCarryRate;
    }
    
    _GFRoomMgr.prototype.GetBaseNote = function(){
        return this._baseNote;
    }
    _GFRoomMgr.prototype.GetMinRound = function(){
        return this._minRound;
    }
    _GFRoomMgr.prototype.GetMaxRound = function(){
        return this._maxRound;
    }
    _GFRoomMgr.prototype.GetMinCarryRate = function(){
        return this._minCarryRate;
    }
    _GFRoomMgr.prototype.RoomParamIsOK = function(){
        return (this._baseNote.length != 0) && (this._minRound.length != 0);
    }
    _GFRoomMgr.prototype.ToJoinKeyRoom = function(gameServerID,roomKey,roomType){
        var room = this.CreateRoom(roomKey,roomType);
        room.SetServerID(gameServerID);
        if(this.CheckServerID(gameServerID)){
            NetManager.GameClintInstance.CG_JOIN_GOLDENFLOWER_KEYROOM_REQ(roomKey);
        }
        else{
            //当serverID不同时，退出GF大厅后重新进入
            this.SetJoiningKeyRoomReq(true);
            GateSocketClient.getInstance().CG_LEAVE_GAME_REQ(GameData.getInstance().gameType.eGoldenFlower);
        }
    }
    var instance;
    return { 
        name: '_GFRoomMgr', 
        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _GFRoomMgr(); 
            } 
            return instance; 
        } 
    }; 
})();