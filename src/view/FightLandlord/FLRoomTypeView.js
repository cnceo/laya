/**
 * huangandfly
 * 2017 04 25
 * 斗地主房间类型选择
 */
function FLRoomTypeView()
{
    FLRoomTypeView.super( this );
    BasePageView.call(this);
    for(var i in BasePageView.prototype){
        FLRoomTypeView.prototype[i] = BasePageView.prototype[i];
    }
    this.Init = function(dataInit){
         BasePageView.prototype.Init.call(this,dataInit);
         NetManager.GameClintInstance = new FightLandlordClient();

        this.RoomTypeView = new GameRoomTypeView(ROOM_TYPE_DIAMONDS.FL);
        this.RoomTypeView.gameNameEN.text = "FIGHT LANDLORD"; 
        this.RoomTypeView.gameNameCH.text = "斗地主"; 
        this.addChild( this.RoomTypeView );

         //  转给GameRoomTypeView处理
        dataInit = dataInit ? dataInit : {};
        dataInit.caller = this;
        dataInit.callback = this.cellCallback;
        this.RoomTypeView.Init(dataInit);
        this.RoomTypeView.Show();

        this.FLRoomTypeSubUI = new FLRoomTypeSubUI();
        this.RoomTypeView.addChild( this.FLRoomTypeSubUI );
        this.initCurRommLimitInfo();

        if(!FLRoomMgr.getInstance().RoomParamIsOK() && !GameData.getInstance().bLoginDemo){
            NetManager.GameClintInstance.CG_GET_FIGHTLANDLORD_KEYROOM_PARAM_REQ();
        }

        this.RoomTypeView.playDemoBtn.on( Event.CLICK,this,this.onPlayDemoBtn);
        this.RoomTypeView.btnCreateRoom.on(Event.CLICK,this,this.onClickCreateRoomBtn);
        this.RoomTypeView.btnSelectRoom.on(Event.CLICK,this,this.onClickJoinRoomBtn);
        this.RoomTypeView.btnJoinMyRoom.on(Event.CLICK,this,this.onJoinMyRoomBtn);
        this.RoomTypeView.btnDeleteMyRoom.on(Event.CLICK,this,this.onDeleteMyRoomBtn);
        this.RoomTypeView.gmBtn.on(Event.CLICK,this,this.onGMBtnClick);
 
        MessageCallbackPro.addCallbackFunc( EventType.Type.enterRoomSuccess,this.onEnterRoomSuccess,this );  
        MessageCallbackPro.addCallbackFunc( EventType.Type.leaveGame,this.onLeaveGameSuccess,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.getFLKeyRoomServerID,this.onServerIDBack,this ); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.deleteFLRoomKey,this.onDeleteKeyRoomSucc,this ); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.createFLKeyRoomSucc,this.onCreateRoomSucc,this);

        this.initMyRoomInfo(); 
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
        this.FLRoomTypeSubUI.blbCurRoomLimit.text = "最低金额：￥" + Tools.getInstance().ChangeUIShow(limit);
    }

    //创建房间成功
    this.onCreateRoomSucc = function(content){
        this.initMyRoomInfo();
    }

    this.onDeleteKeyRoomSucc = function(key)
    {
        this.initMyRoomInfo();
    }

    this.initMyRoomInfo = function()
    {
        FLRoomMgr.getInstance().AddLister();

        var myRoomKeys = FLRoomMgr.getInstance().GetRoomKeys();
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

    this.onGMBtnClick = function(e){
        if(!this.GMView){
            this.GMView = new GMDialog();
        }
        this.GMView.Show(NetManager.GameClintInstance,NetManager.GameClintInstance.CG_GMORDER_CL_REQ);
    }

     //删除自己创建的房间
     this.onDeleteMyRoomBtn = function(e){
         if(!this.roomKey) return;
         NetManager.GameClintInstance.CG_REMOVE_FIGHTLANDLORD_KEYROOM_REQ(this.roomKey);
     }
          //进入自己创建的房间
     this.onJoinMyRoomBtn = function(e){
         this.roomKey = FLRoomMgr.getInstance().GetRoomKeys()[0];
         if(!this.roomKey) return;
        NetManager.GameClintInstance.CG_GET_FLGHTLANDLORD_KEYROOM_GAMESERVERID_REQ(this.roomKey);
     }

          //入局
     this.onClickJoinRoomBtn = function(e){
         this.roomKey = this.RoomTypeView.inputYZM.text;
         if(!this.roomKey) return;
         NetManager.GameClintInstance.CG_GET_FLGHTLANDLORD_KEYROOM_GAMESERVERID_REQ(this.roomKey);
     }

          //组局
     this.onClickCreateRoomBtn = function(e){
        // if(!this.createRoomView){
        //     this.createRoomView = new GFRoomCreateView();
        //     this.addChild(this.createRoomView);

        // }
        // this.createRoomView.Show();
     }

      //试玩按钮
     this.onPlayDemoBtn = function(e){
        this.toJoinRoom(ROOM_TYPE_DIAMONDS.DEMOROOM.key);
     }

    /**
     * 进入房间成功
     */
    this.onEnterRoomSuccess = function()
    {
        ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.FLROOM ,resList:PreLoadList.getInstance().FLRoom});
    }

        //成功离开房间
    this.onLeaveGameSuccess = function(){
        if(FLRoomMgr.getInstance().IsJoiningKeyRoomReq()) return;
        NetManager.GameClintInstance = null;
        //ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.GAMEHALL ,resList:PreLoadList.getInstance().gameHall);
        GateSocketClient.getInstance().CG_GET_GAME_LIST_REQ('showloading');
    }

    this.onServerIDBack = function(content){
        if(content.gameServerID == undefined || content.gameServerID == null || content.gameServerID == ""){
            new HintMessage("房间不存在");
        }
        else{
            FLRoomMgr.getInstance().ToJoinKeyRoom(content.gameServerID, this.roomKey,ROOM_TYPE.KEYROOM);
        }
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

     //进入房间
    this.toJoinRoom = function (type) 
    {
        GateSocketClient.getInstance().CG_JOIN_FIGHTLANDLORD_ROOM_REQ( parseInt( type ),'showloading' );
    }

    this.gc = function()
    {
        this.RoomTypeView.gc();
        FLRoomMgr.getInstance().RemoveListerner();

        MessageCallbackPro.removeCallbackFunc( EventType.Type.enterRoomSuccess,this.onEnterRoomSuccess,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.leaveGame,this.onLeaveGameSuccess,this );
        MessageCallbackPro.removeCallbackFunc( EventType.Type.getFLKeyRoomServerID,this.onServerIDBack,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.deleteFLRoomKey,this.onDeleteKeyRoomSucc,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.createFLKeyRoomSucc,this.onCreateRoomSucc,this);

        this.RoomTypeView.playDemoBtn.off( Event.CLICK,this,this.onPlayDemoBtn);
        this.RoomTypeView.btnCreateRoom.off(Event.CLICK,this,this.onClickCreateRoomBtn);
        this.RoomTypeView.btnSelectRoom.off(Event.CLICK,this,this.onClickJoinRoomBtn);
        this.RoomTypeView.btnJoinMyRoom.off(Event.CLICK,this,this.onJoinMyRoomBtn);
        this.RoomTypeView.btnDeleteMyRoom.off(Event.CLICK,this,this.onDeleteMyRoomBtn);
        this.RoomTypeView.gmBtn.off(Event.CLICK,this,this.onGMBtnClick);
    }
}