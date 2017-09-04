
var SHRoomMgr = (function(){
    function _SHRoomMgr(){
        BaseRoomMgr.call(this); 
        for(var i in BaseRoomMgr.prototype){
            _SHRoomMgr.prototype[i] = BaseRoomMgr.prototype[i];
        }

        this._baseNote = [];//底注
        this._maxNoteRate = [];//最大顶住倍率
        this._minCarryRate = 0;//最小携带倍率(基于maxNote)
        

        this.onEnterKeyRoomSucc = function(content){
            this.SetJoiningKeyRoomReq(false);
            ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.SHOWHANDROOM ,resList:PreLoadList.getInstance().showhandRoom});
        }
        //成功离开房间
        this.onLeaveGameSuccess = function(){
            if(this.IsJoiningKeyRoomReq()){
                //重新进入梭哈大厅（指定serverID）
                var serverID = this.GetCurRoom().GetServerID();
                GateSocketClient.getInstance().CG_ENTER_GAME_REQ(GameData.getInstance().gameType.eShowhand,serverID);
            }
        }
        //成功进入梭哈房间
        this.onEnterGameSuccess = function(content){
            if(this.IsJoiningKeyRoomReq()){
                this.ToJoinKeyRoom(content.gameServerID,this.GetCurRoom().GetKey(),ROOM_TYPE_DIAMONDS.KEYROOM.key);
            }
        }
    }
    _SHRoomMgr.prototype.AddLister = function(){        
        MessageCallbackPro.addCallbackFunc( EventType.Type.enterSHKeyRoomSucc,this.onEnterKeyRoomSucc,this);
        MessageCallbackPro.addCallbackFunc( EventType.Type.leaveGame,this.onLeaveGameSuccess,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.enterGameSuccess,this.onEnterGameSuccess,this);
    }
    _SHRoomMgr.prototype.RemoveListerner = function(){
        MessageCallbackPro.removeCallbackFunc( EventType.Type.enterSHKeyRoomSucc,this.onEnterKeyRoomSucc,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.leaveGame,this.onLeaveGameSuccess,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.enterGameSuccess,this.onEnterGameSuccess,this ); 
    }
    _SHRoomMgr.prototype.Reset = function(){
        BaseRoomMgr.prototype.Reset.call(this);
    }
    _SHRoomMgr.prototype.Clear = function(){
        BaseRoomMgr.prototype.Clear.call(this);        
        this._baseNote = [];
        this._maxNoteRate = [];
        this._minCarryRate = 0;
    }
    _SHRoomMgr.prototype.CreateRoom = function(key,type){
        this._curRoom = new SHRoom(key);
        this._curRoom.SetType(type);
        return this._curRoom ;
    } 
    _SHRoomMgr.prototype.SetRoomParam = function(param){
        var minCarryRate = parseInt(param.minCarryRate);
        this._baseNote = param.baseNote;
        this._maxNoteRate = param.maxNoteRate;
        this._minCarryRate = isNaN(minCarryRate) ? -1 : minCarryRate;
    }
    
    _SHRoomMgr.prototype.GetBaseNote = function(){
        return this._baseNote;
    }
    _SHRoomMgr.prototype.GetMaxNoteRate = function(){
        return this._maxNoteRate;
    }
    _SHRoomMgr.prototype.GetMinCarryRate = function(){
        return this._minCarryRate;
    }
    _SHRoomMgr.prototype.RoomParamIsOK = function(){
        return (this._baseNote.length != 0) && (this._maxNoteRate.length != 0);
    }
    _SHRoomMgr.prototype.ToJoinKeyRoom = function(gameServerID,roomKey,roomType){
        var room = this.CreateRoom(roomKey,roomType);
        room.SetServerID(gameServerID);
        if(this.CheckServerID(gameServerID)){
            NetManager.GameClintInstance.CG_JOIN_SHOWHAND_KEYROOM_REQ(roomKey);
        }
        else{
            //当serverID不同时，退出梭哈大厅后重新进入
            this.SetJoiningKeyRoomReq(true);
            GateSocketClient.getInstance().CG_LEAVE_GAME_REQ(GameData.getInstance().gameType.eShowhand);
        }
    }
    var instance;
    return { 
        name: '_SHRoomMgr', 
        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _SHRoomMgr(); 
            } 
            return instance; 
        } 
    }; 
})();