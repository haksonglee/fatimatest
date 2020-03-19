const router = require('express').Router();

let drname;
let deptname;
let yedate;

router.post('/', function(req, res) {
  //let params = req.body.action.params
  drname = '신주화'

  let drlist_script = require('./call_drlist');
  let drlist_bodydata = JSON.stringify(drlist_script.call_drlist(deptname, drname, yedate, 'dept'));

  res.status(200).send(drlist_bodydata);
});

module.exports = router;
