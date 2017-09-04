/*
* name;
*/
var EventSender = (function () {
    function EventSender() {
        this._arrEventReceiver = [];
    };

    EventSender.prototype.fireEvent = function(args){
        for(var i in this._arrEventReceiver){
            this._arrEventReceiver[i].process(args);
        }
    };

    EventSender.prototype.register = function(receiver){
        if(receiver instanceof EventReceiver){
            this._arrEventReceiver.push(receiver);
            return true;
        }
        return false;
    };

    EventSender.prototype.unregister = function(receiver){
        if(receiver instanceof EventReceiver){
            var idx = this._arrEventReceiver.indexOf(receiver);
            if(idx != -1){
                this._arrEventReceiver.splice(idx, 1);
                return true;
            }
        }
        
        return false;
    };
    return EventSender;
}());