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
		<span class='filter-menu'>
			Filter by status <i class='fas fa-chevron-down'></i>
			<div class='filter-menu-container d-none'>
				<p data-filter="Done">Done</p>
				<p data-filter="Busy">Busy</p>
				<p data-filter="Not Started">Not Started</p>
			</div>
		</span>
		<span class='sorting-menu'>
			Sorting <i class='fas fa-chevron-down'></i>
			<div class='sorting-menu-container d-none'>
				<p data-sort="id">normal</p>
				<p data-sort="duration">duration</p>
				<p data-sort="status">status</p>
			</div>
		</span>
	</div>
	<div class='cards-section'>
		
	</div>
	<div class='create-button' data-body='cards'>Add new card +</div>
</div>
<?php 
	include(ROOT . 'templates/blocks/add-modal.php');
	include(ROOT . 'templates/blocks/update-modal.php');
?>
<script type="module" src="js/main.js"></script>