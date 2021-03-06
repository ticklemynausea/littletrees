/* Usage / Conf */
var usage = "Provides Trees\n\
Usage\n\
\n\
    GET /tree\n\
    Returns to the caller a random height tree\n\
\n\
    GET /tree/height\n\
    Returns to the caller a tree of the specified height (restrictions apply)\n\
\n\
RFC and docs somewhere at http://blol.org\n";

var maxHeight = 120;

/* String Helpers */
String.prototype.isInt = function() {
  return !isNaN(this) && (function(x) { return (x | 0) === x; })(parseFloat(this))
}


/* LittleTree: Generates Little Trees */

var LittleTree = function(height) {

    var low = 1;

    this.height = height || parseInt(Math.random() * (maxHeight - low) + low);

}

LittleTree.prototype.makeTree = function() {

    var result = "";
    
    for (var i = 1; i <= this.height; i++) {

        for (var j = 0; j < this.height - i; j++) {
            result += " ";
        }

        for (var j = 1; j <= 2*i - 1; j++) {
            result += "*";
        }

        result += "\n";
    }

    return result;

}

LittleTree.prototype.makeTrunk = function() {

    var result = "";
    var lastLineWidth = this.height * 2 - 1;

    if (this.height % 2 > 0) {
    
        for (var i = 0; i <= (this.height / 2); i++) {
            
            for (var j = 0; j <= lastLineWidth / 4 - 1; j++) {
                result += " ";
            }

            for (var j = 0; j <= lastLineWidth / 2; j++) {
                result += "#";
            }

            result += "\n";

        }

    } else {
    
        for (var i = 0; i <= (this.height / 2); i++) {
 
            for (var j = 0; j <= lastLineWidth / 4; j++) {
                result += " ";
            }

            for (var j = 0; j <= lastLineWidth / 2 - 1; j++) {
                result += "x";
            }

            result += "\n";

        }

    }

    return result;
}

LittleTree.prototype.toString = function() {
    return this.makeTree() + this.makeTrunk();
}

/* Webscale HTTP Server */
var express = require('express')

var app = express()

/* Log connections to console */
function log(req) {
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    console.log(req.method + " " + ip + " - " + req.url);
}

/* * Routes * */

app.get('/tree', function(req, res) {
    
    log(req);

    res.set('Content-Type', 'text/plain');
    res.send(String(new LittleTree()));

});

app.get('/tree/:height', function(req, res) {
    
    log(req);

    res.set('Content-Type', 'text/plain');
    if (req.params.height.isInt()) {

        if (req.params.height <= maxHeight && req.params.height >= 0) {

            res.send(String(new LittleTree(req.params.height)));

        } else {

            res.send(usage);

        }

    } else {

        res.send(usage);

    }

});

app.get('*', function(req, res) {

    log(req);

    res.set('Content-Type', 'text/plain');
    res.send(usage);

});


app.post('*', function(req, res) {

    log(req);

    res.set('Content-Type', 'text/plain');
    res.send(usage);

});


app.put('*', function(req, res) {

    log(req);

    res.set('Content-Type', 'text/plain');
    res.send(usage);

});


app.delete('*', function(req, res) {

    log(req);

    res.set('Content-Type', 'text/plain');
    res.send(usage);

});

var server = app.listen(3000, "::", function () {

  var host = server.address().address
  var port = server.address().port

  console.log('RESTful server listening at http://%s:%s', host, port)

});