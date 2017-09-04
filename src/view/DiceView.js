/**
 *骰子
 */
function DiceView()
{
    DiceView.super( this );
    this.init = function(_caller,_callback){
        this.caller   = _caller;
        this.callback = _callback;
        this.imgDice = this.boxDice.getChildByName("imgDice");
        this.diceEffect = new Effect();
        this.diceEffect.init("res/atlas/dice/gif.json",450,true);        
        // this.diceEffect.anchorX = 0.5;
        // this.diceEffect.anchorY = 0.5;
        this.addChild( this.diceEffect );
        this.diceEffect.visible = false;
        this.imgDice.visible = false;
        this.updateViewPos();
    }
    this.play = function(num){
        this.num = num;
        this.visible = true;
        this.imgDice.visible = false;
        this.bg.alpha = 1;
        this.diceEffect.play();
        if(this._diceHideTask){
            TaskDelayManager.getInstance().removeTask(this._diceHideTask);
        }
        this._diceHideTask = new TaskDelay();
        this._diceHideTask.data = null;
        this._diceHideTask.callBack = function(){
            this.showDiceResult();
            this._diceHideTask = null;
        };
        this._diceHideTask.classObj = this;
        this._diceHideTask.leftTime = 1500;
        TaskDelayManager.getInstance().addTask( this._diceHideTask );

        Tween.clearAll( this.bg );
        Tween.to( this.bg,{ alpha : 0 },3000);
    }
    //显示掷骰子的结果
    this.showDiceResult = function(){
        this.diceEffect.PlayComplete();
        var t_res = Laya.loader.getRes( "dice/"+this.num+".png" );
        if(t_res){
            this.imgDice.graphics.clear();
            this.imgDice.graphics.drawTexture(t_res, 0, 0);
            this.imgDice.size(t_res.width, t_res.height);
            this.imgDice.pivotX = t_res.width >> 1;
            this.imgDice.pivotY = t_res.height >> 1;
            this.imgDice.visible = true;
            this.imgDice.alpha = 1;
            //this.PlayerControlCom.setFCPlayer();
            if( this.caller && this.callback ){
                this.callback.call( this.caller );
            }
            Tween.clearAll( this.imgDice );
            Tween.to( this.imgDice,{ alpha : 1 },1500,null,new Handler(this,function(){
                this.hide();
            }));
        }            
    }
    this.hide = function(){        
        this.visible = false;
        this.diceEffect.PlayComplete();
    }
    this.updateViewPos = function(){
        this.boxDice.x = Laya.stage.width >> 1;
        this.boxDice.y = Laya.stage.height >> 1;
        this.diceEffect.x = this.boxDice.x -48;	
        this.diceEffect.y = this.boxDice.y -50;
    }
}