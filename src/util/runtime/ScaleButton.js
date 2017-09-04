
var ScaleButton = (function (_super){
    
	var _proto = ScaleButton.prototype;
	
	function ScaleButton(){
		ScaleButton.__super.call(this);
        this.addListener = function()
        {
            this.on( Event.MOUSE_DOWN,this,this.onDown );
            this.on( Event.CLICK,this,this.onTouchEnd );
            this.on( Event.MOUSE_UP,this,this.onUp );
            this.on( Event.MOUSE_OUT,this,this.onUp);
            this.on( Event.MOUSE_OVER,this,this.onMouseOver );
        }
        
        this.removeListener = function()
        {
            this.off( Event.MOUSE_DOWN,this,this.onDown );
            this.off( Event.MOUSE_UP,this,this.onUp );
            this.off( Event.CLICK,this,this.onTouchEnd);
            this.off( Event.MOUSE_OUT,this,this.onUp);
        }
        
        this.onDown = function()
        {
            SoundManager.playSound("audio/button.mp3");
            Tween.to(this,
            {
                scaleX: 0.95,
                scaleY: 0.95,
            }, 100);
            if( !this.animation )
            {
                this.animation = new Effect();
                this.animation.init("res/atlas/common/btnBright.json",40,false);
                this.addChild( this.animation );
                this.animation.x = (this.width - 140) >> 1 ;//200位图片的宽高
                this.animation.y = (this.height - 140) >> 1;
            }
            this.animation.play(); 
            //当按钮含有名字为btnIcon的图片时，会在鼠标按下时查找按钮按下时的图片样式
            //命名规则：图片名字必须为btnIcon，且按下的图片比常态图片名称多一个"Down"
            //比如 “common/up.png”和“common/upDown.png”
            var icon = this.getChildByName('btnIcon');
            if(!icon || !icon.skin) return;
            if(icon.skin.indexOf('Down.png')<0){
                this.upIconSkin = icon.skin;
                icon.skin = icon.skin.split('.')[0] + "Down.png";
                var lblCheck = this.getChildByName('lblCheck');
                if(lblCheck){
                    lblCheck.color = GameData.getInstance().COLOR.YELLOW;
                }
            }             
        }
        //鼠标悬浮效果
        this.onMouseOver = function(){
            Tween.to(this,
            {
                scaleX: 1.05,
                scaleY: 1.05,
            }, 100);
        }
        
        this.onUp = function()
        {
            Tween.to(this,
            {
                scaleX: 1,
                scaleY: 1,
            }, 100);
            var icon = this.getChildByName('btnIcon');
            if(!icon || !this.upIconSkin) return;
            icon.skin = this.upIconSkin;         
        }
        this.onTouchEnd = function (event) 
        {
            //event.stopPropagation();
        }
        
        this.addListener();
	}
    

    
	Laya.class(ScaleButton,"ScaleButton",_super);
    
    return ScaleButton;
})(laya.ui.Box);


var ScaleImage = (function (_super){
    
	var _proto = ScaleImage.prototype;
	
	function ScaleImage(){
		ScaleImage.__super.call(this);
        
        this.addListener = function()
        {
            this.on( Event.MOUSE_DOWN,this,onDown );
            this.on( Event.MOUSE_UP,this,onUp );
            this.on( Event.MOUSE_OUT,this,onUp );
            this.on( Event.CLICK,this,this.onTouchEnd);
        }
        
        this.removeListener = function()
        {
            this.off( Event.MOUSE_DOWN,this,onDown );
            this.off( Event.MOUSE_UP,this,onUp );
            this.off( Event.MOUSE_OUT,this,onUp );
            this.off( Event.CLICK,this,this.onTouchEnd);
        }
        
        this.addListener();
	}
    
    function onDown()
    {
        SoundManager.playSound("audio/button.mp3", 1);
        Tween.to(this,
        {
            scaleX: 0.95,
            scaleY: 0.95,
        }, 100);
        if( !this.animation )
        {
            this.animation = new Effect();
            this.animation.init("res/atlas/common/btnBright.json",50,false);
            this.addChild( this.animation );
            this.animation.x = (this.width - 140) >> 1 ;//200位图片的宽高
            this.animation.y = (this.height - 140) >> 1;
        }
        this.animation.play(); 
    }
    
    function onUp()
    {
        Tween.to(this,
        {
            scaleX: 1,
            scaleY: 1,
        }, 100);  
    }
    function onTouchEnd(event) 
    {
        // if( !this.animation )
        // {
        //     this.animation = new Effect();
        //     this.animation.init("res/atlas/common/btnBright.json",40,false);
        //     this.addChild( this.animation );
        //     this.animation.x = (this.width - 250) >> 1 ;//250位图片的宽高
        //     this.animation.y = (this.height - 250) >> 1;
        // }
        // this.animation.play(); 
    }
    
	Laya.class(ScaleImage,"ScaleImage",_super);
})(laya.ui.Image);

var CheckButtonC = (function (_super){
    
	var _proto = CheckButtonC.prototype;
	
	function CheckButtonC(){
		CheckButtonC.__super.call(this);
        this.addListener = function()
        {
            this.on( Event.MOUSE_DOWN,this,this.onDown );
            this.on( Event.CLICK,this,this.onTouchEnd );
            this.on( Event.MOUSE_UP,this,this.onUp );
        }
        
        this.removeListener = function()
        {
            this.off( Event.MOUSE_DOWN,this,this.onDown );
            this.off( Event.MOUSE_UP,this,this.onUp );
            this.off( Event.CLICK,this,this.onTouchEnd);
        }
        
        this.onDown = function()
        {
            SoundManager.playSound("audio/button.mp3");
            this.on( Event.MOUSE_OUT,this,this.onMouseOut );
            //当按钮含有名字为btnIcon的图片时，会在鼠标按下时查找按钮按下时的图片样式
            //命名规则：图片名字必须为btnIcon，且按下的图片比常态图片名称多一个"Down"
            //比如 “common/up.png”和“common/upDown.png”
            var icon = this.getChildByName('btnIcon');
            if(!icon || !icon.skin) return;
            this.upIconSkin = icon.skin;
            if(icon.skin.indexOf('Down.png')<0){
                icon.skin = icon.skin.split('.')[0] + "Down.png"; 
                var lblCheck = this.getChildByName('lblCheck');
                if(lblCheck){
                    lblCheck.color = GameData.getInstance().COLOR.YELLOW;
                }        
            }         
        }
        
        this.onUp = function()
        {
            var icon = this.getChildByName('btnIcon');
            if(!icon || !this.upIconSkin) return;
            icon.skin = this.upIconSkin;         
        }
        this.onTouchEnd = function (event) {
            this.off( Event.MOUSE_OUT,this,this.onMouseOut);
            var icon = this.getChildByName('btnIcon');
            if(!icon || !icon.skin) return;
            if(this.upIconSkin.indexOf('Down.png')<0){
                icon.skin = this.upIconSkin.split('.')[0] + "Down.png";  
                this.setLableColor(true);
            }
            else{
                icon.skin = this.upIconSkin.split('Down.png')[0] + ".png";
                this.setLableColor(false);
            }
        }
        this.onMouseOut = function(e){
            this.off( Event.MOUSE_OUT,this,this.onMouseOut);
            var icon = this.getChildByName('btnIcon');
            if(!icon || !this.upIconSkin) return;
            icon.skin = this.upIconSkin;
            this.setLableColor(this.upIconSkin.indexOf('Down.png')>=0);
        }
        this.setLableColor = function(bDown){
            var lblCheck = this.getChildByName('lblCheck');
            if(!lblCheck) return;
            lblCheck.color = bDown ? GameData.getInstance().COLOR.YELLOW : GameData.getInstance().COLOR.GRAY;
        }
        // this.updateBtnLight = function(btnIcon,bShow){
        //     if(!btnIcon || !btnIcon.skin) return;
        //     if(bShow && btnIcon.skin.indexOf('Down.png') >= 0) return;
        //     if(bShow && (btnIcon.skin.indexOf('Down.png') < 0)){
        //         btnIcon.skin = btnIcon.skin.split('.')[0] + "Down.png";
        //     }
        //     else if(btnIcon.skin.indexOf('Down.png') >= 0){
        //         btnIcon.skin = btnIcon.skin.split('Down.png')[0] + ".png";
        //     }
        // }
        this.addListener();
	}
    

    
	Laya.class(CheckButtonC,"CheckButtonC",_super);
    
    return CheckButtonC;
})(laya.ui.Box);