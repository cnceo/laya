/**
 *游戏房间类型   
 */
function GameRoomType(){
    
    GameRoomType.super(this);

    this.callback = null;
    this.TYPENAME = null;
    this.caller = null;
    this.typeCellList = [];//所有生成的格子
    this.typeCellPosList = [];//格子初始位置记录
    this.ladderNum = 2;//有几个梯子
    this.MiddleRoomTypeScale = 1;
    this.typeCellWidth = 0;
    this.isCellMove = false;
    this.maxCellNum = 5;
    this.cellMovePos = 0;
    this.touchCellStartPosX = 0;
    this.touchCellStartSurPosX = 0;
    this.roomTypeCellMoveSpeed = 300;
    this.touchMoveDis = 120;
    this.bHasDemoRoom = false;
    this.MOVE_FACTOR = 0.08;

    this.init = function( _caller,_callback ,_TYPENAME)
    {
        this.callback = _callback;
        this.TYPENAME = _TYPENAME;
        this.caller   = _caller;

        this.initMask();
        this.initRoomTypeCell();
        this.initCellPos();
        this.setCellPos();
    }

    this.getLadderNum = function()
    {
        return this.ladderNum;
    }

    this.getHasDemoRoom = function()
    {
        return this.bHasDemoRoom;
    }
        /**
     * 初始化遮罩
     */
    this.initMask = function()
    {
        this.typeCellContent = new Sprite();
        this.typeCellContent.scrollRect = new Rectangle();
        this.typeCellContent.scrollRect.setTo(0,0,1000,400);
        this.typeCellContent.optimizeScrollRect=true;
        this.typeCellContent.x = (GameData.getInstance().SCENE_WIDTH - 500) >> 1;
        this.typeCellContent.y = 130;
        this.typeCellContent.width  = 1000;
        this.typeCellContent.height = 400;
        this.addChild( this.typeCellContent );
    }

     /**
     * 初始化类型格子
     */
    this.initRoomTypeCell = function() 
    {   
        var typsArr = [];
        if(GameData.getInstance().bLoginDemo){
            typsArr = GameData.getInstance().types;
        }
        else{
            for(var i in GameData.getInstance().types){
                var typeValue = GameData.getInstance().types[i];
                if(typeValue ){
                    //试玩房间
                    if(typeValue.type == ROOM_TYPE_DIAMONDS.DEMOROOM.key){
                        this.bHasDemoRoom = true;
                    }
                    else{
                        typsArr.push(typeValue);
                    }
                }
            }
        }
        
        //根据服务端发来的类型数，创建格子(约定依次为蓝钻、红钻、黄钻、紫钻、金钻、VIP)
        for( var i = 0; i < typsArr.length;i++ )
        {
            var typeValue = typsArr[i];
             if( !typeValue )
            {
                CLog.log("获取房间类型失败................."+typeValue);
                continue;
            }
            var typeName = "blue";
            var nameText = "blue";
            //获取房间资源名称
            if((this.TYPENAME && this.TYPENAME[0])){
                for(var k in this.TYPENAME){
                    if(this.TYPENAME[k].key == typeValue.type){
                        typeName = this.TYPENAME[k].type;
                        nameText = this.TYPENAME[k].type1;
                        break;
                    }
                }
            }
            var typeCell = new RoomTypeCell();
            typeCell.name = typeName;  
            typeCell.boxCell.type = typeValue.type;         
            typeCell.maxNote = typeValue.maxNote;
            typeCell.baseNote = typeValue.baseNote;
            typeCell.minNote = typeValue.minCarry;
            typeCell.init( typeName,nameText );
            
            typeCell.on(Event.MOUSE_DOWN,this,this.onTouchCellStart);
            typeCell.on(Event.CLICK,this,this.onTouchCellEnd);
            
            this.typeCellContent.addChild( typeCell );
            typeCell.pos(0,0);
            typeCell.visible = false;

            this.typeCellList.push( typeCell );
            var slot = this.typeCellList.length - 1;
            slot = typsArr.length <= 3 ? slot + 2 : slot;
            typeCell.boxCell.slot = slot;
        }
        this.typeCellWidth = this.typeCellList[0].width;
    }

     /**
     * 初始化格子
     */
    this.initCellPos = function()
    {
        var rightBase = 340;
        this.auxiliaryPosLeft  = -this.typeCellWidth;
        this.auxiliaryPosRight = this.typeCellContent.width + this.typeCellWidth;
        this.typeCellPosList = [0,0,0,0,0];
        var half = (this.typeCellContent.width) >> 1;
        for(var index = 0; index < this.typeCellPosList.length; index++){
            var obj = {};
            if( index == 0 ){
                obj.x = -rightBase + half;
                obj.scale = (0.5,0.5);
                obj.zOrder = -2;
                obj.alpha = 120 / 255;
            }
            else if( index == 1 ){
                obj.x = -210 + half; 
                obj.scale = (0.7,0.7);
                obj.zOrder = -1;
                obj.alpha = 190 / 255;
            }
            else if( index == this.ladderNum ){
                obj.x = (this.typeCellContent.width) >> 1;
                obj.scale  = (this.MiddleRoomTypeScale,this.MiddleRoomTypeScale);
                obj.zOrder = index;
                obj.alpha  = 1;
            }
            else if( index == (2*this.ladderNum - 1) ){
                obj.x = 210 + half; 
                obj.scale = (0.7,0.7);
                obj.zOrder = -index;
                obj.alpha = 190 / 255;
            }
            else if( index == 2*this.ladderNum ){
                obj.x = rightBase + half;
                obj.scale = (0.5,0.5);
                obj.zOrder = -index;
                obj.alpha = 120 / 255;
            }
            this.typeCellPosList[ index ] = obj;
        }
    }

           //设置卡片位置
    this.setCellPos = function()
    {
        if(this.typeCellList.length <= 3){
             for(var index = 0; index < this.typeCellList.length; index++){
                var element = this.typeCellList[index];
                var indexPos = index + 2;
                element.curIndex = indexPos;
                element.x = this.typeCellPosList[indexPos].x;
                element.y = this.typeCellContent.height >> 1;
                element.scale(this.typeCellPosList[indexPos].scale,this.typeCellPosList[indexPos].scale);
                element.zOrder = this.typeCellPosList[indexPos].zOrder;
                element.alpha = this.typeCellPosList[indexPos].alpha;
                element.visible = true;       
            }
        } else {
            for(var index = 0; index < this.typeCellList.length; index++){
                var element = this.typeCellList[index];
                element.curIndex = index;
                var cellPosNum = this.typeCellPosList.length ;
                var indexPos = index >= cellPosNum? cellPosNum - 1: index;
                var half = (this.typeCellContent.width) >> 1;
                if(index >= cellPosNum){
                    element.x = this.typeCellPosList[cellPosNum -1].x + (index - cellPosNum + 1) * half;
                }
                else{
                    element.x = this.typeCellPosList[indexPos].x;                   
                }
                element.y = this.typeCellContent.height >> 1;
                element.scale(this.typeCellPosList[indexPos].scale,this.typeCellPosList[indexPos].scale);
                element.zOrder = this.typeCellPosList[indexPos].zOrder;
                element.alpha = this.typeCellPosList[indexPos].alpha;
                element.visible = true;       
            }
        }
    }

     this.onTouchCellEnd = function(event)
    {   
        if( this.isCellMove )
        {
            this.onTouchCellCancel();
            this.isCellMove = false;
            return;
        }
        var index = event.target.slot;
        if( index === this.ladderNum){
            if( User.getInstance().GetGameMoney() < event.currentTarget.baseNote ){
                new HintMessage("金额不足，请取款后再次尝试");
            }
            else{
                //this.toJoinRoom(event.target.type);
                this.callback && this.callback.call(this.caller, "enter",event.target.type );
            }
        }
        else{
            var loopNum = Math.abs(this.ladderNum - index);
            var director = index <= this.ladderNum ? 'next' : 'pre';
            var i = 0;
            while( i < loopNum )
            {
                director === 'pre' ? this.onPreBtn() : this.onNextBtn();
                i++;
            }
            this.callback && this.callback.call(this.caller,"click",event.target.type );
        }        
    }
    
    this.onTouchCellStart = function(event)
    {
        this.touchCellStartPosX = Laya.stage.mouseX;
        this.touchCellStartSurPosX = this.touchCellStartPosX; 
        this.cellMovePos = 0;        
        this.on(Event.MOUSE_MOVE,this,this.onTouchCellMove);
        this.on(Event.MOUSE_UP,this,this.onTouchCellCancel);
        Laya.stage.on(Event.MOUSE_OUT,this,this.onTouchCellCancel);
    }
    
    
    this.onTouchCellCancel = function( event )
    {
        Laya.stage.off(Event.MOUSE_OUT,this,this.onTouchCellCancel);
        this.off(Event.MOUSE_UP,this,this.onTouchCellCancel);
        this.off(Event.MOUSE_MOVE,this,this.onTouchCellMove);
        if( Math.abs(this.touchCellStartPosX - this.touchCellStartSurPosX) < 0.000001 )
            return;
        var flag = this.dir === 'pre' ?  - 1 : 5;
        for( var index = 0; index < this.typeCellList.length; index++ )
        {
            var element = this.typeCellList[index];
            var slot = element.curIndex;
            if(slot > -1 && slot < 5){
                element.moveCell( {x: this.typeCellPosList[slot].x},this.roomTypeCellMoveSpeed );
            }  
        }
    }
    
    //点击房间类型卡牌移动
    this.onTouchCellMove = function(event)
    {
       if(Math.abs(event.stageX - this.touchCellStartPosX) <= 2) return;
       this.isCellMove = true;
            
       var movePos = Laya.stage.mouseX - this.touchCellStartPosX;
       this.touchCellStartPosX = Laya.stage.mouseX;
       
       var addtion = this.ladderNum;
       for( var index = 0; index < this.typeCellPosList.length; index++ )
       {
            var slot = index > this.ladderNum ? this.typeCellList.length - addtion--  : index;
            var element = this.typeCellList[slot];
            if(element){
                element.x += movePos * this.MOVE_FACTOR;
            }  
       }
       
       this.cellMovePos += movePos * this.MOVE_FACTOR;
        
       if( Math.abs( this.touchCellStartPosX - this.touchCellStartSurPosX ) > this.touchMoveDis )
       {
            if( this.touchCellStartPosX - this.touchCellStartSurPosX > 0 )
            {
                this.onNextBtn();
            }else
            {
                this.onPreBtn();
            }
            this.cellMovePos = 0;
            this.touchCellStartSurPosX = this.touchCellStartPosX;
       }
    }
    
    this.onPreBtn = function (event) 
    {

        if(this.typeCellList[this.typeCellList.length - 1].curIndex == this.ladderNum) return;
        //向左移动一位
        for(var i = 0; i < this.typeCellList.length; i ++){
            this.typeCellList[i].curIndex--;
        }
        this.onMoveCell('pre');
    }
    
    this.onNextBtn = function ( event )
    {
        if(this.typeCellList[0].curIndex == this.ladderNum) return;
        //向右移动一位
        for(var i =0;i < this.typeCellList.length;i++){
           this.typeCellList[i].curIndex++;
        }
        this.onMoveCell('next');
    }
    
    //移动
    this.onMoveCell = function (dir) 
    {
        this.dir = dir;
        var curLeftEdge = null;//左边缘
        var curRightEdge = null;//右边缘
        var curCenter = null;
        for (var index = 0; index < this.typeCellList.length; index++) 
        {
            var element = this.typeCellList[index];
            var slot = element.curIndex;
            if(slot == -1) curLeftEdge = element;
            if(slot ==  5) curRightEdge = element;
            if(slot <= -1 || slot >= 5) continue;

            element.completeTween();
            var t_X = this.typeCellPosList[slot].x;
            var t_Scale = this.typeCellPosList[slot].scale;
            element.zOrder = this.typeCellPosList[slot].zOrder;
            element.visible = true; 
            element.boxCell.slot = slot;
            element.y = this.typeCellContent.height >> 1;
            element.isCenter = slot == this.ladderNum;
            if(element.isCenter) curCenter = element;
            
            element.moveCell({ 
                x: t_X,
                scaleX: t_Scale,
                scaleY: t_Scale,
                alpha : this.typeCellPosList[slot].alpha,
            },this.roomTypeCellMoveSpeed);
           
        }
         if(curLeftEdge){
            curLeftEdge.moveCell( {x: this.auxiliaryPosLeft}, this.roomTypeCellMoveSpeed );
        }
        if(curRightEdge){
            curRightEdge.moveCell( {x: this.auxiliaryPosRight}, this.roomTypeCellMoveSpeed );
        }
       // this.setCurRommLimitInfo(curCenter.minNote);
       this.callback && this.callback.call(this.caller, "moveCell",curCenter.minNote );
    }
}