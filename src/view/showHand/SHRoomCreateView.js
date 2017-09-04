

var SHRoomCreateView = (function (_super) {
    function SHRoomCreateView() {
        SHRoomCreateView.super(this);
        this.roomKey = "";
        
        this.initGameIcon("gameHall/suoha.png");
        
        this.initUIInfo = function(){
            if(!this.sliderBaseNode){
                this.sliderBaseNode = new SliderGearPro("底注设置");                
                this.addChild(this.sliderBaseNode);
                this.sliderBaseNode.x = 134;
                this.sliderBaseNode.y = 226;

                var arr = SHRoomMgr.getInstance().GetBaseNote();
                var param = {iGear:arr.length,arrValue:arr,showPoint:true};
                this.sliderBaseNode.init(this.sliderBaseCallbackProcess,this,param);
                this.baseNote = arr[0];
            }
            if(!this.sliderMaxNode){
                this.sliderMaxNode = new SliderGearPro("顶注设置");                
                this.addChild(this.sliderMaxNode);
                this.sliderMaxNode.x = 134;
                this.sliderMaxNode.y = 366;
                var arrBase = SHRoomMgr.getInstance().GetBaseNote();
                var arrMax = SHRoomMgr.getInstance().GetMaxNoteRate();
                var param = {iGear:arrMax.length,arrValue:arrMax,iRate:arrBase[0],showPoint:true};
                this.sliderMaxNode.init(this.sliderMaxCallbackProcess,this,param);
                this.maxNote = arrMax[0];
            }
            if(!this.boxMinMoney){
                this.boxMinMoney = new Box();
                this.addChild(this.boxMinMoney);
                this.boxMinMoney.x = 150;
                this.boxMinMoney.y = 496;

                var txt = new Text();
                txt.text = "入场金额：";
                txt.fontSize = 20;
                txt.font = 'Microsoft YaHei';
                txt.color = "#929191";
                this.boxMinMoney.addChild(txt);

                this.lblMinValue = new Text();
                this.lblMinValue.name = "lblMinValue";
                this.lblMinValue.text = "";
                this.lblMinValue.fontSize = 35;
                this.lblMinValue.font = 'impact';
                this.lblMinValue.color = "#ffda5b";
                this.lblMinValue.x = 100;
                this.lblMinValue.y = -13;
                this.boxMinMoney.addChild(this.lblMinValue);
                this.updateCurMinCarry();
            }
        }

        this.defaultUI = function(){
            this.baseNote = SHRoomMgr.getInstance().GetBaseNote()[0];
            this.maxNote = SHRoomMgr.getInstance().GetMaxNoteRate()[0];
            this.btnConfirm.visible = true;
            this.boxMinMoney.visible = true;
            this.lblRoomID.text = "";
            this.btnEnter.visible = false;
            this.sliderBaseNode.visible = true;
            this.sliderMaxNode.visible = true;
            this.boxRoomID.visible = false;
            this.sliderBaseNode.initSliderButtonPos();
            this.sliderMaxNode.initSliderButtonPos();
            this.updateCurMinCarry();
        }

        this.boxRoomID.visible = false;
        this.lblRoomID = this.boxRoomID.getChildByName("lblRoomID");
    }
    Laya.class(SHRoomCreateView, "SHRoomCreateView", _super);

    SHRoomCreateView.prototype.OnClose = function(e){
        this.visible = false;
        this.removeListerner();
    }
    SHRoomCreateView.prototype.Show = function(){
        this.visible = true;
        this.initUIInfo();
        this.addListener();
        if(!SHRoomMgr.getInstance().RoomParamIsOK()){
            new TipsMessage("请稍后重试。。",false,false,2000);
        }
        if(!SHRoomMgr.getInstance().HasKey(this.roomKey)){
            this.defaultUI();
        }
    }
    SHRoomCreateView.prototype.OnConfirm = function(e){
        NetManager.GameClintInstance.CG_ADD_SHOWHAND_KEYROOM_REQ(this.baseNote,this.maxNote * this.baseNote,this.minCarryNote);
    };
    SHRoomCreateView.prototype.OnEnterRoom = function(e){
        SHRoomMgr.getInstance().ToJoinKeyRoom(SHRoomMgr.getInstance().GetCurServerID(),this.roomKey,ROOM_TYPE_DIAMONDS.KEYROOM.key);
    };
    SHRoomCreateView.prototype.addListener = function(){
        MessageCallbackPro.addCallbackFunc( EventType.Type.createSHKeyRoomSucc,this.onCreateKeyRoomSucc,this);
    }
    SHRoomCreateView.prototype.removeListerner = function(){
        MessageCallbackPro.removeCallbackFunc( EventType.Type.createSHKeyRoomSucc,this.onCreateKeyRoomSucc,this);
    }
    SHRoomCreateView.prototype.onCreateKeyRoomSucc = function(content){
        this.roomKey = content.roomKey;
        this.btnConfirm.visible = false;
        this.lblRoomID.text = content.roomKey;
        this.btnEnter.visible = true;
        this.sliderBaseNode.visible = false;
        this.sliderMaxNode.visible = false;
        this.boxRoomID.visible = true;
        this.boxMinMoney.visible = false;
    }
    SHRoomCreateView.prototype.sliderBaseCallbackProcess = function(iGear){
        var baseArr = SHRoomMgr.getInstance().GetBaseNote();
        this.baseNote = baseArr[iGear];
        this.sliderMaxNode.setIRate(this.baseNote);
        this.updateCurMinCarry();
    }
    SHRoomCreateView.prototype.sliderMaxCallbackProcess = function(iGear){
        var maxArr = SHRoomMgr.getInstance().GetMaxNoteRate();
        this.maxNote = maxArr[iGear];
        this.updateCurMinCarry();      
    }
    SHRoomCreateView.prototype.updateCurMinCarry = function(){
        this.minCarryNote = this.baseNote * this.maxNote * SHRoomMgr.getInstance().GetMinCarryRate();
        this.lblMinValue.text = Tools.getInstance().ChangeUIShow(this.minCarryNote);
    }


    return SHRoomCreateView;
})(BaseRoomCreateView);