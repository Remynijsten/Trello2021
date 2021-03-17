<?php
// If the user is not logged in, render the home page.

if(!$_SESSION['login']){
	header("Location:" . ROOT . "home");
	exit();
}

?>

<script type="text/javascript">var list_id = <?= $_GET['list'] ?></script>
<div class="main">
	<div class="title">
		<h1>My Cards</h1>
		<span>Sort By <i class="fas fa-chevron-down"></i></span>
	</div>
	<div class="cards-section">
	<div class="add_card">Add new card +</div>
	</div>
</div>
<script type="text/javascript" src="<?= './js/task_controller.js' ?>"></script>
<script type="text/javascript" src="<?= './js/card_controller.js' ?>"></script>