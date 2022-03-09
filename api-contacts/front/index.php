<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="css/all.min.css" />
		<link rel="stylesheet" href="css/dashboard.css">
		<title>Admin</title>
	</head>
	<body>
		<nav class="navbar navbar-dark sticky-top bg-dark d-flex justify-content-start p-0 shadow">
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
								<a class="nav-link active" href="#"> Tableau de bord <span class="sr-only">(current)</span></a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#" id="liste-contacts">
									<i class="fas fa-list-alt"></i>
									Liste des contacts
								</a>
							</li>
							<li class="nav-item">
								<a class="nav-link" href="#" id="nv-contact">
									<i class="fas fa-plus-circle"></i>
									Nouveau contact
								</a>
						  </li>
						</ul>
					</div>
				</nav>

				<main class="col-md-9 ml-sm-auto col-lg-10 px-md-4">
					<section class="liste"></section>

					<section class="col-md-6 ajout-contact">
						<h2 class="mb-3">Ajout de contact</h2>
						<form>
							<div class="form-group">
								<label for="nom">Nom :</label>
								<input type="text" class="form-control" name="nom" id="nom" />
							</div>
							<div class="form-group">
								<label for="prenom">Prénom :</label>
								<input type="text" class="form-control" name="prenom" id="prenom" />
							</div>
							<button type="submit" class="btn btn-info ajout-contact">Ajouter</button>
							<button type="reset" class="btn btn-danger">Réinitialiser</button>
						</form>
					</section>
					
					<section class="col-md-6 modif-contact">
						<h2 class="mb-3">Modfication de contact</h2>
						<form>
							<div class="form-group">
								<label for="nom">Nom :</label>
								<input type="text" class="form-control" name="nom" id="nom" />
							</div>
							<div class="form-group">
								<label for="prenom">Prénom :</label>
								<input type="text" class="form-control" name="prenom" id="prenom" />
							</div>
							<button type="submit" class="btn btn-info maj-contact" id="">Modifier</button>
							<button type="reset" class="btn btn-danger">Réinitialiser</button>
						</form>
					</section>
				</main>
			</div>
		</div>
		<script src="js/jquery-3.5.1.min.js"></script>
		<script src="js/bootstrap.bundle.min.js"></script>
		<script src="js/all.min.js"></script>
		<script src="js/main.js"></script>
	</body>
</html>