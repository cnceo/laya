/*
* Tween类维护 ;
*/
function TweenMaintain()
{
    TweenMaintain.super(this);

    //this.TweenList = new Array();
    this.init = function()
    {
        this.TweenList = new Array();
        Laya.stage.on( 'hide_window',this,this.onHideWindow );
        Laya.stage.on( 'show_window',this,this.onShowWindow );
    }

    this.addTween = function(_tween)
    {
        this.TweenList.push(_tween);
    }

    this.onHideWindow = function()
    {
        for(var i = 0;i < this.TweenList.length;i++)
        {
            if(this.TweenList[i].__InPool == false)
            {
                this.TweenList[i].pause();
                continue;
            }
            this.TweenList.splice(i,1);
            i--;
            continue;
        }
    }

    this.onShowWindow = function()
    {
        for(var i = 0;i < this.TweenList.length;i++)
        {
            if(this.TweenList[i].__InPool == false)
            {
                this.TweenList[i].resume();
                continue;
            }
            this.TweenList.splice(i,1);
            i--;
            continue;
        }
    }
}