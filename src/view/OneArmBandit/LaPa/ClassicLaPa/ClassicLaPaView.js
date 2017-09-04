/*
* name;
*/
var ClassicLaPaView = (function (_super) {
    function ClassicLaPaView() {
        ClassicLaPaView.super(this);
        var clpPanel = new ClassicLaPaPanel();
        this.addChild(clpPanel);
        clpPanel.pos(0.0,0.0);
        this.clpPanel = clpPanel;
    };

    Laya.class(ClassicLaPaView, "ClassicLaPaView", _super);

    //override
    ClassicLaPaView.prototype.init = function(){
        _super.prototype.init.call(this);
        this._bindEvent();
        this.clpPanel.init();
    };
    ClassicLaPaView.prototype._bindEvent = function(){
    }

    ClassicLaPaView.prototype.gc = function(){
         _super.prototype.init.call(this);
         this.clpPanel.end();
    };

    // ClassicLaPaView.prototype._onBackBtnClick = function(){
    //     ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.OAB_ROOM ,resList:PreLoadList.getInstance().oabRoom});
    // };

    //override
    ClassicLaPaView.prototype._end = function(){
        this.clpPanel.end();
    };

    return ClassicLaPaView;
}(BaseLaPaView));