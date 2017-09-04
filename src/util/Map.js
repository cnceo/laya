    function Map( isArray ) 
    {
        this.IsArray = arguments[0] || false;
        this.data = {};
        
        //var _proto = Map.prototype;
    
        //插入一个数据
        this.Insert = function (key,vaule)
        {
            if( this.data[key] === undefined )  
            {
                if( this.IsArray )
                {
                    var funcList = [];
                    funcList.push( vaule );
                    this.data[key] = funcList;
                }else
                {
                    this.data[key] = vaule;
                }
            }else 
            {
                if( this.IsArray )
                {
                    this.data[key].push( vaule );
                }else
                {
                    this.data[key] = vaule;
                }
            }
            return true;
        }

        // 删除一个数据
        this.Remove = function ( key ,value) 
        {
            if( this.data[key] != undefined )  
            {   
                if( this.IsArray )
                {
                    var messList = this.data[key];
                    for( var i = 0; i < messList.length;i++ )
                    {
                        if( messList[i].obj === value || messList[i].callback === value )
                        {
                            messList.splice(i,1);
                            if( messList.length === 0 )
                            {
                                delete this.data[key];
                            }
                            return true;
                        }
                    }
                }else
                {
                        delete this.data[key];
                }  
                return true;   
            }else
            {
                //CLog.log('$$$$$$$$$$$$$$$$$$$$key = ' + key + ' not found');    
                return false;
            }
        }

        //查找
        this.Find = function ( key )
        {
            if( this.data[key] != undefined )  
            {  
                return this.data[key];
            }
            return null;
        }

        //修改 修改时请注意value的类型 一般数值OR数组
        this.Modify = function (key,value) 
        {
            if( this.data[key] != undefined )  
            { 
                this.data[key] = value;
                return true;
            }else
            {
                //CLog.log('$$$$$$$$$$$$$$$$$$$$key = ' + key + 'not found');
                return false;    
            }
        }

        // //清除所有元素
        this.clear = function () 
        {
            for( var key in this.data )
            {
                delete this.data[ key ];
            }
        }
    }
    
    