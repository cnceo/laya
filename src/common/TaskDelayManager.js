/**
 * 延迟任务管理
 * huangfei 2016 05 13
 */
var TaskDelayManager = (function()
{
    function _TaskDelayManager()
    {
        //任务列表
        this.taskList = [];
        /**
         * 
         */
        this.tick = function( dt )
        {
            for( var i = 0;i < this.taskList.length; )
            {
                var task = this.taskList[i];
                task.leftTime -= dt;
                if( task.leftTime <= 0 )
                {   
                    this.taskList[ i ] = null;
                    this.taskList.splice(i,1);
                    task.done();
                    task = null;
                }else
                {
                    i++;
                }
            }
        }
        
        /**
         * 添加一个延迟任务 返回添加的索引位置 
         */
        this.addTask = function( _taskDelay )
        {
            this.taskList.push( _taskDelay );
            return this.taskList.length - 1;
        }
        
        /**
         * 删除一个延迟任务
         */
        this.removeTask = function( _task )
        {
            for(var i = 0;i < this.taskList.length;i++)
            {
                if( _task === this.taskList[i] )
                {
                    this.taskList.splice(i,1);
                    return;
                }
            }
        }

        /**
         * 删除目标上所有的task
         */
        this.clearTarget = function( _target )
        {
            for(var i = 0;i < this.taskList.length;)
            {
                if( this.taskList[i].classObj === _target )
                {
                    this.taskList[ i ] = null;
                    this.taskList.splice(i,1);
                }else
                {
                    i++;
                }
            }
        }

        /**
         * 
         */
        this.clear = function()
        {
            var index = 0;
            while( index < this.taskList.length )
            {
                var task = this.taskList[ index ];
                if( task.forceRetain )
                {
                    index++;
                    continue;
                }
                (task.forceExecute) && ( task.done() );
                task = null;
                this.taskList[ index ] = null;
                this.taskList.splice(index,1);
            } 
        }
    }
    
    //单例实例 
    var instance; 
    //返回对象 
    return { 
        name: '_TaskDelayManager', 

        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _TaskDelayManager(); 
            } 
            return instance; 
        } 
    }; 
    
})();
