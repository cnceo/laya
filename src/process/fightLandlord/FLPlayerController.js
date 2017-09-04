/**
 * 2017 05 03
 * 斗地主玩家控住类
 */
var FLPlayerController = (function (_super) {
    Laya.class(FLPlayerController,"FLPlayerController",_super);
    function FLPlayerController(maxPlayerNum)
    {
        FLPlayerController.__super.call(this,maxPlayerNum); 

        //判断一个玩家是否在游戏状态
        this.InMyTurn = function(pos)
        {
            if(pos == undefined) pos = this.getLocalPlayer().getPos();
            return pos == this.GetCurActionPos();
        }
    }

    var __proto = FLPlayerController.prototype;

    //获得本地玩家剩余的牌
    __proto.getLocalPlayerCards = function()
    {
        return this.Players[ this.getPlayerPos( this.localPlayer.userPos ) ].getCards();
    }
    /**
     * 获得玩家出牌牌型
     * 自己的uiPos为0 右边为1 左边为2 
     */
    __proto.getOutputType = function( uiPos )
    {
        if( uiPos < 0 || uiPos >= this.Players.length )
            return [];
        return this.Players[ uiPos ].getOutputType();
    }

    /**
     * 获得玩家出牌列表
     * 自己的uiPos为0 右边为1 左边为2 
     */
    __proto.getOutPutCards = function( uiPos )
    {
        if( uiPos < 0 || uiPos >= this.Players.length )
            return [];
        return this.Players[ uiPos ].getOutPutCards();
    }

    /**
     * 检查卡牌的选择
     */
    __proto.checkSelect = function()
    {
        this.Players[ this.getPlayerPos( this.localPlayer.userPos ) ].checkSelect();
    }

    /**
     * 清理卡牌
     */
    __proto.clearCards = function()
    {
        for( var i = 0; i < this.Players.length;i++ )
        {
            this.Players[i].clear();
        }
    }

    /**
     * 添加地主牌
     */
    __proto.addBaseCards = function( data )
    {
        this.Players[ this.getPlayerPos( data.userPos ) ].addBaseCards( data.baseCards ); 
        //this.Players[ 0 ].addBaseCards( data.baseCards ); 
        this.Players[ this.getPlayerPos( this.localPlayer.userPos ) ].showRobot();
        for( var i = 0;i < this.Players.length;i++ ) //隐藏叫地主分数
        {
            this.Players[i].setCLLLev( false );
        }
    }

    /**
     * 出牌行动
     */
    __proto.outPutCardAction = function( data )
    {
        this.Players[ this.getPlayerPos( data.userPos ) ].outPutCardAction( data );
        this.SetCurActionPos( data.userPos );
    }

    //是否是地主
    __proto.isLandlord = function( _userPos )
    {
        return this.Players[ this.getPlayerPos( _userPos ) ].isLandlord();
    }

    //游戏结束
    __proto.onGameOver = function( data )
    {
        for( var i = 0;i < data.players.length;i++ )
        {
            var player = data.players[i];
            this.Players[ this.getPlayerPos( player.userPos ) ].onGameOver( player.cards );
            this.Players[ this.getPlayerPos( player.userPos ) ].setPlayerMoney( player.playerMoney );
            this.Players[ this.getPlayerPos( player.userPos ) ].hideCountdown();
        }
        //this.Players[ 2 ].onGameOver( data.cards );
        this.SetCurActionPos(-1);
    }

    /**
     * 叫地主
     */
    __proto.callLandlordAction = function( data )
    {
        this.Players[ this.getPlayerPos( data.userPos ) ].setCountdown( data.actionTime,FLRoomMgr.getInstance().flRoomState.eCallLandlord,data );
        //this.Players[ 0 ].setCountdown( data.actionTime,FLRoomMgr.getInstance().flRoomState.eCallLandlord );
        this.Players[ this.getPlayerPos( data.userPos ) ].setCLLLev( false );
        this.SetCurActionPos( data.userPos );
    }

    //玩家出牌
    __proto.outputCardsOver = function( data )
    {
        this.Players[ this.getPlayerPos( data.userPos ) ].outputCards( data );
        //this.Players[ 0 ].outputCards( data );
        this.SetCurActionPos(-1);
    }

    //叫地主结束
    __proto.callLandlordOver = function( data )
    {
        this.Players[ this.getPlayerPos( data.userPos ) ].callLandlord( data );
        this.SetCurActionPos(-1);
    }

     //发牌处理
    __proto.dealCards = function( data )
    {
        if( !data )
            return;
        this.clearCards();    
        var cardIndex = -1;
        var cardCount = 0;
        var PLAYER_NUM = 3;//固定3个人才会发牌
        var cardTotalNum = data.cards.length * PLAYER_NUM; //
        var delayTime = 50;//发牌时间
        var moveDuration = delayTime;
       // data = this.resortCards(data);
        data.cards.reverse();//服务器按照从小到大排序传过来的
        var cards = this.arrangeCards( data );
        for( var i = 0;i < cardTotalNum;i++ )
        {
            if( i % PLAYER_NUM === 0 )
                cardIndex++;
            //var userData = data[ i % data.length ]; 
            //var pos = userData.userPos;
            var pos = i % PLAYER_NUM;
            var bLastCard = (i + 1 === cardTotalNum);
            var player = this.Players[ this.getPlayerPos( pos ) ];
            //当发牌时该玩家已经不再游戏中时 不再发牌
            if(player.getPlayerState() != ''){
                player.addCard( cards[ pos ][ cardIndex ],delayTime * cardCount,moveDuration ,
                    bLastCard,{callBack:this.dealCardCallBack,targetObj:this},true);
            }            
            cardCount++;
        }    
    }

    //整理牌
    __proto.arrangeCards = function( data )
    {
        var t_cards = new Array();
        for( var i = 0;i < 17;i++ )
        {
            t_cards.push( {} );
        }
        var cards = new Array(3);
        cards[data.userPos] = data.cards;
        for( var i = 0;i < 3;i++ )
        {
            if( cards[i] != null )
                continue;
            cards[i] = t_cards;
        }
        return cards;
    }

    __proto.testDealCards = function(  )
    {
        var cards1 = new Array();
        var cards2 = new Array();
        var cards3 = new Array();
        cards3.push( {suit:'club',num:'5'},{suit:'spade',num:'5'},{suit:'diamond',num:'5'},{suit:'diamond',num:'5'} );
        //cards3.push( {suit:'diamond',num:'6'},{suit:'diamond',num:'6'} );
        cards3.push( {suit:'diamond',num:'7'},{suit:'diamond',num:'7'},{suit:'diamond',num:'7'},{suit:'diamond',num:'7'} );
        // cards3.push( {suit:'diamond',num:'8'},{suit:'diamond',num:'9'},{suit:'diamond',num:'10'},{suit:'diamond',num:'11'} );
        // cards3.push( {suit:'diamond',num:'9'},{suit:'diamond',num:'9'},{suit:'diamond',num:'9'},{suit:'club',num:'9'} );
        // cards3.push( {suit:'club',num:'10'} );
        cards3.reverse();

        for( var i = 0;i < cards3.length;i++ )
        {
            var card = {};
            cards1.push( {} );
            cards2.push( {} );
        }
        var cards = new Array( cards3,cards2,cards1 );

        var cardIndex = -1;
        var cardCount = 0;
        var cardTotalNum = cards3.length * 3;
        var delayTime = 50;//发牌时间
        var moveDuration = delayTime;
        var userPos = new Array(0,1,2);
        var ran = 0;

        this.Players[ 0 ].isLocalPlayer = true;

        var playerNum = cards.length;
        var playerCardsNum = cardTotalNum / playerNum;
        for( var i = 0;i < cardTotalNum;i++ )
        {
            if( i % playerNum === 0 )
                cardIndex++;
            //var userData = data[ i % data.length ]; 
            var pos = (ran + i) % playerNum;
            var bLastCard = (i + 1 === cardTotalNum);
            var player = this.Players[ pos ];
            //当发牌时该玩家已经不再游戏中时 不再发牌
                player.addCard( cards[ pos ][ cardIndex ],delayTime * cardCount,moveDuration ,
                    bLastCard,{callBack:this.dealCardCallBack,targetObj:this},false);
            cardCount++;
        }
    }

    //获得本地玩家出牌列表
    __proto.getLocalPlayerOutPutCardsList = function()
    {
        return this.Players[ this.getPlayerPos( this.localPlayer.userPos ) ].getLocalPlayerOutPutCardsList();
    }

    //发完牌回调
    __proto.dealCardCallBack = function()
    {
        for( var i = 0;i < this.Players.length;i++ )
        {
            this.Players[i].showCardNum();
            this.Players[i].addCardListener();
        }
        StatePool.stateProcess(FLRoomMgr.getInstance().flRoomState.ePutCard);
        MessageCallbackPro.messageEmit('dealCardCallBack');
    }

    __proto.onInOnesturn = function( data )
    {
        if( FLRoomMgr.getInstance().IsCallLandlord( data.rState ) )
        {
            this.callLandlordAction( data );
        }else if( FLRoomMgr.getInstance().IsActionBegin( data.rState ) )
        {
            this.outPutCardAction( data );
        }
    }

    //复位卡牌位置
    __proto.resetCardPos = function()
    {
	    this.Players[ this.getPlayerPos( this.localPlayer.userPos ) ].resetCardPos();
    }

    /**
     * 设置各玩家数据
     */
    __proto.setUserData = function( data )
    {
        this.playersInitData = data.users;
        var users = data.users;
        //找到自己所在位置
        for( var j = 0; j < users.length;j++ ){
            var play = users[ j ];
            if( play.self == 1 ){
                this.localPlayer = play;
                break;
            }
        }
        if( this.localPlayer === null )
            return;

        var bDemo = data.roomType && (data.roomType.type == ROOM_TYPE_DIAMONDS.DEMOROOM.key);
        this.Players[0].init(this.localPlayer,true,bDemo);

        for( var i = 0; i < users.length;i++ )
        {
            var play = users[ i ];
            if(play.isAction == 1){
                this.SetCurActionPos(play.userPos);
            }
            if( this.localPlayer.userPos != play.userPos ){
                this.addPlayerData(play,bDemo);
            }
        } 
    }

    /**
     * 明牌或是托管
     */
    __proto.ShowCards_Deposit = function( content )
    {
        this.Players[ this.getPlayerPos( content.userPos ) ].ShowCards_Deposit( content );
    }
        /**
     * 重置数据
     */
    __proto.resetController = function()
    {
        _super.prototype.resetController.call(this);
            //隐藏计时器
        this.hideCountdown();            
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

    //添加玩家数据
    __proto.addPlayerData = function( play,bDemo){        
        var pos = this.getPlayerPos( play.userPos );
        this.Players[pos].init(play,false,bDemo);
    }
     //设置状态和金钱 
    __proto.setStateMoney = function( data )
    {
        if( data.userPos < 0 || data.userPos >= this.Players.length )
        {
            CLog.log('setPlayerState error userPos = ' + data.userPos);
            return;
        }
        data.hasOwnProperty('state') && this.Players[ this.getPlayerPos(data.userPos) ].setPlayerState(data.state);
        data.hasOwnProperty('money') && this.Players[ this.getPlayerPos(data.userPos) ].setPlayerMoney(data.money);
        
        // TODO 断线 隐藏行动时间
        if( !this.isLocalPlayer( data.userPos ) && data.hasOwnProperty('discTime') /*&& data.discTime > 0*/ )
        {
            if(data.discTime == -1){
                //-1代表重连成功
                CLog.log("玩家重连成功.......");
                this.Players[ this.getPlayerPos(data.userPos) ].hideDisconnect();
                if( data.hasOwnProperty('isAction') && data.isAction === 1 && data.hasOwnProperty('actionTime') )//重连后 是否在行动阶段
                {
                    this.onInOnesturn( data );
                }
            }
            else if(data.discTime > 0){
                //大于0代表断线中，剩余的断线等待时间，毫秒
                this.Players[ this.getPlayerPos(data.userPos) ].showDisconnect( data.discTime );
                this.Players[ this.getPlayerPos(data.userPos) ].hideRobot(false);
            }
            
        }
    }
    return FLPlayerController;
})(BasePlayerController);