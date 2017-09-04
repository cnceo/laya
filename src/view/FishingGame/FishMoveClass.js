/*
* 移动基类;
*/
    function FishMoveClass() {
        FishBase.super( this );
        this.pathList = new Array();
        this.speedList = new Array();
        this.pathNum = 2;
        this.speedNum = 0;
        this.speed = 200;
        this.alphaTime = 0;
        this.fish = new Array();
        this.ifFormation = false;
        //-----
        this.TweenMain = new TweenMaintain();
        this.TweenMain.init();
        this.addChild(this.TweenMain);
        //-----
        this.setPath = function(_pathList,_speedList)
        {
            this.pathList = _pathList;
            if(this.ifFormation == false)
            {
                var p1 = this.pathList[0];
			    var p2 = this.pathList[2];
                var point = this.callAlwaysPoint(p1,p2);
                this.x = point.x;
                this.y = point.y;
            }else{
                this.x = this.pathList[0].x;
                this.y = this.pathList[0].y;
            }
            //this.graphics.drawRect(this.x,this.y,300,300,"#FFFFFFFF");
            this.speedList = _speedList;
        }

        this.play = function()
        {
            if(this.ifFormation == false)
            {
                var p1 = this.pathList[0];
			    var p2 = this.pathList[2];
                var point = this.callAlwaysPoint(p1,p2);
                this.x = point.x;
                this.y = point.y;
            }
            this.stratMove(this.pathList[this.pathNum]);
        }

        this.addFish = function(_fish)
        {
            this.fish.push(_fish);
            if(this.ifFormation)
            {
                var angle = this.onAngle(this.pathList[1].x,this.pathList[1].y);
                _fish.alpha = 0;
                this.TweenMain.addTween(Tween.to(_fish,{alpha:1},this.alphaTime,null,Handler.create(_fish,null)));
            }else{
                var angle = this.onAngle(this.pathList[2].x,this.pathList[2].y);
                 _fish.alpha = 1;
            }
           // var angle = this.onAngle(this.pathList[2].x,this.pathList[2].y);
            _fish.rotation = angle;
        }

        this.stratMove = function(_point)
        {
            //return;
            //CLog.log("move on");
            if(this.pathNum >= this.pathList.length)
                return;
            var point = _point;
            this.prePoint = new Point(this.x,this.y);
            var dis = this.prePoint.distance(point.x,point.y);
            if(dis <= 0)
            {
                this.onComplete();
                return;
            }
            var time = (dis / this.speedList[this.speedNum]) * 1000;
            this.TweenMain.addTween(Tween.to(this,{x:point.x,y:point.y},time,null,Handler.create(this,this.onComplete)));
            for(var i = 0;i < this.fish.length;i++)
            {
                var p2 = new Point(this.fish[i].x,this.fish[i].y);
                var angle = this.onAngle(point.x,point.y);
                //CLog.log(angle);
                var mainAngle = this.fish[i].rotation;
                //CLog.log(angle - mainAngle);
                if(angle - mainAngle > 300)
                {
                    angle -= 360;
                }
                if(mainAngle - angle > 300)
                {
                    angle += 360;
                }
                var angleTime = 450;
			    if(time <= 450)
			    {
				    angleTime = time;
			    }
                angle = Math.ceil(angle);
                this.TweenMain.addTween(Tween.to(this.fish[i],{rotation:angle},angleTime,null,Handler.create(this.fish[i],null)));
                this.fish[i].setAnimtionSpeed(this.speedList[this.speedNum]);
            }
            
        }

        this.onAngle = function(x,y)
        {
            var angle = (Math.atan2((y - this.y),(x - this.x))) * (180/Math.PI);
            return angle + 180;
        }

        this.onComplete = function()
        {
            this.speedNum++;
            if(this.pathNum == this.pathList.length - 1)
            {
                if(this.ifFormation)
                {
                    var p1 = this.pathList[1];
                    var p2 = this.pathList[0];
                }else{
                    var p1 = this.pathList[1];
                    var p2 = this.pathList[this.pathList.length - 1];
                }
                /*var p1 = this.pathList[1];
                var p2 = this.pathList[this.pathList.length - 1];*/
                var point = this.callAlwaysPoint(p1,p2);
                this.stratMove(point);
                this.pathNum++;
                return;
            }
            if(this.pathNum == this.pathList.length)
            {
                this.clearAll();
                laya.utils.Pool.recover('moveClass',this); 
                return;
            }
            this.pathNum++;
            this.stratMove(this.pathList[this.pathNum]);
        }

        this.popChild = function(_fish)
        {
            for(var i = 0;i < this.fish.length;i++)
            {
                if(_fish == this.fish[i])
                {
                    this.fish.splice(i,1);
                    break;
                }
            }
            if(this.fish.length <= 0)
            {
                this.clearAll();
            }
        }

        this.clearAll = function()
        {
            this.pathList = new Array();
            this.speedList = new Array();
            this.pathNum = 2;
            this.speedNum = 0;
            this.speed = 200;
            this.alphaTime = 0;
            //this.fish = new Array();
            this.ifFormation = false;
            Tween.clearAll(this);
            for(var i = 0;i < this.fish.length;i++)
            {
                //tween.clearAll(fish);
                this.fish[i].remove();
                this.removeChild(this.fish[i]);
            }
            this.fish = new Array();
            this.removeSelf();
            laya.utils.Pool.recover('moveClass',this);
            Game.getInstance().removeUpdate( this );
        }

        this.callAlwaysPoint = function(p1,p2)
        {
            var dis = this.width;
            var angle = (Math.atan2((p2.y - p1.y),(p2.x - p1.x))) * (180/Math.PI) + 180;
            var x = p1.x + dis * Math.cos(angle * (Math.PI/180));
            var y = p1.y + dis * Math.sin(angle * (Math.PI/180));
            var point = new Point(x,y);
            return point;
        }
    }