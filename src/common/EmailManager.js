/**
 * 游戏内邮件管理
 * 
 */
var EmailManager = (function()
{
    function _EmailManager()
    {
        this._emailList = [];//邮件列表

        this.Init = function(content){            
            this._emailList = content;            
        }
        /**
         * 添加一个邮件
         */
        this.AddMail = function( content )
        {
            if(!this._emailList) this._emailList = [];
            this._emailList.push( content );
            this.onDataChanged();
        }
        
        /**
         * 删除一个邮件
         */
        this.RemoveMail = function( id )
        {
            for(var i = 0;i < this._emailList.length;i++)
            {
                if( id === this._emailList[i].mailID )
                {
                    this._emailList.splice(i,1);
                    this.onDataChanged();
                    return;
                }
            }
        }        
        //邮件操作
        this.OperateMail = function(content){
            var type = GameData.getInstance().mailOptType;
            if(content.OperateType == type.DELETE){
                this.RemoveMail(content.mailID);
            }
            else if(content.OperateType == type.ATTACHMENTS){
                this.getMailAttachments(content.mailID);
            }
        }
        /**
         * 获取邮件列表
         */
        this.GetMailList = function(){
            return this._emailList;
        }
        //添加邮件详细内容
        this.AddMailDetail = function(content){
            for(var i in this._emailList){
                if(this._emailList[i].mailID == content.mailID){
                    this._emailList[i].SenderRoleID = content.SenderRoleID;
                    this._emailList[i].Content = content.Content;
                    this._emailList[i].Attackments = content.Attackments;
                    this._emailList[i].IsRead = true;
                    this.onDataChanged();
                    break;
                }
            }
        }
        //领取附件
        this.getMailAttachments = function(mailID){
            for(var i in this._emailList){
                if(this._emailList[i].mailID == mailID){
                    this._emailList[i].CanFetch = false;
                    this.onDataChanged();
                    break;
                }
            }
        }
        //当数据发生变化
        this.onDataChanged = function(){            
            var data = {type:GameData.getInstance().redPointType.MAIL,num:this.getRedPNum()};
            MessageCallbackPro.messageEmit(EventType.Type.redPointUpdate,data);
        }
        //获取红点数量
        this.getRedPNum = function(){
            var n = 0;
            //红点的业务逻辑
            for(var i in this._emailList){
                if(!this._emailList[i].IsRead || this._emailList[i].CanFetch ){
                    n++;
                }
            }
            return n;
        }
    }
    
    //单例实例 
    var instance; 
    //返回对象 
    return { 
        name: '_EmailManager', 

        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _EmailManager(); 
            } 
            return instance; 
        } 
    }; 
    
})();
