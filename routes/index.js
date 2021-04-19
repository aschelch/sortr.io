var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sortr.io' });
});

var list = [];

router.post('/sort', function(req, res, next) {

  list = [];
  items = req.body.list.split("\n");

  if(items.length < 2){
    return res.redirect("/");
  }

  for (let i = 0; i < items.length; i++) {
    list.push({
      id: i,
      title: items[i],
      score: 1000
    });    
  }

  res.redirect("/sort");
});


router.get('/sort/:left?/:right?/:winner?', function(req, res, next) {
  if(list.length == 0){
    return res.redirect("/");
  }

  if(req.params.left && req.params.right && req.params.winner){

    var l = parseInt(req.params.left);
    var r = parseInt(req.params.right);
    var w = parseInt(req.params.winner);

    oldScoreLeft = list[l].score
    oldScoreRight = list[r].score

    esperanceLeft = 1.0/(1+Math.pow(10, (oldScoreRight-oldScoreLeft)/400.0));
    esperanceRight = 1.0/(1+Math.pow(10, (oldScoreLeft-oldScoreRight)/400.0));

    newScoreLeft = oldScoreLeft+100*((l==w?1:0)-esperanceLeft);
    newScoreRight = oldScoreRight+100*((r==w?1:0)-esperanceRight);

    list[l].score = Math.round(newScoreLeft);
    list[r].score = Math.round(newScoreRight);

  }

  list.sort(function(a, b){
    if(a.score > b.score)
      return -1;
    if(a.score < b.score)
      return 1;
    return 0;
  })

  var left = list[Math.floor(Math.random() * list.length)];
  do{
    right = list[Math.floor(Math.random() * list.length)];
  }while(left == right);

  res.render('sort', {left, right, list});
});

module.exports = router;
