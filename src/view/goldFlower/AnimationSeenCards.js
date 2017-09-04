
/**
 * 看牌动画 2017 03 09
 */
var AnimationSeenCards = (function (_super){
    
	function AnimationSeenCards(){
		AnimationSeenCards.__super.call(this);
        this._maxNum = 1;
        this._numAnimationPlay = 0;
        this._bShow = false;
        this.init = function(){
            this._numAnimationPlay = 0;
            this._bShow = false;
            Laya.timer.clearAll(this);
        }
        this.play = function(){
            var img = this.getChildByName("icon");
            img.scaleX = 1;
            this._bShow = true;
            if(this._numAnimationPlay <= 0){
                var timeRandom = Math.random() * 10000;
                Laya.timer.once(timeRandom, this, this.randomAnim);
            }
            else{
                var time = 300;
                Tween.clearAll(img);
                Tween.to(img,{scaleX:0}, time, Ease['strongInOut'],new Handler(this,function(){
                    img.skin = img.skin == 'gfRoom/kanpai.png' ? "gfRoom/bet.png" : "gfRoom/kanpai.png";
                    Tween.to(img,{scaleX:1}, time, Ease['strongInOut'],new Handler(this,this.play));
                }));
                this._numAnimationPlay--;
            }
        }
        this.stop = function(){
            this.init();
        }
        //随机动画次数
        this.randomAnim = function(){
            if(!this._bShow || this._numAnimationPlay > 0) return;
            var num = Math.random() * this._maxNum + 1;//从1到max随机
            this._numAnimationPlay = parseInt(num);
            this.play();
        }
        this.onDestory = function(){
            Laya.timer.clearAll(this);
            var img = this.getChildByName("icon");
            if(img) Tween.clearAll(img);
        }
    }
	Laya.class(AnimationSeenCards,"AnimationSeenCards",_super);
    
    return AnimationSeenCards;
})(laya.ui.Box);