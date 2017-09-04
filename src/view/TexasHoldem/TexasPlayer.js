
/**
 * 德州玩家
 */
/**
 * 德州玩家游戏状态枚举
 */
var TH_PLAYER_STATE = 
{
    Waiting : 'eWaiting',
    Watching :'eWatching',
    Playing : 'ePlaying',
    Abandon : 'eAbandon',
}
/**
 * 德州玩家行动状态枚举
 */
var TH_ACTION_STATE = 
{
    SiKao : "eSiKao",
    XiaZhu : 'eXiaZhu',
    JiaZhu : 'eJiaZhu',
    GenZhu : 'eGenZhu',
    GuoPai : 'eGuoPai',
    AllIn : 'eAllIn',
}
var TexasPlayer = (function (_super) {
    Laya.class(TexasPlayer, "TexasPlayer", _super);
    //该类继承自两个类：TexasPlayerUI和BasePlayer
    function TexasPlayer() {
        TexasPlayer.super(this);
        BasePlayer.call(this);
        for(var i in BasePlayer.prototype){
            TexasPlayer.prototype[i] = BasePlayer.prototype[i];
        }


        this.localPlayerScale = 0.6;//本地卡牌缩放比例
        this.otherPlayerScale = 0.2;//其他玩家卡牌缩放比例
        this.lpCardSpacing = 100;//本地玩家卡牌间距
        this.opCardSpacing = 15;//其他玩家卡牌间距
        this.cardDir = 'LEFT';
        this.cardForm = null;
        this.turnMoneyInTable = 0;

        this.init = function( data,isLocalPlayer,isDemo ){
            this.disabled = false;
            this.setPos(data.userPos);
            this.isLocalPlayer = isLocalPlayer;
            var aState = (data.allinTimes > 0) ? TH_ACTION_STATE.AllIn : data.actionState;
            this.setActionState(aState);
            this.setPlayerState( data.state );
            this.setPlayerMoney(data.money);
            this.setTurnMoneyInTable( data.hasOwnProperty('turnMoneyInTable') ? data.turnMoneyInTable : 0 );
            
            this.setPlayerName(data.name);
            this.countdown.setDirection(this.cardDir == "RIGHT" ? 1 : 0 );
            if(this._boxDisconnect && this._boxDisconnect.getChildByName('clock')){
                this._boxDisconnect.getChildByName('clock').setDirection(this.cardDir == "RIGHT" ? 1 : 0);
            }
            this.showAllIn(data.allinTimes);
            this.setVip(data.vip || 1);
            this.setIcon(data.headP);
            this.setDemo(isDemo);
            
            //进入房间的时候 作为观众 直接显示其他玩家的牌
            if( data.hasOwnProperty( 'cards' ) )
            {
                for( var i = 0;i < data.cards.length;i++ )
                {
                    this.addCard( data.cards[i],0,0,false,null,false );
                }
            }
            if( data.hasOwnProperty( 'gameMoneyInTable' ) && data.gameMoneyInTable > 0 )
            {
                this.addjetion( data.gameMoneyInTable,false,false);
            }
            //不是本地玩家  加载正常等待UI
            if( !isLocalPlayer )
            {
                var t_money = this.getChildByName('money');
                if(t_money) t_money.visible = false;//16/11/18 需求修改为非本地玩家不显示余额
            }
            this.initPlayerBg(1);
            var isAction = data.hasOwnProperty('isAction') ? data.isAction : false;
            if( isAction && data.hasOwnProperty('actionTime') )
            {
                this.setCountdown( data.actionTime );
                this.setActionState(GameData.getInstance().shActionState.SiKao);
            }
            
            if( data.hasOwnProperty('gameMoneyInTable') )
            {
                this.setGameMoneyInTable( data.gameMoneyInTable );
            }
            
            if( !this.isLocalPlayer && data.hasOwnProperty('discTime') && data.discTime > 0 ) //大于0代表断线中，剩余的断线等待时间，毫秒
            {
                if(data.discTime > GameData.getInstance().discTime) GameData.getInstance().discTime = data.discTime;
                this.showDisconnect( data.discTime );
            }
            if(isLocalPlayer){
                this.toShowMoney();
            }
        }

        this.initData = function(){
            BasePlayer.prototype.initData.call(this);
            this.countdown = this.getChildByName( 'countdown' );
            this.countdown.visible  = false;  
            this.boxCardHand = this.getChildByName("boxCardHand");    
            
            this.Speak = this.getChildByName( 'Speak' );

            this.boxCards = this.getChildByName("boxCards");
            
            
            this.boxMoneyInTable = this.getChildByName( 'boxMoneyInTable' );
            this.boxMoneyInTable.visible = false;
            this.boxJettons = this.boxMoneyInTable.getChildByName("boxJettons");
            
            this._bg = this.getChildByName( 'imgBg' );

            this._boxAllIn = this.getChildByName('allIn');
            
            Game.getInstance().addUpdate( {callback:this.update,caller:this} );
            
            this.registerListener(); 
            this.showAllIn(0); 
            this.initPlayerBg(0.5);
            this.initCardHands();
        }

        this.update = function(){

        }
        //显示all in
        this.showAllIn = function(allinTimes){
            if(!this._boxAllIn) return;
            allinTimes = parseInt(allinTimes);
            allinTimes = (isNaN(allinTimes)) ? 0 : allinTimes;
            this.allinTimes = allinTimes;
            this._boxAllIn.visible = this.allinTimes > 0;
        }
        this.initPlayerBg = function(alpha){
            this._bg.alpha = alpha;
        }
        this.initCardHands = function(){
            this.arrCardHands = [];
            for(var i = 0;i < 2;i++){
                var c = this.createObj( 'card' );
                c.zOrder = i;
                this.boxCardHand.addChild( c ); 
                c.pos(40 + i * 60,0);
                c.setImage( "card/card_back.png" );
                c.cardEndScale = 0.55;
                c.scaleX = c.scaleY = 0.55;                
                this.arrCardHands.push(c);
            }
            this.boxCardHand.visible = false;
        }
        //重置数据
        this.reset = function( _isRemove ) {
            if( this.getPos() === -1 )
                return;
            this.correctMoney();
            this.disabled = false;       
            this.clear();
            
            if( _isRemove ){
                this.initIcon();                
                this.setPlayerName( '' );
                this.setPlayerMoney(-1);
                this.setPlayerState('');
                this.initVIP();
                this.initFCP();
                this.initPlayerBg(0.5);
                //this.Speak.visible = false;
                this.setPos(-1);
                this.hideDisconnect(); 
                TaskDelayManager.getInstance().clearTarget(this);
                if(this.isLocalPlayer){
                    Tween.clearAll(this._labelMoney);
                    Tween.clearAll(this._lblName);
                    Laya.timer.clear(this,this.toShowMoney);
                    Laya.timer.clear(this,this.toShowId);
                    this._labelMoney.scaleY = 0;
                    this._lblName.scaleY = 1;
                }     
            }else
            {
                this.setPlayerState('eWatching');
            }
        }
        //玩家重置
        this.clear = function(){
            if( this.getPos() === -1 )
                return;
            for( var i = 0;i < this.cards.length;i++ ){
                this.boxCards.removeChild( this.cards[i] );
                Tween.clearAll( this.cards[i] );
                this.cards[i].reset();
                laya.utils.Pool.recover('card',this.cards[i]);
                this.cards[i] = null;
            }
            this.boxCards.visible = true;
            this.cards = [];            
            if( this.cardForm != null) {
                this.cardForm.removeSelf();
                laya.utils.Pool.recover('cardForm',this.cardForm);       
                this.cardForm = null;   
            }
            this.boxCardHand.visible = false;
            
            this.boxMoneyInTable.visible = false;
            this.showAllIn(0);
            this.setFirstCardPlayer(false);
            this.hideCountdown();               
        }
        /**
         * 倒计时消失
         */
        this.hideCountdown = function(){
            if( !this.countdown || !this.countdown.visible )
                return;
            this.countdown.stop();
        }
        //倒计时结束
        this.countdownFinish = function(){
            this.countdown.visible = false; 
        }
        this.SetCardDir = function(dir){
            this.cardDir = dir;
            this.updateViewPos();
        }
        this.updateViewPos = function(){
            this.updateBoxCardsPos();
            this.updateBoxJettonsPos();
            this.updateBoxSpeakPos();
            this.updateBoxDPos();
            this.updateBoxAllInPos();
        }
        this.updateBoxCardsPos = function(){
            var cscale = this.isLocalPlayer ? this.localPlayerScale : this.otherPlayerScale;
            //设计尺寸 this.width = 132 this.height = 200,卡牌相对位置如下
            if( this.cardDir == 'CENTER' ){
                this.boxCards.width = 200;
                this.boxCards.pos(2.16 * this.width,0.5 * this.height);
            }else if( this.cardDir == 'RIGHT' ){
                this.boxCards.width = 50;
                this.boxCards.pos(1.06 * this.width,0.82 * this.height);
            }else{                
                this.boxCards.width = 50;
                this.boxCards.pos(0.23 * this.width,0.82 * this.height);
            }
        }
        this.updateBoxJettonsPos = function(){
        }
        this.updateBoxSpeakPos = function(){
             //设计尺寸 this.width = 132 this.height = 200,喊话框相对位置如下
            if( this.cardDir == 'RIGHT' ){
                this.Speak.getChildByName("imgBg").scaleX = -1;
                this.Speak.getChildByName("talkTxt").pos(-1.44 * this.width,0.14 * this.height);
                this.Speak.pos(0.197 * this.width,0.26 * this.height);
            }else{
                this.Speak.getChildByName("imgBg").scaleX = 1;
                this.Speak.getChildByName("talkTxt").pos(0.197 * this.width,0.14 * this.height);
                this.Speak.pos(1.59 * this.width,0.26 * this.height);
            }
        }
        this.updateBoxDPos = function(){
             //设计尺寸 this.width = 132 this.height = 200,庄家D相对位置如下
            if( this.cardDir == 'LEFT' ){                
                this._imgD.pos(130,150);
            }else{
                this._imgD.pos(-31,150);
            }
        }
        this.updateBoxAllInPos = function(){
             //设计尺寸 this.width = 132 this.height = 200
            if( this.cardDir == 'LEFT' ){
                this._boxAllIn.pos(152,36);
            }else{ 
                this._boxAllIn.pos(-21,36);
            }
        }

        /**
         * 添加一个筹码
         */
        this.addjetion = function( value ,isFly,playSound)
        {
            var am = Tools.getInstance().ChangeUIShow(value);
            var jettonList = Jetton.GetJettonNum(am);
            jettonList.reverse();//反转以确保大额筹码放在上边
            var jettonsNum = 0;
            for( var index = 0; index < jettonList.length;index++ )
            {
                var numTemp = parseInt( jettonList[index].value );
                jettonsNum += numTemp;
                for( var j = 0; j < numTemp;j++ )
                {
                    var t_node = this.createObj('jetton');
                    this.boxJettons.addChild( t_node );
                    
                    t_node.moveDuration = 400;
                    var gHead = this._imgIcon.localToGlobal(new Point(this._imgIcon.width/2,this._imgIcon.height/2));
                    var lHead = this.boxJettons.globalToLocal(gHead);
                    t_node.pos(lHead.x,lHead.y );
                    t_node.isFly = isFly;
                    var prY = -this.boxJettons.numChildren;
                    t_node.cardMoveEndPos = new Point( 0,prY);
                    t_node.setImage( "jetton/jetton_"+jettonList[index].key+".png",false );
                    this.removeExJettons();
                    this.jetions.push( t_node );
                    t_node.scale(0.5,0.5);
                    if(isFly)
                    {
                        var delay = - prY * 10;
                        t_node.AddJetionMove(0.5, delay);
                    }else
                    {
                        t_node.pos( t_node.cardMoveEndPos.x,t_node.cardMoveEndPos.y );
                    }

                }
            }
            playSound = playSound == undefined ? true : playSound;
            if(playSound){//播放声音
                if(jettonsNum > 4){
                    SoundManager.playSound('audio/chipfly.mp3');
                }
                else{
                    SoundManager.playSound('audio/chip.mp3');
                }
            }
            jettonList = null;
        }
         /**
         * 添加一张牌
         */
        this.addCard = function( data,delayTime,moveDuration,lastCard,callBackObj,isFly )
        {
            if(this.getPos() == -1) return;
            var card = data;
            var cardType = card.suit || '';
            var cardNum = card.num || 0;
            var cardName = 'back';
            
            cardType !=='' && cardNum !=0 && (cardName = cardType.toLowerCase() +'s_'+ cardNum);
            var t_node = this.createObj( 'card' );
            t_node.zOrder = data.cardPos;
            t_node.setNum(cardNum);
            t_node.setType(cardType);
            t_node.setPos(card.cardPos);
            this.boxCards.visible = true;
            this.boxCards.addChild( t_node ); 
            t_node.setImage( "card/card_"+cardName+".png" );
            var cspace = this.isLocalPlayer ? this.lpCardSpacing : this.opCardSpacing;
            var cscale = this.isLocalPlayer ? this.localPlayerScale : this.otherPlayerScale;
            this.updateBoxCardsPos();
            t_node.cardMoveEndPos = new Point(this.cards.length * cspace,0);
            t_node.cardEndScale = cscale;
            
            t_node.delayTime = delayTime;
            t_node.moveDuration = moveDuration;
            t_node.lastCard = lastCard;
            t_node.callBackObj = callBackObj;
            t_node.isFly = isFly;
            var pos = this.boxCards.globalToLocal( new Point(Laya.stage.width >> 1,Laya.stage.height >> 1) );            
            t_node.pos( pos.x,pos.y ); 
            
            t_node.cardNum = cardNum == 1 ? 999 : cardNum;
            this.cards.push( t_node );        
            
            t_node.handout();
        }

        /**
         * 弃牌
         */
        this.dropCard = function( bLocal ){
            this.disabled = true;
        }
         /**
         * 玩家开始行动
         */
        this.action = function(){
            this.setActionState(TH_ACTION_STATE.SiKao);
        }
        
        //下注CD 显示
        this.setCountdown = function( time )
        {
            if(this.isDisconnect()) return;
            this.countdown.visible = true;
            var tTotal = THRoomMgr.getInstance().GetCurRoom().GetRoomActionTime();
            var clockParam = 
            {
                timeAction : time,
                timeTotal : tTotal,
                callback : this.countdownFinish,
                targetObj : this,
                playAudio : [8,4],
                playTick : true,
            }
            this.countdown.startTimer(clockParam);
        }
        
        /**
         * 显示说话
         */
        this.showTalk = function( content )
        {
            this.Speak.visible = true;
            this.Speak.scale(0,0);
            this.Speak.getChildByName('talkTxt').text = content;
            
            Tween.to( this.Speak,{ scaleX : 1,scaleY : 1 },500,Ease['elasticOut']);
            
            var task = new TaskDelay();
            task.data = null;
            task.callBack = this.hideTalk;
            task.classObj = this;
            task.leftTime = 2000;
            task.forceExecute = true;
            TaskDelayManager.getInstance().addTask( task );       
        }
         /**
         * 隐藏说话泡泡
         */
        this.hideTalk = function(){
            this.Speak.visible = false;
        }
        //显示all in
        this.showAllIn = function(allinTimes){
            if(!this._boxAllIn) return;
            allinTimes = parseInt(allinTimes);
            allinTimes = (isNaN(allinTimes)) ? 0 : allinTimes;
            this.allinTimes = allinTimes;
            this._boxAllIn.visible = this.allinTimes > 0;
            var txtAllIn = this._boxAllIn.getChildByName("txtAllIn");
            txtAllIn.text = "x" + this.allinTimes;
            txtAllIn.visible = false;//all in 不再允许多次
        }
        //显示allIn效果
        this.showAllInEffect = function(){
            if( this.allInEffect == null )
            {
                this.allInEffect = new laya.ui.Image();
                this.allInEffect.dataSource = {skin:'showhandRoom/allInHand.png'};                
            }
            this.allInEffect.x = this.globalToLocal( new Point((Laya.stage.width - this.allInEffect.width) >> 1,0) ).x; 
            this.addChild( this.allInEffect );
            this.allInEffect.zOrder = 100;
            this.allInEffect.y = 100;;
            this.allInEffect.alpha = 1;
            Tween.clearAll( this.allInEffect );
            Tween.to( this.allInEffect,{y:-350},600,Ease['circIn'] );
            Tween.to( this.allInEffect,{alpha:0},800,null,Handler.create(this,this.reAllInEff = function(){ this.allInEffect.removeSelf(); }),1000 );

            SoundManager.playSound('audio/chipfly.mp3');
        }
        this.getAllInTimes = function(){
            return this.allinTimes;
        }
        this.setTurnMoneyInTable = function( _value ){
            this.turnMoneyInTable = _value;
        }
        this.getTurnMoneyInTable = function(){
            return this.turnMoneyInTable;
        }
        //设置玩家本轮下注的总和
        this.setGameMoneyInTable = function( money )
        {
            if( this.getPos() === -1 )
                return;
            this.boxMoneyInTable.visible = true;
            var moneyInTable = this.boxMoneyInTable.getChildByName('txtPayMoney');
            if( moneyInTable ){
                moneyInTable.text = Tools.getInstance().ChangeUIShow(money); 
            }
        }
        /**
         * 显示结果
         */
        this.showCardForm = function(data)
        {
            if(!data.hasOwnProperty('cardForm')) return;
            if( this.cardForm != null) {
                this.cardForm.removeSelf();
                laya.utils.Pool.recover('cardForm',this.cardForm);
            }
            this.cardForm = this.createObj( 'cardForm' );
            this.cardForm.initSkin( 'showhandRoom/cardForm/'+data.cardForm.toLowerCase()+'.png' );            

            if( this.isLocalPlayer ){
                this.addChild( this.cardForm );
                this.cardForm.x = 234;
                this.cardForm.y = 162;
                this.cardForm.scale(0.8,0.8);
            }
            else{
                this.boxCardHand.addChild( this.cardForm );
                this.cardForm.x = 58;
                this.cardForm.y = 92;
                this.cardForm.scale(0.6,0.6);                
            }
            this.lightCards(data);
            SoundTool.getInstance().SpeakSHSounds(data.cardForm);
        }
        /**
         * 显示底牌 
         * */    
        this.showMyCards = function( cards ){
            if( this.cards.length === 0 ) return;
            if(!this.isLocalPlayer){
                for(var i in this.arrCardHands){
                    var cardName = "card/card_" + cards[i].suit.toLowerCase() + 's_'+ cards[i].num+".png";
                    this.arrCardHands[i].setNum(cards[i].num);
                    this.arrCardHands[i].setType(cards[i].suit);
                    this.arrCardHands[i].setImage(cardName);
                }
                this.boxCardHand.visible = true;
                this.boxCards.visible = false;
            }
            
        }
        //上缴筹码动画
        this.handInJettions = function(p){
            if(this.jetions.length == 0) return;
            for(var i in this.jetions){
                var j = this.jetions.length - i - 1;
                var g = this.jetions[j].globalToLocal(p,true);
                Tween.to(this.jetions[j],{x:g.x/2,y:g.y/2 + this.jetions[j].y},800,null,new Handler(this,function(){
                    if(j === 0) this.onHandedInJetions();
                }),i*5);
            }
        }
        this.onHandedInJetions = function(){
            for(var i in this.jetions){
                this.jetions[i].visible = false;
            }
        }
        this.toShowId = function(){
            Tween.to(this._lblName,{scaleY:0},200,null,new Handler(this,function(){
                Tween.to(this._labelMoney,{scaleY:1},200);
            }));
            Laya.timer.once(5000, this, this.toShowMoney);
        }
        this.toShowMoney = function(){
             Tween.to(this._labelMoney,{scaleY:0},200,null,new Handler(this,function(){
                Tween.to(this._lblName,{scaleY:1},200);
            }));
            Laya.timer.once(5000, this, this.toShowId);
        }
        //高亮玩家的牌
        this.lightCards = function(data){
            for(var i in data.cards){
                var card = data.cards[i];
                if(card.cardPos < 0) continue;//暗牌不做显示
                var bFind = false;
                for(var j in this.arrCardHands){
                    var num = this.arrCardHands[j].getNum();
                    var type = this.arrCardHands[j].getType();
                    if(num == card.num && type == card.suit){
                        this.arrCardHands[j].showLight();
                        bFind = true; break;
                    }
                }
                if(bFind) continue;
                for(var k in data.communityCards){
                    var num = data.communityCards[k].getNum();
                    var type = data.communityCards[k].getType();
                    if(num == card.num && type == card.suit){
                        data.communityCards[k].showLight();
                        bFind = true; break;
                    }
                }
            }
        }
    } 
    return TexasPlayer;
})(TexasPlayerUI);
