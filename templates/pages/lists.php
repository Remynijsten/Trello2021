<?php
// If the user is not logged in, render the home page.

if(!$_SESSION['login']){
	header("Location:" . ROOT . "home");
	exit();
}

?>
<div class="main">
	<div class="title">
		<h1>My Lists</h1>
	</div>
	<div class="lists-section"></div>
	<div class="add_list">Add new list +</div>
</div>

<?php
include(ROOT . 'templates/blocks/add-list-modal.php');
include(ROOT . 'templates/blocks/update-list-modal.php');