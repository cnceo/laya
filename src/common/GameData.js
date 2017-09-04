/**
 * 杂七杂八数据 2016 06 30
 */

var GameData = (function()
{
    //单例方法 
    function _GameData() { 
        this.name = '_GameData'; //方法对外的属性，另外一种方式就是返回对象 
        
        this.bOpenRank = false;//是否开启排行榜

        this.bLoginDemo = false;//是否是游客登陆
        this.bFirstLogin = true;//平台登陆过来的第一次进入大厅
        this.bForceToPlatform = false;//强制去平台

        this.games = [];
        this.types = {};//当前请求的游戏房间类型
        this.curGameType = null;//当前游戏类型
        this.isGameHide = false;
        this.checkBottomCard = false;//记录本地玩家是否查看过底牌
        this.SCENE_WIDTH = 1620;
        this.SCENE_HEIGHT = 900;
        this.settlementTime = 10000;//结算界面的倒计时时间
        this.lotterys = [];//当前奖项内容
        this.lotteryNum = 0;//当日剩余抽奖次数
        this.bPlayMusic = true;//是否播放背景音乐
        this.autoActionDelay = 600;//自动操作的延迟时间

        this.lockPlayerMoney = false;//用户金钱更新的锁
        
        this.GAME_SCENE_TYPE = 0;
        
        this.iamBack = false;//true : 断线或者顶替归来, false : 正常流程
        this.bWaitingESettlement = false;//是否等待给服务端发送eSettlement状态

        this.bRollingNotice = true;//是否显示滚动公告，玩家配置
        this.scrollNoticeType = 0;//公告的滚动方式 ：0 为先滚动完所有次数再滚动下一条，1表示滚动一遍就滚动下一条
        this.scrollNoticeSpeed = 120;//滚动速度 越大速度越大
        this.loginAddressList = {       //服务器列表
            "85服务器" : "ws://192.168.1.85:15000/LoginServer/Login/ClientEntry",
            "87服务器" : "ws://192.168.1.87:15000/LoginServer/Login/ClientEntry",
            "78服务器" : "ws://192.168.1.78:15000/LoginServer/Login/ClientEntry",
            "77服务器" : "ws://192.168.1.77:15000/LoginServer/Login/ClientEntry",
            "150服务器" : "ws://192.168.1.150:15000/LoginServer/Login/ClientEntry",
            "本地服务器" : "ws://127.0.0.1:15000/LoginServer/Login/ClientEntry",
            "外网服务器" : "ws://43.229.36.89:15000/LoginServer/Login/ClientEntry",
        };
        //this.curLoginAddress = "ws://192.168.1.85:15000/LoginServer/Login/ClientEntry";
        this.curLoginAddress = "ws://192.168.1.85:15000/LoginServer/Login/ClientEntry";
        this.curGateAddress = "";
        this.errorServer = "http://122.152.174.220:20000/ClientLogServer/ClientLogReport";
        this.logServer = "http://192.168.1.85:20000/ClientLogServer/GameReview";
        //this.errorServer = "http://192.168.1.85:20000/ClientLogReport";

        this.ENoticeType = //常驻公告的类型
        {
            eNormal : "eNormal",
            eImportant : "eImportant",
        }        
        this.TaskType = {//任务类型
            MANAGER : { name:'系统',value:1 },
            SHWOHAND : { name:'梭哈',value:2 },
        }
        this.redPointType = {//红点类型
            MAIL : 0,//邮件红点
        }
        this.senderTypeColor = {//不同用户不同颜色 eUser,eSystem
            eMe : "#57c300", //自己
            eUser : "#FFFFFF",//eUser
            eSystem : "#FF0000",//eSystem
            eImportentNotice : "#ff004e", //常驻重要公告
            eNormalNotice : "#FFC800",//常驻普通公告
        }
        this.COLOR = {
            YELLOW : '#ffda5b',
            RED : '#ff004e',
            BLACK : '#000000',
            WHITE : '#FFFFFF',
            GREEN : '#00ffa2',
            GRAY : '#929191'
        }
        //按照树的结构排列 根节点为登陆界面
        this.SCENE_TYPE = 
        {
            LOGIN : 0,  //登录场景
            PRE_GAME : 0.1,//
            GAMEHALL : 1,//游戏大厅
            SHOWHANDROOMTYPE : 2,//梭哈大厅
            SHOWHANDROOM : 2.1,//梭哈房间
            GOLDENFLOWERHALL : 3,
            GOLDENFLOWERROOM : 3.1,
            OAB_ROOM : 4,//老虎机目录房间
            CLASSIC_LAPA_ROOM : 4.1,//经典拉霸房间
            FLROOMTYPE : 5,//斗地主房间类型
            FLROOM : 5.1,//斗地主房间
            FISHROOMTYPE : 6,//捕鱼房间类型
            FISHINGROOM : 6.1,//捕鱼房间
            TEXASROOM : 7.2,//德州房间
        }
        //玩法说明的资源地址
        this.gameHallRes = 
        {
            '2' : "showhandGameType/",
            '3' : "gfHall/",
            '4.1' : "classic_lapa/",
            '5' : "fightLandlordType/",
            '6' : "fishingType/",
        }
        
        this.showhandRoomState =
        {
            eWaitingGameBegin : 'eWaitingGameBegin',
            eGameBegin : "eGameBegin",
            eGameOver : "eGameOver",
            eTurnBegin : "eTurnBegin",
            eTurnOver : "eTurnOver",
            ePutCard : "ePutCard",//发牌
            eActions : "eActions",//投注
            eActionBegin : "eActionBegin",//某人投注开始
            eActionOver : "eActionOver",//某人投注结束
            eGotoResult : "eGotoResult",//直接到结果
            eSettlement : 'eSettlement',
        };
        this.gfRoomState = {
            eWaitingGameBegin : 'eWaitingGameBegin',
            eGameBegin : "eGameBegin",
            ePK : "ePK",
            eLastPK : "eLastPK",
            eGameOver : "eGameOver",
            eActionBegin : "eActionBegin",//某人投注开始
            eSettlement : 'eSettlement',
        }
        
        this.sceneType = 
        {
             eLobby : 'eLobby',
             eShowhandLobby : 'eShowhandLobby',
             ePlayingShowhand :'ePlayingShowhand', 
        };
        this.gameType = {
            eShowhand : "eShowhand",
            eGoldenFlower : "eGoldenflower",
            eOneArmBandit : "eOAB",//老虎机
            eFishing : "eFishing",
            eFightLandlord : "eFightLandlords",//斗地主
            e21Point : "e21Point",//21点
            eTexasHoldem : "eTexasHoldem",//德州
        };
        
        this.playerState = 
        {
            Waiting : 'eWaiting',
            Watching :'eWatching',
            Playing : 'ePlaying',
            Abandon : 'eAbandon',
        };
        this.shActionState = 
        {
            XiaZhu : 'eXiaZhu',
            JiaZhu : 'eJiaZhu',
            GenZhu : 'eGenZhu',
            GuoPai : 'eGuoPai',
            SiKao : 'eSiKao',
            AllIn : 'eAllIn',
        }        
        this.eGameResult = 
        {
            WIN : "eWin",
            LOSE : "eLose",
            ABANDON : "eAbandon",
        };
        this.SHCardFormType = {
            SanPai : "SanPai",
            DanDui : "DanDui",
            ErDui : "ErDui",
            SanTiao : "SanTiao",
            ShunZi : "ShunZi",
            TongHua : "TongHua",
            FuErHaoSi : "FuErHaoSi",
            SiTiao : "SiTiao",
            TongHuaShun : "TongHuaShun",

            Baozi : "Baozi",
            Duizi : "Duizi",            

        }
        this.GFCardFormType = {
            SanPai : "SanPai",
            ShunZi : "ShunZi",
            JinHua : "TongHua",
            ShunJin : "TongHuaShun",
            Baozi : "Baozi",
            Duizi : "Duizi",            

        }
        //玩家操作倒计时总时间  注意：使用以及设置值时需要用Tools
        this.GameCountDown = {
            eShowhand : 30000,
            eGoldenflower : 30000
        };
        //玩家掉线倒计时时间
        this.discTime = 30000;
        this.UIZIndex = 
        {
            talkPop:90,  
            jetion:100,  
            gameCountdown:101,  
            winSprite:999,  

            players:99,
            gameBtn:100,

            localPlayer:100,
            reraisePanel:99,
        };

        this.WIN_PROTOCOL = {
            //后台切换消息
            MSG_BACKGROUND_MODE: "background",
            //返回APP消息
            MSG_BACK_TO_APP : "backToApp",
        };

        this.APP_EVENT = {
            GAME_HIDE : 0,
            GAME_SHOW : 1,
        }

        this.gameName = 
        {
            'eShowhand':'梭哈',
            'eGoldenflower' : "诈金花",
            'eOAB' : "拉霸",
            'eFishing' : "捕鱼",
            'eFightLandlords' : "斗地主",
            'e21Point' : "21点",
        }
        //邮件操作类型
        this.mailOptType = 
        {
            DELETE : 1,
            ATTACHMENTS : 2
        }
        
        this.getClientPos = function( _X,_Y )
        {
            var scaleX = laya.utils.Browser.clientWidth / this.SCENE_WIDTH;
            var scaleY = laya.utils.Browser.clientHeight / this.SCENE_HEIGHT;
            
            return new Point( scaleX * _X,scaleY * _Y );
        }
        
        this.setGameSceneType = function( _type )
        {
            this.GAME_SCENE_TYPE = _type;
        };
        
        this.getGameSceneType = function()
        {
            return this.GAME_SCENE_TYPE;
        }
        
        // this.getRoomTypeData = function (_index)
        // {
        //     // for (var index = 0; index < this.types.length; index++) 
        //     // {
        //     //     var element = this.types[index];
        //     //     if( element.type == _index )
        //     //     {
        //     //         return element;
        //     //     }
        //     // }
        //     // return null;
        // };
        //由服务端位置获取玩家座位号
        this.getPlayerSeatPos = function(userPos){
            switch(userPos){
            case 0:
                return 1;
            case 1:
                return 2;
            case 2:
                return 3;
            case 3:
                return 5;
            case 4:
                return 6;
            default:
                return -1;
            }
        };
    } 
    
    var _proto = _GameData.prototype;
    
    //单例实例 
    var instance; 
    //返回对象 
    return { 
        name: '_GameData', 

        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _GameData(); 
            } 
            return instance; 
        } 
    }; 
    
})();