
/*
遮罩层
*/
var MaskView = (function (_super) {
    function MaskView() {
        MaskView.super(this);

       
        this.onClick = function(e){
        }
        this.defaltUI = function(){
            this.blackBg.alpha = 0.02;
            this.boxTip.visible = false;
            this.loadingPic.visible = false;
        }
        this.delayShowLoading = function(){
            var task = new TaskDelay();
            task.callBack = this.showLoading;
            task.classObj = this;
            task.leftTime = 1000;
            TaskDelayManager.getInstance().addTask( task );
        }
        this.showLoading = function(){
            this.randomAnim();
            if(this.massage != null){
                this.boxTip.visible = true;
            }
        }
        this.randomAnim = function(){
            if(this.numAnimationPlay > 0) return;
            var num = Math.random()*3 + 1;//从1到3随机
            this.numAnimationPlay = parseInt(num);
            this.playAnimation();
        }
        // 显示loading界面特效
        this.playAnimation = function()
        {
            if(!this.loadingPic) return;
            this.loadingPic.visible = true;
            if(this.numAnimationPlay <= 0){
                var timeRandom = Math.random() * 2000;
                var task = new TaskDelay();
                task.callBack = this.randomAnim;
                task.classObj = this;
                task.leftTime = timeRandom;
                TaskDelayManager.getInstance().addTask( task ); 
            }
            else{
                this.loadingPic.scaleX = 1;
                var time = 300;
                Tween.clearAll(this.loadingPic);
                Tween.to(this.loadingPic,{scaleX:-1}, time, Ease['strongInOut'],new Handler(this,function(){
                    Tween.to(this.loadingPic,{scaleX:1}, time, Ease['strongInOut'],new Handler(this,this.playAnimation));            
                }));
                this.numAnimationPlay--;
            }        
        }
    }
    Laya.class(MaskView, "MaskView", _super);

    MaskView.prototype.Init = function(){
        this.massage = null;
        this.blackBg.on(Event.CLICK,this,this.onClick );        
        this.name = "MaskView";
        this.loadingPic = this.getChildByName("loadingPic");
        this.Hide();
    };
    MaskView.prototype.Show = function(param){
        if(param.hasOwnProperty("message")){
            this.massage = param.message;
            this.lblTips.anchorX = 0.5;
            this.lblTips.align = "center";
            this.lblTips.text = param.message;
            this.lblTips.anchorX = 0.5;
            this.lblTips.align = "center";
            var width = this.lblTips.width;
            var height = this.lblTips.height;
            
            if(width > 600){
                this.lblTips.width = 600;
                this.lblTips.height = 100;
                this.lblTips.wordWrap = true;        
            }
            this.bgTxt.width = this.lblTips.width + 20;
            this.bgTxt.height = this.lblTips.height + 20;
        }
        
        this.defaltUI();

        if(param.hasOwnProperty("showBg")){
            if(param.showBg) this.blackBg.alpha = 0.85;
        }
        this.visible = true;
        if(param.showLoading == true){
            this.delayShowLoading();            
        }
        
    }
    MaskView.prototype.Hide = function(){
        this.visible = false;
        this.massage = null;
        TaskDelayManager.getInstance().clearTarget(this);
    }

    return MaskView;
})(TipsMessageUI);