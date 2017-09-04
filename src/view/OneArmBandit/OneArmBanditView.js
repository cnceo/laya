/*
* 老虎机游戏列表界面;
*/
var OneArmBanditView = (function (_super) {
    Laya.class(OneArmBanditView, "OneArmBanditView", _super);
    function OneArmBanditView() {
        OneArmBanditView.super(this);
        this._roomSelectDlg = new RoomSelectDlg();
    };

    OneArmBanditView.prototype.init = function(){
        this._bindEvent();
    };

    OneArmBanditView.prototype._bindEvent = function(){
        this.btnClassicLaPa.on(Event.CLICK,this, this._onBtnClassicLaPaClick);
        MessageCallbackPro.addCallbackFunc(EventType.Type.leaveGame, this._onLeaveGame,this ); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.gateLstAck,this._onGateLstAck,this );
        this.btnBack.on(Event.CLICK,this, this._onBtnBackClick);
    };

    OneArmBanditView.prototype._onBtnClassicLaPaClick = function(e){
        this._roomSelectDlg.show({
            sceneType : GameData.getInstance().SCENE_TYPE.CLASSIC_LAPA_ROOM,
            sceneRes : PreLoadList.getInstance().classicLaPaRoom,
            gameType : OABEnum.EOABType.eClassicLaPa
        });
    };

    OneArmBanditView.prototype._onLeaveGame = function(){
        NetManager.GameClintInstance = null;
        GateSocketClient.getInstance().CG_GET_GAME_LIST_REQ();
    };

    OneArmBanditView.prototype._onGateLstAck = function(){
        ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.GAMEHALL ,resList:PreLoadList.getInstance().gameHall});
    };

    OneArmBanditView.prototype._onBtnBackClick = function(){
        GateSocketClient.getInstance().CG_LEAVE_GAME_REQ(GameData.getInstance().gameType.eOneArmBandit);  
    };

    OneArmBanditView.prototype._unbindEvent = function(){
        MessageCallbackPro.removeCallbackFunc( EventType.Type.leaveGame,this._onLeaveGame,this );
        MessageCallbackPro.removeCallbackFunc( EventType.Type.gateLstAck,this._onGateLstAck,this );
    };

    OneArmBanditView.prototype.gc = function(){
        this._unbindEvent();
        //OABGameMgr.getInstance().clear();
    };
    
    return OneArmBanditView;
}(OneArmBanditRoomUI));