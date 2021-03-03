<header class="<?php if($route == '/register'){ echo 'header-default'; }else{ echo 'header-home'; } ?>">
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