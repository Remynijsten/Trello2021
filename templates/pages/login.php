<header class="header-default">
	<div class="container">
		<div class="row">
			<div class="col-4 logo-wrapper">
				<a href="<?= ROOT ?>">
					<div class="cm-logo"></div>
				</a>
			</div>	
			<div class="col-4 ms-auto align-self-center">
				<nav>
					<ul>
						<li>Log In</li>
						<a href="<?= ROOT ?>register"><li class="register-button">Create Account</li></a>
					</ul>
					<img src="<?= ROOT ?>img/CM-MENU.png" class='menu-toggle'>
				</nav>

			</div>		
		</div>
	</div>
</header>
<main>
<section class="login container">
	<div class="login-background"></div>
	<div class="row">
		<div class="align-self-center col-lg-6 col-md-12 d-flex flex-column login-column">
			<h1>Welcome back!</h1>
			<form class="user-form" data-form="login">
				<input type="email" name="email" placeholder="Email" autocomplete="off">
				<input type="password" name="password" placeholder="Password (min. 8 characters)" autocomplete="off">
				<button type="submit" class="cm-button-orange">Let's start</button>
			</form>
		</div>			
	</div>
</section>

<?php

include(ROOT . 'templates/blocks/error_modal.php');