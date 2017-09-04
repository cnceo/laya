EventType = (function() {
    var Type = 
    {
        ///////////////////网络相关/////////////
        socketLoginConnect : "1",
        socketGateConnect : "2",
        gateRegisterAck : "10",
        gateLstAck : "11",
        enterRoomSuccess : "13",
        iamReadyAck : "14",
        playerAddNTF : "15",
        playerRemoveNTF : "16",
        playerActionOver : "17",
        turnStateNTF : "18",//回合开始和结束
        roomInfoAck : "19",//反馈房间信息
        newEmailNTF : "20",//新邮件通知
        emailDetail : "21",//邮件详细内容
        emailOptAck : "22",//邮件操作
        enterGameSuccess : "30",//进入某个具体游戏
        gameStart : "31",//游戏开始
        gameOverNTF : "32",//游戏结束
        dealCards : "33",//发牌
        chat : "40",//聊天信息
        taskUpdate : "50",//任务
        wheelFortune : "51",//转盘抽奖
        lotteryUpdate : "52",//转盘信息变化
        totalWinMoney : '53',//总盈利
        getWeekRank : '54',//周排行
        getMyWeekRank : '55',//自己的周排行
        jackpot : "60",//奖池
        leaveCurRoom:'61',//离开当前游戏的房间
        leaveGame : '70',//离开某个游戏
        updateUserCount : '71',//更新在线人数
        scrollNotice : '72',//滚动公告
        addNotice : '73',//添加常驻公告
        removeNotice : '74',//删除常驻公告
        changeRoomEvent : '75',//更换房间
        reJoinRoomAck : '76',//更换房间消息反馈 
        lookCardsAck : '77',//看牌
        pk : '78',//玩家pk
        lastPK : '79',//自动开牌
        createSHKeyRoomSucc : '80',//创建sh房间成功
        enterSHKeyRoomSucc : '81',//进入带秘钥的sh房间
        getSHKeyRoomServerID : "82",//获sh秘钥房间的服务器ID
        deleteSHRoomKey : "83",//删除自己创建的sh房间

        createGFKeyRoomSucc : '80',//创建炸金花房间成功
        enterGFKeyRoomSucc : '81',//进入带秘钥的gf房间
        getGFKeyRoomServerID : "82",//获取gf秘钥房间的服务器ID
        deleteGFRoomKey : "83",//删除自己创建的gf房间
        gmCommond : "84",

        createFLKeyRoomSucc : '80',//创建斗地主房间成功
        enterFLKeyRoomSucc : '81',//进入带秘钥的斗地主房间
        getFLKeyRoomServerID : "82",//获取斗地主秘钥房间的服务器ID
        deleteFLRoomKey : "83",//删除自己创建的斗地主房间

        ///////////////////界面相关/////////////
        in_ones_turn : "100",
        preOprState : "101",
        redPointUpdate : '102',//红点提示
        preOprFailed : "104",//预操作失败
        oprFailed : "105",//操作失败

        historyRReviewAck : "200",//观看录像返回

        cardShowFace : "300",//玩家看底
        createChips : "301",//创建筹码

        ACTION_OVER_ROOM_STATE : "400",// 动画播放完毕
        
        playerStateUpdate : '500',//玩家状态更新
        playerMoneyChanged : '501',//玩家余额发生变化
        playerCharge : '502',//玩家充值提示
        playerMoneyRoll : '503',//滚动玩家金钱
        firstPutCardNTF : '504',//第一个发牌玩家
        countdownWarning : '505',//倒计时警告
        headInfoEvent : '506',//头像信息
        playerBackMoneyChanged : '507',//用户银行余额变动
        bankChargeEvent : '508',//额度转换
        
        GC_GAME_BEGIN_COUNTDOWN_NTF: 'GC_GAME_BEGIN_COUNTDOWN_NTF',//游戏开始倒计时
        ROOM_STATE_GAME_BEGIN: 'ROOM_STATE_GAME_BEGIN',//游戏开始倒计时
        CG_ACTIVE_ACK:'CG_ACTIVE_ACK',//客户端激活回答
        GC_GET_PLAYER_RECORD_ACK:'GC_GET_PLAYER_RECORD_ACK',
        GC_IM_BACK_ACK : 'GC_IM_BACK_ACK',
        
        // 通过返回命名空间对象将API导出  
        //===============================老虎机相关===============================//
        RWD_POOL_MONEY_CHANGE : "RWD_POOL_MONEY_CHANGE",
        //===============================老虎机相关===============================//
    }
  
    return {
        Type: Type,
    };
})();