/**
 * huangandfly 2016 07 20
 * 快速取款
 */
function ExpressBankView()
{
    ExpressBankView.super(this);
    
    this.Init = function(bDemo)
    {
        var slider = this.boxBody.getChildByName('slider');
        this.sliderCom = new SliderPro( slider,'horizontal' );
        this.sliderCom.init(this.sliderCallbackProcess,this);
        
        this.localMoneyTxt  = this.boxBody.getChildByName('localMoney');
        this.walletMoneyTxt = this.boxBody.getChildByName('walletMoney');
        
        this.cancelBtn = this.boxBody.getChildByName('cancelBtn');
        this.confirmBtn = this.boxBody.getChildByName('confirmBtn');
        this.countdown = this.confirmBtn.getChildByName('countdown');
        this.lableMax = slider.getChildByName('txtMaxLabel');
        this.lableMin = slider.getChildByName('txtMinLabel');
        this.isDemoRoom = bDemo || GameData.getInstance().bLoginDemo;

        //非试玩用户在非试玩房间时，请求一次
        if(!this.isDemoRoom){
            //GateSocketClient.getInstance().CG_GET_MONEY_REQ();
            GateSocketClient.getInstance().CG_GET_BANK_MONEY_REQ();
        }
        this.setMoneyInfo();
        this.lableMin.color = (User.getInstance().GetGameMoney() == 0) ? GameData.getInstance().COLOR.GRAY : GameData.getInstance().COLOR.YELLOW;
        this.visible = false;
        this.updateViewPos();
    }
    this.updateViewPos = function(){
        this.boxBody.x = Laya.stage.width >> 1;
        this.boxBody.y = Laya.stage.height >> 1;
    }
    this.setMoneyInfo = function(){

        this.setWalletMoney(User.getInstance().GetBankMoney());
        this.setGameMoney(User.getInstance().GetGameMoney());
        this.localMoneyCopy  = this.localMoney;
        this.total = this.walletMoney + this.localMoney;
        
        this.setSliderPosition(this.localMoney/this.total);
    }
    this.show = function( _show )
    {
        this.countdown.visible = false;
        if( _show )
        {
            this.addListener();
            this.setMoneyInfo();
            this.sliderCom.showTipsAnim();
        }else 
        {
            this.removeListener();
            this.sliderCom.stopTipsAnim();
        }
        this.visible = _show;
        this.cancelBtn.disabled = false;
    }
    //强制充钱
    this.forceExecute = function(minMoney){
        this.cancelBtn.disabled = true;
        if(User.getInstance().GetBankMoney() < minMoney) return;
        this.setWalletMoney( User.getInstance().GetBankMoney() - minMoney );
        this.setGameMoney(User.getInstance().GetGameMoney() + minMoney);
        this.localMoneyCopy  = this.localMoney;
        this.total = this.walletMoney + this.localMoney;
        
        this.setSliderPosition(this.localMoney/this.total);

        this.countdown.visible = true;
        this.countdown.startTimer(GameData.getInstance().settlementTime,null,this,null,false);
    }
    this.addBtnListener = function( _name,callback )
    {
        var t_node = this.boxBody.getChildByName( _name );
        if( t_node )
        {
            t_node.on( Event.CLICK,this,callback );
        }
    }
    
    this.removeBtnListener = function( _name,callback )
    {
        var t_node = this.boxBody.getChildByName( _name );
        if( t_node )
        {
            t_node.off( Event.CLICK,this,callback );
        }
    }

    this.addListener = function()
    {
        this.backBtn.on(Event.CLICK,this,this.onCancelBtn);
        this.addBtnListener( 'confirmBtn',this.onConfirmBtn );
        this.addBtnListener( 'cancelBtn',this.onCancelBtn );
        MessageCallbackPro.addCallbackFunc( EventType.Type.bankChargeEvent,this.onChargeBack,this);
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerMoneyChanged,this.onMoneyUpdated,this);
    }

    this.removeListener = function()
    {
        MessageCallbackPro.removeCallbackFunc( EventType.Type.bankChargeEvent,this.onChargeBack,this); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerMoneyChanged,this.onMoneyUpdated,this); 
    }
    this.destroy = function(){
        this.countdown.onRelease();
        this.removeListener();
        this.__proto__.destroy();
    }

    this.onChargeBack = function(e){
        this.countdown.stop();
        this.show(false);
    }
    this.onMoneyUpdated = function(content){
        this.setMoneyInfo();
    }
    this.onCancelBtn = function()
    {
        this.countdown.stop();
        this.show( false );        
    }

    this.onConfirmBtn = function()
    {
        var chargeMoney = this.localMoney - User.getInstance().GetGameMoney();
        chargeMoney = parseInt(chargeMoney / 100) * 100;
        if(this.isDemoRoom){
            new HintMessage("试玩不支持此操作");
        }
        else if(chargeMoney == 0){
            new HintMessage("取款金额不能为0");
        }
        else{
            GateSocketClient.getInstance().CG_CHARGE_BANK_MONEY_REQ(chargeMoney);
        }
        //TODO tip展示
        this.show( false );
        this.countdown.stop();
    }

    this.setGameMoney = function( value )
    {
        this.localMoneyCopy = value;
        this.setLocalMoney( value );
    }

    /**
     * 设置本地金钱
     */
    this.setLocalMoney = function( value )
    {
        this.localMoneyTxt.text = value < 0 ? '￥0.00' : '￥'+Tools.getInstance().ChangeUIShow(value);
        this.localMoney = value < 0 ? 0 : value;
    }
    
    /**
     * 设置钱包金钱
     */
    this.setWalletMoney = function( value ) 
    {
        this.walletMoneyTxt.text = value < 0 ? '￥0.00' : '￥'+Tools.getInstance().ChangeUIShow(value);
        this.walletMoney = value < 0 ? 0 : value;
    }

    /**
     * 滑块回调
     */
    this.sliderCallbackProcess = function( percent ) 
    {
        var value = parseInt(this.total * percent);
        var deltaMoney = value - this.localMoney;
        value = (parseInt(deltaMoney / 100) * 100) + parseInt(this.localMoney); 
        if( value <= this.localMoneyCopy )
        {
            this.setLocalMoney( this.localMoneyCopy );
            this.setWalletMoney( this.total - this.localMoneyCopy );
            this.sliderCom.setSliderPos( this.localMoneyCopy / this.total );
        }else 
        {
            this.setLocalMoney( value );
            this.setWalletMoney( this.total - value );
            this.lableMax.color = (percent == 1) ? GameData.getInstance().COLOR.YELLOW : GameData.getInstance().COLOR.GRAY;
            this.lableMin.color = (percent == 0) ? GameData.getInstance().COLOR.YELLOW : GameData.getInstance().COLOR.GRAY;
        }
    }
    this.setSliderPosition = function(num){
        this.sliderCom.setSliderPos(num);
        this.lableMax.color = (num == 1) ? GameData.getInstance().COLOR.YELLOW : GameData.getInstance().COLOR.GRAY;
        this.lableMin.color = (num == 0) ? GameData.getInstance().COLOR.YELLOW : GameData.getInstance().COLOR.GRAY;
    }
}