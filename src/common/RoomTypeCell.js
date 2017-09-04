/**
 * 房间类型格子
 */
function RoomTypeCell()
{
    RoomTypeCell.super(this);
    //var _proto = SHRoomTypeCellView.prototype;
    
    this.init = function(nameImg,nameText)
    {
        nameText = nameText ? nameText : nameImg
        this.anchorX = this.anchorY = 0.5;
        this.tween = null;
        var curScense = ChangeScene.getInstance().getSceneType();
        this.typeImage.dataSource = {skin:"commonHall/"+nameImg+".png"};
        this.typeText.dataSource = {skin:GameData.getInstance().gameHallRes[curScense]+nameText+"_label.png"};
    }
    
    /**
     * 完成缓动
     */
    this.completeTween = function()
    {
        if( this.tween ) 
        {
            this.tween.complete();
            this.tween = null;
        }
    }
    
    /**
     * 移动格子
     */
    this.moveCell = function(_data,_speed)
    {
        if( this.tween ) 
        {
            this.tween.complete();
            this.tween = null;
        }
        this.tween = Tween.to( this,_data,_speed ,null,Handler.create(this,this.comp)); 
    }
    
    this.comp = function()
    {
        this.tween = null;
    }
}
