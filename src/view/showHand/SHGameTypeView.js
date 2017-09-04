
/**
 * huangandfly 2016 07 03
 * 梭哈游戏房间类型
 */
function SHGameTypeView()
{
     SHGameTypeView.super(this);
     BasePageView.call(this);
     for(var i in BasePageView.prototype){
         SHGameTypeView.prototype[i] = BasePageView.prototype[i];
     }
     this.Init = function(dataInit){
         BasePageView.prototype.Init.call(this,dataInit);
         NetManager.GameClintInstance = new ShowHandClient();

        this.RoomTypeView = new GameRoomTypeView(ROOM_TYPE_DIAMONDS.SHOWHAND);
        this.RoomTypeView.gameNameEN.text = "SHOW HAND"; 
        this.RoomTypeView.gameNameCH.text = "梭哈"; 
        this.addChild( this.RoomTypeView );

        //  转给GameRoomTypeView处理
        dataInit = dataInit ? dataInit : {};
        dataInit.caller = this;
        dataInit.callback = this.cellCallback;
        this.RoomTypeView.Init(dataInit);
        this.RoomTypeView.Show();

        this.RoomTypeView.playDemoBtn.on( Event.CLICK,this,this.onPlayDemoBtn);
        this.RoomTypeView.btnCreateRoom.on(Event.CLICK,this,this.onClickCreateRoomBtn);
        this.RoomTypeView.btnSelectRoom.on(Event.CLICK,this,this.onClickJoinRoomBtn);
        this.RoomTypeView.btnJoinMyRoom.on(Event.CLICK,this,this.onJoinMyRoomBtn);
        this.RoomTypeView.btnDeleteMyRoom.on(Event.CLICK,this,this.onDeleteMyRoomBtn);
        this.RoomTypeView.gmBtn.on(Event.CLICK,this,this.onGMBtnClick);

        if(!SHRoomMgr.getInstance().RoomParamIsOK() && !GameData.getInstance().bLoginDemo){
            NetManager.GameClintInstance.CG_GET_SHOWHAND_KEYROOM_PARAM_REQ();
        }

        MessageCallbackPro.addCallbackFunc( EventType.Type.enterRoomSuccess,this.onEnterRoomSuccess,this ); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.leaveGame,this.onLeaveGameSuccess,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.getSHKeyRoomServerID,this.onServerIDBack,this ); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.deleteSHRoomKey,this.onDeleteKeyRoomSucc,this ); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.createSHKeyRoomSucc,this.onCreateRoomSucc,this);
        this.initMyRoomInfo(); 
     }
     this.initMyRoomInfo = function(){

         SHRoomMgr.getInstance().AddLister();

         var myRoomKeys = SHRoomMgr.getInstance().GetRoomKeys();
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
      //试玩按钮
     this.onPlayDemoBtn = function(e){
        this.toJoinRoom(ROOM_TYPE_DIAMONDS.DEMOROOM.key);
     }
     //组局
     this.onClickCreateRoomBtn = function(e){
        if(!this.createRoomView){
            this.createRoomView = new SHRoomCreateView();
            this.addChild(this.createRoomView);

        }
        this.createRoomView.Show();
     }
     //入局
     this.onClickJoinRoomBtn = function(e){
         this.roomKey = this.RoomTypeView.inputYZM.text;
         if(!this.roomKey) return;
         NetManager.GameClintInstance.CG_GET_SHOWHAND_KEYROOM_GAMESERVERID_REQ(this.roomKey);
     }
     //进入自己创建的房间
     this.onJoinMyRoomBtn = function(e){
         this.roomKey = SHRoomMgr.getInstance().GetRoomKeys()[0];
         if(!this.roomKey) return;
        NetManager.GameClintInstance.CG_GET_SHOWHAND_KEYROOM_GAMESERVERID_REQ(this.roomKey);
     }
     //删除自己创建的房间
     this.onDeleteMyRoomBtn = function(e){
         if(!this.roomKey) return;
         NetManager.GameClintInstance.CG_REMOVE_SHOWHAND_KEYROOM_REQ(this.roomKey);
     }
     this.onDeleteKeyRoomSucc = function(key){
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
        ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.SHOWHANDROOM ,resList:PreLoadList.getInstance().showhandRoom});
    }

    //成功离开房间
    this.onLeaveGameSuccess = function(){
        if(SHRoomMgr.getInstance().IsJoiningKeyRoomReq()) return;
        NetManager.GameClintInstance = null;
        //ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.GAMEHALL ,resList:PreLoadList.getInstance().gameHall});
        GateSocketClient.getInstance().CG_GET_GAME_LIST_REQ('showloading');
    }
    this.onServerIDBack = function(content){
        if(content.gameServerID == undefined || content.gameServerID == null || content.gameServerID == ""){
            new HintMessage("房间不存在");
        }
        else{
            SHRoomMgr.getInstance().ToJoinKeyRoom(content.gameServerID, this.roomKey,ROOM_TYPE_DIAMONDS.KEYROOM.key);
        }
    }
    //创建房间成功
    this.onCreateRoomSucc = function(content){
        this.initMyRoomInfo();
    }
    //点击格子回调
    this.cellCallback = function( _param1,_param2)
    {
        if( _param1 == "enter" )
        {
            this.toJoinRoom( _param2 );
        }
    }

     //进入房间
    this.toJoinRoom = function (type) 
    {
        GateSocketClient.getInstance().CG_JOIN_SHOWHAND_ROOM_REQ( parseInt( type ),'showloading' );
    }

    this.gc = function()
    {
        this.RoomTypeView.gc();
        SHRoomMgr.getInstance().RemoveListerner();

        MessageCallbackPro.removeCallbackFunc( EventType.Type.enterRoomSuccess,this.onEnterRoomSuccess,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.leaveGame,this.onLeaveGameSuccess,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.getSHKeyRoomServerID,this.onServerIDBack,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.deleteSHRoomKey,this.onDeleteKeyRoomSucc,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.createSHKeyRoomSucc,this.onCreateRoomSucc,this);
        this.RoomTypeView.playDemoBtn.off( Event.CLICK,this,this.onPlayDemoBtn);
    }
}