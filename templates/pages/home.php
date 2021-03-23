<?php 
// If the user is logged in, redirect to lists
if(isset($_SESSION['login'])){
	if($_SESSION['login']){
		header("Location:" . ROOT . "lists");
		exit();
	}	
}
?>

<section class="home container d-flex justify-content-center">
	<div class="row">
		<div class="col-lg-6 col-md-12 align-self-center">
			<img src="<?= ROOT . 'img/CM-CHECK-FADE.png' ?>" class="check-fade">
			<h1>One check at a time</h1>
			<h2>The number one checklist for your chores</h2>
			<div class="button-wrapper">
				<a href="">Read More</a>
				<a href="">Start Today</a>
			</div>
		</div>	
		<div class="col-lg-6 col-md-12 align-self-center">
			<img src="<?= ROOT ?>img/CM-VECTOR-PENCIL.png">
		</div>			
	</div>
</section>
<main>