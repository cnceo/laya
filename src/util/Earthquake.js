/*
* name;
*/
var Earthquake = (function()
{
    function _Earthquake()
    {
        //console.log('lllllllllllllllllll');
        /** 
        * 参数 
        */ 
        this._timer; 
        this._displayObject; 
        this._originalX; 
        this._originalY; 
        this._intensity; 
        this._intensityOffset; 
        /** 
         * 时间 
         */ 
        this._seconds; 
        /** 
         * 方向 
         */ 
        this.LEFT_RIGHT_UP_DOWN = 0; 
        this.LEFT_RIGHT = 1; 
        this.UP_DOWN = 2; 
        /** 
         * 帧频 
         */ 
        this.FRAME_RATE = 60; 
        /** 
         * 方向 
         */ 
        this._direction; 
        /** 
         * 震动中 
         */ 
        this._bShaking = false; 
        /** 
         * 是否自动销毁 
         */ 
        this._bDestroy = false; 
        this._totalUpdates = 0;
        this.currentCount = 0;

        /** 
          * 对一个显示对象应用地震效果。 
          * @param  displayObject 抖动对象 
          * @param  intensity 强度 
          * @param  seconds 持续时间 秒 
          * @param  direction 方向 
          * @param  autoDestroy 自动销毁 
          */ 
        this.Earthquake = function (displayObject, intensity, seconds, direction, autoDestroy) 
        { 
            this._displayObject = displayObject; 
            this._originalX = displayObject.x; 
            this._originalY = displayObject.y; 
            this._intensity = intensity; 
            this._intensityOffset = intensity / 2; 
            this._seconds = seconds; 
            this._direction = direction; 
            this._bDestroy = autoDestroy; 
            this.currentCount = 0;
        } 
        /** 
         * 开始后抖动 
         */ 
        this.go = function () 
        { 
            if (this._bShaking) 
                return; 
            this._bShaking = true; 
            var msPerUpdate  = parseInt(1000 / this.FRAME_RATE); 
            this._totalUpdates = parseInt(this._seconds * 1000 / msPerUpdate); 
              
            if ( !this._timer ) 
            { 
                this._timer = new laya.utils.Timer();
                this._timer.loop(msPerUpdate,this,this.quake);
            } 
            else 
            { 
                this._displayObject.x = this._originalX; 
                this._displayObject.y = this._originalY; 
                // this._timer.reset(); 
                this._timer.loop(msPerUpdate,this,this.quake);
            } 
            //this._timer.start(); 
        } 
        /** 
         * 抖动 
         * @param   event 
         */ 
        this.quake = function ( event )
        { 
            this.currentCount++;
            if( this.currentCount > this._totalUpdates )
            {
                this.resetImage();
                return;
            }
            var newX = this._originalX; 
            var newY = this._originalY; 
              
            switch(this._direction) 
            { 
                case this.LEFT_RIGHT_UP_DOWN: 
                    newX = this._originalX + Math.random() * this._intensity - this._intensityOffset; 
                    newY = this._originalY + Math.random() * this._intensity - this._intensityOffset; 
                    break; 
                case this.LEFT_RIGHT: 
                    newX = this._originalX + Math.random() * this._intensity - this._intensityOffset; 
                    break; 
                case this.UP_DOWN: 
                    newY = this._originalY + Math.random() * this._intensity - this._intensityOffset; 
                    break; 
            } 
            this._displayObject.x = newX; 
            this._displayObject.y = newY; 
        } 
        /** 
         * 重置 
         * @param   event 
         */ 
        this.resetImage = function ( event ) 
        { 
            this._displayObject.x = this._originalX; 
            this._displayObject.y = this._originalY; 
            this.cleanup(); 
        } 
        /** 
         * 清除 
         */ 
        this.cleanup = function()
        { 
            this._bShaking = false; 
            this._timer.clear(this,this.quake);
            this.currentCount = 0;
            if (this._bDestroy) 
            { 
                this._timer.clear(this,this.quake);
                this._timer = null; 
                this._displayObject = null; 
            } 
        } 
    }
    
        //单例实例 
    var instance; 
    //返回对象 
    return { 
        name: '_Earthquake', 

        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _Earthquake(); 
            } 
            return instance; 
        } 
    }; 
})();