
/**
 * 录像控制器基类
 */
var BaseReviewController = (function(_super){
    function _BaseReviewController(sceneID,sourceID){
        this.name = '_BaseReviewController';
        this.sceneID = sceneID;
        this.sourceID = sourceID;
        this.loop = false;
        this.gameData = {};//原始数据
        this.curRevordID = null;//当前记录
        this.preScenceID = null;//记录当前场景
        this.beginTime = null;//开局时的初始时间
        this.stepTime = null;
        this.arrProID = [];//所有格式化好的数据
        

        this.onReviewEnd = function(){
            this.replayView.onReviewEnd();
        }
        //由recordID获取录像信息
        this.getReviewByID = function(recordID){
            for(var i in this.gameData){
                if(recordID == i) return this.gameData[i];
            }
            return null;
        }
    }
    Laya.class(_BaseReviewController, "_BaseReviewController", _super);
    ////////////子类需要重写以下方法/////////////
    /**
     * 获取下一条消息
     */
    _BaseReviewController.prototype.GetNextPro = function(){};
    /**
     * 格式化数据
     */
    _BaseReviewController.prototype.SetData = function(data){};
    /**
     * 获取玩家ID信息
     */
    _BaseReviewController.prototype.GetPlayersID = function(){};
    /**
     * 切换视角
     */
    _BaseReviewController.prototype.SwitchPlayerView = function(playerID){};
    ////////////子类需要重写以上方法/////////////


    //切场景
    _BaseReviewController.prototype.ToShowGameReview = function(recordID,data){
        IS_GAME_REVIEW = true;
        if(!data) data = this.getReviewByID(recordID);
        if(!data) return;
        this.gameData[recordID] = data;
        this.curRevordID = recordID;
        this.SetData(Tools.getInstance().CloneObj(data));
        this.preScenceID = ChangeScene.getInstance().getSceneType();
        var commonSrc = PreLoadList.getInstance().GetSrcBySceneID(GameData.getInstance().SCENE_TYPE.GAMEHALL);
        this.preLoadSrc = PreLoadList.getInstance().GetSrcBySceneID(this.preScenceID);
        this.sourceID.push.apply(this.sourceID,commonSrc);
        ChangeScene.getInstance().loadScene({type:this.sceneID,resList:this.sourceID});
    }
    //是否已经有该条记录的录像数据
    _BaseReviewController.prototype.HasDataAlready = function(recordID){
        return (this.getReviewByID(recordID) !== null);
    }
    //准备房间信息
    _BaseReviewController.prototype.PrepareRoomInfo = function(){
        this.replayView = new BaseReplayView(this);
        Game.getInstance().currentScene.addChild(this.replayView);
        this.replayView.init();
    }
    _BaseReviewController.prototype.Clear = function(){
        this.loop = false;
        Game.getInstance().UnPause();
        Game.getInstance().removeUpdate(this);
        IS_GAME_REVIEW = false;
        this.preScenceID = null;
        this.preLoadSrc = null;
        this.beginTime = null;
        this.stepTime = null;
        this.arrProID = [];
        Laya.timer.scale = 1;
        this.bPlayingPro = false;
    }
    //开始播放（从头播放）
    _BaseReviewController.prototype.StartReview = function(){
        this.stepTime = this.beginTime;
        Laya.stage.on( 'hide_window',this,this.onHideWindow );
        Laya.stage.on( 'show_window',this,this.onShowWindow );
        Game.getInstance().addUpdate({callback:this.LoopReview,caller:this});
    }
    //开始播放（暂停后的开始）
    _BaseReviewController.prototype.BeginReview = function(){        
        this.loop = true;
        Game.getInstance().UnPause();
    }
    //暂停播放
    _BaseReviewController.prototype.PauseReview = function(){
        this.loop = false;
        Game.getInstance().Pause();
    }
    //结束播放
    _BaseReviewController.prototype.EndReview = function(){
        Laya.stage.off( 'hide_window',this,this.onHideWindow );
        Laya.stage.off( 'show_window',this,this.onShowWindow );
        this.onReviewEnd();
        ChangeScene.getInstance().loadScene({type:this.preScenceID,resList:this.preLoadSrc,data:{openView:[SetingView,HistoryRecordView]}});
        this.Clear();        
    }

    //重新播放
    _BaseReviewController.prototype.ReplayReview = function(){
        this.stepTime = this.beginTime;
        this.arrProID = [];
        var data = this.getReviewByID(this.curRevordID);
        if(!data) return;
        this.SetData(Tools.getInstance().CloneObj(data));
        this.loop = true;
    }
    _BaseReviewController.prototype.LoopReview = function(dt){
        if(!this.loop || this.bPlayingPro) return;
        var data = this.GetNextPro();
        //获取不到数据表示播放完毕
        if(!data || !data.arr[0]){
            this.loop = false;
            this.onReviewEnd();
        }
        else{
            this.bPlayingPro = true;
            var delay = data.arr[0].serverTime - this.stepTime;
            this.stepTime = data.arr[0].serverTime;
            var task = new TaskDelay();
            task.data = data;
            task.callBack = this.doProID;
            task.classObj = this;
            task.leftTime = delay;
            TaskDelayManager.getInstance().addTask( task );
        }
    }
    //执行当前数据
    _BaseReviewController.prototype.doProID = function(data){
        if(NetManager.GameClintInstance){
            var proID = data.proID;
            if( (typeof NetManager.GameClintInstance[proID] === "function") ){
                NetManager.GameClintInstance[proID](data.arr[0]);
            }
            data.arr.splice(0,1);
            this.bPlayingPro = false;
        }            
        //this.LoopReview();
    }
    //第一个数据中的时间是否大于第二个数据
    _BaseReviewController.prototype.timeMoreThan = function(data1,data2){
        if(!data1 || !data2 || !data1.arr[0] || !data2.arr[0]) return false;
        var t1 = data1.arr[0].serverTime;
        var t2 = data2.arr[0].serverTime;
        return (t1 > t2);
    }
    return _BaseReviewController;
    
})();