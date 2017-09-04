/**
 * huangandfly 2016 07 18
 * 牌型
 */

function CardForm()
{
    CardForm.super( this );

    this.cardForm = null;
    this.animation = null;
    this.init = function(){
        Tween.clearAll(this);
    }
    this.initSkin = function( _path,effectScle )
    {
        this.loadCardForm( _path );
        this.createEffect(effectScle);        
        //this.pivotX = this.width >> 1;
        //this.pivotY = this.height >> 1;
        SoundManager.playSound('audio/cardform.mp3');
    }

    //特效
    this.createEffect = function(effectScle)
    {
        var scale = effectScle ? effectScle : 1;
        if( this.animation === null )
        {
            this.animation = new Effect();
            this.animation.init("res/atlas/showhandRoom/cardForm/effect.json",80,false);
            this.addChild( this.animation );
            this.animation.pivotX = 380 >> 1;
            this.animation.pivotY = 380 >> 1;
        }
        this.animation.scaleX = this.animation.scaleY = scale;
        this.animation.play(); 
    }
    
    this.loadCardForm = function( _path )
    {
        if( this.cardForm === null )
        {
            this.cardForm = new Sprite();
            this.addChild( this.cardForm );
        }

        var t_res = Laya.loader.getRes( _path );
        if( t_res === null || t_res === undefined)
        {
            CLog.log('cardForm = '+_path + ' resources not find ');
            return;
        }
        this.cardForm.graphics.clear();
        this.cardForm.graphics.drawTexture(t_res, 0, 0);
        this.cardForm.size(t_res.width, t_res.height);
        this.cardForm.pivotX = t_res.width >> 1;
        this.cardForm.pivotY = t_res.height >> 1;
    }
}