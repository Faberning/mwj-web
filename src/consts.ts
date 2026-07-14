// Single source of truth for every fact used across the site and its schema.
// Nothing below should be hard-typed again in a page, layout, or component —
// import from here instead.

export const SITE_URL = 'https://mortgageswithjj.co.nz';
export const SITE_NAME = 'Mortgages with JJ';

export const GOOGLE_REVIEWS_URL = 'https://share.google/qIS9bRU5nBPvdRgJi';

export const BUSINESS = {
	name: SITE_NAME,
	phoneDisplay: '027 336 3000',
	phoneE164: '+64273363000',
	email: 'info@mortgageswithjj.co.nz',
	address: {
		street: '14 Nukumea Common',
		suburb: 'Orewa',
		region: 'Auckland',
		postcode: '0931',
		country: 'NZ',
	},
	areaServed: ['Orewa', 'Hibiscus Coast', 'Auckland', 'New Zealand'],
};

export const ADVISER = {
	name: 'JJ van der Westhuizen',
	// FAP compliance: always "Senior Mortgage Adviser" — never "Mortgage Broker" or "AFA".
	title: 'Senior Mortgage Adviser',
	fsp: 'FSP1000031',
	commercialBankingYears: 15,
	advisingYears: 6,
	get experienceYears() {
		return this.commercialBankingYears + this.advisingYears;
	},
	bioDescription:
		'Senior Mortgage Adviser in Orewa with 15 years in commercial banking and six years advising Kiwis on mortgages; accredited with 25+ bank and non-bank lenders across New Zealand.',
};

export const LICENSEE = {
	// FAP compliance: name is fixed — never "NZ"/"New Zealand"/any variant.
	name: 'Mortgage Design Limited',
	fsp: 'FSP752291',
};

export const STATS = {
	lendersCompared: 25,
	googleRating: 5.0,
	googleReviewCount: 42,
	feeToClient: 0,
	settledVolume2025: 26,
	settledVolume2025Label: '$26M+',
};

export const SAME_AS = [
	'https://www.linkedin.com/in/jwest1977/',
	'https://www.youtube.com/channel/UClIagO25SaM_mjQV7NdlBKQ',
	'https://www.facebook.com/profile.php?id=61589138603376',
	GOOGLE_REVIEWS_URL,
];

export const VIDEO = {
	youtubeId: 'BQYhx7n1gPk',
	title: 'Buying Your First Home in NZ | First Home Buyers | Mortgages with JJ',
	description:
		'Senior Mortgage Adviser JJ van der Westhuizen explains how first home buyers in Auckland and across New Zealand get onto the property ladder — deposit, KiwiSaver, lenders and the steps between.',
};

// Single canonical set — rendered as both the on-page FAQ accordion and the
// FAQPage JSON-LD, so copy and schema can never drift apart.
export const FAQ_ENTRIES = [
	{
		question: 'I am a first home buyer — where do I start?',
		answer:
			'The best first step is a free 30-minute chat. We work out what your deposit actually looks like (savings, KiwiSaver, gifted funds), whether you qualify for the Kāinga Ora First Home Loan, and roughly what you could borrow. From there we map the path to a pre-approval and then to an offer.',
	},
	{
		question: 'How much does it cost to use a mortgage adviser?',
		answer:
			'Nothing to you. The lender pays my commission when your loan settles. You get full advice, application support, and ongoing reviews at no cost. If for some reason a deal is not paid by the lender, I will tell you upfront before any work starts.',
	},
	{
		question: 'How long does pre-approval take?',
		answer:
			'Approval timeframes vary depending on the lender and your circumstances. Some approvals are quick, while others take longer. I keep you informed and follow up to make sure the process moves smoothly.',
	},
	{
		question: 'Do you only work with the big four banks?',
		answer:
			'No. I compare across 25+ bank and non-bank lenders — the four majors, second-tier banks, and specialist lenders for situations the big banks will not look at.',
	},
	{
		question: 'I have been declined by my bank. Can you still help?',
		answer:
			'Often, yes. A decline from one bank does not mean every lender will say no — different lenders have different criteria and appetites. I look at where your situation actually fits and take it to the lender most likely to approve it.',
	},
	{
		question: 'How are you different from going direct to a bank?',
		answer:
			'A bank can only offer its own products. I compare the whole panel, structure the deal around your situation, and manage the process from first chat to settlement — and there is no fee to you.',
	},
	{
		question: 'Can I use my KiwiSaver towards the deposit?',
		answer:
			'Often, yes. Many first home buyers withdraw from KiwiSaver to help fund their deposit if they meet the criteria. I help you work out what counts, what you may be eligible for, and how it fits alongside your savings and any gifted funds.',
	},
	{
		question: 'How much can I borrow?',
		answer:
			"Lenders test affordability against your income, your regular expenses and any existing debts — and every lender's servicing test is different. Rather than a generic number, I work out what is realistic for your situation and take it to the lender most likely to say yes.",
	},
	{
		question: 'What documents will I need to apply?',
		answer:
			'Usually proof of ID, recent payslips, a few months of bank statements, and tax summaries if you are self-employed. I give you a clear checklist upfront so nothing slows your application down once it is in.',
	},
	{
		question: 'Should I fix or float — and for how long?',
		answer:
			'It depends on how much certainty you want and what is ahead for you. Most New Zealand home loans use a mix of fixed and floating rather than all-or-nothing. I talk through the structure that suits your plans rather than pushing a one-size-fits-all answer.',
	},
] as const;

export const WHO_I_WORK_WITH = [
	{
		title: 'First home buyers',
		description:
			'Deposit options, KiwiSaver withdrawals, Kāinga Ora First Home Loan eligibility, and low-deposit lender appetite. Start to settlement, no detail glossed over.',
	},
	{
		title: 'Growing families',
		description:
			'Upsizing for another child, a better school zone, or the home you’ll stay in for the next ten years. Lender treatment of childcare costs and parental leave matters here.',
	},
	{
		title: 'Professionals',
		description:
			'Nurses, doctors, teachers — your income is reliable, but lender income-policy treatment varies wildly. I know which lenders treat your situation favourably.',
	},
	{
		title: 'South African expats',
		description:
			'Recently arrived from SA? I understand the income-documentation challenges, the NZ credit-history gap, and how the visa-to-PR pathway affects lending.',
	},
	{
		title: 'Property investors',
		description:
			'A different game. Lender appetite, equity release, DTI rules, and structure — I help you plan beyond the next purchase.',
	},
	{
		title: 'Self-employed',
		description:
			'Business owner, limited company, sole trader, contractor — lender treatment of your income is the difference between approval and decline.',
	},
] as const;
