/**
 * kaixin 2017 06 21
 */
function TexasHoldemClient()
{
    //客户端准备完毕，一般是指加载资源之类的，请求服务器开始游戏
    this.CG_IM_READY_REQ = function (){
        var jsonData = NetManager.GateClintMgr.iamReadyReq();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    this.GC_IM_READY_ACK = function(content){
        this.EmitRoomInfo( content );
    }

    this.EmitRoomInfo = function(content){
        var rState = content.roomInfo.rState;
        if(rState === null || rState === undefined){
            //null代表不在房间内 比如在梭哈大厅(此种情况有可能是由于被踢出房间造成)
            return;
        }
        MessageCallbackPro.messageEmit(EventType.Type.roomInfoAck,content.roomInfo);
    }
    //客户端完成某环节，比如发牌完毕，回合准备完毕等
    this.CG_COMPLETE_ROOM_STATE_NTF = function(rState){
        // var jsonData = NetManager.GateClintMgr.roomStateNtf(rState);
        // GateSocketClient.getInstance().sendMsg(jsonData);
    }
}