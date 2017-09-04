
/**
 * 彩金动画 2017 03 07
 */
var CaiJinAnim = (function (_super){
    
	function CaiJinAnim(){
		CaiJinAnim.__super.call(this);
        this._numAnimationPlay = 0;//随机动画的次数
        this._maxNum = 3;//随机的最大次数值
        this.init = function(){
            this.randomAnim();
        }
        this.play = function(){
            var img = this.getChildByName("imgBg");
            img.scaleX = 1;
            if(this._numAnimationPlay <= 0){
                var timeRandom = Math.random() * 10000;
                Laya.timer.once(timeRandom, this, this.randomAnim);
            }
            else{
                var time = 500;
                Tween.clearAll(img);
                Tween.to(img,{scaleX:-1}, time, Ease['strongInOut'],new Handler(this,function(){
                    Tween.to(img,{scaleX:1}, time, Ease['strongInOut'],new Handler(this,this.play));
                }));
                this._numAnimationPlay--;
            }
        }
        //随机动画次数
        this.randomAnim = function(){
            if(this._numAnimationPlay > 0) return;
            var num = Math.random() * this._maxNum + 1;//从1到max随机
            this._numAnimationPlay = parseInt(num);
            this.play();
        }
    }
	Laya.class(CaiJinAnim,"CaiJinAnim",_super);
    
    return CaiJinAnim;
})(laya.ui.Box);