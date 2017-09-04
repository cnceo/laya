/**
 * 2016 12 20
 * 炸金花比牌界面
 */
function GFCompareCardsView()
{
    GFCompareCardsView.super( this );
    
    this.Init = function(PlayerControlCom)
    {
        this.PlayerControlCom = PlayerControlCom;
        this._callBack = null;
        this._classObj = null;
        this.scap = 50;//牌间隙
        this.leftPointX = 460;//左侧中间牌的位置
        this.rightPointX = 970;//右侧中间牌的位置
        this.pointY = 390;
        this.player1 = null;
        this.player2 = null;
        this.boxPlayer1 = this.getChildByName("leftPlayer");
        this.boxPlayer2 = this.getChildByName("rightPlayer");
        this.winPlayer = null;
        this.createCards();
        //this.bg.on(Event.CLICK,this,this.onClick);     
    }
    this.destroy = function(){
        this.PlayerControlCom = null;
        this.winPlayer = null;
        this.player1 = null;
        this.player2 = null;
        this._callBack = null;
        this._classObj = null;
        this.__proto__.destroy();
    }
    this.onClick = function(e){

    }
    //player1为比牌发起者
    this.Show = function( bShow,player1,player2,winPlayer,callBack,classObj )
    {
        this._callBack = callBack;
        this._classObj = classObj;
        if( bShow ){
            this.winPlayer = winPlayer;
            this.player1 = player1;
            this.player2 = player2;
            this.setPlayerInfo(this.player1,'leftPlayer');
            this.setPlayerInfo(this.player2,'rightPlayer');
            this.playAnim();
        }
        else{
            if(this.player1){
                this.player1.showCards();
            }
            if(this.player2){
                this.player2.showCards();
            }
            this.player1 = this.player2 = null;
            this.winPlayer = null;
            TaskDelayManager.getInstance().clearTarget(this);
            //SoundManager.stopSound('audio/compareCards.mp3');
        }
        this.visible = bShow;
    }
    //动画
    this.playAnim = function(){
        // var anim = this.player1 == this.winPlayer ? this.animRightLose : this.animLeftLose ;
        // //start:* (default = 0) — 开始播放的动画索引或label。
        // //loop:Boolean (default = true) — 是否循环。
        // anim.play(0,false);
        // anim.on(Event.COMPLETE,this,this.onAnimComplete);
        this.moveCardsCompare();

        this.showMiddleEffect();

        this.onAnimComplete();

        var task2 = new TaskDelay();
        task2.callBack = function(){ 
            this.showLosePlayerEffect();
            this.showWinPlayerEffect();
        };
        task2.classObj = this;
        task2.leftTime = 1000;
        TaskDelayManager.getInstance().addTask( task2 );
    }
    this.showMiddleEffect = function(){
        if(!this.middleEffect){
            this.middleEffect = new Effect();
            this.middleEffect.init("res/atlas/gfRoom/eMiddle.json",80,false);
            this.middleEffect.x = this.iconC.x - 550;
            this.middleEffect.y = this.iconC.y - 200;
            this.middleEffect.anchorX = 0.5;
            this.middleEffect.anchorY = 0.5;
            this.addChild( this.middleEffect );
        }
        this.middleEffect.play();
    }
    //动画表现完后 牌回位
    this.onAnimComplete = function(){
        var task2 = new TaskDelay();
        task2.callBack = function(){ this.moveCardsBack(); };
        task2.classObj = this;
        task2.leftTime = 2500;
        TaskDelayManager.getInstance().addTask( task2 );
    }
   
    //失败特效
    this.showLosePlayerEffect = function(){
        var boxLose = this.player1 == this.winPlayer ? this.boxPlayer2 : this.boxPlayer1;
        var headLose = boxLose.getChildByName("head");
        headLose.disabled = true;
        var losePL = this.globalToLocal(headLose.localToGlobal(new Point(0,0)));
        if(!this.loseEffect){
            this.loseEffect = new Effect();
            this.loseEffect.init("res/atlas/gfRoom/eFail.json",60,false);
            this.addChild( this.loseEffect );
            this.loseEffect.anchorX = 0.5;
            this.loseEffect.anchorY = 0.5;
        }
        
        this.loseEffect.x = losePL.x - 47;
        this.loseEffect.y = losePL.y - 47;
        this.loseEffect.play();

        boxLose.getChildByName('sheng').visible = false;
        boxLose.getChildByName('bai').visible = true;

        if(this.PlayerControlCom.isLocalPlayer(this.winPlayer.getPos())){
            SoundManager.playSound('audio/gfComWin.mp3');
        }
        else{
            SoundManager.playSound('audio/gfComLose.mp3');
        }
    } 
    //胜利特效
    this.showWinPlayerEffect = function(){
        var boxWin = this.player1 == this.winPlayer ? this.boxPlayer1 : this.boxPlayer2;
        var headWin = boxWin.getChildByName("head");
        var winPL = this.globalToLocal(headWin.localToGlobal(new Point(0,0)));

        if(!this.winEffect){
            this.winEffect = new Effect();
            this.winEffect.init("res/atlas/gfRoom/eVictory.json",60,false);
            this.addChild( this.winEffect );
            this.winEffect.anchorX = 0.5;
            this.winEffect.anchorY = 0.5;
        }
        this.winEffect.x = winPL.x - 47;
        this.winEffect.y = winPL.y - 47;
        this.winEffect.play();

        boxWin.getChildByName('sheng').visible = true;
        boxWin.getChildByName('bai').visible = false;


    }
    //设置玩家信息
    this.setPlayerInfo = function(player,tag){
        var box1 = this.getChildByName(tag);
        box1.dataSource = {head:player.getIcon(),name:player.getPlayerName()};
        var head = box1.getChildByName('head');
        head.disabled = false;
        var shiwan = head.getChildByName('iconShiwan');
        if(shiwan){
            var room = GFRoomMgr.getInstance().GetCurRoom();
            shiwan.visible = room.GetType() == ROOM_TYPE_DIAMONDS.DEMOROOM.key;
        }
        box1.getChildByName("sheng").visible = false;
        box1.getChildByName("bai").visible = false;
        var cards = player.cards;
        for(var i in cards){
            var card  = this.getChildByName(tag + "Card"+i);
            if(card){
                card.setImage(cards[i].path);
                var pointG = cards[i].localToGlobal(new Point(0,0));
                var pointL = this.globalToLocal(pointG);
                card.x = card.startX = pointL.x;
                card.y = card.startY = pointL.y;
                card.scaleX = card.startScaleX = cards[i].scaleX;
                card.scaleY = card.startScaleY = cards[i].scaleY; 
                var endCPoint = tag == "leftPlayer" ? this.leftPointX : this.rightPointX;
                card.endX = (parseInt(i) - 1 ) * this.scap + endCPoint; 
                card.endY = this.pointY;
                card.endScale = 1;
                card.pivotX = 0;
            }
        }
        player.hideCards();        
    }
    //牌移动到
    this.moveCardsCompare = function(){
        for(var i =0;i<3;i++){
            var cardL  = this.getChildByName("leftPlayerCard"+i);
            if(cardL){
                Tween.to(cardL,{
                x: cardL.endX,
                y: cardL.endY,
                scaleX: cardL.endScale,
                scaleY: cardL.endScale,
                },100); 
            }
            var cardR = this.getChildByName("rightPlayerCard"+i);
            if(cardR){
                Tween.to(cardR,{
                x: cardR.endX,
                y: cardR.endY,
                scaleX: cardR.endScale,
                scaleY: cardR.endScale,
                },100);
            } 
        }
    }
    //牌移回
    this.moveCardsBack = function(){
        var actionTime = 100;
        for(var i =0;i<3;i++){
            var cardL  = this.getChildByName("leftPlayerCard"+i);
            if(cardL){
                Tween.to(cardL,{
                x: cardL.startX,
                y: cardL.startY,
                scaleX: cardL.startScaleX,
                scaleY: cardL.startScaleY,
                },actionTime); 
            }
            var cardR = this.getChildByName("rightPlayerCard"+i);
            if(cardR){
                Tween.to(cardR,{
                x: cardR.startX,
                y: cardR.startY,
                scaleX: cardR.startScaleX,
                scaleY: cardR.startScaleY,
                },actionTime);
            } 
        }
        var task = new TaskDelay();
        task.callBack = this.showWinLose;
        task.classObj = this;
        task.leftTime = actionTime;
        TaskDelayManager.getInstance().addTask( task );
    }
    //显示输赢
    this.showWinLose = function(){
        this.winPlayer.showCompareWin();
        var losePlayer = (this.winPlayer == this.player1) ? this.player2 : this.player1;
        losePlayer.showCompareLose();
        if( this._classObj && this._callBack ){
            this._callBack.call( this._classObj,losePlayer );
            this._callBack = this._classObj = null;
        }
        this.Show(false);
        var task = new TaskDelay();
        task.callBack = function(){
            StatePool.stateProcess(GameData.getInstance().gfRoomState.ePK);
        }
        task.classObj = this;
        task.leftTime = 500;
        TaskDelayManager.getInstance().addTask( task );
    }
    //初始化卡牌
    this.createCards = function(){
        for(var i = 0;i<3;i++){
            var card = Tools.getInstance().CreateACard({zOrder:0,rotation:0,visible:true});
            this.addChild(card);
            card.scale(1,1);
            card.name = "leftPlayerCard"+i;
        }
        for(var i = 0;i<3;i++){
            var card = Tools.getInstance().CreateACard({zOrder:0,rotation:0,visible:true});
            this.addChild(card);
            card.scale(1,1);
            card.name = "rightPlayerCard"+i;
        }
    }
    this.removeCards = function(){
        var cards = [];
        for(var i=0;i<this.numChildren;i++){
            var child = this.getChildAt(i);
            if(child && child instanceof Card){
                cards.push(child);
            }
        }
        for(var i in cards){
            cards[i].reset();
            cards[i].removeSelf();
        }
        cards = [];
    }
}