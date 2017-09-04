
function RandomReqView()
{
    RandomReqView.super(this);
    var ArrReq = 
    [
        {"proID":"CG_LOGIN_MANAGER_REQ","content":{"userID":"44622","tokenID":"f29adbe7-0cdd-4ae6-8e24-8822990cacd2"}},
        {"proID":"CG_GET_HEAD_PORTRAIT_REQ","content":{}},
        {"proID":"CG_GET_ALL_MAILS_REQ","content":{}},
        {"proID":"CG_GET_ALL_TASK_REQ","content":{}},
        {"proID":"CG_GET_TOTAL_USER_COUNT_REQ","content":{}},
        {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}},
        {"proID":"CG_GET_BANK_MONEY_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_GET_TOTAL_USER_COUNT_REQ","content":{}},
        {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}},
        {"proID":"CG_ENTER_GAME_REQ","content":{"gameName":"eShowhand"}},
        {"proID":"CG_ENTER_GAME_REQ","content":{"gameName":"eShowhand"}},
        {"proID":"CG_ENTER_GAME_REQ","content":{"gameName":"eShowhand"}},
        {"proID":"CG_ENTER_GAME_REQ","content":{"gameName":"eShowhand"}},
        {"proID":"CG_ENTER_GAME_REQ","content":{"gameName":"eShowhand"}},
        {"proID":"CG_ENTER_GAME_REQ","content":{"gameName":"eShowhand"}},
        {"proID":"CG_ENTER_GAME_REQ","content":{"gameName":"eShowhand"}},


        {"proID":"CG_GET_SHOWHAND_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_GAME_USER_COUNT_REQ","content":{"gameType":"eShowhand"}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_GET_SHOWHAND_KEYROOM_PARAM_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_GET_BANK_MONEY_REQ","content":{}},
        {"proID":"CG_CHARGE_BANK_MONEY_REQ","content":{"chargeMoney":100000}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_GET_BANK_MONEY_REQ","content":{}},
        {"proID":"CG_GET_GAME_USER_COUNT_REQ","content":{"gameType":"eShowhand"}},
        {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}},
        {"proID":"CG_CHARGE_BANK_MONEY_REQ","content":{"chargeMoney":-10000}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_GET_BANK_MONEY_REQ","content":{}},
        {"proID":"CG_CHARGE_BANK_MONEY_REQ","content":{"chargeMoney":-1000}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_GET_BANK_MONEY_REQ","content":{}},
        {"proID":"CG_CHARGE_BANK_MONEY_REQ","content":{"chargeMoney":1000}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_GET_BANK_MONEY_REQ","content":{}},
        {"proID":"CG_CHARGE_BANK_MONEY_REQ","content":{"chargeMoney":100000}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_GET_PLAYER_RECORD_REQ","content":{"index1":0,"index2":9,"positive":0,"gameType":"eShowhand"}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_GET_BANK_MONEY_REQ","content":{}},
        {"proID":"CG_CHANGE_HEAD_PORTRAIT_REQ","content":{"headP":19}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_GET_BANK_MONEY_REQ","content":{}},
        {"proID":"CG_GET_GAME_USER_COUNT_REQ","content":{"gameType":"eShowhand"}},
        {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}},
        {"proID":"CG_CHANGE_HEAD_PORTRAIT_REQ","content":{"headP":13}},
        {"proID":"CG_GET_GAME_USER_COUNT_REQ","content":{"gameType":"eShowhand"}},
        {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}},
        {"proID":"HEARTBEAT_ACK","content":{}},
        {"proID":"CG_CHATTING_REQ","content":{"receiverType":"eWorld","content":"lalalalala","id":0,"receiverName":null}},
        {"proID":"CG_GET_GAME_USER_COUNT_REQ","content":{"gameType":"eShowhand"}},
        {"proID":"CG_JOIN_SHOWHAND_ROOM_REQ","content":{"type":100}},
        {"proID":"CG_IM_READY_REQ","content":{}},
        {"proID":"CG_GET_BANK_MONEY_REQ","content":{}},
        {"proID":"CG_JOIN_SHOWHAND_ROOM_REQ","content":{"type":100}},
        {"proID":"CG_GET_SHOWHAND_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_ADD_SHOWHAND_KEYROOM_REQ","content":{"baseNote":1000,"maxNote":5000,"minCarry":25000}},
        {"proID":"CG_JOIN_SHOWHAND_KEYROOM_REQ","content":{"roomKey":"193611"}},
        {"proID":"CG_IM_READY_REQ","content":{}},
        {"proID":"CG_LEAVE_SHOWHAND_ROOM_REQ","content":{}},
        {"proID":"CG_GET_SHOWHAND_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_GAME_USER_COUNT_REQ","content":{"gameType":"eShowhand"}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_GET_SHOWHAND_KEYROOM_GAMESERVERID_REQ","content":{"roomKey":"193611"}},
        {"proID":"CG_JOIN_SHOWHAND_KEYROOM_REQ","content":{"roomKey":"193611"}},
        {"proID":"CG_IM_READY_REQ","content":{}},
        {"proID":"CG_GET_GAME_USER_COUNT_REQ","content":{"gameType":"eShowhand"}},
        {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}},
        {"proID":"CG_GET_TOTAL_USER_COUNT_REQ","content":{}},
        {"proID":"CG_ENTER_GAME_REQ","content":{"gameName":"eShowhand"}},
        {"proID":"CG_GET_SHOWHAND_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_JOIN_SHOWHAND_ROOM_REQ","content":{"type":0}},
        {"proID":"CG_IM_READY_REQ","content":{}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActionOver"}},
        {"proID":"CG_JOIN_SHOWHAND_ROOM_REQ","content":{"type":0}},
        {"proID":"CG_GET_SHOWHAND_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_JOIN_SHOWHAND_ROOM_REQ","content":{"type":2}},
        {"proID":"CG_IM_READY_REQ","content":{}},
        {"proID":"CG_JOIN_SHOWHAND_ROOM_REQ","content":{"type":0}},
        {"proID":"CG_GET_SHOWHAND_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_GAME_USER_COUNT_REQ","content":{"gameType":"eShowhand"}},
        {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_JOIN_SHOWHAND_ROOM_REQ","content":{"type":4}},
        {"proID":"CG_IM_READY_REQ","content":{}},
        {"proID":"CG_JOIN_SHOWHAND_ROOM_REQ","content":{"type":4}},
        {"proID":"CG_GET_SHOWHAND_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_JOIN_SHOWHAND_ROOM_REQ","content":{"type":5}},
        {"proID":"CG_IM_READY_REQ","content":{}},
        {"proID":"CG_JOIN_SHOWHAND_ROOM_REQ","content":{"type":4}},
        {"proID":"CG_GET_SHOWHAND_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_GAME_USER_COUNT_REQ","content":{"gameType":"eShowhand"}},
        {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"HEARTBEAT_ACK","content":{}},
        {"proID":"CG_JOIN_SHOWHAND_ROOM_REQ","content":{"type":2}},
        {"proID":"CG_IM_READY_REQ","content":{}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eWaitingGameBegin"}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eGameBegin"}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eTurnBegin"}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"ePutCard"}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActions"}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActionOver"}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActionOver"}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActionOver"}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eTurnOver"}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eTurnBegin"}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"ePutCard"}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActions"}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActionOver"}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActionOver"}},
        {"proID":"CG_REJOIN_SHOWHAND_ROOM_REQ","content":{}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eTurnBegin"}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActions"}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActionBegin"}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActionOver"}},
        {"proID":"CG_IM_READY_REQ","content":{}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActionOver"}},
        {"proID":"CG_JOIN_SHOWHAND_ROOM_REQ","content":{"type":0}},
        {"proID":"CG_GET_SHOWHAND_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_GAME_USER_COUNT_REQ","content":{"gameType":"eShowhand"}},
        {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_JOIN_SHOWHAND_ROOM_REQ","content":{"type":2}},
        {"proID":"CG_IM_READY_REQ","content":{}},
        {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eWaitingGameBegin"}},
        {"proID":"CG_SHOWHAND_ACTION_REQ","content":{"actionMoney":55000}},
        {"proID":"CG_SHOWHAND_ACTION_REQ","content":{"actionMoney":30000}},
        {"proID":"CG_SHOWHAND_ACTION_REQ","content":{"actionMoney":-1}},
        {"proID":"CG_JOIN_SHOWHAND_ROOM_REQ","content":{"type":0}},
        {"proID":"CG_GET_SHOWHAND_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_GAME_USER_COUNT_REQ","content":{"gameType":"eShowhand"}},
        {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_LEAVE_GAME_REQ","content":{"gameName":"eShowhand"}},


        {"proID":"CG_GET_TOTAL_USER_COUNT_REQ","content":{}},
        {"proID":"CG_ENTER_GAME_REQ","content":{"gameName":"eGoldenflower"}},
        {"proID":"CG_GET_GOLDENFLOWER_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_GET_GOLDENFLOWER_KEYROOM_PARAM_REQ","content":{}},
        {"proID":"CG_REMOVE_GOLDENFLOWER_KEYROOM_REQ","content":{"roomKey":"1093238"}},
        {"proID":"CG_ADD_GOLDENFLOWER_KEYROOM_REQ","content":{"baseNote":500,"minRound":3,"maxRound":10,"minCarry":5000}},
        {"proID":"CG_JOIN_GOLDENFLOWER_KEYROOM_REQ","content":{"roomKey":"1066848"}},
        {"proID":"CG_GOLDENFLOWER_IM_READY_REQ","content":{}},
        {"proID":"CG_LEAVE_GOLDENFLOWER_ROOM_REQ","content":{}},
        {"proID":"CG_GET_GOLDENFLOWER_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_GAME_USER_COUNT_REQ","content":{"gameType":"eGoldenflower"}},
        {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_GET_GOLDENFLOWER_KEYROOM_GAMESERVERID_REQ","content":{"roomKey":"124"}},
        {"proID":"CG_GET_GAME_USER_COUNT_REQ","content":{"gameType":"eGoldenflower"}},
        {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}},
        {"proID":"CG_JOIN_GOLDENFLOWER_ROOM_REQ","content":{"type":100}},
        {"proID":"CG_GOLDENFLOWER_IM_READY_REQ","content":{}},
        {"proID":"CG_JOIN_GOLDENFLOWER_ROOM_REQ","content":{"type":2}},
        {"proID":"CG_GET_GOLDENFLOWER_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_JOIN_GOLDENFLOWER_ROOM_REQ","content":{"type":2}},
        {"proID":"CG_GOLDENFLOWER_IM_READY_REQ","content":{}},
        {"proID":"CG_JOIN_GOLDENFLOWER_ROOM_REQ","content":{"type":2}},
        {"proID":"CG_GET_GOLDENFLOWER_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_JOIN_GOLDENFLOWER_ROOM_REQ","content":{"type":0}},
        {"proID":"CG_GOLDENFLOWER_IM_READY_REQ","content":{}},
        {"proID":"CG_GOLDENFLOWER_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eWaitingGameBegin"}},
        {"proID":"CG_JOIN_GOLDENFLOWER_ROOM_REQ","content":{"type":2}},
        {"proID":"CG_GET_GOLDENFLOWER_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_GAME_USER_COUNT_REQ","content":{"gameType":"eGoldenflower"}},
        {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_JOIN_GOLDENFLOWER_ROOM_REQ","content":{"type":4}},
        {"proID":"CG_GOLDENFLOWER_IM_READY_REQ","content":{}},
        {"proID":"CG_JOIN_GOLDENFLOWER_ROOM_REQ","content":{"type":2}},
        {"proID":"CG_GET_GOLDENFLOWER_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_JOIN_GOLDENFLOWER_ROOM_REQ","content":{"type":3}},
        {"proID":"CG_GOLDENFLOWER_IM_READY_REQ","content":{}},
        {"proID":"CG_JOIN_GOLDENFLOWER_ROOM_REQ","content":{"type":2}},
        {"proID":"CG_GET_GOLDENFLOWER_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_JOIN_GOLDENFLOWER_ROOM_REQ","content":{"type":0}},
        {"proID":"CG_GOLDENFLOWER_IM_READY_REQ","content":{}},
        {"proID":"CG_GOLDENFLOWER_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eWaitingGameBegin"}},
        {"proID":"CG_REJOIN_GOLDENFLOWER_ROOM_REQ","content":{}},
        {"proID":"CG_GOLDENFLOWER_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eTurnBegin"}},
        {"proID":"CG_GOLDENFLOWER_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActions"}},
        {"proID":"CG_GOLDENFLOWER_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActionOver"}},
        {"proID":"CG_GOLDENFLOWER_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActionBegin"}},
        {"proID":"CG_GOLDENFLOWER_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eWaitingGameBegin"}},
        {"proID":"CG_GOLDENFLOWER_IM_READY_REQ","content":{}},
        {"proID":"CG_GOLDENFLOWER_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eWaitingGameBegin"}},
        {"proID":"HEARTBEAT_ACK","content":{}},
        {"proID":"CG_GOLDENFLOWER_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eGameBegin"}},
        {"proID":"CG_GOLDENFLOWER_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActionBegin"}},
        {"proID":"CG_GOLDENFLOWER_LOOK_CARDS_REQ","content":{}},
        {"proID":"CG_GOLDENFLOWER_ACTION_REQ","content":{"actionMoney":1000}},
        {"proID":"CG_GOLDENFLOWER_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActionBegin"}},
        {"proID":"CG_GOLDENFLOWER_COMPLETE_ROOM_STATE_NTF","content":{"rState":"eActionBegin"}},
        {"proID":"CG_GOLDENFLOWER_ACTION_REQ","content":{"actionMoney":8000}},
        {"proID":"CG_GOLDENFLOWER_COMPLETE_ROOM_STATE_NTF","content":{"rState":"ePK"}},
        {"proID":"CG_REJOIN_GOLDENFLOWER_ROOM_REQ","content":{}},
        {"proID":"CG_GOLDENFLOWER_IM_READY_REQ","content":{}},
        {"proID":"CG_GOLDENFLOWER_ACTION_REQ","content":{"actionMoney":-1}},
        {"proID":"CG_GOLDENFLOWER_LOOK_CARDS_REQ","content":{}},
        {"proID":"CG_GOLDENFLOWER_ACTION_REQ","content":{"actionMoney":1000}},
        {"proID":"CG_GOLDENFLOWER_ACTION_REQ","content":{"actionMoney":1}},
        {"proID":"CG_GOLDENFLOWER_ACTION_REQ","content":{"actionMoney":4000}},
        {"proID":"CG_GOLDENFLOWER_ACTION_REQ","content":{"actionMoney":8000}},
        {"proID":"CG_GOLDENFLOWER_LOOK_CARDS_REQ","content":{}},
        {"proID":"CG_JOIN_GOLDENFLOWER_ROOM_REQ","content":{"type":2}},
        {"proID":"CG_GET_GOLDENFLOWER_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_GAME_USER_COUNT_REQ","content":{"gameType":"eGoldenflower"}},
        {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"CG_JOIN_GOLDENFLOWER_ROOM_REQ","content":{"type":1}},
        {"proID":"CG_GOLDENFLOWER_IM_READY_REQ","content":{}},
        {"proID":"CG_JOIN_GOLDENFLOWER_ROOM_REQ","content":{"type":2}},
        {"proID":"CG_GET_GOLDENFLOWER_KEYROOM_REQ","content":{}},
        {"proID":"CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ","content":{}},
        {"proID":"CG_GET_MONEY_REQ","content":{}},
        {"proID":"HEARTBEAT_ACK","content":{}},
        {"proID":"CG_LEAVE_GAME_REQ","content":{"gameName":"eGoldenflower"}},
        {"proID":"CG_GET_TOTAL_USER_COUNT_REQ","content":{}},
        {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}},
        {"proID":"CG_GET_TOTAL_USER_COUNT_REQ","content":{}},
        {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}},
    ];
    var GAP = 1;//步进
    this.lastReq = null;//上一条req
    //从Min到Max 随机整数
    this.getRandomNum = function(Min,Max){   
        var Range = Max - Min;   
        var Rand = Math.random();   
        return(Min + Math.round(Rand * Range));   
    }
    //获取字典中的第i个key
    this.getKeyI = function(i,map){
        var n = 0;
        for(var k in map){
            if(n == i){
                return k;
            }
            n++;
        }
        return "";
    }
    this.getNextReq = function(){
        var curScene = ChangeScene.getInstance().getSceneType();
        var n = (ArrReq.length - 1);
        var i = this.getRandomNum(0,n);
        //i = 0;
        var req = ArrReq[i];
        //提高进入房间的概率
        if((curScene != GameData.getInstance().SCENE_TYPE.GAMEHALL)
            && ((curScene | 0) === curScene)){
            var iR = this.getRandomNum(1,100);
            if(iR > 60){
                req = {"proID":"CG_JOIN_SHOWHAND_ROOM_REQ","content":{"type":100}};
            }
            else if(iR > 30){
                req = {"proID":"CG_JOIN_GOLDENFLOWER_ROOM_REQ","content":{"type":100}};
            }
        }
        //随机游戏名称
        if(req.content.hasOwnProperty("gameName")){
            var min = 0;
            var max = Object.getOwnPropertyNames(GameData.getInstance().gameName).length;
            i = this.getRandomNum(min,1);
            req.content.gameName = this.getKeyI(i,GameData.getInstance().gameName);
            if(req.content.gameName == "eShowhand"){
                GameData.getInstance().curGameType = GameData.getInstance().gameType.eShowhand
            }
            else if(req.content.gameName == "eGoldenflower"){
                GameData.getInstance().curGameType = GameData.getInstance().gameType.eGoldenFlower
            }
        }
        //随机游戏类型
        else if(req.content.hasOwnProperty("gameType")){
            var min = 0;
            var max = Object.getOwnPropertyNames(GameData.getInstance().gameType).length;
            i = this.getRandomNum(min,1);
            req.content.gameType = this.getKeyI(i,GameData.getInstance().gameType);
        }
        //随机转换金额
        else if(req.content.hasOwnProperty("chargeMoney")){
            req.content.chargeMoney = this.getRandomNum(-10000,99999);
        }
        //随机头像
        else if(req.content.hasOwnProperty("headP")){
            req.content.headP = this.getRandomNum(-2,20);
        }
        //随机游戏类型
        else if(req.content.hasOwnProperty("type")){
            i = this.getRandomNum(-2,7);
            if(i == -2) i = 100;
            req.content.type = i;
        }
        //随机投注金额
        else if(req.content.hasOwnProperty("actionMoney")){
            i = this.getRandomNum(-1,100000);
            req.content.actionMoney = i;
        }
        //退出房间的概率设置小一些
        if(req.proID == "CG_LEAVE_GAME_REQ" || 
           req.proID == "CG_LEAVE_GOLDENFLOWER_ROOM_REQ" || req.proID == "CG_LEAVE_SHOWHAND_ROOM_REQ"){
            i = this.getRandomNum(0,100);
            if(i > 10){
                return null;
            }
            else{
                CLog.log("命中 退出游戏房间-------");
            }
        }
        //退出房间的概率设置小一些        
        if((req.proID.indexOf("ROOM_TYPE_LIST_REQ") != -1) && 
            ((curScene | 0) != curScene)){//整数代表不是房间内
            return null;
        }

        var str = JSON.stringify(req);
        return str;
    }
    this.init = function(){
        this.boxClose.on(Event.CLICK,this,this.onCloseClick);
        if(URLParamParse.getInstance().IsLocal()){
            this.boxSend.on(Event.CLICK,this,this.onClickSend);
            this.boxSub.on(Event.CLICK,this,this.onSubClick);
            this.boxAdd.on(Event.CLICK,this,this.onAddClick);
            this.boxNext.on(Event.CLICK,this,this.onNextClick);
            this.boxRandom.on(Event.CLICK,this,this.onRandomClick);
        }
        this.x = Laya.stage.width - this.width;
        this.y = (Laya.stage.height - this.height) >>1;
    };

    this.Show = function(obj,callBack){
        this.visible = true;
    };
    this.onClickSend = function(){
        var wsSocket = GateSocketClient.getInstance().GetSocket();
        if(!wsSocket || !GATE_CONNECTED || this.textInput.text == "") {
            Laya.timer.clearAll(this);
            return;
        }
        if(URLParamParse.getInstance().IsLocal()){
            var jsonData = this.textInput.text;
            var num = this.lblCount.text;
            num = parseInt(num) > 1 ? parseInt(num) : 1;
            if(num < 100){
                for(var i=0;i<num;i++){
                    wsSocket.send(jsonData);
                }
            }
            else{
                wsSocket.send(jsonData);
            }
            CLog.log("<<<<<  req:"+jsonData);
        }     
    }
    this.onCloseClick = function(){
        var open = this.x == (Laya.stage.width - this.width);
        var pX = open ? (Laya.stage.width - 80) : (Laya.stage.width - this.width);        
        this.boxClose.getChildByName('reJoinBtn').scaleX = -this.boxClose.getChildByName('reJoinBtn').scaleX;
        Tween.to(this,{x:pX},200);
    }
    this.onSubClick = function(e){
        var count = parseInt(this.lblCount.text);
        count = count - GAP;
        if(count > 0){
            this.lblCount.text = count;
        }
        if(count >= 100){
            this.toLoopReq();
        }
    }
    this.onAddClick = function(e){
        var count = parseInt(this.lblCount.text);
        count = count + GAP;
        this.lblCount.text = count;
        if(count >= 100){
            this.toLoopReq();
        }
    }
    this.onNextClick = function(e){
        var t = this.getNextReq();
        if(null == t) return;
        this.textInput.text = t;
    }
    this.onRandomClick = function(e){
        //步进改为1000毫秒
        if(GAP === 1){
            GAP = 100;
            this.lblCount.text = "1000";
            this.textTip.text = "间隔毫秒数：";
            this.boxRandom.getChildByName("label").text = "自动";
            this.toLoopReq();
        }
        else{
            GAP = 1;
            this.lblCount.text = "1";
            this.textTip.text = "连续发送次数：";
            this.boxRandom.getChildByName("label").text = "手动";
            Laya.timer.clearAll(this);
        }
    }
    this.toLoopReq = function(){
        var t = this.lblCount.text;
        Laya.timer.clearAll(this);
        Laya.timer.loop(parseInt(t),this,this.sendLoopReq);
    }
    this.sendLoopReq = function(){
        this.onNextClick();
        this.onClickSend();
    }
};