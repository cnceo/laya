var JackpotView = (function (_super) {
    function JackpotView() {
        JackpotView.super(this);

        this._numAnimationPlay = 0;//随机动画的次数
        this._maxNum = 3;//随机的最大次数值
        this._labelValue = this.getChildByName("value");
        this._isUpdate = false;
        this._speedUpdate = 0;

        //做余额的滚动效果
        this.rollMoney = function(){
            if(!this._labelValue || this._speedUpdate == 0) return;
            var target = JackpotMgr.GetCurMoney();
            var nowValue = Math.ceil(this._speedUpdate + this._preMoney);
            if((this._speedUpdate < 0 && nowValue <= target) ||
                (this._speedUpdate > 0 && nowValue >= target)){
                this.updateUI(target);
                this._preMoney = target;
            }
            else {
                this.updateUI(nowValue);
                this._preMoney = nowValue;
            }
        }
        this.updateUI = function(value){
            var bHave = parseFloat(value) > 0;
            var t = bHave ? '￥'+ Tools.getInstance().ChangeUIShow(value) : "获取中..";
            this._labelValue.text = t;
            //this._labelValue.fontSize = bHave ? 25 : 15;
        }
        this.registerListener = function(){
            this.on(Event.CLICK,this,this.onClick);
            MessageCallbackPro.addCallbackFunc( EventType.Type.jackpot,this.updateJackpot,this); 
            Game.getInstance().addUpdate( {callback:this.update,caller:this} );
        }
        this.removeListener = function(){
            this.off(Event.CLICK,this,this.onClick);
            Game.getInstance().removeUpdate(this);
            MessageCallbackPro.removeCallbackFunc( EventType.Type.jackpot,this.updateJackpot,this); 
        }
        this.updateJackpot = function(moneyDelta){
            this._isUpdate = true;
            var target = JackpotMgr.GetCurMoney();
            this._preMoney = target - moneyDelta;
            //每帧需要递增的数额（可能为负数）,在60帧内完成
            this._speedUpdate = (target - this._preMoney) / 30;
            this.doEffect();
        }
        //金钱滚动时的特效
        this.doEffect = function(){
            if(!this.animationMD){
                this.animationMD = new Effect();
                this.animationMD.init("res/atlas/common/jackpot/beihou.json",60,false);
                this.addChild( this.animationMD );
                this.animationMD.pivotX = 110;
                this.animationMD.pivotY = 50;
                this.animationMD.x = this._labelValue.x;
                this.animationMD.y = this._labelValue.y;
                this.setChildIndex(this.animationMD,this.getChildIndex(this._labelValue)-1); 
            }
            this.animationMD.visible = true;
            this.animationMD.play();
            if(!this.animationMF){
                this.animationMF = new Effect();
                this.animationMF.init("res/atlas/common/jackpot/xingxing.json",60,false);
                this._labelValue.addChild( this.animationMF );
                this.animationMF.pivotX = 100;
                this.animationMF.pivotY = 50;
                this.animationMF.x = (this._labelValue.width >> 1) + 25;
                this.animationMF.y = (this._labelValue.height >> 1);
            }
            this.animationMF.visible = true;
            this.animationMF.play();
        }
        //彩池图标动画
        this.playAnim = function(){
            var img = this.getChildByName("imgJackpot");
            img.scaleX = 1;
            if(this._numAnimationPlay <= 0){
                var timeRandom = Math.random() * 10000;
                Laya.timer.once(timeRandom, this, this.randomAnimNum);
            }
            else{
                var time = 500;
                Tween.clearAll(img);
                Tween.to(img,{scaleX:-1}, time, Ease['strongInOut'],new Handler(this,function(){
                    Tween.to(img,{scaleX:1}, time, Ease['strongInOut'],new Handler(this,this.playAnim));
                }));
                this._numAnimationPlay--;
            }
        }
         //随机动画次数
        this.randomAnimNum = function(){
            if(this._numAnimationPlay > 0) return;
            var num = Math.random() * this._maxNum + 1;//从1到max随机
            this._numAnimationPlay = parseInt(num);
            this.playAnim();
        }
        this.onClick = function(e){

        }
        this.update = function(){
            if(!this._isUpdate) return;
            this.rollMoney();
        }
        this.destroy = function(){
            Laya.timer.clearAll(this);
            Tween.clearAll(this);
            var img = this.getChildByName("imgJackpot");
            Tween.clearAll(img);
            this.removeListener();
            this.__proto__.destroy();
        }
    }
    Laya.class(JackpotView, "JackpotView", _super);

    JackpotView.prototype.Init = function(){
        this.randomAnimNum();
        this.registerListener();
        var nowValue = JackpotMgr.GetCurMoney();
        this.updateUI(nowValue);
    };

    return JackpotView;
})(JackpotUI);