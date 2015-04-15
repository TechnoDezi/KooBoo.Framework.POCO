App.Templates = (function () {
    return {
        FindAll: _FindAll,
        FindByCode: _FindByCode,
        InsertUpdate: _InsertUpdate,
        Delete: _Delete
    }

    function _FindAll() {
        var deferred = App.Q.defer();

        App.TemplatesDB.find({}).sort({ dateAdded: 1 }).exec(function (err, docs) {
            deferred.resolve(docs);
        });

        return deferred.promise;
    }

    function _FindByCode(code) {
        var deferred = App.Q.defer();

        App.TemplatesDB.findOne({ code: code }, function (err, doc) {
            deferred.resolve(doc);
        });

        return deferred.promise;
    }

    function _InsertUpdate(templateName, code, templateContent) {
        var deferred = App.Q.defer();

        _FindByCode(code).then(function (project) {

            //check insert
            if ($.isEmptyObject(project) || project == null || project == undefined) {
                project = {
                    templateName: templateName,
                    code: code,
                    templateContent: templateContent
                }

                App.TemplatesDB.insert(project, function (err, newDoc) {
                    deferred.resolve(newDoc._id);
                });
            }
            else //Update
            {
                project.templateName = templateName;
                project.code = code;
                project.templateContent = templateContent;

                App.TemplatesDB.update({ _id: project._id }, project, {}, function (err, numReplaced) {
                    deferred.resolve(id);
                });
            }
        });

        return deferred.promise;
    }

    function _Delete(id) {
        var deferred = App.Q.defer();

        App.TemplatesDB.remove({ _id: id }, {}, function (err, numRemoved) {
            deferred.resolve(true);
        });

        return deferred.promise;
    }

})();