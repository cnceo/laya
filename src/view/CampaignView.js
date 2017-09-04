/**
 * 活动界面
 */
function CampaignView()
{
    CampaignView.super(this);
    BasePageView.call(this);
    for(var i in BasePageView.prototype){
        CampaignView.prototype[i] = BasePageView.prototype[i];
    }


    this._obj = null;
    this._callback = null;
    this.Init = function(dataInit)
    {
        BasePageView.prototype.Init.call(this,dataInit);
        this._obj = this._parent = dataInit.parent;
        this._callback = dataInit.callback;
        this.imgBg.on( Event.CLICK,this,this.onBackBtn );
        this.btnWheelFortune = this.getChildByName('btnWheelFortune');
        this.btnWheelFortune.on( Event.CLICK,this,this.onWheelBtnClick );
        this.checkWheelCondition();        
    }
    this.show = function(bShow)
    {
        this.visible = bShow;
        if(!bShow && this._obj && this._callback){
            this._callback.call(this._obj);
        }
    }
    this.onBackBtn = function()
    {
        this.show(false);
    }    
    //转盘
    this.onWheelBtnClick = function(){         
        if( this.wheelPanel == null ) {
            this.wheelPanel = new WheelOfFortuneView();
            this._parent.addChild( this.wheelPanel );
            this.wheelPanel.init();
            this.wheelPanel.show(true);
        }else {
            this.wheelPanel.show(!this.wheelPanel.visible);
        }
        this.onBackBtn();
    }
    //检查是否需要展示转盘界面
    this.checkWheelCondition = function(){
        if(GameData.getInstance().lotteryNum > 0){
            this.onWheelBtnClick();
        }
    }
}