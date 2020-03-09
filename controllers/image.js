const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'f06df6502536417ba390e8ea52766b5c'
});

const handleApiCall = (req,res) => {
	app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => err.status(400).json('La API no funciona'))
}


const handleImage = (req, res, knex)=>{
	const { id } = req.body;
	knex('users').where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries=>{
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('No hay entradas'))
}

module.exports = {
	handleImage,
	handleApiCall
}