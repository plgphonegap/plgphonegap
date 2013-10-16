Intel Cloud Services Plugin
=====================

Installation in Android
=================

<h3><b>Critical</b>: First of all, you need install node.js and configure phonegap. More info <a href='http://phonegap.com/install/'>here</a></h3>

- Create a new project with the following command: <b>phonegap create testing com.example.testing testing</b>

- You must install the Android platform in that project. The command: <b>phonegap build android</b>

- For install this plugin, you must execute the following command: <b>phonegap local plugin add https://github.com/plgphonegap/plgphonegap</b>

- In the index.js located in <i>/assets/www/js/</i> (before the line <i>"var app = {..."</i>), you must add the following code:

<blockquote><pre>var service = {
    name : "",
    urn : "",
    init : function(name, urn, situationType){
        this.name = name;
        this.urn = urn;
        this.situationType = situationType;
        return this;
    }
}

var SERVICES = new Array();

/** Local storage */
const TAG_SERVICES_ENABLED = "services_enabled";

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}

Storage.prototype.getEnabledServices = function(){
    var $storage = window.localStorage.getItem(TAG_SERVICES_ENABLED);
    if($storage == null ||¬†$storage == ""){
        $storage = new Array();
    } else {
        $storage = window.localStorage.getObj(TAG_SERVICES_ENABLED);
    }
    
    return $storage;
}</pre></blockquote>

- You must import Cloud Intel SDK and Context Intel SDK libraries.

- Done, now you can use the plugin.