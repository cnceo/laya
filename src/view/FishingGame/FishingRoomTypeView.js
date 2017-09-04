/*
* 捕鱼大厅; 
*/
function FishingRoomTypeView ()
{
   FishingRoomTypeView.super(this);
   BasePageView.call(this);
    for(var i in BasePageView.prototype){
        FishingRoomTypeView.prototype[i] = BasePageView.prototype[i];
    }

    this.Init = function(dataInit){
         BasePageView.prototype.Init.call(this,dataInit);
        this.RoomTypeView = new GameRoomTypeView(ROOM_TYPE_DIAMONDS.FISH);
        this.RoomTypeView.gameNameEN.text = "FISHING MAN"; 
        this.RoomTypeView.gameNameCH.text = "捕鱼"; 
        this.addChild(this.RoomTypeView);
         //  转给GameRoomTypeView处理
        dataInit = dataInit ? dataInit : {};
        dataInit.caller = this;
        dataInit.callback = this.cellCallback;
        this.RoomTypeView.Init(dataInit);
        this.RoomTypeView.Show();
        //this.userInfo      = this.RoomTypeView.getChildByName("userInfo");
        /*this.RoomTypeView.inputYZM.visible = false;
        this.RoomTypeView.btnSelectRoom.visible = false;
        this.RoomTypeView.btnCreateRoom.visible = false;
        this.RoomTypeView.boxMyRoom.visible = false;
        this.RoomTypeView.inputImage.visible = false;*/
    }

    this.cellCallback = function(_param1,_param2)
    {
        if( _param1 == "enter" )
        {
            this.toJoinRoom( _param2 );
        }else if( _param1 == "moveCell" )
        {
            this.setCurRommLimitInfo( _param2 );
        }
    }

    this.toJoinRoom = function(_param)
    {
        ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.FISHINGROOM,resList:PreLoadList.getInstance().fishingRoom});
    }

    this.setCurRommLimitInfo = function(limit){
        //this.FLRoomTypeSubUI.blbCurRoomLimit.text = "最低金额：￥" + Tools.getInstance().ChangeUIShow(limit);
    }


    this.gc = function()
    {
        this.RoomTypeView.gc();
        //FLRoomMgr.getInstance().RemoveListerner();

        /*MessageCallbackPro.removeCallbackFunc( EventType.Type.enterRoomSuccess,this.onEnterRoomSuccess,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.leaveGame,this.onLeaveGameSuccess,this );
        MessageCallbackPro.removeCallbackFunc( EventType.Type.getFLKeyRoomServerID,this.onServerIDBack,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.deleteFLRoomKey,this.onDeleteKeyRoomSucc,this ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.createFLKeyRoomSucc,this.onCreateRoomSucc,this);

        this.RoomTypeView.playDemoBtn.off( Event.CLICK,this,this.onPlayDemoBtn);
        this.RoomTypeView.btnCreateRoom.off(Event.CLICK,this,this.onClickCreateRoomBtn);
        this.RoomTypeView.btnSelectRoom.off(Event.CLICK,this,this.onClickJoinRoomBtn);
        this.RoomTypeView.btnJoinMyRoom.off(Event.CLICK,this,this.onJoinMyRoomBtn);
        this.RoomTypeView.btnDeleteMyRoom.off(Event.CLICK,this,this.onDeleteMyRoomBtn);
        this.RoomTypeView.gmBtn.off(Event.CLICK,this,this.onGMBtnClick);*/
    }
    
}