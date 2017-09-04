
//GM命令类型
var GM_ORDER = {
    GAME_ADDMONEY : 1,
}

var GM_OPEN = false;

var GMDialog = (function (_super) {
    Laya.class(GMDialog, "GMDialog", _super);
    function GMDialog() {
        GMDialog.super(this);

        this._callObj = null;
        this._callbackFun = null;

        this.init();
    }

    GMDialog.prototype.init = function(){
        this.boxSend.on(Event.CLICK,this,this.onClickSend);
        this.boxClose.on(Event.CLICK,this,this.onCloseClick);
    };

    GMDialog.prototype.Show = function(obj,callBack){
        this._callObj = obj;
        this._callbackFun = callBack;
        this.popup();
    };
    GMDialog.prototype.onClickSend = function(){
        var text = this.textInput.text.toLowerCase();        
        if(text === "log open"){
            CLog.open = true;
            this.textInput.text = '';
            this.close();
        }
        else if(text.indexOf("gm ") === 0){
            text = text.split('gm ')[1];
            var arr = text.split(' ');
            var cont = arr[1] ? arr[1].replace(/(\s*$)/g, "") : "";//去掉右空格
            if(this._callObj && this._callbackFun){
                this._callbackFun.call(this._callObj,arr[0],cont);
                return;
            }            
            this.textInput.text = '';      
        }        
    }
    GMDialog.prototype.onCloseClick = function(){
        this._callbackFun = null;
        this._callObj = null;
        this.close();
    }

    return GMDialog;
}(GMDialogUI));