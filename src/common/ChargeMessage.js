/**
 * 玩家充值提示
 */
function ChargeMessage( _text,parent )
{
    ChargeMessage.super(this);

    this.hide = function()
    {
        this.removeSelf();
        this.destroy();
    }
    
    
    this.txt = this.getChildByName('txt');
    this.bg  = this.getChildByName('bg');
    this.txt.anchorX = 0.5; 
    this.bg.anchorX = 0.5;
    this.txt.text = _text;
    this.bg.width = this.txt.width + 50;
    
    this.x = parent.width/2;
    
    var h = (parent.height + this.height) >> 1;
    this.y = h;
    
    this.txt.anchorX = 0.5; 
    this.bg.anchorX = 0.5;
    this.alpha = 0;
    Tween.to(this,{ y:h - 80 ,alpha:1},1500,null,Handler.create(this,function (params) {
        Tween.to(this,{y:h -120,alpha:0.1},1500,null,Handler.create(this,function(params) {
            this.hide();
        }));
    }));
    
    parent.addChild( this );
    this.zOrder = 5;
}

