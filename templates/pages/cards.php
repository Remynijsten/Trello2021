<?php
// If the user is not logged in, render the home page.

if(!$_SESSION['login']){
	header("Location:" . ROOT . "home");
	exit();
}

?>
<div class="main">
	<div class="title">
		<h1>My Cards</h1>
		<span>Sort By <i class="fas fa-chevron-down"></i></span>
	</div>
	<div class="cards-section"></div>
	<div class="add_task">Add new task +</div>
</div>