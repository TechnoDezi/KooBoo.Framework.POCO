var App = App || {};
App.gui = require('nw.gui');
App.Q = require('q');
App.path = require('path');
App.fileSystem = require('fs');
App.Crypto = require("crypto-js");
App.moment = require('moment');
App.cluster = require('cluster');
App.lodash = require('lodash');
App.sql = require('mssql');
App.Datastore = require('nedb');

//App Methods
App.Init = function()
{
    App.SetupMenuBar();

    App.TemplatesDB = new App.Datastore(
        {
            filename: (App.Constants.BaseDBPath + 'templates.db'),
            autoload: true
            //afterSerialization: App.EncryptDB,
            //beforeDeserialization: App.DecryptDB
        });
}
App.NavigateHome = function()
{
    App.Variables.ActiveProjectID = "";
    App.PageManager.LoadPage("home");
}
App.GetFileExtention = function(filename)
{
    var ext = filename.split('.').pop();
    if(ext == filename) return "";
    return ext;
}
App.GetRandomNumber = function () {
    return Math.floor(Math.random() * 999) + 1;
}
App.GetNewLineChar = function () {
    var newline = String.fromCharCode(13, 10);
    return newline;
}
App.SetupMenuBar = function () {
    // initialize window menu
    var win = App.gui.Window.get(),
        nativeMenuBar = new App.gui.Menu({
            type: "menubar"
        });

    // check operating system for the menu
    if (process.platform === "darwin") {
        nativeMenuBar.createMacBuiltin("KooBoo POCO Generator");
    }

    // actually assign menu to window
    win.menu = nativeMenuBar;
}
App.ConnectSql = function(successCallback)
{
    var connection = new App.sql.Connection(App.Variables.ConnectionConfig, function (err) {

        if (err != null && err.code != "") {
            bootbox.alert(err.message, function () { });
        }
        else if (connection.connected == true) {
            successCallback(connection);
        }

    });
}