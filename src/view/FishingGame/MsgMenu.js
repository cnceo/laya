/*
* 公告板基类;
*/
function MsgMenu()
{
    MsgMenu.super( this );
    this.Board = null;
    this.TextSp = null;
    this.BoardVisible = true;
    //---
    this.TweenMain = new TweenMaintain();
    this.TweenMain.init();
    this.addChild(this.TweenMain);
    //---
    /*this.init = function(_str)
    {

    }*/
    this.init = function(_str,_color1,_color2,_size,_stroke,_y,_y1)
    {
        if(this.BoardVisible)
        {
            this.Board = new Sprite();
            this.Board.loadImage("fishing/UI/msgMenu.png");
            this.Board.pivot(this.Board.width/2,this.Board.height/2);
            this.x = 810;
            this.y = 450;
            this.addChild(this.Board);
        }
        /*this.Board = new Sprite();
        this.Board.loadImage("fishing/UI/msgMenu.png");
        this.Board.pivot(this.Board.width/2,this.Board.height/2);
        this.x = 810;
        this.y = 450;
        this.addChild(this.Board);*/
        //----------------
        this.TextSp = new Sprite();
        this.TextSp.y = -20;
        this.addChild(this.TextSp);
        //----------------
        var Text3 = new Laya.Text();
        Text3.bold = true;
        Text3.text = _str;
        Text3.fontSize = _size;
        Text3.color = "#000000";
        Text3.alpha = 0.5;
        Text3.font = "Microsoft YaHei";
        Text3.y = _y1;
        Text3.pivot(Text3.width/2,Text3.height/2);
        this.TextSp.addChild(Text3);
        //----
        var Text2 = new Laya.Text();
        Text2.bold = true;
        Text2.text = _str;
        Text2.fontSize = _size;
        Text2.color = _color2;
        Text2.stroke = _stroke;
        Text2.strokeColor = _color2;
        Text2.font = "Microsoft YaHei";
        Text2.y = _y;
        Text2.pivot(Text2.width/2,Text2.height/2);
        this.TextSp.addChild(Text2);
        //----
        var Text1 = new Laya.Text();
        Text1.bold = true;
        Text1.text = _str;
        Text1.fontSize = _size;
        //Text1.color = "#ffda5b";
        Text1.color = _color1;
        Text1.stroke = _stroke;
        Text1.strokeColor = _color2;
        //Text1.strokeColor = "#4d330b";
        Text1.font = "Microsoft YaHei";
        Text1.pivot(Text1.width/2,Text1.height/2);
        this.TextSp.addChild(Text1);
        //this.play();
    }

    this.play = function()
    {
        this.Board.scaleY = 0;
        this.Board.alpha = 0;
        this.TextSp.alpha = 0;
        this.TextSp.x = -200;
        this.TweenMain.addTween(Tween.to(this.Board,{alpha:1,scaleY:1},400,null));
        this.TweenMain.addTween(Tween.to(this.Board,{alpha:0,scaleY:1.3},300,null,Handler.create(this.Board,this.Board.disappear),delay = 1200));
        this.TweenMain.addTween(Tween.to(this.TextSp,{alpha:1},200,null,Handler.create(this.TextSp,this.TextSp.disappear),delay = 100));
        this.TweenMain.addTween(Tween.to(this.TextSp,{x:-50},400,Ease['circOut'],Handler.create(this.TextSp,this.TextSp.disappear),delay = 100));
        this.TweenMain.addTween(Tween.to(this.TextSp,{x:0},800,null,Handler.create(this.TextSp,this.TextSp.disappear),delay = 400));
        this.TweenMain.addTween(Tween.to(this.TextSp,{alpha:-1,x:200},300,Ease['circIn'],Handler.create(this.TextSp,this.TextSp.disappear),delay = 1200));
        var task = new TaskDelay();
        task.data = null;
        task.callBack = this.remove;
        task.classObj = this;
        task.leftTime = 1500;
        TaskDelayManager.getInstance().addTask(task);

    }

    this.remove = function()
    {
        this.removeChild( this.Board);
        this.removeChild( this.TextSp);
        this.Board.destroy();
        this.TextSp.destroy();
        this.destroy();
    }
}