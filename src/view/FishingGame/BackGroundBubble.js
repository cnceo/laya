/*
* 场景泡泡基类;
*/
function BackGroundBubble()
{
    BackGroundBubble.super( this );
    this.minDeviationY = 50;
    this.deviationY = 100;
    this.Area = 20;
    this.loopTime = 5000;
    this.birthSize = 0;
    this.birthAlpha = 1;
    this.maxSize = 0.25;
    //---
    this.TweenMain = new TweenMaintain();
    this.TweenMain.init();
    this.addChild(this.TweenMain);
    //---
    this.playChange = function()
    {
        for(var i = 0;i < 10;i++)
        {
            var dx = Math.random() * 160;
            for(var i2 = 0;i2 < 6;i2++)
            {
                var dy = Math.random() * 150;
                var x = i * 160 + dx;
                var y = i2 * 150 + dy;
                var laterTime = Math.random() * 600;
                var task = new TaskDelay();
                task.data = [x,y];
                task.callBack = this.startBgBirth;
                task.classObj = this;
                task.leftTime = laterTime;
                TaskDelayManager.getInstance().addTask(task);
            }
        }
        var task = new TaskDelay();
        task.data = this;
        task.callBack = this.clearMyself;
        task.classObj = this;
        task.leftTime = 3000;
        TaskDelayManager.getInstance().addTask(task);
    }

    this.startBgBirth = function(data)
    {
        var x = data[0];
        var y = data[1];
        var child = new Sprite();
        child.x = x;
        child.y = y;
        child.loadImage("fishing/UI/bubble.png");
        child.pivot(child.width / 2,child.height / 2);
        child.alpha = this.birthAlpha;
        //child.alpha = 1;
        child.scaleX = child.scaleY = this.birthSize;
        //child.scaleX = child.scaleY = 1;
        this.TweenMain.addTween(Tween.to(child,{scaleX:1.5,scaleY:1.5},800,null));
        this.TweenMain.addTween(Tween.to(child,{alpha:0.8,},600,null));
        this.TweenMain.addTween(Tween.to(child,{alpha:0},200,null,Handler.create(child,child.disappear),delay = 600));
        this.addChild(child);
        var task = new TaskDelay();
        task.data = child;
        task.callBack = this.complate;
        task.classObj = this;
        task.leftTime = 800;
        TaskDelayManager.getInstance().addTask(task);
    }

    this.playBG = function()
    {
        var laterTime = Math.random() * 8000;
        Laya.timer.once(laterTime,this,this.startBirth);
    }

    this.startBirth = function()
    {
        //console.log("ffffffffffffffffffffffffffffff");
        this.animateTimeBased();
        Laya.timer.loop(this.loopTime,this,this.animateTimeBased);
        //this.animateTimeBased();
    }

    this.animateTimeBased = function()
    {
        var child = new Sprite();
        var dy = Math.round(Math.random() * ((this.deviationY * -1) - (this.minDeviationY * -1)) + (this.minDeviationY * -1));
        var dx = Math.round(Math.random() * (this.Area - (this.Area * -1)) - (this.Area * -1));
        child.loadImage("fishing/UI/bubble.png");
        child.pivot(child.width / 2,child.height / 2);
        child.scaleX = child.scaleY = this.birthSize;
        child.alpha = this.birthAlpha;
        this.TweenMain.addTween(Tween.to(child,{alpha:0,scaleX:this.maxSize,scaleY:this.maxSize,x:dx,y:dy},2000,null));
        this.addChild(child);
        var task = new TaskDelay();
        task.data = child;
        task.callBack = this.complate;
        task.classObj = this;
        task.leftTime = 2000;
        TaskDelayManager.getInstance().addTask(task);
    }

    this.complate = function(_data)
    {
        this.removeChild(_data);
        _data.destroy();
    }

    this.remove = function()
    {
        Laya.timer.clearAll(this);
        var task = new TaskDelay();
        task.data = this;
        task.callBack = this.clearMyself;
        task.classObj = this;
        task.leftTime = 2000;
        TaskDelayManager.getInstance().addTask(task);
    }

    this.clearMyself = function()
    {
        this.removeSelf();
        this.destroy();
    }
}