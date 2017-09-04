/**
 * 斗地主消息
 */
function FightLandlordClient()
{
    //客户端准备完毕，一般是指加载资源之类的，请求服务器开始游戏
    this.CG_IM_READY_REQ = function () {
        var jsonData = NetManager.FightLandlordMgr.iamReadyReq();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    this.GC_FIGHTLANDLORD_IM_READY_ACK = function(content){
        var rState = content.roomInfo.rState;
        //GameData.getInstance().gameRoomData = content.roomInfo;

        if(rState === null || rState === undefined)
        {
            //null代表不在房间内 比如在斗地主大厅(此种情况有可能是由于被踢出房间造成)
            return;
        }
        MessageCallbackPro.messageEmit(EventType.Type.roomInfoAck,content.roomInfo);
    }
        //玩家进入
    this.GC_FIGHTLANDLORD_PLAYER_ADD_NTF = function (content){
        CLog.log("玩家进入^^^^^ userPos:"+content.userPos+ "   name:"+content.name);
        MessageCallbackPro.messageEmit(EventType.Type.playerAddNTF,content);
    }
    //玩家退出
    this.GC_FIGHTLANDLORD_PLAYER_REMOVE_NTF = function(content){
        CLog.log("玩家退出^^^^^^^ userPos:"+content.userPos);
        MessageCallbackPro.messageEmit(EventType.Type.playerRemoveNTF,content);

    }
    //玩家操作请求
    this.CG_FIGHTLANDLORD_ACTION_REQ = function (actionState,callLandlordLv,cards){
        var jsonData = NetManager.FightLandlordMgr.playerAction(actionState,callLandlordLv,cards);
        GateSocketClient.getInstance().sendMsg(jsonData);
        CLog.log(jsonData);
    }

    //回合开始和结束
    this.GC_FIGHTLANDLORD_TURN_STATE_NTF = function(content){
        var s = content.turnState;
        MessageCallbackPro.messageEmit(EventType.Type.turnStateNTF,content);
    }
        //玩家状态变化
    this.GC_FIGHTLANDLORD_PLAYER_UPDATE_NTF = function(content){
        CLog.log("玩家状态变化.............pos:" +content.userPos + " state:"+content.state+"  money:"+content.money);
        MessageCallbackPro.messageEmit(EventType.Type.playerStateUpdate,content);
    }

     //通知玩家需要充钱和对应金额
    this.GC_NEED_CHARGE_MONEY_NTF = function(content){
        CLog.log("通知玩家需要充钱和对应金额 money:"+content.money);
    }
    //玩家希望充钱
    this.CG_CHARGE_MONEY_REQ = function (){
        var jsonData = NetManager.FightLandlordMgr.playerChargeMoneyReq();
        GateSocketClient.getInstance().sendMsg(jsonData);
        //CLog.log(jsonData);
    }
    this.GC_CHARGE_MONEY_ACK = function(content){
        //充钱成功反馈，如果不成功需退出游戏
        PFuns.getInstance().showTip("充值成功",2);
    }
    //请求离开斗地主房间
    this.CG_LEAVE_FIGHTLANDLORD_ROOM_REQ = function(){
        var jsonData = NetManager.FightLandlordMgr.leaveRoom(); 
        GateSocketClient.getInstance().sendMsg(jsonData,'showloading','GC_LEAVE_FIGHTLANDLORD_ROOM_ACK','wait','正在申请离开房间');
        CLog.log(jsonData);
    }

    //服务器告诉客户端(除了waiting)等待进入某环节
    this.GC_FIGHTLANDLORD_WAIT_ROOM_STATE_NTF = function(content){
        CLog.log("服务端发来等待进入:"+content.rState);
        //当游戏进入后台时，直接返回给服务端
        if(GameData.getInstance().isGameHide){
            this.CG_FIGHTLANDLORD_COMPLETE_ROOM_STATE_NTF(content.rState);
        }
        else{
            StatePool.put( content.rState );
            switch (content.rState){
                case FLRoomMgr.getInstance().flRoomState.eWaitingGameBegin:
                    //等待游戏开始
                    break;
                case FLRoomMgr.getInstance().flRoomState.eGameBegin:
                    //游戏开始
                    MessageCallbackPro.messageEmit(EventType.Type.ROOM_STATE_GAME_BEGIN);
                    break;
                case FLRoomMgr.getInstance().flRoomState.ePutCard:
                    //发牌
                    break;    
                case FLRoomMgr.getInstance().flRoomState.eCallLandlord:
                    //某人叫地主
                    break;  
                case FLRoomMgr.getInstance().flRoomState.eCallLandlordPass:
                    //某人不叫地主
                    break;  
                case FLRoomMgr.getInstance().flRoomState.eActionOutPutBeging:
                    //某人出牌开始
                    break;      
                case FLRoomMgr.getInstance().flRoomState.eGameOver:
                    //结算动画播放完后ShowHandManager负责返回消息
                    break;                
                case FLRoomMgr.getInstance().flRoomState.eActionOutPutOver:
                    //某人出牌结束
                    break;
                case FLRoomMgr.getInstance().flRoomState.eSettlement:
                    //显示结算界面
                    if(GameData.getInstance().bWaitingESettlement){
                        GameData.getInstance().bWaitingESettlement = false;
                        this.CG_FIGHTLANDLORD_COMPLETE_ROOM_STATE_NTF(content.rState);
                    }
                    break;
                default:
                    this.CG_FIGHTLANDLORD_COMPLETE_ROOM_STATE_NTF(content.rState);
                    break;
            }
        }
    }

    this.GC_FIGHTLANDLORD_SHOWCARDS_DEPOSIT_ACK = function( content )
    {
        
    }

    //托管或者明牌
    this.CG_FIGHTLANDLORD_SHOWCARDS_DEPOSIT_REQ = function( _type )
    {
        var jsonData = NetManager.FightLandlordMgr.showCards_Deposit(_type);
        GateSocketClient.getInstance().sendMsg(jsonData);
    }

    //客户端完成某环节，比如发牌完毕，回合准备完毕等
    this.CG_FIGHTLANDLORD_COMPLETE_ROOM_STATE_NTF = function(rState){
        if( rState === 'IsArray' )
        {
            debugger;
        }
        var jsonData = NetManager.FightLandlordMgr.roomStateNtf(rState);
        GateSocketClient.getInstance().sendMsg(jsonData);
        //CLog.log("客户端发送:"+rState);
    }
    //斗地主踢掉玩家
    this.GC_FIGHTLANDLORD_ROOM_KICK_USER_NTF = function(content){
        CLog.log("收到踢人消息。。。。。");
        new TipsMessage('你被踢出房间...',true,false,2000);
        var task = new TaskDelay();
        task.callBack = GateSocketClient.getInstance().CG_GET_FIGHTLANDLORD_ROOM_TYPE_LIST_REQ;
        task.classObj = GateSocketClient.getInstance();
        task.leftTime = 2000;
        task.forceExecute = true;
        TaskDelayManager.getInstance().addTask( task );
    }
    //通知玩家被踢倒计时，如果玩家state不是eWaiting就把倒计时取消
    this.GC_FIGHTLANDLORD_KICK_USER_COUNTDOWN_NTF = function(content){
        var countdown = content.countdown;
        CLog.log("踢人倒计时："+countdown);
    }
    //请求当前房间信息
    this.CG_GET_FIGHTLANDLORD_ROOM_INFO_REQ = function(){
        var jsonData = NetManager.FightLandlordMgr.getRoomInfo();
        GateSocketClient.getInstance().sendMsg(jsonData);
        CLog.log(jsonData);
    }
    //反馈房间信息
    this.GC_GET_FIGHTLANDLORD_ROOM_INFO_ACK = function(content){
        var rState = content.roomInfo.rState;
        //GameData.getInstance().gameRoomData = content.roomInfo;
        //如果断线或者顶替归来
        if(GameData.getInstance().iamBack){
            if(rState === null || rState === undefined){
                //null代表不在房间内 比如在斗地主大厅
                GameData.getInstance().iamBack = false;
                GateSocketClient.getInstance().CG_GET_FIGHTLANDLORD_ROOM_TYPE_LIST_REQ();
            }
            else{                
                NetManager.GameClintInstance = new FightLoadlordClient();
                ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.FLROOM ,resList:PreLoadList.getInstance().FLRoom});
            }
        }
        //正常流程(由斗地主大厅进入)
        else{
            if(rState === null || rState === undefined){
                //null代表不在房间内 比如在斗地主大厅(此种情况有可能是由于被踢出房间造成)
                return;
            }
            MessageCallbackPro.messageEmit(EventType.Type.roomInfoAck,content.roomInfo);
        }
    }
    //断线或者顶替归来请求
    this.CG_FIGHTLANDLORD_IM_BACK_REQ = function (content) {
        CLog.log("CG_FIGHTLANDLORD_IM_BACK_REQ");
        var jsonData = NetManager.FightLandlordMgr.iamBack();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    this.GC_FIGHTLANDLORD_IM_BACK_ACK = function (content) {
        var rState = content.roomInfo.rState;
        //GameData.getInstance().gameRoomData = content.roomInfo;
        //如果断线或者顶替归来
        if(GameData.getInstance().iamBack){
            if(rState === null || rState === undefined){
                //null代表不在房间内 比如在斗地主大厅
                GameData.getInstance().iamBack = false;
                GateSocketClient.getInstance().CG_GET_FIGHTLANDLORD_ROOM_TYPE_LIST_REQ();
            }
            else{                
                NetManager.GameClintInstance = new FightLandlordClient();
                ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.FLROOM ,resList:PreLoadList.getInstance().FLRoom});
            }
        }
    }
    //某玩家提款广播
    this.GC_FIGHTLANDLORD_USER_DRAWING_NTF = function(content){
         MessageCallbackPro.messageEmit(EventType.Type.playerCharge,content);
    }
    //进入指定类型的扎金花房间
    this.CG_JOIN_FIGHTLANDLORD_ROOM_REQ = function (type){
        var jsonData = NetManager.FightLandlordMgr.joninRoom(type);
        GateSocketClient.getInstance().sendMsg(jsonData,arguments[arguments.length - 1],'GC_JOIN_FIGHTLANDLORD_ROOM_ACK');
    };
    //进入指定类型的扎金花房间反馈
    this.GC_JOIN_FIGHTLANDLORD_ROOM_ACK = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.enterRoomSuccess);
    };
    //进入指定类型的斗地主房间 (换房)
    this.CG_REJOIN_FIGHTLANDLORD_ROOM_REQ = function () {
        var jsonData = NetManager.FightLandlordMgr.RejoinRoom();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    //反馈换房
    this.GC_REJOIN_FIGHTLANDLORD_ROOM_ACK = function (content) {
        MessageCallbackPro.messageEmit(EventType.Type.reJoinRoomAck,content);               
    }
     //首张牌发给哪个位置的玩家
    this.GC_FIGHTLANDLORD_FIRST_PUT_CARD_POS_NTF = function(content){        
        MessageCallbackPro.messageEmit(EventType.Type.firstPutCardNTF,content);
    };

    this.CG_GMORDER_CL_REQ = function (gmOrderType,gmOrderContentStr){
        var data = {proID:"CG_FIGHTLANDLORD_GMORDER_CL_REQ",content:{gmOrderType:gmOrderType,gmOrderContentStr:gmOrderContentStr}};
        var jsonData = JSON.stringify(data);
        GateSocketClient.getInstance().sendMsg(jsonData);
    };
    this.GC_FIGHTLANDLORD_GMORDER_CL_ACK = function(content){
    };
    //获取自定义斗地主房间参数集合
    this.CG_GET_FIGHTLANDLORD_KEYROOM_PARAM_REQ = function (){
        GateSocketClient.getInstance().sendMsg(NetManager.FightLandlordMgr.getKeyRoomParam());
    };
    this.GC_GET_FIGHTLANDLORD_KEYROOM_PARAM_ACK = function(content){
        FLRoomMgr.getInstance().SetRoomParam(content);
    };
    //获取自定义斗地主房间所在服务器ID
    this.CG_GET_FIGHTLANDLORD_KEYROOM_GAMESERVERID_REQ = function (key){
        GateSocketClient.getInstance().sendMsg(NetManager.FightLandlordMgr.getKeyRoomID(key));
    };
    this.GC_GET_FIGHTLANDLORD_KEYROOM_GAMESERVERID_ACK = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.getFLKeyRoomServerID,content);
    };
    //获取自己开的斗地主房间
    this.CG_GET_FIGHTLANDLORD_KEYROOM_REQ = function (){
        GateSocketClient.getInstance().sendMsg(NetManager.FightLandlordMgr.getKeyRoom());
    };
    this.GC_GET_FIGHTLANDLORD_KEYROOM_ACK = function(content){
        FLRoomMgr.getInstance().SetRoomKeys(content.roomKey);
    };
     //创建自定义斗地主房间
    this.CG_ADD_FIGHTLANDLORD_KEYROOM_REQ = function (baseNote,minCarry){
        var jsonData = NetManager.FightLandlordMgr.addKeyRoom(baseNote,minCarry);
        GateSocketClient.getInstance().sendMsg(jsonData,'showloading','GC_ADD_FIGHTLANDLORD_KEYROOM_ACK','','正在申请房间');
    };
    this.GC_ADD_FIGHTLANDLORD_KEYROOM_ACK = function(content){
        FLRoomMgr.getInstance().AddRoomKey(content.roomKey);
        MessageCallbackPro.messageEmit(EventType.Type.createFLKeyRoomSucc,content);
    };
     //删除自定义斗地主房间
    this.CG_REMOVE_FIGHTLANDLORD_KEYROOM_REQ = function (roomKey){
        GateSocketClient.getInstance().sendMsg(NetManager.FightLandlordMgr.removeKeyRoom(roomKey));
    };
    this.GC_REMOVE_FIGHTLANDLORD_KEYROOM_ACK = function(content){
        //FLRoomMgr.getInstance().RemoveRoomKey(content.roomKey);
        var key = FLRoomMgr.getInstance().RemoveRoomKey(content.roomKey);
        if(key != -1){
            MessageCallbackPro.messageEmit(EventType.Type.deleteGFRoomKey,key);
        }
    };
     //进入带秘钥的斗地主房间
    this.CG_JOIN_FIGHTLANDLORD_KEYROOM_REQ = function (roomKey){
        var jsonData = NetManager.FightLandlordMgr.joinKeyRoom(roomKey);
        GateSocketClient.getInstance().sendMsg(jsonData,'showloading','GC_JOIN_FIGHTLANDLORD_KEYROOM_ACK','','正在申请进入房间');
    };
    this.GC_JOIN_FIGHTLANDLORD_KEYROOM_ACK = function(content){
        if(!content.errorMsg || (content.errorMsg == "")){
            MessageCallbackPro.messageEmit(EventType.Type.enterFLKeyRoomSucc);
        }
        else{
            FLRoomMgr.getInstance().SetJoiningKeyRoomReq(false);
        }    
    };
}