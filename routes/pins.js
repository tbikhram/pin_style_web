var path = require('path');
var Pin = require('../models/pin')


module.exports = function(app){
	app.route('/pins/create')
	.get(function(req,res,next){
		res.render('pins/create');
	})
	.post(function(req,res,next){

		var pin = new Pin();
		pin.title = req.body.title;
		pin.desc = req.body.desc;
		pin.username = req.body.username;
		pin.isSave = false;

		if(!req.files)
			return json('error');

		let sampleFile = req.files.sampleFile;
		let fileName = Math.random().toString(26).slice(2)+ '.jpg';
		let path = './public/Files/' + fileName;
		pin.path = '/Files/' + fileName;

		sampleFile.mv(path, function(err){
			if(err)
				return res.status(500).send(err);
		})
		//saving pin to the data base 
		pin.save(function(err){
			if(err) throw err;
			// when pins are saved render on index page(pinlist page)
			res.redirect('/pins/index')
		})
	})
	// route so pins can redirecct to pins/index page
		app.get('/pins/index', function(req,res,next){
			Pin.find({}, function(err, pins){
				res.render('pins/index', {pins: pins})
			})
		})
			app.get('/pins/delete/:id', function(req,res,next){
			Pin.find({_id: req.params.id}).remove().exec(function(err, foundPin){
				res.redirect('/pins/index')
			})
		})
}