/**
 * huangandfly 2016 07 19
 * 查看底牌界面
 */
function CheckCardView()
{
    CheckCardView.super( this );
    
    this.init = function()
    {
        this.isCheck = false;
        this.guide   = this.getChildByName('guide');
        this.hand    = this.getChildByName('hand');
        this.handPosStart = new Point(this.hand.x,this.hand.y);
        this.backCard   = this.getChildByName('backCard');
        this.bottomCard = this.getChildByName('bottomCard');
        this.touchStartPos = 0;
        this.backCard.on( Event.MOUSE_DOWN,this,this.onMouseDown );
    }
    
    this.setBottomCardTexture = function( _name )
    {
        this.bottomCard.dataSource = {skin:_name};
    }
    
    this.show = function( _show )
    {
        if( _show )
        {
            //this.backCard.on( Event.MOUSE_DOWN,this,this.onMouseDown );
            this.backCard.rotation = 0;
            this.isCheck = false;
            this.guide.visible = true;
            this.hand.visible  = true;
            this.handMove();
        }else
        {
            //this.backCard.off( Event.MOUSE_DOWN,this,this.onMouseDown );
            Tween.clearAll( this.hand );
            this.onMouseUp();
        }
        this.visible = _show;
    }
    
    this.handMove = function()
    {
        this.hand.pos(this.handPosStart.x,this.handPosStart.y);
        Tween.to( this.hand,{x:this.handPosStart.x+332,y:this.handPosStart.y+74},1000,Ease['circOut'],Handler.create(this,this.handMove),300 );
    }
    
    this.onMouseDown = function(event)
    {
        this.touchStartPos = Laya.stage.mouseX;
        
        this.on( Event.MOUSE_MOVE,this,this.onMouseMove );
        this.on( Event.MOUSE_UP,this,this.onMouseUp );
        Laya.stage.on( Event.MOUSE_OUT,this,this.onMouseOut);
    }
    this.onMouseOut = function(e){
        this.onMouseUp();
        Laya.stage.off(Event.MOUSE_OUT,this,this.onMouseOut);
    }
    
    this.onMouseMove = function( event )
    {
        if(  Laya.stage.mouseX - this.touchStartPos <= 0 )
        {
            this.touchStartPos = Laya.stage.mouseX;                    
            return;
        }
        var movePos = Laya.stage.mouseX - this.touchStartPos;
        this.touchStartPos = Laya.stage.mouseX;
        this.backCard.rotation +=  movePos * 0.1;
        this.backCard.rotation = this.backCard.rotation > 36 ? 36 : this.backCard.rotation;  
        
        if( this.backCard.rotation >= 3 )
        {
            this.isCheck = true;
        }
        
        //this.hand.stopAllActions();
        Tween.clearAll( this.hand );        
        this.guide.visible = false;
        this.hand.visible = false;
    }
    
    this.onMouseUp = function()
    {
        this.off( Event.MOUSE_MOVE,this,this.onMouseMove );
        this.off( Event.MOUSE_UP,this,this.onMouseUp );
    }
}