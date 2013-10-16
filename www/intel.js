/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

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
