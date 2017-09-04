
var AllInEffect = (function (_super){
    
	var _proto = AllInEffect.prototype;
	
	function AllInEffect(){
		AllInEffect.__super.call(this);

        this.play = function(){
            if(!this._animation){
                this._animation = new Effect();
                this._animation.init("res/atlas/effect/allIn.json",60,true);
                this.addChild( this._animation );
                this._animation.pivotX = 63.5;
                this._animation.pivotY = 65;
                this._animation.visible = false;
                // this._animation.scaleX = this._animation.scaleY = 1.8;
            }            
            this._animation.visible = true;
            this._animation.play();
        }
	}    
	Laya.class(AllInEffect,"AllInEffect",_super);
    
    return AllInEffect;
})(laya.ui.Box);