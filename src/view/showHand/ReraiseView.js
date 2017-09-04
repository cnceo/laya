/**
 * huangandfly 2016 07 20
 * 加注界面
 */
function ReraiseView()
{
    ReraiseView.super( this );
    
    this.show = function( _show )
    {
        if( _show )
        {
            this.addListener();
            this.raiseTxt.text = '0';
            this.raiseNum = 0;
            if(!this.hideSlider){
                this.setSliderPosition(0);
            }
        }else
        {
            this.removeListener();
        }
        this.visible = _show;
    }
    
    this.onSlider = function( percent )
    {
        var slider = percent * this.maxValue;
        var oldValue = this.raiseNum;
        if( percent === 1 )
        {
            if(oldValue == this.maxValue) return;
            this.raiseNum = this.maxValue;
            this.raiseTxt.text = Tools.getInstance().ChangeUIShow(this.maxValue);
        }else
        {
            var num = parseInt(slider / Tools.getInstance().ExactDigit);
            var newValue = num * Tools.getInstance().ExactDigit;
            if(oldValue == newValue) return;            
            this.raiseTxt.text = num;
            this.raiseNum = newValue;
        }
        this.lableMax.color = (percent == 1) ? GameData.getInstance().COLOR.YELLOW : GameData.getInstance().COLOR.GRAY;
        this.lableMin.color = (percent == 0) ? GameData.getInstance().COLOR.YELLOW : GameData.getInstance().COLOR.GRAY;
        this.raiseTxtEffect();
        this.setButtonDisable();
    }

    this.addListener = function()
    {
        for( var i = 0;i < 4;i++ )
        {
            this.addBtnListener( 'raise_' + i,this.onRaise,true );
        }
        //this.addBtnListener( 'cancelBtn',this.onCancel );
        this.addBtnListener( 'okBtn',this.onOk );
    }
    
    this.removeListener = function()
    {
        for( var i = 0;i < 4;i++ )
        {
            this.removeBtnListener( 'raise_' + i,this.onRaise,true );
        }
        //this.removeBtnListener( 'cancelBtn',this.onCancel );
        this.removeBtnListener( 'okBtn',this.onOk );
    }
    
    this.addBtnListener = function( _name,callback,_lisMD)
    {
        var t_node = this.getChildByName( _name );
        if( t_node )
        {
            t_node.on( Event.CLICK,this,callback );
            (_lisMD) && (t_node.on( Event.MOUSE_DOWN,this,this.onMouseDown ));
        }
    }
    
    this.removeBtnListener = function( _name,callback,_lisMD )
    {
        var t_node = this.getChildByName( _name );
        if( t_node )
        {
            t_node.off( Event.CLICK,this,callback );
            (_lisMD) && (t_node.off( Event.MOUSE_DOWN,this,this.onMouseDown ));
        }
    }

    this.init = function( _callback,_classObj,_hideSlider)
    {
        this.lableTip = this.getChildByName("txtTip");
        this.lableMax = this.getChildByName('slider').getChildByName("txtMaxLabel");
        this.lableMin = this.getChildByName('slider').getChildByName("txtMinLabel");
        this.callback = _callback;
        this.classObj = _classObj;
        this.hideSlider = _hideSlider;
        this.minValue = 0;
        if(_hideSlider){
            this.getChildByName('slider').visible = false;
            this.initBtnPos();     
        }
        else{
            this.sliderCom = new SliderPro( this.getChildByName('slider'),'horizontal' );
            this.sliderCom.init(this.onSlider,this);
        }        
        
        this.raiseTxt = this.getChildByName('reraiseTxt').getChildByName('txt'); 
        this.createChipsDrag();

        this.isMouseDown = false;
        this.mouseUp = false;
    }    
    //初始化按钮坐标
    this.initBtnPos = function(){
        for( var i = 0;i < 4;i++ ){
            var t_node = this.getChildByName( 'raise_'+i );            
            if( t_node ){
                t_node.x = t_node.x + 150;
                t_node.y = t_node.y + 30;
                if(i == 3){
                    t_node.visible = false;
                }
            }
        }
    }

    //创建筹码拖拽
    this.createChipsDrag = function()
    {
        this.chips = new laya.ui.Image();
        this.chips.dataSource = {skin:'showhandRoom/reraise/chips.png'};

        var txt = new Text();
        txt.name = "chipsTxt";
        txt.text = "0";
        //txt.cacheAs = 'bitmap';
        txt.fontSize = 25;
        //txt.bold = true;
        txt.font = 'impact';
        txt.color = GameData.getInstance().COLOR.YELLOW;
        //txt.strokeColor = '#000000';
        //txt.stroke = 4;
        txt.width = 200;
        txt.height = 40;
        txt.align = "left";

        this.chips.addChild( txt );
    }
    //设置按钮数据
    this.setBtnValue = function(arrV,bSeenCards){
        for(var i in arrV){
            var t_node = this.getChildByName( 'raise_'+i );            
            if( t_node ){
                var txt = t_node.getChildByName('txt');
                txt.text = arrV[i];
                txt.color = bSeenCards ? GameData.getInstance().COLOR.RED : GameData.getInstance().COLOR.YELLOW;
                txt.strokeColor = bSeenCards ? GameData.getInstance().COLOR.YELLOW : GameData.getInstance().COLOR.BLACK;
                var boxAnim2 = t_node.getChildByName('boxAnim2');
                if(boxAnim2) {
                    boxAnim2.visible = bSeenCards;
                    t_node.setChildIndex( boxAnim2,t_node.numChildren - 2 );
                    t_node.setChildIndex(txt, t_node.numChildren - 1);
                }
            }            
        }
        this.lableTip.visible =  bSeenCards;
        this.chips.getChildByName('chipsTxt').color = bSeenCards ? GameData.getInstance().COLOR.RED : GameData.getInstance().COLOR.YELLOW;
    }
    //设置最大赌注
    this.setMaxbet = function( _value )
    {
        var value = _value;
        this.maxValue = _value;
        this.setButtonDisable();
    }
    //设置最低金额
    this.setMinbet = function(value){
        this.minValue = value;
        //this.setButtonDisable();
    }

    this.setButtonDisable = function()
    {
        var value = this.raiseNum / Tools.getInstance().ExactDigit; 
        for( var i = 0;i < 3;i++ )
        {
            var button = this.getChildByName('raise_' + i);
            var txt = button.getChildByName( 'txt' );
            var maxValue = parseInt(this.maxValue / Tools.getInstance().ExactDigit);
            var minValue = parseInt(this.minValue / Tools.getInstance().ExactDigit);
            //不包含最低额度
            if( value + parseInt( txt.text ) > maxValue
                || value + parseInt(txt.text) <= minValue )
            {
                button.off(Event.CLICK,this,this.onRaise);
                button.off(Event.MOUSE_DOWN,this,this.onMouseDown);
                button.disabled = true;
                button.removeListener();
            }else if( button.disabled )
            {
                button.on(Event.CLICK,this,this.onRaise);
                button.on(Event.MOUSE_DOWN,this,this.onMouseDown);
                button.disabled = false;
                button.addListener();
            }
        }
    }

    this.onMouseDown = function(e)
    {
        this.isMouseDown = true;
        this.mouseUp = false;
        var text = this.chips.getChildByName("chipsTxt");
        if( e.target.name === 'raise_3' )
        {
            text.text  = Tools.getInstance().ChangeUIShow(this.maxValue);
            
        }else
        {
            text.text = e.target.getChildByName("txt").text;    
        }
        //text.width = text.textWidth;
        text.x = (this.chips.width - text.width) >> 1;
        text.y = -30;
        text.align = 'center';
        Laya.stage.on( Event.MOUSE_MOVE,this,this.onMouseMove );

        this.srcPoint = null;
        this.srcPoint = new Point( Laya.stage.mouseX,Laya.stage.mouseY );
    }

    this.onMouseMove = function()
    {
        if( !this.isMouseDown )
            return;
        if( this.srcPoint.x - Laya.stage.mouseX != 0 || this.srcPoint.y - Laya.stage.mouseY != 0  )
        {
            this.chips.x = Laya.stage.mouseX - (this.chips.width >> 1);
            this.chips.y = Laya.stage.mouseY - (this.chips.height >> 1);
            Laya.stage.addChild( this.chips );
            this.chips.startDrag();
            Laya.stage.on( Event.MOUSE_UP,this,this.onMouseUp );
            Laya.stage.off( Event.MOUSE_MOVE,this,this.onMouseMove );
            Laya.stage.on( Event.MOUSE_OUT,this,this.onMouseOut );
        }
    }

    this.onMouseOut = function()
    {
        Laya.stage.off( Event.MOUSE_OUT,this,this.onMouseOut );
        Laya.stage.off( Event.MOUSE_UP,this,this.onMouseUp );
        this.chips.stopDrag();
        this.chips.removeSelf();
        this.mouseUp = false;
    }

    this.onMouseUp = function(e)
    {
        Laya.stage.off( Event.MOUSE_UP,this,this.onMouseUp );
        Laya.stage.off( Event.MOUSE_MOVE,this,this.onMouseMove );
        Laya.stage.off( Event.MOUSE_OUT,this,this.onMouseOut );
        this.chips.stopDrag();
        this.chips.removeSelf();
        if( !(Laya.stage.mouseX >= this.x && Laya.stage.mouseX <= this.x + this.width &&
            Laya.stage.mouseY >= this.y && Laya.stage.mouseY <= this.y + this.height) )
        {
            this.raiseNum = parseFloat(this.chips.getChildByName("chipsTxt").text) * Tools.getInstance().ExactDigit;
            this.raiseTxt.text = Tools.getInstance().ChangeUIShow( this.raiseNum );
            this.onOk();
        }else
        {
            this.mouseUp = true;
        }
    }

    this.onRaise = function(event) 
    {
        if( this.mouseUp )
        {
            this.mouseUp = false;
            return;
        }

        this.isMouseDown = false;
        Laya.stage.off( Event.MOUSE_MOVE,this,this.onMouseMove );

        var money = 0;
        if( event.target.name === 'raise_3' )
        {
            this.raiseNum = this.maxValue;
            this.raiseTxt.text = Tools.getInstance().ChangeUIShow(this.raiseNum);
        }else
        {
            this.raiseNum = this.raiseNum + parseInt( event.target.getChildByName('txt').text ) * Tools.getInstance().ExactDigit;
            this.raiseTxt.text = Tools.getInstance().ChangeUIShow(this.raiseNum);
        }
        this.raiseTxtEffect();
        if(!this.hideSlider){
            this.setSliderPosition(this.raiseNum / this.maxValue);
        }
        this.setButtonDisable();
    } 
    this.setSliderPosition = function(num){
        this.sliderCom.setSliderPos(num);
        this.lableMax.color = (num == 1) ? GameData.getInstance().COLOR.YELLOW : GameData.getInstance().COLOR.GRAY;
        this.lableMin.color = (num == 0) ? GameData.getInstance().COLOR.YELLOW : GameData.getInstance().COLOR.GRAY;
    }

    this.raiseTxtEffect = function( _value )
    {
        this.raiseTxt.scale(1,1);
        Tween.to( this.raiseTxt,{scaleX:1.5,scaleY:1.5},50 );
        Tween.to( this.raiseTxt,{scaleX:1,scaleY:1},50,null,null,50 );
    }

    this.getReraiseValue = function()
    {
        return this.raiseNum;
    }

    this.onOk = function()
    {
        if( this.callback )
        {
            this.classObj ? this.callback.call( this.classObj ) : this.callback();
        }
        this.onCancel();
    }

    this.onCancel = function()
    {
        Tween.to( this,{y:Laya.stage.height},200,null,Handler.create(this,this.show) );
        Laya.stage.off( Event.MOUSE_UP,this,this.onMouseUp );
        Laya.stage.off( Event.MOUSE_MOVE,this,this.onMouseMove );
        Laya.stage.off( Event.MOUSE_OUT,this,this.onMouseOut );
        this.chips.stopDrag();
        this.chips.removeSelf();
    }

}