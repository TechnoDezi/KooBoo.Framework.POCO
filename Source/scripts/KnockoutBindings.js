ko.bindingHandlers.dateFromNow = {
    update: function (element, valueAccessor, allBindingsAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        var date = value.toISOString();
        var formattedValue = App.moment(date).calendar();

        $(element).text(formattedValue);
    }
};