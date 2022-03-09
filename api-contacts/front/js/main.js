$("section").hide();

$(document).on("click", "#liste-contacts", function(e)
{
	e.preventDefault();
	liste();
})

$(document).on("click", "#nv-contact", function()
{
	hideSection(".ajout-contact");
})

$(document).on("submit", ".ajout-contact form", function(e)
{
	e.preventDefault();
	ajoutContact();
});

$(document).on("click", "button.modif-contact", function()
{
	hideSection(".modif-contact");
	modifContact($(this).attr("id"));
})

$(document).on("submit", ".modif-contact form", function(e)
{
	e.preventDefault();
	majContact($(".maj-contact").attr("id"));
})

$(document).on("click", ".supp-contact", function()
{
	suppContact($(this).attr("id"));
})

function liste()
{
	let request = $.ajax({
		type: "GET",
		url: "http://localhost:3000/contacts",
		dataType: "json",
	});

	request.done(function(response)
	{
		let html = '';

		if (response.length === 0)
		{
			html = `<div class="alert alter-warning" role="alert">Aucun contact n'existe dans la liste.</div>`;
		}
		else
		{
			html += `<h2 class="mt-4">Liste des utilisateurs</h2>`;
			html += `
				<table class="table">
					<thead>
						<tr>
							<th scope="col">#ID</th>
							<th scope="col">Nom</th>
							<th scope="col">Prénom</th>
							<th scope="col">Actions</th>
						</tr>
					</thead>
					<tbody>`;

			response.map((contact) =>{ html += `<tr><td>${contact.id}</td><td>${contact.nom}</td><td>${contact.prenom}</td><td><button type="button" class="btn btn-info modif-contact" id="${contact.id}"><i class="fas fa-edit mx-1"></i>Modifier</button> <button type="button" class="btn btn-danger supp-contact" id="${contact.id}"><i class="fas fa-trash-alt mx-1"></i>Supprimer</button></td></tr>`; });

			html += `</tbody></table>`;
		}
		$(".liste").html(html);
		hideSection(".liste");
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

function ajoutContact()
{
	let request = $.ajax({
		type: "POST",
		url: "http://localhost:3000/contacts",
		dataType: "json",
		data: {
			id: new Date().getTime(),
			nom: $("#nom").val(),
			prenom: $("#prenom").val()
		}
	});

	request.done(function(response)
	{
		liste();
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

function modifContact(id)
{
	let request = $.ajax({
		type: "GET",
		url: "http://localhost:3000/contacts/" + id,
		dataType: "json",
	});

	request.done(function(response)
	{
		$(".modif-contact #nom").val(`${response.nom}`);
		$(".modif-contact #prenom").val(`${response.prenom}`);
		$(".modif-contact .maj-contact").attr("id", `${response.id}`);

		hideSection(".modif-contact");
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

function majContact(id)
{
	let request = $.ajax({
		type: "PUT",
		url: "http://localhost:3000/contacts/" + id,
		dataType: "json",
		data: {
			nom: $(".modif-contact #nom").val(),
			prenom: $(".modif-contact #prenom").val()
		}
	});

	request.done(function(response)
	{
		liste();
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

function suppContact(id)
{
	let request = $.ajax({
		type: "DELETE",
		url: "http://localhost:3000/contacts/" + id,
		dataType: "json",
	});
	
	request.done(function(response)
	{
		liste();
	});
	
	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

function hideSection(section)
{
	$("section").hide();
	$(`${section}`).show();
}

/*
ajouter les champs :

- adresse
- email
- tel
- categorie
-- famille
-- amis
-- travail
-- autres
*/