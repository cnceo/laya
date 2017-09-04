/**
 * zhengkaixin 2016 09 21
 * 任务
 */

function EmailView()
{
    EmailView.super(this);
    var self = this;
    this._maxNum = 50;//邮箱最大容量
    this._bEidtState = false;//是否处于编辑状态
    this._curSelectedItem;//当前选择的邮件
    this.init = function( data )
    {
        // EmailManager.getInstance().Init([{ mailID:1, Subject: 'Test',ContentSummery:'Hell everyone---' ,Type:1 ,IsRead:'false',CanFetch:'true'},{ mailID:2, Subject: 'Test2',ContentSummery:'Hell everyone---' ,Type:1,IsRead:'true',CanFetch:'true' },
        //     { mailID:3,CanFetch:'true',Attackments:[{TID:0,Count:1000}],SendTime : '2016/05/06 03:12:56', Subject: 'Test3',ContentSummery:'Hell everyone---' ,Type:1 ,Content:'这里是具体的内容信息。。。。。。。。。。。ksjdlkj离开家地方了liu是打发第三方的。'},]);
        this.cellList = [];
        this.backBtn = this.getChildByName('backBtn');
        this.maiDetailedContent.visible = false;
        this.lbNumMail = this.getChildByName('lbNumMail');
        this.btnEditDelete = this.getChildByName('btnEDelete');
        this.btnEditCancle = this.getChildByName('btnEditCancle');
        this.btnEdit = this.getChildByName('btnEdit');
        this.btnEdit.on( Event.CLICK,this,this.onBtnEditClick);
        this.btnEditCancle.on( Event.CLICK,this,this.onBtnEditCancleClick);
        this.btnEditDelete.on( Event.CLICK,this,this.onBtnEditDeleteClick);        

        this.createCell();
        this.updateMailNum();
        this.initDetailPanel();
    }
    this.destroy = function(){
        this.__proto__.destroy();
        this.hide();
    }
    this.setEditBtn = function(show){
        this.btnEdit.visible = show;
        this.btnEditCancle.visible = !show;
        this.btnEditDelete.visible = !show;
        this._bEidtState = !show;
    }
    this.initDetailPanel = function(){
        this.btnColseDetail = this.maiDetailedContent.getChildByName('btnCloseDetail');
        this.lbDateDetail = this.maiDetailedContent.getChildByName('lbDate');
        this.lbContentDetail = this.maiDetailedContent.getChildByName('lbContent');
        this.lbTitleDetail = this.maiDetailedContent.getChildByName('lbTitle');       
        this.rewardBoxDetail = this.maiDetailedContent.getChildByName('rewardBox');
        this.lbRewardDetail = this.rewardBoxDetail.getChildByName('lbReward');
        this.okBtnDetail = this.rewardBoxDetail.getChildByName('okBtn');
        this.okBtnDetail.on( Event.CLICK,this,this.onGetRewardsBtnClick);
    }
    
    this.show = function()
    {
        this.visible = true; 
        this.backBtn.on( Event.CLICK,this,this.hide ); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.newEmailNTF,this.onNewEmail,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.emailDetail,this.onMailDetail,this );
        MessageCallbackPro.addCallbackFunc( EventType.Type.emailOptAck,this.onMailOptAck,this );
    }
    this.hide = function(){
        this.visible = false;
        this.backBtn.off( Event.CLICK,this,this.hide );       
        MessageCallbackPro.removeCallbackFunc( EventType.Type.newEmailNTF,this.onNewEmail ); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.emailDetail,this.onMailDetail );
        MessageCallbackPro.removeCallbackFunc( EventType.Type.emailOptAck,this.onMailOptAck ); 
    }
    this.removeCell = function(id)
    {
        var arr = this.lstCell.array;
        var idx = -1;
        for(var i in arr){            
            if(arr[i].mailID == id){
                CLog.log("删除邮件 id:"+id);
                idx = i;
            }
        }
        if(idx === -1) return;
        this.lstCell.deleteItem(idx);
    }
    this.operateAttachment = function(mailID,imgState){
        var arr = this.lstCell.array;
        var idx = -1;
        for(var i in arr){            
            if(arr[i].mailID == mailID){
                CLog.log("获取了邮件附件 id:"+mailID);
                idx = i;
            }
        }
        if(idx === -1) return;
        var item = this.lstCell.getItem(idx);
        if(!item) return;
        item.imgState = imgState;
        item.CanFetch = imgState == '' ? false : true;
        this.lstCell.refresh();
    }
    
    this.createCell = function( )
    {
        var arr = [];
        // 使用但隐藏滚动条
		this.lstCell.vScrollBarSkin = "";
        this.lstCell.selectEnable = true;
        this.lstCell.selectHandler = new Handler(this, this.onSelect);
		this.lstCell.renderHandler = new Handler(this, this.updateItem);
        
        var data = EmailManager.getInstance().GetMailList();
        //list赋值，先获得一个数据源数组
		for (var i = 0; i < data.length; i++) {
            // var content = "我是第"+i+"行，我的内容超过了30个字，现在要显示点点点，看看哪个玩家会有此殊荣，你能看的到吗?";
            // if(content.length > 25) content = content.substr(0,24) + "...";
            var contentSummery = data[i].ContentSummery;
            if(contentSummery.length > 25) contentSummery = contentSummery.substr(0,24) + "...";
            var stateSrc = "";
            if(!data[i].IsRead){
                stateSrc = "common/email/newMail.png";
            }
            else if(data[i].CanFetch){
                stateSrc = "common/email/canFetch.png";
            }
			arr.push({ mailID:data[i].mailID, lbTitle: data[i].Subject,lbContent: contentSummery,CanFetch : data[i].CanFetch, imgState :stateSrc,Type:data[i].Type, 
                    lbDate : data[i].SendTime,Content : data[i].Content,Attackments : data[i].Attackments });
		}
        this.lstCell.array = arr;
        this.lblNone.visible = data.length == 0
    }
    this.updateMailNum = function(){
        this.lbNumMail.text = EmailManager.getInstance().GetMailList().length + ' / '+ this._maxNum;
    }
    //当收到新邮件时
    this.onNewEmail = function(content){
        if(this.lstCell.array.length >= this._maxNum) return;
        var  stateSrc = "common/email/newMail.png";
        var item = { mailID:content.mailID, lbTitle: content.Subject,lbContent:content.ContentSummery ,CanFetch : content.CanFetch, imgState :stateSrc,Type:content.Type, 
                    lbDate : content.SendTime };
        this.lstCell.addItem(item);
        this.updateMailNum();
    }
    //当收到邮件详细内容
    this.onMailDetail = function(data){        
        var dataSource = this._curSelectedItem.dataSource;
        dataSource.Content = data.Content;
        dataSource.Attackments = data.Attackments;
        dataSource.SenderRoleID = data.SenderRoleID;
        if(dataSource.Content){
            var imgState = dataSource.CanFetch ? 'common/email/canFetch.png' : '';
            this.operateAttachment(data.mailID,imgState);
            this.showMailDetail(dataSource);
        }
    }
    //当收到邮件操作反馈
    this.onMailOptAck = function(content){
        var type = GameData.getInstance().mailOptType;
        if(content.OperateType == type.DELETE){
            this.removeCell(content.mailID);
            //new TipsMessage('邮件删除成功！',false,false,false,1200,'mailDelete');
            this.updateMailNum();
            this.onBtnEditCancleClick();
        }
        else if(content.OperateType == type.ATTACHMENTS){
            this.operateAttachment(content.mailID,'');
            new TipsMessage('领取成功！',false,false,1200);
        }
    }
    //展示邮件具体内容
    this.onSelect = function(index){
        CLog.log("idx:"+index);
    }
    //更新邮件cell
    this.updateItem = function(item,index){ 
        item.on( Event.CLICK,this,this.onClickItem);
        var checkBox = item.getChildByName('checkBox');
        checkBox.visible = this._bEidtState;
        checkBox.on("change", this, this.onCheckBoxChange,[checkBox,index]);
        if(!this._bEidtState){
            checkBox.selected = false;
        }
        else{
            checkBox.selected = item.dataSource.selected;
        }
    }
    //当待删除的邮件选择变化时
    this.onCheckBoxChange = function(checkBox,index){
        if(!checkBox) return;
        this.lstCell.array[index].selected = checkBox.selected;
    }
    //点击邮件
    this.onClickItem = function(event){
        if(this._bEidtState){
            //编辑模式下
            var checkBox = event.target.getChildByName('checkBox');
            if(!checkBox) return;
            checkBox.selected = !checkBox.selected;
        }
        else{
            this._curSelectedItem = event.target;
            var dataSource = event.target.dataSource;
            if(dataSource.Content){
                this.showMailDetail(dataSource);
            }
            else {
                GateSocketClient.getInstance().CG_GET_MAIL_DETAIL_REQ(dataSource.mailID);
            }
        }
        
    }
    //显示邮件详细信息
    this.showMailDetail = function(data){
        this.okBtnDetail.disabled = false;
        this.btnColseDetail.on( Event.CLICK,self,self.closeMailDetail);
        this.lbContentDetail.text = data.Content;
        this.lbDateDetail.text = data.lbDate;
        this.lbTitleDetail.text = data.lbTitle;
        this.lbRewardDetail.text = "奖励：";
        var rewards = data.Attackments;
        var bHaveReward = false;
        for(var i in rewards){
            if(rewards[i].TID == 0){
                bHaveReward = true;
                this.lbRewardDetail.text += rewards[i].Count;
            }
        }
        this.rewardBoxDetail.visible = bHaveReward;
        this.okBtnDetail.visible =  data.CanFetch;
        self.maiDetailedContent.visible = true;
    }
    //关闭邮件详细信息
    this.closeMailDetail = function(){
        this.btnColseDetail.off( Event.CLICK,this,this.closeMailDetail);
        this.maiDetailedContent.visible = false;
    }
    //编辑邮件
    this.onBtnEditClick = function(){
        if(EmailManager.getInstance().GetMailList().length == 0) return;
        this.setEditBtn(false);
        this.lstCell.refresh();
    }
    //取消编辑
    this.onBtnEditCancleClick = function(){
        this.setEditBtn(true);
        this.lstCell.refresh();
    }
    //批量删除
    this.onBtnEditDeleteClick = function(){
        this._curSelectedItem = null;
        var arr = this.lstCell.array;
        this.deleteTemp = [];
        var bHaveReward = false;
        for(var i in arr){
            if(arr[i].selected) {
                var id = arr[i].mailID;
                if(arr[i].CanFetch){
                    bHaveReward = true;
                }
                this.deleteTemp.push(id);
            }            
        }
        if(bHaveReward){
            var MB = new MessageBox();
            MB.show('有未领取的附件，确定删除？',this.deleteMails,this.cancelDel,this,MODE.MB_OK | MODE.MB_CANCEL);
        }
        else{
            this.deleteMails();
        }
    }
    //取消删除
    this.cancelDel = function(){
        self.onBtnEditCancleClick();
    }
    //确定删除
    this.onConfirmDelete = function()
    {
        self.deleteMails();
    }
    //删除
    this.deleteMails = function(){
        for(var i in self.deleteTemp){
            var id = self.deleteTemp[i];
            GateSocketClient.getInstance().CG_MAIL_OPERATE_REQ(id,GameData.getInstance().mailOptType.DELETE);
        }
        self.deleteTemp = [];
    }
    //获取附件
    this.onGetRewardsBtnClick = function(){
        this.okBtnDetail.disabled = true;
        var mailID = this._curSelectedItem.dataSource.mailID;
        GateSocketClient.getInstance().CG_MAIL_OPERATE_REQ(mailID,GameData.getInstance().mailOptType.ATTACHMENTS);
    }
}