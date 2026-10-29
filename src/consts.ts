// Single source of truth for every fact used across the site and its schema.
// Nothing below should be hard-typed again in a page, layout, or component —
// import from here instead.

export const SITE_URL = 'https://mortgageswithjj.co.nz';
export const SITE_NAME = 'Mortgages with JJ';

export const GOOGLE_REVIEWS_URL = 'https://share.google/qIS9bRU5nBPvdRgJi';

// Same 4-step process as Home — reused verbatim across service/area pages
// since the process doesn't change by service or location.
export const PROCESS_STEPS = [
	{
		title: 'Free consultation',
		body: '30-minute chat. No cost. We work out what you actually need and whether I am the right person to help.',
	},
	{
		title: 'Strategy & lender match',
		body: 'I compare your situation across the lender panel, structure the deal, and recommend the best path.',
	},
	{
		title: 'Application & approval',
		body: 'I prepare and submit your application, manage the lender conversation, and chase down approvals.',
	},
	{
		title: 'Settlement & ongoing review',
		body: 'Funds settle, you get the keys (or the better rate), and I check in annually to keep your loan working.',
	},
] as const;

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
	// FAP compliance: always "Mortgage Adviser" (Mortgage Design audit, 29 Oct 2026) — never "Independent", "Senior", "Mortgage Broker" or "AFA".
	title: 'Mortgage Adviser',
	fsp: 'FSP1000031',
	commercialBankingYears: 15,
	advisingYears: 6,
	get experienceYears() {
		return this.commercialBankingYears + this.advisingYears;
	},
	bioDescription:
		'Mortgage Adviser in Orewa with 15 years in commercial banking and six years advising Kiwis on mortgages; accredited with 25+ bank and non-bank lenders across New Zealand.',
};

export const LICENSEE = {
	// FAP compliance: name is fixed — never "NZ"/"New Zealand"/any variant.
	name: 'Mortgage Design Limited',
	fsp: 'FSP752291',
};

export const STATS = {
	lendersCompared: 25,
	googleRating: 5.0,
	googleReviewCount: 46,
	feeToClient: 0,
	settledVolume2025: 26,
	settledVolume2025Label: '$26M+',
};

// JJ's adviser profile on the licensee's site. Google AI Mode cites it for "mortgages with jj",
// so linking it from the Person node helps keep JJ apart from other brokers called JJ.
export const LICENSEE_PROFILE_URL = 'https://mortgagedesign.co.nz/j-j-van-der-westhuizen/';

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
		'Mortgage Adviser JJ van der Westhuizen explains how first home buyers in Auckland and across New Zealand get onto the property ladder — deposit, KiwiSaver, lenders and the steps between.',
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

export const SERVICES = [
	{
		slug: 'first-home',
		metaDescription: 'First home buyer mortgage advice in Orewa and NZ-wide: deposit, KiwiSaver, the Kāinga Ora First Home Loan, pre-approval and settlement.',
		name: 'First Home Buyers',
		serviceType: 'First home buyer mortgage advice',
		eyebrow: 'First Home Buyers',
		title: 'First home buyer mortgages, sorted properly.',
		lede: 'From deposit and KiwiSaver to pre-approval and settlement — a guided path built for people doing this for the very first time. This is my specialty.',
		whoItsFor: [
			'Saving a deposit and not sure what counts towards it',
			"Wondering if you're eligible for the Kāinga Ora First Home Loan",
			'Ready to find out what you could realistically borrow',
			'Confused by pre-approval, conditional offers, and settlement',
		],
		checklistTitle1: 'Documents to gather',
		checklist1: ['Proof of ID', 'Recent payslips', '3 months of bank statements', 'KiwiSaver statement', 'Details of any existing debt'],
		checklistTitle2: 'Questions we work through',
		checklist2: [
			'How much deposit do you actually have, including KiwiSaver and gifted funds?',
			'What lenders and schemes fit your situation?',
			'What can you realistically borrow?',
			'Fixed, floating, or a split — and for how long?',
		],
		faq: [
			{
				question: 'How much deposit do I actually need?',
				answer: "There are genuine lower-deposit paths — including the Kāinga Ora First Home Loan and using your KiwiSaver — if you're eligible. I check which lenders and schemes fit your situation and what your deposit realistically needs to look like.",
			},
			{
				question: 'Can I use my KiwiSaver towards the deposit?',
				answer: 'Often, yes. Many first home buyers withdraw from KiwiSaver to help fund their deposit if they meet the criteria. I help you work out what counts and how it fits alongside your savings and any gifted funds.',
			},
			{
				question: 'How much can I borrow?',
				answer: "Lenders test affordability against your income, expenses and existing debts, and every lender's servicing test differs. I work out what is realistic for your situation and take it to the lender most likely to say yes.",
			},
			{
				question: 'What documents will I need to apply?',
				answer: 'Usually proof of ID, recent payslips, a few months of bank statements, and tax summaries if you are self-employed. I give you a clear checklist upfront.',
			},
		],
	},
	{
		slug: 'refinance',
		metaDescription: 'Coming off a fixed term? Rate reviews, restructures, cashback and break-fee maths from a Mortgage Adviser in Orewa. No fee to you.',
		name: 'Refinance',
		serviceType: 'Mortgage refinance advice',
		eyebrow: 'Refinance',
		title: 'Coming off a fixed term? Make sure you’re not overpaying.',
		lede: 'Rate reviews, cashback offers, structure rebuilds, and break-fee maths. If you have not reviewed your loan in two years, you are probably overpaying.',
		whoItsFor: [
			'Coming off a fixed rate and want to know your real options',
			'Feeling the squeeze on repayments and want them restructured',
			'Curious what cashback offers are actually worth',
			"Not sure whether breaking a fixed term early makes sense",
		],
		checklistTitle1: 'What to have ready',
		checklist1: ['Your current loan statement', 'Details of your fixed-rate expiry date', 'Recent payslips', 'A rough sense of your property’s current value'],
		checklistTitle2: 'What we work through',
		checklist2: [
			'Whether your current lender or a new one offers the better deal',
			'Break-fee costs versus the savings from switching now',
			'Whether a restructure (not just a new rate) solves the real problem',
			'Cashback offers versus the total cost over the fixed term',
		],
		faq: [
			{
				question: 'Should I go to my bank or use a mortgage adviser?',
				answer: 'A bank only offers its own products. I compare 25+ bank and non-bank lenders and manage the whole application — and in most cases there is no fee to you.',
			},
			{
				question: 'Is it worth breaking my fixed term early?',
				answer: 'Sometimes — it depends on the break fee versus what you would save on a lower rate for the remaining term. I work through the actual numbers with you rather than guessing.',
			},
			{
				question: 'What documents will I need to apply?',
				answer: 'Usually your current loan statement, recent payslips, and a few months of bank statements. I give you a clear checklist upfront.',
			},
			{
				question: 'Should I fix or float — and for how long?',
				answer: 'It depends on how much certainty you want and what is ahead for you. Most New Zealand home loans use a mix of fixed and floating rather than all-or-nothing. I talk through the structure that suits your plans.',
			},
		],
	},
	{
		slug: 'investment',
		metaDescription: 'Investment property mortgage advice: DTI rules, equity release, portfolio structure and lender appetite for investors. No fee to you.',
		name: 'Investment Property',
		serviceType: 'Investment property mortgage advice',
		eyebrow: 'Investment Property',
		title: 'Grow a portfolio without overstretching.',
		lede: 'DTI rules, equity release, multi-property structures, and lender appetite for investors. I help you grow without overstretching.',
		whoItsFor: [
			'Buying your first investment property',
			'Looking to release equity from an existing property',
			'Growing an existing portfolio and need the structure right',
			'Wondering how debt-to-income (DTI) rules affect what you can borrow',
		],
		checklistTitle1: 'Documents to gather',
		checklist1: ['Proof of ID', 'Recent payslips or business financials', 'Details of any existing properties and their loans', 'Rental appraisal (if refinancing an existing rental)'],
		checklistTitle2: 'Questions we work through',
		checklist2: [
			'How current DTI rules affect what you can borrow',
			'Whether releasing equity from an existing property makes sense',
			'The right ownership and lending structure for your goals',
			'Which lenders currently have appetite for investors',
		],
		faq: [
			{
				question: 'How do DTI rules affect what I can borrow?',
				answer: 'Debt-to-income rules cap borrowing as a multiple of your income, and the exact treatment varies by lender. I work through how this applies to your situation and which lenders have room to move.',
			},
			{
				question: 'Can I use equity from my existing home to buy an investment property?',
				answer: 'Often, yes, if you have enough equity and the numbers stack up. I work out what is realistically available and how it fits your wider plans.',
			},
			{
				question: 'Do you only work with the big four banks?',
				answer: 'No. I compare across 25+ bank and non-bank lenders — the four majors, second-tier banks, and specialist lenders for situations the big banks will not look at.',
			},
			{
				question: 'How much does it cost to use a mortgage adviser?',
				answer: 'Nothing to you. The lender pays my commission when your loan settles. You get full advice, application support, and ongoing reviews at no cost.',
			},
		],
	},
	{
		slug: 'new-build',
		metaDescription: 'New build and off-the-plans finance: staged drawdowns, deposit options and lenders that suit your build, from a Mortgage Adviser in Orewa.',
		name: 'New Build',
		serviceType: 'New build mortgage advice',
		eyebrow: 'New Build',
		title: 'Building or buying off the plans, financed properly.',
		lede: 'Building or buying off the plans comes with its own lending quirks. I handle the staged-drawdown detail so you can focus on the house.',
		whoItsFor: [
			'Building a new home and need to understand staged drawdowns',
			'Buying off the plans and want the finance sorted before you commit',
			'Wanting to understand how a new build affects your deposit options',
			'Working with a builder or developer and need finance to keep pace',
		],
		checklistTitle1: 'Documents to gather',
		checklist1: ['Fixed-price building contract (or plans and specifications)', 'Council-approved plans, if available', 'Proof of ID', 'Recent payslips'],
		checklistTitle2: 'Questions we work through',
		checklist2: [
			'How staged drawdowns work and what triggers each payment',
			'What deposit options are available for new builds in your situation',
			'Which lenders are comfortable financing your specific build type',
			'How to keep finance timelines aligned with your builder’s schedule',
		],
		faq: [
			{
				question: 'How does financing a new build differ from an existing home?',
				answer: 'New builds are typically financed through staged drawdowns — the lender releases funds as construction reaches agreed milestones, rather than one lump sum at settlement. I walk you through exactly how that works for your build.',
			},
			{
				question: 'What deposit do I need for a new build?',
				answer: 'Deposit requirements for new builds can differ from existing homes, and the details depend on your lender and circumstances. I check what applies to your situation rather than assuming a standard figure.',
			},
			{
				question: 'What documents will I need to apply?',
				answer: 'Usually your building contract or plans, proof of ID, recent payslips, and a few months of bank statements. I give you a clear checklist upfront.',
			},
			{
				question: 'How long does pre-approval take?',
				answer: 'Timeframes vary with the lender and your circumstances. Some approvals are quick, others take longer. I keep you informed and follow up to keep it moving.',
			},
		],
	},
] as const;

export const AREAS = [
	{
		slug: 'hibiscus-coast',
		metaDescription: 'Mortgage Adviser based in Orewa, helping first home buyers, refinancers and investors across Orewa, Whangaparāoa and Silverdale. No fee to you.',
		name: 'Hibiscus Coast',
		eyebrow: 'Hibiscus Coast',
		title: 'Your local mortgage adviser on the Hibiscus Coast.',
		lede: "Based in Orewa, I work with first home buyers, refinancers, investors, and new build clients across the Hibiscus Coast — Orewa, Whangaparāoa, Silverdale, and Ōrewa Beach.",
		whyLocal: "I live and work on the Hibiscus Coast, so I know the streets, the school zones, and the way local lenders view properties here — not just the national averages.",
		faq: [
			{
				question: 'Do you meet clients in person on the Hibiscus Coast?',
				answer: 'Yes — I am based in Orewa and happy to meet locally, or we can do the whole process remotely if that suits you better.',
			},
			{
				question: 'I am a first home buyer — where do I start?',
				answer: 'The best first step is a free 30-minute chat. We work out what your deposit actually looks like, whether you qualify for the Kāinga Ora First Home Loan, and roughly what you could borrow.',
			},
			{
				question: 'How much does it cost to use a mortgage adviser?',
				answer: 'Nothing to you. The lender pays my commission when your loan settles.',
			},
		],
	},
	{
		slug: 'whangaparaoa',
		metaDescription: 'Mortgage adviser for the Whangaparāoa Peninsula, from Red Beach and Stanmore Bay to Gulf Harbour and Army Bay. Based in Orewa. No fee to you.',
		name: 'Whangaparāoa',
		eyebrow: 'Whangaparāoa Peninsula',
		title: 'Mortgage adviser for the Whangaparāoa Peninsula.',
		lede: 'Based just up the road in Orewa, I help first home buyers, families, refinancers and investors across the Peninsula, from Red Beach and Stanmore Bay to Gulf Harbour and Army Bay.',
		whyLocal: 'The Peninsula has a real mix of homes: established family houses, beachside sections, and newer homes around Gulf Harbour and the marina. Lenders look at each of those a little differently, and I work with clients across all of them, in person on the Coast or remotely.',
		faq: [
			{
				question: 'Is there a local mortgage adviser for Whangaparāoa?',
				answer: 'Yes. I am JJ van der Westhuizen, a Mortgage Adviser based at 14 Nukumea Common in Orewa, a short drive from the Peninsula. I can meet you locally or run the whole process remotely, whichever suits you.',
			},
			{
				question: 'What is the difference between a mortgage broker and a mortgage adviser?',
				answer: 'In New Zealand they usually describe the same job: someone who compares lenders and helps you apply for a home loan. "Mortgage adviser" is the term the law uses, because anyone giving mortgage advice must be licensed or work under a licensed Financial Advice Provider. I work under the licence of Mortgage Design Limited (FSP752291).',
			},
			{
				question: 'How much does a mortgage adviser cost?',
				answer: 'In most cases, nothing. The lender pays my commission when your loan settles, so there is no fee to you. If a deal would not be paid by the lender, I tell you upfront before any work starts.',
			},
			{
				question: 'Is it cheaper to go through a mortgage adviser than my bank?',
				answer: 'It can be, but nobody can promise you a better rate. A bank can only offer its own products, while I compare 25+ bank and non-bank lenders and structure the loan around your situation. Where it often helps most is getting the structure and the lender right the first time.',
			},
			{
				question: 'What is the downside of using a mortgage adviser?',
				answer: 'The main things to understand are how your adviser is paid and which lenders they can use. Advisers are paid commission by lenders, and not every adviser can place loans with every lender. I am required to put your interests first and to tell you how I am paid, and you can read that on my Important Information page.',
			},
			{
				question: 'Can I buy a new build on the Peninsula with a smaller deposit?',
				answer: "Possibly. New builds are treated differently under the Reserve Bank's loan-to-value ratio (LVR) rules, so some lenders will consider a smaller deposit than for an existing home. Whether that works for you depends on the build, the lender and your income, which is what we work through together.",
			},
			{
				question: 'Can I use my KiwiSaver to buy my first home in Whangaparāoa?',
				answer: 'Often, yes, if you meet the criteria. Many first home buyers combine a KiwiSaver withdrawal with their savings and gifted funds. I help you work out what counts and whether the Kāinga Ora First Home Loan could fit as well.',
			},
			{
				question: 'Which lenders can you use, and do you work with non-bank lenders?',
				answer: 'I compare 25+ lenders, including the main banks and a range of non-bank lenders. Non-bank lenders can suit people whose situation does not fit a bank\'s criteria, for example after a decline or with less common income. I explain why I am recommending a lender, and you always choose.',
			},
			{
				question: 'Can you help if I am self-employed or on contract or casual income?',
				answer: 'Often, yes. Lenders assess self-employed, contract and casual income differently, and some are more flexible than others about how long you have been earning it and how it is shown. I look at how your income is set up and take your application to the lenders most likely to accept it.',
			},
			{
				question: 'What will a mortgage adviser ask me for?',
				answer: 'Usually proof of ID, recent payslips or other proof of income, a few months of bank statements, details of any debts, and where your deposit is coming from. If you are self-employed, lenders also want your tax summaries or financial statements. I give you a checklist at the start so nothing is missed.',
			},
		],
	},
	{
		slug: 'north-shore',
		metaDescription: 'Mortgage advice for North Shore buyers and homeowners, from Albany to Devonport. First home, refinance, investment and new build. No fee to you.',
		name: 'North Shore',
		eyebrow: 'North Shore',
		title: 'Mortgage advice for North Shore buyers and homeowners.',
		lede: 'From Albany and Browns Bay to Takapuna and Devonport, I help North Shore clients with first home buying, refinancing, investment and new build finance.',
		whyLocal: 'The North Shore spans a wide range of price points and property types — I work with clients across all of them, not just one corner of the market.',
		faq: [
			{
				question: 'Do you cover the whole North Shore?',
				answer: 'Yes — from Albany through to Devonport, I work with clients across the North Shore, in person or remotely.',
			},
			{
				question: 'Should I go to my bank or use a mortgage adviser?',
				answer: 'A bank only offers its own products. I compare 25+ bank and non-bank lenders and manage the whole application — and in most cases there is no fee to you.',
			},
			{
				question: 'How much can I borrow?',
				answer: "Lenders test affordability against your income, expenses and existing debts, and every lender's servicing test differs. I work out what is realistic for your situation.",
			},
		],
	},
	{
		slug: 'rodney',
		metaDescription: 'Mortgage advice across Warkworth, Wellsford, Helensville and the wider Rodney district, including lifestyle blocks and new subdivisions.',
		name: 'Rodney',
		eyebrow: 'Rodney',
		title: 'Local mortgage advice across the Rodney district.',
		lede: 'Warkworth, Wellsford, Helensville, and the wider Rodney district — I help buyers, refinancers, investors, and new build clients across the whole area.',
		whyLocal: 'Rodney covers a lot of ground, from lifestyle blocks to new subdivisions. I know how lenders treat the different property types you find out here.',
		faq: [
			{
				question: 'Do you cover lifestyle blocks and rural properties?',
				answer: 'Yes — lending on lifestyle and rural properties works a little differently to a standard residential loan, and I can talk you through what applies to your property.',
			},
			{
				question: 'I have been declined by my bank. Can you still help?',
				answer: 'Often, yes. A decline from one bank does not mean every lender will say no. I look at where your situation actually fits and take it to the lender most likely to approve it.',
			},
			{
				question: 'What documents will I need to apply?',
				answer: 'Usually proof of ID, recent payslips, a few months of bank statements, and tax summaries if you are self-employed.',
			},
		],
	},
	{
		slug: 'west-coast',
		metaDescription: 'Mortgage advice for West Auckland, from Henderson and New Lynn to Titirangi and Te Atatū. First home, refinance, investment and new build.',
		name: 'West Auckland',
		eyebrow: 'West Auckland',
		title: 'Mortgage advice for West Auckland buyers and homeowners.',
		lede: 'Henderson, New Lynn, Titirangi, Te Atatū, and the wider West Auckland area — I help first home buyers, refinancers, investors, and new build clients across the region.',
		whyLocal: 'West Auckland has its own mix of established suburbs and new development — I work with clients across both.',
		faq: [
			{
				question: 'Do you work with clients across all of West Auckland?',
				answer: 'Yes — from Henderson to Titirangi and everywhere between, in person or remotely.',
			},
			{
				question: 'How are you different from going direct to a bank?',
				answer: 'A bank can only offer its own products. I compare the whole panel, structure the deal around your situation, and manage the process from first chat to settlement — and there is no fee to you.',
			},
			{
				question: 'Can I use my KiwiSaver towards the deposit?',
				answer: 'Often, yes. Many first home buyers withdraw from KiwiSaver to help fund their deposit if they meet the criteria.',
			},
		],
	},
	{
		slug: 'auckland-city',
		metaDescription: 'Mortgage advice for Auckland Central, from the CBD to Ponsonby and Mount Eden, including apartments and character homes. No fee to you.',
		name: 'Auckland Central',
		eyebrow: 'Auckland Central',
		title: 'Mortgage advice for Auckland Central buyers and homeowners.',
		lede: 'From the CBD to Ponsonby, Mount Eden, and the inner suburbs, I help first home buyers, refinancers, investors, and new build clients across Auckland Central.',
		whyLocal: 'Inner-city apartments, character villas, and everything in between — lender appetite varies a lot across Auckland Central property types, and I know which lenders fit which situation.',
		faq: [
			{
				question: 'Can you help with financing an apartment?',
				answer: 'Yes — apartment lending has its own considerations (body corporate, unit size, leasehold vs freehold) and not every lender treats them the same way. I know which lenders fit which apartment types.',
			},
			{
				question: 'Do you only work with the big four banks?',
				answer: 'No. I compare across 25+ bank and non-bank lenders — the four majors, second-tier banks, and specialist lenders.',
			},
			{
				question: 'What documents will I need to apply?',
				answer: 'Usually proof of ID, recent payslips, a few months of bank statements, and tax summaries if you are self-employed.',
			},
		],
	},
] as const;

export const CALCULATOR_FAQ = [
	{
		question: 'Why is the "total interest paid" so much?',
		answer: 'Mortgages are long. Even at a moderate interest rate, paying back a typical loan over 30 years means a lot of interest — often more than the original loan amount itself. This is why even small reductions in the rate, or paying off the loan faster, can save tens or hundreds of thousands. Worth a conversation if it surprises you.',
	},
	{
		question: "What's NOT included in this calculation?",
		answer: 'The calculator gives you the principal-and-interest repayment only. It does not include lender establishment or admin fees, property valuation costs, legal fees, insurance, council rates and body corporate fees, or any Low Equity Margin. These are part of the real cost of owning a home and I would factor them in when we run actual numbers for your situation.',
	},
	{
		question: "Are these numbers what I'll actually be offered?",
		answer: "No — this is an illustration. Real lender offers depend on your income, deposit, employment situation, credit history, the property itself, and the lender's current appetite. That's exactly what I do — work out which lender will give you the best actual offer based on your specific situation, not the textbook one.",
	},
	{
		question: 'What interest rate should I put in?',
		answer: 'Use a rate close to what you would realistically expect to be offered. Current advertised rates for owner-occupied home loans in NZ vary by lender, term, and loan-to-value ratio — I can help you use a realistic figure for your situation.',
	},
	{
		question: 'What about a fixed/floating split?',
		answer: 'Most home loans in NZ are split between a fixed-rate portion and a floating-rate portion. The right split depends on your circumstances. This calculator uses a single blended rate to keep things simple — if you would like to model a specific split for your situation, that is exactly the kind of conversation worth having.',
	},
] as const;

// Re-hosted in-repo (public/downloads/) so it survives the WordPress → Astro
// cutover — the old /wp-content/uploads/... path won't exist post-migration.
export const FHB_GUIDE_PATH = '/downloads/MWJ_FirstHomeBuyer_Guide_v1.pdf';

export const FHB_GUIDE = {
	title: 'The First Home Buyer Guide',
	whatsInside: [
		'How much deposit you actually need, and what counts towards it',
		'Using KiwiSaver and the Kāinga Ora First Home Loan',
		'What lenders look for, and how to prepare your documents',
		'Pre-approval, conditional offers, and settlement — step by step',
		'Common mistakes first home buyers make, and how to avoid them',
	],
};

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
