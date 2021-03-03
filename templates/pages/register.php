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
<section class="register container">
	<div class="register-background"></div>
	<div class="row">
		<div class="col-lg-6 col-md-12">
			<img src="<?= ROOT ?>img/CM-VECTOR.png">
		</div>
		
		<div class="align-self-center col-lg-6 col-md-12 d-flex flex-column register-column">
			<h1>Create a free account</h1>
			<form class="register-form">
				<input type="text" name="name" placeholder="Name" autocomplete="off">
				<input type="email" name="email" placeholder="Email" autocomplete="off">
				<input type="password" name="password" placeholder="Password (min. 8 characters)" autocomplete="off">
				<button type="submit" class="cm-button-orange">Let's start</button>
			</form>
		</div>			
	</div>
</section>