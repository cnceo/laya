/**
 * 提款界面
 */
function WalletView()
{
    WalletView.super(this);
    BasePageView.call(this);
    for(var i in BasePageView.prototype){
        WalletView.prototype[i] = BasePageView.prototype[i];
    }
    
    var maxDigit = 4;
    this.walletMoney = User.getInstance().GetBankMoney();
    this.localMoney  = User.getInstance().GetGameMoney();
    this.total = this.walletMoney + this.localMoney;
        
    this.Init = function(dataInit){
        BasePageView.prototype.Init.call(this,dataInit);
        this.backBtn = this.getChildByName('backBtn');
        this.backBtn.on( Event.CLICK,this,this.onBackBtn );
        this.accessBtn.on( Event.CLICK,this,this.onAccessBtn );
        
        this.buttonProcess( this.takeMoney,this.walletMoney );
        this.buttonProcess( this.saveMoney,this.localMoney );
        
        this.sliderCom = new SliderPro( this.slider,'horizontal' );
        this.sliderCom.init(this.sliderCallbackProcess,this);
        this.sliderCom.setSliderPos( this.walletMoney / this.total );

        this.setMoneyInfo();
    }

     this.setMoneyInfo = function(){
        this.setLocalMoney(User.getInstance().GetGameMoney());
        this.setWalletMoney(User.getInstance().GetBankMoney());
        this.total = this.walletMoney  + this.localMoney;
        this.sliderCom.setSliderPos( this.walletMoney / this.total );
    }
    //额度转换后 不论成功与否都请求下余额
    this.onBankChargeEvent = function(content){
        GateSocketClient.getInstance().CG_GET_MONEY_REQ();
    }

    this.Show = function()
    {
        BasePageView.prototype.Show.call(this);
        this.visible = true;
        this.addListener();
        this.setMoneyInfo();
        this.sliderCom.showTipsAnim();
    }
    this.Hide = function(){
        this.removeListener();
        this.visible = false;
    }
     this.addListener = function()
    {
         MessageCallbackPro.addCallbackFunc( EventType.Type.playerBackMoneyChanged,this.setMoneyInfo,this);
         MessageCallbackPro.addCallbackFunc( EventType.Type.bankChargeEvent,this.onBankChargeEvent,this);
    }

    this.removeListener = function()
    { 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerBackMoneyChanged,this.setMoneyInfo,this); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.bankChargeEvent,this.onBankChargeEvent,this); 
    }
    
    this.onBackBtn = function()
    {
        this.Hide();
    }
    
        /**
     * 滑块处理
     */
    this.sliderCallbackProcess = function( percent )
    {
         var value = parseInt(this.total * percent);
         var deltaMoney = value - this.walletMoney;
         value = (parseInt(deltaMoney / 100) * 100) + this.walletMoney;
        
         this.setLocalMoney(this.total - value);
         this.setWalletMoney( value );

         this.buttonProcess( this.takeMoney,this.walletMoney );
         this.buttonProcess( this.saveMoney,this.localMoney );
    }
    
    /**
     * 存取
     */
    this.onAccessBtn = function()
    {
        //发送存取请求
        var chargeMoney = this.localMoney  - User.getInstance().GetGameMoney();
        chargeMoney = parseInt(chargeMoney / 100) * 100;
        if(GameData.getInstance().bLoginDemo){
            new HintMessage("试玩不支持此操作");
        }
        else{
            GateSocketClient.getInstance().CG_CHARGE_BANK_MONEY_REQ(chargeMoney);
        }
    }
    
     /**
     * 按钮处理
     */
    this.buttonProcess = function( _node,value )
    {
        var bottom = 10000;
        for( var i = 0; i < maxDigit;i++ )
        {
            var Btn = _node.getChildByName('jia_' + bottom);
            if( value < bottom * Tools.getInstance().ExactDigit )
            {
                //Btn.off(Event.CLICK,this,this.onChangeMoney);
                //Btn.getChildByName('btn').visible = false;
                Btn.disabled = true;
                //Btn.removeListener();
            }else
            {
                Btn.on(Event.CLICK,this,this.onChangeMoney);
                //Btn.getChildByName('btn').visible = true;
                Btn.disabled = false;
                //Btn.addListener();
            }
            bottom /= 10;
        }
    }
    
        /**
     * 改变金钱处理
     */
    this.onChangeMoney = function( event )
    {
        if( event.target.parent.name === 'takeMoney' )
         {
            var value = event.target.name.split('_')[1] * Tools.getInstance().ExactDigit;
            this.setLocalMoney( this.localMoney + value );
            this.setWalletMoney( this.walletMoney - value );
            
            this.sliderCom.setSliderPos( this.walletMoney / this.total );
         }else if( event.target.parent.name === 'saveMoney' )
         {
            var value = event.target.name.split('_')[1] * Tools.getInstance().ExactDigit;
            this.setLocalMoney( this.localMoney - value );
            this.setWalletMoney( this.walletMoney + value ); 
            this.sliderCom.setSliderPos( this.walletMoney / this.total );
         }

        this.buttonProcess( this.takeMoney,this.walletMoney );
        this.buttonProcess( this.saveMoney,this.localMoney );
    }
    
     /**
     * 设置本地金钱
     */
    this.setLocalMoney = function( value )
    {
        var lalMoney = value < 0 ? 0.00 : Tools.getInstance().ChangeUIShow(value);
        this.localMoneyTxt.text = "￥" + lalMoney;
        this.localMoney = value < 0 ? 0 : value;
    }
    
    /**
     * 设置钱包金钱
     */
    this.setWalletMoney = function( value )
    {
        var lalMoney = value < 0 ? 0.00 : Tools.getInstance().ChangeUIShow(value)
        this.walletMoneyTxt.text = "￥" + lalMoney;
        this.walletMoney = value < 0 ? 0 : value;
    }
}