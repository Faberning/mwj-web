(function () {
	'use strict';
	var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* ---- calculator ---- */
	var st = { loan: 700000, rate: 6.49, term: 30, freq: 'monthly' };
	var PER = { weekly: 52, fortnightly: 26, monthly: 12 },
		LAB = { weekly: 'per week', fortnightly: 'per fortnight', monthly: 'per month' };
	var $ = function (id) {
		return document.getElementById(id);
	};
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

	/* ---- video facade: load YouTube only on click/keyboard ---- */
	var facade = document.getElementById('ytFacade');
	if (facade) {
		var loadYT = function () {
			var f = document.createElement('iframe');
			f.src = 'https://www.youtube-nocookie.com/embed/' + facade.dataset.yt + '?autoplay=1&rel=0';
			f.title = 'Buying your first home in NZ — Mortgages with JJ';
			f.allow =
				'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
			f.setAttribute('allowfullscreen', '');
			facade.innerHTML = '';
			facade.appendChild(f);
		};
		facade.addEventListener('click', loadYT);
		facade.addEventListener('keydown', function (e) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				loadYT();
			}
		});
	}

	/* ---- curved scroll spine: draw path + ride the dot ---- */
	var spine = document.querySelector('.spine');
	var fillPath = spine ? spine.querySelector('.fill') : null;
	var dot = spine ? spine.querySelector('.dot') : null,
		plen = 0;
	if (fillPath) {
		plen = fillPath.getTotalLength();
		fillPath.style.strokeDasharray = plen;
		fillPath.style.strokeDashoffset = plen;
	}
	function progress() {
		var h = document.documentElement.scrollHeight - window.innerHeight;
		return h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
	}
	function spineUpdate() {
		if (!fillPath) return;
		var p = progress();
		fillPath.style.strokeDashoffset = plen * (1 - p);
		var pt = fillPath.getPointAtLength(plen * p);
		dot.style.left = (pt.x / 56) * 100 + '%';
		dot.style.top = (pt.y / 1000) * 100 + '%';
	}
	window.addEventListener('scroll', spineUpdate, { passive: true });
	window.addEventListener('resize', function () {
		if (fillPath) {
			plen = fillPath.getTotalLength();
			fillPath.style.strokeDasharray = plen;
		}
		spineUpdate();
	});
	spineUpdate();

	if (reduce || typeof gsap === 'undefined') {
		return;
	} /* content visible; stop here */
	gsap.registerPlugin(ScrollTrigger);

	/* ---- orchestrated hero entrance + kinetic headline ---- */
	gsap.set('.hero .eyebrow,.hero .lede,.hero .hero-cta,.hero .hero-meta', { opacity: 0, y: 22 });
	gsap.set('.hero h1 .w', { opacity: 0, yPercent: 115 });
	gsap
		.timeline({ defaults: { ease: 'power3.out' } })
		.to('.hero .eyebrow', { opacity: 1, y: 0, duration: 0.6 }, 0)
		.to('.hero h1 .w', { opacity: 1, yPercent: 0, duration: 0.8, stagger: 0.06 }, 0.15)
		.to('.hero .lede', { opacity: 1, y: 0, duration: 0.7 }, '-=.3')
		.to('.hero .hero-cta', { opacity: 1, y: 0, duration: 0.7 }, '-=.45')
		.to('.hero .hero-meta', { opacity: 1, y: 0, duration: 0.7 }, '-=.5');

	/* ---- subtle parallax on the About headshot ---- */
	gsap.to('.meet .aimg', {
		yPercent: -8,
		ease: 'none',
		scrollTrigger: { trigger: '.meet', start: 'top bottom', end: 'bottom top', scrub: true },
	});

	/* ---- scroll reveals with directional intent ---- */
	gsap.utils.toArray('section [data-anim]').forEach(function (el) {
		if (el.closest('.hero')) return;
		gsap.from(el, {
			opacity: 0,
			y: 34,
			duration: 0.8,
			ease: 'power3.out',
			scrollTrigger: { trigger: el, start: 'top 85%' },
		});
	});

	/* ---- trust stats count-up + underline ---- */
	gsap.utils.toArray('.stat').forEach(function (s) {
		ScrollTrigger.create({
			trigger: s,
			start: 'top 88%',
			once: true,
			onEnter: function () {
				s.classList.add('lit');
				var el = s.querySelector('[data-count] .v');
				if (el) {
					var target = parseInt(s.querySelector('[data-count]').dataset.count, 10);
					gsap.to(
						{ v: 0 },
						{
							v: target,
							duration: 1.1,
							ease: 'power2.out',
							onUpdate: function () {
								el.textContent = Math.round(this.targets()[0].v);
							},
						}
					);
				}
			},
		});
	});

	/* ---- process progress bar + steps light up ---- */
	var stepsEl = document.getElementById('steps');
	ScrollTrigger.create({
		trigger: stepsEl,
		start: 'top 70%',
		end: 'bottom 60%',
		scrub: 0.5,
		onUpdate: function (self) {
			stepsEl.style.setProperty('--sp', self.progress * 100 + '%');
		},
	});
	gsap.utils.toArray('.step').forEach(function (step, i) {
		ScrollTrigger.create({
			trigger: stepsEl,
			start: 'top ' + (72 - i * 6) + '%',
			onEnter: function () {
				step.classList.add('on');
			},
			onLeaveBack: function () {
				step.classList.remove('on');
			},
		});
	});

	/* ---- pointer-reactive card tilt ---- */
	if (window.matchMedia('(pointer:fine)').matches) {
		document.querySelectorAll('.svc:not(.feat),.rev').forEach(function (card) {
			card.addEventListener('mousemove', function (e) {
				var r = card.getBoundingClientRect();
				var px = (e.clientX - r.left) / r.width - 0.5,
					py = (e.clientY - r.top) / r.height - 0.5;
				card.style.transform =
					'perspective(900px) rotateX(' +
					(-py * 5).toFixed(2) +
					'deg) rotateY(' +
					(px * 6).toFixed(2) +
					'deg) translateY(-4px)';
			});
			card.addEventListener('mouseleave', function () {
				card.style.transform = '';
			});
		});
	}
})();
