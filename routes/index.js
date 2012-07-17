module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('index.jade', {
            title: app.set('title')
        });
    });

    app.get('/branches', function(req, res) {
        var exec = require('child_process').exec;
        var cmd = 'git --git-dir ' + req.query.path + '/.git branch -a';

        // Store the current path in the session to be reused when deleting
        req.session.path = req.query.path;

        var child = exec(cmd, function(error, stdout, stderr) {
            // Create an array of the branches from the stream output
            var branches = stdout.replace(/(\r\n|\n|\r)/gm,'').replace(/  |\* /g, ' ').split(' ');

            // Don't try to display any branches if there was an error
            if (stderr) branches = null;

            res.render('branches/list.jade', {
                title: app.set('title'),
                branches: branches
            });
        });
    });

    app.del('/branches', function(req, res) {
        var path = req.session.path;
        var exec = require('child_process').exec;
        var branchName = req.param('branchname');
        var cmd = 'git --git-dir ' + path + '/.git branch -D ' + branchName;

        var child = exec(cmd, function(error, stdout, stderr) {
            if (stdout) {
                res.json({
                    'data': {
                        'response': stdout,
                        'branchname': branchName
                    },
                    'status': 'ok'
                });
            } else if (stderr) {
                res.json({
                    'data': {
                        'response': stderr,
                        'branchname': branchName
                    },
                    'status': 'error'
                });
            }
        });
    });
};