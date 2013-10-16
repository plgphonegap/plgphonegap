var exec = require("cordova/exec");

var clientId;
var secretId;
var scopes;
var isLogged;

var intel = {
    // Application Constructor
    initialize: function(clientId, secretId, scopes) {
        this.clientId = clientId;
        this.secretId = secretId;
        this.scopes = scopes;
        
        cordova.exec(function(a) {
                        //Successful
                     }, function(e) {
                        //Error
                     }, "Intel", "init", [clientId, secretId, scopes]
        );
    },
    login: function() {
        //If the user is already logged, logout. If it is not logged, then show popup for login.
        if(!isLogged){
            cordova.exec(function(a) {
                            $("span[name='login_navbar']").text("Logout");
                            this.isLogged = true;
                            //enableControlButtons(true);
                         },
                         
                         function(e) {
                            alert("The login was unsuccesful!");
                         }, "Intel", "login", []
            );
        } else {
            cordova.exec(function(a) {
                            $("span[name='login_navbar']").text("Login");
                            this.isLogged = false;
                            //Deactivate start and stop button
                            //enableControlButtons(false);
                         }, function(e) {
                         alert("The logout was unsuccesful!");
                         }, "Intel", "logout", []
            );
        }
    }
}
