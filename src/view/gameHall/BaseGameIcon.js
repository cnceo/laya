
/**
 * 游戏开启状态
 */
var EGameState = {
    eOpen : "eOpen",
    eMaintain : "eMaintain",//维护
    eNotOpen : "eNotOpen",//暂未开放
}
/**
 * 客户端游戏列表，默认都是关闭的
 */
var GameList = 
[    
    {name:GameData.getInstance().gameType.eGoldenFlower,state:EGameState.eNotOpen},
    {name:GameData.getInstance().gameType.eShowhand,state:EGameState.eNotOpen},
    {name:GameData.getInstance().gameType.eOneArmBandit,state:EGameState.eNotOpen},
    {name:GameData.getInstance().gameType.eFishing,state:EGameState.eNotOpen},
    {name:GameData.getInstance().gameType.eFightLandlord,state:EGameState.eNotOpen},
    {name:GameData.getInstance().gameType.e21Point,state:EGameState.eNotOpen},
    //{name:GameData.getInstance().gameType.eTexasHoldem,state:EGameState.eOpen}
];
var BaseGameIcon = (function (_super) {    
    function BaseGameIcon() {
        BaseGameIcon.super(this);

        var speedAnim = 95;

        BaseGameIcon.OpenningSt = new GameOpenningState();
        BaseGameIcon.ClosingSt = new GameClosingState(); 
        BaseGameIcon.MaintainSt = new GameMaintainingState();

        this.curGameState = new GameClosingState();
        this.curGameState.SetGameIcon(this);
        this.curEState = EGameState.eNotOpen;
        this.gameType = null;

        this.boxBtn.disabled = true;
        this.imgBottom = this.boxBtn.getChildByName("imgBottom");
        this.iconMaintain = this.boxBtn.getChildByName("iconMaintain");
        this.imgNew = this.boxBtn.getChildByName("imgNew");
        this.lblName = this.boxBtn.getChildByName("lblName");
        this.imgIcon = this.boxBtn.getChildByName("imgIcon");

        //this.imgNew.visible = false;
        this.iconMaintain.visible = false;
        this.lblName.text = "";

        this.arrAnim = [];

        this.on(Event.CLICK,this,this.OnClick);

        //初始化图标 每添加一种游戏，在此添加
        this.initIcon = function(){
            this.lblName.text = Tools.getInstance().GetGameNameByType(this.gameType);
            if(this.arrAnim.length != 0) return;
            switch(this.gameType){
                case GameData.getInstance().gameType.eShowhand:
                    this.addShowhandIcon();
                    break;
                case GameData.getInstance().gameType.eGoldenFlower:
                    this.addGoldenFlowerIcon();
                    break;
                case GameData.getInstance().gameType.eOneArmBandit:
                    this.addOneArmBanditIcon();
                    break;
                case GameData.getInstance().gameType.eFishing:
                    this.addFishingIcon();
                    break;
                case GameData.getInstance().gameType.eFightLandlord:
                    this.addFightLandllordIcon();
                    break;
                case GameData.getInstance().gameType.e21Point:
                    this.add21PointIcon();
                    break;
                case GameData.getInstance().gameType.eTexasHoldem:
                    this.addTexasHoldemIcon();
                    break;
            }
        }
        //梭哈图标
        this.addShowhandIcon = function(){
            if(this.arrAnim.length != 0) return;
            this.imgIcon.skin = "gameHall/suoha.png";
            var animate = new Effect();
            animate.init("res/atlas/gameHall/showhandEffect.json",speedAnim,true);
            this.boxBtn.addChild( animate );
            animate.pivotX = 150 >> 1;
            animate.pivotY = 150 >> 1;
            animate.x = 128;
            animate.y = 115;
            this.boxBtn.setChildIndex(animate,this.boxBtn.getChildIndex(this.iconMaintain) -2);
            animate.visible = false;
            this.arrAnim.push(animate);
        }
        //炸金花图标
        this.addGoldenFlowerIcon = function(){
            if(this.arrAnim.length != 0) return;
            this.imgIcon.skin = "gameHall/zhajinhua.png";
            var animate1 = new Effect();
            animate1.init("res/atlas/gameHall/goldenflowerEffect/light.json",speedAnim,true);
            this.boxBtn.addChild( animate1 );
            animate1.pivotX = 80 >> 1;
            animate1.pivotY = 80 >> 1;
            animate1.x = 62;
            animate1.y = 123;

            var animate3 = new Effect();
            animate3.init("res/atlas/gameHall/goldenflowerEffect/light.json",speedAnim,true);
            this.boxBtn.addChild( animate3 );
            animate3.pivotX = 80 >> 1;
            animate3.pivotY = 80 >> 1;
            animate3.x = 149;
            animate3.y = 116;
            animate3.rotation = 22;

            var animate2 = new Effect();
            animate2.init("res/atlas/gameHall/goldenflowerEffect/line.json",speedAnim,true);
            this.boxBtn.addChild( animate2 );
            animate2.pivotX = 250 >> 1;
            animate2.pivotY = 100 >> 1;
            animate2.x = 128;
            animate2.y = 170;

            this.boxBtn.setChildIndex(animate1,this.boxBtn.getChildIndex(this.iconMaintain) -2);
            this.boxBtn.setChildIndex(animate2,this.boxBtn.getChildIndex(this.iconMaintain) -2);
            this.boxBtn.setChildIndex(animate3,this.boxBtn.getChildIndex(this.iconMaintain) -2);
            
            animate1.visible = false;
            animate2.visible = false;
            animate3.visible = false;
            this.arrAnim.push(animate1);
            this.arrAnim.push(animate2);
            this.arrAnim.push(animate3);
        }
        //老虎机图标
        this.addOneArmBanditIcon = function(){
            if(this.arrAnim.length != 0) return;
            this.imgIcon.skin = "gameHall/laba.png";
            var animate = new Effect();
            animate.init("res/atlas/gameHall/showhandEffect.json",speedAnim,true);
            this.boxBtn.addChild( animate );
            animate.pivotX = 150 >> 1;
            animate.pivotY = 150 >> 1;
            animate.x = 128;
            animate.y = 115;
            this.boxBtn.setChildIndex(animate,this.boxBtn.getChildIndex(this.iconMaintain) -2);
            this.arrAnim.push(animate);
        }
        //捕鱼图标
        this.addFishingIcon = function(){
            if(this.arrAnim.length != 0) return;
            this.imgIcon.skin = "gameHall/fishing.png";
            var animate = new Effect();
            animate.init("res/atlas/gameHall/fishingEffect.json",speedAnim,true);
            this.boxBtn.addChild( animate );
            animate.pivotX = 200 >> 1;
            animate.pivotY = 200 >> 1;
            animate.x = 114;
            animate.y = 107;
            this.arrAnim.push(animate);
        }
        //斗地主图标
        this.addFightLandllordIcon = function(){
            if(this.arrAnim.length != 0) return;
            this.imgIcon.skin = "gameHall/doudizhu.png";
            var animate = new Effect();
            animate.init("res/atlas/gameHall/fightLandlord.json",140,true);
            this.boxBtn.addChild( animate );
            animate.pivotX = 150 >> 1;
            animate.pivotY = 150 >> 1;
            animate.x = 90;
            animate.y = 190;
            this.arrAnim.push(animate);
        }
        //21点图标
        this.add21PointIcon = function(){
            if(this.arrAnim.length != 0) return;
            this.imgIcon.skin = "gameHall/21dian.png";
        }
        //德州图标
        this.addTexasHoldemIcon = function(){
            if(this.arrAnim.length != 0) return;
            this.imgIcon.skin = "gameHall/21dian.png";
        }
    }
    Laya.class(BaseGameIcon, "BaseGameIcon", _super);

    BaseGameIcon.prototype.GetState = function(){
        return this.curGameState;
    };
    BaseGameIcon.prototype.SetState = function(state){
        this.curGameState = state;
        this.curGameState.SetGameIcon(this);
    };
    BaseGameIcon.prototype.UpdateState = function(eState){
        this.curEState = eState;
        switch(eState){
            case EGameState.eOpen:
                this.Open();
                break;
            case EGameState.eNotOpen:
                this.Close();
                break;
            case EGameState.eMaintain:
                this.Maintain();
                break;
        }
    }
    BaseGameIcon.prototype.Open = function(){
        this.curGameState.Open();
    };
    BaseGameIcon.prototype.Maintain = function(){
        this.curGameState.Maintain();
    };
    BaseGameIcon.prototype.Close = function(){
        this.curGameState.Close();
    };

    BaseGameIcon.prototype.OnClick = function(e){
        // if(this.gameType == GameData.getInstance().gameType.eTexasHoldem){
        //    ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.TEXASROOM ,resList:PreLoadList.getInstance().texasRoom});
        //    return;
        // }
        if(this.curEState === EGameState.eMaintain) {
            new HintMessage('游戏维护中...');
        }
        else if(this.curEState === EGameState.eOpen){
            if(!this.gameType) return;
            GateSocketClient.getInstance().CG_ENTER_GAME_REQ( this.gameType );
        }
    }

    //为保证图标的宽高等信息能获取的到，需要先将该对象添加到父节点上，然后调用该init方法
    BaseGameIcon.prototype.Init = function(type,state){
        this.gameType = type;
        this.initIcon();
        this.UpdateState(state);
    }; 
    BaseGameIcon.prototype.PlayAnim = function(){
        for(var i in this.arrAnim){
            this.arrAnim[i].visible = true;
            this.arrAnim[i].play();
        }
    }
    BaseGameIcon.prototype.StopAnim = function(){
        for(var i in this.arrAnim){
            this.arrAnim[i].visible = false;
        }
    }

    return BaseGameIcon;
})(GameIconUI);



/**
 * 图标状态接口
 */
var GameIconState = (function(_super){
    
    function GameIconState(){
        this.gameIcon = null;
    }
    Laya.class(GameIconState, "GameIconState", _super);
    GameIconState.prototype.SetGameIcon = function(gi){
        this.gameIcon = gi;
    }
    GameIconState.prototype.Open = function(){}
    GameIconState.prototype.Close = function(){}
    GameIconState.prototype.Maintain = function(){}
    return GameIconState;
})();

/**
 * 开放状态
 */
var GameOpenningState = (function(_super){
    function GameOpenningState(){

    }
    Laya.class(GameOpenningState, "GameOpenningState", _super);
    GameOpenningState.prototype.Open = function(){
        this.curEState === EGameState.eOpen;
        this.gameIcon.iconMaintain.visible = false;
        this.gameIcon.boxBtn.disabled = false;
        this.gameIcon.PlayAnim();
    }
    GameOpenningState.prototype.Close = function(){}
    GameOpenningState.prototype.Maintain = function(){
        this.gameIcon.SetState(BaseGameIcon.MaintainSt);
        this.gameIcon.Maintain();
    }
    return GameOpenningState;
})(GameIconState);

/**
 * 关闭状态
 */
var GameClosingState = (function(_super){
    function GameClosingState(){
    }
    Laya.class(GameClosingState, "GameClosingState", _super);
    GameClosingState.prototype.Open = function(){
        this.gameIcon.SetState(BaseGameIcon.OpenningSt);
        this.gameIcon.Open();
    }
    GameClosingState.prototype.Close = function(){
        this.curEState === EGameState.eNotOpen;
        this.gameIcon.iconMaintain.visible = false;
        this.gameIcon.boxBtn.disabled = true;
        this.gameIcon.StopAnim();
    }
    GameClosingState.prototype.Maintain = function(){
        this.gameIcon.SetState(BaseGameIcon.MaintainSt);
        this.gameIcon.Maintain();
    }
    return GameClosingState;
})(GameIconState);
/**
 * 维护状态
 */
var GameMaintainingState = (function(_super){
    function GameMaintainingState(){
    }
    Laya.class(GameMaintainingState, "GameMaintainingState", _super);
    GameMaintainingState.prototype.Open = function(){
        this.gameIcon.SetState(BaseGameIcon.OpenningSt);
        this.gameIcon.Open();
    }
    GameMaintainingState.prototype.Close = function(){
    }
    GameMaintainingState.prototype.Maintain = function(){
        this.curEState === EGameState.eMaintain
        this.gameIcon.iconMaintain.visible = true;
        this.gameIcon.boxBtn.disabled = false;
        this.gameIcon.StopAnim();
    }
    return GameMaintainingState;
})(GameIconState);