var BaseRoomMgr = (function(){    
    function BaseRoomMgr(){
        this._curRoom = null;
        this._curGameServerID = null;//物理区号
        this._roomKeys = [];
        this._isJoiningKeyRoomReq = false;//是否正在申请加入带秘钥的房间
    }
    BaseRoomMgr.prototype.GetCurRoom = function(key){
        return this._curRoom;
    }
    BaseRoomMgr.prototype.GetCurServerID = function(){
        return this._curGameServerID;
    }
    BaseRoomMgr.prototype.SetCurServerID = function(id){
        this._curGameServerID = id;
    }
    BaseRoomMgr.prototype.Reset = function(){
        this._curRoom = null;
    }
    BaseRoomMgr.prototype.Clear = function(){
        this._curRoom = null;
        this._curGameServerID = null;
        this._roomKeys = [];
        this._isJoiningKeyRoomReq = false;
    }
    BaseRoomMgr.prototype.SetRoomKeys = function(keys){
        if(keys instanceof Array){
            this._roomKeys = keys;
        }
        else if(keys != null && keys != undefined){
            this.AddRoomKey(keys);
        }        
    }
    BaseRoomMgr.prototype.GetRoomKeys = function(){
        return this._roomKeys;
    }
    BaseRoomMgr.prototype.HasKey = function(key){
        for(var i in this._roomKeys){
            if(this._roomKeys[i] == key){
                return ture;
            }
        }
        return false;
    }
    BaseRoomMgr.prototype.AddRoomKey = function(key){
        for(var i in this._roomKeys){
            if(this._roomKeys[i] == key) return;
        }
        this._roomKeys.push(key);
    }
    BaseRoomMgr.prototype.RemoveRoomKey = function(key){
        var idx = -1;
        for(var i in this._roomKeys){
            if(this._roomKeys[i] == key){
                idx = i;
            }
        }
        if(idx != -1){
            this._roomKeys.splice(idx,1);
            return key;
        }
        return -1;
    }
    BaseRoomMgr.prototype.CheckServerID = function(serverID){
        //serverID = -1 表示room还没有分配serverID
        return (serverID == -1) || (serverID == this._curGameServerID);
    }
    BaseRoomMgr.prototype.IsJoiningKeyRoomReq = function(){
        return this._isJoiningKeyRoomReq;
    }
    BaseRoomMgr.prototype.SetJoiningKeyRoomReq = function(b){
        this._isJoiningKeyRoomReq = b;
    }
    return BaseRoomMgr;
})();