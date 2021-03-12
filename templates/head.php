<!DOCTYPE html>
<html>
	<head>
		<title>Checkmate</title>
		<link rel="preconnect" href="https://fonts.gstatic.com">
		<link href="https://fonts.googleapis.com/css2?family=Niramit:wght@300;400;700&display=swap" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="<?= ROOT ?>development/node_modules/bootstrap/dist/css/bootstrap.min.css">
		<script type="text/javascript" src="<?= ROOT ?>development/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
		<link rel="stylesheet" type="text/css" href="css/main.css">
		<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
		<script type="text/javascript">var root = <?php echo "'" . ROOT . "'" ?></script>
	</head>
<body>

<header>
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
						<a href="<?= ROOT ?>login"><li>Log In</li></a>
						<a href="<?= ROOT ?>register"><li class="register-button cm-button-yellow">Create Account</li></a>
					</ul>
					<img src="<?= ROOT ?>img/CM-MENU.png" class='menu-toggle'>
				</nav>

			</div>		
		</div>
	</div>
</header>
