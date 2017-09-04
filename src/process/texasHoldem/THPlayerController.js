/**
 * kaixin 2017 06 05
 * 德州玩家控制类
 * */
var THPlayerController = (function (_super) {
    //横屏模式下玩家坐标
    var PLAYER_POS_H = [new Point(810,645),new Point(1220,645),new Point(1530,550),new Point(1530,270),
        new Point(1026,120),new Point(556,120),new Point(105,270),new Point(105,550),new Point(400,645),];
    //竖屏模式下玩家坐标
    var PLAYER_POS_V = [new Point(360,1400),new Point(820,940),new Point(820,640),new Point(820,340),
        new Point(610,120),new Point(260,120),new Point(80,340),new Point(80,640),new Point(80,940),];

    Laya.class(THPlayerController,"THPlayerController",_super);
    function THPlayerController(maxPlayerNum){
        THPlayerController.__super.call(this,maxPlayerNum);
        this.arrCommunityCards = []; //公共牌
        for(var i = 0;i < this.MAXPLAYERNUM;i++)
        {
            var player  = new TexasPlayer();
            player.initData();
            this.Players.push( player );
            if(i === 0){
                player.SetCardDir("CENTER");
            }
            else if(i < 5){
                player.SetCardDir("RIGHT");
            }
            else{
                player.SetCardDir("LEFT");
            }
        }        
    }
    var __proto = THPlayerController.prototype;
    __proto.SetPlayersPosH = function(){
         for(var i = 0;i < this.Players.length;i++){
             this.Players[i].pos(PLAYER_POS_H[i].x,PLAYER_POS_H[i].y);
             this.Players[i].updateViewPos();
        }
    }
    __proto.SetPlayersPosV = function(){
         for(var i = 0;i < this.Players.length;i++){
             this.Players[i].pos(PLAYER_POS_V[i].x,PLAYER_POS_V[i].y); 
             this.Players[i].updateViewPos();
        }
    }
    __proto.SetUserData = function(data){
        this.playersInitData = data.users;
        var users = data.users;
        //找到自己所在位置
        for( var j = 0; j < users.length;j++ ){
            var play = users[ j ];
            if( play.self == 1 )
            {
                this.localPlayer = play;
                break;
            }
        }
        if( this.localPlayer === null )
            return;
        var bDemo = data.roomSummery && (data.roomSummery.type == ROOM_TYPE_DIAMONDS.DEMOROOM.key);
        this.Players[0].init(this.localPlayer,true,bDemo);
        
        for( var i = 0; i < users.length;i++ )
        {
            var player = users[ i ];
            if(player.isAction == 1){
                this.SetCurActionPos( player.userPos );
            }
            if( this.localPlayer.userPos != player.userPos ){
                var pos = this.getPlayerPos( player.userPos );
                if(this.Players[pos]){
                    this.Players[pos].init(player,false,bDemo);
                }                
            }
        }
    }
    //清除玩家的牌
    __proto.clearCards = function() {
        CLog.log("清除玩家卡牌---------");
        for( var i = 0; i < this.Players.length;i++ ){
            this.Players[i].clear( false );
            this.Players[i].clearJetion();
        }
        this._cardsInfo = null;
        this.clearCommunityCards();
    }
    __proto.setCardsInfo = function(data){
        if( !data.hasOwnProperty('usersAndCards') ) return;
        this._cardsInfo = data.usersAndCards;
    }
    //发牌处理
    __proto.dealCards = function(){
        var data = this._cardsInfo;
        if( data == null ) return;
        var cardIndex = -1;
        var cardCount = 0;
        var cardTotalNum = data.length * data[0].cards.length;
        var delayTime = 200;//发牌时间
        var moveDuration = delayTime;
        data = this.resortCards(data);
        for( var i = 0;i < cardTotalNum;i++ ){
            if( i % data.length === 0 )
                cardIndex++;
            var userData = data[ i % data.length ]; 
            var pos = userData.userPos;
            var bLastCard = (i + 1 === cardTotalNum);
            var player = this.Players[ this.getPlayerPos( pos ) ];
            //当发牌时该玩家已经不再游戏中时 不再发牌
            if(player && (player.getPlayerState() != '')){
                player.addCard( userData.cards[ cardIndex ],delayTime * cardCount,moveDuration ,
                    bLastCard,{callBack:this.dealCardCallBack,targetObj:this},true);
            }            
            cardCount++;
        }
    }
     /**
     * 发牌完成后回调
     */
    __proto.dealCardCallBack = function(){
        if(StatePool.hasState(GameData.getInstance().showhandRoomState.eGotoResult)){
            StatePool.stateProcess(GameData.getInstance().showhandRoomState.eGotoResult);
        }
        else{
            StatePool.stateProcess(GameData.getInstance().showhandRoomState.ePutCard);
        }
        this._cardsInfo = null;    
    }
    /**
     * 弃牌处理
     */
    __proto.dropCard = function( userPos ){
        if(-1 == this.getPlayerPos( userPos )) return;
        this.Players[ this.getPlayerPos( userPos ) ].dropCard( this.isLocalPlayer( userPos ) );
    }
    //按照第一个发牌玩家重新对牌组排序
    __proto.resortCards = function(usersAnddCards){
        if(!usersAnddCards) return [];
        var length = usersAnddCards.length;
        var p = this.buttonPos;
        var s = [];
        var index = 0;
        for(var i in usersAnddCards){
            if(usersAnddCards[i].userPos == p){
                index = parseInt(i);
                break;
            }            
        }
        for(var i=0;i<length;i++){
            s[i] = usersAnddCards[(parseInt(i) + index) % length];
        }
        return s;
    }
     /**
     * 添加底注
     * 
     */
    __proto.addBasalCisternJetion = function( value ){
        //开始下注 播放筹码动画
        for( var i = 0; i < this.Players.length;i++ ){
            if( this.Players[i].getPlayerState() !== TH_PLAYER_STATE.Playing )
                continue; 
            //当人数过多时播放声音会刺耳，这里限制一下，当i<2时播放声音
            this.JetionPro( value,this.Players[i].getPos(),i<2 );
            this.Players[i].setGameMoneyInTable( value );
        }
    }
    __proto.JetionPro = function( value ,userPos,playSound){
        this.Players[ this.getPlayerPos(userPos) ].addjetion( value,true,playSound );
    }
    /**
     * 显示说话泡泡
     */
    __proto.showTalk = function( userPos ,content)
    {
        if(!this.localPlayer) return;
        if( userPos === -1 )
        {
            this.Players[ this.getPlayerPos( this.localPlayer.userPos ) ].showTalk( content );
        }else 
        {
            this.Players[ this.getPlayerPos( userPos ) ].showTalk( content );
        }
    }
    //显示all in
    __proto.showAllIn = function( userPos , allinTimes){
        if(!this.localPlayer) return;
        if( userPos === -1 )
        {
            this.Players[ this.getPlayerPos( this.localPlayer.userPos ) ].showAllIn( allinTimes );
        }else 
        {
            this.Players[ this.getPlayerPos( userPos ) ].showAllIn( allinTimes );
        }
    }

    //显示allIn效果
    __proto.showAllInEffect = function( userPos )
    {
        if( this.isLocalPlayer( userPos ) )
        {
            this.Players[ this.getPlayerPos( userPos ) ].showAllInEffect();
        }
    }
    /**
     * 某个玩家开始下注
     */
    __proto.onInOnesturn = function(data){
        if(!this.localPlayer) return;
        this.Players[ this.getPlayerPos( data.userPos ) ].setCountdown( data.actionTime );
        this.Players[ this.getPlayerPos( data.userPos ) ].action();
        this.SetCurActionPos(data.userPos);
    }
    /**
     * 获得本地玩家本回合下注数量
     */
    __proto.getLocalPlayerTurnMoneyInTable = function(){
        if(!this.localPlayer) return 0;
        return this.Players[ this.getPlayerPos( this.localPlayer.userPos ) ].getTurnMoneyInTable();
    }
     /**
     * 玩家下注完毕
     */
    __proto.playerActionOver = function( data ){
        var userPos = this.getPlayerPos( data.userPos );
        if(-1 == userPos) return;   
        if( this.Players[ userPos ].getPos() === -1 )
        {
            return;
        }
        this.Players[ userPos ].hideCountdown();
        this.Players[ userPos ].setPlayerState( data.state );
        var aState = (data.allinTime > 0) ? GameData.getInstance().shActionState.AllIn : data.actionState;
        this.Players[ userPos ].setActionState(aState);
        this.Players[ userPos ].setPlayerMoney( data.money );
        this.Players[ userPos ].setTurnMoneyInTable( data.turnMoneyInTable );
        
    }
     /**
     * 设置玩家本轮下注总数
     */
    __proto.setPlayerGameMoneyInTable = function( userPos,money ){
        var p = this.getPlayerPos( userPos );
        if(-1 === p) return;
        this.Players[ p ].setGameMoneyInTable( money );
    }
     /**
     * 一轮游戏结束
     */
    __proto.onGameOver = function(data){
        this.delayTime = 1000;
        //隐藏计时器
        for( var i = 0; i < this.Players.length;i++ ){
            this.Players[i].hideCountdown();
        }
        //显示底牌
        this.showBottomCard( data );
        this.SetCurActionPos(-1);
    }
     /**
     * 亮底牌
     */
    __proto.showBottomCard = function( data ){
        if( data.hasOwnProperty('winners') ){
            for( var i = 0;i < data.winners.length;i++ ){
                var t_data = data.winners[i];
                //弃牌了 逃跑了 没有牌型
                if( t_data.abandon === 1 
                    ||  t_data.escape === 1 
                    || !t_data.hasOwnProperty('cardForm'))
                    {
                        continue;
                    }
                var player = this.getPlayerByPos(t_data.userPos);                 
                if( player && (player.cards.length != 0) && t_data.hasOwnProperty('cards') ){                    
                    var task = new TaskDelay();
                    task.data = t_data.holeCards;
                    task.callBack = player.showMyCards;
                    task.classObj = player;
                    task.leftTime = this.delayTime;
                    TaskDelayManager.getInstance().addTask( task );

                    if(t_data.cardForm){
                        t_data.communityCards = this.arrCommunityCards;                  
                        task = new TaskDelay();
                        task.data = t_data;
                        task.callBack = player.showCardForm;
                        task.classObj = player;
                        task.leftTime = this.delayTime;
                        TaskDelayManager.getInstance().addTask( task );
                    }

                    this.delayTime += 1000;
                }

            }
        
        }    
    }
    //收集筹码
    __proto.collectJettions = function(pGlobal){
        for( var i = 0; i < this.Players.length;i++ ){
            this.Players[i].handInJettions(pGlobal);
        }
        SoundManager.playSound('audio/chipfly.mp3');
    }
    //发公共牌
    __proto.dealCommunityCards = function(data,parent){
        var cardIndex = -1;
        var cardCount = 0;
        var cardTotalNum = data.length * data[0].cards.length;
        var moveDuration = 200;//发牌时间
        for( var i = 0;i < cardTotalNum;i++ ){
            if( i % data.length === 0 )
                cardIndex++;
            var userData = data[ i % data.length ];
            var card = userData.cards[cardIndex];
            var cardType = card.suit || '';
            var cardNum = card.num || 0;
            var cardName = 'back';
            
            cardType !=='' && cardNum !=0 && (cardName = cardType.toLowerCase() +'s_'+ cardNum);
            var t_node = Tools.getInstance().CreateACard({zOrder:0,rotation:0,visible:true});
            t_node.setNum(cardNum);
            t_node.setType(cardType);
            t_node.setPos(card.cardPos);
            parent.addChild( t_node );
            parent.setChildIndex(t_node,0);
            t_node.setImage( "card/card_"+cardName+".png" );
            t_node.cardMoveEndPos = new Point(parent.numChildren * 100,0);
            t_node.cardEndScale = 0.6;
            
            t_node.delayTime = moveDuration * cardCount;
            t_node.moveDuration = moveDuration;
            t_node.lastCard = (i + 1 === cardTotalNum);
            t_node.callBackObj = {callBack:this.onDealCommunityCardCallBack,targetObj:this};
            t_node.isFly = true;
            var pos = parent.globalToLocal( new Point(Laya.stage.width >> 1,Laya.stage.height >> 1) );           
            t_node.pos( pos.x,pos.y ); 
            this.arrCommunityCards.push( t_node );        
            
            t_node.handout();        
            cardCount++;
        }
    }
    __proto.clearCommunityCards = function(){
        for(var i in this.arrCommunityCards){
            this.arrCommunityCards[i].reset();
            this.arrCommunityCards[i].removeSelf();            
            laya.utils.Pool.recover('card',this.arrCommunityCards[i]);       
            this.arrCommunityCards[i] = null;   
        }
        this.arrCommunityCards = []; 
    }
    /**
     * 发公共牌完成后回调
     */
    __proto.onDealCommunityCardCallBack = function(){
        if(StatePool.hasState(GameData.getInstance().showhandRoomState.eGotoResult)){
            StatePool.stateProcess(GameData.getInstance().showhandRoomState.eGotoResult);
        }
        else{
            StatePool.stateProcess(GameData.getInstance().showhandRoomState.ePutCard);
        }           
    }
    return THPlayerController;
})(BasePlayerController);