<main>
<section class="register container">
	<div class="register-background"></div>
	<div class="row">
		<div class="align-self-center col-lg-6 col-md-12 d-flex flex-column register-column">
			<h1>Create a free account</h1>
			<form class="user-form" data-form="register">
				<input type="text" name="name" placeholder="Name" autocomplete="off">
				<input type="email" name="email" placeholder="Email" autocomplete="off">
				<input type="password" name="password" placeholder="Password (min. 8 characters)" autocomplete="off">
				<button type="submit" class="cm-button-yellow">Let's start</button>
			</form>
		</div>			
	</div>
</section>

<?php

include(ROOT . 'templates/blocks/error_modal.php');