/**
 * 鱼基类
 */
function FishBase()
{
    FishBase.super( this );
    this.fishID = "";
    this.animation = null;
    this.currentIndex = 0;
    this.pathList = null;
    this.speed = 50;
    this.pointList = null;
    this.pointData = null;
    this.vertexData = new Array(4);
    this.collisionType = 0;
    this._money = 0;
    this._speed = 0;
    this._proba = 0;
    this.fishShadow = null;
    this.shadow = null;
    this.path;
    this.shadowParent = null;
    this.init = function( _path )
    {
        if( this.animation != null )
        {
            this.animation.destroy();
            this.animation = null;
        }
        this.animation = new Animation();
        this.animation.loadAtlas( _path );
        this.animation.interval = this._speed;			// 设置播放间隔（单位：毫秒）
        this.animation.play(); 
        this.addChild( this.animation );

        var rect = this.getBounds();
        this.pivotX = 0;
        this.pivotY = 0;

        this.width  = rect.width;
        this.height = rect.height;

        this.direction = 'L';
        this.leftORright = 1;
        this.vertexData[0]=new Point(0,0);
        this.vertexData[1]=new Point(this.width,0);
        this.vertexData[2]=new Point(this.width,this.height);
        this.vertexData[3]=new Point(0,this.height); 
        this.path = _path;
        //this.fishShadow(_path);
    }

    this.setCollision = function(_data)
    {
        //CLog.log("set collision");
        this.pivotX = _data[0].x;
        this.pivotY = _data[0].y;
        this.collisionType = _data[1];
        this.pointData = _data[2].slice();
        //this.fishShadow();
    }

    this.fishShadow = function(_parent)
    {
        if(this.shadow != null)
        {
            this.shadow.remove();
            this.shadow = null;
        }
        this.shadow = new FishingShadow(this.path);
        this.shadow.init(this.path);
        this.shadow.y = 50;
        this.shadow._speed = this._speed;
        this.shadow.pivotX = this.pivotX;
        this.shadow.pivotY = this.pivotY;
        _parent.addChild(this.shadow);
        Game.getInstance().addUpdate( {callback:this.update,caller:this} );
    }

    this.update = function(dt)
    {
        //---刷新阴影位置
        var x = this.x + this.parent.x;
        var y = this.y + this.parent.y + 40;
        this.shadow.rotation = this.rotation;
        this.shadow.x = x;
        this.shadow.y = y;
    }

    this.play = function()
    {
        this.animation.interval = this._speed;
        //this.shadow
        //console.log(this._money);
    }
    

    this.getCollision = function()
    {
        if(this.collisionType == 0)
        {
            return this.pointData;
        }else{
            return this.pointData[this.animation.index];
        }
    }

    this.setAnimtionSpeed = function(_dat)
    {
        if(this.shadow == null || this.animation == null)
        {
            return;
        }
        var s = this._speed * (100 / _dat);
        this.animation.interval = s;
        if(this.shadow != null)
        {
            this.shadow.setAnimtionSpeed(s);
        }
        //this.shadow.setAnimtionSpeed(s);
    }

    this.remove = function()
    {
        //----清除影子
        //this.shadowParent.removeChild(this.shadow);
        if(this.shadow != null)
        {
            this.shadow.remove();
            this.shadow.destroy();
            this.shadow = null;
        }
        //------------
        this.fishID = "";
        this.currentIndex = 0;
        this.pathList = null;
        if(this.animation != null)
        {
            this.animation.destroy();
            this.animation = null;
        }
        this.pointList = null;
        this.pointData = null;
        this.vertexData = new Array(4);
        this.collisionType = 0;
        this._money = 0;
        this._speed = 0;
        this._proba = 0;
        Tween.clearAll(this);
        this.removeSelf();
        laya.utils.Pool.recover('fish',this);
        Game.getInstance().removeUpdate( this );
    }
}