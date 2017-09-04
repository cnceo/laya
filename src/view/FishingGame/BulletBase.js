/**
 * 子弹基类 huangandfly
 * 2016 11 16
 */
function BulletBase()
{
    BulletBase.super( this );
    this.pointList = null;
    this.pointData = null;
    this.vertexData = new Array(4);
    this.b = false;
    this.level = 0;
    this.init = function( _path,_interval,_speed,_level )
    {
        this.level = _level;
        if( this.animation != null )
        {
            this.animation.destroy();
            this.animation = null;
        }
        switch(_path)
        {
            case 0:{
                var path = "res/atlas/fishing/image/bullet01.json";
                Laya.loader.load( "res/atlas/fishing/collision/bullet01.fcd", new Handler( this, this.onLoadComp),null, Loader.BUFFER ); 
                break;
            }
            case 1:{
                var path = "res/atlas/fishing/image/bullet02.json";
                Laya.loader.load( "res/atlas/fishing/collision/bullet02.fcd", new Handler( this, this.onLoadComp),null, Loader.BUFFER ); 
                break;
            }
            case 2:{
                var path = "res/atlas/fishing/image/bullet03.json";
                Laya.loader.load( "res/atlas/fishing/collision/bullet03.fcd", new Handler( this, this.onLoadComp),null, Loader.BUFFER ); 
                break;
            }
        }
        this.animation = new Animation();
        this.animation.loadAtlas( path );
        this.animation.interval = _interval;// 设置播放间隔（单位：毫秒）
        this.animation.play(); 
        this.addChild( this.animation );

        this.can = false;
        this.speed = _speed;
        //this.speed = 5;
        var size = this.animation.getBounds();
        this.width  = size.width;
        this.height = size.height;
        this.vertexData[0]=new Point(0,0);
        this.vertexData[1]=new Point(this.width,0);
        this.vertexData[2]=new Point(this.width,this.height);
        this.vertexData[3]=new Point(0,this.height);
       // this.graphics.drawRect(0,0,this.width,this.height,"#FFFF0000");
        Game.getInstance().addUpdate( {callback:this.update,caller:this} );
        //Laya.loader.load( "res/atlas/fishing/collision/bullet01.fcd", new Handler( this, this.onLoadComp),null, Loader.BUFFER ); 

    }

    this.update = function(dt)
    {
        if(this.b)
        {
            return;
        }
        if( !this.visible || !this.parent || this.can)
            return;
        var x = this.speed * Math.cos((this.rotation + 270) * (Math.PI/180));
        var y = this.speed * Math.sin((this.rotation + 270) * (Math.PI/180));
        //return;
        if(this.x >= 0 && this.x <= 1620 && this.y >= 0 && this.y <=  900)
        {
            this.x = this.x + x;
            this.y = this.y + y;
            return;
        }else{
            if(this.x < 0 || this.x > 1620)
            {
                //碰到竖轴
                x = x * -1;
            }else if(this.y < 0 || this.y > 900)
            {
                //碰到横轴
                y = y * -1;
            }else
            {
                //出错
                this.remove();
                return;
            }
            switch(parseInt(this.rotation))
            {
                case -41:
                    this.rotation += 180;
                    this.x = 1;
                    this.y = 1;
                    this.onAngle();
                    return;;
                case 41:
                    this.rotation += 180;
                    this.x = 1619;
                    this.y = 1;
                    this.onAngle();
                    return;
                case 516:
                    this.rotation += 180;
                    this.x = 1619;
                    this.y = 899;
                    this.onAngle();
                    return;
                case 564:
                    this.rotation += 180;
                    this.x = 1;
                    this.y = 899;
                    this.onAngle();
                    return;
                default:
                    var angle = this.changeAngle(this.x + x,this.y + y);
                    this.rotation = angle + 270;
                    break;
            }
            this.x += x;
            this.y += y;
            this.onAngle();
        }
    }

    this.changeAngle = function(x,y)
    {   
        var angle = (Math.atan2((y - this.y),(x - this.x))) * (180/Math.PI);
        return angle + 180;
    }

    this.remove = function()
    {
        this.removeSelf();
        laya.utils.Pool.recover('bullet',this);
        this.animation.destroy();
        this.animation = null;
        Game.getInstance().removeUpdate( this );
    }

    this.onLoadComp = function(_data)
    {
        var _byte = new Byte( _data );
        if( _byte.getInt32() != 3112301 )
        {
            new HitMessage("部分文件已损坏，请清除浏览器缓存重新进入");
            return;
        }
        var pLength = _byte.getInt32();
        var singleCheck = _byte.getByte();
        this.pivotX = _byte.getInt32();
        this.pivotY = _byte.getInt32();
        var dstr = this.EncData(_byte.getUTFBytes(),311);
        if(singleCheck == 1)
        {
            this.onMoreCheck();
            return;
        }
        this.onSingleCheck(dstr,pLength);
    }

    this.onSingleCheck = function(dstr,pLength)
    {
        var pList = dstr.split('#');
        this.pointList = new Array();
        this.pointData = new Array();
        var locArray = new Array();
        for(var i = 0;i < pList.length;i++)
        {
            var str = pList[i];
            var lst = str.split(',');
            var x = parseInt(lst[0]);
            var y = parseInt(lst[1]);
            this.pointList.push(new Point(x,y));
            locArray.push(x);
            locArray.push(y);
        }
        this.pointData = this.pointList;
        if( pLength != this.pointList.length )
        {
            new HitMessage("部分文件已损坏，请清除浏览器缓存重新进入");
            return;
        }
        this.onAngle();
    }

	this.onAngle = function()
    {
        //CLog.log("=============" + this.rotation);
        if (this.pointList == null)
        {
            return;
        }
        this.pointData = new Array();
        var locArray = new Array();
        for(var i = 0;i < this.pointList.length;i++)
        {
            var point = this.pointList[i]
            var distance = Math.sqrt( (this.pivotX - point.x) * (this.pivotX - point.x) + (this.pivotY - point.y) * (this.pivotY - point.y) );
            var angle = (this.rotation * Math.PI/180);//角度转换成弧度
            var x = (point.x - this.pivotX) * Math.cos(angle) - (point.y - this.pivotY) * Math.sin(angle) + this.pivotX;
			var y = (point.y - this.pivotY) * Math.cos(angle) + (point.x - this.pivotX) * Math.sin(angle) + this.pivotY;
            this.pointData.push(new Point(x,y));
        }
    }

    this.onVerAngle = function (rotAngle)
    {
        var pData = new Array(4)
        pData[0]=new Point(0,0);
        pData[1]=new Point(this.width,0);
        pData[2]=new Point(this.width,this.height);
        pData[3]=new Point(0,this.height);
        this.vertexData = new Array(4);
        //this.vertexData = pData;
        for(var i = 0;i < pData.length;i++)
        {
            var point = pData[i];
            var distance = Math.sqrt( (this.pivotX - point.x) * (this.pivotX - point.x) + (this.pivotY - point.y) * (this.pivotY - point.y) );
            var angle = (rotAngle * Math.PI/180);//角度转换成弧度
            var x = (point.x - this.pivotX) * Math.cos(angle) - (point.y - this.pivotY) * Math.sin(angle) + this.pivotX;
            var y = (point.y - this.pivotY) * Math.cos(angle) + (point.x - this.pivotX) * Math.sin(angle) + this.pivotY;
            this.vertexData[i] = new Point(x,y);
        }
    }

    //Enc data
    this.EncData = function(_data,_key)
    {
        var str = "";
        for(var i = 0;i < _data.length;i++)
		{
			var s = String.fromCharCode(_data.charCodeAt(i) ^ _key);
			str += s;
		}
		return str;
    }
}