/**
 * 斗地主卡牌
 */
var FLCard = (function (_super)
{
    Laya.class(FLCard,"FLCard",_super);
   
    function FLCard()
    {
        this._jumpY = 30;
        this._bSelect = false;
        this._multiSelect = false;

        FLCard.__super.call(this);
    }

    var __proto = FLCard.prototype;

    __proto.init = function()
    {
        _super.prototype.init.call(this);
        this._bSelect = false;
        this._multiSelect = false;
        if( this.multiEff )
        {
            this.multiEff.visible = false;
        }
        this.baseCardMoveTween = null;
        this.onSelectTween = null;
    }

    __proto.setMultiSelect = function( _multiSelect )
    {
        this._multiSelect = _multiSelect;
    }

    __proto.IsSelect = function()
    {
        return this._bSelect;
    }

    __proto.getJumpY = function()
    {
        return this._jumpY;
    }

    __proto.reset = function()
    {
        _super.prototype.reset.call(this);
        this.removeListener();
        this.baseCardMoveTween = null;
        this.onSelectTween = null;
    }

    __proto.removeListener = function()
    {
        this.off( Event.CLICK,this,this.onClick );
        this.off( Event.MOUSE_DOWN,this,this.onMouseDown );
    }

     //添加卡牌点击监听
    __proto.addClickListener = function()
    {
        this.on( Event.CLICK,this,this.onClick );
        this.on( Event.MOUSE_DOWN,this,this.onMouseDown );
        this.hitArea = new Rectangle( 10,0,this.width - 22,this.height - 20 );
    }

    //显示多选的效果
    __proto.showSelectEffect = function(_show)
    {
        this._multiSelect = _show;
        if( _show )
        {
            if( !this.multiEff )
            {
                this.multiEff = new laya.ui.Image('fightLandlordRoom/cardMulti.png');
                this.multiEff.mouseEnabled = false;
                this.addChild( this.multiEff );
            }
            this.multiEff.visible = true;
        }else
        {
            if( this.multiEff )
            {
                this.multiEff.visible = false;                
            }
        }
    }

    //复位牌的位置
    __proto.resetPos = function()
    {
        if( !this._bSelect )
            return;
        this.onClick();
    }

    //选择牌
    __proto.checkSelect = function()
    {
        if( !this._multiSelect )
            return;
        this.onClick();
        this._multiSelect = false;
        this.showSelectEffect(false);
    }

    __proto.onMouseDown = function(e)
    {
        if( this.onMouseDownCallback )
        {
            this.onMouseDownCallback.run();
        }
    }

    //点击卡牌
    __proto.onClick = function(e)
    {
        e && SoundManager.playSound('audio/fightLandlord/eff_xuanpai.mp3');
        //如果是地主牌 正在移动点击之后 不做处理
        if( this.baseCardMoveTween || this.onSelectTween )
            return;
        var jumpY = this._bSelect ? this.y + this._jumpY : this.y - this._jumpY;
        this.onSelectTween = Tween.to(this,
        {
            y: jumpY,
        }, 20,null,Handler.create(this, function(){ this.onSelectTween = null; })); 
        this._bSelect = !this._bSelect;
    }

    return FLCard;
})(Card);