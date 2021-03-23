	</main>
	<footer>
		<div class="container">
		Copyright 2021 Checkmate	
		</div>
	</footer>
	<script src="https://kit.fontawesome.com/970adb2e15.js" crossorigin="anonymous"></script>
	<script type="text/javascript">
		$$('.modal_body_close').forEach(closebtn => closebtn.on('click', () => {

			let modal = closebtn.closest('.modal');

			modal.classList.remove('d-flex');
			modal.classList.remove('d-block');
			modal.classList.add('d-none');
		}));
	</script>
</body>
</html>