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

function onReceivedItem(itemJson, type){
    var $elements = $(".ui-li-count");
    $.each($elements, function(){
        var idElement = $(this).attr("id");
        var counter = parseInt($(this).text()) + 1;
        if(idElement == type){
            $(this).text(counter);
        }
    });
}

function onError(message){
    navigator.notification.alert(message, null, "Error", "OK");
}

var context = {
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
