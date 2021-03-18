<?php
// If the user is not logged in, render the home page.

if(!$_SESSION['login']){
	header('Location:' . ROOT . 'home');
	exit();
}

?>

<script type='text/javascript'>var list_id = <?= $_GET['list'] ?></script>
<div class='main'>
	<div class="title">
		<h1>My Cards</h1>
		<span class='sorting-menu '>
			Sorting <i class='fas fa-chevron-down'></i>
			<div class='sorting-menu-container d-none'>
				<p data-sort="id">normal</p>
				<p data-sort="duration">duration</p>
				<p data-sort="color">color</p>
			</div>
		</span>
	</div>
	<div class='cards-section'>
	<div class='add_card'>Add new card +</div>
	</div>
</div>
<?php 
include(ROOT . 'templates/blocks/add-card-modal.php');
include(ROOT . 'templates/blocks/update-card-modal.php');
?>
<script type="text/javascript" src="<?= './js/task_controller.js' ?>"></script>
<script type="text/javascript" src="<?= './js/card_controller.js' ?>"></script>