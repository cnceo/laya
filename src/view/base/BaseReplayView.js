/**
* BaseReplayView 回放窗口
*/
var BaseReplayView = (function (_super){
	function _BaseReplayView(controller)
    {
		_BaseReplayView.__super.call(this);
        this.controller = controller;
        this.rateFast = 1;//快进倍率
        this.arrPlayerName = [];

        this.init = function(){
            this.anchorX = this.anchorY = 0.5;
            this.x = Laya.stage.width >> 1;
            this.y = Laya.stage.height -100;
            this.btnFast.on(Event.CLICK,this,this.onFastBtnClick);
            this.btnPlay.on(Event.CLICK,this,this.onPlayBtnClick);
            this.btnPause.on(Event.CLICK,this,this.onPauseBtnClick);
            this.initCombobox();
        }
        this.initCombobox = function(){
            this.listPlayerBox.visible = false;return;
            // if(!URLParamParse.getInstance().IsTest()) return;
            // this.listPlayerBox.visible = true;
            // this.arrPlayerName = this.controller.GetPlayersID();
            // var labels = "";
            // for(var i in this.arrPlayerName){
            //     var name = this.arrPlayerName[i];
            //     if(name == "") continue;
            //     labels +=  name + ",";
            // }
            // labels = labels.substring(0,labels.length -1);
            // this.listPlayerBox.labels = labels;
            // this.listPlayerBox.selectedIndex = 0;
            // this.listPlayerBox.selectHandler = new Handler(this,this.onSelectChanged);
        }
        this.onShowWindow = function(){
            this.setTimerScale(1);
        }
        this.onHideWindow = function(){
            this.setTimerScale(0);
        }
        //按下快进按钮
        this.onFastBtnClick = function(e){
            this.rateFast++;
            if(this.rateFast > 3){
                this.rateFast = 1;
            }
            this.setFastTime(this.rateFast);
        }
        //按下暂停按钮
        this.onPauseBtnClick = function(e){
            this.controller.PauseReview();
            if(e && e.target){
                var btnPlay = e.target.parent.getChildByName("btnPlay");
                btnPlay.visible = true;
                e.target.visible = false;
            }
        }
        //按下播放按钮
        this.onPlayBtnClick = function(e){
            this.controller.BeginReview();
            if(e && e.target){
                var btnPause = e.target.parent.getChildByName("btnPause");
                btnPause.visible = true;
                e.target.visible = false;
            }
        }
        //当选择其他视角
        this.onSelectChanged = function(cur){
            var playerID = this.arrPlayerName[cur];
            this.controller.SwitchPlayerView(playerID);
        }
        this.onReviewEnd = function(){
            this.rateFast = 1;
            this.setFastTime(this.rateFast);
        }
        //设置按钮上倍率显示
        this.setFastTime = function(scale){
            this.setTimerScale(scale);
            var txt = this.btnFast.getChildByName('txt');
            if(txt) txt.text = "x" + scale;
        }
        //设置时间倍率
        this.setTimerScale = function(s){
            Laya.timer.scale = s;
        }
    }   
    Laya.class(_BaseReplayView,"_BaseReplayView",_super);//需要先声明，注意此处的位置
    return _BaseReplayView;
})(laya.ui.Box);
