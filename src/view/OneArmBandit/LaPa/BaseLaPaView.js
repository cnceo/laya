/*
* name;
*/
var BaseLaPaView = (function (_super) {
    function BaseLaPaView() {
        BaseLaPaView.super(this);
        this.Game = OABGameMgr.getInstance().getCurGame();
    }
    Laya.class(BaseLaPaView, "BaseLaPaView", _super);

    BaseLaPaView.prototype.init = function(){
        this.Game.createAndAddMe();
    };
    
    BaseLaPaView.prototype.gc = function(){};

    // BaseLaPaView.prototype._onStartBtnClick = function(e){
    //     var params = {};
    //     var rdm = Math.random();
    //     if(rdm <= 0.3){
    //         params = this.bingoOption[Math.ceil(this.bingoOption.length * Math.random()) - 1];
    //     }
    //     if(this.lapaMachine.curPlayState === 0){
    //         this.lapaMachine.play(params);
    //     }else{
    //         this.lapaMachine.stopImmediately();
    //     }
    // }

    return BaseLaPaView;
}(BaseLaPaViewUI));