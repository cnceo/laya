/*
* name;
*/
var EventReceiver = (function () {
    function EventReceiver() {
    }
    //供实例化的时候重写
    EventReceiver.prototype.process = function(args){}
    
    return EventReceiver;
}());