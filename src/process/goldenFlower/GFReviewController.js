
/**
 * 炸金花游戏回放
 */
var GFReviewController = (function(_super){
    Laya.class(_GFReviewController, "_GFReviewController", _super);
    function _GFReviewController(){
        BaseReviewController.call(this,GameData.getInstance().SCENE_TYPE.GOLDENFLOWERROOM ,PreLoadList.getInstance().goldenFlowerRoom);
        for(var i in BaseReviewController.prototype){
            _GFReviewController.prototype[i] = BaseReviewController.prototype[i];
        }

        this.name = '_GFReviewController';
        this.playerController = null;

        this.SetPlayerControler = function(playerC){
            this.playerController = playerC;
        }
        this.GetNextPro = function(){
            if(this.arrProID.length === 0) return null;
            if(this.arrProID.length === 1) return this.arrProID[0];
            var j = 0;
            for(var i = 0;i<this.arrProID.length;i++){
                var cur = this.arrProID[j];
                var next = this.arrProID[i];
                if((!cur.arr[0]) || (this.timeMoreThan(cur,next))){
                    j = i;
                }
            }
            var t = (this.arrProID[j].arr[0] ) ? this.arrProID[j].arr[0].serverTime : "---";
            CLog.log("获取："+this.arrProID[j].proID+"  time:"+t);
            return this.arrProID[j];
        }
        //格式化数据 以下数据顺序不可改变 优先级高的在最前面
        this.SetData = function(data){
            if(data.hasOwnProperty("beginState")) this.arrProID.push({arr:[data.beginState],proID:"GC_GET_GOLDENFLOWER_ROOM_INFO_ACK"});
            if(data.hasOwnProperty("gameStart")) this.arrProID.push({arr:data.gameStart,proID:"GC_GOLDENFLOWER_GAME_START_NTF"});
            if(data.hasOwnProperty("playerDataModify")) this.arrProID.push({arr:data.playerDataModify,proID:"GC_GOLDENFLOWER_PLAYER_UPDATE_NTF"});
            if(data.hasOwnProperty("roomStateChange")) this.arrProID.push({arr:data.roomStateChange,proID:"GC_GOLDENFLOWER_WAIT_ROOM_STATE_NTF"});
            if(data.hasOwnProperty("playerCardsData")) this.arrProID.push({arr:data.playerCardsData,proID:"GC_GOLDENFLOWER_LOOK_CARDS_ACK"});
            if(data.hasOwnProperty("playerPKResult")) this.arrProID.push({arr:data.playerPKResult,proID:"GC_GOLDENFLOWER_PK_NTF"});
            if(data.hasOwnProperty("playerActionOver")) this.arrProID.push({arr:data.playerActionOver,proID:"GC_GOLDENFLOWER_ACTION_OVER_NTF"});//某玩家下注完毕
            if(data.hasOwnProperty("playerAction")) this.arrProID.push({arr:data.playerAction,proID:"GC_GOLDENFLOWER_ACTION_NTF"});//轮到某玩家下注           
            if(data.hasOwnProperty("playerLeaveRoom")) this.arrProID.push({arr:data.playerLeaveRoom,proID:"GC_GOLDENFLOWER_PLAYER_REMOVE_NTF"});
            if(data.hasOwnProperty("playerAdd")) this.arrProID.push({arr:data.playerAdd,proID:"GC_GOLDENFLOWER_PLAYER_ADD_NTF"});
            
            if(data.hasOwnProperty("playerlastPKResult")) this.arrProID.push({arr:data.playerlastPKResult,proID:"GC_GOLDENFLOWER_LAST_PK_NTF"});
            if(data.hasOwnProperty("gameOver")) this.arrProID.push({arr:[data.gameOver],proID:"GC_GOLDENFLOWER_GAME_OVER_NTF"});
        }
        this.PrepareRoomInfo = function(){
            BaseReviewController.prototype.PrepareRoomInfo.call(this);
            //给当前游戏类型赋值
            GameData.getInstance().curGameType = GameData.getInstance().gameType.eGoldenFlower;
            var data = this.getReviewByID(this.curRevordID);
            if(!data || !data.beginState) return;
            this.beginTime = data.beginState.serverTime;
            this.StartReview();
        }
        /**
         * 获取玩家信息
         */
        this.GetPlayersID = function(){
            var reviewInfo = this.getReviewByID(this.curRevordID);
            if(!reviewInfo) return;
            var roomInfo = reviewInfo.beginState.roomInfo;
            if(!roomInfo || !roomInfo.hasOwnProperty("users")) return[];
            var arr = [];
            for(var i in roomInfo.users){
                arr.push(roomInfo.users[i].name);
            }
            return arr;
        };
        /**
         * 切换视角
         */
        this.SwitchPlayerView = function(playerID){
            this.playerController.SwitchPlayerView(playerID);            
        };
    }  
    return _GFReviewController;
})();