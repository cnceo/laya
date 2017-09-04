/**
 * 滑动条处理
 */
function SliderPro( _node ,_sliderType)
{
    this.node = _node;
    this.mode = _sliderType;
    this.callback = null;
    this.classObj = null;
    
    this.init = function(callback,classObj)
    {
        this.barBackMask = this.node.getChildByName('barBackMask');
        this.barBackMask.mask = new Sprite();
        if( this.isVertical() )
        {
            this.barBackMask.mask.pivotY = 0;//this.barBackMask.height;
            this.barBackLength = this.barBackMask.height;
        }else
        {
            this.barBackMask.mask.pivotX = this.barBackMask.width;
            this.barBackLength = this.barBackMask.width;
        }
        this.barBackMask.mask.graphics.drawRect(0,0,this.barBackMask.width,this.barBackMask.height,'0xff0000');
        this.sliderNodeDown = this.node.getChildByName('sliderNodeDown');
        this.touchStartPos = 0;
        this.imgTip = this.sliderNodeDown.getChildByName('imgTip');
        //总距离
        //this.totalDiatance = this.isVertical() ? this.sliderNodeDown.parent.height : this.sliderNodeDown.parent.width;
        
        this.callback = null;
        this.classObj = null;
        
        this.callback = callback;
        this.classObj = classObj;

        this.startMovePos = 0;
        this.initSliderButtonPos();
        if(this.sliderNodeDown){
            this.sliderNodeDown.on( Event.MOUSE_DOWN,this,this.onSliderNodeTouchStart );
        }
    }
    this.showTipsAnim = function(){
        if(this.imgTip){
            this.tipX0 = this.imgTip.x;
            this.tipY0 = this.imgTip.y;
            Laya.timer.loop(200,this,this.loopAnim);
        }
    }
    this.loopAnim = function(){
        if(!this.imgTip) return;
        this.imgTip.visible = true;
        var xPos = this.imgTip.x == this.tipX0 ? this.tipX0 - 2 : this.tipX0;
        var yPos = this.imgTip.y == this.tipY0 ? this.tipY0 - 5 : this.tipY0;
        Tween.to(this.imgTip,{x:xPos,y:yPos},100);
    }
    this.stopTipsAnim = function(){
        if(!this.imgTip) return;
        Tween.clearAll(this);
        Laya.timer.clear(this,this.loopAnim);
        this.imgTip.visible = false;
    }
    
    this.onSliderNodeTouchCancel = function(event)
    {
         Laya.stage.off(Event.MOUSE_MOVE,this,this.onSliderNodeTouchMove);
         Laya.stage.off(Event.MOUSE_UP,this,this.onSliderNodeTouchUp);
         Laya.stage.off(Event.MOUSE_OUT,this,this.onSliderNodeTouchCancel);
    }
    this.onSliderNodeTouchUp = function(event){
        CLog.log(">>>>>>>>>>  on mouse up");
        Laya.stage.off(Event.MOUSE_MOVE,this,this.onSliderNodeTouchMove);
        Laya.stage.off(Event.MOUSE_UP,this,this.onSliderNodeTouchUp);
        Laya.stage.off(Event.MOUSE_OUT,this,this.onSliderNodeTouchCancel);

        if(this.mouseUpCallback && this.mouseUpObj){
            this.mouseUpCallback.call(this.mouseUpObj);
            this.mouseUpCallback = null;
            this.mouseUpObj = null;
        }
    }
    this.registerMouseUp = function(callback,classObj){
        this.mouseUpCallback = callback;
        this.mouseUpObj = classObj;
    }
    
    /**
     * 滑块按下
     */
    this.onSliderNodeTouchStart = function(event)
    {
        this.startMovePos = this.isVertical() ? Laya.stage.mouseY : Laya.stage.mouseX;
        CLog.log(">>>>>>>>>> register on mouse up");
        Laya.stage.on(Event.MOUSE_MOVE,this,this.onSliderNodeTouchMove);
        Laya.stage.on(Event.MOUSE_UP,this,this.onSliderNodeTouchUp);
        Laya.stage.on(Event.MOUSE_OUT,this,this.onSliderNodeTouchCancel);
    }
    
    /**
     * 初始化滑块按钮位置
     */
    this.initSliderButtonPos = function()
    {
        if( this.isVertical() )
        {
            if(this.sliderNodeDown)this.sliderNodeDown.y = this.barBackLength;
            this.barBackMask.mask.y = 0;//this.barBackLength;
        }else
        {
            if(this.sliderNodeDown)this.sliderNodeDown.x = 0; 
            this.barBackMask.mask.x = 0;
        }
    },
    
    //获得显示模式
    this.isVertical = function()
    {
        return this.mode === 'vertical';
    }
    
    /**
     * 滑块移动
     */
    this.onSliderNodeTouchMove = function(event)
    {
        var movePos = 0;
        var nodeDownValue = 0;
        var nodeDownSize = 0;
        this.stopTipsAnim();
        if( this.isVertical() )
        {
            movePos = Laya.stage.mouseY - this.startMovePos;
            this.startMovePos = Laya.stage.mouseY;
            nodeDownValue = this.sliderNodeDown.y;
            nodeDownSize = this.sliderNodeDown.parent.height;
        }else
        {
            movePos = Laya.stage.mouseX - this.startMovePos;
            this.startMovePos = Laya.stage.mouseX;
            nodeDownValue = this.sliderNodeDown.x;
            nodeDownSize = this.sliderNodeDown.parent.width;
        }

        var percent = 0;
        if( nodeDownValue + movePos >= nodeDownSize ) 
        {
            nodeDownValue = nodeDownSize;
            this.isVertical() ? this.barBackMask.mask.y = this.barBackLength : this.barBackMask.mask.x = this.barBackLength;
            percent = this.isVertical() ? 0 : 1;
        }else if( nodeDownValue + movePos <= 0 )
        {
            nodeDownValue = 0;
            this.isVertical() ? this.barBackMask.mask.y = 0 : this.barBackMask.mask.x = 0;
            percent = this.isVertical() ? 1 : 0;
        }else
        {
            nodeDownValue += movePos;
            percent = (nodeDownValue - this.touchStartPos) / this.barBackLength;
            percent = this.isVertical() ? (1 - percent) : percent;
            this.isVertical() ?  this.barBackMask.mask.y = (1 - percent) * this.barBackLength : this.barBackMask.mask.x = percent * this.barBackLength;
        }
 
        this.isVertical() ? this.sliderNodeDown.y = nodeDownValue : this.sliderNodeDown.x = nodeDownValue;
        this.callback && this.callback.call( this.classObj,percent );
    }
    
        /**
     * 设置滑块位置
     */
    this.setSliderPos = function( percent )
    {
        this.initSliderButtonPos();
        var pos = percent * this.barBackLength;
        if(this.sliderNodeDown) this.isVertical() ? this.sliderNodeDown.y += pos : this.sliderNodeDown.x += pos;
        this.isVertical() ? this.barBackMask.mask.y = (1 - percent) * this.barBackLength : this.barBackMask.mask.x = pos;
    }

}

/**
 * 带刻度的滑动条
 */
var SliderGearPro = (function (_super){
    Laya.class(SliderGearPro, "SliderGearPro", _super);
    function SliderGearPro(sliderTip){
         SliderGearPro.super(this);

        this.mode = "horizontal";
        this.callback = null;
        this.classObj = null;
        this.sliderMinPos = 0;
        this.barBackLength = 0;
        this.iGear = 0;//档位
        this.iRate = 1;//倍率
        this.sliderTip = sliderTip;
        this.arrValue = [];
        this.curGear = 0;//当前所在档位
        //参数iGear ： 滑块刻度分档,比如10表示滑竿分10档
        this.init = function(callback,classObj,param)
        {
            this.barBackMask = this.getChildByName('barBackMask');
            this.barBackMask.mask = new Sprite();
            this.iGear =isNaN(parseInt(param.iGear)) ? 0 : parseInt(param.iGear);
            this.iRate = isNaN(parseInt(param.iRate)) ? 1 : parseInt(param.iRate);
            this.showPoint = param.showPoint;
            this.arrValue = param.arrValue;//每个档位对应的值
            if( this.isVertical() )
            {
                this.barBackMask.mask.pivotY = this.barBackMask.height;
                this.barBackLength = this.barBackMask.height;
            }else
            {
                this.barBackMask.mask.pivotX = this.barBackMask.width;
                this.barBackLength = this.barBackMask.width;
            }
            this.barBackMask.mask.graphics.drawRect(0,0,this.barBackMask.width,this.barBackMask.height,'0xff0000');
            this.sliderNodeDown = this.getChildByName('sliderNodeDown');
            this.boxTouch = this.getChildByName("boxTouch");
            this.touchStartPos = 0;
            this.imgTip = this.sliderNodeDown.getChildByName('imgTip');
            this.lblValue = this.getChildByName("lblValue");
            this.lblSliderTip = this.getChildByName('sliderTip');
            this.lblSliderTip.text = this.sliderTip;
            
            this.callback = null;
            this.classObj = null;
            
            this.callback = callback;
            this.classObj = classObj;

            this.startMovePos = 0;
            this.initSliderButtonPos();
            this.sliderMinPos = this.boxTouch.localToGlobal(new Point(0,0)).x;
            this.boxTouch.on( Event.MOUSE_DOWN,this,this.onSliderNodeTouchStart );
        }
        this.showTipsAnim = function(){
            if(this.imgTip){
                this.tipX0 = this.imgTip.x;
                this.tipY0 = this.imgTip.y;
                Laya.timer.loop(200,this,this.loopAnim);
            }
        }
        this.loopAnim = function(){
            if(!this.imgTip) return;
            this.imgTip.visible = true;
            var xPos = this.imgTip.x == this.tipX0 ? this.tipX0 - 2 : this.tipX0;
            var yPos = this.imgTip.y == this.tipY0 ? this.tipY0 - 5 : this.tipY0;
            Tween.to(this.imgTip,{x:xPos,y:yPos},100);
        }
        this.stopTipsAnim = function(){
            if(!this.imgTip) return;
            Tween.clearAll(this);
            Laya.timer.clear(this,this.loopAnim);
            this.imgTip.visible = false;
        }
        
        this.onSliderNodeTouchCancel = function(event)
        {
            Laya.stage.off(Event.MOUSE_MOVE,this,this.onSliderNodeTouchMove);
            Laya.stage.off(Event.MOUSE_UP,this,this.onSliderNodeTouchCancel);
            Laya.stage.off(Event.MOUSE_OUT,this,this.onSliderNodeTouchCancel);
        }
        
        /**
         * 滑块按下
         */
        this.onSliderNodeTouchStart = function(event)
        {
            this.startMovePos = this.isVertical() ? Laya.stage.mouseY : Laya.stage.mouseX;
            this.nodeDownValue = this.startMovePos - this.sliderMinPos;
            
            Laya.stage.on(Event.MOUSE_MOVE,this,this.onSliderNodeTouchMove);
            Laya.stage.on(Event.MOUSE_UP,this,this.onSliderNodeTouchCancel);
            Laya.stage.on(Event.MOUSE_OUT,this,this.onSliderNodeTouchCancel);

            this.setGearPos(this.nodeDownValue);
        }
        //设置触点位置
        this.setGearPos = function(pos){
            //TODO 有空改为二分法查找
            for(var i=0;i<this.iGear;i++){
                var gap = parseInt(this.barBackLength / (this.iGear - 1));
                var temp = gap * i;
                if(Math.abs(pos - temp) < (gap/ 2)){
                    this.isVertical() ? this.sliderNodeDown.y = temp : this.sliderNodeDown.x = temp;
                    var percent = temp / this.barBackLength;
                    this.isVertical() ?  this.barBackMask.mask.y = percent * this.barBackLength : this.barBackMask.mask.x = percent * this.barBackLength;
                    this.curGear = i;
                    this.updateLableValue();
                    this.callback && this.callback.call( this.classObj,i);
                    break;
                }
            }
        }
        
        /**
         * 初始化滑块按钮位置
         */
        this.initSliderButtonPos = function()
        {
            if( this.isVertical() )
            {
                if(this.sliderNodeDown)this.sliderNodeDown.y = 0;
                this.barBackMask.mask.y = 0;
            }else
            {
                if(this.sliderNodeDown)this.sliderNodeDown.x = 0; 
                this.barBackMask.mask.x = 0;
            }
            this.curGear = 0;
            this.updateLableValue();
        },
        this.updateLableValue = function(){
            var base = this.arrValue[this.curGear] ? this.arrValue[this.curGear] : 0;
            var value = this.showPoint ? Tools.getInstance().ChangeUIShow(base * this.iRate) : parseInt(base * this.iRate);
            this.lblValue.text = value;
        }
        
        //获得显示模式
        this.isVertical = function()
        {
            return this.mode === 'vertical';
        }
        
        /**
         * 滑块移动
         */
        this.onSliderNodeTouchMove = function(event)
        {
            var movePos = 0;
            var nodeDownSize = 0;
            this.stopTipsAnim();
            if( this.isVertical() )
            {
                movePos = Laya.stage.mouseY - this.startMovePos;
                this.startMovePos = Laya.stage.mouseY;
                //this.nodeDownValue = this.sliderNodeDown.y;
                nodeDownSize = this.sliderNodeDown.parent.height;
            }else
            {
                movePos = Laya.stage.mouseX - this.startMovePos;
                this.startMovePos = Laya.stage.mouseX;
                //this.nodeDownValue = this.sliderNodeDown.x;
                nodeDownSize = this.sliderNodeDown.parent.width;
            }
            this.nodeDownValue += movePos;
            this.setGearPos(this.nodeDownValue);
        }
        
            /**
         * 设置滑块位置
         */
        this.setSliderPos = function( _percent )
        {
            this.initSliderButtonPos();
            var pos = _percent * this.barBackLength;
            if(this.sliderNodeDown) this.isVertical() ? this.sliderNodeDown.y += pos : this.sliderNodeDown.x += pos;
            this.isVertical() ? this.barBackMask.mask.y = pos : this.barBackMask.mask.x = pos;
        }
        
        this.setArrGear = function(arr){
            this.arrValue = arr;
            this.initSliderButtonPos();
        }
        this.setIRate = function(iRate){
            this.iRate = iRate;
            this.updateLableValue();
        }
        this.getCurGear = function(){
            return this.curGear;
        }
    }
    return SliderGearPro;
})(SliderGearUI);