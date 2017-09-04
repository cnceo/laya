var Byte = laya.utils.Byte;
var URL = laya.net.URL;
/**
 *版本更新管理
 */
var UpdateMgr = (function()
{
    function _UpdateMgr()
    {
        this.mAstDic = {};
		this.completeH = null;
		this.progressH = null;

        this.LoadFile = function( _fname, _complete, _progress )
        {		
            this.completeH = _complete;
            this.progressH = _progress;
            Laya.loader.load( _fname, new Handler( this, this.onComplete),new Handler(this,this.getProgress), Loader.BUFFER );	
            return;
        }
        
        this.onComplete = function( _rdata )
        {
            var _byte = new Byte( _rdata );
            var t_strFileHeader = _byte.readUTFBytes(4);
            
            if ( t_strFileHeader != "fst" )
            {
                //trace("error::fileNameAndSize::onComplete:file header error");
                var hit = new HintMessage("error::fileNameAndSize::onComplete:file header error");
                hit = null;
                return;
            }
            var t_dwVersion = _byte.getUint32();
            if ( t_dwVersion != 100 )
            {
                //trace("error::version error");
                var hit = new HintMessage("error::version error");
                hit = null;
                return;
            }
            
            t_dwVersion = _byte.getUint32();
            var   t_dwHash;
            var   t_dwTime;
            for ( var t_i = 0; t_i < t_dwVersion; t_i++ )
            {
                t_dwHash = _byte.getUint32();
                t_dwTime = _byte.getUint32();
                
                this.mAstDic[t_dwHash] = t_dwTime;
            }

            URL.customFormat = UpdateMgr.customUrl;//重写了引擎URL.customFormat方法，在每次加载文件时都会到这里来校验文件的更新程度			
            if ( this.completeH ) {
                this.completeH.run();
                this.completeH.clear();
            }			
            
        }
        
        this.getProgress = function(v)
        {
            if (this.progressH)
                this.progressH.runWith(v);
        }
        
        /**
         * 文件更新相关，修改服务器请求.
         * @param	_url
         * @param	_bpath
         * @return
         */
        UpdateMgr.customUrl = function( _url, _bpath )
        {	
            if (!_url) return _url;
            var t_res = instance.getFileModtime( _url );
            if ( t_res ) {
                _url = _url + "?" + t_res;
            }
            return _url;

        }
        
        
        this.getFileModtime = function(_str)
        {
            var t_index = _str.indexOf('bin/');
            (t_index >= 0) && (_str = _str.substr(t_index + 4,-1));
            var t_str = _str.toLowerCase();
            var tHash = this.string_hash(t_str);
            return this.mAstDic[tHash];
        }
        
        this.string_hash = function( _str )
        {
            var t_dw = 0;
            var t_iChar = 0;
            for ( var t_i = 0; t_i < _str.length; t_i ++ )
            {
                t_iChar = _str.charCodeAt( t_i );
                t_dw = ((t_dw<<5)-t_dw) + t_iChar ;
            }
            
            // 把有符号整数变为无符号整数：
            t_dw = t_dw >>> 0;
            
            return t_dw;			
        }
    }
   
    
    //单例实例 
    var instance; 
    //返回对象 
    return { 
        name: '_UpdateMgr', 

        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _UpdateMgr(); 
            } 
            return instance; 
        } 
    }; 
})();