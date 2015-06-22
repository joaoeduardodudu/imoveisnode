module.exports = function(app) 
{
	var Imovel = app.models.imoveis;
	var ImoveisController = 
	{
	  	index: function(req, res)
	 	{
	 		Imovel.find(function(err,data)
	 		{
	 			if(err)
	 			{
	 				 console.log('Erro: '+err+' ao listar na index!');
	 			}
	 			res.render('imoveis/index', {lista: data});
	 		});
			
		},
		create: function(req,res)
		{
			res.render("imoveis/create");
		},
		insert: function(req, res)
		{
			var model = new Imovel(req.body);
			model.save(function(err)
			{
				if(err)
				{
					console.log(err);
				}
				req.flash('info','Imovel cadastrado com sucesso!');
				res.redirect('/imoveis');
			});
		},
		edit: function(req, res)
		{
			Imovel.findById(req.params.id, function(err, data)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					res.render('imoveis/edit',{value: data});
				}
			});
		},
		update: function(req, res)
		{
			Imovel.findById(req.params.id, function(err, data)
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
							req.flash('info','Imovel alterado com sucesso!');
							res.redirect('/imoveis');
						}
					});
				}
			});
		},
		remove: function(req, res)
		{
			Imovel.remove({_id: req.params.id}, function(err)
			{
				if(err)
				{
					console.log(err);
				}
				else
				{
					req.flash('info','Imovel excluído com sucesso!');
					res.redirect('/imoveis');
				}
			});
		}
	}
		
	return ImoveisController;
};