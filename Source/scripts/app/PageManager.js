App.PageManager = (function () {
    var navigationHistory = [];
    return{
        LoadPage: _LoadPage,
        NavigateBack: _NavigateBack,
        Init: _Init
    }

    function _Init()
    {
        $.ajaxSetup({ cache: false });
        //Load the resources
        $.getJSON("scripts/app/Resources/config.json", function (response) {
            App.Variables.BaseViews = response.Views;

            //Load home page
            _LoadPage("home", true);
        }).error(function (msg) { console.log(msg); });
    }
    function _LoadPage(pageName, addHistory) {
        var baseUrl = "";
        var menuUrl = "";
        
        //Get page
        var page = $.grep(App.Variables.BaseViews, function (item) {
            return item.key == pageName;
        });

        if (page.length > 0) {
            baseUrl = page[0].location;
            menuUrl = page[0].menu;
        }

        if (baseUrl != "") {
            $.ajaxSetup({ cache: false });
            $.get(baseUrl, null, function (resp) {
                App.Variables.ActivePage = pageName;

                //Show Page
                $("#" + App.Constants.BasePlaceholderID).fadeOut(400, function () {
                    $("#" + App.Constants.BasePlaceholderID).html(resp);
                    $("#" + App.Constants.BasePlaceholderID).fadeIn(400);
                    App.Variables.shellViewModel.LoadBreadCrumbs();

                    if (addHistory == undefined || addHistory != null || addHistory == true) {
                        navigationHistory.push(pageName);
                    }

                    //Load and show page menu
                    $.get(menuUrl, null, function (resp) {
                        $("#" + App.Constants.BaseMenuPlaceholderID).html(resp);
                    });
                });
            });
        }
    }
    function _NavigateBack()
    {
        var historyItem = "";

        if(navigationHistory.length > 1)
        {
            historyItem = navigationHistory.pop();
            historyItem = navigationHistory.pop();
            _LoadPage(historyItem, true);
        }
    }
})();