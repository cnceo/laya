/**
 * huangandfly 2016 07 20
 * 结算界面
 */
function SettlementView()
{
    SettlementView.super( this );
    
    this.init = function(playerController,roomType,cellNum)
    {
        this.cards = [];
        this.cellList = [];
        this.cellNum = cellNum ? cellNum : 5;
        this.posCenterX = 370;//cell的中心点位置
        this.cardGap = 30;//牌间距
        this.scaleCard = 0.4;//卡牌缩放比例
        this.playerController = playerController;
        this.roomType = roomType;
        
        this.okBtn = this.boxBtns.getChildByName('okBtn');
        this.countdown = this.okBtn.getChildByName('countdown');
        this.changeRoomBtn = this.boxBtns.getChildByName('changeRoomBtn');
        this.replayBtn = this.boxBtns.getChildByName("replayBtn");
        this.loseLabel = this.boxLabels.getChildByName('lose');
        this.winLable = this.boxLabels.getChildByName('win');
        this.guestLable = this.boxLabels.getChildByName('guest');
        this.isUpdate = false;
        this.rewardNum = 0;
        if(IS_GAME_REVIEW){
            this.changeRoomBtn.visible = false;
            this.replayBtn.on(Event.CLICK,this,this.onReplayClick);
        }
        this.replayBtn.visible = IS_GAME_REVIEW;
        
        //this.initPlayerCell();
        this.initList();
        
        Game.getInstance().addUpdate( {callback:this.update,caller:this} );
        this.updateViewPos();
    }
       
    
    // this.initPlayerCell = function()
    // {
    //     for( var i = 0;i < this.cellNum;i++ )
    //     {
    //         var cell = new SettlementPlayerCellUI();
    //         this.posCenterX = cell.width >> 1;
    //         cell.x = ((Laya.stage.width - cell.width) >> 1);
    //         cell.y = 250 + (i*88);
    //         this.addChild( cell );
    //         this.cellList.push( cell );
    //     }
    // }
    
    // this.cellInit = function( cell )
    // {
    //     cell.getChildByName('icon').visible = false;
    //     cell.getChildByName('name').visible = false;
    //     cell.getChildByName('winTxt').visible = false;
    //     cell.getChildByName('winMoneyTxt').visible = false;
    //     cell.getChildByName('self').visible = false;
    //     cell.getChildByName('cardForm').visible = false;
    //     cell.getChildByName('money').visible = false;
    //     var shiwan = cell.getChildByName('icon').getChildByName('iconShiwan');
    //     if(shiwan){
    //         shiwan.visible = this.roomType == ROOM_TYPE_DIAMONDS.DEMOROOM.key;
    //     }
    // }
    this.updateViewPos = function(){
        this.boxBtns.x = Laya.stage.width >> 1;
        this.boxLabels.x = Laya.stage.width >> 1;
        this.listCell.x = Laya.stage.width >> 1;
    }
    this.initList = function(){
        this.listCell.repeatX = 1;
        this.listCell.repeatY = 5;
        this.listCell.spaceY = 10;
        
        this.listCell.vScrollBarSkin = "";
        //this.listCell.selectEnable = true;
        //this.listCell.selectHandler = new Handler(this, onSelectTaskCallBack);
        this.listCell.renderHandler = new Handler(this, this.updateUISettlement);
        this.initUISetttlementItem([]);
    }
    this.initUISetttlementItem = function(players){
        var arr = [];
        for(var i=0;i < players.length;i++){
            var p = players[i];
            //输赢文字 
            var labelReselt = "";
            if(p.escape == 1){
                labelReselt = '逃';
            }           
            else if(p.abandon == 1){
                labelReselt = '弃';
            }
            else{
                labelReselt = p.win ? '赢' : '输';
            }
            //输赢的钱
            var lWinMoney = Tools.getInstance().ChangeUIShow(p.returnMoney - p.inputMoney);
             //名字显示 
             if( p.self ){
                 var lName = Tools.getInstance().GetLocalPlayerUIName();
                 this.bGuest = false;
             }
             else if(p.userName){
                lName = Tools.getInstance().GetPlayerName(p.userName);
             }    
            arr.push({winTxt:labelReselt,winMoneyTxt:lWinMoney,name:lName,playerInfo:p});
        }
        this.listCell.array = arr;
        this.listCell.vScrollBarSkin = arr.length > 5 ? "common/vscroll.png" : "";
    }
    this.updateUISettlement = function(item,index){
        var ds = item.dataSource;
        if(ds == null) return;
        var self = item.getChildByName('self');
        var icon = item.getChildByName('icon');
        var winTxt = item.getChildByName('winTxt');
        var winMoneyTxt = item.getChildByName('winMoneyTxt');
        var color = ds.playerInfo.win ? GameData.getInstance().COLOR.RED : GameData.getInstance().COLOR.GREEN;
        winTxt.color = color;
        winMoneyTxt.color = color;
        var iconSrc = ds.playerInfo.headIconName;
        icon.dataSource = {skin:"common/head/headIcon"+ iconSrc +".png"};
        this.checkWin( ds.playerInfo);
        if(ds.playerInfo.self){
            self.visible = true;
            name.y = 0;
            this.lableMyMoney = item.getChildByName('money');         
            this.lableMyMoney.text = Tools.getInstance().ChangeUIShow(User.getInstance().GetGameMoney());
        }
        else{
            name.y = 18;
            self.visible = false;
        }
        var shiwan = icon.getChildByName('iconShiwan');
        shiwan.visible = this.roomType == ROOM_TYPE_DIAMONDS.DEMOROOM.key;
        item.getChildByName('money').visible = ds.playerInfo.self;
        this.showCards( ds.playerInfo,item,this.arrPosX);
        this.showLandlordFlg( ds.playerInfo,item,icon );
    }
    this.show = function(data,callBackObj){
        this.showCardForm = data.hasOwnProperty('showCardForm') ? data.showCardForm : null;
        this.callBackObj = callBackObj;
        this.isClickClose = false;
        this.isUpdate = false;
        this.bGuest = true;
        
        this.loseLabel.visible = false;
        this.winLable.visible = false;
        this.guestLable.visible = false;
        var players = null;
        if(data.hasOwnProperty('players')){
            players = data.players;
        }
        if(data.hasOwnProperty('winners')){
            players = data.winners;
        }
        if( players == null)  return;
        this.listCell.y = (players.length > 3) ? 444 : 524;
        this.initUISetttlementItem(players);
        this.arrPosX = this.getCellsPosX(players);
        this.guestLable.visible = this.bGuest;
        this.visible = true;
        this.countdown.visible = true;
        this.countdown.startTimer(GameData.getInstance().settlementTime,this.onCountdownFinish,this,null,false);
        
        this.okBtn.on( Event.CLICK,this,this.onOkBtn );
        this.changeRoomBtn.on(Event.CLICK,this,this.onChangeRoomBtn);
        if(this.roomType == ROOM_TYPE_DIAMONDS.KEYROOM.key){
            this.changeRoomBtn.visible = false;
            this.okBtn.x = 410;
        }
    }
    // //显示界面
    // this.show = function( data ,callBackObj)
    // {
        
    //     this.showCardForm = data.showCardForm;
    //     this.callBackObj = callBackObj;
    //     this.isClickClose = false;
    //     this.isUpdate = false;
    //     this.dtTime = 0;
        
    //     this.loseLabel.visible = false;
    //     this.winLable.visible = false;
    //     this.guestLable.visible = false;
    //     this.rewardNum = 0;
        
    //     for( var i = 0;i < 5;i++ )
    //     {
    //         this.cellInit( this.cellList[i] );
    //     }
    //     var players = null;
    //     if(data.hasOwnProperty('players')){
    //         players = data.players;
    //     }
    //     if(data.hasOwnProperty('winners')){
    //         players = data.winners;
    //     }
    //     if( players == null)
    //         return;
    //     var bGuest = true;
    //     var arrPosX = this.getCellsPosX(players);
    //     for( var i = 0;i < players.length;i++ )
    //     {
    //         var cell = players.length > 3 ? this.cellList[i] : this.cellList[i+1];
    //         var icon = cell.getChildByName('icon');
    //         var name = cell.getChildByName('name');
    //         var winTxt = cell.getChildByName('winTxt');
    //         var winMoneyTxt = cell.getChildByName('winMoneyTxt');
    //         var self = cell.getChildByName('self');
            
    //         var t_data = players[i];
            
    //         name.visible = true;
    //         winTxt.visible = true;
    //         winMoneyTxt.visible = true;
    //         self.visible = false;            
    //         var iconSrc = t_data.headIconName;
    //         icon.dataSource = {skin:"common/head/headIcon"+ iconSrc +".png"};
    //         icon.visible = true;
            
    //         //输赢文字 
    //         if(t_data.escape == 1){
    //             winTxt.text = '逃';
    //         }           
    //         else if(t_data.abandon == 1){
    //             winTxt.text = '弃';
    //         }
    //         else{
    //             winTxt.text = t_data.win ? '赢' : '输';
    //         }
            
    //         var color = t_data.win ? GameData.getInstance().COLOR.RED : GameData.getInstance().COLOR.GREEN;
    //         winTxt.color = color;
            
    //         //输赢的钱
    //         winMoneyTxt.text = Tools.getInstance().ChangeUIShow(t_data.returnMoney - t_data.inputMoney);
    //         winMoneyTxt.color = color;
            
            
    //         //名字显示 
    //          if( t_data.self ){
    //              name.text = Tools.getInstance().GetLocalPlayerUIName();
    //              bGuest = false;
    //          }
    //          else if(t_data.userName){
    //             name.text = Tools.getInstance().GetPlayerName(t_data.userName);
    //          }
            
    //         //是否是自己
    //         this.checkWin( t_data ,self ,t_data.returnMoney - t_data.inputMoney);
    //         if(t_data.self){
    //             name.y = 0;
    //             this.lableMyMoney = cell.getChildByName('money');         
    //             this.lableMyMoney.text = Tools.getInstance().ChangeUIShow(User.getInstance().GetGameMoney());
    //         }
    //         else{
    //             name.y = 18;
    //         }
    //         cell.getChildByName('money').visible = t_data.self;
    //         this.showCards( t_data,cell,arrPosX);
    //         this.showLandlordFlg( t_data,cell,icon );
    //     }
    //     this.guestLable.visible = bGuest;
    //     this.visible = true;
    //     this.countdown.visible = true;
    //     this.countdown.startTimer(GameData.getInstance().settlementTime,this.onCountdownFinish,this,null,false);
        
    //     this.okBtn.on( Event.CLICK,this,this.onOkBtn );
    //     this.changeRoomBtn.on(Event.CLICK,this,this.onChangeRoomBtn);
    //     if(this.roomType == ROOM_TYPE_DIAMONDS.KEYROOM.key){
    //         this.changeRoomBtn.visible = false;
    //         this.okBtn.x = 814;
    //     }
    // }

    this.showLandlordFlg = function( t_data,cell,icon )
    {
        var flg = cell.getChildByName('LLFlg');
        if( flg ) flg.visible = false;
        if( t_data.hasOwnProperty('isLandlord') && t_data.isLandlord == 1 )//地主标示
        {
            if( !flg )
            {
                flg = new laya.ui.Image('fightLandlordRoom/03.png');
                flg.name = 'LLFlg';
                cell.addChild( flg );
            }
            flg.visible = true;
            flg.x = icon.x - (flg.width >> 1);
            flg.y = icon.y - (flg.height >> 1);
        }
    }
    
    this.checkWin = function(t_data,self)
    {
        if( t_data.self )
        {
            // self.visible = true;
            
            if( t_data.win )
            {
                this.winLable.visible = true;
                SoundManager.playSound('audio/win.mp3');
            }else 
            {
                this.loseLabel.visible = true;
                SoundManager.playSound('audio/lose.mp3');
            }
            this.isUpdate = true;
            MessageCallbackPro.messageEmit(EventType.Type.playerMoneyRoll);
        }
        // else 
        // {
        //     self.visible = false;
        // }
    }
    
    
    //显示卡牌
    this.showCards = function( data ,parent,arrPosX)
    {
        if( !data.hasOwnProperty( 'cards' ) )
            return;
        //parent.cards = [];    
        for( var j = 0; j < data.cards.length;j++ )
        {            
            var card = this.createCard();
            card.scale(this.scaleCard,this.scaleCard);
            if( ((data.abandon === 1 && j === 0)  && !this.showCardForm) || !data.cards[j].num)
            {
                card.setImage( "card/card_back.png" );
            }else
            {
                var cardPath = data.cards[j].suit.toLowerCase() + 's_'+data.cards[j].num;
                card.setImage( 'card/card_' + cardPath +'.png' );
            }
            this.cards.push( card );
            // parent.cards.push( card );
            
            card.x = arrPosX[j];
            card.y = ((parent.height - card.height * card.scaleY) >> 1);
            
            card.zOrder = parent.numChildren - 1;
            parent.addChild( card );
        }
        //牌型
        if(this.showCardForm && data.cardForm){
            var cardForm = parent.getChildByName("cardForm");
            var curScene = ChangeScene.getInstance().getSceneType();
            var scaleCF = 0.5;
            if(curScene == GameData.getInstance().SCENE_TYPE.GOLDENFLOWERROOM){
                scaleCF = 0.15;
            }
            var src = this.getCardFormSrc(data.cards,data.cardForm);
            cardForm.dataSource = {skin : src,scaleX : scaleCF,scaleY : scaleCF};
            cardForm.visible = true;
            cardForm.zOrder = parent.numChildren - 1;
        }
    }
    this.getCardFormSrc = function(cards,cardForm){
        var cf = cardForm;
        var curScene = ChangeScene.getInstance().getSceneType();
        //炸金花顺子又分为：天顺、地顺、顺子
        if(curScene == GameData.getInstance().SCENE_TYPE.GOLDENFLOWERROOM){
            if(cf == GameData.getInstance().GFCardFormType.ShunZi){
                var temp = [];
                for(var i in cards){
                    temp.push(cards[i].num);
                }
                this.quicksort(temp,0,temp.length - 1);
                if(temp[0] == 1 && temp[2] == 3){
                    cf = "DiShun";
                }
                else if(temp[0] == 1 && temp[2] == 13){
                    cf = "TianShun";
                }
            }            
            return "gfRoom/cardForm/" + cf +".png";
        }
        else{
            return "showhandRoom/cardForm/" + cf.toLowerCase() +".png";
        }
    }
    this.exchange = function(A, i, j)
    {
        var temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }

    this.partition = function(A, left, right)  // 划分函数
    {
        var pivot = A[right];                
        var tail = left - 1;                 
        for (var i = left; i < right; i++) 
        {
            if (A[i] <= pivot)        
            {
                tail++;
                this.exchange(A, tail, i);
            }
        }
        this.exchange(A, tail + 1, right);  
    　　　　　　　　　　　　　　　　　　　　　　　　
        return tail + 1;                        
    }

    this.quicksort = function(A, left, right)
    {
        var pivot_index;                        // 基准的索引
        if (left < right)
        {
            pivot_index = this.partition(A, left, right);
            this.quicksort(A, left, pivot_index-1);
            this.quicksort(A, pivot_index+1, right);
        }

    }

    //获取卡牌X坐标集
    this.getCellsPosX = function(arrPlayers){
        if(!arrPlayers || arrPlayers.length ==0) return [];
        var maxNum = 0;
        //取所有玩家中牌数最多的作为参考值
        for(var i in arrPlayers){
            if(arrPlayers[i].cards && arrPlayers[i].cards.length > maxNum){
                maxNum = arrPlayers[i].cards.length;
            }
        }
        var gap = this.cardGap;
        var pC = this.posCenterX;
        switch(maxNum){
            case 1:
                return [pC];
            case 2:
                return [pC - gap/2 , pC + gap/2];
            case 3:
                return [pC - gap , pC , pC + gap];
            case 4:
                return [pC -3*gap/2 , pC - gap/2 , pC + gap/2 , pC + 3*gap/2];
            case 5:
                return [pC - 2*gap , pC - gap , pC , pC + gap , pC + 2*gap];
            default:
                return [];
                
        }
    }
    
    this.onOkBtn = function()
    {
        this.isUpdate = false;
        this.isClickClose = true;
        this.countdown.stop();
    }
    //换房
    this.onChangeRoomBtn = function(){
        this.countdown.stop();
        MessageCallbackPro.messageEmit(EventType.Type.changeRoomEvent);
    }
    //重播
    this.onReplayClick = function(e){
        var type = GameData.getInstance().curGameType;
        var rController = ReviewControllerMgr.GetController(type);
        if(rController) rController.ReplayReview();
    }
    
    //倒计时结束
    this.onCountdownFinish = function()
    {
        this.close();
    }
    
    this.createCard = function()
    {
        var t_node = null;
        //当gotoResult时，有玩家忽然退出 则会导致发牌问题（有一张牌的tween没有去掉）
        t_node = Tools.getInstance().CreateACard({zOrder:0,rotation:0,visible:true});
        t_node.scale(1,1);        
        return t_node;
    }
    
    //关闭
    this.close = function(bForceClose)
    {
        this.isUpdate = false;
        var gd = GameData.getInstance();
        gd.lockPlayerMoney = false;
        this.okBtn.off( Event.CLICK,this,this.onCountdownFinish );
        this.changeRoomBtn.off(Event.CLICK,this,this.onChangeRoomBtn);
        for( var i = 0;i < this.cards.length;i++ )
        {
            //this.cards[i].onRelease();
            this.cards[i].reset();
            this.cards[i].removeSelf(); 
            laya.utils.Pool.recover('card',this.cards[i]);         
            this.cards[i] = null;
        }
        this.cards = [];
        this.visible = false;
        if(bForceClose) {
            this.countdown.stopInDirect();
            this.callBackObj = null;
            return;
        }
        if( this.callBackObj != undefined && this.callBackObj.callBack != undefined )
        {
            this.callBackObj.callBack.call( this.callBackObj.classObj,this.isClickClose);
            this.callBackObj.callBack = null;
            this.callBackObj.classObj = null;
            this.callBackObj = null;
        }
        var st = gd.curGameType == gd.gameType.eGoldenFlower ? gd.gfRoomState.eSettlement : gd.showhandRoomState.eSettlement;
        StatePool.stateProcess(st);
    }

    // called every frame, uncomment this function to activate update callback
    this.update = function (dt) 
    {
        if( !this.isUpdate )
            return;   
        var localPlayer = this.playerController.getLocalPlayer();
        var txtValue = localPlayer.getPlayerUIMoney();
        if(txtValue == this.lableMyMoney.text) return;
        this.lableMyMoney.text = txtValue;        
    }
    this.destroy = function(){        
        this.countdown.stopInDirect();
        this.cellList = [];
        this.countdown.onRelease();
        Game.getInstance().removeUpdate( this );
        this.__proto__.destroy();
    }
}