$("section").hide();
tableauDeBord();
hideSection(".accueil");

// ################################################################################
// ################################## EVENEMENTS ##################################
// ################################################################################

$(document).on("click", "#accueil", function(e)
{
	e.preventDefault();
	tableauDeBord();
	hideSection(".accueil");
})

$(document).on("click", "#liste-contacts", function(e)
{
	e.preventDefault();
	listeContacts();
})

$(document).on("click", "#nv-contact", function()
{
	obtenirListeCategories();
	hideSection(".ajout-contact");
})

$(document).on("submit", ".ajout-contact form", function(e)
{
	e.preventDefault();
	ajoutContact();
});

$(document).on("click", "button.modif-contact", function()
{
	obtenirListeCategories($(this).attr("data-catid"));
	hideSection(".modif-contact");
	modifContact($(this).attr("id"));
})

$(document).on("submit", ".modif-contact form", function(e)
{
	e.preventDefault();
	majContact($(".maj-contact").attr("id"));
})

$(document).on("click", ".reset-modif-contact", function(e)
{
	e.preventDefault();
	modifContact($(".maj-contact").attr("id"));
})

$(document).on("click", ".supp-contact", function()
{
	suppContact($(this).attr("id"), $(this).attr("data-catid"));
})

$(document).on("click", ".view-contact", function(e)
{
	e.preventDefault();
	voirContact($(this).attr("id"));
})

$(document).on("click", "#gestion-categories", function(e)
{
	e.preventDefault();
	listeCategories();
})

$(document).on("click", "#nv-categorie", function()
{
	hideSection(".ajout-categorie");
})

$(document).on("submit", ".ajout-categorie form", function(e)
{
	e.preventDefault();
	ajoutCategorie();
});

$(document).on("click", "button.modif-categorie", function()
{
	hideSection(".modif-categorie");
	modifCategorie($(this).attr("id"));
})

$(document).on("submit", ".modif-categorie form", function(e)
{
	e.preventDefault();
	majCategorie($(".maj-categorie").attr("id"));
})

$(document).on("click", ".reset-modif-categorie", function(e)
{
	e.preventDefault();
	modifCategorie($(".maj-categorie").attr("id"));
})

$(document).on("click", ".supp-categorie", function()
{
	suppCategorie($(this).attr("id"));
})

// ################################################################################
// ################################# TRAITEMENTS ##################################
// ################################################################################

/**
 * Cette fonction permet d'afficher le tableau de bord au chargement général de l'application.
 *
 * return		Les statistiques de l'application.
 */
function tableauDeBord()
{
	let request = $.ajax({
		type: "GET",
		url: "http://localhost:3000/stats",
		dataType: "json",
	});

	request.done(function(response)
	{
		$("#nbUtilisateurs").html(`Il y a ${response[0].value} utilisateur${parseInt(response[0].value) === 0 ? '' : 's'}. ${parseInt(response[1].value) === 0 ? '' : `<button class="btn btn-primarycolor float-right" id="nv-contact">Ajouter un nouveau contact</button>`}`);
		$("#nbCategories").html(`Il y a ${response[1].value} catégorie${parseInt(response[1].value) === 0 ? '' : 's'}. <button class="btn btn-primarycolor float-right" id="nv-categorie">Ajouter une nouvelle catégorie</button>`);
		obtenirCategoriesStats();
		hideSection(".accueil");
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

/**
 * Cette fonction permet d'afficher la liste des contacts.
 *
 * return		La liste des contacts.
 */
function listeContacts()
{
// 	let request = $.ajax({
// 		type: "GET",
// 		url: "http://localhost:3000/contacts",
// 		dataType: "json",
// 	});
//
// 	request.done(function(response)
// 	{
// 		if (response.length === 0)
// 		{
// 			permissionsAjoutContact();
// 		}
// 		else
// 		{
// 			let html = `<h2 class="mt-4">Liste des utilisateurs</h2>
// 				<table class="table">
// 					<thead>
// 						<tr>
// 							<th scope="col">#ID</th>
// 							<th scope="col">Nom</th>
// 							<th scope="col">Prénom</th>
// 							<th scope="col">Catégorie</th>
// 							<th scope="col">Actions</th>
// 						</tr>
// 					</thead>
// 					<tbody>`;
//
// 			response.map((contact) => {
// 				html +=
// 				`<tr>
// 					<td>${contact.id}</td>
// 					<td>${contact.nom}</td>
// 					<td>${contact.prenom}</td>
// 					<td>${contact.categorie}</td>
// 					<td>
// 						<button type="button" class="btn btn-primarycolor view-contact" id="${contact.id}" data-toggle="modal" data-target="#exampleModal"><i class="far fa-address-card mx-1"></i></button>
// 						<button type="button" class="btn btn-secondarycolor modif-contact" id="${contact.id}" data-catid="${contact.catid}"><i class="fas fa-edit mx-1"></i></button>
// 						<button type="button" class="btn btn-danger supp-contact" id="${contact.id}" data-catid="${contact.catid}"><i class="fas fa-trash-alt mx-1"></i></button>
// 					</td>
// 				</tr>`;
// 			});
//
// 			html += `</tbody></table>`;
//
// 			html += `<div class="text-center"><a class="btn btn-primarycolor" href="#" id="nv-contact">Ajouter un nouveau contact</a></div>`;
//
// 			$(".listecontacts").html(html);
// 			hideSection(".listecontacts");
// 		}
// 	});
//
// 	request.fail(function(http_error)
// 	{
// 		let code = http_error.status;
// 		let code_label = http_error.statusText;
// 		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
// 		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
// 	});

	(function() {
		$('#pagination').pagination({
			dataSource: 'http://localhost:3000/contacts',
			locator: '',
			showNavigator: true,
			totalNumber: 3,
			pageSize: 2,
			className: 'paginationjs-theme-blueprimary',
			ajax: {
				beforeSend: function() {
					$('#pagination').prev().html('Loading data from db.json ...');
				}
			},
			callback: function(response, pagination) {
				if (response.length === 0)
				{
					permissionsAjoutContact();
				}
				else
				{
					let dataHtml = `<h2 class="mt-4">Liste des utilisateurs</h2>`;

					dataHtml += `<table class="table">
						<thead>
							<tr>
								<th scope="col">#ID</th>
								<th scope="col">Nom</th>
								<th scope="col">Prénom</th>
								<th scope="col">Catégorie</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>`;

					$.each(response, function (index, item) {
						dataHtml += `<tr>
							<td>${item.id}</td>
							<td>${item.nom}</td>
							<td>${item.prenom}</td>
							<td>${item.categorie}</td>
							<td>
								<button type="button" class="btn btn-primarycolor view-contact" id="${item.id}" data-toggle="modal" data-target="#exampleModal"><i class="far fa-address-card mx-1"></i></button>
								<button type="button" class="btn btn-secondarycolor modif-contact" id="${item.id}" data-catid="${item.catid}"><i class="fas fa-edit mx-1"></i></button>
								<button type="button" class="btn btn-danger supp-contact" id="${item.id}" data-catid="${item.catid}"><i class="fas fa-trash-alt mx-1"></i></button>
							</td>
						</tr>`;
					});

					dataHtml += '</tbody></table>';

					$('#pagination').show();

					$('#pagination').prev().html(dataHtml);

					$('#pagination').prev().append(`<div class="text-center"><a class="btn btn-primarycolor" href="#" id="nv-contact">Ajouter un nouveau contact</a></div>`);
				}

				hideSection(".liste");
			}
		})
	})();
}

/**
 * Cette fonction permet d'ajouter les données remplies dans le formulaire
 * d'ajout de contact. Elle met aussi à jour le nombre de contacts total.
 *
 * return		Rien. C'est la mise à jour du compteur qui
 * 				retourne la liste des contacts.
 */
function ajoutContact()
{
	let request = $.ajax({
		type: "POST",
		url: "http://localhost:3000/contacts",
		dataType: "json",
		data: {
			id: new Date().getTime(),
			nom: $("#nom").val(),
			prenom: $("#prenom").val(),
			adresse: $("#adresse").val(),
			email: $("#email").val(),
			telephone: $("#telephone").val(),
			categorie: $("#categorie option:selected").text(),
			catid: $("#categorie option:selected").attr("id")
		}
	});

	request.done(function(response)
	{
		modifCategoriesStats($("#categorie option:selected").attr("id"), 'ajouter');
		obtenirValeurStats('contacts', 'ajouter');
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

/**
 * Cette fonction permet d'afficher le formulaire de modification de contact
 * avec les données d'origine.
 *
 * param		id			Identifiant du contact
 *
 * return		Le formulaire de mise à jour du contact.
 */
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
		$(".modif-contact #adresse").val(`${response.adresse}`);
		$(".modif-contact #email").val(`${response.email}`);
		$(".modif-contact #telephone").val(`${response.telephone}`);
		$(".modif-contact #categorie").val(`${response.categorie}`);
		$(".modif-contact .maj-contact").attr("id", `${response.id}`);
		$(".modif-contact .maj-contact").attr("data-catid", `${response.catid}`);

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

/**
 * Cette fonction permet de modifier le contact par les données remplies
 * dans le formulaire de modification de contact.
 *
 * param		id			Identifiant du contact
 *
 * return		La liste des contacts. Aucune mise à jour
 * 				de compteur n'est à effectuer ici.
 */
function majContact(id)
{
	let request = $.ajax({
		type: "PUT",
		url: "http://localhost:3000/contacts/" + id,
		dataType: "json",
		data: {
			nom: $(".modif-contact #nom").val(),
			prenom: $(".modif-contact #prenom").val(),
			adresse: $(".modif-contact #adresse").val(),
			email: $(".modif-contact #email").val(),
			telephone: $(".modif-contact #telephone").val(),
			categorie: $(".modif-contact #categorie").val(),
			catid: $(".modif-contact .maj-contact").attr("data-catid")
		}
	});

	request.done(function(response)
	{
		listeContacts();
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

/**
 * Cette fonction permet de supprimer un contact.
 * Elle met aussi à jour le nombre de contacts total.
 *
 * param		id			Identifiant du contact
 * param		catid		Identifiant de la catégorie
 *
 * return		Rien. C'est la mise à jour du compteur qui
 * 				retourne la liste des contacts.
 */
function suppContact(id, catid)
{
	let request = $.ajax({
		type: "DELETE",
		url: "http://localhost:3000/contacts/" + id,
		dataType: "json",
	});

	request.done(function(response)
	{
		modifCategoriesStats(catid, 'soustraire');
		obtenirValeurStats('contacts', 'soustraire');
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

/**
 * Cette fonction permet d'afficher une boîte de dialogue avec
 * toutes les informations concernant le contact.
 *
 * param		id			Identifiant du contact
 *
 * return
 */
function voirContact(id)
{
	let request = $.ajax({
		type: "GET",
		url: "http://localhost:3000/contacts/" + id,
		dataType: "json"
	});

	request.done(function(response)
	{
		$("#titre-modal").html(`${response.nom} ${response.prenom}`);
		$("#voir-contact").html(`<h5><strong>Adresse :</strong></h5><p>${response.adresse}</p><hr /><h5><strong>Email :</strong></h5><p>${response.email}</p><hr /><h5><strong>Téléphone :</strong></h5><p>${response.telephone}</p><hr /><h5><strong>Catégorie :</strong></h5><p>${response.categorie}</p>`);
	})

	requiest.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

/**
 * Cette fonction permet d'afficher la liste des catégories.
 *
 * return		La liste des catégories.
 */
function listeCategories()
{
// 	let request = $.ajax({
// 		type: "GET",
// 		url: "http://localhost:3000/categories",
// 		dataType: "json",
// 	});
//
// 	request.done(function(response)
// 	{
// 		let html = '<h2 class="mt-4">Liste des catégories</h2>';
//
// 		if (response.length === 0)
// 		{
// 			html += `<div class="alert alert-danger mt-4" role="alert">Il n'y a aucune catégorie dans la liste. <a href="#" id="nv-categorie">Cliquez ici pour ajouter une nouvelle catégorie.</a></div>`;
// 		}
// 		else
// 		{
// 			html += `
// 				<table class="table">
// 					<thead>
// 						<tr>
// 							<th scope="col">#ID</th>
// 							<th scope="col">Categorie</th>
// 							<th scope="col">Utilisation</th>
// 							<th scope="col">Actions</th>
// 						</tr>
// 					</thead>
// 					<tbody>`;
//
// 			response.map((categorie) => {
// 				html +=
// 				`<tr>
// 					<td>${categorie.id}</td>
// 					<td>${categorie.nom}</td>
// 					<td>${categorie.usage}</td>
// 					<td>
// 						<button type="button" class="btn btn-secondarycolor modif-categorie" id="${categorie.id}"><i class="fas fa-edit mx-1"></i></button>`;
//
// 						// Autorise la suppression d'une catégorie que si il y a personne qui s'en sert.
// 						html += `<button type="button" class="btn btn-danger supp-categorie" id="${categorie.id}"${parseInt(categorie.usage) === 0 ? '' : 'disabled'}><i class="fas fa-trash-alt mx-1"></i></button>`;
//
// 					html += `</td>
// 				</tr>`;
// 			});
//
// 			html += `</tbody></table>`;
// 			html += `<div class="text-center"><a class="btn btn-primarycolor" href="#" id="nv-categorie">Ajouter une nouvelle catégorie</a></div>`;
// 		}
//
// 		$(".liste").html(html);
// 		hideSection(".liste");
// 	});
//
// 	request.fail(function(http_error)
// 	{
// 		let code = http_error.status;
// 		let code_label = http_error.statusText;
// 		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
// 		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
// 	});
	(function() {
		$('#pagination').pagination({
			dataSource: 'http://localhost:3000/categories',
			locator: '',
			showNavigator: true,
			totalNumber: 3,
			pageSize: 2,
			className: 'paginationjs-theme-blueprimary',
			ajax: {
				beforeSend: function() {
					$('#pagination').prev().html('Loading data from db.json ...');
				}
			},
			callback: function(response, pagination) {
				let dataHtml = `<h2 class="mt-4">Liste des catégories</h2>`;


				if (response.length === 0)
				{
					dataHtml += `<div class="alert alert-danger mt-4" role="alert">Il n'y a aucune catégorie dans la liste. <a href="#" id="nv-categorie">Cliquez ici pour ajouter une nouvelle catégorie.</a></div>`;
					$('#pagination').prev().html(dataHtml);
					$('#pagination').hide();
				}
				else
				{
					dataHtml += `<table class="table">
						<thead>
							<tr>
								<th scope="col">#ID</th>
								<th scope="col">Catégorie</th>
								<th scope="col">Utilisation</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>`;

					$.each(response, function (index, item) {
						dataHtml += `<tr>
							<td>${item.id}</td>
							<td>${item.nom}</td>
							<td>${item.usage}</td>
							<td>
								<button type="button" class="btn btn-secondarycolor modif-categorie" id="${item.id}"><i class="fas fa-edit mx-1"></i></button>`;

								// Autorise la suppression d'une catégorie que si il y a personne qui s'en sert.
								dataHtml += `<button type="button" class="btn btn-danger supp-categorie" id="${item.id}"${parseInt(item.usage) === 0 ? '' : 'disabled'}><i class="fas fa-trash-alt mx-1"></i></button>`;

							dataHtml += `</td>
						</tr>`;
					});

					dataHtml += '</tbody></table>';

					$('#pagination').show();

					$('#pagination').prev().html(dataHtml);

					$('#pagination').prev().append(`<div class="text-center"><a class="btn btn-primarycolor" href="#" id="nv-categorie">Ajouter une nouvelle catégorie</a></div>`);
				}
				hideSection(".liste");
			}
		})
	})();
}

/**
 * Cette fonction permet d'ajouter les données remplies dans le formulaire
 * d'ajout de catégorie. Elle met aussi à jour le nombre de catégories total.
 *
 * return		Rien. C'est la mise à jour du compteur qui
 * 				retourne la liste des catégories.
 */
function ajoutCategorie()
{
	let request = $.ajax({
		type: "POST",
		url: "http://localhost:3000/categories",
		dataType: "json",
		data: {
			id: new Date().getTime(),
			nom: $(".ajout-categorie #nom").val(),
			usage: 0
		}
	});

	request.done(function(response)
	{
		obtenirValeurStats('categories', 'ajouter');
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

/**
 * Cette fonction permet d'afficher le formulaire de modification de catégorie
 * avec les données d'origine.
 *
 * param		id			Identifiant de la catégorie
 *
 * return		Le formulaire de mise à jour de la catégorie.
 */
function modifCategorie(id)
{
	let request = $.ajax({
		type: "GET",
		url: "http://localhost:3000/categories/" + id,
		dataType: "json",
	});

	request.done(function(response)
	{
		$(".modif-categorie #nom").val(`${response.nom}`);
		$(".modif-categorie #usage").val(`${response.usage}`);
		$(".modif-categorie .maj-categorie").attr("id", `${response.id}`);

		hideSection(".modif-categorie");
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

/**
 * Cette fonction permet de modifier la catégorie par les données remplies
 * dans le formulaire de modification de catégorie.
 *
 * param		id			Identifiant de la catégorie
 *
 * return		La liste des catégories. Aucune mise à jour
 * 				de compteur n'est à effectuer ici.
 */
function majCategorie(id)
{
	let request = $.ajax({
		type: "PUT",
		url: "http://localhost:3000/categories/" + id,
		dataType: "json",
		data: {
			nom: $(".modif-categorie #nom").val(),
			usage: $(".modif-categorie #usage").val()
		}
	});

	request.done(function(response)
	{
		listeCategories();
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

/**
 * Cette fonction permet de supprimer une catégorie uniquement si aucun
 * contact ne s'en sert. Elle met aussi à jour le nombre de contacts total.
 *
 * param		id			Identifiant de la catégorie
 *
 * return		Rien. C'est la mise à jour du compteur qui
 * 				retourne la liste des catégories.
 */
function suppCategorie(id)
{
	let request = $.ajax({
		type: "DELETE",
		url: "http://localhost:3000/categories/" + id,
		dataType: "json",
	});

	request.done(function(response)
	{
		obtenirValeurStats('categories', 'soustraire');
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

/**
 * Cette fonction permet de créer une liste d'options
 * contenant toutes les catégories de l'application.
 *
 * param		id			Identifiant de la catégorie
 *
 * return		Toutes les options pour la balise HTML <select>.
 */
function obtenirListeCategories(id = '')
{
	let request = $.ajax({
		type: "GET",
		url: "http://localhost:3000/categories",
		dataType: "json"
	});

	request.done(function(response)
	{
		let html = `<select class="form-control" name="categorie" id="categorie">`;

		response.map((categorie) => {
			html += `<option value="${categorie.nom}" id="${categorie.id}"${(id === categorie.id ? ' selected' : '')}>${categorie.nom}</option>`;
		});

		html += `</select>`;

		$("select#categorie").html(html);
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

// ################################################################################
// ################################# PERMISSIONS ##################################
// ################################################################################

/**
 * Cette fonction permet d'autoriser l'ajout d'un contact uniquement si une catégorie existe déjà.
 *
 * return		Ajoute dans le HTML le bloc de code correspondant en fonction
 * 				du nombre de catégories global dans la liste des contacts.
 */
function permissionsAjoutContact()
{
	let request = $.ajax({
		type: "GET",
		url: "http://localhost:3000/stats/nombrecategories",
		dataType: "json",
		async: false
	});

	request.done(function(response)
	{
		if (response.value == 0)
		{
			$('#pagination').prev().html(`<h2 class="mt-4">Liste des utilisateurs</h2><div class="alert alert-danger mt-4" role="alert">Il n'y a aucun contact dans la liste. Avant de pouvoir ajouter un nouveau contact, vous devez ajouter au minimum une catégorie. <a href="#" id="nv-categorie">Cliquez ici pour ajouter une  nouvelle catégorie.</a></div>`);
			$('#pagination').hide();
		}
		else
		{
			$('#pagination').prev().html(`<h2 class="mt-4">Liste des utilisateurs</h2><div class="alert alert-danger mt-4" role="alert">Il n'y a aucun contact dans la liste. <a href="#" id="nv-contact">Cliquez ici pour ajouter un nouveau contact.</a></div>`);
			$('#pagination').hide();
		}

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

// ################################################################################
// ############################## FONCTIONS COMMUNES ##############################
// ################################################################################

/**
 * Cette fonction permet d'obtenir les statistiques d'utilisation globale des catégories.
 *
 * return		Ajoute dans le HTML le bloc de code correspondant en fonction
 * 				du nombre de catégories ainsi que leur utilisation par catégorie.
 */
function obtenirCategoriesStats()
{
	let request = $.ajax({
		type: "GET",
		url: "http://localhost:3000/categories/",
		dataType: "json",
	});

	request.done(function(response)
	{
		let html = "";

		if (response.length === 0)
		{
			html += `<div class="alert alert-danger mt-4" role="alert">Il n'y a aucune catégorie dans la liste. <a href="#" id="nv-categorie">Cliquez ici pour ajouter une nouvelle catégorie.</a></div>`;
		}
		else
		{
			response.map((categorie) => {
				html += `<button type="button" class="btn btn-secondarycolor my-2">${categorie.nom} <span class="badge badge-light">${categorie.usage}</span></button><br />`;
			});
		}

		$("#listeCategories").html(html);
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

/**
 * Cette fonction permet de définir si on incrémente ou décrémente
 * le nombre de fois où une catégorie donnée est utilisée.
 *
 * param		id			Identifiant de la catégorie
 * param		type		Action à effectuer - 'ajouter' ou 'soustraire'.
 *
 * return		Met à jour les statistiques de la catégorie donnée
 *				et applique +1 ou -1 en fonction du type.
 */
function modifCategoriesStats(id, type)
{
	let request = $.ajax({
		type: "GET",
		url: "http://localhost:3000/categories/" + id,
		dataType: "json",
	});

	request.done(function(response)
	{
		// On a les valeurs dans response, on doit mettre à jour usage pour faire +1 ou -1 en fonction d'ajout ou de suppression
		if (type === 'ajouter')
		{
			majCategoriesStats(response.id, response.nom, parseInt(response.usage) + 1);
		}
		else if (type === 'soustraire')
		{
			majCategoriesStats(response.id, response.nom, parseInt(response.usage) - 1);
		}
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

/**
 * Cette fonction permet de mettre à jour le nombre d'utilisation
 * de la catégorie donnée en fonction de plusieurs paramètres.
 *
 * param		id			Identifiant de la catégorie
 * param		nom			Intitulé de la catégorie
 * param		valeur		Nombre d'utilisation à mettre à jour
 *
 * return		Rien, l'action est faite dans une autre fonction dédiée.
 */
function majCategoriesStats(id, nom, valeur)
{
	let request = $.ajax({
		type: "PUT",
		url: "http://localhost:3000/categories/" + id,
		dataType: "json",
		data: {
			usage: valeur,
			nom: nom
		}
	});

	request.done(function(response)
	{
		// Ne rien faire - les fonctions de mises à jour des stats font déjà la redirection
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

/**
 * Cette fonction permet d'obtenir la quantité d'une donnée spécifique
 * et d'appliquer une action dessus.
 *
 * param		propriete	Identifiant partiel de la statistique
 * param		type		Action à effectuer - 'ajouter' ou 'soustraire'
 *
 * return		Met à jour le nombre de fois où est utilisé la propriété spécifique.
 */
function obtenirValeurStats(propriete, type)
{
	let request = $.ajax({
		type: "GET",
		url: "http://localhost:3000/stats/nombre" + propriete,
		dataType: "json",
	});

	request.done(function(response)
	{
		if (type === 'ajouter')
		{
			majValeurStats(response.id, parseInt(response.value) + 1);
		}
		else if (type === 'soustraire')
		{
			majValeurStats(response.id, parseInt(response.value) - 1);
		}
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

/**
 * Cette fonction permet de mettre à jour le nombre
 * d'utilisation de la propriété spécifiée.
 *
 * param		propriete	Identifiant complet de la propriété à mettre à jour
 * param		valeur		Valeur de la propriété à mettre à jour
 *
 * return		Affiche la liste de la propriété spécifiée
 */
function majValeurStats(propriete, valeur)
{
	let request = $.ajax({
		type: "PUT",
		url: "http://localhost:3000/stats/" + propriete,
		dataType: "json",
		data: {
			value: `${valeur}`
		}
	});

	request.done(function(response)
	{
		if (propriete === 'nombrecontacts')
		{
			listeContacts();
		}
		else if (propriete === 'nombrecategories')
		{
			listeCategories();
		}
	});

	request.fail(function(http_error)
	{
		let code = http_error.status;
		let code_label = http_error.statusText;
		let server_msg = (code === 404 ? "Page non trouvé" : http_error.responseText);
		alert("Erreur " + code + " (" + code_label + ") : " + server_msg);
	});
}

/**
 * Cette fonction permet de cacher toutes les sections
 * et d'afficher que la section spécifiée.
 *
 * param		section		Identifiant CSS de la section à afficher
 *
 * return		Rien, agit directement sur le DOM
 */
function hideSection(section)
{
	$("section").hide();
	$(`${section}`).show();
}
