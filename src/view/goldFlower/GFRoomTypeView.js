/**
 * huangandfly 
 * 2017 04 25 
 * 金花游戏房间类型选择界面
 * 
 */
function GFRoomTypeView()
{
    GFRoomTypeView.super(this);
    BasePageView.call(this);
    for(var i in BasePageView.prototype){
        GFRoomTypeView.prototype[i] = BasePageView.prototype[i];
    }
    this.Init = function(dataInit){
        BasePageView.prototype.Init.call(this,dataInit);
        NetManager.GameClintInstance = new GoldenFlowerClient();

        this.RoomTypeView = new GameRoomTypeView(ROOM_TYPE_DIAMONDS.GOLDENFLOWER);
        this.RoomTypeView.gameNameEN.text = "GOLDEN FLOWERS"; 
        this.RoomTypeView.gameNameCH.text = "诈金花"; 
        this.addChild( this.RoomTypeView );

        //  转给GameRoomTypeView处理
        dataInit = dataInit ? dataInit : {};
        dataInit.caller = this;
        dataInit.callback = this.cellCallback;
        this.RoomTypeView.Init(dataInit);

        this.GFRoomTypeSub = new GFRoomTypeSubUI();
        this.RoomTypeView.addChild( this.GFRoomTypeSub );
        var num = this.RoomTypeView.numChildren - 10;//底层10个基本元素
        this.RoomTypeView.setChildIndex( this.GFRoomTypeSub,this.RoomTypeView.numChildren - num);
        this.RoomTypeView.Show();

        if(!GFRoomMgr.getInstance().RoomParamIsOK() && !GameData.getInstance().bLoginDemo){
            NetManager.GameClintInstance.CG_GET_GOLDENFLOWER_KEYROOM_PARAM_REQ();
        }

        this.initCurRommLimitInfo();
        this.RoomTypeView.playDemoBtn.on( Event.CLICK,this,this.onPlayDemoBtn);
        this.RoomTypeView.btnCreateRoom.on(Event.CLICK,this,this.onClickCreateRoomBtn);
        this.RoomTypeView.btnSelectRoom.on(Event.CLICK,this,this.onClickJoinRoomBtn);
        this.RoomTypeView.btnJoinMyRoom.on(Event.CLICK,this,this.onJoinMyRoomBtn);
        this.RoomTypeView.btnDeleteMyRoom.on(Event.CLICK,this,this.onDeleteMyRoomBtn);
        this.RoomTypeView.gmBtn.on(Event.CLICK,this,this.onGMBtnClick);

        MessageCallbackPro.addCallbackFunc( EventType.Type.enterRoomSuccess,this.onEnterRoomSuccess,this ); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.leaveGame,this.onLeaveGameSuccess,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.getGFKeyRoomServerID,this.onServerIDBack,this ); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.deleteGFRoomKey,this.onDeleteKeyRoomSucc,this ); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.createGFKeyRoomSucc,this.onCreateRoomSucc,this);

        this.initMyRoomInfo(); 
    }
    this.onGMBtnClick = function(e){
        if(!this.GMView){
            this.GMView = new GMDialog();
        }
        this.GMView.Show(NetManager.GameClintInstance,NetManager.GameClintInstance.CG_GMORDER_CL_REQ);
    }

    /**
     * 进入房间成功
     */
    this.onEnterRoomSuccess = function()
    {
        ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.GOLDENFLOWERROOM ,resList:PreLoadList.getInstance().goldenFlowerRoom});
    }

    //成功离开房间
    this.onLeaveGameSuccess = function(){
        if(GFRoomMgr.getInstance().IsJoiningKeyRoomReq()) return;
        NetManager.GameClintInstance = null;
        //ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.GAMEHALL ,resList:PreLoadList.getInstance().gameHall});
        GateSocketClient.getInstance().CG_GET_GAME_LIST_REQ('showloading');
    }

    //点击格子回调
    this.cellCallback = function( _param1,_param2)
    {
        if( _param1 == "enter" )
        {
            this.toJoinRoom( _param2 );
        }else if( _param1 == "moveCell" )
        {
            this.setCurRommLimitInfo( _param2 );
        }
    }

        //试玩按钮
    this.onPlayDemoBtn = function(e){
        this.toJoinRoom(ROOM_TYPE_DIAMONDS.DEMOROOM.key);
    }

    //进入房间
    this.toJoinRoom = function (type) 
    {
        NetManager.GameClintInstance.CG_JOIN_GOLDENFLOWER_ROOM_REQ(parseInt( type ));
    }

    /**
     * 初始化房间金钱限制
     */
    this.initCurRommLimitInfo = function()
    {
        var typsArr = GameData.getInstance().types;
        if( GameData.getInstance().bLoginDemo )
        {
            this.setCurRommLimitInfo(typsArr[0].minCarry);
        }else
        {
            var limitNode = typsArr.length <= 3 ? typsArr[typsArr.length -1] : typsArr[this.RoomTypeView.getLadderNum()];
            this.setCurRommLimitInfo(limitNode.minCarry);
        }
    }

    this.setCurRommLimitInfo = function(limit){
        this.GFRoomTypeSub.blbCurRoomLimit.text = "最低金额：￥" + Tools.getInstance().ChangeUIShow(limit);
    }

    this.gc = function()
    {
        this.RoomTypeView.gc();
        GFRoomMgr.getInstance().RemoveListerner();

        MessageCallbackPro.removeCallbackFunc( EventType.Type.enterRoomSuccess,this.onEnterRoomSuccess,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.leaveGame,this.onLeaveGameSuccess,this );
        MessageCallbackPro.removeCallbackFunc( EventType.Type.getGFKeyRoomServerID,this.onServerIDBack,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.deleteGFRoomKey,this.onDeleteKeyRoomSucc,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.createGFKeyRoomSucc,this.onCreateRoomSucc,this); 
        this.RoomTypeView.playDemoBtn.off( Event.CLICK,this,this.onPlayDemoBtn);
    }

    this.initMyRoomInfo = function(){

        GFRoomMgr.getInstance().AddLister();

         var myRoomKeys = GFRoomMgr.getInstance().GetRoomKeys();
         this.RoomTypeView.boxMyRoom.visible = myRoomKeys.length != 0;
         this.RoomTypeView.btnCreateRoom.visible = myRoomKeys.length == 0;
         if(myRoomKeys.length != 0){
             this.roomKey = myRoomKeys[0];
             var lbl = this.RoomTypeView.boxMyRoom.getChildByName('lblRoomKey');
             lbl.text = this.roomKey;
         }
         if(GameData.getInstance().bLoginDemo){
             this.RoomTypeView.btnCreateRoom.disabled = true;
             this.RoomTypeView.btnSelectRoom.disabled = true;
         }
     }
     //组局
     this.onClickCreateRoomBtn = function(e){
        if(!this.createRoomView){
            this.createRoomView = new GFRoomCreateView();
            this.addChild(this.createRoomView);

        }
        this.createRoomView.Show();
     }
     //入局
     this.onClickJoinRoomBtn = function(e){
         this.roomKey = this.RoomTypeView.inputYZM.text;
         if(!this.roomKey) return;
         NetManager.GameClintInstance.CG_GET_GOLDENFLOWER_KEYROOM_GAMESERVERID_REQ(this.roomKey);
     }
     //进入自己创建的房间
     this.onJoinMyRoomBtn = function(e){
         this.roomKey = GFRoomMgr.getInstance().GetRoomKeys()[0];
         if(!this.roomKey) return;
        NetManager.GameClintInstance.CG_GET_GOLDENFLOWER_KEYROOM_GAMESERVERID_REQ(this.roomKey);
     }
     //删除自己创建的房间
     this.onDeleteMyRoomBtn = function(e){
         if(!this.roomKey) return;
         NetManager.GameClintInstance.CG_REMOVE_GOLDENFLOWER_KEYROOM_REQ(this.roomKey);
     }
     this.onDeleteKeyRoomSucc = function(key){
        this.initMyRoomInfo();
     }
     this.onServerIDBack = function(content){
        if(content.gameServerID == undefined || content.gameServerID == null || content.gameServerID == ""){
            new HintMessage("房间不存在");
        }
        else{
            GFRoomMgr.getInstance().ToJoinKeyRoom(content.gameServerID, this.roomKey,ROOM_TYPE_DIAMONDS.KEYROOM.key);
        }
    }
    //创建房间成功
    this.onCreateRoomSucc = function(content){
        this.initMyRoomInfo();
    }

}