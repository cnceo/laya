/*
message : 消息内容
bForce : 是否屏蔽底层事件
delayToDistroy : 延迟一段时间自动消亡
bShowLoading : 是否展示loading图
tag     : 标识，当有相同标识的message时，删除上一个
*/
function TipsMessage( message ,bForce,bShowLoading,delayToDistroy,tag)
{
    TipsMessage.super(this);
    
    this.name = tag;
    this.lblTips.anchorX = 0.5;
    this.lblTips.align = "center";
    this.lblTips.text = message;//赋值前后要重新设置anchorX和align 否则会出现错位(当前版本1.7.2)
    this.lblTips.anchorX = 0.5;
    this.lblTips.align = "center";
    var width = this.lblTips.width;
    var height = this.lblTips.height;
    
    if(width > 600){
        this.lblTips.width = 600;
        this.lblTips.height = 100;
        this.lblTips.wordWrap = true;        
    }
    this.bgTxt.width = this.lblTips.width + 20;
    this.bgTxt.height = this.lblTips.height + 20;
    this.loadingPic = this.getChildByName("loadingPic");
    this.loadingPic.visible = false;  

    this.boxTip.x = Laya.stage.width >> 1;
    this.loadingPic.x = Laya.stage.width >> 1;


    this.hide = function()
    {
        this.removeSelf();
        this.destroy();        
    }
    this.updateViewPos = function(){
        this.boxTip.x = Laya.stage.width >> 1;
        this.loadingPic.x = Laya.stage.width >> 1;
    }
    this.destroy = function()
    {
        TaskDelayManager.getInstance().clearTarget(this);
        this.__proto__.destroy();
    }
    this.onClick = function(){
    }
    this.randomAnim = function(){
        if(this.numAnimationPlay > 0) return;
         var num = Math.random()*3 + 1;//从1到3随机
         this.numAnimationPlay = parseInt(num);
         this.playAnimation();
    }
    // 显示loading界面特效
    this.playAnimation = function()
    {
        var img = this.getChildByName("loadingPic");
        if(!img) return;
        if(this.numAnimationPlay <= 0){
            var timeRandom = Math.random() * 2000;
            var task = new TaskDelay();
            task.callBack = this.randomAnim;
            task.classObj = this;
            task.leftTime = timeRandom;
            TaskDelayManager.getInstance().addTask( task ); 
        }
        else{
            img.scaleX = 1;
            var time = 300;
            Tween.clearAll(img);
            Tween.to(img,{scaleX:-1}, time, Ease['strongInOut'],new Handler(this,function(){
                Tween.to(img,{scaleX:1}, time, Ease['strongInOut'],new Handler(this,this.playAnimation));            
            }));
            this.numAnimationPlay--;
        }        
    }

    // this.update = function(){        
    //     if( !this.visible )
    //         return;
    //     this.loadingPic.rotation += 10;
    // }

    if(bForce){
        this.blackBg.visible = true;
        //屏蔽底层事件
        this.blackBg.on(Event.CLICK,this,this.onClick );
        this.blackBg.alpha = 0.02;
        this.boxTip.visible = false;
    }
    else{
        this.blackBg.visible = false;
    }
    this.bgTxt.visible = !bForce;
    if(!bForce && !bShowLoading){
        // this.bgTxt.x = this.bgTxt.x - 80;
        // this.lblTips.x = this.lblTips.x - 80;
        this.y = this.y - 50;
    }

    if(delayToDistroy){
        var task = new TaskDelay();
        task.data = null;
        task.callBack = this.hide;
        task.classObj = this;
        task.leftTime = delayToDistroy;
        task.forceRetain = true;
        TaskDelayManager.getInstance().addTask( task );
    }

    if(bShowLoading){
        this.loadingPic.visible = true;
        //Game.getInstance().addUpdate( {callback:this.update,caller:this} );
        this.randomAnim();
    }
    //当有相同tag的tips时，删除上一个tips
    if(tag && Game.getInstance().TipLayer.getChildByName(tag)){
        var node = Game.getInstance().TipLayer.getChildByName(tag);
        //Game.getInstance().TipLayer.removeChildByName(tag);//这种做法不会走destroy
        node.removeSelf();
        node.destroy();
    };
    Game.getInstance().TipLayer.addChild(this);    
}
