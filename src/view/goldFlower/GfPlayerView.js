
 /**
 * 2016 10 27
 * 炸金花玩家类
 */

var GfPlayerView = (function (_super){
	Laya.class(GfPlayerView,"GfPlayerView",_super);
	function GfPlayerView()
    {
		GfPlayerView.__super.call(this);
        this.bSeenCards = false;
        this.compareResult = null;
        this.bLockStateUI = false;//当为true时 并不更新UI
        //比牌按钮
        this.showCompareBtn = function(bShow,obj,callback)
        {
            if(!this.btnCompare) return;
            this.btnCompare.visible = bShow;     
            if(bShow){
                // this._compareCallbackObj = obj;
                // this._compareCallback = callback;                
                this.setChildIndex( this.btnCompare,this.numChildren - 1 );
                this.btnCompare.on( Event.CLICK,obj,callback );
                if(!this.btnCompareAni){
                    this.btnCompareAni = new Effect();
                    this.btnCompareAni.init("res/atlas/gfRoom/pkBtnAnim.json",80,true);
                    this.btnCompare.addChild( this.btnCompareAni );
                    this.btnCompareAni.pivotX = 300 >> 1;
                    this.btnCompareAni.pivotY = 100 >> 1;
                    var imgBg = this.btnCompare.getChildByName('img');
                    this.btnCompareAni.x = imgBg.x ;
                    this.btnCompareAni.y = imgBg.y;
                }
                this.btnCompareAni.visible = true;
                this.btnCompareAni.play();
            }
            else{
                this.btnCompare.off(Event.CLICK,obj,callback);
                if(this.btnCompareAni){
                    this.btnCompareAni.visible = false;
                }
            }
        }
        //比牌获胜
        this.showCompareWin = function(){
            this.compareResult.visible = true;
            var img = this.compareResult.getChildByName('imgResult');
            img.visible = true;
            img.dataSource = {skin:'gfRoom/sheng.png'};
        }
        //比牌获败
        this.showCompareLose = function(){
            this.compareResult.visible = true;
            var img = this.compareResult.getChildByName('imgResult');
            img.visible = true;
            img.dataSource = {skin:'gfRoom/bai.png'};
            this.disabled = true;
        }
        //隐藏卡牌
        this.hideCards = function(){
            for(var i in this.cards){
                if(this.cards[i]) this.cards[i].visible = false;
            }
        }
        //显示卡牌
        this.showCards = function(){
            for(var i in this.cards){
                if(this.cards[i]) this.cards[i].visible = true;
            }
        }
        //展示自己的卡牌
        this.showMyCards = function(cards){
            for(var i in cards){
                if(this.cards[i]){
                    this.cards[i].setNum(cards[i].num);
                    this.cards[i].setType(cards[i].suit);
                    this.cards[i].flipCard('BTSTB');
                }
            }
        }
        //设置是否看过牌
        this.setSeenCards = function(bSeen){
            this.bSeenCards = bSeen;
            var img = this.getChildByName('seenCards');
            if(img) img.visible = bSeen;
            if(bSeen){
                img.play();
            }
            else{
                img.stop();
            }
        }
        //获取是否看过牌
        this.getSeenCards = function(){
            return this.bSeenCards;
        }
        
        //每当发一张牌时
        this.onAddCard = function(){
            if(this.playerState == GameData.getInstance().playerState.Watching){
                //表示该玩家是比牌获输的
                this.disabled = true;
            }
        }
        this.lockStateUI = function(bLock){
            this.bLockStateUI = bLock;
        }
        //更新玩家UI状态
        this.updateUIState = function(){
            if(!this.txtState || this.bLockStateUI) return;
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
            if(this.playerState == GameData.getInstance().playerState.Abandon){
                this.disabled = true;
            }
            else if(this.playerState == GameData.getInstance().playerState.Watching){
                if(this.cards.length != 0){
                    //表示该玩家是比牌获输的
                    this.disabled = true;
                }
            }
        }
    }    
    var __proto = GfPlayerView.prototype;
    //初始化
    __proto.initData = function()
    {
        _super.prototype.initData.call(this);
        this.compareResult = this.getChildByName("compareResult");
        this.seenCards = this.getChildByName('seenCards');
        this.btnCompare = this.getChildByName('btnCompare');
        this.compareResult = this.getChildByName('compareResult');
        this.seenCards.visible = false;
        this.compareResult.visible = false;
        if(this.btnCompare) this.btnCompare.visible = false;
    }
    /**
     * 添加一张牌
     */
    __proto.addCard = function( data,delayTime,moveDuration,lastCard,callBackObj,isFly )
    {
        if(this.getPos() == -1) return;
        this.moveCards(delayTime,moveDuration,isFly);
        var card = data;
        var cardType = '';
        var cardNum = '';
        var cardName = 'back';
        if( card.hasOwnProperty('suit') )
            cardType = card.suit;
        if( card.hasOwnProperty('num') )
            cardNum = card.num;   
        
        cardType !=='' && cardNum !=='' && (cardName = cardType.toLowerCase() +'s_'+ cardNum);
        var t_node   = null;
        
        t_node = this.createObj( 'card' );
        t_node.zOrder = data.cardPos;
        t_node.setNum(cardNum);
        t_node.setType(cardType);
        t_node.setPos(card.cardPos);
        this.addChild( t_node ); 
        if( this.isLocalPlayer )
        {
            this.localPlayerCardSpacing = 35 * this.localPlayerScale;
            t_node.cardMoveEndPos = this.globalToLocal( new Point(((GameData.getInstance().SCENE_WIDTH) >> 1) + 
            this.cards.length * this.localPlayerCardSpacing,630)  );
            t_node.cardEndScale = this.localPlayerScale;
        }else if( this.cardDir == 'RIGHT' )
        {
            t_node.cardMoveEndPos = new Point(this.WIDTH - 95,45);
            t_node.cardEndScale = this.otherPlayerScale;
        }else
        {
            t_node.cardMoveEndPos = new Point( this.cards.length * 30 + 180 ,45 );
            t_node.cardEndScale = this.otherPlayerScale;
        }
        
        t_node.cardMoveEndPos = t_node.cardMoveEndPos;
        t_node.delayTime = delayTime;
        t_node.moveDuration = moveDuration;
        t_node.lastCard = lastCard;
        t_node.callBackObj = callBackObj;
        t_node.isFly = isFly;
        var pos = this.globalToLocal( new Point(this.pokerDealerPos.x,this.pokerDealerPos.y) );
        
        t_node.pos( pos.x,pos.y ); 
        
        t_node.cardNum = cardNum == 1 ? 999 : cardNum;
        this.cards.push( t_node );
        t_node.setImage( "card/card_"+cardName+".png" );
        t_node.handout();
        this.onAddCard();
    }
     /**
     * 弃牌
     */
    __proto.dropCard = function( _isLocalPlayer ){
        this.disabled = true;
    }
    //重置数据
    __proto.reset = function( _isRemove ){
         _super.prototype.reset.call(this,_isRemove);
         this.setSeenCards(false);
         this.lockStateUI(false);
         this.disabled = false;
         this.compareResult.visible = false;
         this.bLockStateUI = false;
    }
    /**
     * 玩家开始行动
     */
    __proto.action = function(){
        _super.prototype.action.call(this);
    }
     //设置玩家状态
    __proto.setPlayerState = function( state ){
        if( this.getPos() === -1 ) return;
        this.playerState = state;
        this.updateUIState();
    }
    //下注CD 显示
    __proto.setCountdown = function( time ){
        if(this.isDisconnect()) return;
        this.countdown.visible = true;
        // var preTime = Tools.getInstance().GetGameCountDown() - time;
        // this.countdown.startTimer(time,this.countdownFinish,this,[8,4],true,[6],GameData.getInstance().COLOR.YELLOW,preTime);
        var tTotal = GFRoomMgr.getInstance().GetCurRoom().GetRoomActionTime();
        var clockParam = 
        {
            timeAction : time,
            timeTotal : tTotal,
            callback : this.countdownFinish,
            targetObj : this,
            playAudio : [8,4],
            playTick : true,
            warningTk : [6],
        }
        this.countdown.startTimer(clockParam);
    }
     /**
     * 显示结果
     */
    __proto.showResult = function(data)
    {
        if(!data.hasOwnProperty('cardForm') || this.cards.length == 0) return;
        if(!this.cardForm){
            this.cardForm = this.createObj( 'cardForm' );
            this.cardForm.scale(0.25,0.25);
            this.parent.addChild( this.cardForm );
        }       
        this.cardForm.initSkin( 'gfRoom/cardForm/'+data.cardForm+'.png',3);
        
        
        if( this.isLocalPlayer )
        {
            var pos = this.parent.globalToLocal( new Point( (Game.getInstance().currentScene.width) >>  1 ,Game.getInstance().currentScene.height -150 ) );
            this.cardForm.x = pos.x;
            this.cardForm.y = pos.y;
        }
        // else if( this.cardDir === 'RIGHT' )
        // {
        //     // this.cardForm.x = 210;
        //     // this.cardForm.y = 125;
        //     var lPos = new Point(210,125);
        //     var gPos = this.localToGlobal(lPos);
        //     var parentLocalPos = this.parent.globalToLocal(gPos);
        //     this.cardForm.x = parentLocalPos.x;
        //     this.cardForm.y = parentLocalPos.y;
        // }else 
        // {
        //     // this.cardForm.x = 200;
        //     // this.cardForm.y = 125;
        //     var lPos = new Point(200,125);
        //     var gPos = this.localToGlobal(lPos);
        //     var parentLocalPos = this.parent.globalToLocal(gPos);
        //     this.cardForm.x = parentLocalPos.x;
        //     this.cardForm.y = parentLocalPos.y;
        // }
        else{
            var lPos = new Point(205,125);
            var gPos = this.localToGlobal(lPos);
            var parentLocalPos = this.parent.globalToLocal(gPos);
            this.cardForm.x = parentLocalPos.x;
            this.cardForm.y = parentLocalPos.y;
        }
        
        SoundTool.getInstance().SpeakGFSounds(data.cardForm);
    }
    //玩家重置
    __proto.clear = function( _isRemove ){
        _super.prototype.clear.call(this,_isRemove);
        var img = this.getChildByName('seenCards');
        if(img){
            img.onDestory();
        }
        var imgR = this.compareResult.getChildByName('imgResult');
        if(imgR) imgR.visible = false;
    }
    return GfPlayerView;
})(PlayerView);


   
