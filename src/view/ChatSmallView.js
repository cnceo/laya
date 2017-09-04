/**
 * 缩小版聊天界面
 */

function ChatSmallView()
{
    ChatSmallView.super(this);
    this._bLock = false;
    this.init = function(){
        this.chatMsgScroll = new TextScroll();
        this.chatMsgScroll.init(240,215,Notice.getInstance().ChatMaxNum);
        this.chatMsgScroll.x = 5;
        this.chatMsgScroll.y = -5;
        this.panelMask.addChild( this.chatMsgScroll );
        this.visible = false;

        var chatArr = Notice.getInstance().getChatInfo();
        for(var i=0;i<chatArr.length;i++){
            this.onChatReceive(chatArr[i]);
        }

        MessageCallbackPro.addCallbackFunc( EventType.Type.chat,this.onChatReceive ,this);
    }
    this.onChatReceive = function( content )
    {

        var senderName = content.senderName;
        var senderType = content.senderType;       
        
        var name = (senderType === 'eSystem') ? '系统' : senderName;
        var msg = name + '：' + content.content;
        var ins = GameData.getInstance();
        var color = (senderType === 'eSystem') ? ins.senderTypeColor.eSystem : ins.senderTypeColor.eUser;
        color = (name.indexOf("自己") != -1) ? ins.senderTypeColor.eMe : color;

        this.chatMsgScroll.addElement( msg,15,color,243,true,true );
        if(!this._bLock){
            this.visible = true;
        }
    }
    this.destroy = function()
    {
        MessageCallbackPro.removeCallbackFunc( EventType.Type.chat,this);
        this.__proto__.destroy();
    }
    this.setLock = function(bLock){
        this._bLock = bLock;
        var chatArr = Notice.getInstance().getChatInfo();
        if(this._bLock){
            this.visible = false;
        }
        else if(chatArr.length > 0){
            this.visible = true;
        }
    }
}