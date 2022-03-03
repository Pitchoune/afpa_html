$(document).ready(function() {
	$("#helpProduct").hide();
	$("#helpMarque").hide();
	$("#helpModel").hide();
	$("#helpReference").hide();
	$("#helpSpecs").hide();
	$("#idCopy").hide();

	$(".sendForm").click(function(e) {
		e.preventDefault();
		let product = $("#idProduct").val();
		let marque = $("#idMarque").val();
		let model = $("#idModel").val();
		let reference = $("#idReference").val();
		let specs = $("#idSpecs").val();

		$("#idProduct").trigger("blur");
		$("#idMarque").trigger("blur");
		$("#idModel").trigger("blur");
		$("#idReference").trigger("blur");
		$("#idSpecs").trigger("blur");

		$("#idResultat").val(`${product} ${marque}\n${marque} ${model}\n${marque} ${reference}\n${product} ${marque} ${specs}`);
	});

	$("#idProduct").on("blur", function() {
		if (!$(this).val())
		{
			$("#helpProduct").show();
			$("#idProduct").addClass("input-error");
		}
		else
		{
			$("#helpProduct").hide();
			$("#idProduct").removeClass("input-error");
		}
	});

	$("#idMarque").on("blur", function() {
		if (!$(this).val())
		{
			$("#helpMarque").show();
			$("#idMarque").addClass("input-error");
		}
		else
		{
			$("#helpMarque").hide();
			$("#idMarque").removeClass("input-error");
		}
	});

	$("#idModel").on("blur", function() {
		if (!$(this).val())
		{
			$("#helpModel").show();
			$("#idModel").addClass("input-error");
		}
		else
		{
			$("#helpModel").hide();
			$("#idModel").removeClass("input-error");
		}
	});

	$("#idReference").on("blur", function() {
		if (!$(this).val())
		{
			$("#helpReference").show();
			$("#idReference").addClass("input-error");
		}
		else
		{
			$("#helpReference").hide();
			$("#idReference").removeClass("input-error");
		}
	});

	$("#idSpecs").on("blur", function() {
		if (!$(this).val())
		{
			$("#helpSpecs").show();
			$("#idSpecs").addClass("input-error");
		}
		else
		{
			$("#helpSpecs").hide();
			$("#idSpecs").removeClass("input-error");
		}
	});

	$("#copyContent").click(function() {
		// We are on a specific case here:
		// - There is nothing ready for jQuery to use the clipboard
		// - function execCommand() is deprecated and is replaced by navigator.clipboard
		navigator.clipboard.writeText($("#idResultat").val());
		$("#idCopy").show();
		setTimeout(function() {
			$("#idCopy").fadeOut(1500);
		}, 5000);
	});
});