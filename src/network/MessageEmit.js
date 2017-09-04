MessageCallbackPro = (function() {
    
    var callBackMap = new Map( true );
    
    //添加一个消息回调
    function addCallbackFunc(key,callback,obj) 
    {
        if( check(key,obj) )
            return false;
        callBackMap.Insert( key,{callback:callback,obj:obj} );
        return true;
    }

    //检查是否相同的对象监听了相同消息
    function check(key, obj )
    {
        var data = find( key );
        if( data )
        {
            for( var i = 0;i < data.length;i++ )
            {
                var t_callBack = data[i];
                if( t_callBack.obj === obj )
                    return true;
            }
        }
        return false;
    }
    
    //删除回调函数
    function removeCallbackFunc(key,value)
    {
        callBackMap.Remove( key, value);
    }
    
    //查找某个消息 是否有监听
    function find( key )
    {
        return callBackMap.Find( key );
    }
    
     //分发消息
    function messageEmit(key,data)  
    {
        var t_callBackList = callBackMap.Find( key );
        if( t_callBackList === null )
        {
            //CLog.log('ERROR messageEmit key = '+ key +'not find');
            return;
        }
        for( var i = 0;i < t_callBackList.length;i++ )
        {
            var t_callBack = t_callBackList[i];
            t_callBack && t_callBack.callback.call(t_callBack.obj,data);
        }
    }
    
    // 通过返回命名空间对象将API导出
    return {
        addCallbackFunc: addCallbackFunc,
        removeCallbackFunc: removeCallbackFunc,
        find: find,
        messageEmit: messageEmit,
    };
})();