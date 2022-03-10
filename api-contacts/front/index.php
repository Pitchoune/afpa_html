<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<link rel="stylesheet" href="css/bootstrap.min.css" />
		<link rel="stylesheet" href="css/all.min.css" />
		<link rel="stylesheet" href="css/style.css" />
		<link rel="stylesheet" href="css/pagination.css" />
		<title>Admin</title>
	</head>
	<body>
		<nav class="navbar navbar-dark sticky-top d-flex justify-content-start p-0 shadow">
			<a class="navbar-brand col-md-3 col-lg-2 mr-0 px-3" href="index.php">AFPA Calais</a>
			<button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-toggle="collapse" data-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<h1 class="text-light h3 ml-5">Application de gestion des contacts</h1>
		</nav>
		<div class="container-fluid">
			<div class="row">
				<nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
					<div class="sidebar-sticky pt-3">
						<ul class="nav flex-column">
							<li class="nav-item">
								<a class="nav-link" href="#" id="accueil">
									<i class="fas fa-tachometer-alt"></i>
									Tableau de bord
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#" id="liste-contacts">
									<i class="fas fa-list-alt"></i>
									Gestion des contacts
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#" id="gestion-categories">
									<i class="fas fa-tasks"></i>
									Gestion des catégories
								</a>
							</li>
						</ul>
					</div>
				</nav>

				<main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
					<section class="accueil">
						<h2 class="mt-4">Tableau de bord</h2>
						<div class="row">
							<div class="col-md-6">
								<div class="row flex-column">
									<div class="col-md-6 mw-100">
										<div class="card border-dark mb-3">
											<div class="card-body text-dark">
												<h5 class="card-title"><i class="fas fa-user"></i> Nombre d'utilisateurs</h5>
												<p class="card-text">Vous trouverez ici le nombre d'utilisateurs existants dans la base de données.</p>
												<p class="card-text" id="nbUtilisateurs"></p>
											</div>
										</div>
									</div>
									<div class="col-md-6 mw-100">
										<div class="card border-dark mb-3">
											<div class="card-body text-dark">
												<h5 class="card-title"><i class="fas fa-chart-line"></i> Nombre de catégories</h5>
												<p class="card-text">Vous trouverez ici le nombre de catégories existantes dans la base de données.</p>
												<p class="card-text" id="nbCategories"></p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-6" style="min-height: 500px;">
							<div class="card border-dark mb-3">
								<div class="card-body text-dark">
									<h5 class="card-title"><i class="fas fa-list"></i> Liste des catégories</h5>
									<p class="card-text">Vous trouverez ici la liste de catégories dans la base de données ainsi que le nombre de fois où chacune est utilisée.</p>
									<p class="card-text" id="listeCategories"></p>
								</div>
							</div>
						  </div>
						</div>
					</section>

					<section class="liste">
						<div class="data-container"></div>
						<div id="pagination"></div>
					</section>

					<section class="col-md-6 ajout-contact">
						<h2 class="mt-4">Ajout de contact</h2>
						<form>
							<div class="form-group">
								<label for="nom">Nom :</label>
								<input type="text" class="form-control" name="nom" id="nom" />
							</div>
							<div class="form-group">
								<label for="prenom">Prénom :</label>
								<input type="text" class="form-control" name="prenom" id="prenom" />
							</div>
							<div class="form-group">
								<label for="adresse">Adresse :</label>
								<input type="text" class="form-control" name="adresse" id="adresse" />
							</div>
							<div class="form-group">
								<label for="email">Email :</label>
								<input type="text" class="form-control" name="email" id="email" />
							</div>
							<div class="form-group">
								<label for="telephone">Téléphone :</label>
								<input type="text" class="form-control" name="telephone" id="telephone" />
							</div>
							<div class="form-group">
								<label for="categorie">Catégorie :</label>
								<select class="form-control" name="categorie" id="categorie">
									<option value="Famille">Famille</option>
									<option value="Amis">Amis</option>
									<option value="Travail">Travail</option>
									<option value="Autres">Autres</option>
								</select>
							</div>
							<button type="submit" class="btn btn-primarycolor ajout-contact">Ajouter</button>
							<button type="reset" class="btn btn-outline-primarycolor">Réinitialiser</button>
						</form>
					</section>

					<section class="col-md-6 modif-contact">
						<h2 class="mt-4">Modification de contact</h2>
						<form>
							<div class="form-group">
								<label for="nom">Nom :</label>
								<input type="text" class="form-control" name="nom" id="nom" />
							</div>
							<div class="form-group">
								<label for="prenom">Prénom :</label>
								<input type="text" class="form-control" name="prenom" id="prenom" />
							</div>
							<div class="form-group">
								<label for="adresse">Adresse :</label>
								<input type="text" class="form-control" name="adresse" id="adresse" />
							</div>
							<div class="form-group">
								<label for="email">Email :</label>
								<input type="text" class="form-control" name="email" id="email" />
							</div>
							<div class="form-group">
								<label for="telephone">Téléphone :</label>
								<input type="text" class="form-control" name="telephone" id="telephone" />
							</div>
							<div class="form-group">
								<label for="categorie">Catégorie :</label>
								<select class="form-control" name="categorie" id="categorie"></select>
							</div>
							<button type="submit" class="btn btn-primarycolor maj-contact" id="" data-catid="">Modifier</button>
							<button type="reset" class="btn btn-outline-primarycolor reset-modif-contact">Réinitialiser</button>
						</form>
					</section>

					<section class="col-md-6 ajout-categorie">
						<h2 class="mt-4">Ajout de catégorie</h2>
						<form>
							<div class="form-group">
								<label for="nom">Nom :</label>
								<input type="text" class="form-control" name="nom" id="nom" />
							</div>
							<button type="submit" class="btn btn-primarycolor ajout-categorie">Ajouter</button>
							<button type="reset" class="btn btn-outline-primarycolor">Réinitialiser</button>
						</form>
					</section>

					<section class="col-md-6 modif-categorie">
						<h2 class="mt-4">Modification de catégorie</h2>
						<form>
							<div class="form-group">
								<label for="nom">Nom :</label>
								<input type="text" class="form-control" name="nom" id="nom" />
							</div>
							<div class="form-group">
								<label for="usage">Utilisation :</label>
								<input type="text" class="form-control" name="usage" id="usage" disabled />
							</div>
							<button type="submit" class="btn btn-primarycolor maj-categorie" id="">Modifier</button>
							<button type="reset" class="btn btn-outline-primarycolor reset-modif-categorie">Réinitialiser</button>
						</form>
					</section>

					<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
					  <div class="modal-dialog modal-contact">
						<div class="modal-content">
						  <div class="modal-header">
							  <div class="avatar">
								  <img src="images/avatar.png" alt="" />
							  </div>
							<h4 class="modal-title" id="titre-modal"></h4>
						  </div>
						  <div class="modal-body" id="voir-contact">
						  </div>
						</div>
					  </div>
					</div>
				</main>
			</div>
		</div>
		<script src="js/jquery-3.5.1.min.js"></script>
		<script src="js/bootstrap.bundle.min.js"></script>
		<script src="js/all.min.js"></script>
		<script src="js/main.js"></script>
		<script src="js/pagination.min.js"></script>
	</body>
</html>