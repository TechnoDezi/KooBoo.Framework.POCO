function ShellViewModel() {
    var self = this;

    //Properties
    self.breadcrumbs = ko.observableArray([]);
    self.AppName = ko.observable(App.gui.App.manifest.window.title);
    self.AppVersion = ko.observable(App.gui.App.manifest.version);

    //Functions
    self.init = function () {
        App.Init();
        
        //Init page manager
        App.PageManager.Init();
    }
    self.LoadBreadCrumbs = function () {
        self.breadcrumbs([]);
        var page = $.grep(App.Variables.BaseViews, function (item) {
            return item.key == App.Variables.ActivePage;
        });

        if (page[0] != undefined && page[0].breadcrumbs != undefined && page[0].breadcrumbs.length > 0) {
            $(page[0].breadcrumbs).each(function (index, crumb) {
                var crumbpage = $.grep(App.Variables.BaseViews, function (item) {
                    return item.key == crumb;
                });

                var title = crumbpage[0].title;
                var key = (crumbpage[0].key == App.Variables.ActivePage) ? "" : crumbpage[0].key;

                self.breadcrumbs.push({ title: title, key: key });
            });
        }
    }

    //Events
    self.MenuClick = function (data, event) {
        $("#wrapper").toggleClass("toggled");
    }
    self.KooBooLinkClick = function (data, event) {
        App.gui.Shell.openExternal('http://www.kooboo.co.za');
    }
    self.CrumbClick = function (data, event) {
        if (data.key != "") {
            App.PageManager.LoadPage(data.key);
        }
    }
    self.ConfigClick = function (data, event) {
        App.PageManager.LoadPage("settings");
    }

    //Load View Model
    self.init();
}

App.Variables.shellViewModel = new ShellViewModel();

ko.applyBindings(App.Variables.shellViewModel, document.getElementById("shell"));
ko.applyBindings(App.Variables.shellViewModel, document.getElementById("footer"));
ko.applyBindings(App.Variables.shellViewModel, document.getElementById("breadcrumbs"));