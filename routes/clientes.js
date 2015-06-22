module.exports = function(app) 
{
	var alunos = app.controllers.alunos;
	app.get('/clientes', clientes.index);
	app.get('/clientes/create', clientes.create);
	app.get('/clientes/delete/:id',clientes.remove);
	app.get('/clientes/edit/:id', clientes.edit);


	app.post('/clientes',clientes.insert);
	app.post('/clientes/edit/:id',clientes.update);
	//app.post('/clientes/delete/:id',clientes.remove);
}
