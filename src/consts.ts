// Single source of truth for every fact used across the site and its schema.
// Nothing below should be hard-typed again in a page, layout, or component —
// import from here instead.

export const SITE_URL = 'https://mortgageswithjj.co.nz';
export const SITE_NAME = 'Mortgages with JJ';

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
	// Standing phrasing: "21 years" / "20+ years in banking & finance" — keep consistent everywhere.
	yearsExperienceLabel: '21 years',
	yearsBankingLabel: '20+ years in banking & finance',
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
	// Not yet surfaced on the home page — held here for when it is.
	settledVolume2025Label: '$26M+',
};

export const SAME_AS = [
	'https://www.linkedin.com/in/jwest1977/',
	'https://www.youtube.com/channel/UClIagO25SaM_mjQV7NdlBKQ',
	'https://www.facebook.com/profile.php?id=61589138603376',
];

export const VIDEO = {
	youtubeId: 'BQYhx7n1gPk',
	title: 'Buying Your First Home in NZ | First Home Buyers | Mortgages with JJ',
	description:
		'Senior Mortgage Adviser JJ van der Westhuizen explains how first home buyers in Auckland and across New Zealand get onto the property ladder — deposit, KiwiSaver, lenders and the steps between.',
};

export const FAQ_ENTRIES = [
	{
		question: 'How much deposit do I actually need?',
		answer:
			"There are genuine lower-deposit paths — including the Kāinga Ora First Home Loan and using your KiwiSaver — if you're eligible. JJ checks which lenders and schemes fit your situation.",
	},
	{
		question: 'Can I use my KiwiSaver towards the deposit?',
		answer:
			'Often, yes. Many first home buyers withdraw from KiwiSaver to help fund their deposit if they meet the criteria. JJ helps you work out what counts and how it fits.',
	},
	{
		question: 'How much can I borrow?',
		answer:
			"Lenders test affordability against your income, expenses and existing debts, and every lender's servicing test differs. JJ works out what's realistic and takes it to the lender most likely to say yes.",
	},
	{
		question: 'Should I go to my bank or use a mortgage adviser?',
		answer:
			'A bank only offers its own products. JJ compares 25+ bank and non-bank lenders and manages the whole application — and in most cases there is no fee to you.',
	},
	{
		question: 'What documents will I need to apply?',
		answer:
			"Usually proof of ID, recent payslips, a few months of bank statements, and tax summaries if you're self-employed. JJ gives you a clear checklist upfront.",
	},
	{
		question: 'Should I fix or float, and for how long?',
		answer:
			'It depends on how much certainty you want and your plans. Most New Zealand home loans use a mix of fixed and floating; JJ talks through the structure that suits you.',
	},
] as const;
