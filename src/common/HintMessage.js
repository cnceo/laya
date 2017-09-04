/**
 * huangandfly 2016 07 21 
 * 消息提示
 */
function HintMessage( _text )
{
    HintMessage.super(this);

    this.hide = function()
    {
        this.removeSelf();
        this.destroy();
    }
    
    this.txt = this.getChildByName('txt');
    this.bg  = this.getChildByName('bg');
    this.txt.text = _text;
    this.bg.width = this.txt.width + 20;

    if(!Game.getInstance().currentScene){
        alert(_text);
        this.hide();
        return;
    }
    
    // this.x = (Game.getInstance().currentScene.width - this.bg.width) >> 1;
    // this.y = Game.getInstance().currentScene.height;
    
    // Tween.to(this,{ y:(Game.getInstance().currentScene.height - this.height - 30) >> 1 },800,Ease['elasticOut']);
    this.x = (Laya.stage.width - this.bg.width) >> 1;
    this.y = Laya.stage.height;
    
    Tween.to(this,{ y:(Laya.stage.height - this.height - 30) >> 1 },800,Ease['elasticOut']);
    
    var task = new TaskDelay();
    task.data = null;
    task.callBack = this.hide;
    task.classObj = this;
    task.leftTime = 3000;
    task.forceExecute = true;
    TaskDelayManager.getInstance().addTask( task );
    
    Game.getInstance().currentScene.addChild( this ); 
}

