/**
* BasePlayerView 
*/
var BasePlayer = (function (_super){
	function BasePlayer()
    {
        //逻辑数据声明
        this._playerPos = -1;
        this.jetions = [];
        this.cards = [];
        this.playerState = '';
        this.playerMoney = -1;
        this.isUpdate = false;
        this.playerName = "";
        this._tempMoney = [];//用户金额锁定期间，暂存用户余额的变化值
        this._speedUpdate = 0;
        this._preMoney = 0;
        this._bDisconnect = false;
        this.isLocalPlayer = false;

        //界面元素声明
        this._labelMoney = null;//余额
        this.txtState = null;//状态
        this._imgVIP = null;//VIP
        this._lblName = null;//name
        this._imgD = null;//首个发牌玩家标识
        this._imgLoading = null;//掉线loading
        this._imgIcon = null;//头像
        this._boxDisconnect = null;//断线标识
        this._headId = 100;

        //设置是否显示首个发牌者
        this.setFirstCardPlayer = function(bShow){
            if(!this._imgD) return;
            this._imgD.visible = bShow;
        }
        this.initState = function(){
            this.txtState = this.getChildByName( 'state' );
            if(!this.txtState) return;
            this.txtState.visible = false;
        }
        this.initMoney = function(){
            this._labelMoney = this.getChildByName("money");
            if(!this._labelMoney) return;
            this._labelMoney.text = '';
        }
        this.initVIP = function(){
            this._imgVIP = this.getChildByName("vip");
            if(!this._imgVIP) return;
            this._imgVIP.visible = false;
        }
        this.initFCP = function(){
            this._imgD = this.getChildByName('d');
            if(!this._imgD) return;
            this._imgD.visible = false;
        }
        this.initName = function(){
            this._lblName = this.getChildByName('name');
            if(!this._lblName) return;
            this._lblName.text = this.playerName;
        }
        this.initIcon = function(){
            this._imgIcon = this.getChildByName( 'icon' );
            if(!this._imgIcon) return;
            this._imgIcon.visible = false;
        }
        this.initDisconnect = function(){
            this._bDisconnect = false;
            this._boxDisconnect = this.getChildByName( 'disconnect' );
            if(this._boxDisconnect){
                this._boxDisconnect.visible = false;
                this._imgLoading = this._boxDisconnect.getChildByName('loading');
            } 
        }
        //校正金钱
        this.correctMoney = function(){
            this.isUpdate = false;
            if(!this._labelMoney || (this.playerMoney === -1)) return;
            this._labelMoney.text = '￥'+Tools.getInstance().ChangeUIShow(this.playerMoney); 
            this._tempMoney = [];
            this._speedUpdate = 0;
        }
        //设置头像
        this.setIcon = function(icon){
            if(icon == undefined || icon == null) return;
            icon = (isNaN(parseInt(icon))) ? icon = 0 : icon;
            this._headId = icon;
            this._imgIcon.dataSource = {skin:"common/head/headIcon"+icon+".png"};
            this._imgIcon.visible = true;
        }
        //设置试玩
        this.setDemo = function(bDemo){
            var shiwan = this._imgIcon.getChildByName('iconShiwan');
            if(shiwan){
                shiwan.visible = bDemo;
            }
        }
        //获取头像
        this.getIcon = function(){
            return this._imgIcon.skin;
        }
        this.getHeadId = function(){
            return this._headId;
        }
        //获取玩家是否断线
        this.isDisconnect = function(){
            return this._bDisconnect;
        }
        this.getSex = function(){
            var strID = this.getHeadId().toString();
            return HeadID_SEX[strID] || ENUM_SEX.MALE;
        }
        this.destroy = function(){
            Laya.timer.clearAll(this);
            Tween.clearAll(this);
            this.releaseCountdown();
            this.removeListener();
            this.hideCountdown();
            Game.getInstance().removeUpdate(this);
            for(var i in this.cards){
                this.cards[i] && this.cards[i].reset();
                this.cards[i] = null;
            }
            this.cards = [];
            this.__proto__.destroy();
        }
    }
    var __proto = BasePlayer.prototype;
    __proto.initData = function(){
         this.initState();
         this.initMoney();
         this.initVIP();
         this.initName();
         this.initIcon();
         this.initFCP();
         this.initDisconnect();
         this.isUpdate = false;
    }
    /**
     * 获得玩家位置(服务端位置)
     */
    __proto.getPos = function(){
        return this._playerPos;  
    }
    /**
     * 设置玩家位置(服务端位置)
     */
    __proto.setPos = function(pos){
        this._playerPos = pos;
    }
    //重置数据
    __proto.reset = function( _isRemove ){
    }    
    __proto.releaseCountdown = function(){
        var cd = this.getChildByName( 'countdown' );
        if(cd) cd.onRelease();
        var dis = this.getChildByName("disconnect");
        if(dis && dis.getChildByName("clock")) dis.getChildByName("clock").onRelease();
    }
    /**
     * 清理筹码
     */
    __proto.clearJetion = function(){
        for( var i = 0;i < this.jetions.length;i++ ) {
            this.jetions[i].removeSelf();
            Tween.clearAll( this.jetions[i] );
            laya.utils.Pool.recover('jetton',this.jetions[i]);
            this.jetions[i] = null;
        }
        this.jetions = [];
    }
    //当筹码数量过大时，处理方法为：按照队列方式删除筹码
    __proto.removeExJettons = function(){
        if(this.jetions.length > 3000){
            this.jetions[0].removeSelf();
            Tween.clearAll( this.jetions[0] );
            laya.utils.Pool.recover('jetton',this.jetions[0]);
            this.jetions.shift();
        }
    }
    //获得玩家状态
    __proto.getPlayerState = function(){
        return this.playerState;
    }
    //重设玩家状态
    __proto.resetState = function(){
        if(!this.txtState) return;
        this.txtState.visible = false;
    }
    __proto.hideCountdown = function(){
    }
    //设置玩家状态
    __proto.setPlayerState = function( _state ){
        if( this.getPos() === -1 ) return;
        this.playerState = _state;
        if(!this.txtState) return;
        this.txtState.visible = true;
        switch( this.playerState ){
            case 'eWaiting':
                this.txtState.text = '等待'; break;            
            case 'eWatching':
                this.txtState.text = '准备'; break;            
            case 'ePlaying':
                this.txtState.text = '';    break;            
            case 'eAbandon':
                this.txtState.text = '弃牌';break;
            default:
                this.txtState.text = '';    break;
        }
    }
    //设置玩家行动状态（其实是补充玩家状态）
    __proto.setActionState = function(state){
        if( this.getPos() === -1 || !this.txtState) return;
        this.txtState.visible = true;
        switch(state){
            case 'eXiaZhu':
                this.txtState.text = '下注'; break;
            case 'eJiaZhu':
                this.txtState.text = '加注'; break;
            case 'eGenZhu':
                this.txtState.text = '跟注'; break;
            case 'eGuoPai':
                this.txtState.text = '过牌'; break;   
            case 'eSiKao':
                this.txtState.text = '思考'; break;   
            case 'eAllIn':
                this.txtState.text = 'ALL IN';break;
            default:
                break;     
        }
    }
    //做余额的滚动效果
    __proto.rollMoney = function(){
        if(!this._labelMoney || this._tempMoney.length == 0 || this._speedUpdate == 0) return;
        var target = this._tempMoney[0];
        var nowValue = Math.ceil(this._speedUpdate + this._preMoney);
        if((this._speedUpdate < 0 && nowValue <= target) ||
            (this._speedUpdate > 0 && nowValue >= target)){
            this._labelMoney.text = '￥'+ Tools.getInstance().ChangeUIShow(target);
            this._preMoney = target;
            this._tempMoney.splice(0,1);
            this.checkPlayerRollMoney();
        }
        else {
            this._labelMoney.text = '￥'+ Tools.getInstance().ChangeUIShow(nowValue);
            this._preMoney = nowValue;
        }
    }

    __proto.registerListener = function(){
        MessageCallbackPro.addCallbackFunc( EventType.Type.playerMoneyRoll,this.checkPlayerRollMoney,this );
    }
    __proto.removeListener = function(){
        MessageCallbackPro.removeCallbackFunc( EventType.Type.playerMoneyRoll,this.checkPlayerRollMoney,this);
    }

    /**
     * 创建一张卡牌
     */
    __proto.createObj = function( _key )
    {
        var t_node = null;
        switch( _key )
        {
            case 'card':
                t_node = Tools.getInstance().CreateACard({zOrder:0,rotation:0,visible:true});
                break;
            case 'jetton':
                t_node = Tools.getInstance().CreateAJetton({zOrder:0,rotation:0,visible:true});
                break;
            case 'cardForm':
                t_node = Tools.getInstance().CreateACardForm({zOrder:5,rotation:0,visible:true});
                break;        
        }        
        if(!t_node) return null;
        t_node.scale(1,1);        
        return t_node; 
    }

    /**
     * 隐藏说话泡泡
     */
    __proto.hideTalk = function()
    {
        this.Speak.visible = false;
    }
    
    /**
     * 倒计时消失
     */
    __proto.hideCountdown = function()
    {
        if( !this.countdown || !this.countdown.visible )
            return;
        this.countdown.stop();
    }
    
    //倒计时结束
    __proto.countdownFinish = function()
    {
        this.countdown.visible = false; 
    }

    //检查是否还有需要滚动的金额
    __proto.checkPlayerRollMoney = function(){
        if( !this._labelMoney || this._tempMoney.length == 0) return;
        this.isUpdate = true;
        //每帧需要递增的数额（可能为负数）,在60帧内完成
        this._speedUpdate = (this._tempMoney[0] - this._preMoney) / 60;
    }
    //设置玩家金钱
    __proto.setPlayerMoney = function( money ){
        this._preMoney = this.playerMoney;
        var gData = GameData.getInstance();
        this.playerMoney = money;
        if(this.isLocalPlayer && !IS_GAME_REVIEW){
            User.getInstance().SetGameMoney(money);
        }
        //当money为非数值时，特殊处理
        if(!(parseInt(money)) && this._labelMoney){
            this._labelMoney.text = (money == "") ? "" : ('￥'+Tools.getInstance().ChangeUIShow(money));
            return;
        }        
        if(gData.lockPlayerMoney){
            this._tempMoney.push(money);
        }
        else if(money >= 0){
            if( this._labelMoney ){
                this._labelMoney.text = '￥'+Tools.getInstance().ChangeUIShow(money);
            }
        }
    }
    __proto.getPlayerUIMoney = function(){
        return this._labelMoney ? this._labelMoney.text : null;
    }
    //设置玩家VIP等级
    __proto.setVip = function(level){
        if(!this._imgVIP) return;
        this._imgVIP.dataSource = {skin:'vip/vip'+level+'.png'};
        this._imgVIP.visible = true;
    }
    //设置玩家名字
    __proto.setPlayerName = function( playerName ){
        this.playerName = playerName;
        if(playerName == null || playerName == undefined || !this._lblName) return;
        this._lblName.text = this.getPlayerName(playerName);
    }
    __proto.getPlayerName = function(playerName){
            return this.isLocalPlayer ? Tools.getInstance().GetLocalPlayerUIName(playerName) : Tools.getInstance().GetPlayerName(playerName);
    }
    //显示断线标识
    __proto.showDisconnect = function( discTime ){
        //if( this.isLocalPlayer ) return;
        this._bDisconnect = true;
        this.hideCountdown();
        this._boxDisconnect.visible = true;
        
        Laya.timer.loop(35, this, this.disconnectLoading);
        
        var clock = this._boxDisconnect.getChildByName('clock');
        if(!clock) return;
        clock.visible = true;
        if(this.txtState) this.txtState.visible = false;
        var clockParam = 
        {
            timeAction : discTime,
            timeTotal : GameData.getInstance().discTime,
            callback : function(){
                this._boxDisconnect.visible = false;
                if(this.txtState) this.txtState.visible = true;
            },
            targetObj : this,
            color : GameData.getInstance().COLOR.RED
        }
        // clock.startTimer( discTime,function(){
        //     this._boxDisconnect.visible = false;
        //     if(this.txtState) this.txtState.visible = true;
        // },this,null,false,null,GameData.getInstance().COLOR.RED,GameData.getInstance().discTime - discTime);
        clock.startTimer(clockParam);
    }
    //隐藏断线标识
    __proto.hideDisconnect = function(){
        //自己没有断线重连的显示
        //if( this.isLocalPlayer || !this._boxDisconnect ) return;
        if( !this._boxDisconnect ) return;
        this._bDisconnect = false;
        this._boxDisconnect.visible = false;
        Laya.timer.clear(this,this.disconnectLoading);
        this._imgLoading.rotation = 0;
        var clock = this._boxDisconnect.getChildByName('clock');
        if(clock) clock.stop();        
    }
    __proto.disconnectLoading = function(){
        //if( this.isLocalPlayer || !this._imgLoading ) return;
        if(!this._imgLoading ) return;
        this._imgLoading.rotation += 10;
    }
    return BasePlayer;
})();
var BasePlayerView = (function (_super){
	function BasePlayerView()
    {
        // 逻辑数据声明
        // this._playerPos = -1;
        // this.jetions = [];
        // this.cards = [];
        // this.playerState = '';
        // this.playerMoney = 0;
        // this.isUpdate = false;
        // this.playerName = "";
        // this._tempMoney = [];//用户金额锁定期间，暂存用户余额的变化值
        // this._speedUpdate = 0;
        // this._preMoney = 0;
        // this._bDisconnect = false;
        // this.isLocalPlayer = false;

        // //界面元素声明
        // this._labelMoney = null;//余额
        // this.txtState = null;//状态
        // this._imgVIP = null;//VIP
        // this._lblName = null;//name
        // this._imgD = null;//首个发牌玩家标识
        // this._imgLoading = null;//掉线loading
        // this._imgIcon = null;//头像
        // this._boxDisconnect = null;//断线标识
        // this._headId = 100;

		BasePlayerView.__super.call(this);
        BasePlayer.call(this);
        for(var i in BasePlayer.prototype){
            BasePlayerView.prototype[i] = BasePlayer.prototype[i];
        }
        // //设置是否显示首个发牌者
        // this.setFirstCardPlayer = function(bShow){
        //     if(!this._imgD) return;
        //     this._imgD.visible = bShow;
        // }
        // this.initState = function(){
        //     this.txtState = this.getChildByName( 'state' );
        //     if(!this.txtState) return;
        //     this.txtState.visible = false;
        // }
        // this.initMoney = function(){
        //     this._labelMoney = this.getChildByName("money");
        //     if(!this._labelMoney) return;
        //     this._labelMoney.text = '';
        // }
        // this.initVIP = function(){
        //     this._imgVIP = this.getChildByName("vip");
        //     if(!this._imgVIP) return;
        //     this._imgVIP.visible = false;
        // }
        // this.initFCP = function(){
        //     this._imgD = this.getChildByName('d');
        //     if(!this._imgD) return;
        //     this._imgD.visible = false;
        // }
        // this.initName = function(){
        //     this._lblName = this.getChildByName('name');
        //     if(!this._lblName) return;
        //     this._lblName.text = this.playerName;
        // }
        // this.initIcon = function(){
        //     this._imgIcon = this.getChildByName( 'icon' );
        //     if(!this._imgIcon) return;
        //     this._imgIcon.visible = false;
        // }
        // this.initDisconnect = function(){
        //     this._bDisconnect = false;
        //     this._boxDisconnect = this.getChildByName( 'disconnect' );
        //     if(this._boxDisconnect){
        //         this._boxDisconnect.visible = false;
        //         this._imgLoading = this._boxDisconnect.getChildByName('loading');
        //     } 
        // }
        // //校正金钱
        // this.correctMoney = function(){
        //     this.isUpdate = false;
        //     if( !this._labelMoney )
        //         return;
        //     this._labelMoney.text = '￥'+Tools.getInstance().ChangeUIShow(this.playerMoney); 
        //     this._tempMoney = [];
        //     this._speedUpdate = 0;
        // }
        // //设置头像
        // this.setIcon = function(icon){
        //     if(icon == undefined || icon == null) return;
        //     icon = (isNaN(parseInt(icon))) ? icon = 0 : icon;
        //     this._headId = icon;
        //     this._imgIcon.dataSource = {skin:"common/head/headIcon"+icon+".png"};
        //     this._imgIcon.visible = true;
        // }
        // //设置试玩
        // this.setDemo = function(bDemo){
        //     var shiwan = this._imgIcon.getChildByName('iconShiwan');
        //     if(shiwan){
        //         shiwan.visible = bDemo;
        //     }
        // }
        // //获取头像
        // this.getIcon = function(){
        //     return this._imgIcon.skin;
        // }
        // this.getHeadId = function(){
        //     return this._headId;
        // }
        // //获取玩家是否断线
        // this.isDisconnect = function(){
        //     return this._bDisconnect;
        // }
        // this.getSex = function(){
        //     var strID = this.getHeadId().toString();
        //     return HeadID_SEX[strID] || ENUM_SEX.MALE;
        // }
    }   
    Laya.class(BasePlayerView,"BasePlayerView",_super);//需要先声明，注意此处的位置
    // var __proto = BasePlayerView.prototype;
    // __proto.initData = function(){
    //      this.initState();
    //      this.initMoney();
    //      this.initVIP();
    //      this.initName();
    //      this.initIcon();
    //      this.initFCP();
    //      this.initDisconnect();
    //      this.isUpdate = false;
    // }
    // /**
    //  * 获得玩家位置(服务端位置)
    //  */
    // __proto.getPos = function(){
    //     return this._playerPos;  
    // }
    // /**
    //  * 设置玩家位置(服务端位置)
    //  */
    // __proto.setPos = function(pos){
    //     this._playerPos = pos;
    // }
    // //重置数据
    // __proto.reset = function( _isRemove ){
    // }
    // /**
    //  * 清理筹码
    //  */
    // __proto.clearJetion = function(){
    //     for( var i = 0;i < this.jetions.length;i++ ) {
    //         this.jetions[i].removeSelf();
    //         Tween.clearAll( this.jetions[i] );
    //         laya.utils.Pool.recover('jetton',this.jetions[i]);
    //         this.jetions[i] = null;
    //     }
    //     this.jetions = [];
    // }
    // //当筹码数量过大时，处理方法为：按照队列方式删除筹码
    // __proto.removeExJettons = function(){
    //     if(this.jetions.length > 3000){
    //         this.jetions[0].removeSelf();
    //         Tween.clearAll( this.jetions[0] );
    //         laya.utils.Pool.recover('jetton',this.jetions[0]);
    //         this.jetions.shift();
    //     }
    // }
    // //获得玩家状态
    // __proto.getPlayerState = function(){
    //     return this.playerState;
    // }
    // //重设玩家状态
    // __proto.resetState = function(){
    //     if(!this.txtState) return;
    //     this.txtState.visible = false;
    // }
    // __proto.hideCountdown = function(){
    // }
    // //设置玩家状态
    // __proto.setPlayerState = function( _state ){
    //     if( this.getPos() === -1 ) return;
    //     this.playerState = _state;
    //     if(!this.txtState) return;
    //     this.txtState.visible = true;
    //     switch( this.playerState ){
    //         case 'eWaiting':
    //             this.txtState.text = '等待'; break;            
    //         case 'eWatching':
    //             this.txtState.text = '准备'; break;            
    //         case 'ePlaying':
    //             this.txtState.text = '';    break;            
    //         case 'eAbandon':
    //             this.txtState.text = '弃牌';break;
    //         default:
    //             this.txtState.text = '';    break;
    //     }
    // }
    // //设置玩家行动状态（其实是补充玩家状态）
    // __proto.setActionState = function(state){
    //     if( this.getPos() === -1 || !this.txtState) return;
    //     this.txtState.visible = true;
    //     switch(state){
    //         case 'eXiaZhu':
    //             this.txtState.text = '下注'; break;
    //         case 'eJiaZhu':
    //             this.txtState.text = '加注'; break;
    //         case 'eGenZhu':
    //             this.txtState.text = '跟注'; break;
    //         case 'eGuoPai':
    //             this.txtState.text = '过牌'; break;   
    //         case 'eSiKao':
    //             this.txtState.text = '思考'; break;   
    //         case 'eAllIn':
    //             this.txtState.text = 'ALL IN';break;
    //         default:
    //             break;     
    //     }
    // }
    // //做余额的滚动效果
    // __proto.rollMoney = function(){
    //     if(!this._labelMoney || this._tempMoney.length == 0 || this._speedUpdate == 0) return;
    //     var target = this._tempMoney[0];
    //     var nowValue = Math.ceil(this._speedUpdate + this._preMoney);
    //     if((this._speedUpdate < 0 && nowValue <= target) ||
    //         (this._speedUpdate > 0 && nowValue >= target)){
    //         this._labelMoney.text = '￥'+ Tools.getInstance().ChangeUIShow(target);
    //         this._preMoney = target;
    //         this._tempMoney.splice(0,1);
    //         this.checkPlayerRollMoney();
    //     }
    //     else {
    //         this._labelMoney.text = '￥'+ Tools.getInstance().ChangeUIShow(nowValue);
    //         this._preMoney = nowValue;
    //     }
    // }

    // __proto.registerListener = function(){
    //     MessageCallbackPro.addCallbackFunc( EventType.Type.playerMoneyRoll,this.checkPlayerRollMoney,this );
    // }
    // __proto.removeListener = function(){
    //     MessageCallbackPro.removeCallbackFunc( EventType.Type.playerMoneyRoll,this.checkPlayerRollMoney,this);
    // }

    // /**
    //  * 创建一张卡牌
    //  */
    // __proto.createObj = function( _key )
    // {
    //     var t_node = null;
    //     t_node = laya.utils.Pool.getItem(_key);
    //     if( t_node === null )
    //     {
    //         switch( _key )
    //         {
    //             case 'card':
    //                 t_node = new Card();
    //                 t_node.zOrder = 0;
    //                 break;
    //             case 'jetton':
    //                 t_node = new Jetton();
    //                 t_node.zOrder = 0;
    //                 break;
    //             case 'cardForm':
    //                 t_node = new CardForm();
    //                 t_node.zOrder = 5;
    //                 break;        
    //         }
    //     }
        
    //     t_node.scale(1,1);
    //     //t_node.zOrder = 0;
    //     t_node.visible = true;
    //     t_node.rotation = 0;
    //     Tween.clearAll(t_node);
    //     return t_node; 
    // }

    // /**
    //  * 隐藏说话泡泡
    //  */
    // __proto.hideTalk = function()
    // {
    //     this.Speak.visible = false;
    // }
    
    // /**
    //  * 倒计时消失
    //  */
    // __proto.hideCountdown = function()
    // {
    //     if( !this.countdown || !this.countdown.visible )
    //         return;
    //     this.countdown.stop();
    // }
    
    // //倒计时结束
    // __proto.countdownFinish = function()
    // {
    //     this.countdown.visible = false; 
    // }

    // //检查是否还有需要滚动的金额
    // __proto.checkPlayerRollMoney = function(){
    //     if( !this._labelMoney || this._tempMoney.length == 0) return;
    //     this.isUpdate = true;
    //     //每帧需要递增的数额（可能为负数）,在60帧内完成
    //     this._speedUpdate = (this._tempMoney[0] - this._preMoney) / 60;
    // }
    // //设置玩家金钱
    // __proto.setPlayerMoney = function( money ){
    //     this._preMoney = this.playerMoney;
    //     var gData = GameData.getInstance();
    //     this.playerMoney = money;
    //     if(this.isLocalPlayer){
    //         User.getInstance().SetGameMoney(money);
    //     }
    //     //当money为非数值时，特殊处理
    //     if(!(parseInt(money)) && this._labelMoney){
    //         this._labelMoney.text = '￥'+Tools.getInstance().ChangeUIShow(money);
    //         return;
    //     }        
    //     if(gData.lockPlayerMoney){
    //         this._tempMoney.push(money);
    //     }
    //     else{
    //         if( this._labelMoney ){
    //             this._labelMoney.text = '￥'+Tools.getInstance().ChangeUIShow(money);
    //         }
    //     }
    // }
    // __proto.getPlayerUIMoney = function(){
    //     return this._labelMoney.text;
    // }
    // //设置玩家VIP等级
    // __proto.setVip = function(level){
    //     if(!this._imgVIP) return;
    //     this._imgVIP.dataSource = {skin:'vip/vip'+level+'.png'};
    //     this._imgVIP.visible = true;
    // }
    // //设置玩家名字
    // __proto.setPlayerName = function( playerName ){
    //     this.playerName = playerName;
    //     if(playerName == null || playerName == undefined || !this._lblName) return;
    //     this._lblName.text = this.getPlayerName();
    // }
    // __proto.getPlayerName = function(){
    //         return this.isLocalPlayer ? Tools.getInstance().GetLocalPlayerUIName() : Tools.getInstance().GetPlayerName(this.playerName);
    // }
    // //显示断线标识
    // __proto.showDisconnect = function( discTime ){
    //     if( this.isLocalPlayer ) return;
    //     this._bDisconnect = true;
    //     this.hideCountdown();
    //     this._boxDisconnect.visible = true;
        
    //     Laya.timer.loop(35, this, this.disconnectLoading);
        
    //     var clock = this._boxDisconnect.getChildByName('clock');
    //     if(!clock) return;
    //     clock.visible = true;
    //     if(this.txtState) this.txtState.visible = false;
    //     var clockParam = 
    //     {
    //         timeAction : discTime,
    //         timeTotal : GameData.getInstance().discTime,
    //         callback : function(){
    //             this._boxDisconnect.visible = false;
    //             if(this.txtState) this.txtState.visible = true;
    //         },
    //         targetObj : this,
    //         color : GameData.getInstance().COLOR.RED
    //     }
    //     // clock.startTimer( discTime,function(){
    //     //     this._boxDisconnect.visible = false;
    //     //     if(this.txtState) this.txtState.visible = true;
    //     // },this,null,false,null,GameData.getInstance().COLOR.RED,GameData.getInstance().discTime - discTime);
    //     clock.startTimer(clockParam);
    // }
    // //隐藏断线标识
    // __proto.hideDisconnect = function(){
    //     //自己没有断线重连的显示
    //     if( this.isLocalPlayer || !this._boxDisconnect ) return;
    //     this._bDisconnect = false;
    //     this._boxDisconnect.visible = false;
    //     Laya.timer.clear(this,this.disconnectLoading);
    //     this._imgLoading.rotation = 0;
    //     var clock = this._boxDisconnect.getChildByName('clock');
    //     if(clock) clock.stop();        
    // }
    // __proto.disconnectLoading = function(){
    //     if( this.isLocalPlayer || !this._imgLoading ) return;
    //     this._imgLoading.rotation += 10;
    // }
    return BasePlayerView;
})(laya.ui.Box);
