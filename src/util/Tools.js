/**
 *公共方法
 */
var Tools = (function()
{
    function _Tools()
    {        
        this.ExactDigit = 100; //小数点后取两位
        this.ChangeUIShow = function( value )
        {
            if( value == undefined || value == null )
                return 0;
            var str = value.toString();
            var str1 = "";
            if( str.length < 3 )
            {
                str1 = "0.";
                for( var i = 0;i < 2 - str.length;i++ )
                {
                    str1 += '0';
                }
                str1 += str;
            }else
            {
                str1 = str.substring(0,str.length - 2);
                var str2 = str.substring(str.length - 2,str.length);
                str1 += '.';
                str1 += str2;
            }
            return str1;
        }
        //获取玩家操作倒计时
        this.GetGameCountDown = function(){
            var curGameType = GameData.getInstance().curGameType;
            var cd = GameData.getInstance().GameCountDown[curGameType];
            cd = cd ? cd : 30000;
            return cd;
        }
        //设置玩家操作倒计时
        this.SetGameCountDown = function(t){
            var curGameType = GameData.getInstance().curGameType;
            if(GameData.getInstance().GameCountDown[curGameType] != undefined &&
                GameData.getInstance().GameCountDown[curGameType] != null){
                GameData.getInstance().GameCountDown[curGameType] = t;
            }
        }
        //获取玩家名字
        this.GetPlayerName = function(playerName){
             var name = "";
             if(playerName == null || playerName == undefined || playerName == '') return name;
             if(playerName == User.getInstance().GetName()) return ("ID: "+playerName);
            //玩家用户名前面全部隐藏掉，只显示最后三位
            var len = playerName.length;
            if( len < 3){
                name = "ID: ***"+playerName;
            }
            else{
                name = "ID: ***"+playerName.substring(len - 3,len);
            }
            return name;
        }
        //获取自己的UI名字显示
        this.GetLocalPlayerUIName = function(text){
            var name = text ? text : User.getInstance().GetName();
            if(name == "") name = User.getInstance().GetUserID();
            return ("ID: " + name);
        }
        //由游戏类型获取游戏名称
        this.GetGameNameByType = function(type){
            var name = GameData.getInstance().gameName[type];
            return name || "";
        }
        //获取一张卡牌，先从池里获取 没有则创建,以{}方式传参设置属性
        this.CreateACard = function(){
            var c = null;
            c = laya.utils.Pool.getItem("card");
            if( c === null ) {
                c = new Card();               
            }
            c.init && c.init();
            if(arguments[0]){
                for(var i in arguments[0]){
                    c[i] = arguments[0][i];
                }
            }
            return c;
        }
        //获取一个筹码，先从池里获取 没有则创建,以{}方式传参设置属性
        this.CreateAJetton = function(){
            var obj = null;
            obj = laya.utils.Pool.getItem("jetton");
            if( obj === null ) {
                obj = new Jetton();               
            }
            obj.init && obj.init();
            if(arguments[0]){
                for(var i in arguments[0]){
                    obj[i] = arguments[0][i];
                }
            }
            return obj;
        }
        //获取一个牌型，先从池里获取 没有则创建,以{}方式传参设置属性
        this.CreateACardForm = function(){
            var obj = null;
            obj = laya.utils.Pool.getItem("cardForm");
            if( obj === null ) {
                obj = new CardForm();               
            }
            obj.init && obj.init();
            if(arguments[0]){
                for(var i in arguments[0]){
                    obj[i] = arguments[0][i];
                }
            }
            return obj;
        }

        this.EarthQuake = function(child){
            Earthquake.getInstance().Earthquake(child,10,0.5,0,true);
            Earthquake.getInstance().go();
        }
        //深拷贝
        this.CloneObj = function(obj){
            var str, newobj = obj.constructor === Array ? [] : {};
            if(typeof obj !== 'object'){
                return;
            } else if(window.JSON){
                str = JSON.stringify(obj), //系列化对象
                newobj = JSON.parse(str); //还原
            } else {
                for(var i in obj){
                    newobj[i] = typeof obj[i] === 'object' ? 
                    cloneObj(obj[i]) : obj[i]; 
                }
            }
            return newobj;
        };
        /**
         * ajax请求 type:POST ,GET
         * */
        this.AJAX = function(urlScr,type,data,callbackObj,callbackFunc){
            $.ajax({
                url: urlScr,
                type: type,
                data:data,
                dataType: 'JSON',//here
                crossDomain: true,//跨域
                success: function (dataCallback) {
                    if(callbackObj && callbackFunc){
                        callbackFunc.call(callbackObj,dataCallback);
                    }
                },
                error : function(XMLHttpRequest, textStatus, errorThrown){
                    return;
                }
            });
        }
        //关闭当前网页
        this.CloseWindow = function(){
            try {
                // window.opener = null;
                // window.open("", "_self");
                // window.close();
                window.opener = window;
                var win = window.open("","_self");
                win.close();
                //frame的时候
                top.close();
            } 
            catch (e) {
            }
        }
    }

    
    //单例实例 
    var instance; 
    //返回对象 
    return { 
        name: '_Tools', 

        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _Tools(); 
            } 
            return instance; 
        } 
    }; 
})();