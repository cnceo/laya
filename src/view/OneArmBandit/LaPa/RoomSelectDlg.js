/*
* name;
*/
var RoomSelectDlg = (function (_super) {
    Laya.class(RoomSelectDlg, "RoomSelectDlg", _super);
    function RoomSelectDlg() {
        RoomSelectDlg.super(this);
        this._init();
        this._sceneType = "";
        this._sceneRes = "";
        this._gameType = "";
    }

    RoomSelectDlg.prototype._init = function(){
        this._bindEvent();
        this._rpmcLower = new EventReceiver();
        var me = this;
        this._rpmcLower.process = function(args){
            me.lblRPMLower.text = args;
        };
        this._rpmcMid = new EventReceiver();
        this._rpmcMid.process = function(args){
            me.lblRPMMid.text = args;
        };
        this._rpmcSenior = new EventReceiver();
        this._rpmcSenior.process = function(args){
            me.lblRPMSenior.text = args;
        };
    };

    RoomSelectDlg.prototype._bindDynData = function(){
        var gameLow = OABGameMgr.getInstance().getOABGame(this._gameType, OABEnum.EOABLevel.eLower);
        gameLow.RPMES.register(this._rpmcLower);
        var gameMid = OABGameMgr.getInstance().getOABGame(this._gameType, OABEnum.EOABLevel.eMiddle);
        gameMid.RPMES.register(this._rpmcMid);
        var gameSenior = OABGameMgr.getInstance().getOABGame(this._gameType, OABEnum.EOABLevel.eSenior);
        gameSenior.RPMES.register(this._rpmcSenior);
    };

    RoomSelectDlg.prototype._unbindDynData = function(){
        var gameLow = OABGameMgr.getInstance().getOABGame(this._gameType, OABEnum.EOABLevel.eLower);
        gameLow.RPMES.unregister(this._rpmcLower);
        var gameMid = OABGameMgr.getInstance().getOABGame(this._gameType, OABEnum.EOABLevel.eMiddle);
        gameMid.RPMES.unregister(this._rpmcMid);
        var gameSenior = OABGameMgr.getInstance().getOABGame(this._gameType, OABEnum.EOABLevel.eSenior);
        gameSenior.RPMES.unregister(this._rpmcSenior);
    };

    RoomSelectDlg.prototype.show = function(args){
        this._sceneType = args.sceneType;
        this._sceneRes = args.sceneRes;
        this._gameType = args.gameType;
        this._bindDynData();
        this._refreshStaticData();
        //先手动调用一次
        this.refreshRPMoneyReq();
        Laya.timer.loop(1000, this, this.refreshRPMoneyReq);
        this.popup();
    };

    //向服务器发送刷新奖池信息的请求
    RoomSelectDlg.prototype.refreshRPMoneyReq = function(){
        var arrParam = [
            {oabType : {type : this._gameType, level : OABEnum.EOABLevel.eLower}, rwdPoolMoney : 0},
            {oabType : {type : this._gameType, level : OABEnum.EOABLevel.eMiddle}, rwdPoolMoney : 0},
            {oabType : {type : this._gameType, level : OABEnum.EOABLevel.eSenior}, rwdPoolMoney : 0},
        ];
        NetManager.GameClintInstance.CG_OAB_RWD_POOL_MONEY_REQ(arrParam);
    };  

    RoomSelectDlg.prototype._refreshStaticData = function(){
        var gameLow = OABGameMgr.getInstance().getOABGame(this._gameType, OABEnum.EOABLevel.eLower);
        this.lblMinLower.text = gameLow.getMinBetAmount();
        this.lblMaxLower.text = gameLow.getMaxBetAmount();
        var gameMid = OABGameMgr.getInstance().getOABGame(this._gameType, OABEnum.EOABLevel.eMiddle);
        this.lblMinMid.text = gameMid.getMinBetAmount();
        this.lblMaxMid.text = gameMid.getMaxBetAmount();
        var gameSenior = OABGameMgr.getInstance().getOABGame(this._gameType, OABEnum.EOABLevel.eSenior);
        this.lblMinSenior.text = gameSenior.getMinBetAmount();
        this.lblMaxSenior.text = gameSenior.getMaxBetAmount();
    };

    RoomSelectDlg.prototype.hide = function(){
        this._unbindDynData();
        Laya.timer.clear(this, this.refreshRPMoneyReq);
        this.close();
    };

    RoomSelectDlg.prototype._bindEvent = function(){
        this.btnClose.on(Event.CLICK,this, this.hide);
        this.btnLowerLvl.on(Event.CLICK,this, this._onBtnLowerLvlClick);
        this.btnMiddleLvl.on(Event.CLICK,this, this._onBtnMiddleLvlClick);
        this.btnSeniorLvl.on(Event.CLICK,this, this._onBtnSeniorLvlClick);
    };

    RoomSelectDlg.prototype._onBtnLowerLvlClick = function(){
        this.hide();
        this._reqRoom(OABEnum.EOABLevel.eLower);
    };

    RoomSelectDlg.prototype._reqRoom = function(lvl){
        var oabType = {
            type : this._gameType,
            level : lvl
        };
        NetManager.GameClintInstance.CG_JOIN_OAB_ROOM_REQ(oabType);
    }

    RoomSelectDlg.prototype._onBtnMiddleLvlClick = function(){
        this.hide();
        this._reqRoom(OABEnum.EOABLevel.eMiddle);
    };

    RoomSelectDlg.prototype._onBtnSeniorLvlClick = function(){
        this.hide();
        this._reqRoom(OABEnum.EOABLevel.eSenior);
    };

    return RoomSelectDlg;
}(RoomSelectDlgUI));