/**
 * 星星处理
 */

var Star = (function (_super){
    function Star()
    {
        Star.__super.call(this);
        
        this.speed = 0.01;
        this.init = function( _rotation,_skin )
        {
            _rotation = arguments[0] || 0;
            Game.getInstance().addUpdate( {callback:this.update,caller:this} );
            this.dataSource = {skin:_skin || "common/star.png"};
            this.anchorX = 0.5;
            this.anchorY = 0.5;
            this.rotation = _rotation;
            this.alpha = Math.random();
        }
        
        this.update = function(dt)
        {
            if( !this.visible )
                return;
            this.rotation += 100 * Math.abs(this.speed);
            this.alpha += this.speed;
            this.scaleX += this.speed * 1;
            this.scaleY += this.speed * 1;
            if( this.alpha >= 1 || this.alpha <= 0.05 )
            {
                this.speed = -this.speed;                
            }
        }
        
        this.gc = function()
        {
            Game.getInstance().removeUpdate( this );
            this.destroy();
        }
    }
    Laya.class(Star,"Star",_super);
    return Star;
})(laya.ui.Image);

var StarLight = (function (_super){
    function StarLight(speed)
    {
        StarLight.__super.call(this);
        
        this.speed = speed || 0.01;
        this.init = function( _rotation,_skin )
        {
            _rotation = arguments[0] || 0;
            Game.getInstance().addUpdate( {callback:this.update,caller:this} );
            this.dataSource = {skin:_skin || "common/star.png"};
            this.anchorX = 0.5;
            this.anchorY = 0.5;
            this.rotation = _rotation;
        }
        
        this.update = function(dt)
        {
            if( !this.visible )
                return;
            this.rotation += 100 * this.speed;
            this.rotation = this.rotation % 360;
        }
        
        this.gc = function()
        {
            Game.getInstance().removeUpdate( this );
            this.destroy();
        }
    }
    Laya.class(StarLight,"StarLight",_super);
    return StarLight;
})(laya.ui.Image);
