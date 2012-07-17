
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http');

var app = express();

app.configure(function(){
    app.set('title', 'Ridiculous Git Branch Cleaner');
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use(express.cookieParser());
    app.use(express.session({ secret: "keyboard cat" }));
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
