const handleSignin = (knex, bcrypt) => (req, res) =>{
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(400).json('datos incompatibles');
	}
	knex.select('email','hash').from('login')
	.where('email', '=', email)
	.then(data =>{
		//const hash = knex.select('hash').from('login')
		const isValid = bcrypt.compareSync(password, data[0].hash);
		// console.log(password)
		// console.log(isValid)
		// isValid = true;
		//  console.log(data[0].hash)
		if (isValid) {
			return knex.select('*').from('users')
			.where('email','=',email)
			.then(user =>{
				res.json(user[0])
			}) 
			.catch(err => res.status(400).json('No se puede encontrar usuario'))
		}else{
			//console.log(req.body.password, '//', data[0].hash)
			res.status(400).json('Hay datos erroneos')
		}
		 	
	})
	//.catch(console.log(req.body.password, '//', data[0].hash));
	.catch(err => res.status(400).json('Datos erroneos'))
}

module.exports = {
	handleSignin: handleSignin
};