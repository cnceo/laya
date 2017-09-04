/**
 * 2016 06 30 
 */
var NetManager = (function()
{
    var GameClintInstance = null;
    
    var LoginMgr = {
        login : function(userName,password)  {
            var data = {"proID":"CL_LOGIN_REQ","content":{}};
            data.content.userName = userName;
            data.content.password = password;
            data = JSON.stringify(data);
            return data;
        },

        register : function(userName,password){
            var data = {"proID":"CL_REGISTER_REQ","content":{}};
            data.content.userName = userName;
            data.content.password = password;
            data = JSON.stringify(data);
            return data;
        },
        getClintGate : function(){
            var data = {"proID":"CL_GET_CLIENT_GATE_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        Platform_Login : function(userID,password){
            var data = {"proID":"CL_PLATFORM_LOGIN_REQ","content":{}};
            data.content.userID   = userID;
            data.content.password = password;
            data = JSON.stringify(data);
            return data;
        },
        loginDemo : function(){
            var data = {"proID":"CL_LOGIN_DEMO_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        }
    }; 
    
    var GateClintMgr = {

        login: function()
        {
            var data = {"proID":"CG_LOGIN_GATE_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        loginDemo : function(){
            var data = {"proID":"CG_LOGIN_DEMO_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        loginManager : function(userID,tokenID){
            var data = {"proID":"CG_LOGIN_MANAGER_REQ","content":{}};
            data.content.userID = userID;
            data.content.tokenID = tokenID;
            data = JSON.stringify(data);
            return data;
        },
        gameLstReq : function(){
            var data = {"proID":"CG_GET_GAME_LIST_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        enterGameReq : function(entryGame,gameServerID){
            var data = {"proID":"CG_ENTER_GAME_REQ","content":{}};
            data.content.gameName = entryGame;
            if(gameServerID) data.content.gameServerID = gameServerID;
            data = JSON.stringify(data);
            return data;
        },
        leaveGameReq : function(gameName){
            var data = {"proID":"CG_LEAVE_GAME_REQ","content":{}};
            data.content.gameName = gameName;
            data = JSON.stringify(data);
            return data;
        },
        showHandRoomTypeReq : function(){
            var data = {"proID":"CG_GET_SHOWHAND_ROOM_TYPE_LIST_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        goldenFlowerRoomTypeReq : function(){
            var data = {"proID":"CG_GET_GOLDENFLOWER_ROOM_TYPE_LIST_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        fightLandlordRoomTypeReq : function(){
            var data = {"proID":"CG_GET_FIGHTLANDLORD_ROOM_TYPE_LIST_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        joinfightLandlordRoomReq : function(type){
            var data = {"proID":"CG_JOIN_FIGHTLANDLORD_ROOM_REQ","content":{}};
            data.content.type = type;
            data = JSON.stringify(data);
            return data;
        },
        joinShowHandRoomReq : function(type){
            var data = {"proID":"CG_JOIN_SHOWHAND_ROOM_REQ","content":{}};
            data.content.type = type;
            data = JSON.stringify(data);
            return data;
        },
        iamReadyReq : function(){
            var data = {"proID":"CG_IM_READY_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        //请求下注
        playerBetReq : function (actionMoney) {
            var data = {"proID":"CG_SHOWHAND_ACTION_REQ","content":{}};
            data.content.actionMoney = parseInt(actionMoney);
            data = JSON.stringify(data);
            return data;
        },
        //请求充值
        playerChargeMoneyReq : function(){
            var data = {"proID":"CG_CHARGE_MONEY_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        //客户端完成某环节，比如发牌完毕，回合准备完毕等
        roomStateNtf : function(rState){
            var data = {"proID":"CG_COMPLETE_ROOM_STATE_NTF","content":{}};
            data.content.rState = rState;
            data = JSON.stringify(data);
            return data;
        },
        getRoomInfo : function(){
            var data = {"proID":"CG_GET_ROOM_INFO_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        //客户端挂起通知
        inactive : function(){
            var data = {"proID":"CG_INACTIVE_NTF","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        //客户端激活请求
        active : function(arg){
            var data = {"proID":"CG_ACTIVE_REQ","content":{}};
            data.userDate = arg;
            data = JSON.stringify(data);
            return data;
        },
        //聊天请求
        chatting : function(receiverType,content,id,receiverName){
            var data = {"proID":"CG_CHATTING_REQ","content":{}};
            data.content.receiverType = receiverType;
            data.content.content = content;
            data.content.id = id;
            data.content.receiverName = receiverName;
            data = JSON.stringify(data);
            return data;
        },
        //
        iamBack : function () {
            var data = {"proID":"CG_IM_BACK_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        //历史记录
        GetPlayerRecord : function(gameType){
            var data = {"proID":"CG_GET_PLAYER_RECORD_REQ","content":{}};
            data.content.index1 = 0;
            data.content.index2 = 9;
            data.content.positive = 0;
            data.content.gameType = gameType;
            data = JSON.stringify(data);
            return data;
        },
        //获取玩家金额请求
        GetPlayerMoney : function() {
            var data = {"proID":"CG_GET_MONEY_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        GetBankMoney : function() {
            var data = {"proID":"CG_GET_BANK_MONEY_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        ChargeBankMoney : function(money){
            var data = {"proID":"CG_CHARGE_BANK_MONEY_REQ","content":{}};
            data.content.chargeMoney = parseInt( money) ;
            data = JSON.stringify(data);
            return data;
        },
        BankToShowHand : function(money){
            var data = {"proID":"CG_SHOWHAND_CHARGE_BANK_MONEY_REQ","content":{}};
            data.content.chargeMoney = parseInt(money);
            data = JSON.stringify(data);
            return data;
        },
        GetTotalUserCount : function(){
            var data = {"proID":"CG_GET_TOTAL_USER_COUNT_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        GetGameUserCount : function(gameType){
            var data = {"proID":"CG_GET_GAME_USER_COUNT_REQ","content":{}};
            data.content.gameType = gameType;
            data = JSON.stringify(data);
            return data;
        },
        ChangeHead : function(headP){
            var data = {"proID":"CG_CHANGE_HEAD_PORTRAIT_REQ","content":{}};
            data.content.headP = headP;
            data = JSON.stringify(data);
            return data;
        },
        GetHeadID : function(){
            var data = {"proID":"CG_GET_HEAD_PORTRAIT_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        RejoinRoom : function(){
            var data = {"proID":"CG_REJOIN_SHOWHAND_ROOM_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        GetAllMails : function(){
            var data = {"proID":"CG_GET_ALL_MAILS_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        MailOperate : function(mailID,OperateType){
            var data = {"proID":"CG_MAIL_OPERATE_REQ","content":{}};
            data.content.mailID = mailID;
            data.content.OperateType = OperateType;
            data = JSON.stringify(data);
            return data;
        },
        GetMailDetail : function(mailID){
            var data = {"proID":"CG_GET_MAIL_DETAIL_REQ","content":{}};
            data.content.mailID = mailID;
            data = JSON.stringify(data);
            return data;
        },
        GetAllTask : function(){
            var data = {"proID":"CG_GET_ALL_TASK_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        LotteryReq : function(){
            var data = {"proID":"CG_LOTTERY_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        GetTotalWinMoney : function(){
            var data = {"proID":"CG_GET_TOTAL_WINMONEY_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        GetWeekRank : function(beginIndex,endIndex){
            var data = {"proID":"CG_GET_WEEK_RANK_REQ","content":{}};
            data.content.beginIndex = beginIndex;
            data.content.endIndex = endIndex;
            data = JSON.stringify(data);
            return data;
        },
        GetMyWeekRank : function(){
            var data = {"proID":"CG_GET_MY_WEEK_RANK_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        GetJackpotMoney : function(){
            var data = {"proID":"CG_GET_REWARDPOOL_MONEY_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
    };
    var ShowHandMgr = {
        leaveRoom : function(){
            var data = {"proID":"CG_LEAVE_SHOWHAND_ROOM_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        getKeyRoomParam : function(){
            var data = {"proID":"CG_GET_SHOWHAND_KEYROOM_PARAM_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        getKeyRoomID : function(key){
            var data = {"proID":"CG_GET_SHOWHAND_KEYROOM_GAMESERVERID_REQ","content":{}};
            data.content.roomKey = key;
            data = JSON.stringify(data);
            return data;
        },
        getKeyRoom : function(){
            var data = {"proID":"CG_GET_SHOWHAND_KEYROOM_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        addKeyRoom : function(baseNote,maxNote,minCarry){
            var data = {"proID":"CG_ADD_SHOWHAND_KEYROOM_REQ","content":{}};
            data.content.baseNote = baseNote;
            data.content.maxNote = maxNote;
            data.content.minCarry = minCarry;
            data = JSON.stringify(data);
            return data;
        },
        removeKeyRoom : function(roomKey){
            var data = {"proID":"CG_REMOVE_SHOWHAND_KEYROOM_REQ","content":{}};
            data.content.roomKey = roomKey;
            data = JSON.stringify(data);
            return data;
        },
        joinKeyRoom : function(roomKey){
             var data = {"proID":"CG_JOIN_SHOWHAND_KEYROOM_REQ","content":{}};
            data.content.roomKey = roomKey;
            data = JSON.stringify(data);
            return data;
        }
    };
    var GoldenFlowerMgr = {
        joninRoom : function(type){
            var data = {"proID":"CG_JOIN_GOLDENFLOWER_ROOM_REQ","content":{}};
            data.content.type = type;
            data = JSON.stringify(data);
            return data;
        },
        leaveRoom : function(){
            var data = {"proID":"CG_LEAVE_GOLDENFLOWER_ROOM_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        getRoomInfo : function(){
            var data = {"proID":"CG_GET_GOLDENFLOWER_ROOM_INFO_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        iamReadyReq : function(){
            var data = {"proID":"CG_GOLDENFLOWER_IM_READY_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        iamBack : function () {
            var data = {"proID":"CG_GOLDENFLOWER_IM_BACK_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        playerAction : function (actionMoney,posPK) {
            var data = {"proID":"CG_GOLDENFLOWER_ACTION_REQ","content":{}};
            if(actionMoney != null){
                data.content.actionMoney = parseInt(actionMoney);
            }            
            if(posPK != null && posPK != undefined){
                data.content.posPK = posPK;
            }
            data = JSON.stringify(data);
            return data;
        },
        lookCards : function () {
            var data = {"proID":"CG_GOLDENFLOWER_LOOK_CARDS_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        bankToGame : function(money){
             var data = {"proID":"CG_GOLDENFLOWER_CHARGE_BANK_MONEY_REQ","content":{}};
            data.content.chargeMoney = parseInt(money);
            data = JSON.stringify(data);
            return data;
        },
        roomStateNtf : function(rState){
            var data = {"proID":"CG_GOLDENFLOWER_COMPLETE_ROOM_STATE_NTF","content":{}};
            data.content.rState = rState;
            data = JSON.stringify(data);
            return data;
        },
        RejoinRoom : function(){
            var data = {"proID":"CG_REJOIN_GOLDENFLOWER_ROOM_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
         getKeyRoomParam : function(){
            var data = {"proID":"CG_GET_GOLDENFLOWER_KEYROOM_PARAM_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        getKeyRoomID : function(key){
            var data = {"proID":"CG_GET_GOLDENFLOWER_KEYROOM_GAMESERVERID_REQ","content":{}};
            data.content.roomKey = key;
            data = JSON.stringify(data);
            return data;
        },
        getKeyRoom : function(){
            var data = {"proID":"CG_GET_GOLDENFLOWER_KEYROOM_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        addKeyRoom : function(baseNote,minCarry,minRound,maxRound){
            var data = {"proID":"CG_ADD_GOLDENFLOWER_KEYROOM_REQ","content":{}};
            data.content.baseNote = baseNote;
            data.content.minRound = minRound;
            data.content.maxRound = maxRound;
            data.content.minCarry = minCarry;
            data = JSON.stringify(data);
            return data;
        },
        removeKeyRoom : function(roomKey){
            var data = {"proID":"CG_REMOVE_GOLDENFLOWER_KEYROOM_REQ","content":{}};
            data.content.roomKey = roomKey;
            data = JSON.stringify(data);
            return data;
        },
        joinKeyRoom : function(roomKey){
             var data = {"proID":"CG_JOIN_GOLDENFLOWER_KEYROOM_REQ","content":{}};
            data.content.roomKey = roomKey;
            data = JSON.stringify(data);
            return data;
        },
        getGameReview : function(recordID){
            var data = {"proID":"CG_GET_GOLDENFLOWER_GAMEREVIEW_REQ","content":{}};
            data.content.recordID = recordID;
            data = JSON.stringify(data);
            return data;
        },
    };

   var FightLandlordMgr = {
        showCards_Deposit : function(type){
            var data = {"proID":"CG_FIGHTLANDLORD_SHOWCARDS_DEPOSIT_REQ","content":{}};
            data.content.reqType = type;
            data = JSON.stringify(data);
            return data;
        },
        joninRoom : function(type){
            var data = {"proID":"CG_JOIN_FIGHTLANDLORD_ROOM_REQ","content":{}};
            data.content.type = type;
            data = JSON.stringify(data);
            return data;
        },
        leaveRoom : function(){
            var data = {"proID":"CG_LEAVE_FIGHTLANDLORD_ROOM_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        getRoomInfo : function(){
            var data = {"proID":"CG_GET_FIGHTLANDLORD_ROOM_INFO_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        iamReadyReq : function(){
            var data = {"proID":"CG_FIGHTLANDLORD_IM_READY_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        iamBack : function () {
            var data = {"proID":"CG_FIGHTLANDLORD_IM_BACK_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        playerAction : function (actionState,callLandlordLv,cards) {
            var data = {"proID":"CG_FIGHTLANDLORD_ACTION_REQ","content":{}};
            data.content.actionState    = actionState;
            data.content.callLandlordLv = callLandlordLv;
            data.content.cards = cards;
            data = JSON.stringify(data);
            return data;
        },
        bankToGame : function(money){
             var data = {"proID":"CG_FIGHTLANDLORD_CHARGE_BANK_MONEY_REQ","content":{}};
            data.content.chargeMoney = parseInt(money);
            data = JSON.stringify(data);
            return data;
        },
        roomStateNtf : function(rState){
            var data = {"proID":"CG_FIGHTLANDLORD_COMPLETE_ROOM_STATE_NTF","content":{}};
            data.content.rState = rState;
            data = JSON.stringify(data);
            return data;
        },
        RejoinRoom : function(){
            var data = {"proID":"CG_REJOIN_FIGHTLANDLORD_ROOM_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        getKeyRoomParam : function(){
            var data = {"proID":"CG_GET_FIGHTLANDLORD_KEYROOM_PARAM_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        getKeyRoomID : function(key){
            var data = {"proID":"CG_GET_FIGHTLANDLORD_KEYROOM_GAMESERVERID_REQ","content":{}};
            data.content.roomKey = key;
            data = JSON.stringify(data);
            return data;
        },
        getKeyRoom : function(){
            var data = {"proID":"CG_GET_FIGHTLANDLORD_KEYROOM_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        addKeyRoom : function(baseNote,minCarry,minRound,maxRound){
            var data = {"proID":"CG_ADD_FIGHTLANDLORD_KEYROOM_REQ","content":{}};
            data.content.baseNote = baseNote;
            data.content.minCarry = minCarry;
            data = JSON.stringify(data);
            return data;
        },
        removeKeyRoom : function(roomKey){
            var data = {"proID":"CG_REMOVE_FIGHTLANDLORD_KEYROOM_REQ","content":{}};
            data.content.roomKey = roomKey;
            data = JSON.stringify(data);
            return data;
        },
        joinKeyRoom : function(roomKey){
             var data = {"proID":"CG_JOIN_FIGHTLANDLORD_KEYROOM_REQ","content":{}};
            data.content.roomKey = roomKey;
            data = JSON.stringify(data);
            return data;
        },
   }; 
    
   var HeartBeat = {
        req : function() {
            var data = {"proID":"HEARTBEAT_REQ","content":{}};
            data = JSON.stringify(data);
            return data;
        },
        ack : function (params) {
            var data = {"proID":"HEARTBEAT_ACK","content":{}};
            data = JSON.stringify(data);
            return data;
        }
    }; 
    // 通过返回命名空间对象将API导出
    return {
        GameClintInstance : GameClintInstance,
        LoginMgr : LoginMgr,
        GateClintMgr : GateClintMgr,
        ShowHandMgr : ShowHandMgr,
        GoldenFlowerMgr : GoldenFlowerMgr,
        FightLandlordMgr : FightLandlordMgr,
        HeartBeat:HeartBeat,
    };
})();