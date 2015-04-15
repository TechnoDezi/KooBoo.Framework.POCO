App.Connections = (function () {
    return {
        FindAll: _FindAll,
        FindByCode: _FindByCode,
        InsertUpdate: _InsertUpdate,
        Delete: _Delete
    }

    function _FindAll() {
        var deferred = App.Q.defer();

        App.ConnectionDB.find({}).exec(function (err, docs) {
            deferred.resolve(docs);
        });

        return deferred.promise;
    }

    function _FindByCode(code) {
        var deferred = App.Q.defer();

        App.ConnectionDB.findOne({ code: code }, function (err, doc) {
            deferred.resolve(doc);
        });

        return deferred.promise;
    }

    function _InsertUpdate(code, user, password, server, database, encrypt) {
        var deferred = App.Q.defer();

        _FindByCode(code).then(function (project) {

            //check insert
            if ($.isEmptyObject(project) || project == null || project == undefined) {
                project = {
                    code: code,
                    user: user,
                    password: password,
                    server: server,
                    database: database,
                    encrypt: encrypt
                }

                App.ConnectionDB.insert(project, function (err, newDoc) {
                    deferred.resolve(newDoc._id);
                });
            }
            else //Update
            {
                project.code = code;
                project.user = user;
                project.password = password;
                project.server = server;
                project.database = database;
                project.encrypt = encrypt;

                App.ConnectionDB.update({ _id: project._id }, project, {}, function (err, numReplaced) {
                    deferred.resolve(project._id);
                });
            }
        });

        return deferred.promise;
    }

    function _Delete(id) {
        var deferred = App.Q.defer();

        App.ConnectionDB.remove({ _id: id }, {}, function (err, numRemoved) {
            deferred.resolve(true);
        });

        return deferred.promise;
    }

})();