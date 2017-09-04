StatePool = (function() {
    var Pool = new Map( false );
    //添加一个状态
    function put( state )
    {
        Pool.Insert( state,state );
        //CLog.log("<<<<<<<<< 添加一个状态:"+state+"  <<<<<<<<<<<<<");
    }
    //是否有某一状态
    function hasState(state) {
        return Pool.Find(state) != null;
    }
    //删除一个状态
    function remove( state )
    {
        //CLog.log("<<<<<<<<< 删除状态:"+state+"  <<<<<<<<<<<<<");
        Pool.Remove( state );
    }
    
    //状态的处理
    function stateProcess( state )
    {
        if( NetManager.GameClintInstance )
        {
            if( NetManager.GameClintInstance instanceof FightLandlordClient )
            {
                NetManager.GameClintInstance[ 'CG_FIGHTLANDLORD_COMPLETE_ROOM_STATE_NTF' ](state);
            }else
            {
                NetManager.GameClintInstance[ 'CG_COMPLETE_ROOM_STATE_NTF' ](state);
            }
        }
        remove( state );       
    }
    
    //清除所有状态
    function clearAllState(bSendNTF)
    {
        //CLog.log("<<<<<<<<<<<<<<<<< 清除所有状态");
        if( !NetManager.GameClintInstance )
            return;
        if(bSendNTF){
            for( var key in Pool.data )
            {
                //CLog.log("... key:"+key);
                if( NetManager.GameClintInstance instanceof FightLandlordClient )
                {
                    NetManager.GameClintInstance[ 'CG_FIGHTLANDLORD_COMPLETE_ROOM_STATE_NTF' ](key);
                }else
                {
                    NetManager.GameClintInstance[ 'CG_COMPLETE_ROOM_STATE_NTF' ](key);
                }

            }
        }
        Pool.clear();
    }
    
        // 通过返回命名空间对象将API导出
    return {
        put: put,
        remove: remove,
        stateProcess: stateProcess,
        clearAllState: clearAllState,
        hasState : hasState,
    };
    
})();