module.exports = function(app) 
{
	var alunos = app.controllers.alunos;
	app.get('/imoveis', imoveis.index);
	app.get('/imoveis/create', imoveis.create);
	app.get('/imoveis/delete/:id',imoveis.remove);
	app.get('/imoveis/edit/:id', imoveis.edit);


	app.post('/imoveis',imoveis.insert);
	app.post('/imoveis/edit/:id',imoveis.update);
	//app.post('/alunos/delete/:id',alunos.remove);
}
