function GoldenFlowerClient()
{
     //客户端准备完毕，一般是指加载资源之类的，请求服务器开始游戏
    this.CG_IM_READY_REQ = function () {
        var jsonData = NetManager.GoldenFlowerMgr.iamReadyReq();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    this.GC_GOLDENFLOWER_IM_READY_ACK = function(content){
        var rState = content.roomInfo.rState;
        //GameData.getInstance().gameRoomData = content.roomInfo;

        if(rState === null || rState === undefined)
        {
            //null代表不在房间内 比如在炸金花大厅(此种情况有可能是由于被踢出房间造成)
            return;
        }
        MessageCallbackPro.messageEmit(EventType.Type.roomInfoAck,content.roomInfo);
    }
    //玩家进入
    this.GC_GOLDENFLOWER_PLAYER_ADD_NTF = function (content){
        CLog.log("玩家进入^^^^^ userPos:"+content.userPos+ "   name:"+content.name);
        MessageCallbackPro.messageEmit(EventType.Type.playerAddNTF,content);
    }
    //玩家退出
    this.GC_GOLDENFLOWER_PLAYER_REMOVE_NTF = function(content){
        CLog.log("玩家退出^^^^^^^ userPos:"+content.userPos);
        MessageCallbackPro.messageEmit(EventType.Type.playerRemoveNTF,content);

    }
    //炸金花开始
    this.GC_GOLDENFLOWER_GAME_START_NTF = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.gameStart,content);
    }
    //炸金花结束
    this.GC_GOLDENFLOWER_GAME_OVER_NTF = function(content){
        CLog.log("炸金花结束......ntf");
        MessageCallbackPro.messageEmit(EventType.Type.gameOverNTF,content);
    }
    
    // //发牌
    // this.GC_GOLDENFLOWER_GIVE_CARD_NTF = function(content){
    //     MessageCallbackPro.messageEmit(EventType.Type.dealCards,content);
    // }
    //某玩家开始下注，所有家都会收到，自己收到就要开始下注
    this.GC_GOLDENFLOWER_ACTION_NTF = function(content){
        CLog.log("玩家开始下注  userPos:"+content.userPos);
        MessageCallbackPro.messageEmit(EventType.Type.in_ones_turn,content);
    }
    //某玩家下注完毕，所有玩家都会收到
    this.GC_GOLDENFLOWER_ACTION_OVER_NTF = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.playerActionOver,content);
    }
    //玩家操作请求
    this.CG_GOLDENFLOWER_ACTION_REQ = function (actionMoney,posPK){
        var jsonData = NetManager.GoldenFlowerMgr.playerAction(parseFloat(actionMoney),posPK);
        GateSocketClient.getInstance().sendMsg(jsonData);
        this.actionMoney = actionMoney;
        CLog.log(jsonData);
    }
    //玩家操作反馈
    this.GC_GOLDENFLOWER_ACTION_ACK = function(content){
        CLog.log("玩家下注反馈:= "+content.errorCode);
        if(GameData.getInstance().isGameHide){ return;}
        if(!content.errorMsg || (content.errorMsg == "")){
        }
        else{
            //当下注返回错误时,重置按钮状态 
            MessageCallbackPro.messageEmit(EventType.Type.oprFailed,content);
            CLog.error("玩家下注:"+this.actionMoney +  "失败反馈："+content.errorMsg);
        }
    }
    //回合开始和结束
    this.GC_GOLDENFLOWER_TURN_STATE_NTF = function(content){
        var s = content.turnState;
        MessageCallbackPro.messageEmit(EventType.Type.turnStateNTF,content);
    }
    
    //聊天消息回馈
    this.GC_CHATTING_ACK = function(content)
    {
        
    }
    //玩家状态变化
    this.GC_GOLDENFLOWER_PLAYER_UPDATE_NTF = function(content){
        //CLog.log("玩家状态变化.............pos:" +content.userPos + " state:"+content.state+"  money:"+content.money);
        MessageCallbackPro.messageEmit(EventType.Type.playerStateUpdate,content);
    }
    //通知玩家需要充钱和对应金额
    this.GC_NEED_CHARGE_MONEY_NTF = function(content){
        CLog.log("通知玩家需要充钱和对应金额 money:"+content.money);
    }
    //玩家希望充钱
    this.CG_CHARGE_MONEY_REQ = function (){
        var jsonData = NetManager.GoldenFlowerMgr.playerChargeMoneyReq();
        GateSocketClient.getInstance().sendMsg(jsonData);
        //CLog.log(jsonData);
    }
    this.GC_CHARGE_MONEY_ACK = function(content){
        //充钱成功反馈，如果不成功需退出游戏
        PFuns.getInstance().showTip("充值成功",2);
    }
    //请求离开炸金花房间
    this.CG_LEAVE_GOLDENFLOWER_ROOM_REQ = function(){
        var jsonData = NetManager.GoldenFlowerMgr.leaveRoom(); 
        GateSocketClient.getInstance().sendMsg(jsonData,'showloading','GC_LEAVE_GOLDENFLOWER_ROOM_ACK','','正在申请离开房间');
        CLog.log(jsonData);
    }
    //离开炸金花房间反馈
    this.GC_LEAVE_GOLDENFLOWER_ROOM_ACK = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.leaveCurRoom);
    }
    //服务器告诉客户端(除了waiting)等待进入某环节
    this.GC_GOLDENFLOWER_WAIT_ROOM_STATE_NTF = function(content){
        CLog.log("服务端发来等待进入:"+content.rState);
        //当游戏进入后台时，直接返回给服务端
        if(GameData.getInstance().isGameHide){
            this.CG_COMPLETE_ROOM_STATE_NTF(content.rState);
        }
        else{
            StatePool.put( content.rState );
            switch (content.rState){
                case GameData.getInstance().gfRoomState.eGameOver:
                    //结算动画播放完后ShowHandManager负责返回消息
                    break;                
                case GameData.getInstance().gfRoomState.eActionBegin:
                    //某个玩家下注，下注动画播放完由Player负责返回消息
                    break;
                case GameData.getInstance().gfRoomState.ePK:
                    //比牌动画播放完由Player负责返回消息
                    break;
                case GameData.getInstance().gfRoomState.eLastPK:
                    //自动比牌
                    break;
                case GameData.getInstance().gfRoomState.eGameBegin:
                    MessageCallbackPro.messageEmit(EventType.Type.ROOM_STATE_GAME_BEGIN);
                    break;
                case GameData.getInstance().gfRoomState.eSettlement:
                    //显示结算界面
                    if(GameData.getInstance().bWaitingESettlement){
                        GameData.getInstance().bWaitingESettlement = false;
                        this.CG_COMPLETE_ROOM_STATE_NTF(content.rState);
                    }
                    break;
                default:
                    this.CG_COMPLETE_ROOM_STATE_NTF(content.rState);
                    break;
            }
        }
    }
    //开始倒计时
    this.GC_GOLDENFLOWER_GAME_BEGIN_COUNTDOWN_NTF = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.GC_GAME_BEGIN_COUNTDOWN_NTF,content);
    }
    //客户端完成某环节，比如发牌完毕，回合准备完毕等
    this.CG_COMPLETE_ROOM_STATE_NTF = function(rState){
        if( rState === 'IsArray' )
        {
            debugger;
        }
        var jsonData = NetManager.GoldenFlowerMgr.roomStateNtf(rState);
        GateSocketClient.getInstance().sendMsg(jsonData);
        //CLog.log("客户端发送:"+rState);
    }
    //炸金花踢掉玩家
    this.GC_GOLDENFLOWER_ROOM_KICK_USER_NTF = function(content){
        CLog.log("收到踢人消息。。。。。");
        new TipsMessage('你被踢出房间...',true,false,2000);
        var task = new TaskDelay();
        task.callBack = GateSocketClient.getInstance().CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ;
        task.classObj = GateSocketClient.getInstance();
        task.leftTime = 2000;
        task.forceExecute = true;
        TaskDelayManager.getInstance().addTask( task );
    }
    //通知玩家被踢倒计时，如果玩家state不是eWaiting就把倒计时取消
    this.GC_GOLDENFLOWER_KICK_USER_COUNTDOWN_NTF = function(content){
        var countdown = content.countdown;
        CLog.log("踢人倒计时："+countdown);
    }
    //请求当前房间信息
    this.CG_GET_GOLDENFLOWER_ROOM_INFO_REQ = function(){
        var jsonData = NetManager.GoldenFlowerMgr.getRoomInfo();
        GateSocketClient.getInstance().sendMsg(jsonData);
        CLog.log("请求当前房间信息");
        Game.getInstance().MaskLayer.Show({message:"正在获取房间信息..", showLoading:true});
    }
    //反馈房间信息
    this.GC_GET_GOLDENFLOWER_ROOM_INFO_ACK = function(content){
        Game.getInstance().MaskLayer.Hide();
        if(content.errorMsg && (content.errorMsg != "")){
            //如果返回错误 回大厅
            GameData.getInstance().iamBack = false;
            GateSocketClient.getInstance().CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ();
        }
        else{
            var rState = content.roomInfo.rState;
            //GameData.getInstance().gameRoomData = content.roomInfo;
            //如果断线或者顶替归来
            if(GameData.getInstance().iamBack){
                if(rState === null || rState === undefined){
                    //null代表不在房间内 比如在炸金花大厅
                    GameData.getInstance().iamBack = false;
                    GateSocketClient.getInstance().CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ();
                }
                else{                
                    NetManager.GameClintInstance = new GoldenFlowerClient();
                    ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.GOLDENFLOWERROOM ,resList:PreLoadList.getInstance().goldenFlowerRoom,tips:"正在重回游戏中.."});
                }
            }
            //正常流程(由炸金花大厅进入)
            else{
                if(rState === null || rState === undefined){
                    //null代表不在房间内 比如在炸金花大厅(此种情况有可能是由于被踢出房间造成)
                    return;
                }
                MessageCallbackPro.messageEmit(EventType.Type.roomInfoAck,content.roomInfo);
            }
        }
    }
    //断线或者顶替归来请求
    this.CG_GOLDENFLOWER_IM_BACK_REQ = function (content) {
        CLog.log(".............CG_IM_BACK_REQ");
        var jsonData = NetManager.GoldenFlowerMgr.iamBack();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    this.GC_GOLDENFLOWER_IM_BACK_ACK = function (content) {
        if(content.errorMsg && (content.errorMsg != "")){
            //如果返回错误 回炸金花大厅
            GameData.getInstance().iamBack = false;
            GateSocketClient.getInstance().CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ();
        }
        else{
            var rState = content.roomInfo.rState;
            //GameData.getInstance().gameRoomData = content.roomInfo;
            //如果断线或者顶替归来
            if(GameData.getInstance().iamBack){
                if(rState === null || rState === undefined){
                    //null代表不在房间内 比如在炸金花大厅
                    GameData.getInstance().iamBack = false;
                    GateSocketClient.getInstance().CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ();
                }
                else{                
                    NetManager.GameClintInstance = new GoldenFlowerClient();
                    ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.GOLDENFLOWERROOM ,resList:PreLoadList.getInstance().goldenFlowerRoom,tips:"正在重回游戏中.."});
                }
            }
        }
    }
    //某玩家提款广播
    this.GC_GOLDENFLOWER_USER_DRAWING_NTF = function(content){
         MessageCallbackPro.messageEmit(EventType.Type.playerCharge,content);
    }
    //进入指定类型的扎金花房间
    this.CG_JOIN_GOLDENFLOWER_ROOM_REQ = function (type){
        var jsonData = NetManager.GoldenFlowerMgr.joninRoom(type);
        GateSocketClient.getInstance().sendMsg(jsonData,"showloading",'GC_JOIN_GOLDENFLOWER_ROOM_ACK',0,'正在申请进入房间');
    };
    //进入指定类型的扎金花房间反馈
    this.GC_JOIN_GOLDENFLOWER_ROOM_ACK = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.enterRoomSuccess);
    };
    //进入指定类型的炸金花房间 (换房)
    this.CG_REJOIN_GOLDENFLOWER_ROOM_REQ = function () {
        var jsonData = NetManager.GoldenFlowerMgr.RejoinRoom();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    //反馈换房
    this.GC_REJOIN_GOLDENFLOWER_ROOM_ACK = function (content) {
        MessageCallbackPro.messageEmit(EventType.Type.reJoinRoomAck,content);               
    }
    //任务状态变化通知
    this.GC_GOLDENFLOWER_TASK_STATUS_ROOM_NTF = function(content){
        TaskInfoManager.getInstance().UpdateTask(content);
        //MessageCallbackPro.messageEmit(EventType.Type.taskUpdate,content);
    };
    //玩家看牌请求
    this.CG_GOLDENFLOWER_LOOK_CARDS_REQ = function () {
        var jsonData = NetManager.GoldenFlowerMgr.lookCards();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    //玩家看牌反馈
    this.GC_GOLDENFLOWER_LOOK_CARDS_ACK = function (content) {
        MessageCallbackPro.messageEmit(EventType.Type.lookCardsAck,content);               
    }
    //玩家PK通知
    this.GC_GOLDENFLOWER_PK_NTF = function(content){
         MessageCallbackPro.messageEmit(EventType.Type.pk,content);
    }
    //首张牌发给哪个位置的玩家
    this.GC_GOLDENFLOWER_FIRST_PUT_CARD_POS_NTF = function(content){        
        MessageCallbackPro.messageEmit(EventType.Type.firstPutCardNTF,content);
    };
    //自动开牌通知
    this.GC_GOLDENFLOWER_LAST_PK_NTF = function(content){
        CLog.log("自动开牌........");
         MessageCallbackPro.messageEmit(EventType.Type.lastPK,content);
    }
    this.CG_GMORDER_CL_REQ = function (gmOrderType,gmOrderContentStr){
        var data = {proID:"CG_GOLDENFLOWER_GMORDER_CL_REQ",content:{gmOrderType:gmOrderType,gmOrderContentStr:gmOrderContentStr}};
        var jsonData = JSON.stringify(data);
        GateSocketClient.getInstance().sendMsg(jsonData);
    };
    this.GC_GOLDENFLOWER_GMORDER_CL_ACK = function(content){
    };

    //获取自定义炸金花房间参数集合
    this.CG_GET_GOLDENFLOWER_KEYROOM_PARAM_REQ = function (){
        GateSocketClient.getInstance().sendMsg(NetManager.GoldenFlowerMgr.getKeyRoomParam());
    };
    this.GC_GET_GOLDENFLOWER_KEYROOM_PARAM_ACK = function(content){
        GFRoomMgr.getInstance().SetRoomParam(content);
    };
    //获取自定义炸金花房间所在服务器ID
    this.CG_GET_GOLDENFLOWER_KEYROOM_GAMESERVERID_REQ = function (key){
        GateSocketClient.getInstance().sendMsg(NetManager.GoldenFlowerMgr.getKeyRoomID(key));
    };
    this.GC_GET_GOLDENFLOWER_KEYROOM_GAMESERVERID_ACK = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.getGFKeyRoomServerID,content);
    };
    //获取自己开的炸金花房间
    this.CG_GET_GOLDENFLOWER_KEYROOM_REQ = function (){
        GateSocketClient.getInstance().sendMsg(NetManager.GoldenFlowerMgr.getKeyRoom());
    };
    this.GC_GET_GOLDENFLOWER_KEYROOM_ACK = function(content){
        GFRoomMgr.getInstance().SetRoomKeys(content.roomKey);
    };
     //创建自定义炸金花房间
    this.CG_ADD_GOLDENFLOWER_KEYROOM_REQ = function (baseNote,minCarry,minRound,maxRound){
        var jsonData = NetManager.GoldenFlowerMgr.addKeyRoom(baseNote,minCarry,minRound,maxRound);
        GateSocketClient.getInstance().sendMsg(jsonData,'showloading','GC_ADD_GOLDENFLOWER_KEYROOM_ACK','','正在申请房间');
    };
    this.GC_ADD_GOLDENFLOWER_KEYROOM_ACK = function(content){
        GFRoomMgr.getInstance().AddRoomKey(content.roomKey);
        MessageCallbackPro.messageEmit(EventType.Type.createGFKeyRoomSucc,content);
    };
     //删除自定义炸金花房间
    this.CG_REMOVE_GOLDENFLOWER_KEYROOM_REQ = function (roomKey){
        GateSocketClient.getInstance().sendMsg(NetManager.GoldenFlowerMgr.removeKeyRoom(roomKey));
    };
    this.GC_REMOVE_GOLDENFLOWER_KEYROOM_ACK = function(content){
        var key = GFRoomMgr.getInstance().RemoveRoomKey(content.roomKey);
        if(key != -1){
            MessageCallbackPro.messageEmit(EventType.Type.deleteGFRoomKey,key);
        }
    };
     //进入带秘钥的炸金花房间
    this.CG_JOIN_GOLDENFLOWER_KEYROOM_REQ = function (roomKey){
        var jsonData = NetManager.GoldenFlowerMgr.joinKeyRoom(roomKey);
        GateSocketClient.getInstance().sendMsg(jsonData,'showloading','GC_JOIN_GOLDENFLOWER_KEYROOM_ACK','','正在申请进入房间');
    };
    this.GC_JOIN_GOLDENFLOWER_KEYROOM_ACK = function(content){
        if(!content.errorMsg || (content.errorMsg == "")){
            MessageCallbackPro.messageEmit(EventType.Type.enterGFKeyRoomSucc);
        }
        else{
            GFRoomMgr.getInstance().SetJoiningKeyRoomReq(false);
        }    
    };
    //客户端回顾炸金花录像请求
    this.CG_GET_GOLDENFLOWER_GAMEREVIEW_REQ = function(recordID){
        var jsonData = NetManager.GoldenFlowerMgr.getGameReview(recordID);
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    //客户端回顾炸金花录像反馈
    this.GC_GET_GOLDENFLOWER_GAMEREVIEW_ACK = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.historyRReviewAck,content);        
    }
}