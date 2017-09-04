var CheckButton = (function (_super){
    
	function CheckButton(){
		CheckButton.__super.call(this);
        
         //监听事件
        this.init = function ( funcPtr,classObj,showScale )
        {
            var self = this;
            this.funcPtr = funcPtr;
            this.classObj = classObj;
            this.isCheck = false;
            this.showScale = showScale;
            //this.eventName = eventName;
            this.btnNormal = 'btnNormal';
            this.btnDown   = 'btnDown';
            this.setActive(this.btnNormal,true);
            this.setActive(this.btnDown,false);
            //this.on( eventName,this,this.onTouchEnd);
            
            this.addListener();
        }
        
        this.addListener = function()
        {
            this.on( Event.CLICK,this,this.onTouchEnd );
            this.on( Event.MOUSE_DOWN,this,this.onDown );
            this.on( Event.MOUSE_UP,this,this.onUp );
            this.on( Event.MOUSE_OUT,this,this.onUp );
        }
        
        this.onDown = function()
        {
            SoundManager.playSound("audio/button.mp3");
            if(!this.showScale) return;
            Tween.to(this,
            {
                scaleX: 0.95,
                scaleY: 0.95,
            }, 100);
        }
        
        this.onUp = function()
        {
            if(!this.showScale) return;
            Tween.to(this,
            {
                scaleX: 1,
                scaleY: 1,
            }, 100);  
        }
        
        this.onTouchEnd = function (event) 
        {
            this.onClickPro( this.btnNormal );
            this.onClickPro( this.btnDown );
            this.isCheck = !this.isCheck; 
            this.funcPtr && this.funcPtr.call( this.classObj,event );
        }
        
        //点击处理
        this.onClickPro = function( name )
        {
            var btn = this.getChildByName( name );
            if( btn )
            {
                btn.visible = !btn.visible; 
            }   
        }
        
        //设置控件显示
        this.setActive = function ( name ,show )
        {
            var btn = this.getChildByName( name );
            if( btn )
            {
                btn.visible = show;
                ( name === this.btnDown ) && show ? this.isCheck = true : this.isCheck = false;
            }     
        }
        
        /**
         * 重置按钮状态
         */
        this.reset = function()
        {
            this.setActive( this.btnNormal,true );
            this.setActive( this.btnDown,false );
        }
        
        //获得checkButton状态
        this.getIsCheck = function()
        {
            return this.isCheck;   
        }
        //手动设置状态
        this.setCheck = function(isCheck){
            this.isCheck = isCheck;
            var btnNormal = this.getChildByName( this.btnNormal );
            if( btnNormal )
            {
                btnNormal.visible = !this.isCheck; 
            }
            var btnDown = this.getChildByName( this.btnDown );
            if( btnDown )
            {
                btnDown.visible = this.isCheck; 
            }
        }

        this.removeListener = function()
        {
            this.off( Event.CLICK,this,this.onTouchEnd );
            this.off( Event.MOUSE_DOWN,this,this.onDown );
            this.off( Event.MOUSE_UP,this,this.onUp );
            this.off( Event.MOUSE_OUT,this,this.onUp );
            this.funcPtr = null;
            this.classObj = null;
        }
    }
    
	Laya.class(CheckButton,"CheckButton",_super);
    return CheckButton;
})(laya.ui.Box);