/**
 * 聊天界面
 */

function ChatView()
{
    ChatView.super(this);
    BasePageView.call(this);
    for(var i in BasePageView.prototype){
        ChatView.prototype[i] = BasePageView.prototype[i];
    }
     //var _proto = ChatView.prototype;
     
     this._obj = null;
     this._callback = null;
     this.emojiPanel = null;
     
    this.Init = function(dataInit){
         BasePageView.prototype.Init.call(this,dataInit);
         this._obj = dataInit.obj;
         this._callback = dataInit.callback;
         this.sendChatBtn.on(Event.CLICK,this,this.onSendChatBtn);
         this.closeBtn.on(Event.CLICK,this,this.Hide);
         this.chatInput.on(Event.BLUR,this,this.onBlur);
         this.emojiBtn.on(Event.CLICK,this,this.onEmojiBtn);

         MessageCallbackPro.addCallbackFunc( EventType.Type.chat,this.onChatReceive ,this);
         MessageCallbackPro.addCallbackFunc( EventType.Type.addNotice,this.onAddNotice ,this);
         MessageCallbackPro.addCallbackFunc( EventType.Type.removeNotice,this.onRemoveNotice ,this);
         this.chatInput.on(Event.ENTER,this,this.onSendChatBtn); 
         
         this.pivot(0,this.height);
         this.tween = null;
         
         this.chatMsgScroll = new TextScroll();
         this.chatMsgScroll.init(1455,357,Notice.getInstance().ChatMaxNum,TextScroll.TOP_TO_DOWN);
         this.chatMsgScroll.x = 0;
         this.chatMsgScroll.y = 0;
         //this.addChild( this.chatMsgScroll );
         this.panelMaskChat.addChild(this.chatMsgScroll);



         this.systemMsgScroll = new TextScroll();
         this.systemMsgScroll.init(1355,240,Notice.getInstance().ChatMaxNum,TextScroll.TOP_TO_DOWN);
         this.systemMsgScroll.x = 0;
         this.systemMsgScroll.y = 0;
         //this.addChild( this.systemMsgScroll );
         this.panelMaskSys.addChild( this.systemMsgScroll );

         this.initChatInfo();
         this.initResidentNotice();

         

     }
     //当输入框失去焦点时,重新播放音乐
	this.onBlur = function(){		
		if(laya.utils.Browser.onIOS){
            if(GameData.getInstance().bPlayMusic){
                SoundTool.getInstance().PlayHallBgMusic();
            }
		}
	}
     this.Show = function()
     {
         BasePageView.prototype.Show.call(this);
         this.tween && this.tween.complete();
         this.visible = true;
         this.tween = Tween.to(this,
         {
             scaleX: 1,
             scaleY: 1,
         }, 200); 
     }
     this.Hide = function(){
        this.tween && this.tween.complete();
        if(this._obj && this._callback){
            this._callback.call(this._obj);
        }
        CLog.log("/////////// to close ");
        this.tween = Tween.to(this,
        {
            scaleX: 0,
            scaleY: 0,
        }, 200,null,Handler.create(this,this.onCloseBtn)); 
     }
     //初始化聊天信息
     this.initChatInfo = function(){
         var chatArr = Notice.getInstance().getChatInfo();
         for(var i=0;i<chatArr.length;i++){
             this.onChatReceive(chatArr[i]);
         }
     }
     //初始化常驻公告
     this.initResidentNotice = function(){
         var arr = Notice.getInstance().getResidentNotice();
         for(var i=0;i<arr.notices.length;i++){             
             this.addSystemMsg(arr.notices[i]);
         }
     }
     this.addSystemMsg = function(msg)
     {
        var text = msg.content.replace(/<[^>]+>/g,"");//正则 取出实际的文本内容
        if(!text || text == "") return;
        var ins = GameData.getInstance();
        var color = (msg.type === GameData.getInstance().ENoticeType.eImportant) ? ins.senderTypeColor.eImportentNotice : ins.senderTypeColor.eNormalNotice;
        this.systemMsgScroll.addElement( text,20,color,1450,true,true,msg.noticeID );
     }

     this.addChatMsg = function(content,color)
     {
        this.chatMsgScroll.addElement( content,20,color,1450,true,true );
     }

    this.onEmojiBtn = function()
    {
        if( this.emojiPanel == null )
        {
            this.emojiPanel = new EmojiView();
            this.emojiPanel.init(GateSocketClient.getInstance(),GateSocketClient.getInstance().CG_CHATTING_REQ);
            this.addChild( this.emojiPanel );
            this.emojiPanel.x = this.emojiBtn.x - (this.emojiPanel.width >> 1);
            this.emojiPanel.y = this.emojiBtn.y - this.emojiPanel.height - 60;
            this.emojiPanel.visible = false;
        }
        this.emojiPanel.show( !this.emojiPanel.visible );
    }
     
    this.onCloseBtn = function()
    {   
        this.visible = false;
    }
    
    this.onSendChatBtn = function()
    {
        if( this.chatInput.text == "" || this.chatInput.text == this.chatInput.prompt )
        {
            new HintMessage('聊天内容不能为空');
            return;
        }
        var lowerCase = this.chatInput.text.toLowerCase();
        if(lowerCase === "req open"){
            if(!URLParamParse.getInstance().IsLocal()) return;
            var reqView = Game.getInstance().TipLayer.getChildByName("reqView");
            if(!reqView){
                reqView = new RandomReqView();
                reqView.name = "reqView";
                Game.getInstance().TipLayer.addChild(reqView);
                reqView.init();
            }
            reqView.Show();
        }
        else if(lowerCase.indexOf("gm ") != 0){
            GateSocketClient.getInstance().CG_CHATTING_REQ( this.chatInput.text );
        }
        else{
            // var text = lowerCase.split('gm ')[1];
            // var arr = text.split(' ');
            // for(var i in GM_ORDER){
            //     if(GM_ORDER[i] === parseInt(arr[0])){
            //         GateSocketClient.getInstance().CG_GMORDER_REQ(arr[0],arr[1]);
            //         break;
            //     }
            // }
            if(lowerCase === 'gm open'){
                GM_OPEN = true;
                MessageCallbackPro.messageEmit(EventType.Type.gmCommond,"open");
            }
            else if(lowerCase === 'gm close'){
                GM_OPEN = false;
                MessageCallbackPro.messageEmit(EventType.Type.gmCommond,"close");
            }
        }
        this.chatInput.text = "";
    }

    this.onChatReceive = function(content)
    {
        var senderName = content.senderName;
        var senderType = content.senderType;
        
        var name = (senderType === 'eSystem') ? '系统' : senderName;
        var msg = name + '：' + content.content;

        var ins = GameData.getInstance();
        var color = (senderType === 'eSystem') ? ins.senderTypeColor.eSystem : ins.senderTypeColor.eUser;
        color = (name.indexOf("自己") != -1) ? ins.senderTypeColor.eMe : color;

        this.addChatMsg( msg,color ); 
    }

    this.onAddNotice = function(content){
        this.addSystemMsg(content);
    }
    this.onRemoveNotice = function(noticeId){
        this.systemMsgScroll.removeElement(noticeId);
    }
    this.destroy = function()
    {
        MessageCallbackPro.removeCallbackFunc( EventType.Type.chat,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.addNotice,this.onAddNotice ,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.removeNotice,this.onRemoveNotice ,this);
        this.chatInput.off(Event.ENTER,this,this.onSendChatBtn); 
        this.sendChatBtn.off(Event.CLICK,this,this.onSendChatBtn);
        this.closeBtn.off(Event.CLICK,this,this.show);
        this.__proto__.destroy();
    }
}

