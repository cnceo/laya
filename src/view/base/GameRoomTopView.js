/**
 * huangandfly 2017 04 26
 * 游戏房间顶上功能按钮
 */

function GameRoomTopView()
{
    GameRoomTopView.super(this);

    this.init = function(bDemoRoom)
    {
        this.isDemoRoom = bDemoRoom;
        this.addListener();
        this.initMusicIcon();
        Notice.getInstance().InitUiNotice(this.boxNotice);
        //this.updateResidentNotice();
        SoundTool.getInstance().PlayGameBgMusic();
        this.initRechargeBtn();
        this.updateViewPos();
    }
    this.updateViewPos = function(){
        // this.musicBtn.x = (1454 / 1620) * Laya.stage.width;        
        // this.gmBtn.x = (1346 / 1620) * Laya.stage.width;
        // this.recharge.x = (1562 / 1620) * Laya.stage.width;
        // this.rechargeBtn.updateViewPos();
        this.musicBtn.x = (1562 / 1620) * Laya.stage.width;        
        this.gmBtn.x = (1454 / 1620) * Laya.stage.width;
        this.boxNotice.x = Laya.stage.width >> 1;
    }
    this.initRechargeBtn = function()
    {
        this.rechargeBtn = new RechargeBtn(this.parent,this.isDemoRoom);
        this.recharge.addChild(this.rechargeBtn);
        this.rechargeBtn.x = 65;
        this.rechargeBtn.y = 50;
    } 

        //初始化声音图标
    this.initMusicIcon = function()
    {
        var sp = this.musicBtn.getChildByName("img");
        sp.dataSource = {skin:GameData.getInstance().bPlayMusic ? 'common/chessgame/soundDown.png' : 'common/chessgame/sound.png'};
    }

    this.addListener = function()
    {
        this.recharge.on( Event.CLICK,this,this.onRecharge );
        this.musicBtn.on( Event.CLICK,this,this.onMusicBtnClick );
        this.gmBtn.visible = GM_OPEN;
        if(GM_OPEN){
            this.gmBtn.on(Event.CLICK,this,this.onGMClick);
        }

        MessageCallbackPro.addCallbackFunc( EventType.Type.addNotice,this.onResidentNoticeEvent,this); 
        MessageCallbackPro.addCallbackFunc( EventType.Type.removeNotice,this.onResidentNoticeEvent,this); 
    }

    this.removeListener = function()
    {
        this.recharge.off( Event.CLICK,this,this.onRecharge );
        this.musicBtn.off( Event.CLICK,this,this.onMusicBtnClick );
        this.gmBtn.off(Event.CLICK,this,this.onGMClick);

        MessageCallbackPro.removeCallbackFunc( EventType.Type.addNotice,this.onResidentNoticeEvent,this); 
        MessageCallbackPro.removeCallbackFunc( EventType.Type.removeNotice,this.onResidentNoticeEvent,this); 
    }

     //声音设置
    this.onMusicBtnClick = function()
    {
        var pre = GameData.getInstance().bPlayMusic;
        GameData.getInstance().bPlayMusic = !pre;
        LocalStorage.setItem("musicBg",!pre);
        //SoundManager.musicMuted = pre;
        SoundManager.setMusicVolume(pre ? 0 : 0.5);
        if(SoundManager.musicMuted){
            SoundManager.musicMuted = false;
        }
        var sp = this.musicBtn.getChildByName("img");
        sp.dataSource = {skin:pre ? 'common/chessgame/sound.png' : 'common/chessgame/soundDown.png'};
        SoundTool.getInstance().PlayGameBgMusic();
    }

    //点击GM按钮
    this.onGMClick = function(e)
    {
        if(!this.GMView){
            this.GMView = new GMDialog();
        }
        this.GMView.Show(NetManager.GameClintInstance,NetManager.GameClintInstance.CG_GMORDER_CL_REQ);
    }

    this.gc = function()
    {
        this.removeListener();
        if(this.GMView)
        {
             this.GMView.close();
             this.GMView = null;
         }
    }

    this.onResidentNoticeEvent = function(e)
    {
        this.updateResidentNotice();
    }

        //更新重要常驻公告
    this.updateResidentNotice = function()
    {
        var msg = Notice.getInstance().getImportentResidentN();
        var showResidentNotice = msg != null;
        // var showResidentNotice = true;
        // msg = "测试公告 对对对对！！！！！！！！";
         this.boxImportentMsg.visible = showResidentNotice;
        if(showResidentNotice){
            this.txtImportentMsg.text = msg;//取第一条公告
        }
    }
}