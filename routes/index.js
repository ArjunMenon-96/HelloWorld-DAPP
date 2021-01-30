var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    MyContract.methods.message().call({ from: accountAddress }).then((_message) => {
        console.log(_message);
        res.render('index', { messagevalue: _message });
    })
});

router.post('/', function(req, res, next) {

    data = req.body;

    MyContract.methods.update(data.messagevalue).send({ from: accountAddress }).then((result) => {
        console.log(result);
        MyContract.methods.message().call({ from: accountAddress }).then((_message) => {
            console.log(_message);
            res.render('index', { messagevalue: _message });
        })
    })
});
module.exports = router;