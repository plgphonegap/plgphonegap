var clientId;
var secretId;
var scopes;

var intel = {
    // Application Constructor
    initialize: function(clientId, secretId, scopes) {
        this.clientId = clientId;
        this.secretId = secretId;
        this.scopes = scopes;
        
        cordova.exec(function(a) {
            //Successful
            }, function(e) {
                alert("Error initializing credentials: " + e);
            }, "Intel", "init", [clientId, secretId, scopes]
            );
    },
    login: function(callback, errorCallback) {
        cordova.exec(function(a) {
            callback(a);
        },
        function(e) {
            errorCallback(e);
        }, "Intel", "login", []
        );
    },
    logout: function(callback, errorCallback) {
        cordova.exec(function(a) {
            callback(a);
        }, function(e) {
            errorCallback(e);
        }, "Intel", "logout", []
        );
    }
}
module.exports = intel;