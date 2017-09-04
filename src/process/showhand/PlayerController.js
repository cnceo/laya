/**
 * huangandfly 2016 07 05
 * 玩家控制类
 * */
var PlayerController = (function (_super) {
    Laya.class(PlayerController,"PlayerController",_super);
    function PlayerController(maxPlayerNum)
    {
        PlayerController.__super.call(this,maxPlayerNum);
    
        // this.currentScene = Game.getInstance().currentScene;
        // for(var i = 0;i < this.MAXPLAYERNUM;i++)
        // {
        //     var Players = this.currentScene.getChildByName('players')
        //     var player  = Players.getChildByName('player' + i);
        //     player.initData();
        //     this.Players.push( player );
        // }
        
        // this.Players[0].cardDir = 'CENTER';
        // this.Players[1].cardDir = 'RIGHT';
        // this.Players[2].cardDir = 'RIGHT';
    }
    var __proto = PlayerController.prototype;
    __proto.setCardsInfo = function(data){
        if( !data.hasOwnProperty('usersAndCards') ) return;
        this._cardsInfo = data.usersAndCards;
    }
    /**
     * 弃牌处理
     */
    __proto.dropCard = function( userPos )
    {
        var p = this.getPlayerPos( userPos );
        if(p == -1) return;
        this.Players[ p ].dropCard( this.isLocalPlayer( userPos ) );
        if( this.isLocalPlayer( userPos ) )
        {
            this.hideCheckCardPanel();
        }
    }

    //发牌处理
    __proto.dealCards = function( )
    {
        var data = this._cardsInfo;
        if( data == null ) return;
        var cardIndex = -1;
        var cardCount = 0;
        var cardTotalNum = data.length * data[0].cards.length;
        var delayTime = 200;//发牌时间
        var moveDuration = delayTime;
        data = this.resortCards(data);
        for( var i = 0;i < cardTotalNum;i++ )
        {
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
    //按照第一个发牌玩家重新对牌组排序
    __proto.resortCards = function(usersAnddCards){
        if(!usersAnddCards) return [];
        var length = usersAnddCards.length;
        var p = this.buttonPos;
        var s = [];
        var index = 0;
        for(var i in usersAnddCards){
            if(usersAnddCards[i].userPos == p)
            {
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
     * 玩家下注完毕
     */
    __proto.playerActionOver = function( data )
    {
        var userPos = this.getPlayerPos( data.userPos ); 
        if(userPos == -1) return;
        if( this.Players[ userPos ].getPos() === -1 )
        {
            return;
        }
        this.Players[ userPos ].hideCountdown();
        this.Players[ userPos ].setPlayerState( data.state );
        var aState = (data.allinTime > 0) ? GameData.getInstance().shActionState.AllIn : data.actionState;
        this.Players[ userPos ].setActionState(aState);
        this.Players[ userPos ].setPlayerMoney( data.money );
        this.Players[ userPos ].actionOver();
        this.Players[ userPos ].setTurnMoneyInTable( data.turnMoneyInTable );
        
    }
        
    /**
     * 某个玩家开始下注
     */
    __proto.onInOnesturn = function(data)
    {
        var p = this.getPlayerPos( data.userPos );
        if(-1 == p) return;
        this.Players[ p ].setCountdown( data.actionTime );
        this.Players[ p ].action();
    }
        
    /**
     * 一轮游戏结束
     */
    __proto.onGameOver = function(data) 
    {
        this.delayTime = 1000;
        //隐藏计时器
        this.hideCountdown();
        //显示底牌
        this.showBottomCard( data );
        //显示输赢玩家
        //var winPos = this.showWin( data );
        //回收筹码
        //可能显示了查看底牌界面 一直没关
        this.hideCheckCardPanel();
    }
        
    /**
     * 隐藏查看底牌界面
     */
    __proto.hideCheckCardPanel = function()
    {
        if( this.currentScene == null || this.currentScene == undefined ||
            this.currentScene.checkCardPanel == null || this.currentScene.checkCardPanel == undefined )
            return;
        this.currentScene.checkCardPanel.offAll( Event.CLICK );
        this.currentScene.checkCardPanel.show( false );
        if(!this.localPlayer) return;
        //游戏结束了 关闭底牌监听
        var p = this.getPlayerPos( this.localPlayer.userPos );
        if(-1 == p) return;
        this.Players[ p ].offBackCard();
    }
    
    /**
     * 隐藏计时器
     */
    __proto.hideCountdown = function()
    {
        for( var i = 0; i < this.Players.length;i++ )
        {
            this.Players[i].hideCountdown();
        }
    }
    
    //清除玩家的牌
    __proto.clearCards = function()
    {
        CLog.log("清除玩家卡牌---------");
        for( var i = 0; i < this.Players.length;i++ )
        {
            this.Players[i].clear( false );
            this.Players[i].clearJetion();
        }
        this._cardsInfo = null;
    }
    
    /**
     * 亮底牌
     */
    __proto.showBottomCard = function( data )
    {
        if(!this.localPlayer) return;
        if( data.hasOwnProperty('winners') )
        {
            for( var i = 0;i < data.winners.length;i++ )
            {
                var t_data = data.winners[i];
                //弃牌了 逃跑了 没有牌型
                if( t_data.abandon === 1 || t_data.escape === 1 || !t_data.hasOwnProperty('cardForm') )
                    continue;
                
                if( this.isLocalPlayer( t_data.userPos ) )
                {
                    //本地玩家显示底牌
                    var task = new TaskDelay();
                    task.data = null;
                    task.callBack = this.Players[ this.getPlayerPos( this.localPlayer.userPos ) ].showLocalPlayerBottom;
                    task.classObj = this.Players[ this.getPlayerPos( this.localPlayer.userPos ) ];
                    task.leftTime = this.delayTime;
                    TaskDelayManager.getInstance().addTask( task );
                    
                    //本地玩家显示牌型
                    task = new TaskDelay();
                    task.data = t_data;
                    task.callBack = this.Players[ this.getPlayerPos( this.localPlayer.userPos ) ].showResult;
                    task.classObj = this.Players[ this.getPlayerPos( this.localPlayer.userPos ) ];
                    task.leftTime = this.delayTime;
                    TaskDelayManager.getInstance().addTask( task );
                    this.delayTime += 1000;
                }else if( t_data.hasOwnProperty('cards') )
                {
                    var task = new TaskDelay();
                    task.data = t_data.cards[0];
                    task.callBack = this.Players[ this.getPlayerPos( t_data.userPos ) ].showBottomCard;
                    task.classObj = this.Players[ this.getPlayerPos( t_data.userPos ) ];
                    task.leftTime = this.delayTime;
                    TaskDelayManager.getInstance().addTask( task );
                    
                    if(t_data.cardForm){
                        task = new TaskDelay();
                        task.data = t_data;
                        task.callBack = this.Players[ this.getPlayerPos( t_data.userPos ) ].showResult;
                        task.classObj = this.Players[ this.getPlayerPos( t_data.userPos ) ];
                        task.leftTime = this.delayTime;
                        TaskDelayManager.getInstance().addTask( task );
                        this.delayTime += 1000;
                    }
                }

            }
        
        }    
    }
    
    /**
     * 获得玩家牌型
     */
    __proto.getPlayerCardForms = function( data,userPos )
    {
        if( data.hasOwnProperty('cardForms') )
        {
            for( var i = 0;i < data.cardForms.length;i++ )
            {
                if( data.cardForms[i].userPos == userPos )
                {
                    return data.cardForms[i].cardForm;
                }
            }
        }
        return null;
    }
    
    /**
     * 重置数据
     */
    __proto.resetController = function(){
        _super.prototype.resetController.call(this);
            //隐藏计时器
        this.hideCountdown();            
        //可能显示了查看底牌界面 一直没关
        this.hideCheckCardPanel();
        this._cardsInfo = null;
    }
    
    /**
     * 发牌完成后回调
     */
    __proto.dealCardCallBack = function()
    {
        // var d = new Date();
        //CLog.log('发牌完成后回调.////////////  '+d.toLocaleString()+":"+d.getMilliseconds());
        if(StatePool.hasState(GameData.getInstance().showhandRoomState.eGotoResult)){
            StatePool.stateProcess(GameData.getInstance().showhandRoomState.eGotoResult);
        }
        else{
            StatePool.stateProcess(GameData.getInstance().showhandRoomState.ePutCard);
        }
        this._cardsInfo = null;    
    }
    //获取当前玩家的信息（包括状态、位置、名字、金钱等等）
    __proto.GetCurUsersData = function(){
        var data = {};//
        // for(var i in this.Players){
        //     var temp = this.Players[i];
        //     var pos = temp.getPos();
        //     if(pos == -1) continue;
        //     var player = {};
        //     player.userPos = pos;
        //     player.name = temp.playerName;
        //     player.headp
        // }
        return data;
    }
    //设置玩家的数据 名称 金钱 头像
    __proto.setUserData = function( data )
    {
        this.playersInitData = data.users;
        var users = data.users;
        this.localPlayer = null;
        //找到自己所在位置
        for( var j = 0; j < users.length;j++ )
        {
            var play = users[ j ];
            if( play.self == 1 )
            {
                this.localPlayer = play;
                break;
            }
        }
        //GM视角 选择第一个玩家作为自己
        if( this.localPlayer === null ){
            users[0].self = 1;
            this.localPlayer = users[0];
        }
        var bDemo = data.roomSummery && (data.roomSummery.type == ROOM_TYPE_DIAMONDS.DEMOROOM.key);
        this.Players[0].init(this.localPlayer,true,bDemo);
        
        for( var i = 0; i < users.length;i++ )
        {
            var play = users[ i ];
            if(play.isAction == 1){
                this.SetCurActionPos( play.userPos );
            }
            if( this.localPlayer.userPos != play.userPos ){
                this.addPlayerData(play,bDemo);
            }
        }            
    }
    //添加玩家数据
    __proto.addPlayerData = function( play,bDemo){        
        var pos = this.getPlayerPos( play.userPos );
        if(!this.Players[pos]) return;
        // this.Players[ pos ].init( play,play.name,play.money,play.userPos ,play.state,play.headP,
        // play.hasOwnProperty( 'cards' ) ? play.cards : null,play.hasOwnProperty( 'gameMoneyInTable' ) ? play.gameMoneyInTable : 0 ,false);
        this.Players[pos].init(play,false,bDemo);
    }

    /**
     * 添加筹码
     */
    __proto.addJetion = function( data )
    {        
        this.JetionPro( data.actionMoney,data.userPos );
    }
    
    __proto.JetionPro = function( value ,userPos,playSound)
    {
        this.Players[ this.getPlayerPos(userPos) ].addjetion( value,true,playSound );
    }
    
    
    
    /**
     * 显示说话泡泡
     */
    __proto.showTalk = function( userPos ,content)
    {
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
     * 获得本地玩家本回合下注数量
     */
    __proto.getLocalPlayerTurnMoneyInTable = function()
    {
        return this.Players[ this.getPlayerPos( this.localPlayer.userPos ) ].getTurnMoneyInTable();
    }

    __proto.onTurnBegin = function()
    {
        if(!this.localPlayer) return;
        this.Players[ this.getPlayerPos( this.localPlayer.userPos ) ].setTurnMoneyInTable( 0 );            
        for( var i = 0; i < this.Players.length;i++ )
        {
            if( this.Players[i].getPlayerState() !== GameData.getInstance().playerState.Playing )
                continue; 
            this.Players[i].resetState();
        }
    }
    
    /**
     * 设置玩家本轮下注总数
     */
    __proto.setPlayerGameMoneyInTable = function( userPos,money )
    {
        if(-1 == this.getPlayerPos( userPos )) return;
        this.Players[ this.getPlayerPos( userPos ) ].setGameMoneyInTable( money );
    }
    
    /**
     * 添加底注
     * 
     */
    __proto.addBasalCisternJetion = function( value )
    {
        //开始下注 播放筹码动画
        for( var i = 0; i < this.Players.length;i++ )
        {
            if( this.Players[i].getPlayerState() !== GameData.getInstance().playerState.Playing )
                continue; 
            //当人数过多时播放声音会刺耳，这里限制一下，当i<2时播放声音
            this.JetionPro( value,this.Players[i].getPos(),i<2 );
            this.Players[i].setGameMoneyInTable( value );
            //this.Players[i].setPlayerMoney( this.Players[i].playerMoney - value );
        }
    }
    
    // //添加玩家数据
    // __proto.addPlayerData = function( play )
    // {        
    //     var pos = this.getPlayerPos( play.userPos );
    //     // this.Players[ pos ].init( play,play.name,play.money,play.userPos ,play.state,play.headP,
    //     // play.hasOwnProperty( 'cards' ) ? play.cards : null,play.hasOwnProperty( 'gameMoneyInTable' ) ? play.gameMoneyInTable : 0 ,false);
    //     this.Players[pos].init(play,true);
    // }
    //当移除一个玩家时
    __proto.onRemovePlayer = function(userPos){
        if(this._cardsInfo == null) return;
        var index = -1;
        for(var i in this._cardsInfo){
            if(this._cardsInfo[i].userPos == userPos){
                index = i;
                break;
            }
        }
        if(index != -1){
            this._cardsInfo.splice(index,1);
        }
    }
    //高亮玩家的牌型
    __proto.LightCardForm = function(data){
        if(!this.localPlayer) return;
        var player = this.getPlayerByPos(data.userPos);
        if(!player || !data.hasOwnProperty('cardForm')) return;
        player.LightCards(data.cardForm,data.num,data.suit);
    }
    __proto.SwitchPlayerView = function(playerID){
        _super.prototype.SwitchPlayerView.call(this,playerID);
    }

return PlayerController;
})(BasePlayerController);
