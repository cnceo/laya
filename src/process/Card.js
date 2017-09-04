/**
 * 卡牌类
 */
var Card = (function (_super){
	function Card()
    {
        this._num = 0;
        this._type = '';
        this._pos = -1;
        this._handoutTask = null;
        this._animation = null;
        this._playSound = true;

        Card.__super.call(this);
       
        this.update = function ()
        {
            if( !this.isUpdate )
                return;
            if( 'BTS' === this.flipMode )
            {
                if( this.flipStep <= 0  )
                {
                    this.flipMode = '';
                    this.isUpdate = false;
                    if( this.callBack != null )
                    {
                        this.callBack.call(this.classObj);
                        this.callBack = null;
                        this.classObj = null;
                    }
                    return;
                }

                this.flipStep--;
                this.scaleX = this.scaleSpeed * this.flipStep;
            }else if( 'STB' === this.flipMode )
            {
                if( this.flipStep > 10  )
                {
                    this.flipMode = '';
                    this.isUpdate = false;
                    if( this.callBack != null )
                    {
                        this.callBack.call(this.classObj);
                        this.callBack = null;
                        this.classObj = null;
                    }
                    return;
                }
                this.flipStep++;
                this.scaleX = this.scaleSpeed * this.flipStep;
            }
            else if( 'BTSTB' === this.flipMode )
            {
                if( this.flipStep <= 0  )
                {
                    this.flipMode = 'STB';
                    var cardName = "card/card_" + this._type.toLowerCase() + 's_'+ this._num+".png";
                    this.setImage(cardName);
                    return;
                }

                this.flipStep--;
                this.scaleX = this.scaleSpeed * this.flipStep;
            }
        }
        //Game.getInstance().addUpdate( {callback:this.update,caller:this} ); 
    }

    Laya.class(Card,"Card",_super);//需要先声明，注意此处的位置
    var __proto = Card.prototype;    
    __proto.init = function(){
        this._num = 0;
        this._type = '';
        this._pos = -1;
        this._handoutTask = null;
        this._animation = null;
        this._playSound = true;
        this.zOrder = 0;
        this.rotation = 0;
        this.visible = true;
        Tween.clearAll(this);
        Game.getInstance().addUpdate( {callback:this.update,caller:this} ); 
    }
    __proto.setPlaySound = function(_playSound){
        this._playSound = _playSound;
    }
    __proto.getPlaySound = function(){
        return this._playSound;
    }
    __proto.setNum = function(num){
        this._num = parseInt(num);
    }
    __proto.getNum = function(){
        return this._num;
    }
    __proto.setType = function(type){
        this._type = type;
    }
    __proto.getType = function(){
        return this._type;
    }
    __proto.setPos = function(pos){
        if(isNaN(parseInt(pos))) return;
        this._pos = pos;
    }
    __proto.getPos = function(){
        return this._pos;
    }
    __proto.setImage = function( _path )
    {
        this.path = _path;
        var t_res = Laya.loader.getRes( _path );
        if( t_res === null || t_res === undefined)
        {
            CLog.log(_path + ' resources not find ');
            return;
        }
        this.graphics.clear();
        this.graphics.drawTexture(t_res, 0, 0);
        this.size(t_res.width, t_res.height);
        
        this.pivotX = t_res.width >> 1;
    }
    __proto.initEffect = function()
    {
        if( this._animation )
            return;
        this._animation = new Effect();
        this._animation.init("res/atlas/cardEfect.json",20,false);
        this.addChild( this._animation );
        this._animation.pivotX = 6;
        this._animation.pivotY = 8;
        this._animation.visible = false;
        this._animation.scaleX = this._animation.scaleY = 1.8;    
    }

    //特效
    __proto.showLight = function()
    {
        this.initEffect();
        this._animation.visible = true;
        this._animation.play(); 
    }
    __proto.reset = function(){
        this._num = 0;
        this._type = '';
        this._pos = -1;
        this.isUpdate = false;
        if(this._handoutTask != null){
            TaskDelayManager.getInstance().removeTask(this._handoutTask);
            this._handoutTask = null;
        }
        this.dealHandOutTween  = null;
        this.baseCardMoveTween = null;
        this.moveCardTween = null;
        Laya.timer.clearAll(this);
        Tween.clearAll(this);
        Game.getInstance().removeUpdate(this);
    }
    // __proto.onRelease = function(){
    //     Laya.timer.clearAll(this);
    //     Tween.clearAll(this);
    //     Game.getInstance().removeUpdate(this);
    // }

    /**
     * 发牌的移动
     * moveToPos 移动到的位置
     * delayTime 延迟多久移动
     */
    __proto.dealHandOut = function()
    {
        this._playSound && SoundManager.playSound('audio/card.mp3');
        if( !this.lastCard ) 
        {
            if( this.dealHandOutTween )
            {
                this.dealHandOutTween.complete();
                this.dealHandOutTween = null;
            }
            this.dealHandOutTween = Tween.to(this,
            {
                x: this.cardMoveEndPos.x,
                y: this.cardMoveEndPos.y,
                scaleX: this.cardEndScale,
                scaleY: this.cardEndScale,
            }, this.moveDuration,null,Handler.create(this, function()
            {
                 this.dealHandOutTween = null; 
            })); 
        }else
        {
            Tween.to(this,
            {
                x: this.cardMoveEndPos.x,
                y: this.cardMoveEndPos.y,
                scaleX: this.cardEndScale,
                scaleY: this.cardEndScale,
            }, this.moveDuration,null,Handler.create(this, this.callComplete)); 
        }
    }

    //底牌的移动
    __proto.baseCardMove = function()
    {
        this.baseCardMoveTween = Tween.to(this,
        {
            y: this.cardMoveEndPos.y,
        }, this.moveDuration,null,Handler.create(this, function()
        { 
            this.baseCardMoveTween = null; 
        }),1000); 
    }

    //发牌
    __proto.handout = function(){
        //是否做分发动作
        if( this.isFly ){
            this.scale(0,0);
            this._handoutTask = new TaskDelay();
            this._handoutTask.data = null;
            this._handoutTask.callBack = this.dealHandOut;
            this._handoutTask.classObj = this;
            this._handoutTask.leftTime = this.delayTime;
            TaskDelayManager.getInstance().addTask( this._handoutTask );
        }else
        {
            this.pos( this.cardMoveEndPos.x,this.cardMoveEndPos.y );
            this.scale(this.cardEndScale,this.cardEndScale);
        }
    }
   
    /**
     * 只是移动
     */
    __proto.moveCard = function(data)
    {
        if( this.dealHandOutTween )
        {
            this.dealHandOutTween.complete();
            this.dealHandOutTween = null;
        }

        if( this.moveCardTween )
        {
            this.moveCardTween.complete();
            this.moveCardTween = null;
        }

        this.moveCardTween = Tween.to(this,
        {
            x: this.x - data.pos,
            y: this.y,
        }, data.moveDuration,null,Handler.create(this,this.moveCardTweenComplete));
    }

    __proto.moveCardTweenComplete = function()
    {
        this.moveCardTween = null;
    }

    /**
     * 翻转卡牌
     * mode 翻转的模式 大到小 还是小到大
     * 
     */
    __proto.flipCard = function( mode,callBack,classObj )
    {
        this.flipMode = mode;
        this.callBack = callBack;
        this.classObj = classObj;
        this.scale(this.cardEndScale,this.cardEndScale);
        
        //大到小
        if( 'BTS' === mode || 'BTSTB' === mode)
        {
            this.flipStep = 10;
            this.scaleX = 0.1;
            this.scaleSpeed = this.cardEndScale / this.flipStep;
        }else if( 'STB'=== mode )
        {
            this.flipStep = 0;
            this.scaleX = 0;
            this.scaleSpeed = this.cardEndScale / 10;
        }
        this.visible = true;
        this.isUpdate = true;
    }
    
    __proto.callComplete = function()
    {
        if( this.callBackObj === null || this.callBackObj.callBack === null ||
            this.callBackObj === undefined || this.callBackObj.callBack === undefined)
            return;
        this.callBackObj.callBack.call( this.callBackObj.targetObj );
        this.callBackObj.callBack  = null;
        this.callBackObj.targetObj = null;
        this.callBackObj = null;
    }  

    return Card;
})(Sprite);

