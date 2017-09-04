var BaseRoomCreateView = (function (_super) {
    function BaseRoomCreateView() {
        BaseRoomCreateView.super(this);

        this.backBtn.on(Event.CLICK,this,this.OnClose);
        this.btnConfirm.on(Event.CLICK,this,this.OnConfirm);
        this.btnEnter.on(Event.CLICK,this,this.OnEnterRoom);
        
        this.destroy = function(){
            this.removeListerner();
            this.__proto__.destroy();
        }
    }
    Laya.class(BaseRoomCreateView, "BaseRoomCreateView", _super);

    BaseRoomCreateView.prototype.OnClose = function(e){};
    BaseRoomCreateView.prototype.OnConfirm = function(e){};
    BaseRoomCreateView.prototype.OnEnterRoom = function(e){};

    BaseRoomCreateView.prototype.addListener = function(){};
    BaseRoomCreateView.prototype.removeListerner = function(){};

    BaseRoomCreateView.prototype.initGameIcon = function(iconName){ 
        this.imgGame.skin = iconName;
    };

    return BaseRoomCreateView;
})(BaseRoomCreateUI);