/*
* 拉霸机;
*/
var LaPaMachine = (function (_super) {
    Laya.class(LaPaMachine, "LaPaMachine", _super);
    //config参数：
    // rowCnt
    // colCnt
    // arrIcons
    // width
    // height
    //bingoLines
    // pt
    function LaPaMachine() {
        this.destroy = function(){
            this.onDestroy();
            for(var i in this.listDisc){
                var disc = this.listDisc[i];
                disc.onDestroy();
            }
            this.__proto__.destroy();
        }
        LaPaMachine.__super.call(this);
    };

    LaPaMachine.prototype.init = function(config){
        this.config = config;
        this.listDisc = [];
        this.setState(OABEnum.EPlayState.eReady);
        this.onceResult = null;
        //初始化拉霸机大小位置
        this.height = this.config.height;
        this.width = this.config.width;
        this.pos(this.config.pt.x, this.config.pt.y);
        //根据列数创建滚动轮盘
        this._createAndAddRollDiscs();
        //创建中奖线画线工具
        this._spDrawBingoLine = new Sprite();
        this._spDrawBingoLine.pos(0, 0);
        this.addChild(this._spDrawBingoLine);
    };

    LaPaMachine.prototype._createAndAddRollDiscs = function(){
        this.listDisc.length = 0;
        var discWidth = (this.config.width - this.config.disc_x_space * (this.config.colCnt - 1))/ this.config.colCnt;
        for(var i = 0; i < this.config.colCnt; i++){
            var config = {
                index : i,
                viewCnt : this.config.rowCnt,
                width : discWidth,
                height : this.config.height,
                pt : new Point(i * (discWidth + this.config.disc_x_space),0.0),
                res_root_url : this.config.res_root_url,
                arrIcons : this.config.arrIcons,
                discBg : this.config.discBg
            };
            var disc = this._createDisc(config);
            this.listDisc.push(disc);
            this.addChild(disc);
            //测试
            // var a = new Sprite();
            // a.pos(0,0);
            // this.addChild(a);
            // a.graphics.drawRect(config.pt.x, config.pt.y, config.width, config.height, "#ffff00");
        }
    };
    //供子类重写
    LaPaMachine.prototype._createDisc = function(config){}
    LaPaMachine.prototype.drawBingoLine = function(id){
        var bl = this.config.bingoLines[id];
        if(bl){
            var halfUnitHeight = this.config.height / this.config.rowCnt / 2;
            var halfUnitWidth = (this.config.width - this.config.disc_x_space * (this.config.colCnt - 1))/ this.config.colCnt / 2;
            var arrPts = [];
            arrPts.push([-halfUnitWidth, halfUnitHeight * (1 + bl[0])]);
            for(var i in bl){
                var last = arrPts[arrPts.length - 1];
                var now = [last[0] + halfUnitWidth * 2 + this.config.disc_x_space * (i == 0 ? 0 : 1), halfUnitHeight * (1 + bl[i])];
                arrPts.push(now);
            }
            var last1 = arrPts[arrPts.length - 1];
            arrPts.push([last1[0] + halfUnitWidth, last1[1]]);
            arrPts[0][0] = 0;
            var arrRlt = [];
            for(var i in arrPts){
                arrRlt.push(arrPts[i][0],arrPts[i][1]);
            }
            var color = this.config.bingo_line_colors[id];
            if(!color){
                alert("drawBingoLine时，颜色不存在！");
                color = "#ff0000";
            }
            this._spDrawBingoLine.graphics.drawLines(0, 0, arrRlt, color, 3);
        }
    };

    LaPaMachine.prototype.clearBingoLine = function(){
        this._spDrawBingoLine.graphics.clear();
    };

    LaPaMachine.prototype.setState = function(state){
        if(state === this._curPlayState) return;
        this._curPlayState = state;
        this.onSetState(state);
    };

    LaPaMachine.prototype.getState = function(){
        return this._curPlayState;
    };

    LaPaMachine.prototype.onRollEnd = function(){
        this.setState(OABEnum.EPlayState.eSettlement);
        if(this.onceResult && this.onceResult.length > 0){
            this._bingo(this.onceResult);
            this.onLaPaBingo && this.onLaPaBingo(this.onceResult);
        }else{
            this.setState(OABEnum.EPlayState.eReady);
        }
    };

    LaPaMachine.prototype.play = function(params){
        if(this._curPlayState === OABEnum.EPlayState.eReady){
            this.onceResult = params.blRewards;
            for(var i = 0; i < this.config.colCnt; i++){
                var p = this.getChildByName("RD_" + i);
                p && p.roll && p.roll(params.headIcons[i], 100 * i);
            }
            this.setState(OABEnum.EPlayState.ePlaying);
        }
    };

    LaPaMachine.prototype.stopImmediately = function(){
        if(this._curPlayState === OABEnum.EPlayState.ePlaying){
            for(var i = 0; i < this.config.colCnt; i++){
                this.getChildAt(i).stopImmediately();
            }
        }
    };
    LaPaMachine.prototype.ready = function(){
        this._clearBingo(this.onceResult);
        this.setState(OABEnum.EPlayState.eReady);
    };

    //中奖表现子类重写
    LaPaMachine.prototype._bingo = function(rlt){};
    //清除中奖表现，子类重写
    LaPaMachine.prototype._clearBingo = function(rlt){};
    LaPaMachine.prototype.getIconByPosInView = function(iconPos){
        var disc = this.getChildByName("RD_" + iconPos.posX);
        if(disc){
            return disc.getIconByPosInView(iconPos);
        }
        return null;
    }

    // LaPaMachine.prototype._doOneBingoLineReward = function(idx){
    //     if(idx === undefined 
    //     || idx === null 
    //     || idx >= this.onceResult.length){
    //         idx = 0;
    //     }
    //     var blr = this.onceResult[idx];
    //     this._drawBingoLine(blr.ID);
    //     this._doOneBingoLineReward(++idx);
    // }

    //供外部注册
    LaPaMachine.prototype.onLaPaBingo = function(result){};
    LaPaMachine.prototype.onSetState = function(state){};

    return LaPaMachine;
}(Laya.Box));

/*
* 拉霸滚盘;
*/
var LaPaRollDisc = (function (_super) {
    //轮盘转动状态
    var ERollState = {
        eStop : 0,          //停止阶段
        eRollStep0 : 1,     //开始时回滚阶段
        eRollStep1 : 2,     //加速滚动阶段
        eRollStep2 : 3,     //最高速以后的匀速阶段
        eRollStep3 : 4,     //减速滚动阶段
        eRollStep4 : 5,     //结束时回滚阶段
    };
    //无效值
    var INVALID_VALUE = -99999;
    //匀速滚动时间
    var BASE_UR_TIME = 1000;
    //全局轮盘停止标志位，避免后面的转盘在前面的转盘停之前停
    var LPD_STOP_FLG = [];
    //控制轮盘最后停止时的一个机械回滚的距离
    var STOP_Y_DELTA = 40;
    //全局轮盘停止标志位
    var ROLL_END_FLG = [];
    function LaPaRollDisc(config) {
        LaPaRollDisc.__super.call(this);
        this.config = config;
        this._init();
    };
    Laya.class(LaPaRollDisc, "LaPaRollDisc", _super);

    LaPaRollDisc.prototype.onDestroy = function(){
        this._unbindEvent();
        for(var i in this.Icons){
            this.Icons[i].onDestroy();
        }
        for(var i in this.Icons_Extra){
            this.Icons_Extra[i].onDestroy();
        }
    };
    LaPaRollDisc.prototype._init = function(){
        //初始化滚动轮盘视域容器大小位置
        this.height = this.config.height;
        this.width = this.config.width;
        this.pos(this.config.pt.x, this.config.pt.y);
        var res = Laya.loader.getRes(this.config.res_root_url + "/" + this.config.discBg);
        var sp = new Sprite();
        sp.height = this.height;
        sp.width = this.width;
        sp.pos(0.0,0.0);
        this.addChild(sp);
        sp.graphics.drawTexture(res, 0, 0, this.width, this.height);
        this.name = "RD_" + this.config.index;
        //创建滚盘
        this.Icons = {};
        this.Icons_Extra = {};
        this.rollWheel = this._createRollWheel();
        //初始化基本属性
        this.curRollState = ERollState.eStop;
        this.stopFlg = false;
        this.stopY = INVALID_VALUE;
        //初始化各个滚动状态的参数
        this.arrRollState = {};
        for(var i in ERollState){
            var key = ERollState[i];
            if(key === ERollState.eStop) continue;
            this.arrRollState[key] = {
                startTime : INVALID_VALUE,
                startY : INVALID_VALUE,
                usedTime : INVALID_VALUE,
            };
        }

        this._bindEvent();
    };
    LaPaRollDisc.prototype._getIconIdx = function(iconName){
        for(var i = 0; i < this.config.arrIcons.length; i++){
            var name = this.config.arrIcons[i];
            if(name === iconName){
                return i;
            }
        }
        return -1;
    };

    LaPaRollDisc.prototype._bindEvent = function(){
        Laya.timer.frameLoop(1, this, this._update); 
    };

    LaPaRollDisc.prototype._unbindEvent = function(){
        Laya.timer.clear(this, this._update);
    };

    //roundCnt表示圈数
    LaPaRollDisc.prototype._createRollWheel = function(){
        var unitHeight = this.config.height / this.config.viewCnt;
        var box = new Laya.Box();
        box.height = (this.config.arrIcons.length + this.config.viewCnt) * unitHeight;
        box.width = this.width;
        var rndHeight = unitHeight * this.config.arrIcons.length;
        var me = this;
        for(var i in this.config.arrIcons){
            var config = {
                index : i,
                iconName : this.config.arrIcons[i],
                res_root_url : this.config.res_root_url,
                width : this.width,
                height : unitHeight,
            };
            var icon = this._createIcon(config);
            box.addChild(icon);
            this.Icons[config.iconName] = icon;
        }
        //多创建视域个数的Icon，来达到一种滚动的视觉错觉
        for(var i = 0; i < this.config.viewCnt; i++){
            var config = {
                index : this.config.arrIcons.length + i,
                iconName : this.config.arrIcons[i],
                res_root_url : this.config.res_root_url,
                width : this.width,
                height : unitHeight,
            };
            var icon = this._createIcon(config);
            box.addChild(icon);
            this.Icons_Extra[config.iconName] = icon;
        }

        //保证第一个图片放在拉霸正中的位置
        box.pos(0.0, -unitHeight / 2);
        this.addChild(box);
        return box;
    };
    //供子类重写
    LaPaRollDisc.prototype._createIcon = function(config){}
    LaPaRollDisc.prototype.roll = function(rlt, delay){
        var self = this;
        Laya.timer.once(delay, this, function(){
            if(self.curRollState === ERollState.eStop){
                self.stopY = self._calcStopY(rlt);
                LPD_STOP_FLG[self.config.index] = false;
                ROLL_END_FLG[self.config.index] = false;
                self.curRollState = ERollState.eRollStep0;
            }
        });
    };

    LaPaRollDisc.prototype.stopImmediately = function(){
        if(this.curRollState !== ERollState.eStop){
            this.stopFlg = true;
        }
    };

    LaPaRollDisc.prototype._calcStopY = function(rlt){
        var unitHeight = this.config.height / this.config.viewCnt;
        var idx = this._getIconIdx(rlt.name);
        if(idx === -1){
            CLog.log("_getIconIdx时，图标不存在");
            return 0;
        }
        var tmpHeight =  idx * unitHeight;
        var viewPos = unitHeight / 2 * rlt.posY;
        return viewPos - tmpHeight;
    };

    LaPaRollDisc.prototype._update = function(){
        //在穿帮之前重置Y
        if(this.curRollState !== ERollState.eStop){
            if(this.rollWheel.y > 0){
                var unitHeight = this.config.height / this.config.viewCnt;
                var rndHeight = unitHeight * this.config.arrIcons.length;
                this.rollWheel.y = -rndHeight;
                var state = this.arrRollState[this.curRollState];
                if(state.startY !== INVALID_VALUE){
                    this.arrRollState[this.curRollState].startY -= rndHeight;
                }
            }
        }
        //开始前的回滚状态
        if(this.curRollState === ERollState.eRollStep0){
            var state = this.arrRollState[ERollState.eRollStep0];
            if(state.startTime === INVALID_VALUE){
                state.startTime = Browser.now();
            }
            if(state.startY === INVALID_VALUE){
                state.startY = this.rollWheel.y;
            }
            state.usedTime = Browser.now() - state.startTime;
            var ratio = Ease["sineOut"](state.usedTime,0,1,250);
            if(state.usedTime < 250){
                this.rollWheel.y = state.startY + ratio * (-50);
            }else{
                this.curRollState = ERollState.eRollStep1;
                state.startTime = INVALID_VALUE;
                state.startY = INVALID_VALUE;
                state.usedTime = INVALID_VALUE;
                return;
            }
        }
        //开始时的加速状态
        if(this.curRollState === ERollState.eRollStep1){
            var state = this.arrRollState[ERollState.eRollStep1];
            if(state.startTime === INVALID_VALUE){
                state.startTime = Browser.now();
            }
            if(state.startY === INVALID_VALUE){
                state.startY = this.rollWheel.y;
            }
            state.usedTime = Browser.now() - state.startTime;
            var ratio = Ease["sineIn"](state.usedTime,0,1,300);
            if(state.usedTime < 300){
                this.rollWheel.y = state.startY + ratio * 600;
            }else{
                this.curRollState = ERollState.eRollStep2;
                state.startTime = INVALID_VALUE;
                state.startY = INVALID_VALUE;
                state.usedTime = INVALID_VALUE;
                return;
            }
        }
        //开始后的匀速状态
        if(this.curRollState === ERollState.eRollStep2){
            var state = this.arrRollState[ERollState.eRollStep2];
            if(state.startTime === INVALID_VALUE){
                state.startTime = Browser.now();
            }
            if(state.startY === INVALID_VALUE){
                state.startY = this.rollWheel.y;
            }
            state.usedTime = Browser.now() - state.startTime;
            var deltaY = Laya.timer.delta / 1000 * 3800;
            this.rollWheel.y += deltaY;
            var stateTime = BASE_UR_TIME;
            //立即结束匀速状态
            if(this.stopFlg) stateTime = 0;
            var flg = true;
            if(this.config.index !== 0){
                flg = LPD_STOP_FLG[this.config.index - 1];
            }
            if(state.usedTime >= stateTime && flg){
                this.curRollState = ERollState.eRollStep3;
                state.startTime = INVALID_VALUE;
                state.startY = INVALID_VALUE;
                state.usedTime = INVALID_VALUE;
                return;
            }
        }
        //快结束的减速状态
        if(this.curRollState === ERollState.eRollStep3){
            var state = this.arrRollState[ERollState.eRollStep3];
            if(state.startTime === INVALID_VALUE){
                state.startTime = Browser.now();
            }
            if(state.startY === INVALID_VALUE){
                state.startY = this.rollWheel.y;
                var unitHeight = this.config.height / this.config.viewCnt;
                var rndHeight = unitHeight * this.config.arrIcons.length;
                var tmp = this.stopY - state.startY;
                //如果距离小于300的话停下来太唐突，做一个微调
                var dis = Math.abs(this.stopY - state.startY);
                if(this.stopY < state.startY || dis < 300) tmp += rndHeight;
                this.stopY = tmp + STOP_Y_DELTA;
            }
            state.usedTime = Browser.now() - state.startTime;
            var ratio = Ease["sineOut"](state.usedTime,0,1,this.stopY / 2);  
            if(state.usedTime < this.stopY / 2){
                this.rollWheel.y = state.startY + ratio * this.stopY;
            }else{
                this.curRollState = ERollState.eRollStep4;
                state.startTime = INVALID_VALUE;
                state.startY = INVALID_VALUE;
                state.usedTime = INVALID_VALUE;
                return;
            }
        }
        //结束前的回滚
        if(this.curRollState === ERollState.eRollStep4){
            LPD_STOP_FLG[this.config.index] = true;
            var state = this.arrRollState[ERollState.eRollStep4];
            if(state.startTime === INVALID_VALUE){
                state.startTime = Browser.now();
            }
            if(state.startY === INVALID_VALUE){
                state.startY = this.rollWheel.y;
            }
            state.usedTime = Browser.now() - state.startTime;
            var ratio = Ease["elasticOut"](state.usedTime,0,1,400);
            if(state.usedTime < 400){
                this.rollWheel.y = state.startY + ratio * (-STOP_Y_DELTA);
            }else{
                this.rollWheel.y = state.startY - STOP_Y_DELTA;
                this.curRollState = ERollState.eStop;
                this.stopFlg = false;
                state.startTime = INVALID_VALUE;
                state.startY = INVALID_VALUE;
                state.usedTime = INVALID_VALUE;
                ROLL_END_FLG[this.config.index] = true;
                this._rollEnd();
                return;
            }
        }
    };

    // LaPaRollDisc.prototype.flashIcon = function(params){
    //     var icon = this.rollWheel.getChildByName("Icon_" + params.idx);
    //     var iconY = icon.y + this.rollWheel.y;
    //     if(iconY >= 0 && iconY <= this.rollWheel.height){
    //         //nothing to do
    //     }else{
    //         icon = this.rollWheel.getChildByName("Icon_" + (this.config.arrIcons.length + params.idx));
    //     }
    //     icon.flash && icon.flash(params.onFlashEnd);
    // };

    LaPaRollDisc.prototype.getIconByPosInView = function(iconPos){
        var icon = this.Icons[iconPos.name];
        if(!icon) return null;
        var unitHeight = this.config.height / this.config.viewCnt;
        var iconY = icon.y + this.rollWheel.y;
        var fooY = iconPos.posY * unitHeight / 2;
        var delta = Math.abs(fooY - iconY);
        if(delta <= 5){
            return icon;
        }
        icon = this.Icons_Extra[iconPos.name];
        if(!icon) return null;
        iconY = icon.y + this.rollWheel.y;
        delta = Math.abs(fooY - iconY);
        if(delta <= 5){
            return icon;
        }
        return null;
    }

    LaPaRollDisc.prototype._rollEnd = function(){
        var flg = true;
        for(var i in ROLL_END_FLG){
            flg &= ROLL_END_FLG[i];
        }
        if(flg){
            this.parent.onRollEnd();
        }
    }

    return LaPaRollDisc;
}(Laya.Panel));


var LaPaIcon = (function (_super) {
    function LaPaIcon(config) {
        LaPaIcon.__super.call(this);
        this.config = config;
        this._init();
    };
    Laya.class(LaPaIcon, "LaPaIcon", _super);
    LaPaIcon.prototype.onDestroy = function(){};
    LaPaIcon.prototype._init = function(){
        this.width = this.config.width;
        this.height = this.config.height;
        this.pos(0.0, this.config.index * this.config.height);
        this.name = "Icon_" + this.config.iconName;
        this.graphics.drawTexture(Laya.loader.getRes(this.config.res_root_url + "/" + this.config.iconName + ".png"), 0, 0, this.width, this.height);
    };

    return LaPaIcon;
}(Laya.Sprite));