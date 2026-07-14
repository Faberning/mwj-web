(function () {
	'use strict';
	var st = { loan: 700000, rate: 6.49, term: 30, freq: 'monthly' };
	var PER = { weekly: 52, fortnightly: 26, monthly: 12 },
		LAB = { weekly: 'per week', fortnightly: 'per fortnight', monthly: 'per month' };
	var $ = function (id) {
		return document.getElementById(id);
	};
	if (!$('loan')) return;

	function money(a) {
		return !isFinite(a) || isNaN(a) ? '$0' : '$' + Math.round(a).toLocaleString('en-NZ');
	}
	function pay(P, ar, ppy, ty) {
		if (P <= 0 || ty <= 0) return 0;
		var n = ppy * ty,
			r = ar / 100 / ppy;
		return r === 0 ? P / n : (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
	}
	function render() {
		var ppy = PER[st.freq],
			p = pay(st.loan, st.rate, ppy, st.term),
			n = ppy * st.term,
			tot = p * n;
		$('rAmt').textContent = money(p);
		$('rPer').textContent = LAB[st.freq];
		$('rLoan').textContent = money(st.loan);
		$('rTot').textContent = money(tot);
		$('rInt').textContent = money(tot - st.loan);
	}
	function num(v, f) {
		var n = parseFloat(v);
		return isNaN(n) || n < 0 ? f : n;
	}
	$('loan').addEventListener('input', function () {
		st.loan = num(this.value, 0);
		render();
	});
	$('rate').addEventListener('input', function () {
		st.rate = num(this.value, 0);
		render();
	});
	function pillGroup(id, key, fn) {
		var g = $(id),
			ps = g.querySelectorAll('.pill');
		ps.forEach(function (b) {
			b.addEventListener('click', function () {
				ps.forEach(function (x) {
					x.classList.remove('active');
				});
				b.classList.add('active');
				st[key] = fn(b);
				render();
			});
		});
	}
	pillGroup('term', 'term', function (b) {
		return parseInt(b.dataset.t, 10);
	});
	pillGroup('freq', 'freq', function (b) {
		return b.dataset.f;
	});
	render();
})();
