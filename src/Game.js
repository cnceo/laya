var Loader = laya.net.Loader;
var Handler = laya.utils.Handler;
var Event = laya.events.Event;
var Stage = Laya.Stage;
var WebGL = Laya.WebGL;
var Animation = laya.display.Animation;
var SoundManager = laya.media.SoundManager;
var BitmapFont = laya.display.BitmapFont;
var Text = laya.display.Text;
var Sprite = Laya.Sprite;
var Point = Laya.Point;
var Tween = Laya.Tween;
var Ease = laya.utils.Ease;
var Box = laya.ui.Box;
var Rectangle = laya.maths.Rectangle;
var LocalStorage = laya.net.LocalStorage;
var Dragging = laya.utils.Dragging;
var HTMLDivElement = Laya.HTMLDivElement;
var View = laya.ui.View;
var MouseManager = laya.events.MouseManager;
//var GlowFilter = Laya.GlowFilter;

Laya.init(1620, 900,WebGL);

//缩放模式。 取值范围： "noscale" ：不缩放； "exactfit" ：全屏不等比缩放； "showall" ：最小比例缩放； "noborder" ：最大比例缩放； 
//  "full" ：不缩放，stage的宽高等于屏幕宽高； "fixedwidth" ：宽度不变，高度根据屏幕比缩放； "fixedheight" ：高度不变，宽度根据屏幕比缩放； 默认值为 "noscale"。
Laya.stage.scaleMode = "showall";
Laya.stage.alignV = Stage.ALIGN_MIDDLE;
Laya.stage.alignH = Stage.ALIGN_CENTER;
//Laya.stage.screenMode = Stage.SCREEN_HORIZONTAL;
Laya.stage.bgColor = GameData.getInstance().COLOR.BLACK;

Laya.class(LoginView, "LoginView", LoginUI);
Laya.class(GameHallView, "GameHallView", GameHallUI);
Laya.class(SHGameRoomView, "SHGameRoomView", ShowHandRoomUI);
Laya.class(ChatView, "ChatView", ChatUI);
Laya.class(SetingView, "SetingView", SetingUI);
Laya.class(WalletView, "WalletView", WalletUI);
Laya.class(RoomTypeCell, "RoomTypeCell", RoomTypeCellUI);
Laya.class(CheckCardView, "CheckCardView", CheckCardUI);
Laya.class(ReraiseView, "ReraiseView", ReraiseUI);
Laya.class(ExpressBankView, "ExpressBankView", ExpressBankUI);
Laya.class(SettlementView, "SettlementView", SettlementUI);
Laya.class(HintMessage, "HintMessage", HintMessageUI);
Laya.class(TipsMessage, "TipsMessage", TipsMessageUI);
Laya.class(ChargeMessage, "ChargeMessage", ChargeMessageUI);
Laya.class(MessageBox, "MessageBox", MessageBoxUI);
Laya.class(GoldenFlowerRoomView, "GoldenFlowerRoomView", GoldenFlowerRoomUI);
Laya.class(HistoryRecordView, "HistoryRecordView", HistoryRecordUI);
Laya.class(HowToPlayView, "HowToPlayView", HowToPlayUI);
Laya.class(TaskView, "TaskView",TaskInfoUI);
Laya.class(TaskMessage, "TaskMessage",TaskMessageUI);
Laya.class(EmailView, "EmailView",EmailUI);
Laya.class(WheelOfFortuneView,"WheelOfFortuneView",WheelOfFortuneUI);
Laya.class(CampaignView,"CampaignView",CampaignUI);
Laya.class(EmojiView,"EmojiView",EmojiUI);
Laya.class(DiceView,"DiceView",DiceUI);
Laya.class(GFCompareCardsView,"GFCompareCardsView",GFCompareCardsUI);
Laya.class(ChatSmallView,"ChatSmallView",ChatSmallUI);
Laya.class(GameRoomTypeView,"GameRoomTypeView",GameRoomTypeBaseUI);
Laya.class(GameRoomTopView,"GameRoomTopView",GameRoomTopUI);
Laya.class(FLRoomView,"FLRoomView",FightLandlordRoomUI);
Laya.class(RandomReqView,"RandomReqView",RandomReqUI);
Laya.class(BaseReplayView,"BaseReplayView",ReplayBtnsUI);

Laya.class(CardForm, "CardForm", Box);
//Laya.class(Card, "Card", Sprite);
Laya.class(Jetton, "Jetton", Sprite);
Laya.class(TextScroll,'TextScroll',Box);
Laya.class(GameRoomType,"GameRoomType",Box);
Laya.class(GFRoomTypeView,"GFRoomTypeView",View);
Laya.class(SHGameTypeView, "SHGameTypeView", View);
Laya.class(FLRoomTypeView, "FLRoomTypeView", View);

Laya.class(FishingRoomTypeView,"FishingRoomTypeView",View);
Laya.class(TweenMaintain,"TweenMaintain",View);
Laya.class(FishingRoomView,"FishingRoomView",FishingRoomUI);
Laya.class(FishBase, "FishBase", Box);
Laya.class(BulletBase,"BulletBase",Box);
Laya.class(FishMoveClass, "moveClass", Box);
Laya.class(MsgMenu, "MsgMenu", Box);
Laya.class(BackGroundBubble, "BackGroundBubble", Box);
Laya.class(FishingShadow, "FishShadow", Box);

Laya.class(TexasHoldemRoomView,"TexasHoldemRoomView",TexasHoldemRoomUI);
Laya.class(PreGameView,"PreGameView",PreGameUI);
Laya.class(ReraiseV, "ReraiseV", ReraiseVUI);


//laya.utils.Stat.show(0, 0);//显示帧率等信息
//调用DebugPanel调试面板
//Laya.DebugPanel.init();

function CreateXHR(){
    try {	
        return new XMLHttpRequest();
    }catch (tryMS) {	
        var version = ["MSXML2.XMLHttp.6.0",
                        "MSXML2.XMLHttp.3.0",
                        "MSXML2.XMLHttp",
                        "Miscrosoft.XMLHTTP"];
        for(var i = 0; i < version.length; i++){
            try{
                return new ActiveXObject(version[i]);
            }catch(e){}
        }
    }
}

window.onerror=function(Msg,Url,Num,column,detail)
{
	detail && CLog.log(detail.stack);
    if(URLParamParse.getInstance().IsLocal()) return;
    var data = {};
    data.userID = User.getInstance().GetUserID();
    data.msg = Msg;
    data.url = Url;
    data.userAgent = Browser.userAgent;
    data.lineNum = Num;
    detail && (data.stack = detail.stack);
    //data = JSON.stringify(data);

    //GameData.getInstance().errorServer = "http://192.168.1.87:20000/ClientLogServer/ClientLogReport";
    var d = {name:name,record:this.curRecordID,gameType:this.curGameType};
    Tools.getInstance().AJAX(GameData.getInstance().errorServer,"POST",data,this,function(message){

    });
}
//加载更新文件
UpdateMgr.getInstance().LoadFile("files.fst?" + Browser.now(),Handler.create(this, onFileLoadComp),null);

function onFileLoadComp()
{ 
    new Font().Load("font/gameStart.fnt",'gameStart');
    URLParamParse.getInstance().Analysis();    
}

document.addEventListener( 'visibilitychange',onVisibilityChange);

var CurScreenMode = Stage.SCREEN_HORIZONTAL;
window.onresize = onWindowResize;
onWindowResize();
window.addEventListener("message", onAppEvent, false);

//处理从app发来的消息
function onAppEvent(e)
{
    var code = e.data.MSG_CODE;
    if(code != GameData.getInstance().WIN_PROTOCOL.MSG_BACKGROUND_MODE)
        return;
    var params = e.data.PARAMS[0];
    switch (params){
        case GameData.getInstance().APP_EVENT.GAME_HIDE:
            onGameHide();
            Laya.stage.renderingEnabled = false;
            break;
        case GameData.getInstance().APP_EVENT.GAME_SHOW:
            onGameShow();
            Laya.stage.renderingEnabled = true;
            break;
        default:
            break;
    }
}
function onGameHide(){
    Laya.stage.event('hide_window');
    GameData.getInstance().isGameHide = true;
}
function onGameShow(){
    //当切后台并且是观看游戏录像时，暂停计时
    if(IS_GAME_REVIEW){
        Game.getInstance().time = new Date().getTime();
    }    
    Laya.stage.event('show_window');
    GameData.getInstance().isGameHide = false;    
}
//窗口隐藏显示
function onVisibilityChange()
{
    if( document.hidden ){
        onGameHide();
    }
    else{
        onGameShow();
    }
}
//窗口横竖屏变化
function onWindowResize()
{
    if(document.documentElement.clientHeight > document.documentElement.clientWidth){
        if(CurScreenMode != Stage.SCREEN_VERTICAL){
            CurScreenMode = Stage.SCREEN_VERTICAL;
            Laya.stage.event("window_resized");
            if(Game) Game.getInstance().updateViewPos();
        }        
    }
    else{
        if(CurScreenMode != Stage.SCREEN_HORIZONTAL){
            CurScreenMode = Stage.SCREEN_HORIZONTAL;
            Laya.stage.event("window_resized");
            if(Game) Game.getInstance().updateViewPos();
        }      
    }
}

var Game = (function()
{
    function _Game()
    {       
       this.time = new Date().getTime();
       this.bPause = false;
       Laya.timer.frameLoop(2, this, animateFrameRateBased);       
       var UpdateList = [];
       
       this.update = function( dt )
       {
           for( var i = 0; i < UpdateList.length;i++ )
           {
               var element = UpdateList[ i ];
               if( element.caller.destroyed )
               {
                   UpdateList.splice(i,1);
                   i--;
                   continue;
               }
               element && element.callback.call( element.caller,dt );
           }
       }
       /**
        * 添加一个更新对象
        */
       this.addUpdate = function( data )
       {
           UpdateList.push( data );
       }
       
       /**
        * 删除一个更新对象
        */
       this.removeUpdate = function( _caller )
       {
           for( var i = 0; i < UpdateList.length;i++ )
           {
               var element = UpdateList[ i ];
               if( element.caller === _caller )
               {
                   UpdateList.splice(i,1);
                   break;
               }
           }
       }
       this.initGame = function(){
           this.currentScene = null;

            JackpotMgr.Init();
            this.GameLayer = new Laya.Sprite();
            Laya.stage.addChild( this.GameLayer );

            //遮罩层
            this.MaskLayer = new MaskView();
            Laya.stage.addChild(this.MaskLayer);
            this.MaskLayer.Init();
            
            this.TipLayer = new Laya.Sprite();
            Laya.stage.addChild( this.TipLayer );
       }
       this.updateViewPos = function(){
           for(var i=0;i<this.MaskLayer.numChildren;i++){
               var child = this.MaskLayer.getChildAt(i);
               child && child.updateViewPos && child.updateViewPos();
           }
           for(var i=0;i<this.TipLayer.numChildren;i++){
               var child = this.TipLayer.getChildAt(i);
               child && child.updateViewPos && child.updateViewPos();
           }
       }
       this.Pause = function(){
           this.bPause = true;
       }
       this.UnPause = function(){
           this.bPause = false;
       }
    }
    
    function animateFrameRateBased()
    {
        var nowTime = new Date().getTime();
        if(this.bPause) {
            this.time = nowTime;
        }
        else{
            var dt      = nowTime - this.time; 
            this.time   = nowTime;
            dt = dt * Laya.timer.scale;
            this.update( dt );
            TaskDelayManager.getInstance().tick( dt );
        }        
    }
    
    //单例实例 
    var instance; 
    //返回对象 
    return { 
        name: '_Game', 

        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _Game(); 
            } 
            return instance; 
        } 
    }; 
})();
