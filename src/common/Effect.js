/**
 * huangandfly 2016 07 21
 * 特效
 */
var Effect = (function (_super){
    
    function Effect()
    {
        Effect.super( this );
        
        this.init = function( _path,_interval,_loop,_callback )
        {   
            this.callback = _callback;
            this.mouseEnabled = false;
            this.loop = _loop;
            this.animation = new Animation();
            this.animation.loadAtlas( _path );
            this.animation.interval = _interval;			// 设置播放间隔（单位：毫秒）
            this.addChild( this.animation );
        }
        
        this.play = function()
        {
            if( this.animation == null )
                return;
            this.visible = true;
            this.animation.play(0,this.loop);
            if( !this.loop )
            {
                this.animation.once( 'complete',this,this.PlayComplete );
            }
        }
        
        this.PlayComplete = function()
        {
            this.animation.stop();
            this.visible = false;
            if( this.callback )
            {
                this.callback.run();
            }
        }
    }
    
    Laya.class(Effect,"Effect",_super);
    return Effect;
})(laya.ui.Box);
