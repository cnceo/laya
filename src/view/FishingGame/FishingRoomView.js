/**
 * huangfei 2016 11 15
 * 捕鱼房间
 */
function FishingRoomView()
{
    FishingRoomView.super(this);
    BasePageView.call(this);
    for(var i in BasePageView.prototype){
        FishingRoomView.prototype[i] = BasePageView.prototype[i];
    }
    //初始化
   this.Init = function(dataInit){
        BasePageView.prototype.Init.call(this,dataInit); 
        this.cannon      = this.getChildByName("cannon");
        this.layerFish   = this.getChildByName("layerFish");
        this.layerMiddle = this.getChildByName("layerMiddle");
        this.layerWave   = this.getChildByName("layerWave");
        this.layerCannon = this.getChildByName("layerCannon");
        this.layerBackGround = this.getChildByName("backGround");
        this.cannonLvUp  = this.layerCannon.getChildByName("LvUp");
        this.cannonLvDown= this.layerCannon.getChildByName("LvDown");
        this.cannonLvText= this.getChildByName("CannonLvText");
        this.layerLighter = this.getChildByName("layerLighter");
        this.layerShadow = this.getChildByName("layerShadow");
        this.loadUI = null;
        this.proUI = null;
        this.proMask = null;
        this.mapList = new Array();
        this.gameStart = false;
        this.taskList = new Array();
        this.nowMap = null;
        this.bgChangeSprite = null;
        this.bgBubble = new Array();
        this.cannonAnimaction = null;
        this.cannonAnimactionLv1 = null;
        this.stageTimer = null;
        //-----
        this.TweenMain = new TweenMaintain();
        this.TweenMain.init();
        this.addChild(this.TweenMain);
        //-----
        this.AbilityConsoleProbability = 30;
        this.AbilityConsoleProbabilityLv1 = 30;
        this.AbilityConsoleTime = 10000;
        this.AbilityConsoleSprite = null;
        this.IntegralMultiple = 1;
        //-----
        this.traList = new Array();
        this.figList = new Array();
        this.fishNameList = new Array();
        this.formList = new Array();
        this.collisionKeys = new Array();
        //-----
        this.numImagePac = 
        [
            "fishing/Num/0.png",
            "fishing/Num/1.png",
            "fishing/Num/2.png",
            "fishing/Num/3.png",
            "fishing/Num/4.png",
            "fishing/Num/5.png",
            "fishing/Num/6.png",
            "fishing/Num/7.png",
            "fishing/Num/8.png",
            "fishing/Num/9.png",
        ];
        this.bgMapUrl = 
        [
            "fishing/BgMap/bg01.png",
            "fishing/BgMap/bg02.png",
            "fishing/BgMap/bg03.png",
            "fishing/BgMap/bg04.png",
            "fishing/BgMap/bg05.png",
            "fishing/BgMap/bg06.png",
            "fishing/BgMap/bg07.png"
        ]
        this.nowBgMap = "";
        //-----
        this.cannonLevel = 0;
        this.changeCannonImage(0);
        this.scrX = this.cannon.x;
        this.scrY = 0;
        this.BulletList = [];
        this.FishList = [];
        this.addListener();
        this.fishDic = new laya.utils.Dictionary();
        this.traDic = new laya.utils.Dictionary();
        this.collisionDic = new laya.utils.Dictionary();
        this.formationDic = new laya.utils.Dictionary();
        this.attributeDic = new laya.utils.Dictionary();
        this.sp = new Sprite();
        Game.getInstance().addUpdate( {callback:this.update,caller:this} );
        this.waveAnim = new Animation();
        this.waveAnim.loadAtlas("res/atlas/fishing/wave.json");
        this.waveAnim.blendMode = "lighter";
        this.waveAnim.interval = 100;			// 设置播放间隔（单位：毫秒）
        this.waveAnim.play(); 
        this.waveAnim.scaleX = 6.5;
        this.waveAnim.scaleY = 4;
        this.waveAnim.alpha = 0.7;
        this.layerWave.addChild(this.waveAnim); 
        //-------init Background map
        var random = Math.round(Math.random() * 6);
        this.nowBgMap = this.bgMapUrl[random];
        this.layerBackGround.dataSource = {skin:this.bgMapUrl[random]};
        //-----------------
        this.layerLighter.graphics.clear();
        this.layerLighter.graphics.drawRect(0,0,1620,900,"#000000");
        this.layerLighter.alpha = 0;
        this.TweenMain.addTween(Tween.to(this.layerLighter,{alpha:0.4},5000,null,Handler.create(this,this.onBlackAlphaComplate)));
        //-----------------
        this.LoadingUI();
        this.loadDat();
        //-------
        this.createBubble();
    }

    this.onBlackAlphaComplate = function()
    {
        var a = 0;
        if(this.layerLighter.alpha == 0)
        {
            a = 0.4;
        }
        this.TweenMain.addTween(Tween.to(this.layerLighter,{alpha:a},5000,null,Handler.create(this,this.onBlackAlphaComplate)));
    }

    this.createBubble = function()
    {
        if(this.bgBubble.length > 0)
        {
            for(var j = 0;j < this.bgBubble.length;j++)
            {
                this.bgBubble[j].remove();
            }
            this.bgBubble = new Array();
        }
        var pointX = [0,100,0,100,0,100,0,200,300,400,500,600,700,900,1200,1300,1500,1600];
        var pointY = [0,100,300,500,700,800,900,100,200,100,400,100,600,50,300,100,200,900,];
        if(pointX.length != pointY.length)
        {
            return;
        }
        for(var i = 0;i < pointX.length - 1;i++)
        {
            var maxX = pointX[i + 1];
            var minX = pointX[i];
            var maxY = pointY[i + 1];
            var minY = pointY[i];
            var x = Math.random() * (maxX - minX) + minX ;
            var y = Math.random() * (maxY - minY) + minY ;;
            var child = new BackGroundBubble();
            child.playBG();
            child.x = x;
            child.y = y;
            this.layerMiddle.addChild(child);
            this.bgBubble.push(child);
        }
    }

    this.onLoadMapData = function()
    {
        var _data = Laya.loader.getRes("res/atlas/fishing/main.mData");
        var _byte = new Byte( _data );
        if( _byte.getInt32() != 3112301 )
        {
            new HintMessage("部分文件已损坏，请清除浏览器缓存重新进入");
            return;
        }
        var data = this.EncData(_byte.getUTFBytes(),311);
        var pData = data.split('|');
        this.mapList = pData;
        var loadList = new Array();
        for(var i = 0;i < this.mapList.length;i++)
        {
            loadList.push({url:"res/atlas/fishing/map/" + this.mapList[i] + ".fmap",type:Loader.BUFFER,release:true});
        }
        Laya.loader.load(loadList, Handler.create(this,this.loadMap),Handler.create(this,this.onLoad,null,false));
    }

    this.loadMap = function()
    {
        var loadList = new Array();
        for(var m = 0;m < this.mapList.length;m++)
        {
            var _data = Laya.loader.getRes("res/atlas/fishing/map/" + this.mapList[m] + ".fmap");
            var _byte = new Byte( _data );
            if( _byte.getInt32() != 3112301 )
            {
                new HitMessage("部分文件已损坏，请清除浏览器缓存重新进入");
                return;
            }
            var data = this.EncData(_byte.getUTFBytes(),311);   
            var mData = data.split('$');
            var pData = mData[1].split('@');
            //分析文件列表
            for(var i = 0;i < pData.length;i++)
            {
                var _data = pData[i].split('|');
                for(var i1 = 1;i1 < _data.length;i1++)
                {
                    var str = _data[i1].split(',');
                    if(str.length == 1)
                    {
                        //formation List
                        if(this.ifRepeat(str[0],this.formList))
                        {
                            this.formList.push(str[0]);
                            loadList.push({url:"res/atlas/fishing/formation/" + str[0] + ".fmt",type:Loader.BUFFER,release:true});
                        }
                    }else{
                        //trajectory List
                        if(this.ifRepeat(str[1],this.traList))
                        {
                            this.traList.push(str[1]);
                            loadList.push({url:"res/atlas/fishing/trajectory/" + str[1] + ".tra",type:Loader.BUFFER,release:true});
                        }
                        var ftr = str[0].split('-');
                        if(ftr.length == 2)
                        {
                            //fish group List
                            if(this.ifRepeat(ftr[1],this.figList))
                            {
                                this.figList.push(ftr[1]);
                                loadList.push({url:"res/atlas/fishing/fishGroup/" + ftr[1] + ".fg",type:Loader.BUFFER,release:true});
                            }
                        }else{
                            //fish List
                            if(this.ifRepeat(ftr[0],this.fishNameList))
                            {
                                this.fishNameList.push(ftr[0]);
                            }
                        }
                    }
                }
            }
        }
        this.loadUI.TitleText.text = "加载配置文件...";
        Laya.loader.load(loadList, Handler.create(this,this.onAssistLoad),Handler.create(this,this.onLoad,null,false));
    }

    this.ifRepeat = function(_data,_array)
    {
        for(var i = 0;i < _array.length;i++)
        {
            if(_data == _array[i])
            {
                return false;
            }
        }
        return true;
    }

    this.onLoad = function(progress)
    {
        this.proUI.value = progress;
    }

    this.onAssistLoad = function()
    {
          //read data
          this.proUI.value = 1;
          //read trajectory
          var i ;
          for(i = 0;i < this.traList.length;i++)
          {
              Laya.loader.load("res/atlas/fishing/trajectory/" + this.traList[i] + ".tra",new Handler( this, this.readTraData,[this.traList[i]]),null, Loader.BUFFER);
          }
          //read fish group
          for(i = 0;i < this.figList.length;i++)
          {
              Laya.loader.load("res/atlas/fishing/fishGroup/" + this.figList[i] + ".fg",new Handler( this, this.readFishGroupData,[this.figList[i]]),null, Loader.BUFFER);
          }
          //read formation
          for(i = 0;i < this.formList.length;i++)
          {
              Laya.loader.load("res/atlas/fishing/formation/" + this.formList[i] + ".fmt",new Handler( this, this.readFormation,[this.formList[i]]),null, Loader.BUFFER);
          }
          var task = new TaskDelay();
          task.callBack = this.onTestingDataComplate;
          task.leftTime = 100;
          task.classObj = this;
          TaskDelayManager.getInstance().addTask( task );
    }

    this.onTestingDataComplate = function()
    {
        var traKeys = this.traDic.keys;
        var figKeys = this.fishDic.keys;
        var formKeys = this.formationDic.keys;
        if(traKeys.length == (this.traList.length * 2) && figKeys.length == this.figList.length && formKeys.length == this.formList.length)
        {
            this.onReadImages();
            return;
        }
        var task = new TaskDelay();
        task.callBack = this.onTestingDataComplate;
        task.leftTime = 100;
        task.classObj = this;
        TaskDelayManager.getInstance().addTask( task );
    }

    this.onReadImages = function()
    {
        this.loadUI.TitleText.text = "加载美术文件...";
        this.proUI.value = 0;
        var loadList = [
                {url:"res/atlas/fishing/image/bullet01.json",type:Loader.ATLAS,release:true},
                {url:"res/atlas/fishing/image/bullet02.json",type:Loader.ATLAS,release:true},
                {url:"res/atlas/fishing/image/bullet03.json",type:Loader.ATLAS,release:true},
                {url:"res/atlas/fishing/collision/bullet01.fcd",type:Loader.BUFFER,release:true},
                {url:"res/atlas/fishing/collision/bullet02.fcd",type:Loader.BUFFER,release:true},
                {url:"res/atlas/fishing/collision/bullet03.fcd",type:Loader.BUFFER,release:true}
            ];
        for(var i = 0;i < this.fishNameList.length;i++)
        {
            loadList.push({url:"res/atlas/fishing/image/" + this.fishNameList[i] + ".json",type:Loader.ATLAS,release:true});
            loadList.push({url:"res/atlas/fishing/collision/" + this.fishNameList[i] + ".fcd",type:Loader.BUFFER,release:true});
        }
        Laya.loader.load(loadList, Handler.create(this,this.onImageLoadingComplate),Handler.create(this,this.onLoad,null,false)); 
    }

    this.onImageLoadingComplate = function()
    {
        this.proUI.value = 1;
        var loadList = [
                "res/atlas/fishing/collision/bullet01.fcd",
                "res/atlas/fishing/collision/bullet02.fcd",
                "res/atlas/fishing/collision/bullet03.fcd"
        ];
        var keys = [
            "bullet01",
            "bullet02",
            "bullet03"
        ];
        for(var i = 0;i < this.fishNameList.length;i++)
        {
            loadList.push("res/atlas/fishing/collision/" + this.fishNameList[i] + ".fcd");
            keys.push(this.fishNameList[i]);
        }
        for(var j = 0;j < loadList.length;j++)
        {
            Laya.loader.load(loadList[j],new Handler( this,this.readCollision,[keys[j]]),null, Loader.BUFFER);
        }
        this.collisionKeys = keys;
        this.loadUI.TitleText.text = "初始化特效...";
        this.proUI.value = 0;
        this.playerEffects();
        var task = new TaskDelay();
        task.callBack = this.initEffects;
        task.leftTime = 100;
        task.classObj = this;
        TaskDelayManager.getInstance().addTask( task );
        //this.playerEffects();
        /*var task = new TaskDelay();
        task.callBack = this.onTestingImageComplate;
        task.leftTime = 100;
        task.classObj = this;
        TaskDelayManager.getInstance().addTask( task );*/
    }

    this.playerEffects = function()
    {
        var boom = new Effect();
        boom.init("res/atlas/fishing/Effects/boom.json",60,false);
        boom.play();
        boom.pivotX = boom.pivotY = 425;
        boom.scaleX = boom.scaleY = 2;
        boom.x = -500 ; 
        boom.y = -500 ;
        this.layerWave.addChild(boom);
        _point = new Point(-500,-500);
        this.moneyLable(99999,_point);
    }

    this.initEffects = function()
    {
        this.proUI.value += 0.2;
        if(this.proUI.value >= 1)
        {
            var task = new TaskDelay();
            task.callBack = this.onTestingImageComplate;
            task.leftTime = 200;
            task.classObj = this;
            TaskDelayManager.getInstance().addTask( task );
            return;
        }
        var task = new TaskDelay();
        task.callBack = this.initEffects;
        task.leftTime = 100;
        task.classObj = this;
        TaskDelayManager.getInstance().addTask( task );
    }

    this.onTestingImageComplate = function()
    {
        var keys = this.collisionDic.keys;
        if(keys.length == this.fishNameList.length + 3)
        {
            this.onGameStart();
            this.removeChild(this.loadUI);
            this.loadUI.destroy();
            this.loadUI = null;
            return;
        }
        var task = new TaskDelay();
        task.callBack = this.onTestingDataComplate;
        task.leftTime = 100;
        task.classObj = this;
        TaskDelayManager.getInstance().addTask( task );
    }

    this.onGameStart = function()
    {
        var mainMap = new Array();
        var mainMapName = new Array();
        for(var i = 0;i < this.mapList.length;i++)
        {
            var _data = Laya.loader.getRes("res/atlas/fishing/map/" + this.mapList[i] + ".fmap");
            var _byte = new Byte( _data );
            if( _byte.getInt32() != 3112301 )
            {
                new HitMessage("部分文件已损坏，请清除浏览器缓存重新进入");
                return;
            }
            var data = this.EncData(_byte.getUTFBytes(),311);   
            var mData = data.split('$');
            var mapRes = mData[0].split(',');
            if(mapRes[1] == "true")
            {
                mainMap.push(data);
                mainMapName.push(this.mapList[i]);
            }
        }
        var min = 0;
        var max = mainMap.length - 1;
        var random = Math.round(Math.random() * (max - min) + min);
        this.nowMap = mainMapName[random];
        this.playingGame(mainMap[random]);
    }

    this.playingGame = function(_data)
    {
        if(this.gameStart == true)
        {
            var data1 = _data.split('$');
            var massage = data1[0].split(',');
            if(massage[4] != "")
            {
                var msg = new MsgMenu();
                msg.init(massage[4],"#ffda5b","#4d330b",70,2,4,10);
                msg.x = 810;
                msg.y = 450;
                msg.play();
                this.addChild(msg);
            }
            if(massage[0] == "true")
            {
                this.changeBackGroundMap();
                var child = new BackGroundBubble();
                child.playChange();
                this.layerMiddle.addChild(child);
                this.bgBubble.push(child);
            }
        }else{
             this.gameStart = true;
        }
        this.startFirstTask(_data);
    }

    this.changeBackGroundMap = function()
    {
        var url = new Array();
        for(var i = 0;i < this.bgMapUrl.length;i++)
        {
            if(this.nowBgMap != this.bgMapUrl[i])
            {
                url.push(this.bgMapUrl[i]);
            }
        }
        var random =  Math.round(Math.random() * (url.length - 1));
        this.nowBgMap = url[random];
        this.bgChangeSprite = new Sprite();
        this.bgChangeSprite.loadImage(url[random]);
        this.bgChangeSprite.alpha = 0;
        this.TweenMain.addTween(Tween.to(this.bgChangeSprite,{alpha:1},600,null,Handler.create(this,this.changeBgMapComplate),delay = 500));
        this.layerBackGround.addChild(this.bgChangeSprite);
        for(var i = 0;i < this.FishList.length;i++)
        {   
            //this.FishList[i].remove();
            this.TweenMain.addTween(Tween.to(this.FishList[i],{alpha:0},500,null));
            if(this.FishList[i].shadow != null)
            {
                this.TweenMain.addTween(Tween.to(this.FishList[i].shadow,{alpha:0},500,null));
            }
            //Tween.to(this.FishList[i].shadow,{alpha:0},500,null);
        }
        this.FishList = new Array();
        this.createBubble();
    }

    this.changeBgMapComplate = function()
    {
        this.layerBackGround.dataSource = {skin:this.nowBgMap};
        this.layerBackGround.removeChild(this.bgChangeSprite);
        this.bgChangeSprite.destroy();
    }

    this.startFirstTask = function(_data)
    {
        var mData = _data.split('$');
        var data = mData[1].split('@');
        for(var i = 0;i < data.length;i++)
        {
            var str = data[i].split('|');
            var ptr = str[0].split(',');
            var ftr = str[1].split(',');
            var delayTime = parseInt(ptr[1]) * 1000;
            var task = new TaskDelay();
            task.data = [str,task];
            task.callBack = this.taskComplate;
            task.classObj = this;
            task.leftTime = delayTime;
            TaskDelayManager.getInstance().addTask(task);
            this.taskList.push(task);
        }
        var mapData = mData[0].split(',');
        var min = parseInt(mapData[2]);
        var max = parseInt(mapData[3]);
        if(min <= 0 || max <= 0 || this.mapList.length <= 1)
        {
            return;
        }
        var random = Math.random() * (max - min) + min;
        var mapTask = new TaskDelay();
        mapTask.data = [null];
        mapTask.callBack = this.changeMap;
        mapTask.classObj = this;
        mapTask.leftTime = (random * 1000);
        TaskDelayManager.getInstance().addTask(mapTask);
    }

    this.changeMap = function()
    {
        for(var i = 0;i < this.taskList.length;i++)
        {
            TaskDelayManager.getInstance().removeTask(this.taskList[i]);
        }
        this.taskList = new Array();
        //------choose new map
        var newMapList = new Array();
        for(var j = 0;j < this.mapList.length;j++)
        {
            if(this.mapList[j] != this.nowMap)
            {
                newMapList.push(this.mapList[j]);
            }
        }
        var min = 0;
        var max = newMapList.length - 1;
        var random = Math.round(Math.random() * (max - min) + min);
        this.nowMap = newMapList[random];
        var _data = Laya.loader.getRes("res/atlas/fishing/map/" + newMapList[random] + ".fmap");
        var _byte = new Byte( _data );
        if( _byte.getInt32() != 3112301 )
        {
            new HitMessage("部分文件已损坏，请清除浏览器缓存重新进入");
            return;
        }
        var data = this.EncData(_byte.getUTFBytes(),311); 
        this.playingGame(data);
    }

    this.taskComplate = function(_data)
    {
        var dat = _data[0];
        var ptr = dat[0].split(',');
        var ftr = new Array();
        var loopTime = parseFloat(ptr[3]);
        var waitTime = parseFloat(ptr[2]);
        //var count = 1;
        if((loopTime / 2) > waitTime)
        {
            var count = parseInt(loopTime / waitTime);
        }
        for(var i = 1;i < dat.length;i++)
        {
            ftr.push(dat[i]);
        }
        var pData = [0,count,(waitTime * 1000),ftr];
        this.loopComplate([pData,null]);
        //create loop
        if(ptr[5] == "false")
        {
            //task loop
            var delayTime = parseInt(ptr[4]) * 1000;
            var task = new TaskDelay();
            task.data = [dat,task];
            task.callBack = this.taskComplate;
            task.classObj = this;
            task.leftTime = delayTime;
            TaskDelayManager.getInstance().addTask(task);
            this.taskList.push(task);
        }
        this.removeTask(_data[1]);
    }

    this.loopComplate = function(_data)
    {
        var dat = _data[0];
        var num = dat[0];
        var count = dat[1];
        var waitTime = dat[2];
        var pacArray = dat[3];
        var max = pacArray.length - 1;
        var min = 0;
        var randomNum = Math.floor(Math.random()*(max-min+1)+min);
        this.createMoveClass(pacArray[randomNum]);
        num++
        if(num < count)
        {
            var data = [num,count,waitTime,pacArray];
            var task = new TaskDelay();
            task.data = [data,task];
            task.callBack = this.loopComplate;
            task.classObj = this;
            task.leftTime = dat[2];
            TaskDelayManager.getInstance().addTask( task );
            this.taskList.push(task);
        }
        this.removeTask(_data[1]);
    }

    this.removeTask = function(task)
    {
        for(var i = 0;i < this.taskList.length;i++)
        {
            if(task == this.taskList[i])
            {
                this.taskList.splice(i,1);
                return;
            }
        }
    }

    this.LoadingUI = function()
    {
        this.loadUI = new FishingLoadingUI();
        this.proUI = new Laya.ProgressBar("res/atlas/fishing/Progress.png");
        this.proUI.width = 984;
        this.proUI.pivot(492,27);
        this.proUI.x = 810;
        this.proUI.y = 800;
        this.proUI.sizeGrid = "5,5,5,5";
        this.proUI.value = 0;
        this.layerMiddle.addChild(this.loadUI);
        this.loadUI.addChild(this.proUI);
    }

    this.loadingUIVauleChange = function(_value)
    {
        if(_value >= 1)
        {
            this.removeChild(this.loadUI);
            this.loadUI.destroy();
            return;
        }
        this.proUI.value = _value;
    }

    this.loadDat = function()
    {
        var _data = Laya.loader.getRes("res/atlas/fishing/Attribute.data");
        var _byte = new Byte( _data );
        if( _byte.getInt32() != 3112301 )
        {
            new HintMessage("部分文件已损坏，请清除浏览器缓存重新进入");
            return;
        }
        var data = this.EncData(_byte.getUTFBytes(),311);
        var pData = data.split('|');
        for(var i = 0;i < pData.length;i++)
        {
            var config = pData[i].split(',');
            var _keys = config[0];
            this.attributeDic.set(_keys + "atu" + "_money",parseInt(config[1]));
            this.attributeDic.set(_keys + "atu" + "_speed",parseInt(config[2]));
            this.attributeDic.set(_keys + "atu" + "_proba",parseInt(config[3]));
        }
        this.onLoadMapData();
    }
    
    this.dicKyesContrast = function(_key,_keys)
    {
        for(var i = 0;i < _keys.length;i++)
        {
            if(_key == _keys[i])
            {
                return false;
            }
        }
        return true;
    }

    this.readTraData = function(_key,_data)
    {
        var _byte = new Byte(_data);
        if(_byte.getInt32() != 3112301)
        {
            new HintMessage("部分文件已损坏，请清除浏览器缓存重新进入");
            return;
        }
        var data = this.EncData(_byte.getUTFBytes(),311);
        var lst = data.split('@');
        if(lst.length != 8)
        {
            new HintMessage("部分文件已损坏，请清除浏览器缓存重新进入");
            return;
        }
        var seData = lst[0].split('#');
        if(seData.length != 2)
        {
            new HintMessage("部分文件已损坏，请清除浏览器缓存重新进入");
            return;
        }
        var pList = new Array();
        for(var a = 0;a < 2;a++)
        {
            var sst = seData[a].split(',');
            if(sst.length != 2)
            {
                new HintMessage("部分文件已损坏，请清除浏览器缓存重新进入");
                return;
            }
            pList.push(new Point(parseInt(sst[0]),parseInt(sst[1])));
        }
        var pData = lst[1];
        var pos = pData.split('#');
        for(var i = 0;i < pos.length;i++)
        {
            var str = pos[i].split(',');
            var x = parseInt(str[0]);
            var y = parseInt(str[1]);
            pList.push(new Point(x,y));
        }
        var spA = [lst[5]];
        var spB = lst[6].split(',');
        var speedArray = spA.concat(spB);
        this.traDic.set(_key,pList);
        this.traDic.set(_key + "_speed",speedArray);
    }

    this.readFishGroupData = function(_key,_data)
    {
        var _byte = new Byte(_data);
        if(_byte.getInt32() != 3112301)
        {
            new HintMessage("部分文件已损坏，请清除浏览器缓存重新进入");
            return;
        }
        var lineCheck = _byte.getInt32();
        var fishVaule = _byte.getInt32();
        var fArray = new Array();
        var data = this.EncData(_byte.getUTFBytes(),311);
        if(lineCheck == 0)
        {
            //线性鱼群
            var lData = data.split(',');
            var pac = lData[0];
            var num = parseInt(lData[1]);
            var dis = parseInt(lData[2]);
            fArray.push(0);
            fArray.push(pac);
            fArray.push(num);
            fArray.push(dis);
            this.fishDic.set(_key,fArray);
            if(this.ifRepeat(pac,this.fishNameList))
            {
                this.fishNameList.push(pac);
            }
            return;
        }
        var i = 0;
        var fData = data.split('|');
        var pData = fData[0].split('#');
        var pList = new Array();
        for(i = 0;i < pData.length;i++)
        {
            var str = pData[i].split(',');
            if(str.length != 2)
            {
                new HintMessage("部分文件已损坏，请清除浏览器缓存重新进入");
                return;
            }
            var angle = parseInt(str[0]) + 90;
            var distan = parseInt(str[1]);
            angle = angle * (Math.PI/180);
            var x = distan * Math.sin(angle);
            var y = distan * Math.cos(angle);
            pList.push(new Point(x,y));
        }
        var nData = fData[1].split('#');
        var name = new Array();
        for(i = 0;i < nData.length;i++)
        {
            name.push(nData[i]);
            if(this.ifRepeat(nData[i],this.fishNameList))
            {
                this.fishNameList.push(nData[i]);
            }
        }
        fArray.push(1);
        fArray.push(pList);
        fArray.push(name);
        this.fishDic.set(_key,fArray);
    }

    this.readCollision = function(_key,_data)
    {
        var _byte = new Byte(_data);
        if(_byte.getInt32() != 3112301)
        {
            new HintMessage("部分文件已损坏，请清除浏览器缓存重新进入");
            return;
        }
        var pLength = _byte.getInt32();
        var singleCheck = _byte.getByte();
        var px = _byte.getInt32();
        var py = _byte.getInt32();
        var data = this.EncData(_byte.getUTFBytes(),311);
        var i = 0;
        var pList = new Array();
        var dList = new Array();
        var pData;
        var x;
        var y;
        dList.push(new Point(px,py));
        dList.push(singleCheck);
        if(singleCheck)
        {
            pData = data.split('|');
            for(i = 0;i < pData.length;i++)
            {
                if(pData[i] != "null")
                {
                    var locList = pData[i].split('#');
                    var posArray = new Array();
                    for(var a = 0;a < locList.length;a++)
                    {
                        var str = locList[a].split(',');
                        if(str.length != 2)
                        {
                            new HintMessage("部分文件已损坏，请清除浏览器缓存重新进入");
                            return;
                        }
                        x = parseInt(str[0]);
                        y = parseInt(str[1]);
                        posArray.push(new Point(x,y));
                    }
                    pList.push(posArray);
                }else{
                    pList.push("null");
                }
            }
        }else{
            pData = data.split('#');
            for(i = 0;i < pData.length;i++)
            {
                var str = pData[i].split(',');
                if(str.length != 2)
                {
                    new HintMessage("部分文件已损坏，请清除浏览器缓存重新进入");
                    return;
                }
                x = parseInt(str[0]);
                y = parseInt(str[1]);
                pList.push(new Point(x,y));
            }

        }
        dList.push(pList);
        this.collisionDic.set(_key,dList);
    }

    this.readFormation = function(_key,_data)
    {
        var _byte = new Byte(_data);
        if(_byte.getInt32() != 3112301)
        {
            new HintMessage("部分文件已损坏，请清除浏览器缓存重新进入");
            return;
        }
        var count = _byte.getInt32();
        var speed = _byte.getInt32();
        var outNum = _byte.getInt32();
        var time = _byte.getInt32();
        var pData = this.EncData(_byte.getUTFBytes(),311);
        var str = pData.split('|');
        if(this.ifRepeat(str[0],this.fishNameList))
        {
            this.fishNameList.push(str[0]);
        }
        //----point Dic
        var startPoint = new Array();
        var endPoint = new Array();
        var sPD = str[1].split('#');
        var ePD = str[2].split('#');
        for(var i = 0;i < sPD.length;i++)
        {
            var lst = sPD[i].split(',');
            if(lst.length != 2)
            {
                new HintMessage("部分文件已损坏，请清除浏览器缓存重新进入");
                return;
            }
            var p1 = new Point(parseInt(lst[0]),parseInt(lst[1]));
            startPoint.push(p1);
            //--- end point
            var est = ePD[i].split(',');
            if(est.length != 2)
            {
                new HintMessage("部分文件已损坏，请清除浏览器缓存重新进入");
                return;
            }
            var p2 = new Point(parseInt(est[0]),parseInt(est[1])); 
            endPoint.push(p2);
        }
        if(endPoint.length != startPoint.length)
        {
            new HintMessage("部分文件已损坏，请清除浏览器缓存重新进入");
            return;
        }
        var forDat = [str[0],speed,startPoint,endPoint,time];
        this.formationDic.set(_key,forDat);
    }

    this.createMoveClass = function(_data)
    {
        var data = _data.split(',');
        if(data.length == 1)
        {
            this.createFormationMoveClass(data);
            return;
        }
        var fishData = data[0].split('-');
        var path = this.traDic.get(data[1]);
        var speed = this.traDic.get(data[1] + "_speed");
        var fishPos = new Array();
        var fishPac = new Array();
        if(fishData.length == 2)
        {
            //鱼群
            var fishArray = this.fishDic.get(fishData[1]);
            if(fishArray[0])
            {
                var array = fishArray[1];
                var initPos = [new Point(0,0)];
                fishPos = initPos.concat(array);
                fishPac = fishArray[2];
            }else{
                this.fishLineCreate(fishArray,path,speed);
                return;
            }
        }else{
            fishPos.push(new Point(0,0));
            fishPac.push(data[0]);
        }
        var child = Factory.getInstance().createObj('moveClass',FishMoveClass);
        child.setPath(path,speed);
        for(var i = 0;i < fishPos.length;i++)
        {
            var fish = Factory.getInstance().createObj('fish',FishBase);
            var collision = this.collisionDic.get(fishPac[i]);
            var _keys = fishPac[i];
            fish.init("res/atlas/fishing/image/" + fishPac[i] + ".json");
            fish.setCollision(collision);
            fish._money = this.attributeDic.get(_keys + "atu" + "_money");
            fish._speed = this.attributeDic.get(_keys + "atu" + "_speed");
            fish._proba = this.attributeDic.get(_keys + "atu" + "_proba");
            fish.x = fishPos[i].x;
            fish.y = fishPos[i].y;
            fish.fishID = fishPac[i];
            fish.play();
            fish.fishShadow(this.layerShadow);
            child.addFish(fish);
            child.addChild(fish);
            this.FishList.push(fish);
            //fish.fishShadow();
        }
        child.play();
        this.layerFish.addChild(child);
    }

    this.createFormationMoveClass = function(_data)
    {
        var pList = this.formationDic.get(_data[0]);
        var pac = pList[0];
        var speed = pList[1];
        var sList = pList[2];
        var eList = pList[3];
        var time = pList[4];
        for(var i = 0;i < sList.length;i++)
        {
            //return;
            var path = [sList[i],eList[i],sList[i],eList[i]];
            var child = Factory.getInstance().createObj('moveClass',FishMoveClass);
            child.ifFormation = true;
            child.alphaTime = time;
            child.setPath(path,[speed,speed,speed,speed]);
            var fish = Factory.getInstance().createObj('fish',FishBase);
            var collision = this.collisionDic.get(pac);
            var _keys = pac;
            fish.init("res/atlas/fishing/image/" + pac + ".json");
            fish.setCollision(collision);
            fish._money = this.attributeDic.get(_keys + "atu" + "_money");
            fish._speed = this.attributeDic.get(_keys + "atu" + "_speed");
            fish._proba = this.attributeDic.get(_keys + "atu" + "_proba");
            fish.x = 0;
            fish.y = 0;
            fish.fishID = pac;
            fish.play();
            fish.fishShadow(this.layerShadow);
            child.addFish(fish);
            child.addChild(fish);
            this.FishList.push(fish);
            //---  end
            child.play();
            this.layerFish.addChild(child);
        }
    }

    this.fishLineCreate = function(_data,_path,_speed)
    {
        var data = _data;
        for(var i = 0;i < data[2];i++)
        {
            var path = _path.slice();
            var p1 = _path[0];
            var p2 = _path[2];
            var dis = i * data[3];
            var child = Factory.getInstance().createObj('moveClass',FishMoveClass);
            var fish = Factory.getInstance().createObj('fish',FishBase);
            var _keys = data[1];
            var collision = this.collisionDic.get(_keys);
            fish.init("res/atlas/fishing/image/" + data[1] + ".json");
            fish.setCollision(collision);
            fish._money = this.attributeDic.get(_keys + "atu" + "_money");
            fish._speed = this.attributeDic.get(_keys + "atu" + "_speed");
            fish._proba = this.attributeDic.get(_keys + "atu" + "_proba");
            fish.fishID = data[1];
            fish.play();
            fish.fishShadow(this.layerShadow);
            child.setPath(path,_speed);
            child.addFish(fish);
            child.addChild(fish);
            path[0] = this.callAlwaysPoint(p1,p2,dis);
            child.play();
            this.layerFish.addChild(child);
            this.FishList.push(fish);
        }
    }

    this.callAlwaysPoint = function(p1,p2,dis)
        {
            var angle = (Math.atan2((p2.y - p1.y),(p2.x - p1.x))) * (180/Math.PI) + 180;
            var x = p1.x + dis * Math.cos(angle * (Math.PI/180));
            var y = p1.y + dis * Math.sin(angle * (Math.PI/180));
            var point = new Point(x,y);
            return point;
        }

    this.update = function(dt)
    {
        if( !this.visible )
            return;
        for( var i = 0;i < this.BulletList.length; i++)
        {
            var bullet = this.BulletList[i];
            if( bullet && bullet.parent == null )//子弹自己已经移动到屏幕外面去了
            {
                this.BulletList.splice(i,1);
                i--;
                continue;
            }else
            {
                for( var j = 0;j < this.FishList.length;j++ )
                {
                    var fish = this.FishList[j];
                    if(fish && fish.parent == null)
                    {
                        this.FishList.splice(j,1);
                        j--;
                        continue;
                    }
                    if( !fish )
                        return;
                    if(this.onHit(fish,bullet))
                    {
                        if(this.collisionTesting(fish,bullet))
                        {
                            this.collisionPro( bullet );
                            this.hitFish(fish,bullet);
                            bullet.remove();
                            this.BulletList.splice(i,1);
                            i--;
                            break;
                        }
                    } 
                }
            }
        }
    }

    this.hitFish = function(fish,bullet)
    {
        var fishId = fish.fishID;
        var _money = (((bullet.level + 1) * 100) * fish._money) * this.IntegralMultiple;
        var proba = this.attributeDic.get(fishId + "atu" + "_proba");
        var result = Math.random()*(100 - 1) + 1;
        if( result <= proba)
        {
            //-----鱼死亡列表重新排序
            this.fishListRefresh(fish);
            // for(var f = 0;f < this.FishList.length;f++)
            // {
            //     if(fish == this.FishList[f])
            //     {
            //         this.FishList.splice(f,1);
            //         //console.log("length _" + this.FishList.length + "    f: " + f);
            //         break;
            //     }
            // }
            //console.log("new  length _" + this.FishList.length);
            //str = String(this.FishList.length);
            //-----
            var _parent = fish.parent;
            fish.remove();
            _parent.popChild(fish);
            var area = fish.width * fish.height;
            var count = Math.ceil(area / 8000);
            for(var i = 0;i < count;i++)
            
            {
                var gold = new Effect();
                gold.init("res/atlas/fishing/Effects/gold.json",25,false);
                gold.play();
                gold.pivotX = 25;
                gold.pivotY = 25;
                gold.scaleX = gold.scaleY = 0.8;
                var addX = (Math.random()*(fish.width + fish.width) - fish.width) / 2;
                var addY = (Math.random()*(fish.height + fish.height) - fish.height) / 2;
                gold.x = fish.x + _parent.x ; 
                gold.y = fish.y + _parent.y ;
                this.layerMiddle.addChild(gold);
                this.TweenMain.addTween(Tween.to(gold,{x:gold.x + addX,y:gold.y + addY},1000,Ease['elasticOut'],Handler.create(gold,gold.disappear)));
                var delayTime = (Math.random() * 80) + 1000;
                var dis = Math.sqrt( (gold.x - this.cannon.x) * (gold.x - this.cannon.x) + (gold.y - this.cannon.y) * (gold.y - this.cannon.y));
                var setTime = dis * 0.6;
                this.TweenMain.addTween(Tween.to(gold,{x:this.cannon.x,y:this.cannon.y},setTime,null,Handler.create(gold,gold.disappear),delay = delayTime));
            }
            var boom = new Effect();
            boom.init("res/atlas/fishing/Effects/boom.json",60,false);
            boom.play();
            boom.pivotX = boom.pivotY = 425;
            boom.scaleX = boom.scaleY = (fish.width * fish.height) / 60000;
            boom.x = fish.x + _parent.x ; 
            boom.y = fish.y + _parent.y ;
            this.layerWave.addChild(boom);
            var _point = new Point(fish.x + _parent.x,fish.y + _parent.y);
            if(boom.scaleX > 1)
            {
                this.EarthQuake();
                _point = new Point(810,600);
                this.moneyLable(_money,_point);
                return;
            }
            this.getSmlMoney(_money,_point);
            this.getAbilityCalculation();
        }
    }

    this.fishListRefresh = function(fish)
    {
        for(var f = 0;f < this.FishList.length;f++)
        {
            if(fish == this.FishList[f])
            {
                this.FishList.splice(f,1);
                break;
            }
        }
    }

    this.getAbilityCalculation = function()
    {
        if(this.AbilityConsoleSprite == null)
        {
            var random = parseInt(Math.random() * 100);
            if(random < this.AbilityConsoleProbability)
            {
                this.AbilityConsoleSprite = new Sprite();
                var _path = "res/atlas/fishing/Effects/cannon1.json";
                this.cannonAnimaction = new Animation();
                this.cannonAnimaction.loadAtlas( _path );
                this.cannonAnimaction.interval = 60;
                this.cannonAnimaction.play(); 
                this.cannonAnimaction.alpha = 0;
                this.AbilityConsoleSprite.addChild(this.cannonAnimaction);
                _path = "fishing/Effects/cannon2/light.png";
                this.cannonAnimactionLv1 = new Sprite();
                this.cannonAnimactionLv1.loadImage(_path);
                this.cannonAnimactionLv1.pivotX = 200;
                this.cannonAnimactionLv1.pivotY = 130;
                this.cannonAnimactionLv1.x = 810;
                this.cannonAnimactionLv1.y = 900;
                this.layerMiddle.addChild(this.cannonAnimactionLv1);
                this.AbilityConsoleSprite.pivotX = 200;
                this.AbilityConsoleSprite.pivotY = 250;
                this.AbilityConsoleSprite.x = 810;
                this.AbilityConsoleSprite.y = 900;
                this.layerMiddle.addChild(this.AbilityConsoleSprite);
                var bufferTimer = parseInt(Math.random() * (30 - 10 + 1) + 10);
                this.IntegralMultiple = parseInt(Math.random() * (5 - 2 + 1) + 2);
                this.TweenMain.addTween(Tween.to(this.cannonAnimactionLv1,{rotation:180},((bufferTimer * 1000) * 0.8),null));
                this.TweenMain.addTween(Tween.to(this.cannonAnimactionLv1,{y:960},((bufferTimer * 1000) * 0.2),null,Handler.create(this,this.disappear),delay = ((bufferTimer * 1000) * 0.8)));
                var str = "进入" + this.IntegralMultiple + "倍狂暴，持续" + bufferTimer + "秒";
                var task = new TaskDelay();
                task.data = null;
                task.callBack = this.AbilityEnd;
                task.classObj = this;
                task.leftTime = bufferTimer * 1000;
                TaskDelayManager.getInstance().addTask(task);
                this.AbilityMsg(str);
            }
        }
    }

    this.AbilityEnd = function()
    {
        this.IntegralMultiple = 1;
        this.TweenMain.addTween(Tween.to(this.AbilityConsoleSprite,{alpha:0},500,null,Handler.create(this,this.onAbilityComplete)));
    }

    this.onAbilityComplete = function()
    {
        this.layerMiddle.removeChild(this.AbilityConsoleSprite);
        this.layerMiddle.removeChild(this.cannonAnimactionLv1);
        this.cannonAnimaction.destroy();
        this.cannonAnimactionLv1.destroy();
        this.AbilityConsoleSprite.destroy();
        this.AbilityConsoleSprite = null;
        this.cannonAnimaction = null;
        this.cannonAnimactionLv1 = null;
    }

    this.AbilityMsg = function(_str)
    {
        var msg = new MsgMenu();
        msg.BoardVisible = false;
        msg.init(_str,"#ffda5b","#4d330b",40,2,4,10);
        msg.x = 810;
        msg.y = 800;
        this.addChild(msg);
        msg.scaleX = msg.scaleY = 0;
        this.TweenMain.addTween(Tween.to(msg,{scaleX:1,scaleY:1},300,Ease['backOut']));
        this.TweenMain.addTween(Tween.to(msg,{alpha:0},500,null,Handler.create(msg,msg.disappear),delay = 1200));
        var task = new TaskDelay();
        task.data = msg;
        task.callBack = this.removeNum;
        task.classObj = this;
        task.leftTime = 1500;
        TaskDelayManager.getInstance().addTask(task);
    }

    this.moneyLable = function(_money,_point)
    {
        var sp = new Sprite();
        sp.loadImage("fishing/Effects/bonuslabel/diban.png");
        sp.pivot(sp.width/2,sp.height/2);
        sp.x = _point.x;
        sp.y = _point.y;
        sp.alpha = 0;
        var _url = 
        [
            "res/atlas/fishing/Effects/bonuslabel/light.json",
            "res/atlas/fishing/Effects/bonuslabel/roundLight.json",
            "res/atlas/fishing/Effects/bonuslabel/beam.json",
        ];
        for(var i = 0;i < _url.length;i++)
        {
            var anim = new Animation();
            anim.loadAtlas(_url[i]);
            anim.interval = 80;
            anim.play(); 
            anim.x = -85;
            anim.y = -82
            sp.addChild(anim);
            if(i == 0)
            {
                anim.blendMode = "lighter";
            }
        }
        this.layerWave.addChild(sp);
        this.TweenMain.addTween(Tween.to(sp,{alpha:1},1000,null));
        this.TweenMain.addTween(Tween.to(sp,{alpha:0},500,null,Handler.create(sp,sp.disappear),delay = 3000));
        this.getLotMoney(_money,_point);
    }

    this.getLotMoney = function(_money,_point)
    {
        var sp = new Sprite();
        var num = _money.toString();
        var w = 60;
        sp.loadImage("fishing/Num/jia.png",0,0);
        for(var i = 0;i < num.length;i++)
        {
            var index = parseInt(num.charAt(i));
            sp.loadImage(this.numImagePac[index],w + (i * w),0);
        }
        sp.scaleX = sp.scaleY = 3;
        sp.pivot(sp.width/2,sp.height/2);
        sp.alpha = 0;
        sp.x = _point.x;
        sp.y = _point.y;
        this.TweenMain.addTween(Tween.to(sp,{alpha:1,scaleX:0.6,scaleY:0.6},1000,null));
        this.TweenMain.addTween(Tween.to(sp,{alpha:0},500,null,Handler.create(sp,sp.disappear),delay = 3000));
        this.layerWave.addChild(sp);
    }

    this.getSmlMoney = function(_money,_point)
    {
        var sp = new Sprite();
        var num = _money.toString();
        var w = 60;
        sp.loadImage("fishing/Num/jia.png",0,0);
        for(var i = 0;i < num.length;i++)
        {
            var index = parseInt(num.charAt(i));
            sp.loadImage(this.numImagePac[index],w + (i * w),0);
        }
        sp.x = _point.x;
        sp.y = _point.y;
        sp.scaleX = sp.scaleY = 0.3;
        this.addChild(sp);
        this.TweenMain.addTween(Tween.to(sp,{y:sp.y - 50,alpha:0},2000,null));
        var task = new TaskDelay();
        task.data = sp;
        task.callBack = this.removeNum;
        task.classObj = this;
        task.leftTime = 2000;
        TaskDelayManager.getInstance().addTask(task);
    }

    this.removeNum = function(sp)
    {
        sp.destroy();
        this.removeChild(sp);
    }

    this.EarthQuake = function()
    {
        Tween.clearAll(this);
        this.x = 0;
        this.y = 0;
        var t1 = 200;
        this.TweenMain.addTween(Tween.to(this,{y:20},t1,Ease['bounceIn'],Handler.create(this,this.disappear)));
        var t2 = 200;
        this.TweenMain.addTween(Tween.to(this,{y:-2},t2,Ease['bounceOut'],Handler.create(this,this.disappear),delay = t1));
        var t3 = 200;
        this.TweenMain.addTween(Tween.to(this,{x:0,y:0},t3,Ease['bounceOut'],Handler.create(this,this.disappear),delay = t1 + t2));
    }

    this.onHit = function(fish,bullet)
    {
        var fPoint = this.onHitVaule(fish,"point")
        var bPoint = this.onHitVaule(bullet,"point")
        var fwidth = this.onHitVaule(fish,"width")
        var bwidth = this.onHitVaule(bullet,"width")
        var fheight = this.onHitVaule(fish,"height")
        var bheight = this.onHitVaule(bullet,"height")
        if((fPoint.x + fwidth) < bPoint.x || (bPoint.x + bwidth) < fPoint.x || (fPoint.y + fheight) < bPoint.y || (bPoint.y + bheight) < fPoint.y)
        {
            return false;
        }
        return true;
    }

    this.onHitVaule = function(unit,str)
    {
        var xArray = new Array(4);
        var yArray = new Array(4);
        if(unit.constructor === FishBase)
        {
            var vertexData = this.onAngleVertexData(unit);
            var fpx = (unit.x + unit.parent.x) - unit.pivotX;
            var fpy = (unit.y + unit.parent.y) - unit.pivotY;
        }else{
            var vertexData = unit.vertexData;
            var fpx = unit.x - unit.pivotX;
            var fpy = unit.y - unit.pivotY;
        }
        for(var i = 0;i < vertexData.length;i++)
        {
            xArray[i] = vertexData[i].x;
            yArray[i] = vertexData[i].y;
        }
        var minX = Math.min.apply(Math,xArray) + fpx;
        var maxX = Math.max.apply(Math,xArray) + fpx;
        var minY = Math.min.apply(Math,yArray) + fpy;
        var maxY = Math.max.apply(Math,yArray) + fpy;
        var mPoint = new Point(minX,minY);
        var mwidth = Math.sqrt((minX - maxX) * (minX - maxX) + (minY - minY) * (minY - minY));
        var mheight = Math.sqrt((minX - minX) * (minX - minX) + (minY - maxY) * (minY - maxY));
        if(str == "point")
        {
            return mPoint;

        }else if(str == "width")
        {
            return mwidth;

        }else if(str == "height")
        {
            return mheight;
        }
        return;
    }
    
    this.onFishLine = function(fish)
    {
        var vertexData = fish.vertexData;
        var point = new Array(4);
        var xArray = new Array(4);
        var yArray = new Array(4);
        var fpx = fish.x - fish.pivotX;
        var fpy = fish.y - fish.pivotY;
        for(var i = 0;i < vertexData.length;i++)
        {
            xArray[i] = vertexData[i].x;
            yArray[i] = vertexData[i].y;
        }
        var minX = Math.min.apply(Math,xArray) + fpx;
        var maxX = Math.max.apply(Math,xArray) + fpx;
        var minY = Math.min.apply(Math,yArray) + fpy;
        var maxY = Math.max.apply(Math,yArray) + fpy;
        point[0] = new Point(minX,minY);
        point[1] = new Point(maxX,minY);
        point[2] = new Point(maxX,maxY);
        point[3] = new Point(minX,maxY);
        var locArray = new Array();
        for(var i = 0;i < point.length;i++)
        {
            locArray.push(point[i].x);
            locArray.push(point[i].y);
        }
        locArray.push(point[0].x - 1);
        locArray.push(point[0].y - 1);
    }

    this.onBulletLine = function(bullet)
    {
        var vertexData = bullet.vertexData;
        var point = new Array(4);
        var xArray = new Array(4);
        var yArray = new Array(4);
        var fpx = bullet.x - bullet.pivotX;
        var fpy = bullet.y - bullet.pivotY;
        for(var i = 0;i < vertexData.length;i++)
        {
            xArray[i] = vertexData[i].x;
            yArray[i] = vertexData[i].y;
        }
        var minX = Math.min.apply(Math,xArray) + fpx;
        var maxX = Math.max.apply(Math,xArray) + fpx;
        var minY = Math.min.apply(Math,yArray) + fpy;
        var maxY = Math.max.apply(Math,yArray) + fpy;
        point[0] = new Point(minX,minY);
        point[1] = new Point(maxX,minY);
        point[2] = new Point(maxX,maxY);
        point[3] = new Point(minX,maxY);
        var locArray = new Array();
        for(var i = 0;i < point.length;i++)
        {
            locArray.push(point[i].x);
            locArray.push(point[i].y);
        }
        locArray.push(point[0].x - 1);
        locArray.push(point[0].y - 1);
        this.testsp.width = this.layerFish.width;
        this.testsp.height = this.layerFish.height;
        this.testsp.graphics.clear()
        this.testsp.graphics.drawLines(0,0,locArray,"#FFFFFFFF",1);
    }


    this.simpleLineTest = function(l1p1x,l1p1y,l1p2x,l1p2y,l2p1x,l2p1y,l2p2x,l2p2y)
    {
            var line1p1 = 0;
            line1p1=(l1p2x-l1p1x)*(l2p1y-l1p1y)-(l2p1x-l1p1x)*(l1p2y-l1p1y);
            var line1p2 = 0;
            line1p2=(l1p2x-l1p1x)*(l2p2y-l1p1y)-(l2p2x-l1p1x)*(l1p2y-l1p1y);
            var line2p1 = 0;
            line2p1=(l2p2x-l2p1x)*(l1p1y-l2p1y)-(l1p1x-l2p1x)*(l2p2y-l2p1y);
            var line2p2 = 0;
            line2p2=(l2p2x-l2p1x)*(l1p2y-l2p1y)-(l1p2x-l2p1x)*(l2p2y-l2p1y);
            if ((line1p1*line1p2<=0)&&(line2p1*line2p2<=0)) {
                return true;
            } else {
                return false;
            }
    }
    this.collisionTesting = function(fish,bullet)
    {
            var bpList = bullet.pointData;
            var bpx = bullet.x - bullet.pivotX;
            var bpy = bullet.y - bullet.pivotY;
            var fpx = (fish.x + fish.parent.x) - fish.pivotX;
            var fpy = (fish.y + fish.parent.y) - fish.pivotY;
            var fpList = this.onAngleCollision(fish);
            if(bpList == null || fpList == null)
            {
                return;
            }
            for(var i = 0; i < bpList.length - 1;i++)
            {
                for(var k = 0;k < fpList.length - 1;k++)
                {
                    var slin1x = bpList[i].x   + bpx;
                    var slin1y = bpList[i].y   + bpy;
                    var slin2x = bpList[i+1].x + bpx;
                    var slin2y = bpList[i+1].y + bpy;
                    var elin1x = fpList[k].x   + fpx;
                    var elin1y = fpList[k].y   + fpy;
                    var elin2x = fpList[k+1].x + fpx;
                    var elin2y = fpList[k+1].y + fpy;
                    if(this.simpleLineTest(slin1x,slin1y,slin2x,slin2y,elin1x,elin1y,elin2x,elin2y))
                    {
                        return true;
                    }
                }
            }
            return false;
    }

    this.onAngleCollision = function(unit)
    {
        var pList = unit.getCollision();
        var pData = new Array();
        if(pList.length < 1)
        {
            return;
        }
        for(var i = 0;i < pList.length;i++)
        {
            var point = pList[i];
            var distance = Math.sqrt( (unit.pivotX - point.x) * (unit.pivotX - point.x) + (unit.pivotY - point.y) * (unit.pivotY - point.y) );
            var angle = (unit.rotation * Math.PI/180);//角度转换成弧度
            var x = (point.x - unit.pivotX) * Math.cos(angle) - (point.y - unit.pivotY) * Math.sin(angle) + unit.pivotX;
            var y = (point.y - unit.pivotY) * Math.cos(angle) + (point.x - unit.pivotX) * Math.sin(angle) + unit.pivotY;
            pData.push(new Point(x,y));
        }
        return pData;
    }

    this.onAngleVertexData = function(unit)
    {
        var pList = unit.vertexData;
        var pData = new Array();
        if(pList.length < 1)
        {
            return;
        }
        for(var i = 0;i < pList.length;i++)
        {
            var point = pList[i];
            var distance = Math.sqrt( (unit.pivotX - point.x) * (unit.pivotX - point.x) + (unit.pivotY - point.y) * (unit.pivotY - point.y) );
            var angle = (unit.rotation * Math.PI/180);//角度转换成弧度
            var x = (point.x - unit.pivotX) * Math.cos(angle) - (point.y - unit.pivotY) * Math.sin(angle) + unit.pivotX;
            var y = (point.y - unit.pivotY) * Math.cos(angle) + (point.x - unit.pivotX) * Math.sin(angle) + unit.pivotY;
            pData.push(new Point(x,y));
        }
        return pData;
    }
    //碰撞处理
    this.collisionPro = function( _bullet )
    {
        this.createFishNet( new Point(_bullet.x,_bullet.y) );
    }

    //创建渔网
    this.createFishNet = function( _point )
    {
        //return;
        var fishNet = Factory.getInstance().createObj( 'fishNet',FishNetBase );
        fishNet.init('fishing/UI/net-hd.png');
        fishNet.anchorX = 0.5;
        fishNet.anchorY = 0.5;
        fishNet.x = _point.x;
        fishNet.y = _point.y;
        this.layerMiddle.addChild( fishNet );
        fishNet.scaleX = fishNet.scaleY = 0.4;
        fishNet.alpha = 1;
        this.TweenMain.addTween(Tween.to( fishNet,{scaleX:0.5,scaleY:0.5},500,Ease['elasticOut'],Handler.create(fishNet, fishNet.disappear) ));
        this.TweenMain.addTween(Tween.to( fishNet,{alpha:0},5000,Ease['elasticOut'],Handler.create(fishNet, fishNet.disappear) ));
        var bubble = new Effect();
        bubble.init("res/atlas/fishing/Effects/bubble.json",60,false);
        bubble.play();
        bubble.pivotX = 100;
        bubble.pivotY = 100;
        bubble.x = _point.x;
        bubble.y = _point.y;
        this.layerMiddle.addChild(bubble);
    }
    //remove bubble
    this.onBubbleComplate = function(e)
    {
        e.destroy();
        return;
    }
    //监听事件
    this.addListener = function()
    {
        //发射子弹
         Laya.stage.on(Event.MOUSE_MOVE,this,this.onStageMouseMove);
         this.layerFish.on(Event.MOUSE_DOWN,this,this.onDownMouse);
         Laya.stage.on(Event.MOUSE_UP,this,this.onUpMouse);
         Laya.stage.on(Event.MOUSE_OUT,this,this.onUpMouse);
         //切换炮台
         this.cannonLvUp.on(Event.CLICK,this,this.cannonLevelUp);
         this.cannonLvDown.on(Event.CLICK,this,this.cannonLevelDown);
    }

    //
    this.onDownMouse = function()
    {
        this.stageTimer = new Laya.Timer();
        this.onStageClick();
        this.stageTimer.loop(200,this,this.onStageClick);
    }

    this.onUpMouse = function()
    {
        if(this.stageTimer == null)
        {
            return;
        }
        this.stageTimer.clear(this,this.onStageClick);
    }
    //舞台点击
    this.onStageClick = function()
    {
        this.onStageMouseMove();
        this.createBullet();
    }

    this.cannonLevelUp = function()
    {
        if(this.cannonLevel >= 2)
        {
            this.cannonLevel = -1;
        }
        this.cannonLevel ++
        this.changeCannonImage(this.cannonLevel);
    }

    this.cannonLevelDown = function()
    {
        if(this.cannonLevel <= 0)
        {
            this.cannonLevel = 3;
        }
        this.cannonLevel --
        this.changeCannonImage(this.cannonLevel);
    }

    this.changeCannonImage = function(_level)
    {
        switch(_level)
        {
            case 0:{
                this.cannon.dataSource = {skin:"fishing/UI/CannonLevel1.png"};
                this.cannonLvText.text = "x100";
                break;
            }
            case 1:{
                this.cannon.dataSource = {skin:"fishing/UI/CannonLevel2.png"};
                this.cannonLvText.text = "x200";
                break;
            }
            case 2:{
                this.cannon.dataSource = {skin:"fishing/UI/CannonLevel3.png"};
                this.cannonLvText.text = "x300";
                break;
            }
        }
    }

    //创建一个子弹
    this.createBullet = function()
    {
        var bullet = Factory.getInstance().createObj('bullet',BulletBase);
        bullet.init(this.cannonLevel,80,20,this.cannonLevel);
        var rect = bullet.getBounds();
        bullet.pivotX = rect.width >> 1;
        bullet.rotation = this.cannon.rotation;
        bullet.x = this.cannon.x;
        bullet.y = this.cannon.y;
        bullet.x += Math.sin( bullet.rotation*Math.PI/180 ) * (this.cannon.height + 30);
        bullet.y -= Math.cos( bullet.rotation*Math.PI/180 ) * (this.cannon.height + 30);
        this.layerMiddle.addChild( bullet );
        this.BulletList.push( bullet );
        bullet.onVerAngle(this.cannon.rotation);
        bullet.onAngle();
        this.cannonAnim();
    }

    //鼠标舞台移动
    this.onStageMouseMove = function()
    {
        var a = Math.sqrt( Math.pow((this.scrX - Laya.stage.mouseX),2) + Math.pow(0,2) );
        var b = this.cannon.y - Laya.stage.mouseY;
        b = b <= 0 ? 0 : b;
        var rot = 180 / Math.PI * Math.atan( a / b );
        if( Laya.stage.mouseX - this.scrX < 0 )
        {
            rot = -rot;
        }
        this.cannon.rotation = rot;
    }

    //炮台动画
    this.cannonAnim = function()
    {
        var t = 35;
        var x = this.cannon.x;
        var y = this.cannon.y;
        var angle = this.cannon.rotation;
        this.TweenMain.addTween(Tween.to( this.cannon,{scaleX:1.3,scaleY:0.75},t,Ease['linearln'],Handler.create(this.cannon, this.cannon.disappear) ));
        this.TweenMain.addTween(Tween.to( this.cannon,{scaleX:1,scaleY:1,},t,Ease['linearln'],Handler.create(this.cannon, this.cannon.disappear),t ));
        //枪焰
        var fire = new Sprite();
        fire.loadImage("fishing/UI/fire.png");
        fire.pivotX = 75;
        fire.pivotY = 150;
        fire.x = x + Math.sin(angle*Math.PI/180 ) * (this.cannon.height - 20);
        fire.y = y - Math.cos(angle*Math.PI/180 ) * (this.cannon.height - 20);
        fire.rotation = this.cannon.rotation;
        switch(this.cannonLevel)
        {
            case 0:{
                fire.scaleX = fire.scaleY = 0.8;
                break;
            }
            case 1:{
                fire.scaleX = fire.scaleY = 1;
                break;
            }
            case 2:{
                fire.scaleX = fire.scaleY = 1.3;
                break;
            }
        }
        this.layerMiddle.addChild(fire);
        var task = new TaskDelay();
        task.data = fire;
        task.callBack = this.removeFire;
        task.classObj = this;
        task.leftTime = 50;
        TaskDelayManager.getInstance().addTask(task);
    }

    this.removeFire = function(_data)
    {
        var child = _data;
        child.destroy();
    }

    //Enc data
    this.EncData = function(_data,_key)
    {
        var str = "";
        for(var i = 0;i < _data.length;i++)
		{
			var s = String.fromCharCode(_data.charCodeAt(i) ^ _key);
			str += s;
		}
		return str;
    }
    //GC
    this.gc = function()
    {
        Laya.stage.off(Event.MOUSE_MOVE,this,this.onStageMouseMove);
        Laya.stage.off(Event.CLICK,this,this.onStageClick);

        //释放内存池
        laya.utils.Pool.clearBySign('bullet');
        laya.utils.Pool.clearBySign('fish');
    }
}