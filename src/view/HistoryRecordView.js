/**
 * huangandfly 2016 07 22
 * 历史记录
 */

function HistoryRecordView()
{
    HistoryRecordView.super(this);
    BasePageView.call(this);
    for(var i in BasePageView.prototype){
        HistoryRecordView.prototype[i] = BasePageView.prototype[i];
    }
    this.Init = function(dataInit){
        BasePageView.prototype.Init.call(this,dataInit);
        this.cellList = [];        
        HistoryRecordView.isReqRecord = false;
        this.lstGameType = [];
        this.bAskingReviewReq = false;//是否正在申请录像信息
        this.curRecordID = null;//当前正在申请的录像ID
        this.historyData = {};//暂存数据
        var backBtn = this.getChildByName('backBtn');
        backBtn.on( Event.CLICK,this,this.close ); 
    }
    this.initCombobox = function(){
        if(this.lstGameType.length != 0) return;
        var labels = "";
		// var gameList = GameData.getInstance().gameName;
		// for(var i in gameList){
		// 	labels += gameList[i] + ",";
		// 	this.lstGameType.push(i);
		// }
		for(var i in GameList){
            if(GameList[i].state === EGameState.eNotOpen) continue;
            //先排除斗地主
            if(GameList[i].name === GameData.getInstance().gameType.eFightLandlord) continue;
            var name = Tools.getInstance().GetGameNameByType(GameList[i].name);
            if(name == "") continue;
            //暂存历史数据
            this.historyData[GameList[i].name] = [];
			labels +=  name + ",";
			this.lstGameType.push(GameList[i].name);
		}
		labels = labels.substring(0,labels.length -1);
		this.comboGameType.labels = labels;
        this.comboGameType.selectedIndex = 0;
        this.comboGameType.selectHandler = new Handler(this,this.onSelectCombBox);
    }
    this.onSelectCombBox = function(cur){
        this.removeCell();
        this.curGameType = this.lstGameType[cur];
        if(!this.curGameType) return;
        this.getCurRecordData();
    }
    this.Show = function()
    {
        BasePageView.prototype.Show.call(this);
        this.comboGameType.disabled = false;
        MessageCallbackPro.addCallbackFunc( EventType.Type.GC_GET_PLAYER_RECORD_ACK,this.playerRecordAck,this);
        //防止网络延迟
        // if( HistoryRecordView.isReqRecord )
        // {
        //     //new HintMessage('查询中，请稍后！');
        //     return;
        // }
        if(!this.curGameType){
            this.curGameType = GameData.getInstance().curGameType ? GameData.getInstance().curGameType : GameList[0].name;
            this.comboGameType.visible = GameData.getInstance().curGameType == null;
            this.comboGameType.labelColors = "#000000,#000000,#000000,#C0C0C0";//"#f3ea10,#f3ea10,#f3ea10,#C0C0C0";
            this.comboGameType.itemColors = "#ffda5b,#000000,#929191,#181819,#181819";
        }       
        if(GameData.getInstance().curGameType == null){
            this.initCombobox();
        }
        this.getCurRecordData();
    }
    this.getCurRecordData = function(){
        if(this.historyData[this.curGameType] && this.historyData[this.curGameType].length !== 0){
            this.playerRecordAck(this.historyData[this.curGameType]);
        }
        else{
            GateSocketClient.getInstance().CG_GET_PLAYER_RECORD_REQ(this.curGameType);
            this.comboGameType.disabled = true;
        }
    }
    this.Hide = function(){
        this.removeCell();    
        this.visible = false;
        MessageCallbackPro.removeCallbackFunc( EventType.Type.GC_GET_PLAYER_RECORD_ACK,this);
    }
    
    this.close = function()
    {
        this.Hide();
    }
    
    this.removeCell = function()
    {
        for( var i = 0;i < this.cellList.length;i++ )
        {
            var cell = this.cellList[i];
            cell.destroy();
            cell = null;
        }
        this.cellList = [];
    }
    
    this.createCell = function( _data )
    {
        if(_data.records){
            for( var i = 0;i < _data.records.length;i++ )
            {
                var cell = new HistoryRecordCellUI();
                cell.x = 18;
                cell.y = 188 + ( i * cell.height );
                //i % 2 == 0 ? cell.getChildByName('double').visible = false : cell.getChildByName('single').visible = false;
                this.setCellText( cell,_data.records[ i ],_data.gameType );  
                this.addChild( cell );  
                this.cellList.push( cell );
            }
        }
    }
    
    this.setCellText = function( cell,_data,gameType)
    {
        var time   = cell.getChildByName('time');
        var ID     = cell.getChildByName('ID');
        var type   = cell.getChildByName('type');
        var money  = cell.getChildByName('money');
        var result = cell.getChildByName('result');
        var btn = cell.getChildByName("btnReview");
        btn.on(Event.CLICK,this,this.onClickReview);
        //录像目前只支持炸金花
        btn.visible = gameType == GameData.getInstance().gameType.eGoldenFlower;
        // var date = new Date();
        // date.setTime( _data.time );
        // time.text   = date.toLocaleDateString()+'  '+date.getHours()+':'+date.getMinutes()+':'+((date.getSeconds().toString().length == 1) ? '0'+date.getSeconds() : date.getSeconds());
        time.text = _data.time.split(".")[0];
        ID.text     = _data.recordID;
        type.text   = this.getType(_data,gameType);
        money.text  = Tools.getInstance().ChangeUIShow( _data.winMoney - _data.payMoney );
        CLog.log("result :"+ _data.gameResult);
        result.text = (_data.gameResult == GameData.getInstance().eGameResult.WIN) ? '赢' : (_data.gameResult == GameData.getInstance().eGameResult.LOSE) ? '输' : '弃';
        
        var color    = parseInt( money.text ) > 0 ? GameData.getInstance().COLOR.RED : GameData.getInstance().COLOR.GREEN;
        money.color  = color;
        result.color = color;
    }
    //点击录像回放按钮
    this.onClickReview = function(e){
        if(this.bAskingReviewReq) return;        

        this.curRecordID = e.currentTarget.parent.getChildByName("ID").text;
        var controler = ReviewControllerMgr.GetController(this.curGameType);
        if(!controler) return;
        if(controler.HasDataAlready(this.curRecordID)){
            controler.ToShowGameReview(this.curRecordID);
        }
        else{
            this.bAskingReviewReq = true;
            var name = URLParamParse.getInstance().IsTest() ? "GM123456789" : User.getInstance().GetName();
            //var name = User.getInstance().GetName();
            var d = {name:name,record:this.curRecordID,gameType:this.curGameType};
            Tools.getInstance().AJAX(GameData.getInstance().logServer,"POST",d,this,this.onReplayDataCallback);
        }
    }
    this.onReplayDataCallback = function(data){
        this.bAskingReviewReq = false;
        if(!data || ((data.errorMsg) && data.errorMsg != '')){
            new HintMessage(data.errorMsg);
            return;
        }
        var controler = ReviewControllerMgr.GetController(this.curGameType);
        if(!controler) {    alert("数据错误！type:" + this.curGameType);return;}
        controler.ToShowGameReview(this.curRecordID,data);
    }
    this.getType = function( _data,gameType )
    {
        var gData = GameData.getInstance();
        var gameName = gData.gameName[gameType];
        switch (gameType) {
            case gData.gameType.eShowhand:
                gameName += '/' + this.getRoomName(ROOM_TYPE_DIAMONDS.SHOWHAND,_data.roomType);
                break;
            case gData.gameType.eGoldenFlower:
                gameName += '/' + this.getRoomName(ROOM_TYPE_DIAMONDS.GOLDENFLOWER,_data.roomType);
                break;
            case gData.gameType.eOneArmBandit:
                gameName += '/' + _data.roomType;
                break;
            default:
                break;
        }
        return gameName;
    }
    //获取房间名称
    this.getRoomName = function(enumRoomType,key){
        for(var i in ROOM_TYPE_DIAMONDS){
            if(!(ROOM_TYPE_DIAMONDS[i] instanceof Array)){
                if(ROOM_TYPE_DIAMONDS[i].key == key){
                    return ROOM_TYPE_DIAMONDS[i].name;
                }
            }
            for(var j in enumRoomType){
                if(enumRoomType[j].key == key){
                    return enumRoomType[j].name;
                }
            }

        }
        return "";
    }
    this.playerRecordAck = function( data )
    {
        this.curGameType = data.gameType;
        this.historyData[this.curGameType] = data;
        HistoryRecordView.isReqRecord = false;
        this.comboGameType.disabled = false;
        this.createCell( data );
        this.visible = true;
        for(var i in this.lstGameType){
            if(this.lstGameType[i] == this.curGameType){
                this.comboGameType.selectedIndex = parseInt(i);
            }
        }        
    }

    this.destroy = function()
    {
        MessageCallbackPro.removeCallbackFunc( EventType.Type.GC_GET_PLAYER_RECORD_ACK,this);
        this.__proto__.destroy();
    }

            
}