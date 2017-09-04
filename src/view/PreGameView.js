
/**
 * 2017 05 27
 * 该场景只是做个跳转，连接manager用，以做到在大厅之前报错的话直接返回平台
 * */
function PreGameView( _text )
{
    PreGameView.super(this);
    BasePageView.call(this);
    for(var i in BasePageView.prototype){
        PreGameView.prototype[i] = BasePageView.prototype[i];
    }
   
    
    this.Init = function(dataInit){
        BasePageView.prototype.Init.call(this,dataInit);
        MessageCallbackPro.addCallbackFunc( EventType.Type.gateRegisterAck,this.onConnected,this);
        SoundTool.getInstance().CheckAndPlayBgMusic();
        GateSocketClient.getInstance().connect();
    }
    this.gc = function(){
        MessageCallbackPro.removeCallbackFunc( EventType.Type.gateRegisterAck,this.onConnected,this);
    }
    this.onConnected = function(content){
        ChangeScene.getInstance().loadScene({type:GameData.getInstance().SCENE_TYPE.GAMEHALL,resList:PreLoadList.getInstance().gameHall});
    }
}