/**
 * 对象创建工厂
 */
var Factory = (function()
{
    function _Factory()
    {
        //创建对象
        this.createObj = function(_key,_class)
        {
            var t_node = null;
            t_node = laya.utils.Pool.getItem(_key);
            t_node = t_node == null ? new _class() : t_node;
            t_node.scale(1,1);
            t_node.visible = true;
            t_node.rotation = 0;
            return t_node; 
        }
    }
    
        //单例实例 
    var instance; 
    //返回对象 
    return { 
        name: '_Factory', 

        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _Factory(); 
            } 
            return instance; 
        } 
    }; 
})();