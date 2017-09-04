/*
* name;
*/
var ClassicMachine = (function (_super) {
    Laya.class(ClassicMachine, "ClassicMachine", _super);
    function ClassicMachine() {
        //重写父类方法
        this._curBLRIdx = 0;
        this._bingo = function(rlt){
            Laya.timer.once(0, this, this._doOneBingoLineRwd,[rlt]);
            Laya.timer.loop(1500, this, this._doOneBingoLineRwd,[rlt]);
        };
        this._clearBingo = function(rlt){
            this._stopOneBingoLineRwd(rlt[this._curBLRIdx]);
            Laya.timer.clear(this, this._doOneBingoLineRwd);
            this._curBLRIdx = 0;
        };
        this.onLaPaBingo = function(rlt){};
        //父类构造函数必须要有，且要放在所有子类对象方法的最后
        ClassicMachine.__super.call(this);
    };

    ClassicMachine.prototype.onDestroy = function(){
        Laya.timer.clear(this, this._doOneBingoLineRwd);
    };

    ClassicMachine.prototype._createDisc = function(config){
        return new ClassicDisc(config);
    };

    ClassicMachine.prototype._doOneBingoLineRwd = function(rlt){
        this._stopOneBingoLineRwd(rlt[this._curBLRIdx]);
        this._curBLRIdx++;
        if(this._curBLRIdx >= rlt.length) this._curBLRIdx = 0;
        var blr = rlt[this._curBLRIdx];
        for(var j in blr.iconsPos){
            var icon = this.getIconByPosInView(blr.iconsPos[j]);
            if(icon) icon.flash();
        }
        this.drawBingoLine(blr.ID);
    };

    ClassicMachine.prototype._stopOneBingoLineRwd = function(blr){
        for(var j in blr.iconsPos){
            var icon = this.getIconByPosInView(blr.iconsPos[j]);
            if(icon) icon.stopFlash();
        } 
        this.clearBingoLine();
    };

    return ClassicMachine;
}(LaPaMachine));

var ClassicDisc = (function (_super) {
    function ClassicDisc(config) {
        ClassicDisc.__super.call(this, config);
    };
    Laya.class(ClassicDisc, "ClassicDisc", _super);

    ClassicDisc.prototype._createIcon = function(config){
        return new ClassicIcon(config);
    };

    return ClassicDisc;
}(LaPaRollDisc));

var ClassicIcon = (function (_super) {
    function ClassicIcon(config) {
        this.switchFlg = false;
        ClassicIcon.__super.call(this, config);
        this.effect = new Effect();
        this.effect.init("res/atlas/classic_lapa/reward0.json",90,false);
        this.addChild( this.effect );
        this.effect.x = (this.width - 350) >> 1;
        this.effect.y = (this.height - 330) >> 1;
        this.effect.visible = false;
    };

    Laya.class(ClassicIcon, "ClassicIcon", _super);
    ClassicIcon.prototype.flash = function(){
        Laya.timer.loop(50, this, this._doFlash);
        this.effect.visible = true;
        this.effect.play();
    };

    ClassicIcon.prototype._doFlash = function(){
        var foo = !this.switchFlg ? "" : "_";
        var url = this.config.res_root_url + "/" + this.config.iconName + foo + ".png";
        this.graphics.clear();
        this.graphics.drawTexture(Laya.loader.getRes(url), 0, 0, this.width, this.height);
        this.switchFlg = !this.switchFlg;
    };

    ClassicIcon.prototype.stopFlash = function(){
        Laya.timer.clear(this, this._doFlash);
        var url = this.config.res_root_url + "/" + this.config.iconName + ".png";
        this.graphics.clear();
        this.graphics.drawTexture(Laya.loader.getRes(url), 0, 0, this.width, this.height);
    };

    ClassicIcon.prototype.onDestroy = function(){
        Laya.timer.clear(this, this._doFlash);
    };

    return ClassicIcon;
}(LaPaIcon));