/**
 * 页面基类
 */
var BasePageView = (function (){
	function _BasePageView(){        
        this.dataInit = {};

        /**
         * 打开某个页面
         */
        this.OpenView = function(viewClass){
            if(!viewClass) return;
            var count = this.numChildren;
            for(var i =0;i<count;i++){
                var child = this.getChildAt(i);
                if(child && (child instanceof viewClass)){
                    var arrPages = this.dataInit.openView;
                    if(!arrPages || arrPages.length == 0) return;
                    arrPages.splice(0,1);
                    if(arrPages[0] && child.dataInit){
                        child.dataInit.openView = arrPages;
                    }
                    child.Show();
                    break;
                }
            }
        }
         ////////以下是子类可访问的方法///////////
        _BasePageView.prototype.Init = function(data){
            this.dataInit = data;
        };
        _BasePageView.prototype.Show = function(){
            this.visible = true;
            if(!this.dataInit) return;
            if(this.dataInit.hasOwnProperty("openView")){
                var arrPages = this.dataInit.openView;
                if(!arrPages || !arrPages[0]) return;
                this.OpenView(arrPages[0]);
            }
        };
        _BasePageView.prototype.Hide = function(){
            this.visible = false;
        };
    }
    return _BasePageView;
})();
