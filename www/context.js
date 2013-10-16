var context = {
    onReceivedItem : function(itemJson, type){
        alert(type);
        var $elements = $(".ui-li-count");
        $.each($elements, function(){
            var idElement = $(this).attr("id");
            var counter = parseInt($(this).text()) + 1;
            if(idElement == type){
                $(this).text(counter);
        }
        });
    },
    onError : function(message){
        alert(message);
    },
    // Application Constructor
    getServices: function(){
        cordova.exec(function(a) {
            var length = a.length;
            for(var m=0; m < length; m++){
                var SERVICE = new service.init(a[m]["name"], a[m]["urn"], a[m]["situationType"]);
                SERVICES.push(SERVICE);
            }
        }, function(e) {
            alert("Error!");
        }, "Context", "getServicesList", []
        );
    },
    init: function() {
        var servicesList = window.localStorage.getEnabledServices();
        cordova.exec(function(a) {
            //alert("Successful!");
            }, function(e) {
            //alert("Error!");
            }, "Context", "initWithServicesList", [servicesList]
            );
    },
    stop: function() {
        var servicesList = window.localStorage.getEnabledServices();
        cordova.exec(function() {
            alert("Stopped services sucessful!");
        }, function() {
            alert("Error stopping services. Try again");
        }, "Context", "stopServices", []
        );
    }
}
module.exports = context;