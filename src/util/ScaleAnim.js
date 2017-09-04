var ScaleAnim = (function (_super){
    
	var _proto = ScaleAnim.prototype;
	
	function ScaleAnim(){
		ScaleAnim.__super.call(this);
        
        //duration:花费的时间，单位毫秒,animInfo:动画信息,scale:放大倍率
        this.Init = function(duration,scale,animInfo){
            this._duration = duration || 1000;
            this._animInfo = animInfo;
            this.anchorX = this.anchorY = 0.5;
            this._scale = isNaN(parseFloat(scale)) ? 1 : scale;
            if(this._animInfo){
                this._anim = new Effect();
                this._anim.init(this._animInfo.src,80,this._animInfo.loop);
                this.addChild( this._anim );
                this._anim.pivotX = this._animInfo.width >> 1;
                this._anim.pivotY = this._animInfo.height >> 1;
                this._anim.x = this.width >> 1 ;
                this._anim.y = this.height >> 1;
                this._anim.visible = false;
            }
        }
        this.Play = function(){
            Tween.to(this,{scaleX:this._scale,scaleY:this._scale},this._duration/2,null,new Handler(this,function(){
                Tween.to(this,{scaleX:1,scaleY:1},this._duration/2);
            }));
            if(this._anim){
                this._anim.visible = true;
                this._anim.play();
            }
        }
        this.destroy = function(){
            Tween.clearAll(this);
            this.__proto__.destroy();
        }
	}
    

    
	Laya.class(ScaleAnim,"ScaleAnim",_super);
    
    return ScaleAnim;
})(laya.ui.Box);