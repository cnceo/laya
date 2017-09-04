/**
 * 筹码类
 */
var JETTON_NUM_ENUM = 
[
    {key:'5000',value:0},
    {key:'1000',value:0},
    {key:'500',value:0},
    {key:'100',value:0},
    {key:'50',value:0},
    {key:'25',value:0},
    {key:'5',value:0},
    {key:'1',value:0}
];
function Jetton()
{
    Jetton.super( this );
    
    this.init = function(){
        Tween.clearAll(this);
    }
    this.setImage = function( _path,bRotate)
    {
        bRotate = bRotate === undefined ? true : bRotate;
        var t_jetion = Laya.loader.getRes( _path );
        this.graphics.clear();
        this.graphics.drawTexture(t_jetion, 0, 0);
        this.size(t_jetion.width, t_jetion.height);
        this.pivotX = t_jetion.width  >> 1;
        this.pivotY = t_jetion.height >> 1;
        if(bRotate) this.rotation = Math.random() * 180;       
    }
    
    this.AddJetionMove = function(scale,offset)
    {
        scale = scale || 1;
        offset = offset || 0;
        Tween.to(this,
        {
            x: this.cardMoveEndPos.x,
            y: this.cardMoveEndPos.y,
            scaleX: scale,
            scaleY: scale,
        }, this.moveDuration,null,null,offset);//Ease['elasticOut']
    }
}

//解析筹码
Jetton.GetJettonNum = function(num){
    var jn = [];
    var value = num;
    for( var i = 0; i < JETTON_NUM_ENUM.length;i++ )
    {
        var t_key = parseInt( JETTON_NUM_ENUM[i].key );
        var num = parseInt(value / t_key);
        if( num > 0 )
        {
            jn.push({key:JETTON_NUM_ENUM[i].key,value:num});
        } 
        value %= t_key;
        if( value === 0 )
        {
            break;
        }
    }    
    return jn;
}