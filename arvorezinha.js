/* Usage / Conf */
var usage = "Provides Trees\n\
Usage\n\
\n\
    GET /tree\n\
    Returns to the caller a random-size tree\n\
\n\
    GET /tree/size\n\
    Returns to the caller a tree of the specified size (restrictions apply)\n";

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

/* * Routes * */

app.get('/tree', function(req, res) {

    res.set('Content-Type', 'text/plain');
    res.send(String(new LittleTree()));

});

app.get('/tree/:size', function(req, res) {

    res.set('Content-Type', 'text/plain');
    if (req.params.size.isInt()) {

        if (req.params.size == 0) {

            res.send(String(new LittleTree(req.params.size)));

        } else if (req.params.size <= maxHeight) {

            res.send(String(new LittleTree(req.params.size)));

        } else if (req.params.size > maxHeight) {

            res.send(usage);

        } else {

            res.send(usage);

        }

    } else {

        res.send(usage);

    }

});

app.get('*', function(req, res) {

    res.set('Content-Type', 'text/plain');
    res.send(usage);

});

var server = app.listen(3000, "::", function () {

  var host = server.address().address
  var port = server.address().port

  console.log('RESTful server listening at http://%s:%s', host, port)

});