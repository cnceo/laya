/**
 * 2017 06 19
 * 竖屏加注界面
 */
function ReraiseV(){
    ReraiseV.super( this );
    
    this.init = function( callback,classObj,_hideSlider){
        this._callback = callback;
        this._classObj = classObj;
        this.minValue = 0;
        this.sliderCom = new SliderPro( this.getChildByName('slider'),'vertical' );
        this.sliderCom.init(this.onSlider,this);        
        
        this.raiseTxt = this.getChildByName('reraiseTxt').getChildByName('txt');
    }
     //设置最大注额
    this.setMaxbet = function( _value ){
        var value = _value;
        this.maxValue = _value;
    }
    //设置最低金额
    this.setMinbet = function(value){
        this.minValue = value;
    }
    this.show = function( _show ) {
        if( _show ){
            //this.addListener();
            this.raiseTxt.text = '0';
            this.raiseNum = 0;
            this.setSliderPosition(0);
            this.sliderCom.registerMouseUp(this.onMouseUp,this);
            this.sliderCom.onSliderNodeTouchStart();
            this.visible = true;
        }
        else{
            this.onCancel();
        }        
    }
    
    this.onSlider = function( percent ){
        var slider = percent * this.maxValue;
        var oldValue = this.raiseNum;
        if( percent === 1 ){
            if(oldValue == this.maxValue) return;
            this.raiseNum = this.maxValue;
            var texV = this.maxValue == User.getInstance().GetGameMoney() ? "ALL IN" : Tools.getInstance().ChangeUIShow(this.maxValue)
            this.raiseTxt.text = texV;
        }
        else{
            var num = parseInt(slider / Tools.getInstance().ExactDigit);
            var newValue = num * Tools.getInstance().ExactDigit;
            if(oldValue == newValue) return;            
            this.raiseTxt.text = num;
            this.raiseNum = newValue;
        }
        this.raiseTxtEffect();
    }
    this.onMouseUp = function(e){
        if( this._callback ){
            this._classObj ? this._callback.call( this._classObj ) : _this.callback();
        }
        this.onCancel();
    }
    this.onCancel = function(){
        this.visible = false;
    }
    this.onRaise = function(event){
        var money = 0;
        this.raiseNum = this.raiseNum + parseInt( event.target.getChildByName('txt').text ) * Tools.getInstance().ExactDigit;
        this.raiseTxt.text = Tools.getInstance().ChangeUIShow(this.raiseNum);
        this.raiseTxtEffect();
        this.setSliderPosition(this.raiseNum / this.maxValue);
    } 
    this.setSliderPosition = function(num){
        this.sliderCom.setSliderPos(num);
    }

    this.raiseTxtEffect = function( _value ){
        this.raiseTxt.scale(1,1);
        Tween.to( this.raiseTxt,{scaleX:1.5,scaleY:1.5},50 );
        Tween.to( this.raiseTxt,{scaleX:1,scaleY:1},50,null,null,50 );
    }

    this.getReraiseValue = function(){
        return this.raiseNum;
    }
}