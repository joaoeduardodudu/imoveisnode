module.exports = function(app) 
{
	var Cliente = app.models.clientes;
	var ClientesController = 
	{
	  	index: function(req, res)
	 	{
	 		Cliente.find(function(err,data)
	 		{
	 			if(err)
	 			{
	 				 console.log('Erro: '+err+' ao listar na index!');
	 			}
	 			res.render('/clientes/index', {lista: data});
	 		});
			
		},
		create: function(req,res)
		{
			res.render("/clientes/create");
		},
		insert: function(req, res)
		{
			var model = new Cliente(req.body);
			model.save(function(err)
			{
				if(err)
				{
					console.log(err);
				}
				req.flash('info','Cliente cadastrado com sucesso!');
				res.redirect('/clientes');
			});
		},
		edit: function(req, res)
		{
			Cliente.findById(req.params.id, function(err, data)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					res.render('clientes/edit',{value: data});
				}
			});
		},
		update: function(req, res)
		{
			Cliente.findById(req.params.id, function(err, data)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					var model = data;
					model.rua = req.body.rua;
					model.bairro = req.body.bairro;
					model.numero = req.body.numero;
					model.cidade = req.body.cidade;
					model.valor = req.body.valor;
					model.save(function(err)
					{
						if(err)
						{
							console.log(err);
						}
						else
						{
							req.flash('info','Cliente alterado com sucesso!');
							res.redirect('/clientes');
						}
					});
				}
			});
		},
		remove: function(req, res)
		{
			Cliente.remove({_id: req.params.id}, function(err)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					req.flash('info','Cliente excluído com sucesso!');
					res.redirect('/clientes');
				}
			});
		}
	}
		
	return ClientesController;
};