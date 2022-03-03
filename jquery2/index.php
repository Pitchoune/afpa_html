<!doctype html>
<html lang="fr">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, shrink-to-fit=no">
	<link rel="stylesheet" href="css/bootstrap.min.css" />
	<link rel="stylesheet" href="css/styles.css" />
	<title>Cours jQuery</title>
</head>
<body>
	<form method="post" action="#" class="container pt-5">
		<div class="container d-flex">
			<div class="col-6">
				<div class="form-group">
					<label for="idProduct">Produit</label>
					<input type="text" class="form-control" id="idProduct" required>
					<small id="helpProduct" class="text-danger">Le champ « Produit » est obligatoire.</small>
				</div>
				<div class="form-group">
					<label for="idMarque">Marque</label>
					<input type="text" class="form-control" id="idMarque" required>
					<small id="helpMarque" class="text-danger">Le champ « Marque » est obligatoire.</small>
				</div>
				<div class="form-group">
					<label for="idModel">Modèle</label>
					<input type="text" class="form-control" id="idModel" required>
					<small id="helpModel" class="text-danger">Le champ « Modèle » est obligatoire.</small>
				</div>
				<div class="form-group">
					<label for="idReference">Référence</label>
					<input type="text" class="form-control" id="idReference" required>
					<small id="helpReference" class="text-danger">Le champ « Référence » est obligatoire.</small>
				</div>
				<div class="form-group">
					<label for="idSpecs">Spécifications</label>
					<input type="text" class="form-control" id="idSpecs" required>
					<small id="helpSpecs" class="text-danger">Le champ « Spécifications » est obligatoire.</small>
				</div>
				<button type="submit" class="btn btn-primary sendForm">Envoyer</button> <button type="reset" class="btn btn-primary">Réinitialiser</button> <button type="button" class="btn btn-primary" id="copyContent">Copier</button> <normal id="idCopy">&nbsp;Copié !</normal>
			</div>
			<div class="col-6">
				<div class="form-group">
					<textarea class="form-control" disabled placeholder="Remplissez le formulaire pour remplir ce champ de texte." rows="20" id="idResultat"></textarea>
				</div>
			</div>
		</div>
	</form>

	<script src="js/jquery-3.5.1.min.js"></script>
	<script src="js/bootstrap.bundle.min.js"></script>
	<script src="js/main.js"></script>
</body>
</html>