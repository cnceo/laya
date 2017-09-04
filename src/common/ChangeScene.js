
/**
 * huangandfly 20160630
 */
var ChangeScene = (function()
{
    function _ChangeScene()
    {
        
    }
    BasePageView.call(this);
    for(var i in BasePageView.prototype){
        _ChangeScene.prototype[i] = BasePageView.prototype[i];
    }
    var _proto    = _ChangeScene.prototype;

    var FORCE_LOAD_TIME = 500;//强制等待loading的时间
    var MAX_CACHE_GMAE_NUM = 3;//最大缓存游戏数

    _proto.loading   = null;
    _proto.animation = null;
    _proto.resList   = null;
    _proto.tips = null;
    _proto.bAnimation = true;
    _proto.numAnimationPlay = 0;
    _proto._preTime = 0;    
    _proto._arrCacheGameRes = [];//当前缓存的游戏资源列表 以{type:date}的方式存储
    _proto._curSceneData = {};
    _proto._lastSceneData = {};

    //_proto.loadScene = function( _sceneType,_resList,_tips)
    _proto.loadScene = function( data )
    {
        CLog.log("-----------------切换场景:"+data.type + "--------------");
        this._lastSceneData = this._curSceneData;
        this._curSceneData = data;
        var now = new Date().getTime();       
        if((!this.gameCached(GameData.getInstance().curGameType)) && (GameData.getInstance().curGameType != null)){
            CLog.log("-----------------加载资源:"+GameData.getInstance().curGameType);
            this._arrCacheGameRes.push({name:GameData.getInstance().curGameType,date:now});
        }
        this.releaseRes();
        this.loadLoading();
    }
    
    _proto.getSceneType = function()
    {
        return this._curSceneData.type;
    }
    
    //加载 loading界面
    _proto.loadLoading = function()
    {
        this.bAnimation = true;
        this._preTime = new Date().getTime();
        if( this.loading == null )
        {
            Laya.loader.load(PreLoadList.getInstance().loading, Handler.create(this, this.onLoad));  
        }else
        {
            this.loading.progress.text = '0%';
            if(this._curSceneData.tips != null) this.loading.lblTips.text = this._curSceneData.tips;
            Game.getInstance().GameLayer.addChild( this.loading );
            var bg = this.loading.getChildByName('bg');
            if(bg) bg.on(Event.CLICK,this,this.onClickLoadingUI);
            this.randomAnim();
            Laya.loader.load(this._curSceneData.resList, Handler.create(this, this.onSceneLoaded), Handler.create(this, this.onProcess,null,false));
        }
    }
    
    /**
     * loading界面加载完成    
     */
    _proto.onLoad = function(params)
    {
        Game.getInstance().initGame();
        this.loading = new LoadingUI();
        if(this._curSceneData.tips != null) this.loading.lblTips.text = this._curSceneData.tips;
        Game.getInstance().GameLayer.addChild( this.loading );
        var bg = this.loading.getChildByName('bg');
        if(bg) bg.on(Event.CLICK,this,this.onClickLoadingUI);
        Laya.loader.load(this._curSceneData.resList, Handler.create(this, this.onSceneLoaded), Handler.create(this, this.onProcess,null,false));
        //一段时间后开始表现动画
        var task = new TaskDelay();
        task.callBack = this.randomAnim;
        task.classObj = this;
        task.leftTime = 1000;
        TaskDelayManager.getInstance().addTask( task ); 
    }
    _proto.onClickLoadingUI = function(e){

    }
    _proto.randomAnim = function(){
        if(!this.bAnimation || this.numAnimationPlay > 0) return;
         var num = Math.random()*3 + 1;//从1到3随机
         this.numAnimationPlay = parseInt(num);
         this.playAnimation();
    }
    // 显示loading界面特效
    _proto.playAnimation = function()
    {
        var img = this.loading.getChildByName("icon");
        if(!this.bAnimation || !img) return;
        if(this.numAnimationPlay <= 0){
            var timeRandom = Math.random() * 2000;
		    //Laya.timer.once(timeRandom, this, this.randomAnim);
            var task = new TaskDelay();
            task.callBack = this.randomAnim;
            task.classObj = this;
            task.leftTime = timeRandom;
            TaskDelayManager.getInstance().addTask( task ); 
        }
        else{
            img.scaleX = 1;
            var time = 300;
            Tween.clearAll(img);
            Tween.to(img,{scaleX:-1}, time, Ease['strongInOut'],new Handler(this,function(){
                Tween.to(img,{scaleX:1}, time, Ease['strongInOut'],new Handler(this,this.playAnimation));            
            }));
            this.numAnimationPlay--;
        }        
    }
    
    // 显示加载进度
    _proto.onProcess = function(pro)
    {
        this.loading.progress.text = parseInt(pro * 100) + '%';
    }
    
    //场景加载完成
    _proto.onSceneLoaded = function()
    {
        var now = new Date().getTime();
        var deltaT = now - this._preTime;
        //强制等待loading
        if((this._curSceneData.type - this._lastSceneData.type >= 1)
                && (deltaT < FORCE_LOAD_TIME) ){
            var task = new TaskDelay();
            task.callBack = this.toShowScence;
            task.classObj = this;
            task.leftTime = FORCE_LOAD_TIME - deltaT;
            TaskDelayManager.getInstance().addTask( task ); 
        }
        else{
            this.toShowScence();
        }
        this._preTime = now;   
    }
    _proto.gameCached = function(type){
        for(var i in this._arrCacheGameRes){
            if(GameData.getInstance().curGameType == this._arrCacheGameRes[i].name){
                return true;
            }
        }
        return false;
    }
    _proto.toShowScence = function(){
        this.bAnimation = false;
        TaskDelayManager.getInstance().clearTarget(this);
        this.removeScene();
        this.showScene();
    }
    
    //显示场景界面(按照树的结构排列 根节点为登陆界面)
    _proto.showScene = function()
    {
        var scene = null;
        switch( this._curSceneData.type )
        {
            case GameData.getInstance().SCENE_TYPE.PRE_GAME:
                scene = new PreGameView();
                SoundManager.setMusicVolume(1);
                break;
            case GameData.getInstance().SCENE_TYPE.LOGIN:
                scene = new LoginView();
                SoundManager.setMusicVolume(1);
                break;
            case GameData.getInstance().SCENE_TYPE.GAMEHALL:
                scene = new GameHallView();
                SoundManager.setMusicVolume(1);
                break;
            case GameData.getInstance().SCENE_TYPE.SHOWHANDROOMTYPE:
                scene = new SHGameTypeView();
                SoundManager.setMusicVolume(1);
                break;
            case GameData.getInstance().SCENE_TYPE.SHOWHANDROOM:
                scene = new SHGameRoomView();
                SoundManager.setMusicVolume(0.5);
                break;
            case GameData.getInstance().SCENE_TYPE.GOLDENFLOWERHALL:
                scene = new GFRoomTypeView();
                SoundManager.setMusicVolume(1);
                break;
            case GameData.getInstance().SCENE_TYPE.GOLDENFLOWERROOM:
                scene = new GoldenFlowerRoomView();
                SoundManager.setMusicVolume(0.5);
                break;
            case GameData.getInstance().SCENE_TYPE.OAB_ROOM:
                scene = new OneArmBanditView();
                break;
            case GameData.getInstance().SCENE_TYPE.CLASSIC_LAPA_ROOM:
                scene = new ClassicLaPaView();
                break;
            case GameData.getInstance().SCENE_TYPE.FLROOMTYPE:
                scene = new FLRoomTypeView();
                break; 
            case GameData.getInstance().SCENE_TYPE.FLROOM:
                scene = new FLRoomView();
                break;
            case GameData.getInstance().SCENE_TYPE.TEXASROOM:
                scene = new TexasHoldemRoomView();
                SoundManager.setMusicVolume(0.5);
                break;
            case GameData.getInstance().SCENE_TYPE.FISHROOMTYPE:
                scene = new FishingRoomTypeView();
                break;
            case GameData.getInstance().SCENE_TYPE.FISHINGROOM:
                scene = new FishingRoomView();
                break;
        }
        Game.getInstance().currentScene = null;
        Game.getInstance().currentScene = scene;
        scene && Game.getInstance().GameLayer.addChild( scene );
        scene && scene.Init && scene.Init(this._curSceneData.data);
        scene && scene.Show && scene.Show();
        
    }

    /**
     * 释放资源
     */
    _proto.releaseRes = function()
    {
        //这里不考虑跨游戏直接切场景的情况
        if((this._arrCacheGameRes.length > MAX_CACHE_GMAE_NUM) && (this._lastSceneData.type == 1)){
            var deletGameName = GameData.getInstance().curGameType;
            //查找时间距离现在最远的游戏做释放
            var now = new Date().getTime();
            var deltaT = 0;
            for(var g in this._arrCacheGameRes){
                var temp = now - this._arrCacheGameRes[g].date;
                if(temp > deltaT){
                    deltaT = temp;
                    deletGameName = this._arrCacheGameRes[g].name;
                }
            }
            
            var index = -1;
            for(var j in this._arrCacheGameRes){
                if(deletGameName == this._arrCacheGameRes[j].name){
                    index = j;break;                
                }
            }
            if(index != -1) {
                CLog.log("------------- 删除资源:"+deletGameName);
                this._arrCacheGameRes.splice(index,1);
                var resList = this.getGameResList(deletGameName);
                for( var i = 0;i < resList.length;i++ )
                {
                    var elem = resList[ i ];
                    if( elem.type === Loader.ATLAS )
                    {
                        Laya.loader.clearRes( elem.url );
                    }else if( elem.type === Loader.SOUND )
                    {
                        SoundManager.destroySound( elem.url );
                    }
                }
            }
        }
    }
    _proto.getGameResList = function(gameType){
        var resList = [];
        switch(gameType){
            case GameData.getInstance().gameType.eShowhand:
                resList = PreLoadList.getInstance().showhand;
                break;
            case GameData.getInstance().gameType.eGoldenFlower:
                resList = PreLoadList.getInstance().goldenFlower;
                break;
            case GameData.getInstance().gameType.eOneArmBandit:
                resList = PreLoadList.getInstance().oab;
                break;
            case GameData.getInstance().gameType.eFightLandlord:
                resList = PreLoadList.getInstance().fl;
                break;
        }
        return resList;
    }
    
    /**
     * 删除场景
     */
    _proto.removeScene = function()
    {
        this.loading.lblTips.text = "";
        var gameLayer = Game.getInstance().GameLayer;
        while( gameLayer.numChildren > 0 )
        {
            var item = gameLayer.getChildAt(0);
            gameLayer.removeChild( item );
            if( !(item instanceof LoadingUI) )
            {
                item.gc();
                item.destroy();
                item = null;
            }
        }
    }
    


    //单例实例 
    var instance; 
    //返回对象 
    return { 
        name: '_ChangeScene', 

        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _ChangeScene(); 
            } 
            return instance; 
        } 
    }; 
    
})();