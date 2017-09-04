/**
 * huangandfly
 * 计时器类 2016 07 14
 */
var Countdown = (function (_super){
    
	function Countdown(){
		Countdown.__super.call(this);
        
        this.TotalTime = 0;
        this.isUpdate = false;
        this._arrWarningTk = null;        
        
        //开始计时
        //time 倒计时总时长，callback 回调函数 targetObj 回调目标,playAudio 发出警告铃声的时间点(数组), playTick,滴答声,warningTk 发出警告事件的时间点(数组)
        this.startTimer = function( time ,callback,targetObj,playAudio,playTick,warningTk)
        {
            this.timeCount = this.TotalTime = time;
            this.callback  = callback;
            this.targetObj = targetObj;
            this.playTick = playTick;
            this._arrWarningTk = warningTk;
            this.isUpdate = true;
            this.playAudio = playAudio;
            this.TotalTimeCopy = this.TotalTime;
            this.txt = this.getChildByName('txt');
            this.bg = this.getChildByName('bg');
            this.txt.text = Math.ceil( this.TotalTime / 1000 );
        }
        
        //设置文本
        this.setTxt = function( _txt )
        {
            if(!this.txt){
                this.txt = this.getChildByName('txt');
            }
            this.txt.text = _txt;          
        }
        //停止计时器（忽视回调）
        this.stopInDirect = function(){
            this.callback = null;
            this.targetObj = null;
            this.isUpdate = false;
            this.active = false;
        }
        /**
         * 停止计时器 回调也会调用
         */
        this.stop = function()
        {
            this.isUpdate = false;
            this.active = false;
            if( this.callback !== null && this.callback !== undefined )
            {
                this.callback.call( this.targetObj );
                this.callback = null;
                this.targetObj = null;
            }
        }
        
        // called every frame, uncomment this function to activate update callback
        this.update = function (dt)
        {
            if( !this.isUpdate )
                return;       
            // var date = new Date();
            // this.TotalTime -= (date.getTime() - this.time);
            // this.time = date.getTime();
            // (this.TotalTime <= 0) && this.stop();
            // if( (this.TotalTimeCopy - this.TotalTime >= 1000) && this.playTick){
            //     SoundManager.playSound("audio/time.mp3");
            //     this.playSound( Math.ceil( this.TotalTime / 1000 ) );
            //     this.TotalTimeCopy = this.TotalTime;
            // }
            // var time = Math.ceil( this.TotalTime / 1000 );
            // this.txt.text = time;
            this.TotalTime -= dt;
            (this.TotalTime <= 0) && this.stop();
            if( (this.TotalTimeCopy - this.TotalTime >= 1000) && this.playTick){
                SoundManager.playSound("audio/time.mp3");
                this.playSound( Math.ceil( this.TotalTime / 1000 ) );
                this.TotalTimeCopy = this.TotalTime;
            }
            var time = Math.ceil( this.TotalTime / 1000 );
            this.txt.text = time; 
        }       
        
        /**
         *播放音效
        */
        this.playSound = function(time)
        {
            if( this.playAudio !== null && this.playAudio != undefined)
            {
                for( var i = 0;i < this.playAudio.length;i++ )
                {
                    if( time === this.playAudio[i] )
                    {
                        SoundManager.playSound("audio/urge.mp3");
                        break;
                    }
                }
            }
            if( this._arrWarningTk !== null && this._arrWarningTk != undefined) {
                for( var i = 0;i < this._arrWarningTk.length;i++ ){
                    if( time === this._arrWarningTk[i] ){
                        MessageCallbackPro.messageEmit(EventType.Type.countdownWarning,time);
                        break;
                    }
                }
            }
        }
        this.onRelease = function(){
            Game.getInstance().removeUpdate(this);
        }
        
        Game.getInstance().addUpdate( {callback:this.update,caller:this} );        
    }
	Laya.class(Countdown,"Countdown",_super);
    
    return Countdown;
})(laya.ui.Box);


/**
 * 矩形倒计时 2017 03 06
 */
var CountdownRect = (function (_super){
    
	function CountdownRect(){
		CountdownRect.__super.call(this);
        
        this.timeAction = 0;
        this.isUpdate = false;
        this._arrWarningTk = null;
        this._w = 0;
        this._h = 0;
        this._v = 0;
        this._t1 = this.t2 = this.t3 =0;
        this._direct = 0;
        this._timeTotal = 30000;
        
        //设置开始划线的点，从左上角顺时针开始依次为0，1，2，3
        this.setDirection = function(d){
            this._direct = d;
        }
        /**
         * 
         * @param timeAction 倒计时剩余时长(必须)
         * @param timeTotal 倒计时总时长(必须)
         * @param callback 回调函数
         * @param targetObj 回调目标
         * @param playAudio 发出警告铃声的时间点(数组), 
         * @param playTick 滴答声
         * @param warningTk 发出警告事件的时间点(数组)
         * @param color:线条的颜色 默认黄色
         */
        //this.startTimer = function( time ,callback,targetObj,playAudio,playTick,warningTk,color,preTime)
        this.startTimer = function(param)
        {
            if(!param.hasOwnProperty("timeAction") || param.timeAction <= 0) return;
            if(!param.hasOwnProperty("timeTotal") || param.timeTotal - param.timeAction < 0) return;
            this.timeAction = param.timeAction;
            this._timeTotal = param.timeTotal;
            this._w = this.width;
            this._h = this.height;
            this.callback  = param.callback;
            this.targetObj = param.targetObj;
            this.playTick = param.playTick || false;
            this._arrWarningTk = param.warningTk;
            this.isUpdate = true;
            this.playAudio = param.playAudio;
            this.timeActionCopy = this.timeAction;
            this.color = param.color ? param.color : GameData.getInstance().COLOR.YELLOW;   

            //总时间（固定值）
            //var T = Tools.getInstance().GetGameCountDown();
            this._v = 2 * (this._w + this._h) / this._timeTotal;
            //走完垂直方向上一条边需要花费的时间
            this.t1 = this._h / this._v;
            //走完水平方向上一条边所需要的时间
            this.t2 = this._w / this._v;         
        }        
        //停止计时器（忽视回调）
        this.stopInDirect = function(){
            this.callback = null;
            this.targetObj = null;
            this.isUpdate = false;
            this.active = false;
        }
        /**
         * 停止计时器 回调也会调用
         */
        this.stop = function()
        {
            this.isUpdate = false;
            this.active = false;
            if( this.callback !== null && this.callback !== undefined )
            {
                this.callback.call( this.targetObj );
                this.callback = null;
                this.targetObj = null;
            }
        }        
        this.update = function (dt)
        {
            if( !this.isUpdate )
                return;
            this.timeAction -= dt;
            (this.timeAction <= 0) && this.stop();
            this.applayFilter(dt);
            if( (this.timeActionCopy - this.timeAction >= 1000) && this.playTick){
                SoundManager.playSound("audio/time.mp3");
                this.playSound( Math.ceil( this.timeAction / 1000 ) );
                this.timeActionCopy = this.timeAction;
            }
        }
        this.applayFilter = function(dt){
            if(!this.b){
                //矩形的四个顶点
                this.p1 = new Point(0,0);
                this.p2 = new Point(0,this._h);
                this.p3 = new Point(this._w,this._h);
                this.p4 = new Point(this._w,0);
                // //总时间（固定值）
                // //var T = Tools.getInstance().GetGameCountDown();
                // this._v = 2 * (this._w + this._h) / this._timeTotal;
                // //走完垂直方向上一条边需要花费的时间
                // this.t1 = this._h / this._v;
                // //走完水平方向上一条边所需要的时间
                // this.t2 = this._w / this._v;
                this.b = new Sprite();
                this.addChild(this.b);
            }
            var delta = this._timeTotal - this.timeAction;
            this.b.graphics.clear();
            var arr = this.getPoinArr(delta);
            if(arr && arr.length != 0){
                this.b.graphics.drawLines(0,0,arr,this.color,4);
            }
        }
        this.getPoinArr = function(delta){
            var arr = [];
            switch(this._direct){
                case 0:
                    {
                        //矩形上水平边
                        if(delta < this.t2){
                            arr = [delta * this._v,this.p1.y,this.p4.x,this.p4.y,this.p3.x,this.p3.y,this.p2.x,this.p2.y,this.p1.x,this.p1.y];
                        }
                        //矩形右垂直边
                        else if(this.t2 <= delta && delta < this.t1 + this.t2){
                            arr = [this._w,this._v * (delta - this.t2),this.p3.x,this.p3.y,this.p2.x,this.p2.y,this.p1.x,this.p1.y];
                        }
                        //矩形下水平边
                        else if(this.t1 + this.t2 <= delta && delta < 2*this.t2 + this.t1){
                            arr = [this._w - this._v * (delta - this.t1 - this.t2),this._h,this.p2.x,this.p2.y,this.p1.x,this.p1.y];
                        }
                        //矩形左垂直边
                        else if(2*this.t2 + this.t1 <= delta && delta <= 2*this.t2 + 2*this.t1){
                            arr = [this.p1.x,this._h - this._v * (delta - 2 * this.t2 - this.t1),this.p1.x,this.p1.y];
                        }
                        else{
                        }
                    }
                    break;
                case 1:
                    {
                        //矩形右垂直边
                        if(delta < this.t1){
                            arr = [this._w,delta * this._v,this.p3.x,this.p3.y,this.p2.x,this.p2.y,this.p1.x,this.p1.y,this.p4.x,this.p4.y];
                        }
                        //矩形下水平边
                        else if(this.t1 <= delta && delta < this.t1 + this.t2){
                            arr = [this._w - this._v * (delta - this.t1),this._h,this.p2.x,this.p2.y,this.p1.x,this.p1.y,this.p4.x,this.p4.y];
                        }
                        //矩形左垂直边
                        else if(this.t1 + this.t2 <= delta && delta < 2*this.t1 + this.t2){
                            arr = [this.p1.x,this._h - this._v * (delta - this.t1 - this.t2),this.p1.x,this.p1.y,this.p4.x,this.p4.y];
                        }
                        //矩形上水平边
                        else if(2*this.t1 + this.t2 < delta && delta <= 2*this.t1 + 2*this.t2){
                            arr = [this._v * (delta - 2 * this.t1 - this.t2),this.p1.y,this.p4.x,this.p4.y];
                        }
                        else{
                        }
                    }
                    break;
            }
            return arr;
        }
        
        /**
         *播放音效
        */
        this.playSound = function(time)
        {
            if( this.playAudio !== null && this.playAudio != undefined)
            {
                for( var i = 0;i < this.playAudio.length;i++ )
                {
                    if( time === this.playAudio[i] )
                    {
                        SoundManager.playSound("audio/urge.mp3");
                        break;
                    }
                }
            }
            if( this._arrWarningTk !== null && this._arrWarningTk != undefined) {
                for( var i = 0;i < this._arrWarningTk.length;i++ ){
                    if( time === this._arrWarningTk[i] ){
                        MessageCallbackPro.messageEmit(EventType.Type.countdownWarning,time);
                        break;
                    }
                }
            }
        }
        this.onRelease = function(){
            Game.getInstance().removeUpdate(this);
        }
        Game.getInstance().addUpdate( {callback:this.update,caller:this} );        
    }
	Laya.class(CountdownRect,"CountdownRect",_super);
    
    return CountdownRect;
})(laya.ui.Box);