function TaskDelay()
{
    this.data = null;
    this.callBack = null;
    this.classObj = null;
    this.leftTime = 0;
    
        //完成
    this.done = function()
    {
        this.callBack.call( this.classObj,this.data );
        this.callBack = null;
        this.classObj = null;
        this.data = null;
    }
}

