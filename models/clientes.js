module.exports = function()
{
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var ClienteSchema =  new Schema(
	{
		nome:String,
		email: String,
		telefone:String,
		rua:String,
		bairro:String,
		numero:Number,
		cidade:String
	});
	return mongoose.model('Clientes', ClienteSchema);
}


