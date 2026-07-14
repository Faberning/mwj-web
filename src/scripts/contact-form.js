(function () {
	'use strict';
	var form = document.getElementById('contactForm');
	if (!form) return;
	var note = document.getElementById('contactFormNote');
	var submitBtn = form.querySelector('button[type="submit"]');

	function showNote(kind, text) {
		note.textContent = text;
		note.className = 'form-note show ' + kind;
	}

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		var data = Object.fromEntries(new FormData(form).entries());
		data.consent = !!data.consent;
		submitBtn.disabled = true;
		fetch('/api/contact', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify(data),
		})
			.then(function (res) {
				return res.json().then(function (body) {
					return { ok: res.ok, body: body };
				});
			})
			.then(function (result) {
				if (result.ok && result.body.ok) {
					form.reset();
					showNote('ok', "Thanks — that's through to JJ. He'll be in touch shortly.");
				} else {
					showNote('err', (result.body && result.body.error) || 'Something went wrong — please try again or call directly.');
				}
			})
			.catch(function () {
				showNote('err', 'Something went wrong — please try again or call directly.');
			})
			.finally(function () {
				submitBtn.disabled = false;
			});
	});
})();
