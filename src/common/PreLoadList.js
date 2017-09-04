var PreLoadList = (function()
{
    function _PreLoadList()
    {
        this.loading = 
        [
            {url:"res/atlas/loading.json",type:Loader.ATLAS},
        ];
        this.preGame = 
        [
            {url:"res/atlas/common.json",type:Loader.ATLAS},
        ];
        this.bgHallMusic = 
        [
            {url:"audio/bgDushi.mp3",type:Loader.SOUND},
            {url:"audio/bgJiuhui.mp3",type:Loader.SOUND},
            {url:"audio/bgYouxian.mp3",type:Loader.SOUND},
        ];
        this.bgGameMusic = 
        [
            {url:"audio/bgJueshi.mp3",type:Loader.SOUND},
        ];
        this.soundMale = 
        [
            {url:"audio/male/allIn.mp3",type:Loader.SOUND},
            {url:"audio/male/giveCard.mp3",type:Loader.SOUND},            
            {url:"audio/male/dropCard.mp3",type:Loader.SOUND},
            {url:"audio/male/followCard.mp3",type:Loader.SOUND},
            {url:"audio/male/passCard.mp3",type:Loader.SOUND},
            {url:"audio/male/raise.mp3",type:Loader.SOUND},
            {url:"audio/male/8.mp3",type:Loader.SOUND},
            {url:"audio/male/9.mp3",type:Loader.SOUND},
            {url:"audio/male/10.mp3",type:Loader.SOUND},
            {url:"audio/male/11.mp3",type:Loader.SOUND},
            {url:"audio/male/12.mp3",type:Loader.SOUND},
            {url:"audio/male/13.mp3",type:Loader.SOUND},
            {url:"audio/male/1.mp3",type:Loader.SOUND},
            {url:"audio/male/club.mp3",type:Loader.SOUND},//梅花
            {url:"audio/male/heart.mp3",type:Loader.SOUND},//红桃
            {url:"audio/male/spade.mp3",type:Loader.SOUND},//黑桃
            {url:"audio/male/TongHua.mp3",type:Loader.SOUND},//同花
            {url:"audio/male/FuErHaoSi.mp3",type:Loader.SOUND},//福尔豪斯
            {url:"audio/male/SiTiao.mp3",type:Loader.SOUND},//四条
            {url:"audio/male/SanPai.mp3",type:Loader.SOUND},//散牌
            {url:"audio/male/ErDui.mp3",type:Loader.SOUND},//两对
            {url:"audio/male/SanTiao.mp3",type:Loader.SOUND},//三条
            {url:"audio/male/DanDui.mp3",type:Loader.SOUND},//一对
            {url:"audio/male/speak.mp3",type:Loader.SOUND},//面说话
            {url:"audio/male/ShunZi.mp3",type:Loader.SOUND},//顺子
            {url:"audio/male/TongHuaShun.mp3",type:Loader.SOUND},//同花顺
            {url:"audio/male/BaoZi.mp3",type:Loader.SOUND},//豹子
            {url:"audio/male/compareCard.mp3",type:Loader.SOUND},//
            {url:"audio/male/followAgain.mp3",type:Loader.SOUND},//
            {url:"audio/male/followAgain2.mp3",type:Loader.SOUND},//
            {url:"audio/male/gfDropCard.mp3",type:Loader.SOUND},//炸金花弃牌
            {url:"audio/male/hurryUp.mp3",type:Loader.SOUND},//
            {url:"audio/male/JinHua.mp3",type:Loader.SOUND},//
            {url:"audio/male/noMoney.mp3",type:Loader.SOUND},//
            {url:"audio/male/tiaoZhan.mp3",type:Loader.SOUND},//
            {url:"audio/male/showCard.mp3",type:Loader.SOUND},//
        ];
        this.soundFemale = 
        [
            {url:"audio/female/allIn.mp3",type:Loader.SOUND},
            {url:"audio/female/giveCard.mp3",type:Loader.SOUND},
            {url:"audio/female/dropCard.mp3",type:Loader.SOUND},
            {url:"audio/female/followCard.mp3",type:Loader.SOUND},
            {url:"audio/female/passCard.mp3",type:Loader.SOUND},
            {url:"audio/female/raise.mp3",type:Loader.SOUND},
            {url:"audio/female/8.mp3",type:Loader.SOUND},
            {url:"audio/female/9.mp3",type:Loader.SOUND},
            {url:"audio/female/10.mp3",type:Loader.SOUND},
            {url:"audio/female/11.mp3",type:Loader.SOUND},
            {url:"audio/female/12.mp3",type:Loader.SOUND},
            {url:"audio/female/13.mp3",type:Loader.SOUND},
            {url:"audio/female/1.mp3",type:Loader.SOUND},
            {url:"audio/female/club.mp3",type:Loader.SOUND},//梅花
            {url:"audio/female/heart.mp3",type:Loader.SOUND},//红桃
            {url:"audio/female/spade.mp3",type:Loader.SOUND},//黑桃
            {url:"audio/female/TongHua.mp3",type:Loader.SOUND},//同花
            {url:"audio/female/FuErHaoSi.mp3",type:Loader.SOUND},//福尔豪斯
            {url:"audio/female/SiTiao.mp3",type:Loader.SOUND},//四条
            {url:"audio/female/SanPai.mp3",type:Loader.SOUND},//散牌
            {url:"audio/female/ErDui.mp3",type:Loader.SOUND},//两对
            {url:"audio/female/SanTiao.mp3",type:Loader.SOUND},//三条
            {url:"audio/female/DanDui.mp3",type:Loader.SOUND},//一对
            {url:"audio/female/speak.mp3",type:Loader.SOUND},//面说话
            {url:"audio/female/ShunZi.mp3",type:Loader.SOUND},//顺子
            {url:"audio/female/TongHuaShun.mp3",type:Loader.SOUND},//同花顺
            {url:"audio/female/followForever.mp3",type:Loader.SOUND},//
            {url:"audio/female/followForever2.mp3",type:Loader.SOUND},//
            {url:"audio/female/showCard.mp3",type:Loader.SOUND},//
            {url:"audio/male/BaoZi.mp3",type:Loader.SOUND},//豹子
            {url:"audio/male/compareCard.mp3",type:Loader.SOUND},//
            {url:"audio/male/followAgain.mp3",type:Loader.SOUND},//
            {url:"audio/male/followAgain2.mp3",type:Loader.SOUND},//
            {url:"audio/male/gfDropCard.mp3",type:Loader.SOUND},//炸金花弃牌
            {url:"audio/male/hurryUp.mp3",type:Loader.SOUND},//
            {url:"audio/male/JinHua.mp3",type:Loader.SOUND},//
            {url:"audio/male/noMoney.mp3",type:Loader.SOUND},//
        ];

        this.flSoundFemale = 
        [
             {url:"audio/fightLandlord/female/bujiao.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/buyao.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/chuntian.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/dui.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/feiji.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/guopai.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/liandui.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/liangfen.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/sandaiyi.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/sandaiyidui.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/sange.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/shunzi.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/sidaier.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/wangzha.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/yaobuqi.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/yifen.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/zhadan.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/dani.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/yasi.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/guanshang.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/mingpai.mp3",type:Loader.SOUND},

             {url:"audio/fightLandlord/female/1.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/2.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/3.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/4.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/5.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/6.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/7.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/8.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/9.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/10.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/11.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/12.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/13.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/16.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/17.mp3",type:Loader.SOUND},
        ]; 

        this.flSoundMale = 
        [
             {url:"audio/fightLandlord/male/bujiao.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/buyao.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/chuntian.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/dui.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/feiji.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/guopai.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/liandui.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/liangfen.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/sandaiyi.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/sandaiyidui.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/sange.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/shunzi.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/sidaier.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/wangzha.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/yaobuqi.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/yifen.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/zhadan.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/yasi.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/dani.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/guanshang.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/male/mingpai.mp3",type:Loader.SOUND},

             {url:"audio/fightLandlord/female/1.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/2.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/3.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/4.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/5.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/6.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/7.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/8.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/9.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/10.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/11.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/12.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/13.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/16.mp3",type:Loader.SOUND},
             {url:"audio/fightLandlord/female/17.mp3",type:Loader.SOUND},
        ]; 

        this.login = 
        [
            {url:"res/atlas/login.json",type:Loader.ATLAS,release:true},

            {url:"res/atlas/common.json",type:Loader.ATLAS},
            {url:"res/atlas/common/wallet.json",type:Loader.ATLAS},
            {url:"res/atlas/common/head.json",type:Loader.ATLAS},
            {url:"res/atlas/common/email.json",type:Loader.ATLAS},
            {url:"res/atlas/setting.json",type:Loader.ATLAS},  
            {url:"res/atlas/chat.json",type:Loader.ATLAS}, 
            {url:"res/atlas/common/historyRecord.json",type:Loader.ATLAS}, 

            {url:"audio/button.mp3",type:Loader.SOUND}      
        ];
        this.login.push.apply(this.login,this.bgHallMusic);
        this.gameHall = 
        [
            {url:"res/atlas/gameHall.json",type:Loader.ATLAS},
            {url:"res/atlas/gameHall/wheelFortune.json",type:Loader.ATLAS},
            {url:"res/atlas/common.json",type:Loader.ATLAS},
            {url:"res/atlas/common/wallet.json",type:Loader.ATLAS},
            {url:"res/atlas/common/head.json",type:Loader.ATLAS},
            {url:"res/atlas/common/email.json",type:Loader.ATLAS},
            {url:"res/atlas/setting.json",type:Loader.ATLAS},  
            {url:"res/atlas/chat.json",type:Loader.ATLAS}, 
            {url:"res/atlas/common/historyRecord.json",type:Loader.ATLAS}, 

            {url:"audio/button.mp3",type:Loader.SOUND}
        ];
        this.gameHall.push.apply(this.gameHall,this.bgHallMusic);
        this.showhandGameType = 
        [
            // {url:"res/atlas/showhandGameType.json",type:Loader.ATLAS,release:true},
            // {url:"res/atlas/showhandGameType/readMe.json",type:Loader.ATLAS,release:true},
            // {url:"res/atlas/commonHall.json",type:Loader.ATLAS,release:true},
            // {url:"res/atlas/gameHall.json",type:Loader.ATLAS,release:true},   
            {url:"res/atlas/showhandGameType.json",type:Loader.ATLAS},
            {url:"res/atlas/showhandGameType/readMe.json",type:Loader.ATLAS},
            {url:"res/atlas/commonHall.json",type:Loader.ATLAS},
        ];
        
        this.showhandRoom = 
        [
            {url:"res/atlas/common/chessgame.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/showhandRoom.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/showhandRoom/cardForm.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/showhandRoom/cardForm/effect.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/showhandRoom/task.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/card.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/cardEfect.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/jetton.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/showhandRoom/reraise.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/dice/gif.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/dice.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/vip.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/effect/allIn.json",type:Loader.ATLAS},
            
            {url:"audio/card.mp3",type:Loader.SOUND},
            {url:"audio/cardform.mp3",type:Loader.SOUND},
            {url:"audio/chip.mp3",type:Loader.SOUND},
            {url:"audio/chipfly.mp3",type:Loader.SOUND},            
            {url:"audio/lose.mp3",type:Loader.SOUND},            
            {url:"audio/time.mp3",type:Loader.SOUND},
            {url:"audio/sit.mp3",type:Loader.SOUND},
            {url:"audio/win.mp3",type:Loader.SOUND},
            {url:"audio/urge.mp3",type:Loader.SOUND},
           
        ];
        this.showhandRoom.push.apply(this.showhandRoom,this.bgGameMusic);
        this.showhandRoom.push.apply(this.showhandRoom,this.soundFemale);
        this.showhandRoom.push.apply(this.showhandRoom,this.soundMale);

        this.showhand = [];        
        this.showhand.push.apply(this.showhand,this.showhandGameType);
        this.showhand.push.apply(this.showhand,this.showhandRoom);

        this.goldenFlowerHall = 
        [
            // {url:"res/atlas/gfHall.json",type:Loader.ATLAS,release:true},
            // {url:"res/atlas/gfHall/readMe.json",type:Loader.ATLAS,release:true},
            // {url:"res/atlas/commonHall.json",type:Loader.ATLAS,release:true},
            // {url:"res/atlas/gameHall.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/gfHall.json",type:Loader.ATLAS},
            {url:"res/atlas/gfHall/readMe.json",type:Loader.ATLAS},
            {url:"res/atlas/commonHall.json",type:Loader.ATLAS},
        ];
        this.goldenFlowerRoom = 
        [
            {url:"res/atlas/gfRoom.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/common/chessgame.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/effect/allIn.json",type:Loader.ATLAS},
            {url:"res/atlas/showhandRoom/cardForm/effect.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/showhandRoom/task.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/showhandRoom/reraise.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/card.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/jetton.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/dice/gif.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/dice.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/vip.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/gfRoom/cardForm.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/gfRoom/eFail.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/gfRoom/eMiddle.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/gfRoom/eVictory.json",type:Loader.ATLAS,release:false},
            
            {url:"audio/card.mp3",type:Loader.SOUND},
            {url:"audio/chip.mp3",type:Loader.SOUND},
            {url:"audio/chipfly.mp3",type:Loader.SOUND},
            {url:"audio/lose.mp3",type:Loader.SOUND},
            {url:"audio/time.mp3",type:Loader.SOUND},
            {url:"audio/sit.mp3",type:Loader.SOUND},
            {url:"audio/win.mp3",type:Loader.SOUND},
            {url:"audio/urge.mp3",type:Loader.SOUND},//提醒铃声
            
        ];
        this.goldenFlowerRoom.push.apply(this.goldenFlowerRoom,this.bgGameMusic);
        this.goldenFlowerRoom.push.apply(this.goldenFlowerRoom,this.soundFemale);
        this.goldenFlowerRoom.push.apply(this.goldenFlowerRoom,this.soundMale);

        this.goldenFlower = [];
        this.goldenFlower.push.apply(this.goldenFlower,this.goldenFlowerHall);
        this.goldenFlower.push.apply(this.goldenFlower,this.goldenFlowerRoom);

        this.oabRoom = 
        [
             {url:"res/atlas/OneArmBandit.json",type:Loader.ATLAS,release:false},
        ];
        this.classicLaPaRoom = 
        [
             {url:"res/atlas/classic_lapa.json",type:Loader.ATLAS,release:false},
             {url:"res/atlas/classic_lapa/readMe.json",type:Loader.ATLAS,release:false},
             {url:"res/atlas/classic_lapa/auto_spin.json",type:Loader.ATLAS,release:false},
             {url:"res/atlas/classic_lapa/reward0.json",type:Loader.ATLAS,release:false},
        ];
        this.oab = [];
        this.oab.push.apply(this.oab,this.oabRoom);
        this.oab.push.apply(this.oab,this.classicLaPaRoom);

        this.FLRoomType = 
        [
            {url:"res/atlas/fightLandlordType.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fightLandlordType/readMe.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/commonHall.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/commonHall/flRoomType.json",type:Loader.ATLAS,release:true},
        ];

        this.fishingRoomType = 
        [
            {url:"res/atlas/commonHall.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/commonHall/fishingRoom.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fishingType.json",type:Loader.ATLAS,release:true},
        ];

        this.fishingRoom = 
        [
            {url:"res/atlas/fishing/UI.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fishing/loadingMap.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fishing/Progress.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fishing/Progress$bar.png",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fishing/Num.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fishing/Effects/bonuslabel.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fishing/Effects/bonuslabel/beam.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fishing/Effects/bonuslabel/light.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fishing/Effects/bonuslabel/roundLight.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fishing/Effects/bubble.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fishing/Effects/boom.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fishing/Effects/gold.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fishing/Effects/changeMap.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fishing/Effects/cannon1.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fishing/Effects/cannon2.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fishing/BgMap.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fishing/main.mData",type:Loader.BUFFER,release:true},
            {url:"res/atlas/fishing/Attribute.data",type:Loader.BUFFER,release:true}
        ];

        this.FLRoom = 
        [
            {url:"res/atlas/card.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/common.json",type:Loader.ATLAS},

            {url:"res/atlas/fightLandlordRoom.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fightLandlordRoom/effect.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fightLandlordRoom/effect/huojian.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fightLandlordRoom/effect/zhadan/blast.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fightLandlordRoom/effect/zhadan/fire.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fightLandlordRoom/effect/LD_SZ_E.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fightLandlordRoom/effect/liandui.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fightLandlordRoom/effect/shunzi.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fightLandlordRoom/effect/feiji/fire.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fightLandlordRoom/effect/feiji/flyLine.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fightLandlordRoom/effect/spring.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fightLandlordRoom/effect/spring/eff.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/fightLandlordRoom/effect/numberJump.json",type:Loader.ATLAS,release:true},
            {url:"res/atlas/common/chessgame.json",type:Loader.ATLAS,release:false},
            {url:"res/atlas/vip.json",type:Loader.ATLAS,release:false},  

            {url:"audio/fightLandlord/eff_chuntian.mp3",type:Loader.SOUND},
            {url:"audio/fightLandlord/eff_chupai.mp3",type:Loader.SOUND},
            {url:"audio/fightLandlord/eff_fanbei.mp3",type:Loader.SOUND},
            {url:"audio/fightLandlord/eff_liandui.mp3",type:Loader.SOUND},
            {url:"audio/fightLandlord/eff_sanfen.mp3",type:Loader.SOUND},
            {url:"audio/fightLandlord/eff_shunzi.mp3",type:Loader.SOUND},
            {url:"audio/fightLandlord/eff_tuoguan.mp3",type:Loader.SOUND},
            {url:"audio/fightLandlord/eff_xuanpai.mp3",type:Loader.SOUND},
            {url:"audio/fightLandlord/eff_zhadan.mp3",type:Loader.SOUND},
        ];

        this.FLRoom.push.apply( this.flSoundFemale );
        this.FLRoom.push.apply( this.flSoundMale );

        this.fl = [];
        this.fl.push.apply(this.fl,this.FLRoomType);
        this.fl.push.apply(this.fl,this.FLRoom);

        this.texasRoom = 
        [
            {url:"res/atlas/texasHoldem.json",type:Loader.ATLAS,release:false},
        ];
        this.texasRoom.push.apply(this.texasRoom,this.showhandRoom);
    }

    _PreLoadList.prototype.GetSrcBySceneID = function(sceneID){
        switch(sceneID){
            case GameData.getInstance().SCENE_TYPE.LOGIN:
                return this.login;
            case GameData.getInstance().SCENE_TYPE.GAMEHALL:
                return this.gameHall;
            case GameData.getInstance().SCENE_TYPE.SHOWHANDROOMTYPE:
                return this.showhandGameType;
            case GameData.getInstance().SCENE_TYPE.SHOWHANDROOM:
                return this.showhandRoom;
            case GameData.getInstance().SCENE_TYPE.GOLDENFLOWERHALL:
                return this.goldenFlowerHall;
            case GameData.getInstance().SCENE_TYPE.GOLDENFLOWERROOM:
                return this.goldenFlowerRoom;
            case GameData.getInstance().SCENE_TYPE.OAB_ROOM:
                return this.oabRoom;
            case GameData.getInstance().SCENE_TYPE.CLASSIC_LAPA_ROOM:
                return this.classicLaPaRoom;
            case GameData.getInstance().SCENE_TYPE.FLROOMTYPE:
                return this.FLRoomType;
            case GameData.getInstance().SCENE_TYPE.FLROOM:
                return this.FLRoom;
            case GameData.getInstance().SCENE_TYPE.FISHROOMTYPE:
                return this.fishingRoomType;
            case GameData.getInstance().SCENE_TYPE.FISHINGROOM:
                return this.fishingRoom;
            case GameData.getInstance().SCENE_TYPE.TEXASROOM:
                return this.texasRoom;
            default:
                return [];
        }
    }
        //单例实例 
    var instance; 
    //返回对象 
    return { 
        name: '_PreLoadList', 

        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _PreLoadList(); 
            } 
            return instance; 
        } 
    }; 
})();