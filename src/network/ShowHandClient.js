/**
 * huangandfly 2016 07 05
 */
function ShowHandClient()
{
        //客户端准备完毕，一般是指加载资源之类的，请求服务器开始游戏
    this.CG_IM_READY_REQ = function (){
        var jsonData = NetManager.GateClintMgr.iamReadyReq();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    this.GC_IM_READY_ACK = function(content)
    {
        this.EmitRoomInfo( content );
    }

    this.EmitRoomInfo = function(content)
    {
        var rState = content.roomInfo.rState;
        //GameData.getInstance().gameRoomData = content.roomInfo;

        if(rState === null || rState === undefined)
        {
            //null代表不在房间内 比如在梭哈大厅(此种情况有可能是由于被踢出房间造成)
            return;
        }
        MessageCallbackPro.messageEmit(EventType.Type.roomInfoAck,content.roomInfo);
    }
    //玩家进入
    this.GC_SHOWHAND_PLAYER_ADD_NTF = function (content){
        CLog.log("玩家进入^^^^^ userPos:"+content.userPos+ "   name:"+content.name);
        MessageCallbackPro.messageEmit(EventType.Type.playerAddNTF,content);
    }
    //玩家退出
    this.GC_SHOWHAND_PLAYER_REMOVE_NTF = function(content){
        CLog.log("玩家退出..................userPos:"+content.userPos);
        MessageCallbackPro.messageEmit(EventType.Type.playerRemoveNTF,content);
    }
    //梭哈开始
    this.GC_SHOWHAND_GAME_START_NTF = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.gameStart,content);
    }
    //梭哈结束
    this.GC_SHOWHAND_GAME_OVER_NTF = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.gameOverNTF,content);
    }
    
    //发牌
    this.GC_SHOWHAND_GIVE_CARD_NTF = function(content){
        //CLog.log("发牌");
        MessageCallbackPro.messageEmit(EventType.Type.dealCards,content);
    }
    //某玩家开始下注，所有家都会收到，自己收到就要开始下注
    this.GC_SHOWHAND_ACTION_NTF = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.in_ones_turn,content);
    }
    //某玩家下注完毕，所有玩家都会收到
    this.GC_SHOWHAND_ACTION_OVER_NTF = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.playerActionOver,content);
    }
    //玩家下注请求
    this.CG_SHOWHAND_ACTION_REQ = function (actionMoney){
        CLog.log("客户端发送 下注请求:"+actionMoney);
        if(URLParamParse.getInstance().IsLocal()){
            var date = new Date();
            this._actionReqTime = date.getMilliseconds();
        }        
        this.actionMoney = actionMoney;
        var jsonData = NetManager.GateClintMgr.playerBetReq(actionMoney);
        GateSocketClient.getInstance().sendMsg(jsonData);
        CLog.log(jsonData);
    }
    //玩家下注反馈
    this.GC_SHOWHAND_ACTION_ACK = function(content){
        if(GameData.getInstance().isGameHide){ return;}
        if(URLParamParse.getInstance().IsLocal()){
            var date = new Date();
            var curS = Game.getInstance().currentScene;
            var label = curS.getChildByName("labelTestActionTime");
            if(!label){
                label = new Text();
                label.color = "#ffda5b";
                label.font = "Microsoft YaHei";
                label.fontSize = 30;
                label.pos(1200,730);
                label.name = "labelTestActionTime";
                curS.addChild(label);
            }
            label.text = (date.getMilliseconds() - this._actionReqTime) + "msec";
        } 
        if(!content.errorMsg || (content.errorMsg == "")){
        }
        else{
            //当下注返回错误时,重置按钮状态 
            MessageCallbackPro.messageEmit(EventType.Type.oprFailed,content);
            CLog.error("玩家下注:"+this.actionMoney +  "失败反馈："+content.errorMsg);
        }
    }
    //回合开始和结束
    this.GC_SHOWHAND_TURN_STATE_NTF = function(content){
        //CLog.log("回合开始和结束 state:"+content.turnState);
        MessageCallbackPro.messageEmit(EventType.Type.turnStateNTF,content);
    }
    
    //聊天消息回馈
    this.GC_CHATTING_ACK = function(content)
    {
        
    }
    //玩家状态变化
    this.GC_SHOWHAND_PLAYER_UPDATE_NTF = function(content){
        //CLog.log("玩家状态变化.............pos:" +content.userPos + " state:"+content.state + "   money:"+content.money);
        MessageCallbackPro.messageEmit(EventType.Type.playerStateUpdate,content);
    }
    //通知玩家需要充钱和对应金额
    this.GC_NEED_CHARGE_MONEY_NTF = function(content){
        CLog.log("通知玩家需要充钱和对应金额 money:"+content.money);
    }
    //玩家希望充钱
    this.CG_CHARGE_MONEY_REQ = function (){
        var jsonData = NetManager.GateClintMgr.playerChargeMoneyReq();
        GateSocketClient.getInstance().sendMsg(jsonData);
        //CLog.log(jsonData);
    }
    this.GC_CHARGE_MONEY_ACK = function(content){
        //充钱成功反馈，如果不成功需退出游戏
        PFuns.getInstance().showTip("充值成功",2);
    }
    //请求离开梭哈房间
    this.CG_LEAVE_SHOWHAND_ROOM_REQ = function(){
        var jsonData = NetManager.ShowHandMgr.leaveRoom(); 
        GateSocketClient.getInstance().sendMsg(jsonData,'showloading','GC_LEAVE_SHOWHAND_ROOM_ACK','','正在申请离开房间');
        //CLog.log(jsonData);
    }
    this.GC_LEAVE_SHOWHAND_ROOM_ACK = function(){
        //ShowHandManager.getInstance().gameOver();
        MessageCallbackPro.messageEmit(EventType.Type.leaveCurRoom);
    }
    //服务器告诉客户端(除了waiting)等待进入某环节
    this.GC_WAIT_ROOM_STATE_NTF = function(content){
       // CLog.log("服务端发来等待进入:"+content.rState);     
        //当游戏进入后台时，直接返回给服务端
        if(GameData.getInstance().isGameHide){
            this.CG_COMPLETE_ROOM_STATE_NTF(content.rState);
        }
        else{
            StatePool.put( content.rState );
            switch (content.rState){
                case GameData.getInstance().showhandRoomState.ePutCard:
                    //发牌完毕CardManager负责返回消息
                    break;
                case GameData.getInstance().showhandRoomState.eGameOver:
                    //结算动画播放完后ShowHandManager负责返回消息
                    break;
                case GameData.getInstance().showhandRoomState.eTurnOver:
                    //回合结束清理动画播放完后ShowHandManager负责返回消息
                    break;
                case GameData.getInstance().showhandRoomState.eGotoResult:
                    //某个玩家showHand后直接到结果，发牌完毕CardManager负责返回消息
                    //TODO
                    //ShowHandManager.getInstance().setGameGoToResult(true);
                    break;
                case GameData.getInstance().showhandRoomState.eActionBegin:
                    //某个玩家下注，下注动画播放完由Player负责返回消息
                    break;
                case GameData.getInstance().showhandRoomState.eGameBegin:
                    MessageCallbackPro.messageEmit(EventType.Type.ROOM_STATE_GAME_BEGIN);
                    break;
                case GameData.getInstance().showhandRoomState.eSettlement:
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
    //客户端完成某环节，比如发牌完毕，回合准备完毕等
    this.CG_COMPLETE_ROOM_STATE_NTF = function(rState){
        if( rState === 'IsArray' )
        {
            debugger;
        }
        var jsonData = NetManager.GateClintMgr.roomStateNtf(rState);
        GateSocketClient.getInstance().sendMsg(jsonData);
        //CLog.log("客户端发送:"+rState);
    }
    //梭哈踢掉玩家
    this.GC_SHOWHAND_ROOM_KICK_USER_NTF = function(content){
        CLog.log("收到踢人消息。。。。。");

        //若是在游戏中则直接跳转场景，其他情况如：场景正在切换的时候
        //等待场景完全切换完毕再执行切换场景（GameLayer里进行）

        new TipsMessage('你被踢出房间...',true,false,2000);
        var task = new TaskDelay();
        task.callBack = GateSocketClient.getInstance().CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ;
        task.classObj = GateSocketClient.getInstance();
        task.leftTime = 2000;
        task.forceExecute = true;
        TaskDelayManager.getInstance().addTask( task );
    }
    //通知玩家被踢倒计时，如果玩家state不是eWaiting就把倒计时取消
    this.GC_SHOWHAND_KICK_USER_COUNTDOWN_NTF = function(content){
        var countdown = content.countdown;
        CLog.log("踢人倒计时："+countdown);
    }
    //请求当前房间信息
    this.CG_GET_ROOM_INFO_REQ = function(){
        var jsonData = NetManager.GateClintMgr.getRoomInfo();
        GateSocketClient.getInstance().sendMsg(jsonData);
        CLog.log("请求当前房间信息");
        Game.getInstance().MaskLayer.Show({message:"正在获取房间信息..", showLoading:true});
    }

    //反馈房间信息
    this.GC_GET_ROOM_INFO_ACK = function(content){
        Game.getInstance().MaskLayer.Hide();
        if(content.errorMsg && (content.errorMsg != "")){
            //如果返回错误 回大厅
            GameData.getInstance().iamBack = false;
            GateSocketClient.getInstance().CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ();
        }
        else{
            var rState = content.roomInfo.rState;
            //GameData.getInstance().gameRoomData = content.roomInfo;
            //如果断线或者顶替归来
            if(GameData.getInstance().iamBack){
                if(rState === null || rState === undefined){
                    //null代表不在房间内 比如在梭哈大厅
                    GameData.getInstance().iamBack = false;
                    GateSocketClient.getInstance().CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ();
                }
                else{                
                    NetManager.GameClintInstance = new ShowHandClient();
                    ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.SHOWHANDROOM ,resList:PreLoadList.getInstance().showhandRoom,tips:"正在重回游戏中.."});
                }
            }
            //正常流程(由梭哈大厅进入)
            else{
                if(rState === null || rState === undefined){
                    //null代表不在房间内 比如在梭哈大厅(此种情况有可能是由于被踢出房间造成)
                    return;
                }
                CLog.log("反馈房间信息");
                MessageCallbackPro.messageEmit(EventType.Type.roomInfoAck,content.roomInfo);
            }
        }        
    }
    //断线或者顶替归来请求
    this.CG_IM_BACK_REQ = function (content) {
        CLog.log("CG_IM_BACK_REQ");
        var jsonData = NetManager.GateClintMgr.iamBack();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }

    //断线或者顶替归来反馈
    this.GC_IM_BACK_ACK = function( content )
    {
        if(content.errorMsg && (content.errorMsg != "")){
            //如果返回错误 回大厅
            GameData.getInstance().iamBack = false;
            GateSocketClient.getInstance().CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ();
        }
        else{
            var rState = content.roomInfo.rState;
            //GameData.getInstance().gameRoomData = content.roomInfo;
            //如果断线或者顶替归来
            if(GameData.getInstance().iamBack){
                if(rState === null || rState === undefined){
                    //null代表不在房间内 比如在梭哈大厅
                    GameData.getInstance().iamBack = false;
                    GateSocketClient.getInstance().CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ();
                }
                else{                
                    NetManager.GameClintInstance = new ShowHandClient();
                    ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.SHOWHANDROOM ,resList:PreLoadList.getInstance().showhandRoom,tips:"正在重回游戏中.."});
                }
            }
        }
    }
    
    //某玩家提款广播
    this.GC_USER_DRAWING_NTF = function(content){
        //new HintMessage("玩家:"+content.userPos+"提款"+content.addMoney);
         MessageCallbackPro.messageEmit(EventType.Type.playerCharge,content);
    }
    //进入指定类型的梭哈房间 (换房)
    this.CG_REJOIN_SHOWHAND_ROOM_REQ = function () {
        var jsonData = NetManager.GateClintMgr.RejoinRoom();
        GateSocketClient.getInstance().sendMsg(jsonData);
    }
    //反馈换房
    this.GC_REJOIN_SHOWHAND_ROOM_ACK = function (content) {
        MessageCallbackPro.messageEmit(EventType.Type.reJoinRoomAck,content);               
    }
    //任务状态变化通知
    this.GC_TASK_STATUS_ROOM_NTF = function(content){
        //CLog.log("任务状态变化通知 TaskID:"+content.TaskID + "  StatusDesc:"+content.StatusDesc);
        TaskInfoManager.getInstance().UpdateTask(content);
        //MessageCallbackPro.messageEmit(EventType.Type.taskUpdate,content);
    };
    //首张牌发给哪个位置的玩家
    this.GC_SHOWHAND_FIRST_PUT_CARD_POS_NTF = function(content){        
        MessageCallbackPro.messageEmit(EventType.Type.firstPutCardNTF,content);
    };
    this.CG_GMORDER_CL_REQ = function (gmOrderType,gmOrderContentStr){
        var data = {proID:"CG_SHOWHAND_GMORDER_CL_REQ",content:{gmOrderType:gmOrderType,gmOrderContentStr:gmOrderContentStr}};
        var jsonData = JSON.stringify(data);
        GateSocketClient.getInstance().sendMsg(jsonData);
    };
    this.GC_SHOWHAND_GMORDER_CL_ACK = function(content){
    };

    //获取自定义梭哈房间参数集合
    this.CG_GET_SHOWHAND_KEYROOM_PARAM_REQ = function (){
        GateSocketClient.getInstance().sendMsg(NetManager.ShowHandMgr.getKeyRoomParam());
    };
    this.GC_GET_SHOWHAND_KEYROOM_PARAM_ACK = function(content){
        SHRoomMgr.getInstance().SetRoomParam(content);
    };
    //获取自定义梭哈房间所在服务器ID
    this.CG_GET_SHOWHAND_KEYROOM_GAMESERVERID_REQ = function (key){
        GateSocketClient.getInstance().sendMsg(NetManager.ShowHandMgr.getKeyRoomID(key));
    };
    this.GC_GET_SHOWHAND_KEYROOM_GAMESERVERID_ACK = function(content){
        MessageCallbackPro.messageEmit(EventType.Type.getSHKeyRoomServerID,content);
    };
    //获取自己开的梭哈房间
    this.CG_GET_SHOWHAND_KEYROOM_REQ = function (){
        GateSocketClient.getInstance().sendMsg(NetManager.ShowHandMgr.getKeyRoom());
    };
    this.GC_GET_SHOWHAND_KEYROOM_ACK = function(content){
        SHRoomMgr.getInstance().SetRoomKeys(content.roomKey);
    };
     //创建自定义梭哈房间
    this.CG_ADD_SHOWHAND_KEYROOM_REQ = function (baseNote,maxNote,minCarry){
        var jsonData = NetManager.ShowHandMgr.addKeyRoom(baseNote,maxNote,minCarry);
        GateSocketClient.getInstance().sendMsg(jsonData,'showloading','GC_ADD_SHOWHAND_KEYROOM_ACK','','正在申请房间');
    };
    this.GC_ADD_SHOWHAND_KEYROOM_ACK = function(content){
        SHRoomMgr.getInstance().AddRoomKey(content.roomKey);
        MessageCallbackPro.messageEmit(EventType.Type.createSHKeyRoomSucc,content);
    };
     //删除自定义梭哈房间
    this.CG_REMOVE_SHOWHAND_KEYROOM_REQ = function (roomKey){
        GateSocketClient.getInstance().sendMsg(NetManager.ShowHandMgr.removeKeyRoom(roomKey));
    };
    this.GC_REMOVE_SHOWHAND_KEYROOM_ACK = function(content){
        var key = SHRoomMgr.getInstance().RemoveRoomKey(content.roomKey);
        if(key != -1){
            MessageCallbackPro.messageEmit(EventType.Type.deleteSHRoomKey,key);
        }
    };
     //进入带秘钥的梭哈房间
    this.CG_JOIN_SHOWHAND_KEYROOM_REQ = function (roomKey){
        var jsonData = NetManager.ShowHandMgr.joinKeyRoom(roomKey);
        GateSocketClient.getInstance().sendMsg(jsonData,'showloading','GC_JOIN_SHOWHAND_KEYROOM_ACK','','正在申请进入房间');
    };
    this.GC_JOIN_SHOWHAND_KEYROOM_ACK = function(content){
        if(!content.errorMsg || (content.errorMsg == "")){
            MessageCallbackPro.messageEmit(EventType.Type.enterSHKeyRoomSucc);
        }
        else{
            SHRoomMgr.getInstance().SetJoiningKeyRoomReq(false);
        }        
    };
}

