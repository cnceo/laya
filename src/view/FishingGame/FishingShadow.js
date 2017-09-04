/*
* 鱼的影子;
*/
function FishingShadow()
{
    FishingShadow.super( this );
    this._speed = 0;
    this.init = function(_path)
    {
        this.animation = null;
        if(this.animation != null)
        {
            this.animation.destroy();
            this.animation = null;
        }
        this.animation = new Animation();
        this.animation.loadAtlas(_path);
        this.animation.interval = this._speed;
        this.animation.play();
        this.addChild(this.animation);
        this.blackMat = 
        [
            0,0,0,0,0,
            0,0,0,0,0,
            0,0,0,0,0,
            0,0,0,0.4,0,
        ];
        this.scaleX = this.scaleY = 0.8;
        this.colorFilter =  new laya.filters.ColorFilter(this.blackMat);
        this.animation.filters = [this.colorFilter];
        //this.alpha = 0.01;
    }

    this.play = function(_speed)
    {
        this.animation.interval = _speed;
    }

    this.setAnimtionSpeed = function(_dat)
    {
        //var s = this._speed * (100 / _dat);
        this.animation.interval = _dat;
    }

    this.remove = function()
    {
        this.animation.destroy();
        this.animation = null;
        this.removeSelf();
        /*laya.utils.Pool.recover('fishshadow',this);
        Game.getInstance().removeUpdate( this );*/
    }
}