/**
 *声音处理工具
 */
/**人声类型(男女各一套) */
var EnumGameSound = {
    ALL_IN : "allIn",//梭哈all in
    GIVE_CARD : "giveCard",//发牌
    DROP_CARD : "dropCard",//弃牌
    FOLLOW_CARD : "followCard",//跟注
    PASS_CARD : "passCard",//过牌
    RAISE : "raise",//加注
    SPEAK : "speak",//面说话
    STAKE : "stake",//押注
    
    CLUB : "club",//梅花
    HEART : "heart",//红桃
    SPADE : "spade",//黑桃

    TOUNG_HUA : "TongHua",//同花
    FU_ER_HAO_SI : "FuErHaoSi",//福尔豪斯
    SI_TIAO : "SiTiao",//四条
    SAN_PAI : "SanPai",//散牌
    LIANG_DUI : "ErDui",//两对
    SAN_TIAO : "SanTiao",//三条
    YI_DUI : "DanDui",//一对
    SHUN_ZI : "ShunZi",//顺子
    TONG_HUA_SHUN : "TongHuaShun",//同花顺
    JIN_HUA : "JinHua",//金花
    BAO_ZI : "BaoZi",//豹子
    SHUN_JIN : "TongHuaShun",//顺金

    COMPARE : "compareCard",//比牌
    TIAO_ZHAN : "compareCard2",//挑战
    FOLLOW_AGAIN : "followAgain",//再跟
    FOLLOW_AGAIN2 : "followAgain2",//继续跟
    FOLLOW_FOREVER : "followForever",//还要跟
    FOLLOW_FOREVER2 : "followForever2",//跟到底
    GF_DROP_CARD : "gfDropCard",//炸金花弃牌
    HURRY_UP : "hurryUp",//人声催促
    SHOW_CARD : "showCard",//看牌
    NO_MONEY : "noMoney",//余额不足
}
var SoundTool = (function()
{
    var BG_HALL_MUSIC = ["audio/bgDushi.mp3","audio/bgJiuhui.mp3","audio/bgYouxian.mp3"];
    var BG_GAME_MUSIC = ["audio/bgJueshi.mp3"];
    function _SoundTool()
    {
        this._curBgMusic = '';
        this._arrSound = [];//声效数组
        //喊话 会切掉正在播放的上一组音效 cardForm :牌型,num:数字,suit:花色
        this.SpeakSHSounds = function(cardForm,num,suit){
            if(cardForm == null || cardForm == undefined) return;
            this._getSHSoundInfo(cardForm,num,suit);
            this._loopPlaySound();
        }
        this.SpeakGFSounds = function(cardForm){
            if(cardForm == null || cardForm == undefined) return;
            this._getGFSoundInfo(cardForm);
            this._loopPlaySound();
        }
        this.SpeakFLSounds = function(cardForm,num,sex,bFstOutPut)
        {
            if(cardForm == null || cardForm == undefined) return;
            this._getFLSoundInfo(cardForm,num,sex,bFstOutPut);
            this._loopPlaySound();
        }
        this._loopPlaySound = function(){
            if(this._arrSound.length == 0) return;
            SoundManager.playSound(this._arrSound[0],1,new Handler(this,this._loopPlaySound));
            this._arrSound.splice(0,1);
        }
        this._getSHSoundInfo = function(cardForm,num,suit){
            this._arrSound = [];
            num = parseInt(num);
            switch (cardForm){
                case GameData.getInstance().SHCardFormType.SanPai:
                    this._setSanPaiSrc(num,suit);
                    break;
                case GameData.getInstance().SHCardFormType.DanDui:
                    this._setDanDuiSrc(num,suit);
                    break;
                case GameData.getInstance().SHCardFormType.ErDui:
                    this._setErDuiSrc(num);
                    break;
                case GameData.getInstance().SHCardFormType.SanTiao:
                    this._setSanTiaoSrc(num);
                    break;
                case GameData.getInstance().SHCardFormType.ShunZi:
                    this._setShunZiSrc();
                    break;
                case GameData.getInstance().SHCardFormType.SiTiao:
                    this._setSiTiaoSrc(num);
                    break;
                case GameData.getInstance().SHCardFormType.TongHua:
                    this._setTongHuaSrc();
                    break;
                case GameData.getInstance().SHCardFormType.TongHuaShun:
                    this._setTongHuaShunSrc();
                    break;
                case GameData.getInstance().SHCardFormType.FuErHaoSi:
                    this._setFuErHaoSiSrc();
                    break;
                case GameData.getInstance().SHCardFormType.Baozi:
                    this._setFuErHaoSiSrc();
                    break;
                case GameData.getInstance().SHCardFormType.Duizi:
                    this._setDanDuiSrc();
                    break;
            }
            //如果num和suit都为空，则视为不播报“面说话”
            if(isNaN(num) && suit == undefined) return;
            this._arrSound.push(this._getGameSoundSrc(EnumGameSound.SPEAK,ENUM_SEX.FEMALE));
        }
        this._getGFSoundInfo = function(cardForm,num,suit){
            this._arrSound = [];
            num = parseInt(num);
            switch (cardForm){
                case GameData.getInstance().GFCardFormType.SanPai:
                    this._setSanPaiSrc(num,suit);
                    break;
                case GameData.getInstance().GFCardFormType.ShunZi:
                    this._setShunZiSrc();
                    break;
                case GameData.getInstance().GFCardFormType.JinHua:
                    this._setJinHuaSrc();
                    break;
                case GameData.getInstance().GFCardFormType.ShunJin:
                    this._setTongHuaShunSrc();
                    break;
                case GameData.getInstance().GFCardFormType.Baozi:
                    this._setBaoZiSrc();
                    break;
                case GameData.getInstance().GFCardFormType.Duizi:
                    this._setDanDuiSrc();
                    break;
            }
            //如果num和suit都为空，则视为不播报“面说话”
            if(isNaN(num) && suit == undefined) return;
            this._arrSound.push(this._getGameSoundSrc(EnumGameSound.SPEAK,ENUM_SEX.FEMALE));
        }

        this._getFLSoundInfo = function( cardForm,num,sex,bFstOutPut )
        {
            this._arrSound = [];
            num = parseInt(num);
            switch (cardForm)
            {
                case FLRoomMgr.getInstance().FLPokerCardsType.Danzhang:
                    this._arrSound.push(this._getGameSoundSrc(num,sex,'fightLandlord/'));
                    break;
                case FLRoomMgr.getInstance().FLPokerCardsType.Dduizi:
                    this._arrSound.push(this._getGameSoundSrc('dui',sex,'fightLandlord/'));
                    this._arrSound.push(this._getGameSoundSrc(num,sex,'fightLandlord/'));
                    break;
                case FLRoomMgr.getInstance().FLPokerCardsType.SanZhang:
                    if( bFstOutPut )
                    {
                        this._arrSound.push(this._getGameSoundSrc('sange',sex,'fightLandlord/'));
                        this._arrSound.push(this._getGameSoundSrc(num,sex,'fightLandlord/'));
                    }else
                    {
                        this._randomPlayEff('',sex,false);
                    }
                    break;
                case FLRoomMgr.getInstance().FLPokerCardsType.SanDaiYi:
                    this._randomPlayEff('sandaiyi',sex,bFstOutPut);
                    break;
                case FLRoomMgr.getInstance().FLPokerCardsType.SanDaiEr:
                    this._randomPlayEff('sandaiyidui',sex,bFstOutPut);
                    break;
                case FLRoomMgr.getInstance().FLPokerCardsType.LianDui:
                     this._randomPlayEff('liandui',sex,bFstOutPut);
                     SoundManager.playSound('audio/fightLandlord/eff_liandui.mp3');
                    break;
                case FLRoomMgr.getInstance().FLPokerCardsType.Shunzi:
                     this._randomPlayEff('shunzi',sex,bFstOutPut);
                     SoundManager.playSound('audio/fightLandlord/eff_shunzi.mp3');
                    break;
                case FLRoomMgr.getInstance().FLPokerCardsType.Feiji:
                case FLRoomMgr.getInstance().FLPokerCardsType.FeijidaiYi:
                case FLRoomMgr.getInstance().FLPokerCardsType.FeijidaiEr:
                     this._randomPlayEff('feiji',sex,bFstOutPut);
                    break;  
                case FLRoomMgr.getInstance().FLPokerCardsType.Zhandan:
                     //this._randomPlayEff('zhadan',sex,bFstOutPut);
                     this._arrSound.push(this._getGameSoundSrc('zhadan',sex,'fightLandlord/'));
                    break;
                case FLRoomMgr.getInstance().FLPokerCardsType.SiDaiEr:
                case FLRoomMgr.getInstance().FLPokerCardsType.SiDaiErdui:
                     this._randomPlayEff('sidaier',sex,bFstOutPut);
                    break;   
                case FLRoomMgr.getInstance().FLPokerCardsType.Huojian:
                    this.PlayGameSound('wangzha',sex,'fightLandlord/');
                    break;
            }
        }

        this._randomPlayEff = function( cardForm ,sex,bFstOutPut)
        {
            if( bFstOutPut )
            {
                this._arrSound.push(this._getGameSoundSrc(cardForm,sex,'fightLandlord/'));
            }else
            {
                var soundList = ['yasi','dani','guanshang'];
                this._arrSound.push(this._getGameSoundSrc(soundList[ parseInt(Math.random() * 3) ],sex,'fightLandlord/'));
            }
        }

        this._getGameSoundSrc = function(name,sex,path){
            path = path == undefined ? '' : path;
            var str = sex == ENUM_SEX.FEMALE ? 'female' : "male";
            return "audio/"+ path + str +"/" + name + ".mp3";
        }
        //散牌
        this._setSanPaiSrc = function(num,suit){
            if(isNaN(num) && suit== undefined){
                this._arrSound.push(this._getGameSoundSrc(EnumGameSound.SAN_PAI,ENUM_SEX.FEMALE));
            }
            else{
                if(suit.toLowerCase() != 'diamond'){//踢除方块
                    this._arrSound.push(this._getGameSoundSrc(suit.toLowerCase(),ENUM_SEX.FEMALE));
                }
                this._arrSound.push(this._getGameSoundSrc(num,ENUM_SEX.FEMALE));
            }
        }
        //单对
        this._setDanDuiSrc = function(num,suit){
            this._arrSound.push(this._getGameSoundSrc(EnumGameSound.YI_DUI,ENUM_SEX.FEMALE));
            if(isNaN(num) && suit== undefined) return;
            this._arrSound.push(this._getGameSoundSrc(num,ENUM_SEX.FEMALE));
        }
        //二对
        this._setErDuiSrc = function(){
            this._arrSound.push(this._getGameSoundSrc(EnumGameSound.LIANG_DUI,ENUM_SEX.FEMALE));
        }
        //三条
        this._setSanTiaoSrc = function(num){
            this._arrSound.push(this._getGameSoundSrc(EnumGameSound.SAN_TIAO,ENUM_SEX.FEMALE));
            if(isNaN(num)) return;      
            this._arrSound.push(this._getGameSoundSrc(num,ENUM_SEX.FEMALE));
        }
        //顺子
        this._setShunZiSrc = function(){
            this._arrSound.push(this._getGameSoundSrc(EnumGameSound.SHUN_ZI,ENUM_SEX.FEMALE));
        }
        //同花
        this._setTongHuaSrc = function(){
            this._arrSound.push(this._getGameSoundSrc(EnumGameSound.TOUNG_HUA,ENUM_SEX.FEMALE));
        }
        //同花顺
        this._setTongHuaShunSrc = function(){
            this._arrSound.push(this._getGameSoundSrc(EnumGameSound.TONG_HUA_SHUN,ENUM_SEX.FEMALE));            
        }
        //四条
        this._setSiTiaoSrc = function(num){
            this._arrSound.push(this._getGameSoundSrc(EnumGameSound.SI_TIAO,ENUM_SEX.FEMALE));
            if(isNaN(num)) return;   
            this._arrSound.push(this._getGameSoundSrc(num,ENUM_SEX.FEMALE));
        }
        //福尔豪斯
        this._setFuErHaoSiSrc = function(){
            this._arrSound.push(this._getGameSoundSrc(EnumGameSound.FU_ER_HAO_SI,ENUM_SEX.FEMALE));
        }
        //豹子
        this._setBaoZiSrc = function(){
            this._arrSound.push(this._getGameSoundSrc(EnumGameSound.BAO_ZI,ENUM_SEX.FEMALE));
        }
        //金花
        this._setJinHuaSrc = function(){
            this._arrSound.push(this._getGameSoundSrc(EnumGameSound.JIN_HUA,ENUM_SEX.FEMALE));
        }
        //顺金
        this._setShunJinSrc = function(){
            this._arrSound.push(this._getGameSoundSrc(EnumGameSound.SHUN_JIN,ENUM_SEX.FEMALE));
        }
        //播放大厅背景音乐
        this.CheckAndPlayBgMusic = function()
        {
            var m = BG_HALL_MUSIC.length;
            var random = parseInt(Math.random() * m,10);
            this._curBgMusic = BG_HALL_MUSIC[random];
            SoundManager.playMusic(this._curBgMusic);

            var musicEffect = LocalStorage.getItem("musicEffect");
            var musicBg     = LocalStorage.getItem("musicBg");

            musicEffect = musicEffect == 'true' || musicEffect == null;
            GameData.getInstance().bPlayMusic = musicBg == 'true' || musicBg == null;
            LocalStorage.setItem("musicBg",GameData.getInstance().bPlayMusic);
            LocalStorage.setItem("musicEffect",musicEffect);

            SoundManager.soundMuted = !musicEffect;
            SoundManager.musicMuted = !GameData.getInstance().bPlayMusic;

            var rN = LocalStorage.getItem("rollingNotice");
            GameData.getInstance().bRollingNotice = (rN === "true") || (rN == null);
            LocalStorage.setItem("rollingNotice",GameData.getInstance().bRollingNotice);
        }
        //播放游戏内背景音乐
        this.PlayGameBgMusic = function(src){
            var musicBg = LocalStorage.getItem("musicBg");
            if(src && src == this._curBgMusic) return;
            if(musicBg != 'true' || this._curBgMusic == BG_GAME_MUSIC[0]) return;   
            this._curBgMusic = BG_GAME_MUSIC[0];
            SoundManager.playMusic(this._curBgMusic);
        }
        //播放大厅背景音乐
        this.PlayHallBgMusic = function(){
            var musicBg = LocalStorage.getItem("musicBg");
            if(musicBg != 'true') return;
            var m = BG_HALL_MUSIC.length;
            var random = parseInt(Math.random() * m,10);
            this._curBgMusic = BG_HALL_MUSIC[random];
            SoundManager.playMusic(this._curBgMusic);
            SoundManager.setMusicVolume(1);
        }
        this.GetCurBgMusic = function(){
            return this._curBgMusic;
        }
        //播放游戏声效（有男女之分）
        this.PlayGameSound = function(enumSound,sex,path){
            SoundManager.playSound(this._getGameSoundSrc(enumSound,sex,path));
        }
    }
   
    
    //单例实例 
    var instance; 
    //返回对象 
    return { 
        name: '_SoundTool', 

        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _SoundTool(); 
            } 
            return instance; 
        } 
    }; 
})();