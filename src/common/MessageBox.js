/**
 * huangandfly 2016 07 22
 * 
 * _content：       ：消息内容
 * _OkCallBack      ：确认按钮的回调
 * _CancelCallBack  ：取消按钮的回调
 * _classObj        ：回调对象
 * _mode            ：消息模式，按钮的种类
 * _okTxt           ：确认按钮的文字描述
 * _cancelTxt       ：取消按钮的文字描述
 */

var MODE = (function() {
    return{
        MB_OK:0x00000001,  
        MB_CANCEL:0x00000011  
    }
})();

function MessageBox()
{
    MessageBox.super( this );
    
    this.show = function(_content,_OkCallBack,_CancelCallBack,_classObj,_mode,_okTxt,_cancelTxt)
    {
        this.OkCallBack     = _OkCallBack;
        this.CancelCallBack = _CancelCallBack;
        this.mode           =  _mode;
        this.text           = _content;
        this.okTxt          = _okTxt === undefined ? '确定' : _okTxt;
        this.cancelTxt      = _cancelTxt === undefined ? '取消' : _cancelTxt;
        this.classObj       = _classObj;
        this.setData();
        this.name = "MessageBox";        
        this.x = (Laya.stage.width  - this.width)  >> 1;
        this.y = ((Laya.stage.height - this.height) >> 1) - 0;
        Game.getInstance().currentScene.addChild( this );
        this.boxContent.visible = false;
        this.showBgAnim();
    }
    
    this.showBgAnim = function(){
        this.bg.scaleX = 0;
        Tween.to(this.bg,{scaleX : 1},150);
        var task = new TaskDelay();
        task.callBack = this.showContent;
        task.classObj = this;
        task.leftTime = 150;
        TaskDelayManager.getInstance().addTask( task ); 
    }
    this.showContent = function(){
        this.boxContent.visible = true;
    }
        //设置文字内容
    this.setTextContent = function()
    {
        if( this.textContent )
        {
            this.textContent.text = this.text;
        }
    }
    
    //设置一些数据
    this.setData = function()
    {
        this.setTextContent();
        var OKBtn = this.boxContent.getChildByName('okBtn');
        var cancelBtn = this.boxContent.getChildByName('cancelBtn');
        
        // var okTxt = OKBtn.getChildByName('txt');
        // okTxt.text = this.okTxt;
        
        // var cancelTxt = cancelBtn.getChildByName('txt');
        // cancelTxt.text = this.cancelTxt;
        
        if( this.mode === MODE.MB_OK )
        {
            cancelBtn.visible = false;
            OKBtn.x = 338;
            OKBtn.once( Event.CLICK,this,this.onOkBtn );
        }else if( this.mode === (MODE.MB_OK | MODE.MB_CANCEL ))
        {
            OKBtn.once( Event.CLICK,this,this.onOkBtn );
            cancelBtn.once( Event.CLICK,this,this.onCancelBtn );
        }
        else{
            OKBtn.visible = false;
            cancelBtn.visible = false;
            this.boxTip.y = this.height >> 1;
            Laya.timer.once(3000,this,function(){
                this.onCancelBtn();
            });
        }
    }
    
    this.onOkBtn = function()
    {
        this.onClose();
        
        if( this.OkCallBack != null )
        {
            this.calssObj ? this.OkCallBack.call( this.classObj ) : this.OkCallBack();
            this.OkCallBack = null;
            this.calssObj = null;
        }
        this.destroy();
        
    }
    
    this.onCancelBtn = function()
    {
        this.onClose();
        
        if( this.CancelCallBack != null )
        {
            this.calssObj ? this.CancelCallBack.call( this.classObj ) : this.CancelCallBack();
            this.calssObj = null;
            this.CancelCallBack = null;
        }
        this.destroy();
        
    }
   
    //关闭界面
    this.onClose = function()
    {
        var OKBtn = this.boxContent.getChildByName('okBtn');
        var cancelBtn = this.boxContent.getChildByName('cancelBtn');
        OKBtn.off( Event.CLICK,this,this.onOkBtn );
        cancelBtn.off( Event.CLICK,this,this.onCancelBtn );
        Laya.timer.clearAll(this);
        //this.OkCallBack = null;
        //this.CancelCallBack = null;
        //this.classObj = null;
    }
}