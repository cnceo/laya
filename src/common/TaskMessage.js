/**
 * 任务提示
 * taskInfo : 任务内容
 * panelTask : 承载任务消息的panel
 * delay : 延迟执行
 */
function TaskMessage( TaskID,panelTask,delay )
{
    TaskMessage.super(this);

    this.hide = function()
    {
        this.removeSelf();
        this.destroy();
    }
    
    this.txt = this.getChildByName('txt');
    this.bg = this.getChildByName('bg');
    this.bg.alpha = 0;
    //this.wancheng.alpha = 0;
    this.wancheng.scaleX = 1.5;
    this.wancheng.scaleY = 1.5;
    this.wancheng.visible = false;
    
    if(panelTask){
        this.x = panelTask.width;
        this.y = 0;
        panelTask.addChild(this);
    }
    else{
        this.x = (Laya.stage.width) ;
        this.y = Laya.stage.height - 150;
        Game.getInstance().currentScene.addChild( this ); 
    }
    var taskInfo = TaskInfoManager.getInstance().GetTaskByID(TaskID);   
    
    if(null == taskInfo) {
        this.hide();
        return;
    }
    this.txt.text = taskInfo.Name + "(" + taskInfo.StatusDesc + ")" ;
    var self = this;
    delay = delay || 0;
    //bg渐渐显示动画
    Tween.to(this.bg,{alpha:1},500,null,null,delay);
    //左移动画
    Tween.to(this,{ x:10 },500,null,null,delay);
    //砸下动画
    
    Laya.timer.once(500,this,function(){
        self.wancheng.visible = true;
        Tween.to(self.wancheng,{scaleX:1,scaleY:1},300,Ease['bounceOut']);
    });
    // //消失动画
    // Tween.to(this,{alpha:0.1},1500,null,Handler.create(self,function() {
    //         self.hide();
    //     }),3000+delay);
    //右移动画
    var xP = panelTask ? panelTask.width : ((Laya.stage.width - this.bg.width) >> 1);
    Tween.to(this,{x:xP,alpha : 0.7},500,null,new Handler(self,function(){
        self.hide();
    }),3000+delay);
}

