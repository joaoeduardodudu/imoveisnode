module.exports = function()
{
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var ImovelSchema =  new Schema(
	{
		rua:String,
		data_cadastro: {type: Date, default: Date.now},
		bairro: String,
		numero:String,
		cidade:String,
		valor:double
	});
	return mongoose.model('Imoveis', ImovelSchema);
}


