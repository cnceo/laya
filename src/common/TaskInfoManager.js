/**
 * 游戏内任务管理
 * 
 */
TaskStatus = {//任务状态
    DELETE : 0,//删除
    RECEIVE : 2,//接受
    REWEARD : 3,//完成领奖
    FINISH : 4,//完成
}
var TaskInfoManager = (function()
{
    function _TaskInfoManager()
    {
        this._UnCompletedColor = '#FFFFFF';
        //任务列表
        this._taskList = [];
        //添加所有任务
        this.SetAllTask = function(data){            
            this._taskList = data || [];            
        }
        //获取所有的任务
        this.GetAllTask = function(){
            return this._taskList || [];
        }
        //由ID获取对应任务
        this.GetTaskByID = function(TaskID){
            for(var i = 0;i < this._taskList.length;i++) {
                if( TaskID === this._taskList[i].TaskID ){
                    return this._taskList[i];
                }
            }
            return null;
        }
        //由场景类型获取对应的任务
        this.GetTaskBySceneType = function(sceneType){
            var instance = GameData.getInstance();
            var tasks = [];
            switch(sceneType){
                case instance.SCENE_TYPE.GAMEHALL :
                    tasks = this.GetAllTask();
                    break;
                case instance.SCENE_TYPE.SHOWHANDROOMTYPE:
                case instance.SCENE_TYPE.SHOWHANDROOM:
                    tasks = this.GetTaskByTaskType(instance.TaskType.SHWOHAND.value);
                    break;
                default:
                    tasks = this.GetAllTask();
                    break;
            }
            return tasks;
        }
        //由任务类型获取对应任务
        this.GetTaskByTaskType = function(taskType){
            var tasks = [];
            for(var i = 0;i < this._taskList.length;i++) {
                if( taskType === this._taskList[i].ServerType ){
                    tasks.push(this._taskList[i]);
                }
            }
            return tasks;
        }
        /**
         * 添加一个任务 
         */
        this.AddTask = function( content )
        {
            this._taskList.push( content );            
        }
        //任务状态变化
        this.UpdateTask = function(data){
            var bChanged = false;
            for(var i = 0;i < this._taskList.length;i++)
            {
                if( data.TaskID === this._taskList[i].TaskID )
                {
                    this._taskList[i].Status = data.Status;
                    this._taskList[i].StatusDesc = data.StatusDesc;
                    bChanged = true;
                    break;
                }
            }
            if(data.Name){//有任务名称代表是新任务
                bChanged = true;
                this.AddTask(data);
            }
            if(bChanged) {
                MessageCallbackPro.messageEmit(EventType.Type.taskUpdate,data);
                this.initUITaskItem();
            }
        }
        
        /**
         * 删除一个任务
         */
        this.RemoveTask = function( id )
        {
            for(var i = 0;i < this._taskList.length;i++)
            {
                if( id === this._taskList[i].TaskID )
                {
                    this._taskList.splice(i,1);
                    return;
                }
            }
        }
        //获取已完成的任务数
        this.GetComplatedTaskNum = function(sceneType){
            var num = 0;
            var tasks = this.GetTaskBySceneType(sceneType);
            for(var i in tasks){
                if(tasks[i].Status == TaskStatus.FINISH
                    || tasks[i].Status == TaskStatus.REWEARD){
                    num++;
                }
            }
            return num;
        }
        //初始化UI任务
        this.InitUITaskInfo = function(uiListView,bSimple){
            if(!uiListView) return;
            this._bSimple = bSimple;
            this._uiListView = uiListView;
            this._uiListView.repeatX = 1;
            this._uiListView.repeatY = 5;
            this._uiListView.spaceY = 20;
            
            this._uiListView.vScrollBarSkin = "";
            this._uiListView.selectEnable = true;
            //this._uiListView.selectHandler = new Handler(this, onSelectTaskCallBack);
            this._uiListView.renderHandler = new Handler(this, this.updateUITaskNum);
            this.initUITaskItem();
        }
        this.initUITaskItem = function(){
            var arr = [];
            if(!this._uiListView) return;
            var taskList = this.GetTaskBySceneType(ChangeScene.getInstance().getSceneType());
            for(var i=0;i < taskList.length;i++){
                var textReward = '';
                for(var j in taskList[i].Rewards){
                    if(taskList[i].Rewards[j].TID == 0){
                        textReward = '￥'+ taskList[i].Rewards[j].Count;
                    }
                }
                //最大15个字符
                var name = taskList[i].Name;
                if(!this._bSimple){
                    name +=  "（" + taskList[i].StatusDesc + "）";
                }
                if(this._bSimple && (taskList[i].Name.length > 15)){
                    name = taskList[i].Name.substring(0,15)+"...";
                }                
                arr.push({TaskID:taskList[i].TaskID,Status:taskList[i].Status,lbContent:name,lbReward:textReward});
            }
            this._uiListView.array = arr;
        }
        this.updateUITaskNum = function(item,index){
            var dataSource = item.dataSource;
            if(dataSource == null) return;
            var iconComplated = item.getChildByName('iconComplated');
            iconComplated.visible = (dataSource.Status == TaskStatus.FINISH) ? true : false;
            var lbContent = item.getChildByName('lbContent');
            lbContent.color = (dataSource.Status == TaskStatus.FINISH) ? GameData.getInstance().COLOR.YELLOW : GameData.getInstance().WHITE;
            var lbReward = item.getChildByName('lbReward');
            lbReward.color = (dataSource.Status == TaskStatus.FINISH) ? GameData.getInstance().COLOR.YELLOW : GameData.getInstance().COLOR.WHITE;
        }
        /**
         * 房间内的任务释放
         */
        this.clearRoomTask = function()
        {
            this._uiListView = null;
            this._bSimple = false;
        }
    }
    
    //单例实例 
    var instance; 
    //返回对象 
    return { 
        name: '_TaskInfoManager', 

        getInstance: function () { 
            if (instance === undefined) { 
                instance = new _TaskInfoManager(); 
            } 
            return instance; 
        } 
    }; 
    
})();
