/**
 * 转盘界面
 */
function WheelOfFortuneView()
{
    WheelOfFortuneView.super(this);
    this.init = function()
    {
        this.RewardDesc = '';
        
        this.x = 810;
        this.y = 450;
        this.anchorX = 0.5;
        this.anchorY = 0.5;
        //this.backBtn = this.getChildByName('backBtn');
        this.backBtn.on( Event.CLICK,this,this.onBackBtn );
        this.imgFortuneB = this.boxPan.getChildByName('imgFortuneB');
        this.btnBegin.on( Event.CLICK,this,this.onWheelBtnClick );
        this.initStars();
        this.initAwards();        
        this.checkCondition();
    }
    this.initStars = function(){
        this.star0 = new Star();
        this.star0.width   = 85;//最左
        this.star0.height  = 82;
        this.star0.init( 0 );
        this.star0.x = 560;
        this.star0.y = 230;        
        this.addChild(this.star0);

        this.star1 = new Star();
        this.star1.width   = 60;//最下
        this.star1.height  = 60;
        this.star1.init( 0 );
        this.star1.x = 898;
        this.star1.y = 776;        
        this.addChild(this.star1);

        this.star2 = new Star();
        this.star2.width   = 60;//最上
        this.star2.height  = 60;
        this.star2.init( 0 );
        this.star2.x = 945;
        this.star2.y = 150;        
        this.addChild(this.star2);
    }
    //不停的转动
    this.beginAnimation = function(){
        this.imgFortune.visible = false;
        this.imgFortuneB.visible = true;
        this.btnBegin.disabled = false;
        Laya.timer.loop(1200, this, this.animateTimeBased);        
    }
    this.clearAnimation = function(){
        this.imgFortuneB.visible = false;
        Laya.timer.clear(this,this.animateTimeBased);
    }
    this.animateTimeBased = function(){
        var a = (this.imgFortuneB.rotation + 30) % 360;
        this.imgFortuneB.x = 385 + 155 * Math.sin(2 * Math.PI/360 * a);
        this.imgFortuneB.y = 385 - 155 * Math.cos(2 * Math.PI/360 * a);
        this.imgFortuneB.rotation = a;
    }
    this.initAwards = function(){
        this.imgFortune = this.boxPan.getChildByName('imgFortune');
        this.updateLotteryInfo();
        //(x0,y0)位圆心坐标,a角度上的坐标计算公式为：
        // x = x0 + y0 * sin(2Pi/360*a)   
        // y = x0 - y0 * cos(2Pi/360*a)
        for(var i = 0;i<12;i++){
            var img = this.boxPan.getChildByName("imgReward"+i);
            img.x = 385 + 205 * Math.sin(2 * Math.PI/360 * 30 * i);
            img.y = 385 - 205 * Math.cos(2 * Math.PI/360 * 30 * i);
            img.rotation = 30 * i;
        }
        this.boxPan.anchorX = 0.5;
        this.boxPan.anchorY = 0.5;
    }
    this.show = function(bShow)
    {
        this.visible = bShow;
         if( bShow ){
            this.boxPan.rotation = 0;
            this.imgFortune.visible = false;
            this.addListener();
            this.box2.scaleX = 0.1;
            this.box2.scaleY = 0.1;
            this.box2.alpha = 0;
            Tween.to(this.box2,{scaleX:1,scaleY:1,alpha:1},300,Ease['elasticOut'],new Handler(this,this.toBAnimation),200);
        }else {
            this.removeListener();
            this.clearAnimation();
            if(this.tweenBox)Tween.clear(this.tweenBox);     
        }
    }
    this.toBAnimation = function(){
        var task = new TaskDelay();
        task.data = null;
        task.callBack = this.beginAnimation;
        task.classObj = this;
        task.leftTime = 100;
        TaskDelayManager.getInstance().addTask( task );
    }
    this.destroy = function(){
        this.__proto__.destroy();
        this.clearAnimation();
        this.removeListener();
    }
    this.addListener = function()
    {
         MessageCallbackPro.addCallbackFunc( EventType.Type.wheelFortune,this.onWheelFortune,this);
         MessageCallbackPro.addCallbackFunc( EventType.Type.lotteryUpdate,this.onLotteryUpdate,this);
    }

    this.removeListener = function()
    {
        MessageCallbackPro.removeCallbackFunc( EventType.Type.wheelFortune,this.onWheelFortune,this);
        MessageCallbackPro.removeCallbackFunc( EventType.Type.lotteryUpdate,this.onLotteryUpdate,this); 
    }
    //检查抽奖条件
    this.checkCondition = function(){
         if(GameData.getInstance().lotteryNum <= 0){
             //this.btnBegin.disabled = true;
         }
    }
    //抽奖反馈
    this.onWheelFortune = function(content){        
        if(!content.errorMsg || (content.errorMsg == "")){
            this.rewardNum = parseInt(content.RewardIdx);
            this.RewardDesc = content.RewardDesc;
            if(isNaN(this.rewardNum)) return;
            CLog.log("////当前中奖ID："+content.RewardIdx+"     content:"+content.RewardDesc);
            this.wheelFortune();
        }
        else{
            var task = new TaskDelay();
            task.data = null;
            task.callBack = this.beginAnimation;
            task.classObj = this;
            task.leftTime = 3100;
            TaskDelayManager.getInstance().addTask( task );
        }        
    }
    //当奖励信息变化
    this.onLotteryUpdate = function(){
        this.updateLotteryInfo();
    }
    this.updateLotteryInfo = function(){
        for(var i=0;i<12;i++){
            var img = this.boxPan.getChildByName("imgReward" + i);
            var idx = GameData.getInstance().lotterys[i] || 0;
            img.dataSource = {skin:"gameHall/wheelFortune/reward" + i + ".png"};
        }
    }
    this.onBackBtn = function()
    {
        this.show(false);
    }
    this.onWheelBtnClick = function(){
        this.clearAnimation();
        this.imgFortune.visible = false;
        this.btnBegin.disabled = true;
        //请求数据
        GateSocketClient.getInstance().CG_LOTTERY_REQ();

        // 以下为测试
        // this.rewardNum = parseInt(Math.random() * 12 ,10);
        // this.wheelFortune();
        // CLog.log("////当前中奖ID："+this.rewardNum);
    }
    //实施转盘转动
    this.wheelFortune = function(){
        var curRotation = this.boxPan.rotation % 360;
        this.boxPan.rotation = curRotation;
        var a0 =  360 * (parseInt(Math.random() * 3)  + 4);//随机旋转圈数(至少旋转3圈)
        var a1 = (360 - this.rewardNum * 30);//旋转到指定奖励
        var a2 = parseInt(Math.random() * 26 - 13,10);//在指定奖励附近随机偏移一小段距离
		this.wheelRotation = a0 + a1 +  a2;
        CLog.log("a0:"+a0 + "  a1:"+a1+"   a2:"+a2);
		this.tweenBox = Tween.to(this.boxPan,{rotation :  this.wheelRotation},10000,Ease['quartOut'],new Handler(this,this.onWheelOver));
    }
    this.onWheelOver = function(){
        this.imgFortune.rotation  = 0;
        var a = this.rewardNum * 30;
        this.imgFortuneB.x = this.imgFortune.x = 385 + 155 * Math.sin(2 * Math.PI/360 * a);
        this.imgFortuneB.y = this.imgFortune.y = 385 - 155 * Math.cos(2 * Math.PI/360 * a);
        this.imgFortuneB.rotation = this.imgFortune.rotation = a;
        this.imgFortune.visible = true;

        //闪烁
        this.imgFortune.alpha = 0;
        Tween.to(this.imgFortune,{alpha : 1},200,Ease['circIn']);
        Tween.to(this.imgFortune,{alpha : 0},200,Ease['circIn'],null,200);
        Tween.to(this.imgFortune,{alpha : 1},200,Ease['circIn'],null,400);
        Tween.to(this.imgFortune,{alpha : 0},200,Ease['circIn'],null,600);
        Tween.to(this.imgFortune,{alpha : 1},200,Ease['circIn'],null,800);
        Tween.to(this.imgFortune,{},200,null,new Handler(this,this.showReward),1500);
        //this.tweenBingo3 = Tween.to(this.imgFortune,{alpha : 1},200,Ease['circIn'],new Handler(this,this.showReward),3000);
    }
    //展示奖品
    this.showReward = function(){
        new TipsMessage(this.RewardDesc,false,false,2000);
        var task = new TaskDelay();
        task.data = null;
        task.callBack = this.beginAnimation;
        task.classObj = this;
        task.leftTime = 2100;
        TaskDelayManager.getInstance().addTask( task );
    }
}