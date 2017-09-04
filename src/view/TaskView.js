/**
 * zhengkaixin 2016 09 19
 * 任务
 */

function TaskView()
{
    TaskView.super(this);
    
    this.init = function( _data )
    {
        this.cellList = [];
        this.isUpdate = false;
        this.backBtn = this.getChildByName('backBtn');  
        this.createCell();    
    }
    this.destroy = function(){
        this.__proto__.destroy();
        this.hide();
    }
    this.show = function()
    {
        Laya.timer.frameLoop(1,this,this.update); 
        this.visible = true; 
        //每次打开时表现动画
        this.setProgressInfo();
        this.backBtn.on( Event.CLICK,this,this.hide ); 
    }
    this.hide = function(){
        Laya.timer.clear(this,this.update);
        this.stopUpdate();
        this.visible = false;
        this.backBtn.off( Event.CLICK,this,this.hide );       
        TaskInfoManager.getInstance().clearRoomTask(); 
    }
    this.removeCell = function(id)
    {
        var arr = this.lstCell.array;
        var idx = -1;
        for(var i in arr){
            CLog.log("i:"+i+"   content:"+arr[i].id);
        }
        if(idx === -1) return;
        this.lstCell.deleteItem(idx);
    }
    this.setProgressInfo = function(){
        //this.boxSlider.visible = false;
        var curScense = ChangeScene.getInstance().getSceneType();
        var compNum = TaskInfoManager.getInstance().GetComplatedTaskNum(curScense); 
        var count = TaskInfoManager.getInstance().GetTaskBySceneType(curScense).length;
        this.labelProgress.text = compNum + '/' + count;
        this.isUpdate = true;
        this.curTempNum = 0;
        this.lblNone.visible = (count == 0);
        // this.sliderCom = new SliderPro( this.getChildByName('slider'),'horizontal' );
        // this.sliderCom.init();
        // this.sliderCom.setSliderPos( compNum / count );
    }
    this.update = function(){
        if(!this.isUpdate) return;
        this.applayFilter();
    }
    //表现动画
    this.applayFilter = function(){
        var curScense = ChangeScene.getInstance().getSceneType();
        var compNum = TaskInfoManager.getInstance().GetComplatedTaskNum(curScense);
        this.boxSlider.visible = true;
        var count = TaskInfoManager.getInstance().GetTaskBySceneType(curScense).length;
        if(count == 0){
            this.stopUpdate();
            return;
        }
        var percent = 1 - parseFloat(this.curTempNum) / parseFloat(count);
        if(percent <= 0) percent = 0.000001;
        if(percent >= 1) percent = 0.999999;
        var gb = this.barBackMask.getChildByName('gb');
        if(!gb){
                gb = new Sprite();
                gb.name = "gb";
                this.barBackMask.addChild(gb);
        }
        gb.graphics.clear();
        gb.graphics.drawPie(87,-87,87,270,270 - 360 * percent,'#7b692a');
        if(this.curTempNum >= compNum) {
            this.stopUpdate();
            return;
        }
        
        //var x =  2*Math.PI/360*((1 - percent) * 90);
        //this.curTempNum += 1 * Math.cos(x)  / 30;
        this.curTempNum += compNum / 15;
    }
    this.stopUpdate = function(){
        this.isUpdate = false;
        this.curTempNum = 0;
    }
    
    this.createCell = function()
    {
        TaskInfoManager.getInstance().InitUITaskInfo(this.lstCell);
        this.setProgressInfo();
    }
}