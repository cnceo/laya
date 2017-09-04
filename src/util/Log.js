var CLog = {
    open : false,
    log : function(message){
        if(!this.open) return;
        console.log(message);
    },
    info : function(message){
        if(!this.open) return;
        console.info(message);
    },
    error : function(message){
        console.error(message);
        window.onerror(message);
    },
    warn : function(message){
        if(!this.open) return;
        console.warn(message);
    },
    trace : function(message){
        if(!this.open) return;
        console.trace(message);
    }
}