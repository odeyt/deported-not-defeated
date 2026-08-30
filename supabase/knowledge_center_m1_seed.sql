-- ============================================================
-- Knowledge Center M1 — seed content
-- Additive, idempotent (`on conflict (slug) do nothing`). Run AFTER
-- supabase/knowledge_center_m1.sql (needs its CHECK constraint and columns).
--
-- Two groups:
--   1. The 6 self-deporting articles named in
--      docs/Knowledge-Center-Master-Spec.md's "Self-Deporting Section".
--      The required legal disclaimer is rendered unconditionally by
--      ArticleLayout for category = 'self-deporting' — it is intentionally
--      NOT duplicated into these rows, so it can never drift via a content
--      edit here.
--   2. One short (~250-400 word), genuinely useful overview article for
--      each of the other 12 categories, so no category page is empty.
--      country/related-article cross-links use guides that already exist
--      (mexico, el-salvador, guatemala, honduras, laos).
-- ============================================================


-- ---------- 1. SELF-DEPORTING (6 articles) ----------

insert into articles (
  title, slug, category, excerpt, content, published, featured,
  reading_time_minutes, last_updated_at, tags,
  related_article_slugs, related_country_slugs, affiliate_category
) values (
  'What Does Self-Deporting Mean?',
  'what-does-self-deporting-mean',
  'self-deporting',
  'A plain-language explanation of self-deporting, voluntary departure, and how they differ from a forced removal order.',
$c1$<h2 id="the-short-answer">The Short Answer</h2>
<p>"Self-deporting" is not a formal legal term used in immigration law. It is the everyday phrase people use to describe leaving the United States on their own, before or instead of being physically removed by immigration authorities. Depending on someone's exact situation, the legal process behind that decision might be called <strong>voluntary departure</strong>, <strong>voluntary return</strong>, or simply not fighting a pending removal case.</p>

<h2 id="why-it-matters">Why the Distinction Matters</h2>
<p>The word people use casually — "self-deporting" — can describe several very different legal outcomes. Some of those outcomes carry lighter long-term consequences than others. A person who is granted formal voluntary departure by an immigration judge is treated differently under the law than someone who is physically removed after a final order. Understanding which category applies to a specific situation is one of the first things an immigration attorney will sort out.</p>

<h2 id="common-situations">Common Situations Where This Comes Up</h2>
<ul>
<li>Someone with a pending immigration court case who is considering leaving before a final decision.</li>
<li>Someone who has already received a final removal order and is deciding how to comply.</li>
<li>Someone without current legal status who is weighing whether to leave voluntarily rather than wait for enforcement action.</li>
</ul>
<p>Each of these situations has different consequences for re-entry, bars, and future eligibility. None of them should be decided without first understanding the specific rules that apply.</p>

<h2 id="what-this-article-is-not">What This Article Is Not</h2>
<p>This page does not tell anyone whether self-deporting is the right choice. It exists to help readers understand the vocabulary and ask better questions — of an attorney, not of this website.</p>$c1$,
  true, true, 4, current_date,
  ARRAY['self-deporting','voluntary departure','definitions']::text[],
  ARRAY['self-deporting-vs-forced-deportation','voluntary-departure-explained']::text[],
  ARRAY['mexico','el-salvador','guatemala','honduras','laos']::text[],
  'LEGAL'
)
on conflict (slug) do nothing;

insert into articles (
  title, slug, category, excerpt, content, published, featured,
  reading_time_minutes, last_updated_at, tags,
  related_article_slugs, related_country_slugs, affiliate_category
) values (
  'Self-Deporting vs. Forced Deportation',
  'self-deporting-vs-forced-deportation',
  'self-deporting',
  'How leaving voluntarily compares to a forced removal — the practical and legal differences people should understand.',
$c2$<h2 id="two-different-paths">Two Different Paths, One Outcome on Paper</h2>
<p>Both paths end with a person outside the United States. That surface similarity is exactly why people conflate them — but the process, paperwork, and long-term consequences can differ substantially.</p>

<h2 id="forced-deportation">Forced Deportation (Removal)</h2>
<p>A formal removal is ordered by an immigration judge or through an expedited process, and enforced by immigration authorities. It typically appears on a person's immigration record as a removal, which can carry specific re-entry bars — often 5, 10, or 20 years, or in some cases longer — depending on the circumstances.</p>

<h2 id="leaving-voluntarily">Leaving Voluntarily</h2>
<p>Leaving before a removal order is finalized, or under a grant of voluntary departure, can sometimes avoid the specific consequences tied to a formal removal order. This is highly fact-specific: prior immigration history, criminal history, and how the case reached that point all affect what actually happens next.</p>

<h2 id="what-doesnt-change">What Doesn't Change</h2>
<p>Regardless of path, unlawful presence, prior violations, and criminal history generally still matter for any future visa or re-entry request. Leaving voluntarily is not an automatic reset button.</p>

<h2 id="bottom-line">The Bottom Line</h2>
<p>Nobody should assume which category their situation falls into. An immigration attorney reviewing the specific case file — court records, prior filings, and criminal history if any — is the only reliable way to know which consequences actually apply.</p>$c2$,
  true, false, 4, current_date,
  ARRAY['self-deporting','removal','voluntary departure']::text[],
  ARRAY['what-does-self-deporting-mean','can-you-return-after-self-deporting']::text[],
  ARRAY['mexico','el-salvador','guatemala','honduras','laos']::text[],
  'LEGAL'
)
on conflict (slug) do nothing;

insert into articles (
  title, slug, category, excerpt, content, published, featured,
  reading_time_minutes, last_updated_at, tags,
  related_article_slugs, related_country_slugs, affiliate_category
) values (
  'Voluntary Departure Explained',
  'voluntary-departure-explained',
  'self-deporting',
  'What voluntary departure actually is under immigration law, who can request it, and what it requires.',
$c3$<h2 id="the-formal-definition">The Formal Definition</h2>
<p>Voluntary departure is a specific, formal outcome that an immigration judge — or in some cases immigration authorities directly — can grant to someone in removal proceedings. It allows the person to leave the United States by a set deadline, at their own expense, instead of being formally removed.</p>

<h2 id="who-can-request-it">Who Can Request It</h2>
<p>Eligibility depends on factors including how long someone has been in the country, their immigration history, and whether they have certain criminal convictions. Not everyone in removal proceedings qualifies, and a judge is not required to grant it even when someone is technically eligible.</p>

<h2 id="the-tradeoff">The Tradeoff</h2>
<p>Voluntary departure generally must be requested and completed within strict deadlines. Leaving after the deadline, or not leaving at all, can convert the case into a formal removal order automatically — often with worse consequences than if voluntary departure had never been requested. This is one of the most important details to understand before agreeing to it.</p>

<h2 id="its-not-automatic">It's Not Automatic, and It's Not Simple</h2>
<p>Voluntary departure involves real deadlines, potential bond requirements, and paperwork. Missing a step can eliminate the benefit entirely. This is exactly the kind of decision that should be made with an immigration attorney reviewing the specific case, not based on general information from a website.</p>$c3$,
  true, false, 3, current_date,
  ARRAY['voluntary departure','immigration court','self-deporting']::text[],
  ARRAY['what-does-self-deporting-mean','self-deporting-vs-forced-deportation']::text[],
  ARRAY['mexico','el-salvador','guatemala','honduras','laos']::text[],
  'LEGAL'
)
on conflict (slug) do nothing;

insert into articles (
  title, slug, category, excerpt, content, published, featured,
  reading_time_minutes, last_updated_at, tags,
  related_article_slugs, related_country_slugs, affiliate_category
) values (
  'Before You Leave: A Preparation Checklist',
  'before-you-leave-checklist',
  'self-deporting',
  'Practical steps to take care of before leaving the United States — documents, finances, property, and family.',
$c4$<h2 id="documents">Documents to Gather</h2>
<ul>
<li>Passports and birth certificates for yourself and any family members traveling with you</li>
<li>Copies of any immigration court paperwork, orders, or filings — keep the originals safe and bring copies</li>
<li>Medical records and vaccination records, especially for children</li>
<li>School records and transcripts for children who will continue their education abroad</li>
<li>Marriage, divorce, or custody documents if applicable</li>
</ul>

<h2 id="financial-steps">Financial Steps</h2>
<ul>
<li>Close out or arrange access to U.S. bank accounts before leaving, where possible</li>
<li>Understand how you will receive money from family in the U.S. after you leave — see the Money &amp; Banking category for transfer options</li>
<li>Settle or make a plan for any outstanding debts, leases, or bills in your name</li>
</ul>

<h2 id="property-and-belongings">Property and Belongings</h2>
<ul>
<li>Decide what to sell, store, or ship — shipping costs and customs rules vary significantly by destination country</li>
<li>Cancel or transfer any vehicle titles, registrations, and insurance</li>
<li>Update your mailing address where it matters (banks, government agencies, subscriptions)</li>
</ul>

<h2 id="family-and-communication">Family and Communication</h2>
<p>If you have children who are U.S. citizens or who are staying behind, planning custody, guardianship, and communication in advance matters enormously. See the Family Preparation Guide for a closer look at this specific set of decisions.</p>

<h2 id="one-more-time">One More Time: Talk to an Attorney First</h2>
<p>This checklist is about logistics, not legal strategy. Before finalizing any decision to leave, a licensed immigration attorney can review whether other options exist and what the specific consequences of leaving will be for your case.</p>$c4$,
  true, true, 5, current_date,
  ARRAY['checklist','preparation','self-deporting']::text[],
  ARRAY['family-preparation-guide','what-does-self-deporting-mean']::text[],
  ARRAY['mexico','el-salvador','guatemala','honduras','laos']::text[],
  'LEGAL'
)
on conflict (slug) do nothing;

insert into articles (
  title, slug, category, excerpt, content, published, featured,
  reading_time_minutes, last_updated_at, tags,
  related_article_slugs, related_country_slugs, affiliate_category
) values (
  'Can You Return After Self-Deporting?',
  'can-you-return-after-self-deporting',
  'self-deporting',
  'How leaving voluntarily can affect future eligibility to return — re-entry bars, waivers, and what genuinely varies by case.',
$c5$<h2 id="it-depends-entirely-on-the-case">It Depends Entirely on the Case</h2>
<p>There is no single answer to whether someone can return to the United States after leaving voluntarily. It depends on prior immigration history, how long someone was in the country without status, whether removal proceedings had already started, and criminal history if any.</p>

<h2 id="re-entry-bars">Re-Entry Bars</h2>
<p>U.S. immigration law includes specific bars tied to unlawful presence — commonly a 3-year bar and a 10-year bar — that can apply even without a formal removal order, depending on how long someone was in the country unlawfully before leaving. These bars are separate from, and can stack with, any bar tied to a formal removal.</p>

<h2 id="waivers">Waivers</h2>
<p>In some circumstances, a waiver may be available to overcome a bar — typically requiring a qualifying U.S. citizen or lawful permanent resident relative and evidence of extreme hardship if the waiver is denied. Waivers are discretionary, not guaranteed, and the application process is detailed and document-heavy.</p>

<h2 id="what-actually-helps">What Actually Helps</h2>
<p>The single most useful thing anyone in this situation can do is have an immigration attorney review the complete history before leaving — not after. Knowing which bars will apply, and whether a waiver might realistically be available later, changes what preparation makes sense today.</p>

<h2 id="related-reading">Related Reading</h2>
<p>For a deeper breakdown of legal return pathways in general, see the full Legal Resources guide, "Can a Deported Person Return to the U.S.?"</p>$c5$,
  true, false, 4, current_date,
  ARRAY['re-entry bar','waiver','self-deporting']::text[],
  ARRAY['self-deporting-vs-forced-deportation','voluntary-departure-explained']::text[],
  ARRAY['mexico','el-salvador','guatemala','honduras','laos']::text[],
  'LEGAL'
)
on conflict (slug) do nothing;

insert into articles (
  title, slug, category, excerpt, content, published, featured,
  reading_time_minutes, last_updated_at, tags,
  related_article_slugs, related_country_slugs, affiliate_category
) values (
  'Family Preparation Guide',
  'family-preparation-guide',
  'self-deporting',
  'Planning ahead for children, custody, and communication when a family member is leaving the United States.',
$c6$<h2 id="if-children-are-staying">If Children Are Staying in the U.S.</h2>
<p>Families sometimes decide that U.S. citizen children will remain in the country with another parent, relative, or guardian. If that is the plan, formalizing guardianship or power of attorney in advance — through a family law attorney, not this website — gives the caregiver the legal authority to make medical, school, and other decisions on the child's behalf.</p>

<h2 id="if-children-are-leaving">If Children Are Leaving Too</h2>
<p>Gather school and medical records early, and research how the destination country handles school enrollment for returning or newly arriving children. The relevant country guide's "First 30 Days" section is a useful starting point for what to expect on arrival.</p>

<h2 id="staying-connected">Staying Connected</h2>
<p>Set up a reliable way to communicate before leaving — a phone plan or eSIM that will work at the destination, and a shared plan for how often family will check in. See the Technology category for practical options.</p>

<h2 id="financial-support">Financial Support</h2>
<p>Decide in advance how family remaining in the U.S. will send financial support, and how those funds will be received on the other end. The Money &amp; Banking category compares options for sending money internationally.</p>

<h2 id="emotional-preparation">Emotional Preparation</h2>
<p>Separation, even planned and voluntary, is genuinely hard on a family. It is reasonable to seek support — from community organizations, faith communities, or a counselor — rather than treating this as something to manage alone. See the Mental Health category for further resources.</p>$c6$,
  true, false, 4, current_date,
  ARRAY['family','custody','self-deporting']::text[],
  ARRAY['before-you-leave-checklist','what-does-self-deporting-mean']::text[],
  ARRAY['mexico','el-salvador','guatemala','honduras','laos']::text[],
  'LEGAL'
)
on conflict (slug) do nothing;


-- ---------- 2. ONE OVERVIEW ARTICLE PER REMAINING CATEGORY ----------

insert into articles (
  title, slug, category, excerpt, content, published,
  reading_time_minutes, last_updated_at, tags, related_country_slugs, affiliate_category
) values (
  'Understanding Your Legal Options After Deportation',
  'understanding-your-legal-options',
  'legal',
$e1$An overview of what "legal options" typically means after a deportation — and where to go for a deeper breakdown.$e1$,
$c7$<h2 id="start-here">Start Here, Not at the End</h2>
<p>People often arrive at this topic already looking for a specific answer — "can I come back" — before understanding the categories their situation might fall into. Immigration law after a removal generally sorts into a small number of broad paths: family-based petitions, employment sponsorship, waiting out a re-entry bar, applying for a waiver, or in narrower cases, humanitarian protection or a motion to reopen the original case.</p>

<h2 id="why-general-answers-fail">Why General Answers Don't Work Here</h2>
<p>Two people with an outwardly similar removal can face very different outcomes depending on prior immigration history, family ties, and criminal history if any. That is not a disclaimer for its own sake — it is the actual shape of how U.S. immigration law works in this area.</p>

<h2 id="where-to-go-deeper">Where to Go Deeper</h2>
<p>The full Legal Resources section walks through each pathway in detail, including a scenario table showing how different reasons for removal typically affect the outlook. It is the right next stop after this overview.</p>

<h2 id="the-one-rule-that-always-applies">The One Rule That Always Applies</h2>
<p>Speak with a licensed immigration attorney before spending money or filing anything. Free or low-cost legal clinics exist in many communities — a paid consultation is not always required to get a first, honest read on a case.</p>$c7$,
  true, 3, current_date,
  ARRAY['legal','overview']::text[],
  ARRAY['mexico','el-salvador','guatemala']::text[],
  'LEGAL'
)
on conflict (slug) do nothing;

insert into articles (
  title, slug, category, excerpt, content, published,
  reading_time_minutes, last_updated_at, tags, related_country_slugs, affiliate_category
) values (
  'Sending and Receiving Money After Deportation',
  'sending-receiving-money-overview',
  'money',
$e2$What to know about moving money across the border — transfer methods, costs, and what to compare before choosing one.$e2$,
$c8$<h2 id="the-basic-options">The Basic Options</h2>
<p>Money generally moves across the border one of three ways: a bank-to-bank transfer, a cash-pickup service, or a mobile/digital wallet. Each has different speed, cost, and convenience tradeoffs, and availability varies a lot by country.</p>

<h2 id="what-actually-drives-cost">What Actually Drives the Cost</h2>
<p>The advertised "fee" is only part of the real cost. The exchange rate markup — the gap between the rate a service gives you and the real market rate — is often the larger hidden cost, especially with services that advertise "no fee" transfers.</p>

<h2 id="cash-pickup-vs-bank-deposit">Cash Pickup vs. Bank Deposit</h2>
<p>Cash pickup is faster to access if the recipient doesn't have a bank account, but usually costs more. A bank deposit is often cheaper but requires the recipient to have an account and can take longer to arrive.</p>

<h2 id="compare-before-you-send">Compare Before You Send</h2>
<p>Fees, rates, and availability change often and vary by country corridor. See the Resources section's money transfer comparison for current provider options.</p>$c8$,
  true, 3, current_date,
  ARRAY['money transfer','banking','remittance']::text[],
  ARRAY['mexico','el-salvador','guatemala','honduras']::text[],
  'MONEY_TRANSFER'
)
on conflict (slug) do nothing;

insert into articles (
  title, slug, category, excerpt, content, published,
  reading_time_minutes, last_updated_at, tags, related_country_slugs, affiliate_category
) values (
  'Finding Work After Deportation: Where to Start',
  'finding-work-overview',
  'jobs',
$e3$Practical starting points for finding income after returning — local work, remote work, and building new skills.$e3$,
$c9$<h2 id="two-broad-paths">Two Broad Paths</h2>
<p>Most people rebuilding income after deportation end up pursuing one or both of two broad paths: finding local work in the destination country, or continuing to earn from clients or employers abroad through remote work.</p>

<h2 id="local-work">Local Work</h2>
<p>Local job markets, required documentation, and typical wages vary enormously by country. The "Find Work" section on your specific country guide covers what's realistic to expect and where people commonly look first.</p>

<h2 id="remote-and-freelance-work">Remote and Freelance Work</h2>
<p>Time spent in the U.S. often comes with skills — English fluency, customer service, trades, or specific technical skills — that can translate into remote work for U.S.-based clients or companies, paid into an account like Payoneer or a similar service. This is not guaranteed income, but it is a real path worth exploring.</p>

<h2 id="building-new-skills">Building New Skills</h2>
<p>Free and low-cost online courses can help build or certify skills that are in demand locally or remotely. See the Career Training options in the Resources section for a starting point.</p>$c9$,
  true, 3, current_date,
  ARRAY['jobs','remote work','career']::text[],
  ARRAY['mexico','el-salvador','guatemala','honduras','laos']::text[],
  'CAREER_TRAINING'
)
on conflict (slug) do nothing;

insert into articles (
  title, slug, category, excerpt, content, published,
  reading_time_minutes, last_updated_at, tags, related_country_slugs, affiliate_category
) values (
  'Finding Housing in a New or Unfamiliar City',
  'finding-housing-overview',
  'housing',
$e4$What to expect when looking for a place to live after arriving — costs, neighborhoods, and common first steps.$e4$,
$c10$<h2 id="short-term-first">Think Short-Term First</h2>
<p>Committing to a long lease before understanding a city's neighborhoods, commute patterns, and real cost of living is a common early mistake. A short-term rental or staying with family or contacts for the first few weeks buys time to make a better long-term choice.</p>

<h2 id="what-drives-cost">What Drives the Cost</h2>
<p>Rent varies enormously by neighborhood and by proximity to the city center, transit, and job opportunities. Utilities, informal "key money" deposits, and agent fees are common in many countries and are easy to underestimate when budgeting.</p>

<h2 id="what-to-ask-before-signing-anything">What to Ask Before Signing Anything</h2>
<ul>
<li>What is actually included in the rent — utilities, water, internet?</li>
<li>What documentation does the landlord require?</li>
<li>Is there a written agreement, and in what language?</li>
</ul>

<h2 id="country-specific-detail">Country-Specific Detail</h2>
<p>Housing norms differ significantly by country — see your specific country guide's housing section for local detail on typical costs and neighborhoods.</p>$c10$,
  true, 3, current_date,
  ARRAY['housing','rent','relocation']::text[],
  ARRAY['mexico','el-salvador','guatemala','honduras','laos']::text[],
  null
)
on conflict (slug) do nothing;

insert into articles (
  title, slug, category, excerpt, content, published,
  reading_time_minutes, last_updated_at, tags, related_country_slugs, affiliate_category
) values (
  'Helping Family Plan a Visit',
  'family-visit-overview',
  'family',
$e5$What families typically need to plan ahead of a visit — documents, costs, and where to find country-specific detail.$e5$,
$c11$<h2 id="documents-first">Documents Come First</h2>
<p>Before anything else, confirm exactly which travel documents the visiting family member needs and how long they take to obtain — passports, visas if required, and any documentation tied to the person being visited.</p>

<h2 id="budgeting-the-trip">Budgeting the Trip</h2>
<p>Flights, accommodation, local transportation, and everyday costs during the stay add up quickly. Booking flights and accommodation earlier generally costs less, especially around holidays.</p>

<h2 id="planning-around-work-and-school">Planning Around Work and School</h2>
<p>Coordinating trip timing around both the visitor's work schedule and, where relevant, school schedules on the other end makes for a smoother trip for everyone involved.</p>

<h2 id="see-the-full-guide">See the Full Guide</h2>
<p>The Family Visit Travel section covers flights, hotels, travel insurance, and connectivity options in more detail, with country-specific visit information available on each country guide.</p>$c11$,
  true, 3, current_date,
  ARRAY['family','visit','travel planning']::text[],
  ARRAY['mexico','el-salvador','guatemala','honduras','laos']::text[],
  'FLIGHTS'
)
on conflict (slug) do nothing;

insert into articles (
  title, slug, category, excerpt, content, published,
  reading_time_minutes, last_updated_at, tags, related_country_slugs, affiliate_category
) values (
  'Travel Documents: What You Need to Know',
  'travel-documents-overview',
  'travel',
$e6$A general overview of travel documents relevant to deportees and their families — passports, visas, and border logistics.$e6$,
$c12$<h2 id="the-basics">The Basics</h2>
<p>A valid passport is the baseline requirement for nearly all international travel. Processing times for a new or renewed passport vary by country and can take weeks — starting early avoids last-minute problems.</p>

<h2 id="visas-for-visiting-family">Visas for Visiting Family</h2>
<p>Whether a U.S.-based family member needs a visa to visit depends entirely on their citizenship and the destination country's rules. This is worth confirming directly with the destination country's embassy or consulate rather than assuming.</p>

<h2 id="documents-tied-to-a-case">Documents Tied to an Immigration Case</h2>
<p>Keep copies — not just originals — of any immigration court paperwork, orders, or receipts. These documents can matter for future filings or waiver applications, sometimes years later.</p>

<h2 id="country-specific-detail">Country-Specific Detail</h2>
<p>Each country guide includes an embassy and travel-documents section with more specific, local detail.</p>$c12$,
  true, 3, current_date,
  ARRAY['travel','documents','passport']::text[],
  ARRAY['mexico','el-salvador','guatemala']::text[],
  null
)
on conflict (slug) do nothing;

insert into articles (
  title, slug, category, excerpt, content, published,
  reading_time_minutes, last_updated_at, tags, related_country_slugs, affiliate_category
) values (
  'Finding Healthcare in a New Country',
  'healthcare-overview',
  'healthcare',
$e7$What to know about accessing healthcare after arriving somewhere new — public systems, private options, and coverage gaps.$e7$,
$c13$<h2 id="public-vs-private">Public vs. Private Care</h2>
<p>Many countries offer some form of public healthcare system, but access, cost, and quality vary enormously. In the near term, understanding what's actually available locally matters more than any general rule.</p>

<h2 id="the-coverage-gap">The Coverage Gap</h2>
<p>The period right after arrival — before enrolling in any local system — is often the highest-risk time for an unexpected medical cost. A short-term international health plan can bridge that gap while longer-term options are sorted out.</p>

<h2 id="emergency-care">Emergency Care</h2>
<p>Know the local emergency number and the nearest hospital before you need them, not after. Each country guide's healthcare section lists this detail specifically.</p>

<h2 id="mental-health-too">Don't Forget Mental Health</h2>
<p>Physical healthcare is only part of the picture — see the Mental Health category for resources specific to the emotional impact of deportation.</p>$c13$,
  true, 3, current_date,
  ARRAY['healthcare','insurance','medical']::text[],
  ARRAY['mexico','el-salvador','guatemala','honduras','laos']::text[],
  'HEALTH_INSURANCE'
)
on conflict (slug) do nothing;

insert into articles (
  title, slug, category, excerpt, content, published,
  reading_time_minutes, last_updated_at, tags, related_country_slugs, affiliate_category
) values (
  'Coping With the Emotional Impact of Deportation',
  'mental-health-overview',
  'mental-health',
$e8$Deportation is a genuine loss and disruption. Practical, non-clinical starting points for coping and finding support.$e8$,
$c14$<h2 id="its-a-real-loss">It's a Real Loss, Not Just a Logistics Problem</h2>
<p>Losing a home, a community, a job, and often direct contact with family is a genuine loss — grief, anger, and anxiety are common and expected reactions, not signs of weakness.</p>

<h2 id="what-can-help">What Can Help</h2>
<p>Staying connected with family and community, keeping a routine, and finding local or online support groups of people who understand the specific experience of deportation can all help, even when circumstances themselves haven't changed.</p>

<h2 id="if-things-feel-heavier-than-usual">If Things Feel Heavier Than Usual</h2>
<p>Persistent hopelessness, inability to function day-to-day, or thoughts of self-harm are signs it's time to reach out to a mental health professional or a crisis line where available — not something to push through alone.</p>

<h2 id="where-to-look">Where to Look</h2>
<p>Community organizations, faith communities, and in some cities dedicated support groups for returnees exist. Ask locally — word of mouth often surfaces resources that don't show up in a general search.</p>$c14$,
  true, 3, current_date,
  ARRAY['mental health','support','coping']::text[],
  ARRAY['mexico','el-salvador','guatemala','honduras','laos']::text[],
  null
)
on conflict (slug) do nothing;

insert into articles (
  title, slug, category, excerpt, content, published,
  reading_time_minutes, last_updated_at, tags, related_country_slugs, affiliate_category
) values (
  'Staying Connected: Phones and Internet',
  'technology-overview',
  'technology',
$e9$How to get phone and internet access quickly after arriving, and what tends to be worth paying for.$e9$,
$c15$<h2 id="getting-connected-fast">Getting Connected Fast</h2>
<p>An eSIM purchased before arrival can provide internet access from the moment you land, before finding a local SIM card or carrier — useful for maps, messaging family, and looking up information in the first hours and days.</p>

<h2 id="local-sim-vs-esim">Local SIM vs. eSIM</h2>
<p>A local SIM card is usually cheaper for longer stays and gives you a local phone number, but requires finding a carrier store and often local ID. An eSIM is faster to set up but often costs more per gigabyte for extended use.</p>

<h2 id="staying-in-touch-with-family">Staying in Touch With Family</h2>
<p>Messaging apps that work over WiFi or data (rather than traditional calling/SMS) are usually the cheapest way to stay in regular contact with family in the U.S., and work well even on a data-only eSIM plan.</p>

<h2 id="country-specific-options">Country-Specific Options</h2>
<p>See your country guide's phone and internet section for local carrier options and typical costs.</p>$c15$,
  true, 2, current_date,
  ARRAY['technology','esim','internet']::text[],
  ARRAY['mexico','el-salvador','guatemala','honduras','laos']::text[],
  'VPN'
)
on conflict (slug) do nothing;

insert into articles (
  title, slug, category, excerpt, content, published,
  reading_time_minutes, last_updated_at, tags, related_country_slugs, affiliate_category
) values (
  'Starting Over: The First Few Weeks',
  'starting-over-overview',
  'starting-over',
$e10$A practical framing for the first weeks after arriving somewhere new — what to prioritize, and what can wait.$e10$,
$c16$<h2 id="the-first-week">The First Week: Stability, Not Progress</h2>
<p>The first week is about getting stable — a safe place to sleep, a working phone, and knowing where the nearest hospital and a source of food are. It is not the week to solve everything at once.</p>

<h2 id="the-first-month">The First Month: Documents and Direction</h2>
<p>Once the basics are handled, the first month is a reasonable window to sort out identity documents, understand local work options, and start budgeting realistically based on actual local costs rather than assumptions.</p>

<h2 id="build-a-support-network">Build a Support Network Early</h2>
<p>Community organizations, extended family, and local returnee groups — where they exist — can shortcut a lot of trial and error. Asking for help early is faster than learning everything alone.</p>

<h2 id="use-the-country-guide">Use Your Country Guide</h2>
<p>The "First 30 Days" section of your specific country guide is written for exactly this window and covers local detail this overview can't.</p>$c16$,
  true, 3, current_date,
  ARRAY['starting over','first 30 days','rebuilding']::text[],
  ARRAY['mexico','el-salvador','guatemala','honduras','laos']::text[],
  null
)
on conflict (slug) do nothing;

insert into articles (
  title, slug, category, excerpt, content, published,
  reading_time_minutes, last_updated_at, tags, related_country_slugs, affiliate_category
) values (
  'Real Stories From People Who Have Rebuilt',
  'success-stories-overview',
  'success-stories',
$e11$An introduction to the Success Stories section — real experiences from people who have rebuilt their lives after deportation.$e11$,
$c17$<h2 id="why-stories-matter">Why These Stories Matter</h2>
<p>General information can only go so far. Hearing from people who have actually gone through this — what worked, what they wish they'd known, what surprised them — fills in the gaps that a guide alone can't.</p>

<h2 id="what-to-expect">What to Expect</h2>
<p>Every story here reflects one person's specific circumstances, country, and timeline. None of them are a guarantee of a similar outcome for anyone else, but together they show the range of what rebuilding can look like.</p>

<h2 id="share-your-own">Share Your Own Story</h2>
<p>If you've rebuilt after deportation and are willing to share what you learned, your experience could genuinely help someone just starting out. See the Contact page to get in touch.</p>$c17$,
  true, 2, current_date,
  ARRAY['success stories','community']::text[],
  ARRAY['mexico','el-salvador','guatemala','honduras','laos']::text[],
  null
)
on conflict (slug) do nothing;

insert into articles (
  title, slug, category, excerpt, content, published,
  reading_time_minutes, last_updated_at, tags, related_country_slugs, affiliate_category
) values (
  'Staying Informed: Policy and News That Affects You',
  'news-policy-overview',
  'news',
$e12$Why immigration policy changes matter even after a case is resolved, and how to follow developments that matter.$e12$,
$c18$<h2 id="policy-doesnt-stand-still">Policy Doesn't Stand Still</h2>
<p>Immigration law and enforcement priorities change over time, sometimes significantly. A rule or bar that applies today may be interpreted or applied differently in the future — which is exactly why "wait and see" is sometimes a genuine part of a long-term legal strategy, not just passivity.</p>

<h2 id="what-to-watch-for">What's Worth Watching</h2>
<p>Changes to waiver eligibility, re-entry bar policy, and country-specific enforcement priorities are the categories of news most likely to actually affect someone's individual options over time.</p>

<h2 id="verify-before-acting">Verify Before Acting on News</h2>
<p>Immigration news is often summarized in ways that lose important detail. Before making any decision based on a policy change you've heard about, confirm the actual rule — ideally with an immigration attorney — rather than acting on a headline.</p>

<h2 id="check-back-here">Check Back Here</h2>
<p>This category will be updated as the Knowledge Center grows. For now, treat any specific legal question as one for an attorney, not a news article.</p>$c18$,
  true, 3, current_date,
  ARRAY['news','policy']::text[],
  ARRAY['mexico','el-salvador','guatemala']::text[],
  null
)
on conflict (slug) do nothing;
