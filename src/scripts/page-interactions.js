(function () {
	'use strict';
	var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduce || typeof gsap === 'undefined') return; /* content already visible in DOM */
	gsap.registerPlugin(ScrollTrigger);

	/* ---- hero entrance ---- */
	gsap.set('.phero .crumb,.phero .eyebrow,.phero h1,.phero .sub,.phero .lead,.phero .hero-cta', {
		opacity: 0,
		y: 22,
	});
	gsap
		.timeline({ defaults: { ease: 'power3.out' } })
		.to('.phero .crumb', { opacity: 1, y: 0, duration: 0.5 }, 0)
		.to('.phero .eyebrow', { opacity: 1, y: 0, duration: 0.5 }, 0.05)
		.to('.phero h1', { opacity: 1, y: 0, duration: 0.7 }, 0.15)
		.to('.phero .sub,.phero .lead', { opacity: 1, y: 0, duration: 0.7 }, '-=.35')
		.to('.phero .hero-cta', { opacity: 1, y: 0, duration: 0.7 }, '-=.4');

	/* ---- scroll reveals with directional intent ---- */
	gsap.utils.toArray('section [data-anim], .trust').forEach(function (el) {
		if (el.closest('.phero')) return;
		gsap.from(el, {
			opacity: 0,
			y: 34,
			duration: 0.8,
			ease: 'power3.out',
			scrollTrigger: { trigger: el, start: 'top 85%' },
		});
	});

	/* ---- process rail progress bar + steps light up (where present) ---- */
	var stepsEl = document.getElementById('steps');
	if (stepsEl) {
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
	}

	/* ---- pointer-reactive card tilt (where present) ---- */
	if (window.matchMedia('(pointer:fine)').matches) {
		document.querySelectorAll('.svc:not(.feat),.rev,.area-card,.who').forEach(function (card) {
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
