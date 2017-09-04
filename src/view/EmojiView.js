/**
 *表情界面 huangfei 2016 11 18 
 */
function EmojiView()
{
    EmojiView.super( this );

    this.init = function( _caller,_callback )
    {
        this.caller   = _caller;
        this.callback = _callback;
    }

    this.addListener = function()
    {
        var count = 0;
        for( var i = 0;i < this.numChildren;i++ )
        {
            var child = this.getChildAt( i );
            if( child.name.indexOf('#') == -1 )
                continue;
            child.on( Event.CLICK,this,this.onClick );
            child.width = child.height = 70;
            child.x = parseInt((count % 6) * 70);
            child.y = parseInt(parseInt(count / 6) * 70);
            count++;
        }

        Laya.stage.on( Event.CLICK,this,this.onStageClick );
    }

    this.removeListener = function()
    {
        for( var i = 0;i < this.numChildren;i++ )
        {
            var child = this.getChildAt( i );
            if( child.name.indexOf('#') == -1 )
                continue;
            child.off( Event.CLICK,this,this.onClick );
        }
        Laya.stage.off( Event.CLICK,this,this.onStageClick );
    }

    this.onStageClick = function( e )
    {
        if( e.target.name == 'emojiBtn' )
            return;
         this.show( false );
    }

    this.onClick = function( e )
    {
        if( this.caller && this.callback )
        {
            this.callback.call( this.caller,'{'+e.target.name+'}' );
        }
    }

    this.show = function( _show )
    {
        if( _show )
        {
            this.addListener();
        }else
        {
            this.removeListener();
        }

        this.visible = _show;
    }
}