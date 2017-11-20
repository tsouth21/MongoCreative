var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Show = mongoose.model('Show');


router.get('/shows', function(req, res, next) {
  Show.find(function(err, shows) {
    if(err) {return next(err); }
    res.json(shows);
  });
});

router.post('/shows', function(req,res,next) {
  var show = new Show(req.body);
  show.save(function(err, show) {
    if(err) {return next(err); }
    res.json(show);
  });
});

router.param('show', function(req, res, next, id) {
  var query = Show.findById(id);
  query.exec(function (err, show){
    if (err) { return next(err); }
    if (!show) { return next(new Error("can't find show")); }
    req.show = show;
    return next();
  });
});

router.get('/shows/:show', function(req, res) {
  res.json(req.show);
});

router.put('/shows/:show/upvote', function(req, res, next) {
  req.show.upvote(function(err, show){
    if (err) { return next(err); }
    res.json(show);
  });
});

module.exports = router;
