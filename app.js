var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
Web3 = require("web3"); //requiring web3 module

var routes = require('./routes/index');
var users = require('./routes/users');
//required the compiled contract from the artifacts
var MyContractJSON = require(path.join(__dirname, 'build/contracts/Hello.json'))

var app = express();
//took an instance from the running ganache-cli blockchain
const web3 = new Web3('http://localhost:8545');
//account provided by ganache for consuming ether -- change this according to your preference
accountAddress = "0xF82BCCd8bd681f99DA162624F0Ca3E33Dc498754";
//address of the deployed (ganache) contract -- double check the network ID in the artifacts (network)
contractAddress = MyContractJSON.networks['1611991703967'].address;
//abi code from the artifacts
var contractAbi = MyContractJSON.abi;
//putting it all together
MyContract = new web3.eth.Contract(contractAbi, contractAddress);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;