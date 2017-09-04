

var GFRoomCreateView = (function (_super) {
    function GFRoomCreateView() {
        GFRoomCreateView.super(this);
        this.roomKey = "";        
        this.initGameIcon("gameHall/zhajinhua.png");
        
        this.initUIInfo = function(){
            if(!this.sliderBaseNode){
                this.sliderBaseNode = new SliderGearPro("底注设置");                
                this.addChild(this.sliderBaseNode);
                this.sliderBaseNode.x = 134;
                this.sliderBaseNode.y = 226;

                var arr = GFRoomMgr.getInstance().GetBaseNote();
                var param = {iGear:arr.length,arrValue:arr,showPoint:true};
                this.sliderBaseNode.init(this.sliderBaseCallbackProcess,this,param);
                this.baseNote = arr[0];
            }
            if(!this.sliderMinRoundNode){
                this.sliderMinRoundNode = new SliderGearPro("可比轮");                
                this.addChild(this.sliderMinRoundNode);
                this.sliderMinRoundNode.x = 134;
                this.sliderMinRoundNode.y = 366;
                var arrMin = GFRoomMgr.getInstance().GetMinRound();
                var param = {iGear:arrMin.length,arrValue:arrMin,showPoint:false};
                this.sliderMinRoundNode.init(this.sliderMinRoundCallbackProcess,this,param);
                this.minRound = arrMin[0];
            }
            if(!this.sliderMaxRoundNode){
                this.sliderMaxRoundNode = new SliderGearPro("最大轮");                
                this.addChild(this.sliderMaxRoundNode);
                this.sliderMaxRoundNode.x = 134;
                this.sliderMaxRoundNode.y = 506;
                var arrMax = GFRoomMgr.getInstance().GetMaxRound();
                var param = {iGear:arrMax.length,arrValue:arrMax,showPoint:false};
                this.sliderMaxRoundNode.init(this.sliderMaxRoundCallbackProcess,this,param);
                this.maxRound = arrMax[0];
            }
            if(!this.boxMinMoney){
                this.boxMinMoney = new Box();
                this.addChild(this.boxMinMoney);
                this.boxMinMoney.x = 150;
                this.boxMinMoney.y = 636;

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
            this.baseNote = GFRoomMgr.getInstance().GetBaseNote()[0];
            this.minRound = GFRoomMgr.getInstance().GetMinRound()[0];
            this.maxRound = GFRoomMgr.getInstance().GetMaxRound()[0];
            this.btnConfirm.visible = true;
            this.boxMinMoney.visible = true;
            this.lblRoomID.text = "";
            this.btnEnter.visible = false;
            this.sliderBaseNode.visible = true;
            this.sliderMinRoundNode.visible = true;
            this.sliderMaxRoundNode.visible = true;
            this.boxRoomID.visible = false;
            this.sliderBaseNode.initSliderButtonPos();
            this.sliderMinRoundNode.initSliderButtonPos();
            this.sliderMaxRoundNode.initSliderButtonPos();
            this.updateCurMinCarry();
        }

        this.boxRoomID.visible = false;
        this.lblRoomID = this.boxRoomID.getChildByName("lblRoomID");
    }
    Laya.class(GFRoomCreateView, "GFRoomCreateView", _super);

    GFRoomCreateView.prototype.OnClose = function(e){
        this.visible = false;
        this.removeListerner();
    }
    GFRoomCreateView.prototype.Show = function(){
        this.visible = true;
        this.initUIInfo();
        this.addListener();
        if(!GFRoomMgr.getInstance().RoomParamIsOK()){
            new TipsMessage("请稍后重试。。",false,false,2000);
        }
        if(!GFRoomMgr.getInstance().HasKey(this.roomKey)){
            this.defaultUI();
        }
    }
    GFRoomCreateView.prototype.OnConfirm = function(e){
        NetManager.GameClintInstance.CG_ADD_GOLDENFLOWER_KEYROOM_REQ(this.baseNote,this.minCarryNote,this.minRound,this.maxRound);
    };
    GFRoomCreateView.prototype.OnEnterRoom = function(e){
        GFRoomMgr.getInstance().ToJoinKeyRoom(GFRoomMgr.getInstance().GetCurServerID(),this.roomKey,ROOM_TYPE_DIAMONDS.KEYROOM.key);
    };
    GFRoomCreateView.prototype.addListener = function(){
        MessageCallbackPro.addCallbackFunc( EventType.Type.createSHKeyRoomSucc,this.onCreateKeyRoomSucc,this);
    }
    GFRoomCreateView.prototype.removeListerner = function(){
        MessageCallbackPro.removeCallbackFunc( EventType.Type.createSHKeyRoomSucc,this.onCreateKeyRoomSucc,this);
    }
    GFRoomCreateView.prototype.onCreateKeyRoomSucc = function(content){
        this.roomKey = content.roomKey;
        this.btnConfirm.visible = false;
        this.lblRoomID.text = content.roomKey;
        this.btnEnter.visible = true;
        this.sliderBaseNode.visible = false;
        this.boxMinMoney.visible = false;
        this.sliderMinRoundNode.visible = false;
        this.sliderMaxRoundNode.visible = false;
        this.boxRoomID.visible = true;
    }
    GFRoomCreateView.prototype.sliderBaseCallbackProcess = function(iGear){
        var baseArr = GFRoomMgr.getInstance().GetBaseNote();
        this.baseNote = baseArr[iGear];
        this.updateCurMinCarry();
    }
    GFRoomCreateView.prototype.sliderMinRoundCallbackProcess = function(iGear){
        var minPkarr  = GFRoomMgr.getInstance().GetMinRound();
        this.minRound = minPkarr[iGear];
    }
    GFRoomCreateView.prototype.sliderMaxRoundCallbackProcess = function(iGear){
        var maxArr = GFRoomMgr.getInstance().GetMaxRound();
        this.maxRound = maxArr[iGear];
        this.updateCurMinCarry();      
    }
    GFRoomCreateView.prototype.updateCurMinCarry = function(){
        this.minCarryNote = this.baseNote * this.maxRound * GFRoomMgr.getInstance().GetMinCarryRate();
        this.lblMinValue.text = Tools.getInstance().ChangeUIShow(this.minCarryNote);
    }


    return GFRoomCreateView;
})(BaseRoomCreateView);