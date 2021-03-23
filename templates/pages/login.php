<?php 
// If the user is logged in, redirect to lists
if($_SESSION['login']){
	header("Location:" . ROOT . "lists");
	exit();
}
?>

<main>
<section class="login container">
	<div class="login-background"></div>
	<div class="row">
		<div class="align-self-center col-lg-6 col-md-12 d-flex flex-column login-column">
			<h1>Welcome back!</h1>
			<form class="user-form" data-form="login">
				<input type="email" name="mail" placeholder="Email" autocomplete="off">
				<input type="password" name="password" placeholder="Password (min. 8 characters)" autocomplete="off">
				<button type="submit" class="cm-button-yellow">Let's start</button>
			</form>
		</div>			
	</div>
</section>
<?php
include(ROOT . 'templates/blocks/error-modal.php');
?>
<script type="text/javascript" src="<?= './js/user_controller.js' ?>"></script>