/*
* 渔网类 huangfei 2016 11 17;
*/
var FishNetBase = (function (_super) {
    function FishNetBase() 
    {
        this.animation = null;
        BasePlayerView.__super.call(this);
        this.init = function( _path )
        {
            /*if(this.animation != null)
            {
                this.animation.distroy();
                this.animation = null;
            }
            this.animation = new Animation();
            this.animation.loadAtlas("res/atlas/fishing/Effects/bubble.json");
            //this.animation.loadAtlas("res/atlas/fishing/image/bullet01.json");
            //res/atlas/fishing/image/bullet01.json
            this.animation.interval = 200;
            this.animation.play(); 
            this.addChild( this.animation );*/
            Tween.clearAll(this);
            this.dataSource = {skin:_path};
        }

        this.disappear = function()
        {
            this.removeSelf();
            laya.utils.Pool.recover('fishNet',this);
        }
    }

    Laya.class(FishNetBase,"FishNetBase",_super);
    return FishNetBase;
}(laya.ui.Image));
