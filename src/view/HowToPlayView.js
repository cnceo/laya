/**
 * 玩法说明界面
 * 文件夹命名规则：各自游戏创建自己的目录，命名固定为readMe
 * 图片命名规则：每张图以数字命名 如：0.png表示第一张图
 */
function HowToPlayView()
{
    SetingView.super(this);
    this.bIsLock = false;//是否正在滑动
    this.lstHeadNode = [];
    this.lstPosHead = [];//图片坐标
    this.numHeadMax= 0;//目前资源个数
    this.maxTest = 10;//最大查找次数，查找有几个资源可用
    this.curSrcUrl = ""//当前场景的说明资源路径
    this.init = function()
    {
        this.getCurScenseExplainInfo();
        this.backBtn.on( Event.CLICK,this,this.onBackBtn );
        this.btnUp.on( Event.CLICK,this,this.onBtnUpClick);
        this.btnDown.on( Event.CLICK,this,this.onBtnDownClick);
        this.panelContent.on( Event.MOUSE_DOWN,this,this.onMouseDown );
        this.playContent.text = "";
        this.createParagraph();
    }
    this.onBackBtn = function()
    {
        this.visible = false;
    }
     this.show = function()
    {
        this.visible = !this.visible;
    }
    //获取当前场景的玩法说明信息
    this.getCurScenseExplainInfo = function(){
        var curScense = ChangeScene.getInstance().getSceneType();
        this.curSrcUrl = GameData.getInstance().gameHallRes[curScense] + 'readMe/';
        for(var i=0;i<this.maxTest;i++){
            var img = Laya.loader.getRes( this.curSrcUrl + i + ".png" );
            if(img == null || img == undefined){
                this.numHeadMax = i;
                break;
            }
        }
    }
    //创建玩法说明内容
    this.createParagraph = function()
	{
		// var p = new HTMLDivElement();
        
		// this.panelContent.addChild(p);

		// p.style.font = "Impact";
		// p.style.fontSize = 30;
        // p.style.width = 1500;
        // // p.style.height = 2000;

		// p.innerHTML = this.getSHPlayExplainPanel();        

        this.snapX = this.head1.x - this.head0.x;
        this.head0.curIndx = 0;
        this.head1.curIndx = 0;
        this.head2.curIndx = 1;
        this.head3.curIndx = 2;
        this.lstHeadNode.push(this.head0);
        this.lstHeadNode.push(this.head1);
        this.lstHeadNode.push(this.head2);
        this.lstHeadNode.push(this.head3);

        for(var i=0;i<4;i++){
            this.lstHeadNode[i].dataSource = {skin:this.curSrcUrl+ this.lstHeadNode[i].curIndx+".png"};
        }

        this.lstPosHead.push(this.head0.x - this.snapX);
        this.lstPosHead.push(this.head0.x);
        this.lstPosHead.push(this.head1.x);
        this.lstPosHead.push(this.head2.x);
        this.lstPosHead.push(this.head3.x);
        this.lstPosHead.push(this.head0.x);
       this.updateNumIndex(this.lstHeadNode[1].curIndx);
	}
    this.moveToRight = function(){
        if(this.bIsLock || this.lstHeadNode[1].curIndx == 0) return;
        this.bIsLock = true;
        var idx = this.lstHeadNode[0].curIndx - 1 < 0 ? (this.numHeadMax - 1): this.lstHeadNode[0].curIndx - 1;
        this.setItemInfo(idx);
        this.lstHeadNode[3].x = this.lstPosHead[0];
        for(var i=0;i<4;i++){
            Tween.to(this.lstHeadNode[i],{x : this.lstPosHead[i + 2]},500);
        }
        this.btnDown.visible = false;
        this.btnUp.visible = false;
        var task = new TaskDelay();
        task.callBack = this.updateUpItemsInfo;
        task.classObj = this;
        task.leftTime = 550;
        TaskDelayManager.getInstance().addTask( task );

        Laya.stage.off(Event.MOUSE_UP,this,this.onMouseUp);
        Laya.stage.off(Event.MOUSE_MOVE,this,this.onMouseMove);
    }
    
    this.moveToLeft = function(){
        if(this.bIsLock || this.lstHeadNode[1].curIndx == this.numHeadMax -1) return;
        this.bIsLock = true;
        var idx = this.lstHeadNode[2].curIndx + 1 > (this.numHeadMax - 1) ? 0 : this.lstHeadNode[2].curIndx + 1;
        this.setItemInfo(idx);
        this.lstHeadNode[3].x = this.lstPosHead[4];
        for(var i=0;i<4;i++){
            Tween.to(this.lstHeadNode[i],{x : this.lstPosHead[i]},500);
        }
        this.btnDown.visible = false;
        this.btnUp.visible = false;
        var task = new TaskDelay();
        task.callBack = this.updateDownItemsInfo;
        task.classObj = this;
        task.leftTime = 550;
        TaskDelayManager.getInstance().addTask( task );

        Laya.stage.off(Event.MOUSE_UP,this,this.onMouseUp);
        Laya.stage.off(Event.MOUSE_MOVE,this,this.onMouseMove);
    }
    this.updateUpItemsInfo = function(){
        var idx = this.lstHeadNode[0].curIndx - 1 < 0 ? (this.numHeadMax - 1): this.lstHeadNode[0].curIndx - 1;
        var temp = this.lstHeadNode[3];
        temp.curIndx = idx;
        this.lstHeadNode[3] = this.lstHeadNode[2];
        this.lstHeadNode[2] = this.lstHeadNode[1];
        this.lstHeadNode[1] = this.lstHeadNode[0];
        this.lstHeadNode[0] = temp; 
        this.bIsLock = false;
        this.updateNumIndex(this.lstHeadNode[1].curIndx);
    }
    this.updateDownItemsInfo = function(){
        var idx = this.lstHeadNode[2].curIndx + 1 > (this.numHeadMax - 1) ? 0 : this.lstHeadNode[2].curIndx + 1;
        var temp = this.lstHeadNode[3];
        temp.curIndx = idx;
        this.lstHeadNode[3] = this.lstHeadNode[0];
        this.lstHeadNode[0] = this.lstHeadNode[1];
        this.lstHeadNode[1] = this.lstHeadNode[2];
        this.lstHeadNode[2] = temp; 
        this.lstHeadNode[3].x = this.lstPosHead[4];
        this.bIsLock = false;
        this.updateNumIndex(this.lstHeadNode[1].curIndx);
    }
    this.updateNumIndex = function(idx){
        this.lbNumIndex.text = (parseInt(idx) + 1) + "/" + this.numHeadMax;
        this.btnDown.visible = idx != this.numHeadMax -1;
        this.btnUp.visible = idx != 0;
    }
    this.setItemInfo = function(curIndx){
        if(curIndx > this.numHeadMax) return;
        var ape = this.lstHeadNode[3];
        // 更换纹理
        ape.dataSource = {skin:this.curSrcUrl+curIndx+".png"};
    }
    this.onBtnUpClick = function(){
        this.moveToRight();
    }
    this.onBtnDownClick = function(){
        this.moveToLeft();
    }
    this.onMouseDown = function (e) {
        if(this.bIsLock) return;
        this.startMovePosX = Laya.stage.mouseX;
        Laya.stage.on(Event.MOUSE_UP,this,this.onMouseUp);
        Laya.stage.on(Event.MOUSE_MOVE,this,this.onMouseMove );
    }
    this.onMouseMove = function (e) {
        var deltaX = Laya.stage.mouseX - this.startMovePosX;
        if(deltaX > 90){
            this.moveToRight();
        }
        else if(deltaX < -90){
            this.moveToLeft();
        }
        else{
            if((this.lstHeadNode[1].curIndx == 0 && deltaX>0) 
                || (this.lstHeadNode[1].curIndx == this.numHeadMax -1 && deltaX<0) || this.bIsLock) return;
            for(var i = 0;i< 4;i++){
                this.lstHeadNode[i].x += deltaX * 0.1;
            }
        }        
    }
    this.onMouseUp = function(e){
        var deltaX = Laya.stage.mouseX - this.startMovePosX;
        this.onMouseMoveEnd(deltaX > 0);
        Laya.stage.off(Event.MOUSE_UP,this,this.onMouseUp);
        Laya.stage.off(Event.MOUSE_MOVE,this,this.onMouseMove);
    }
    this.onMouseMoveEnd = function(bDown){
        for(var i = 0;i< 4;i++){
            Tween.to(this.lstHeadNode[i],{x : this.lstPosHead[i+1]},300);
        }
    }
    // //梭哈的游戏规则说明
    // this.getSHPlayExplainPanel = function() {        
    //     var curScense = ChangeScene.getInstance().getSceneType();
    //     var html = "";
    //     switch(curScense){
    //         case GameData.getInstance().SCENE_TYPE.GOLDENFLOWERHALL:
    //             html = RulesOfGF;
    //             break;
    //         case GameData.getInstance().SCENE_TYPE.SHOWHANDROOMTYPE:
    //             html = RulesOfSH;
    //             break;
    //         default:                
    //             break;
    //     }
    //     return html;
    // }
}