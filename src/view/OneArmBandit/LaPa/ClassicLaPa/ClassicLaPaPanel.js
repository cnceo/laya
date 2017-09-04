/*
* name;
*/
var ClassicLaPaPanel = (function (_super) {
    function ClassicLaPaPanel() {
        ClassicLaPaPanel.super(this);
        this._initER();
        this._autoSpinFlg = false;
        this._onHold = false;
        this._autoState = {
            ready : false,
            play : false,
            settle :false,
        };
    };

    Laya.class(ClassicLaPaPanel, "ClassicLaPaPanel", _super);

    //override
    ClassicLaPaPanel.prototype._initLaPaMachine = function(){
        this.Mac = new ClassicMachine();
        var self = this;
        this.Mac.onLaPaBingo = function(rlt){
            var winMoney = 0;
            for(var i in rlt){
                var blr = rlt[i];
                winMoney += blr.winAmount;
            }
            self.lblWinMoney.text = Tools.getInstance().ChangeUIShow(winMoney);
            self.Me.changeTotalMoney(winMoney);
            //显示中奖信息
            self.lblWin.text = "获胜";
            self.lblBetInfo.visible = false;
            for(var i in rlt){
                var blr = rlt[i];
                var xTmp = 0.0;
                var bJokerFlg = false;
                for(var j in blr.iconsPos){
                    var ip = blr.iconsPos[j];
                    var img = new Laya.Sprite();
                    img.height = 55;
                    img.width = 55;
                    xTmp = 55.0 * Number(j);
                    img.pos(xTmp, 0.0);
                    img.graphics.drawTexture(Laya.loader.getRes("classic_lapa/" + ip.name + ".png"), 0, 0, img.width, img.height);
                    self.boxSpinInfo.addChild(img);
                    if(!bJokerFlg){
                        bJokerFlg = ip.name == "Joker";
                    }
                }
                var lbl0 = new Laya.Label();
                var num = bJokerFlg ? blr.winAmount / 2 : blr.winAmount;
                lbl0.text = " 赔付: " + Tools.getInstance().ChangeUIShow(num) + "  ";
                lbl0.height = 60;
                lbl0.color = "#ffda5b";
                lbl0.font = "Microsoft YaHei";
                lbl0.fontSize = 25;
                xTmp += 55;
                lbl0.pos(xTmp, 12.0);
                self.boxSpinInfo.addChild(lbl0);
                if(bJokerFlg){
                    var img = new Laya.Sprite();
                    img.height = 55;
                    img.width = 55;
                    xTmp += 200;
                    img.pos(xTmp, 0.0);
                    img.graphics.drawTexture(Laya.loader.getRes("classic_lapa/Joker.png"), 0, 0, img.width, img.height);
                    self.boxSpinInfo.addChild(img);
                    var lbl1 = new Laya.Label();
                    lbl1.text = " ×2";
                    lbl1.height = 60;
                    lbl1.color = "#ffda5b";
                    lbl1.font = "Microsoft YaHei";
                    lbl1.fontSize = 25;
                    xTmp += 55;
                    lbl1.pos(xTmp, 12.0);
                    self.boxSpinInfo.addChild(lbl1);
                }
            }
        };
        this.Mac.onSetState = function(state){
            switch(state){
                case OABEnum.EPlayState.eReady:{
                    self.lblBetInfo.visible = true;
                    self.lblBetInfo.text = "按“旋转”按钮，开始游戏";
                    self.boxSpinInfo.destroyChildren();
                    //self.lblWinMoney.text = 0;
                    break;
                };
                case OABEnum.EPlayState.ePlaying:{
                    self.lblBetInfo.visible = true;
                    self.lblBetInfo.text = "祝您中奖";
                    self.lblWin.text = "上次获胜";
                    break;
                };
                case OABEnum.EPlayState.eSettlement:{
                    break;
                };
            }
        };
        var bls = {};
        for(var i in this.Game.MacConfig.bingoLine){
            var bl = this.Game.MacConfig.bingoLine[i];
            bls[bl.ID] = bl.line;
        }
        var config = {
            rowCnt : this.Game.MacConfig.rowCnt,
            colCnt : this.Game.MacConfig.colCnt,
            arrIcons : this.Game.MacConfig.icons,
            res_root_url : "classic_lapa",
            discBg : "lunpan.png",
            width : 1060,
            height : 610,
            disc_x_space : 10,
            bingo_line_colors : {
                "0" : "#00ff00",
                "1" : "#ff0000",
            },
            bingoLines : bls,
            pt : new Point(0, 0),
        };
        //87 65
        this.Mac.init(config);
        this.machineBg.addChild(this.Mac);
    };

    ClassicLaPaPanel.prototype._bindEvent = function(){
        this.startBtn.on(Event.MOUSE_UP, this, this._onStartBtnRelease);
        this.startBtn.on(Event.MOUSE_DOWN, this, this._onStartBtnPress);
        this.btnPlusBet.on(Event.CLICK,this, this._onBtnPlusClick);
        this.btnMinusBet.on(Event.CLICK,this, this._onBtnMinusClick);
        this.btnBack.on(Event.CLICK,this, this._onBtnBackClick);
        this.btnRule.on(Event.CLICK,this, this._onBtnRuleClick);
    };

    ClassicLaPaPanel.prototype._initAutoSpinEffect = function(){
        this.animation = new Effect();
        this.animation.init("res/atlas/classic_lapa/auto_spin.json",90,true);
        this.startBtn.addChild( this.animation );
        this.animation.x = (this.startBtn.width - 325) >> 1 ;
        this.animation.y = (this.startBtn.height - 320) >> 1;
        this.animation.play();
        this.animation.visible =false;
    };

    ClassicLaPaPanel.prototype._onStartBtnPress = function(e){
        Laya.timer.once(1000, this, this._onAutoSpin);
        this._onHold = false;
    };

    ClassicLaPaPanel.prototype._onStartBtnRelease = function(){
        if(this._onHold){
            //长按状态下自动玩
        }else{
            Laya.timer.clear(this, this._onAutoSpin);
            if(this._autoSpinFlg){
                this._autoSpinFlg = false;
                this.startBtn.skin = "classic_lapa/kaishi.png";
                this.animation.visible = false;
            }else{
                //手动玩
                if(this.Mac.getState() === OABEnum.EPlayState.eReady){
                    var param = {
                        oabType : {
                            type : this.Game.getType(),
                            level : this.Game.getLevel(),
                        },
                        betAmount : this.Me.getBetAmount(),
                    }
                    NetManager.GameClintInstance.CG_SPIN_LAPA_REQ(param);
                }else if(this.Mac.getState() === OABEnum.EPlayState.ePlaying){
                    this.Mac.stopImmediately();
                }else if(this.Mac.getState() === OABEnum.EPlayState.eSettlement){
                    this.Mac.ready();
                }
            }
        }
    };

    ClassicLaPaPanel.prototype._onAutoSpin = function(e){
        this._onHold = true;
        if(!this._autoSpinFlg){
            this._autoSpinFlg = true;
            this.startBtn.skin = "classic_lapa/auto_kaishi.png";
            this.animation.visible = true;
        }
    };

    ClassicLaPaPanel.prototype._onBtnBackClick = function(){
        var oabType = {
            type : this.Game.getType(), 
            level : this.Game.getLevel()
        };
        NetManager.GameClintInstance.CG_LEAVE_OAB_ROOM_REQ(oabType);
    }

    ClassicLaPaPanel.prototype._onBtnPlusClick = function(){
        this.Me.changeBet(true);
        var txt = this.Me.isMaxBet() ? "最大注" : "下注";
        this.lblMaxBet.text = txt;
    };

    ClassicLaPaPanel.prototype._onBtnMinusClick = function(){
        this.Me.changeBet(false);
        var txt = this.Me.isMaxBet() ? "最大注" : "下注";
        this.lblMaxBet.text = txt;
    };

    ClassicLaPaPanel.prototype._onBtnRuleClick = function(){
        if( this.RulePanel == null )
        {
            this.RulePanel = new HowToPlayView();
            this.addChild( this.RulePanel );
            this.RulePanel.init();
            this.RulePanel.visible = true;
        }else{
            this.RulePanel.show();
        }
    };

    ClassicLaPaPanel.prototype.init = function(){
        this.Game = OABGameMgr.getInstance().getCurGame();
        this.Me = OABGameMgr.getInstance().getCurGame().Me;
        this._bindEvent();
        this._bindDynData();
        this._initLaPaMachine();
        Laya.timer.loop(1000, this, this.refreshRPMoneyReq);
        Laya.timer.loop(50, this, this.updateAutoSpin);
        this.lblName.text = Tools.getInstance().GetLocalPlayerUIName();
        this.imgPortrait.skin = "common/head/headIcon"+ User.getInstance().GetHeadIconID()+".png";
        this.lblMaxBet.text = "下注";
        this._initAutoSpinEffect();
        this.initRechargeBtn();
    };

    this.initRechargeBtn = function()
    {
        this.rechargeBtn = new RechargeBtn(this);
        this.recharge.addChild(this.rechargeBtn);
        this.rechargeBtn.x = 65;
        this.rechargeBtn.y = 50;
    } 

//向服务器发送刷新奖池信息的请求
    ClassicLaPaPanel.prototype.refreshRPMoneyReq = function(){
        var arrParam = [
            {oabType : {type : this.Game.getType(), level : this.Game.getLevel()}, rwdPoolMoney : 0},
        ];
        NetManager.GameClintInstance.CG_OAB_RWD_POOL_MONEY_REQ(arrParam);
    };  

    ClassicLaPaPanel.prototype._initER = function(){
        this._betAmountER = new EventReceiver();
        this._totalMoneyER = new EventReceiver();
        this._rwdPoolMoneyER = new EventReceiver();
        this._playER = new EventReceiver();
        var me = this;
        this._betAmountER.process = function(content){
            me.lblBetAmount.text = Tools.getInstance().ChangeUIShow(content);
        };
        this._totalMoneyER.process = function(content){
            me.lblTotalMoney.text = Tools.getInstance().ChangeUIShow(content);
        };
        this._rwdPoolMoneyER.process = function(content){
            me.lblRwdPoolMoney.text = Tools.getInstance().ChangeUIShow(content);
        };
        this._playER.process = function(args){
            if(me.Mac.getState() === OABEnum.EPlayState.eReady){
                me.Me.changeTotalMoney(-args.betAmount);
                me.Mac.play(args);
            }
        }
    };

    ClassicLaPaPanel.prototype._bindDynData = function(){
        this.lblBetAmount.text = Tools.getInstance().ChangeUIShow(this.Me.getBetAmount());
        this.Me.BetAmountES.register(this._betAmountER);
        this.lblTotalMoney.text = Tools.getInstance().ChangeUIShow(this.Me.getTotalMoney());
        this.Me.TotalMoneyES.register(this._totalMoneyER);
        this.lblRwdPoolMoney.text = Tools.getInstance().ChangeUIShow(this.Game.getRewardPoolMoney());
        this.Game.RPMES.register(this._rwdPoolMoneyER);
        this.Me.PlayES.register(this._playER);
    };

    ClassicLaPaPanel.prototype._unbindDynData = function(){
        this.Me.BetAmountES.unregister(this._betAmountER);
        this.Me.TotalMoneyES.unregister(this._totalMoneyER);
        this.Game.RPMES.unregister(this._rwdPoolMoneyER);
        this.Me.PlayES.unregister(this._playER);
    };

    ClassicLaPaPanel.prototype.end = function(){
        this._unbindDynData();
        Laya.timer.clear(this, this.refreshRPMoneyReq);
        Laya.timer.clear(this, this.updateAutoSpin);
    };

    ClassicLaPaPanel.prototype.updateAutoSpin = function(){
        if(this._autoSpinFlg){
            if(this.Mac.getState() === OABEnum.EPlayState.eReady && !this._autoState.ready){
                var param = {
                    oabType : {
                        type : this.Game.getType(),
                        level : this.Game.getLevel(),
                    },
                    betAmount : this.Me.getBetAmount(),
                }
                NetManager.GameClintInstance.CG_SPIN_LAPA_REQ(param);
                this._autoState.ready = true;
                this._autoState.play = false;
                this._autoState.settle = false;
            }else if(this.Mac.getState() === OABEnum.EPlayState.ePlaying  && !this._autoState.play){
                this._autoState.ready = false;
                this._autoState.play = true;
                this._autoState.settle = false;
                this.Mac.stopImmediately();
            }else if(this.Mac.getState() === OABEnum.EPlayState.eSettlement && !this._autoState.settle){
                var self = this;
                this._autoState.ready = false;
                this._autoState.play = false;
                this._autoState.settle = true;
                Laya.timer.once(1000, this, function(){
                    self.Mac.ready();
                });
            }
        }
    }
    return ClassicLaPaPanel;
}(ClassicLaPaPanelUI));