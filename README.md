Intel Cloud Services Plugin - Phonegap V >= 3.0
=====================

Installation
=================

<h3><b>Critical</b>: First of all, you need install node.js and configure phonegap. More info <a href='http://phonegap.com/install/'>here</a></h3>

- Create a new project with the following command: <b>phonegap create testing com.example.testing testing</b>

- You must install the <font color='green'>Android</font>/<font color='orangered'>iOS</font> platform in that project. The command: <b>phonegap build <font color='green'>android</font>/<font color='orangered'>ios</font></b>

- For install this plugin, you must execute the following command: <b>phonegap local plugin add https://github.com/plgphonegap/plgphonegap</b>

<ul>
<li>In <font color='green'>Android</font>:</li>
        <ul><li>- You must import Cloud Intel SDK and Context Intel SDK libraries.</li></ul>
    <li>In <font color='orangered'>iOS</font>:</li>
        <ul><li>- You must import only Context SDK Library and the following dependencies:</li></ul>

<ul>
    <ul>
        <li><i>MediaPlayer.framework</i></li>
        <li><i>CoreTelephony.framework</i></li>
        <li><i>AddressBook.framework</i></li>
        <li><i>EventKit.framework</i></li>
        <li><i>SystemConfiguration.framework</i></li>
    </ul>
</ul>
</ul>

- Done, now you can use the plugin.

Note for <font color='orangered'>iOS</font>
======

if you got an <b>whitelist error</b> when you try to login with your credentials, you need do the following:

In config.xml, add this line:

<blockquote>&lt;access origin="*intel*" /&gt;</blockquote>

Right above

<blockquote>&lt;access origin="http://127.0.0.1*" /&gt;</blockquote>