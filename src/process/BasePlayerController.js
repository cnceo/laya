/** 
 * 玩家控制基类
 * 注意： 构造方法内的函数子类重写时无法访问到父类函数的内容
 * 而以prototype方式创建的函数子类可以在重写时访问到父类的内容
 * 访问方式为：_super.prototype.method.call(this);
*/
    
var BasePlayerController = (function (_super){
    Laya.class(BasePlayerController,"BasePlayerController",_super);

    function BasePlayerController(maxPlayerNum){        
        BasePlayerController.__super.call(this);
        this.MAXPLAYERNUM = maxPlayerNum || 5;
        this.Players = [];//玩家数据（BasePlayerView结构）
        this.localPlayer = null;//本地用户逻辑数据（注意，并非是BasePlayerView结构）
        this.curActionPlayerPos = -1;
        this.buttonPos = -1;//庄家位置
        this.playersInitData = null;//玩家原始数据

        this.currentScene = Game.getInstance().currentScene;
        for(var i = 0;i < this.MAXPLAYERNUM;i++)
        {
            var Players = this.currentScene.getChildByName('players');
            if(!Players) break;
            var player  = Players.getChildByName('player' + i);
            player.initData();
            this.Players.push( player );
        }
        
        
        if(this.Players[0]) this.Players[0].cardDir = 'CENTER';
        if(this.Players[1]) this.Players[1].cardDir = 'RIGHT';
        if(this.Players[2]) this.Players[2].cardDir = 'RIGHT';

        /**
         * 清理桌子
         */
        this.clearTable = function()
        {
            for( var i = 0; i < this.Players.length;i++ )
            {
                this.Players[i].reset( false );
                this.Players[i].clearJetion();
            }
        }
    }
    
    var __proto = BasePlayerController.prototype;

        //获取当前action的玩家pos
    __proto.GetCurActionPos = function(){
        return this.curActionPlayerPos;
    }
    __proto.SetCurActionPos = function(pos){
        this.curActionPlayerPos = pos;
    }
    /**
     * 设置玩家数据
     */
    __proto.setUserData = function( data ){
    }
    /**
     * 设置玩家UI方向
     */
    __proto.setPlayerDir = function( index ,dir )
    {
        if( index < 0 && index > this.Players.length )
            return;
        this.Players[ index ].cardDir = dir;    
    }

    /**
     * 重置数据
     */
    __proto.resetController = function(){
        for( var i = 0; i < this.Players.length;i++ )
        {
            var bIsLocal = this.isLocalPlayer(this.Players[i].getPos());
            this.Players[i].reset( !bIsLocal );
            this.Players[i].clearJetion();
        }
        this.curActionPlayerPos = -1;
    }
    //获取本地玩家
    __proto.getLocalPlayer = function(){
        if(!this.localPlayer) return null;
        return this.Players[ this.getPlayerPos( this.localPlayer.userPos ) ];
    }
    //由userPos获取一个玩家
    __proto.getPlayerByPos = function(userPos){
        return this.Players[this.getPlayerPos(userPos)];
    }
    //由座位号获取一个玩家
    __proto.getPlayerBySeatNum = function(num){
        for(var i in this.Players){
            var pos = this.Players[i].getPos();
            var setNum = GameData.getInstance().getPlayerSeatPos(pos);
            if(num == setNum){
                return this.Players[i];
            }
        }
        return null;
    }    
    /**
     * 获取本地玩家金钱
     */
    __proto.getLocalPlayerMoney = function(){
        if(!this.localPlayer) return -1;
        return this.Players[ this.getPlayerPos( this.localPlayer.userPos ) ].playerMoney;
    }
    
    /**
     * 获得本地玩家状态
     */
    __proto.getLocalPlayerState = function(){
        if(!this.localPlayer) return null;
        return this.Players[ this.getPlayerPos( this.localPlayer.userPos ) ].getPlayerState();
    }
     //是否是本地玩家
    __proto.isLocalPlayer = function( userPos )
    {
        if(!this.localPlayer) return false;
        return this.localPlayer.userPos === userPos;
    }
    
    //获得玩家位置(客户端位置)
    __proto.getPlayerPos = function( userPos )
    {
        if(!this.localPlayer) return -1;
        if( this.localPlayer.userPos === userPos )
            return 0;//自己的位置在第一个
        //自己的下家
        if( userPos > this.localPlayer.userPos )
        {
            return userPos - this.localPlayer.userPos;
        }else 
        {
            return userPos - this.localPlayer.userPos + this.MAXPLAYERNUM;
        } 
    }
    //删除一个玩家
    __proto.removePlayer = function( userPos ){
        if(this.Players[ this.getPlayerPos(userPos) ]){
            this.Players[ this.getPlayerPos(userPos) ].reset(true);
        } 
        this.onRemovePlayer(userPos);
    }
    __proto.onRemovePlayer = function(userPos){
    }
    //设置首个发牌的玩家高亮
    __proto.setFCPlayer = function(){
        var p = this.buttonPos;
        for( var i = 0; i < this.Players.length;i++ ){
            var show = (p != -1) && (this.Players[i].getPos() ==  p);
            this.Players[i].setFirstCardPlayer(show);
        }
    }
    //设置玩家状态
    __proto.setPlayerStateAndMoney = function( data )
    {
        if( this.localPlayer === null || this.localPlayer === undefined )
            return;
        if(data.hasOwnProperty("allinTime")){
            var p = this.getPlayerPos(data.userPos);
            if(-1 != p){
                this.Players[ p ].showAllIn(data.allinTime);
            }            
        }
        if( data.hasOwnProperty('users') )
        {
            for( var i = 0;i < data.users.length;i++ ) 
            {
                t_data = data.users[i];
                this.setStateMoney( t_data );
            }
        }else 
        {
            this.setStateMoney( data );
        }

    }
    
    //设置状态和金钱 
    __proto.setStateMoney = function( data )
    {
        if( data.userPos < 0 || data.userPos >= this.Players.length )
        {
            CLog.log('setPlayerState error userPos = ' + data.userPos);
            return;
        }
        var playerPos = this.getPlayerPos(data.userPos);
        if(-1 == playerPos) return;
        data.hasOwnProperty('state') && this.Players[ playerPos ].setPlayerState(data.state);
        data.hasOwnProperty('money') && this.Players[ playerPos ].setPlayerMoney(data.money);
        
        // TODO 断线 隐藏行动时间
        //if( !this.isLocalPlayer( data.userPos ) && data.hasOwnProperty('discTime') /*&& data.discTime > 0*/ )
        if( data.hasOwnProperty('discTime') /*&& data.discTime > 0*/ )
        {
            if(data.discTime == -1){
                //-1代表重连成功
                CLog.log("玩家重连成功.......");
                this.Players[ playerPos ].hideDisconnect();
                if( data.hasOwnProperty('isAction') && data.isAction === 1 && data.hasOwnProperty('actionTime') )//重连后 是否在行动阶段
                {
                    this.onInOnesturn( data );
                }
            }
            else if(data.discTime > 0){
                //大于0代表断线中，剩余的断线等待时间，毫秒
                this.Players[ playerPos ].showDisconnect( data.discTime );
            }
            
        }
    }
    /**
     * 切换玩家视角
     */
    __proto.SwitchPlayerView = function(playerID){};
    
    return BasePlayerController;
})(laya.ui.Box); 