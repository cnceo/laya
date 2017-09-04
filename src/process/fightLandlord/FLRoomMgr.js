/**
 * 斗地主
 */
var FLRoomMgr = (function(){
    function _FLRoomMgr(){
        BaseRoomMgr.call(this); 
        for(var i in BaseRoomMgr.prototype){
            _FLRoomMgr.prototype[i] = BaseRoomMgr.prototype[i];
        }

        this._minCarry = 0;
        this._baseNote = [];//底注

         this.onEnterKeyRoomSucc = function(content){
            this.SetJoiningKeyRoomReq(false);
            ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.FLROOM ,resList:PreLoadList.getInstance().FLRoom});
        }
        //成功离开房间
        this.onLeaveGameSuccess = function(){
            if(this.IsJoiningKeyRoomReq()){
                //重新进入GF大厅（指定serverID）
                var serverID = this.GetCurRoom().GetServerID();
                GateSocketClient.getInstance().CG_ENTER_GAME_REQ(GameData.getInstance().gameType.eFightLandlord,serverID);
            }
        }
        //成功进入GF房间
        this.onEnterGameSuccess = function(content){
            if(this.IsJoiningKeyRoomReq()){
                this.ToJoinKeyRoom(content.gameServerID,this.GetCurRoom().GetKey(),ROOM_TYPE.KEYROOM);
            }
        }

        this.flRoomState = 
        {
            eWaitingGameBegin : 'eWaitingGameBegin',	//等待游戏开始
            eGameBegin : 'eGameBegin',		//游戏开始
            ePutCard : 'ePutCard',		//发牌
            eCallLandlord : 'eCallLandlord' , //某人叫地主
            eActionBegin : 'eActionBegin', //某人出牌开始
            eGotoResult : 'eGotoResult',	//等待结果
            eGameOver : 'eGameOver',		//游戏结束
            eSettlement : 'eSettlement',	//结算界面
        }

        this.EFLActionState = 
        {
            eCall : 'eCall'	,//叫地主
            ePassCall : 'ePassCall',	//不叫
            eOutputCard : 'eOutputCard', //出牌
            ePassCard : 'ePassCard'//过牌
        }

        this.FLPokerCardsType = 
        {
            Danzhang : 'Danzhang',//单张
            Dduizi : 'Dduizi',//对子
            SanZhang : 'SanZhang' ,//三张
            SanDaiYi : 'SanDaiYi' , //三带一
            SanDaiEr : 'SanDaiEr' , //三带二
            LianDui : 'LianDui' ,//连对
            Shunzi : 'Shunzi' ,//顺子
            Feiji : 'Feiji' ,//飞机
            FeijidaiYi : 'FeijidaiYi',
            FeijidaiEr : 'FeijidaiEr',
            Zhandan : 'Zhandan' ,//炸弹
            SiDaiEr : 'SiDaiEr' ,//四带二
            SiDaiErdui : 'SiDaiErdui' , //四带两对
            Huojian : 'Huojian' ,//火箭
        }

        this.EFightlandlordResultState = 
        {
            eNone : 'eNone',
            eWin : 'eWin',//赢
            eLose : 'eLose',//输
            eEscape : 'eEscape'//逃跑
        }

        this.showCards_Deposit = 
        {
            showCards : 1,
            Deposit : 2,
        }
    }

    //是否是叫地主阶段
    _FLRoomMgr.prototype.IsCallLandlord = function( rState )
    {
        return rState == this.flRoomState.eCallLandlord;
    }

    //是否是出牌阶段
    _FLRoomMgr.prototype.IsActionBegin = function( rState )
    {
        return rState == this.flRoomState.eActionBegin;
    }

     _FLRoomMgr.prototype.AddLister = function(){
        MessageCallbackPro.addCallbackFunc( EventType.Type.enterFLKeyRoomSucc,this.onEnterKeyRoomSucc,this);
        MessageCallbackPro.addCallbackFunc( EventType.Type.leaveGame,this.onLeaveGameSuccess,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.enterGameSuccess,this.onEnterGameSuccess,this);
    }
    _FLRoomMgr.prototype.RemoveListerner = function(){
        MessageCallbackPro.removeCallbackFunc( EventType.Type.enterFLKeyRoomSucc,this.onEnterKeyRoomSucc,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.leaveGame,this.onLeaveGameSuccess,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.enterGameSuccess,this.onEnterGameSuccess,this ); 
    }
    _FLRoomMgr.prototype.Reset = function(){
        this._curRoom = null;
    }
    _FLRoomMgr.prototype.Clear = function(){
        BaseRoomMgr.prototype.Clear.call(this);
        this._minCarry = 0;
        this._baseNote = [];//底注
    }
    _FLRoomMgr.prototype.CreateRoom = function(key,type){
        this._curRoom = new FLRoom(key);
        this._curRoom.SetType(type);
        return this._curRoom ;
    }    
   
    _FLRoomMgr.prototype.SetRoomParam = function(param)
    {
        this._minCarry = param.minCarry;
        this._baseNote = param.baseNote;//底注
    }
    _FLRoomMgr.prototype.GetBaseNote = function()
    {
        return this._baseNote;
    }
    _FLRoomMgr.prototype.GetMinCarry = function()
    {
        return this._minCarry;
    }
    _FLRoomMgr.prototype.RoomParamIsOK = function()
    {
        return false;
    }
    _FLRoomMgr.prototype.ToJoinKeyRoom = function(gameServerID,roomKey,roomType)
    {
        var room = this.CreateRoom(roomKey,roomType);
        room.SetServerID(gameServerID);
        if(this.CheckServerID(gameServerID)){
            NetManager.GameClintInstance.CG_JOIN_FIGHTLANDLORD_KEYROOM_REQ(roomKey);
        }
        else{
            //当serverID不同时，退出GF大厅后重新进入
            this.SetJoiningKeyRoomReq(true);
            GateSocketClient.getInstance().CG_LEAVE_GAME_REQ(GameData.getInstance().gameType.eFightLandlord);
        }
    }

    var instance;
    return { 
        name: '_FLRoomMgr', 
        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _FLRoomMgr(); 
            } 
            return instance; 
        } 
    }; 
})();