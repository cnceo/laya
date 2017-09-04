/**
 * 
 * 充值按钮 2016 04 13
 * 点击弹出快速取款界面
 */
var RechargeBtn = (function (_super){
    var TOUCH_WIDTH = 130;//触摸宽度
    var TOUCH_HEIGHT = 120;//触摸高度

    //参数parentPanel为充值界面的父节点
	function RechargeBtn(parentPanel,bDemo){
		RechargeBtn.__super.call(this);
        
        this._parentNode = parentPanel;
        this.isDemoRoom = bDemo;

        this.anchorX = 0.5;
        this.anchorY = 0.5;
        this.width = TOUCH_WIDTH;
        this.height = TOUCH_HEIGHT;

        //图片
        var img = new laya.ui.Image();
        var _path = 'common/chessgame/chongzhi.png';
        img.name = "img";
        img.dataSource = {skin:_path,anchorX:0.5,anchorY:0.5,x:TOUCH_WIDTH/2,y:TOUCH_HEIGHT/2};
        this.addChild(img);
        //特效
        var animation = new Effect();
        animation.init("res/atlas/common/chargeEffect.json",80,true);
        img.addChild( animation );
        animation.x = -10;
        animation.y = -10;
        animation.play();

        this.expressBankPanel = new ExpressBankView();
        this._parentNode.addChild( this.expressBankPanel );
        this.expressBankPanel.Init(bDemo);
        
        this.onxClick = function(e){
            if(!this.expressBankPanel) return; 
            this._parentNode.setChildIndex(this.expressBankPanel,this._parentNode.numChildren-1 );   
            this.expressBankPanel.show( true );
        }

        this.on(Event.CLICK,this,this.onxClick);

        this.ForceCharge = function(minMoney){
            this.onxClick();
            this.expressBankPanel.forceExecute(minMoney);
        }
        this.updateViewPos = function(){
            if(this.expressBankPanel){
                this.expressBankPanel.updateViewPos();
            }
        }
        this.destroy = function(){
            //this._parentNode = null;
            this.expressBankPanel = null;
            this.__proto__.destroy();
        }
    }
    Laya.class(RechargeBtn, "RechargeBtn", _super);
    
    return RechargeBtn;
})(ScaleButton);