
App.Constants = (function() {
    return {
        BasePlaceholderID: "pageHolder",
        BaseMenuPlaceholderID: "menuHolder",
        BaseDBPath: App.path.join(App.gui.App.dataPath, 'neDB/'),
        DBKey: "g7&K3(9D%@47$d34K2(sD4@#Js9G3K%s",
        Enums: {
            Templates: {
                CCLASS_TEMPL: "CCLASS_TEMPL",
                CBASE_CLASS_TEMPL: "CBASE_CLASS_TEMPL",
                SP_SELECTDETAILS_TEMPL: "SP_SELECTDETAILS_TEMPL",
                SP_SELECTSEARCHLIST_TEMPL: "SP_SELECTSEARCHLIST_TEMPL",
                SP_INSERTUPDATE_TEMPL: "SP_INSERTUPDATE_TEMPL",
                SP_DELETE_TEMPL: "SP_DELETE_TEMPL"
            },
            Connections: {
                DEFAULT: "DEFAULT"
            }
        }
    }
})();

App.Variables = (function () {
    return {
        BaseViews: [],
        IsAuthorized: false,
        shellViewModel: null,
        activePageViewModel: null,
        ActivePage: "home",
        SettingsSelectedTempl: "",
        ConnectionConfig: {
            user: '',
            password: '',
            server: 'localhost',
            database: '',
    
            options: {
                encrypt: false 
            }
        }
    }
})();