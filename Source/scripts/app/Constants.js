
App.Constants = (function() {
    return {
        BasePlaceholderID: "pageHolder",
        BaseMenuPlaceholderID: "menuHolder",
        BaseDBPath: App.path.join(App.gui.App.dataPath, 'neDB/')
    }
})();

App.Variables = (function () {
    return {
        BaseViews: [],
        IsAuthorized: false,
        shellViewModel: null,
        activePageViewModel: null,
        ActivePage: "home",
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