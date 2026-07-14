(function () {
	'use strict';
	var form = document.getElementById('guideForm');
	if (!form) return;
	var note = document.getElementById('guideFormNote');
	var submitBtn = form.querySelector('button[type="submit"]');
	var downloadUrl = form.dataset.pdf;

	function showNote(kind, text) {
		note.textContent = text;
		note.className = 'form-note show ' + kind;
	}

	form.addEventListener('submit', function (e) {
		e.preventDefault();
		var data = Object.fromEntries(new FormData(form).entries());
		submitBtn.disabled = true;
		fetch('/api/guide-request', {
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
					showNote('ok', 'Thanks — your download is starting now.');
					var link = document.createElement('a');
					link.href = downloadUrl;
					link.download = '';
					document.body.appendChild(link);
					link.click();
					link.remove();
				} else {
					showNote('err', (result.body && result.body.error) || 'Something went wrong — please try again.');
				}
			})
			.catch(function () {
				showNote('err', 'Something went wrong — please try again.');
			})
			.finally(function () {
				submitBtn.disabled = false;
			});
	});
})();
