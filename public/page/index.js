
let el = document.getElementById('j_login');
el.addEventListener('click', function (e) {
	var modal = new App.LoginModal({
		title: '',
		mask: true,
	});

	modal.show();
});

