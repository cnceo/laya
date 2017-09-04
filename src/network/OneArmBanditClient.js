function OneAramBanditClient(){
    //请求奖池信息
    this.CG_OAB_RWD_POOL_MONEY_REQ = function (args){
        var data = {"proID":"CG_OAB_RWD_POOL_MONEY_REQ","content":{oabType : args}};
        var jsonData = JSON.stringify(data);
        GateSocketClient.getInstance().sendMsg(jsonData,arguments[arguments.length - 1]);    
    };
    this.GC_OAB_RWD_POOL_MONEY_ACK = function(content){
        for(var i in content.lstOABRPMoney){
            var oabRPMoney = content.lstOABRPMoney[i];
            var game = OABGameMgr.getInstance().getOABGame(oabRPMoney.oabType.type,oabRPMoney.oabType.level);
            if(game){
                game.setRewardPoolMoney(oabRPMoney.rwdPoolMoney);
            }
        }
    };
    this.CG_JOIN_OAB_ROOM_REQ = function (args){
        var data = {"proID":"CG_JOIN_OAB_ROOM_REQ","content":{oabType : args}};
        var jsonData = JSON.stringify(data);
        GateSocketClient.getInstance().sendMsg(jsonData,arguments[arguments.length - 1]);    
    };

    this._roomMapping = function(type){
        var val = {};
        switch(type){
            case OABEnum.EOABType.eClassicLaPa:{
                val.sceneType = GameData.getInstance().SCENE_TYPE.CLASSIC_LAPA_ROOM;
                val.sceneRes = PreLoadList.getInstance().classicLaPaRoom
                break;
            }
        }
        return val;
    }
    this.GC_JOIN_OAB_ROOM_ACK = function (content){
        var curGame = OABGameMgr.getInstance().getOABGame(content.oabType.type, content.oabType.level);
        if(curGame){
            curGame.MacConfig = content.conf;
            OABGameMgr.getInstance().setCurGame(curGame);
            var val = this._roomMapping(content.oabType.type);
            ChangeScene.getInstance().loadScene({type:val.sceneType, resList:val.sceneRes});
        }else{
            alert("GC_JOIN_OAB_ROOM_ACK房间类型为空！");
        }
    };
    this.CG_LEAVE_OAB_ROOM_REQ = function(args){
         var data = {"proID":"CG_LEAVE_OAB_ROOM_REQ","content":{oabType : args}};
        var jsonData = JSON.stringify(data);
        GateSocketClient.getInstance().sendMsg(jsonData,arguments[arguments.length - 1]);    
    };
    this.GC_LEAVE_OAB_ROOM_ACK = function (content){
         var curGame = OABGameMgr.getInstance().getOABGame(content.oabType.type, content.oabType.level);
        if(curGame){
            OABGameMgr.getInstance().setCurGame(null);
            curGame.removePlayer(curGame.Me);
            ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.OAB_ROOM,resList:PreLoadList.getInstance().oabRoom});
        }else{
            alert("GC_LEAVE_OAB_ROOM_ACK房间类型为空！");
        }
    };
    this.CG_SPIN_LAPA_REQ = function(content){
        var data = {"proID":"CG_SPIN_LAPA_REQ","content":{oabType : content.oabType, betAmount : content.betAmount}};
        var jsonData = JSON.stringify(data);
        GateSocketClient.getInstance().sendMsg(jsonData,arguments[arguments.length - 1]);    
    };

    this.GC_SPIN_LAPA_ACK = function(content){
        var game = OABGameMgr.getInstance().getOABGame(content.oabType.type, content.oabType.level);
        var curGame = OABGameMgr.getInstance().getCurGame();
        if(game == curGame){
            var params = {
                headIcons : content.headIcons,
                blRewards : content.blRewards
            }
            game.Me.play(content);
        }else{
             alert("GC_SPIN_LAPA_ACK不在当前游戏中！");
        }
    };
};