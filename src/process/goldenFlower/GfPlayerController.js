/**
 * 2016 10 27
 * 炸金花玩家控制类
 * */
var GfPlayerController = (function (_super) {
    Laya.class(GfPlayerController,"GfPlayerController",_super);
    function GfPlayerController(maxPlayerNum)
    {
        GfPlayerController.__super.call(this,maxPlayerNum); 

        //显示比牌按钮 
        this.ShowCompareBtn = function(bShow,obj,callback){
            for( var i = 0; i < this.Players.length;i++ ){
                var state = this.Players[i].getPlayerState();
                if(state != GameData.getInstance().playerState.Playing
                    || this.isLocalPlayer(this.Players[i].getPos())){
                    continue;
                } 
                this.Players[i].showCompareBtn( bShow,obj,callback);
            }
        }
        //显示玩家的牌
        this.ShowPlayersCards = function(data){
            this.delayTime = 0;
            for( var i = 0;i < data.length;i++ )
            {
                var t_data = data[i];
                // //弃牌了 逃跑了 没有牌型
                // if( t_data.abandon === 1 || t_data.escape === 1 || !t_data.hasOwnProperty('cardForm') )
                //     continue;
                var player = this.getPlayerByPos(t_data.userPos);
                if( player && player.cards.length != 0)
                {
                    if(t_data.cardForm){
                        task = new TaskDelay();
                        task.data = t_data;
                        task.callBack = player.showResult;
                        task.classObj = player;
                        task.leftTime = this.delayTime;
                        TaskDelayManager.getInstance().addTask( task );
                    }
                    if(player != this.getLocalPlayer() || !player.getSeenCards()) {
                        var task = new TaskDelay();
                        task.data = t_data.cards;
                        task.callBack = player.showMyCards;
                        task.classObj = player;
                        task.leftTime = this.delayTime;
                        TaskDelayManager.getInstance().addTask( task );
                    }
                    this.delayTime += 1000;
                }

            }         
        }
        //获取可以比牌的玩家
        this.GetPlayersWhomICanCompare = function(){
            var arr = [];
            for( var i = 0; i < this.Players.length;i++ ){
                var player = this.Players[i];
                var state = player.getPlayerState();
                if(state == GameData.getInstance().playerState.Playing){
                    if(this.isLocalPlayer(player.getPos())) continue;
                    arr.push(this.Players[i]);
                } 
            }
            return arr;
        }
        //判断一个玩家是否在游戏状态
        this.InMyTurn = function(pos){
            if(pos == undefined) pos = this.getLocalPlayer().getPos();
            return pos == this.GetCurActionPos();
        }
        //是否lock玩家的状态显示,主要是等比牌界面展现完毕后再更新状态
        this.lockPlayerUIState = function(players){
            players = players == undefined ? this.Players : players;
            for( var i = 0; i < players.length;i++ ){
                var player = players[i];
                var state = player.getPlayerState();
                if(state == GameData.getInstance().playerState.Playing){
                    player.lockStateUI(true);
                } 
            }
        }
        //解锁玩家的状态显示
        this.unLockPlayerUIState = function(players){
            players = players == undefined ? this.Players : players;
            for( var i = 0; i < players.length;i++ ){
                if(players[i]){
                    players[i].lockStateUI(false);
                    players[i].updateUIState();
                }                
            }
        }
    }

    var __proto = GfPlayerController.prototype;
    /**
     * 某个玩家开始下注
     */
    __proto.onInOnesturn = function(data)
    {
        CLog.log("玩家开始操作："+data.userPos);
        var p = this.getPlayerPos( data.userPos );
        if(-1 == p) return;
        this.Players[ p ].setCountdown( data.actionTime );
        this.Players[ p ].action();
        this.SetCurActionPos(data.userPos);
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
        this.SetCurActionPos(-1);
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
        if(data.hasOwnProperty("money")) this.Players[ userPos ].setPlayerMoney( data.money );
        this.Players[ userPos ].actionOver();
        this.Players[ userPos ].setTurnMoneyInTable( data.turnMoneyInTable );
        
    }
    /**
     * 弃牌处理
     */
    __proto.dropCard = function( userPos ){
        var player = this.Players[ this.getPlayerPos( userPos ) ];
        if(!player) return;
        player.dropCard( this.isLocalPlayer( userPos ) );
        if( this.isLocalPlayer( userPos )){
            player.showCompareBtn(false);
        }
    }
    /**
     * 发牌完成后回调
     */
    __proto.dealCardCallBack = function(){
        //发牌只在gameBegin的时候
        StatePool.stateProcess(GameData.getInstance().gfRoomState.eGameBegin);
    }
     //设置状态和金钱 
    __proto.setStateMoney = function( data ){
         _super.prototype.setStateMoney.call(this,data);
         var player = this.Players[this.getPlayerPos(data.userPos)];
         if(player && data.hasOwnProperty('hasLookedCards')){
             var bSeenCards = data.hasLookedCards == 1;
             player.setSeenCards(bSeenCards);
             if(bSeenCards){
                 SoundTool.getInstance().PlayGameSound(EnumGameSound.SHOW_CARD,player.getSex());
             }
         } 
    }
    //设置玩家的数据 名称 金钱 头像
    __proto.setUserData = function( data ){
        this.playersInitData = data.users;
        var users = data.users;
        if(!users || !users[0]) return;
        //找到自己所在位置
        for( var j = 0; j < users.length;j++ ){
            var play = users[ j ];
            if( play.self == 1 ){
                this.localPlayer = play;
                break;
            }
        }
         //GM视角 选择第一个玩家作为自己
        if( this.localPlayer === null ){
            users[0].self = 1;
            this.localPlayer = users[0];
        }
        var bDemo = data.roomType && (data.roomType.type == ROOM_TYPE_DIAMONDS.DEMOROOM.key);
        this.Players[0].init(this.localPlayer,true,bDemo);

        this.Players[0].setSeenCards(this.localPlayer.hasLookedCard == 1);
        
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
    //添加玩家数据
    __proto.addPlayerData = function( play,bDemo){        
        var pos = this.getPlayerPos( play.userPos );
        if(-1 == pos) return;
        this.Players[pos].init(play,false,bDemo);
        this.Players[pos].setSeenCards(play.hasLookedCard == 1);
    }
    __proto.SwitchPlayerView = function(playerID){
        _super.prototype.SwitchPlayerView.call(this,playerID);
        var curLocal = null;
        //找到新视角玩家原始信息
        for(var i in this.playersInitData){
            if(playerID == this.playersInitData[i].name){
                curLocal = this.playersInitData[i];
                break;
            }
        }
        if(!curLocal) return;
        //位置差
        var numPosDiff = this.MAXPLAYERNUM - (curLocal.userPos - this.localPlayer.userPos);
        var arrPos = [];
        var arrXY = [];
        var newPlayers = [];
        //找到新视角所在位置
        for(var i in this.Players){
            var userPos = this.Players[i].getPos();
            var xyInfo = {x:this.Players[i].x,y:this.Players[i].y};
            this.Players[i].isLocalPlayer = ( userPos === curLocal.userPos);
            if(userPos == -1){
                var index = (parseInt(i) + numPosDiff) % this.MAXPLAYERNUM;
                newPlayers[index] = this.Players[i];
                arrXY[index] = xyInfo;
            }
            //自己的位置在第一个
            else if( this.Players[i].isLocalPlayer ){
                newPlayers[0] = this.Players[i];
                arrXY[0] = xyInfo;
            }                
            //自己的下家
            else if( userPos > curLocal.userPos ){
                newPlayers[userPos - curLocal.userPos] = this.Players[i];
                arrXY[userPos - curLocal.userPos] = xyInfo;
            }
            else{
                newPlayers[userPos - curLocal.userPos + this.MAXPLAYERNUM] = this.Players[i];
                arrXY[userPos - curLocal.userPos + this.MAXPLAYERNUM] = xyInfo;
            }
        }
    }
    return GfPlayerController;
})(PlayerController);