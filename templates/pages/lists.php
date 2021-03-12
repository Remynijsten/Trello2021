<?php
// If the user is not logged in, render the home page.

if(!$_SESSION['login']){
	header("Location:" . ROOT . "home");
	die();
}

?>
<div class="main">
	<div class="title">
		<h1>My Lists</h1>
		<span>Sort By <i class="fas fa-chevron-down"></i></span>
	</div>	
	<div class="lists-container">
		<div class="lists-container-item">
			<i class="fas fa-bars"></i>
			<h2 class="lists-container-item-title">Groceries</h2>
			<div class="lists-container-item-controls">
				<i class="fas fa-ellipsis-h"></i>
				<span class="lists-container-item-controls-color"></span>
			</div>
		</div>
	</div>
</div>
