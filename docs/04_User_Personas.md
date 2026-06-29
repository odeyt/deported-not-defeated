# User Personas — DeportedNotDefeated.com

**Version:** 1.0  
**Last Updated:** 2026-06-29  
**Owner:** Project Lead  
**Status:** Active  
**Cross-References:** `00_Project_Vision.md`, `01_Product_Strategy.md`

---

## Table of Contents

1. [Persona Framework](#persona-framework)
2. [Persona 1: Recently Deported Adult (Crisis Stage)](#persona-1-recently-deported-adult-crisis-stage)
3. [Persona 2: Long-Term Rebuilder (Stability Stage)](#persona-2-long-term-rebuilder-stability-stage)
4. [Persona 3: U.S.-Based Spouse / Partner](#persona-3-us-based-spouse--partner)
5. [Persona 4: U.S.-Born Adult Child of Deported Parent](#persona-4-us-born-adult-child-of-deported-parent)
6. [Persona 5: Person Planning Voluntary Departure](#persona-5-person-planning-voluntary-departure)
7. [Persona 6: Immigration Attorney](#persona-6-immigration-attorney)
8. [Persona 7: NGO Case Worker](#persona-7-ngo-case-worker)
9. [Persona 8: Employer in Destination Country](#persona-8-employer-in-destination-country)
10. [Persona 9: Journalist / Researcher](#persona-9-journalist--researcher)
11. [Persona Comparison Matrix](#persona-comparison-matrix)
12. [Design Implications](#design-implications)

---

## Persona Framework

Each persona captures seven dimensions:

1. **Background** — Who they are and how they got here
2. **Goals** — What they are trying to accomplish
3. **Pain Points** — What is currently making their life harder
4. **Questions** — The specific questions they bring to the platform
5. **Device & Access** — How they are likely to reach the site
6. **Language Preferences** — Primary and secondary languages
7. **Emotional State** — Their psychological context when using the platform
8. **Likely Conversion Path** — What actions they are most likely to take

These personas are composites of real patterns in deportation cases across the 45 destination countries served by the platform. They are not meant to capture every possible user — they are designed to help the team make product decisions by keeping real humans at the center of those decisions.

---

## Persona 1: Recently Deported Adult (Crisis Stage)

### "Marco" — 34 years old, deported to El Salvador

**Background:**  
Marco was brought to the United States from El Salvador at age 8. He grew up in Los Angeles, attended American schools, worked in construction for 12 years, and has two U.S.-born children. He was detained during a routine traffic stop, held for 6 months, and deported. He arrived in San Salvador with $200 in cash, the clothes he was wearing, and a phone that still works but has no local SIM card. He has not been to El Salvador since he was a child. He speaks Spanish but has no Salvadoran contacts, no local bank account, and no housing. He has not slept in a bed in 48 hours.

**Goals:**
- Find somewhere safe to sleep in the next 24 hours
- Get a working phone number so his wife can reach him
- Receive money from his wife in Los Angeles
- Figure out if he can ever go back to his children
- Eventually find work and build a stable life

**Pain Points:**
- Does not know the local geography, safe neighborhoods, or current prices
- His phone's US plan does not work; he borrowed a stranger's WiFi at the airport
- He is afraid of asking strangers for help — doesn't know who to trust
- He has $200 and doesn't know how long it will need to last
- He is trying to stay calm for his children during phone calls, while being terrified
- He doesn't know where the nearest immigration attorney is
- Government websites are confusing, often in Spanish he doesn't fully understand (formal vs. colloquial differences)

**Questions:**
- "Where is a safe and cheap place to sleep tonight in San Salvador?"
- "How do I get a Salvadoran phone number?"
- "How does my wife send me money from the US?"
- "Can I ever come back to my kids?"
- "What do I do first? What's most urgent?"
- "Is there anyone who can help me? An organization, a church, anyone?"

**Device & Access:**
- Smartphone (Android, mid-range model, US-bought)
- WiFi-dependent until he gets a local SIM
- Data is precious — will not watch videos; needs text-based information
- One-handed use while standing, walking, in public spaces

**Language:**
- Spanish (spoken fluency, partial reading difficulty with formal/legal text)
- English (high fluency — sometimes easier for him to read than formal Spanish)
- Preference: Spanish for emotional comfort, English for complex instructions (paradoxically)

**Emotional State:**
- Fear, disorientation, grief
- Adrenaline-driven decision-making — needs short, clear, prioritized instructions
- Minimal capacity for absorbing complex information
- Hypervigilant about safety — will distrust anything that seems too good or too easy

**Search Behavior:**
- Mobile Google search in English and Spanish
- Searches: "what to do after deportation El Salvador", "how to get money from USA to El Salvador", "safe places to sleep El Salvador", "deportado que hacer"
- Likely arrives via search engine, not direct navigation

**Likely Conversion Path:**
1. Lands on `/el-salvador` country guide from search
2. Reads First 30 Days section
3. Clicks on housing section
4. Clicks money transfer link (Remitly or Wise)
5. Downloads checklist after email capture
6. Returns in 2–3 days for employment information

**Design Priority:** Persona 1 is the **primary design constraint** for the platform. If a feature works for Marco in his first 48 hours — on a phone, with limited data, under stress — it works for everyone.

---

## Persona 2: Long-Term Rebuilder (Stability Stage)

### "Phuong" — 41 years old, deported to Vietnam, 14 months ago

**Background:**  
Phuong has been in Vietnam for 14 months. She was deported after 18 years in the United States. She now has a shared apartment in Ho Chi Minh City, a part-time remote job writing content for a U.S. company (found through Upwork), and is slowly reconnecting with extended family she barely knows. Her English is excellent. She sends money home to her U.S.-born teenage son regularly. Her immediate crisis is over — she is in the "stability and growth" phase.

**Goals:**
- Grow her remote income to cover her full living expenses
- Find better remote work opportunities that use her English fluency
- Understand whether she can ever apply to return to the U.S.
- Help other recently deported Vietnamese-Americans who reach out to her online
- Improve her Vietnamese language skills for professional settings

**Pain Points:**
- Remote income is inconsistent — platform fees on Upwork reduce her earnings significantly
- She feels isolated — her Vietnamese friends don't understand her American background, and her American friends don't understand her current life
- She has a lot of knowledge to share but no platform to share it
- Legal information about return pathways is confusing and contradictory online

**Questions:**
- "What are the best remote work platforms for someone with English fluency?"
- "What are the real odds I can get a visa to visit my son?"
- "Are there other deported Americans in Vietnam I can connect with?"
- "What professional certifications would make me more valuable remotely?"
- "How do I write a résumé for U.S. employers when I'm based overseas?"

**Device & Access:**
- Laptop (primary) for work; smartphone for browsing
- Reliable WiFi at home and at café she works from
- Data is not a constraint
- Reads in depth — will engage with long-form content

**Language:**
- English (primary — all professional work done in English)
- Vietnamese (improving; uses it in daily life but prefers English for complex reading)

**Emotional State:**
- More stable than crisis stage — but underlying grief and longing persist
- Motivated and forward-focused; has moved past acute trauma
- Has some resentment toward the U.S. immigration system; this can flare up
- Skeptical of generic immigration advice; has been misled before
- Community-oriented — wants to give back

**Search Behavior:**
- Uses Google on laptop, direct URL navigation to trusted sites
- Searches: "best remote work for deportees", "can deported person visit USA on tourist visa", "online certifications for better remote pay", "deported community Vietnam"
- Reads full articles, not just summaries

**Likely Conversion Path:**
1. Direct navigation or returning visitor
2. Reads Career & Education section
3. Clicks through to online course platforms
4. Completes AI immigration assessment for updated legal analysis
5. Submits success story (future feature)
6. Joins newsletter for ongoing resources

---

## Persona 3: U.S.-Based Spouse / Partner

### "Diane" — 38 years old, Los Angeles, CA

**Background:**  
Diane's husband Carlos was deported to Guatemala 4 months ago. She has two children, ages 7 and 11. She is a U.S. citizen. She works as a home healthcare worker. Carlos is in Guatemala City; she talks to him every day on video call. She is planning to visit him for two weeks this summer — the first time she will have ever traveled internationally. She has no passport yet. She has $2,400 saved for the trip.

**Goals:**
- Plan a safe and affordable two-week visit to Guatemala
- Know exactly what documents she needs and how to get them
- Send Carlos money reliably every two weeks
- Help her children stay emotionally connected to their father
- Understand if there is any legal path to bring Carlos back or reunite the family

**Pain Points:**
- Has never traveled outside the U.S. — the entire process feels overwhelming
- Doesn't know whether it's safe to visit; news coverage of Guatemala is frightening
- Doesn't know how much money to budget for the trip
- Travel agent quotes feel expensive and generic
- Sending money is inconsistent — she has tried three different services and had problems with each

**Questions:**
- "Is it safe to visit Guatemala City as a U.S. woman traveling alone?"
- "How much should I budget for two weeks in Guatemala?"
- "What is the easiest way to send money to Guatemala from the US?"
- "Do I need a visa to visit Guatemala?"
- "What neighborhoods are safe to stay in near Carlos?"
- "Is there any way to get a humanitarian visa for Carlos to visit our kids?"

**Device & Access:**
- Smartphone (iPhone, mid-range) for quick lookups
- Laptop at home for detailed research
- Comfortable with online booking and form-filling
- Uses Facebook groups for community support

**Language:**
- English (native)
- Spanish (basic conversational — can read some Spanish with effort)

**Emotional State:**
- Anxious about the trip — unfamiliar territory
- Determined — she is going, the planning is a form of agency
- Financial anxiety — every dollar spent on the trip is a dollar not in the family budget
- Emotionally exhausted from the separation but resilient
- Protective of her children — safety is paramount

**Search Behavior:**
- Searches: "is Guatemala City safe for tourists", "how to visit Guatemala on a budget", "cheapest way to send money to Guatemala", "what documents do I need to visit Guatemala"
- High-intent searches — ready to book when she finds the right information
- Will share good resources in Facebook groups

**Likely Conversion Path:**
1. Discovers platform via Facebook group share or Google search
2. Lands on `/family-visit-travel`
3. Uses country selector → `/guatemala` country-specific visit section
4. Uses budget calculator
5. Clicks flight affiliate (Skyscanner)
6. Books travel insurance (SafetyWing)
7. Downloads travel checklist (Before Booking, Before Departure, After Arrival)

---

## Persona 4: U.S.-Born Adult Child of Deported Parent

### "Jordan" — 23 years old, Houston, TX

**Background:**  
Jordan's father was deported to Honduras when Jordan was 19. Jordan is a U.S. citizen, goes to college, and works part-time. They talk to their father monthly. Jordan feels deep guilt about not being able to do more — their U.S. citizenship feels like a privilege their father doesn't share. They have been researching legal options on and off for three years and want to take concrete action.

**Goals:**
- Understand if there is any legal path for their father to return
- Connect with others in similar situations
- Visit their father when they can afford to
- Feel like they are doing something — rather than passive grief

**Pain Points:**
- Most legal information online is confusing, contradictory, or obviously out of date
- Attorneys are expensive and hard to evaluate
- The emotional weight of the situation makes it hard to research without breaking down
- They don't have much money to contribute — student loans, part-time income

**Questions:**
- "Can my father return to the US if I'm a US citizen?"
- "Can I petition for my deported parent?"
- "What is the 10-year bar? Does it apply to my dad?"
- "How do I find a trustworthy immigration attorney who won't rip us off?"
- "What should I know before visiting Honduras?"

**Device & Access:**
- Smartphone and laptop, both comfortable
- Heavy social media user (Instagram, TikTok, Reddit)
- Will share good content with friends in similar situations

**Language:**
- English (native)
- Spanish (partial — understands more than they speak)

**Emotional State:**
- Complex grief, guilt, anger
- Motivated by action — passivity is psychologically harder than research
- Skeptical of generic "hope" content; needs real, honest information
- Digitally sophisticated — will detect SEO content vs. genuine expertise quickly

**Likely Conversion Path:**
1. Reaches platform via Google for legal questions
2. Reads legal resources section
3. Completes AI immigration assessment on behalf of their father
4. Researches family visit travel section
5. Newsletter subscriber for ongoing updates

---

## Persona 5: Person Planning Voluntary Departure

### "Anita" — 45 years old, still in the United States (Indiana)

**Background:**  
Anita has lived in the U.S. for 22 years. She received a final deportation order 8 months ago. Her attorney told her that voluntary departure is better than forced deportation for her long-term legal options. She has 90 days to depart. She is preparing to go to the Philippines, where she was born, and where she has a sister. She has never used the platform before, but a friend recommended it.

**Goals:**
- Understand exactly what voluntary departure means vs. forced deportation for her future options
- Plan her arrival in the Philippines — she hasn't been there in 15 years
- Get her finances organized — bank account, money transfers, selling belongings
- Connect with her U.S.-born college-age daughter who will remain in the U.S.
- Know what her life will look like in the first 90 days

**Pain Points:**
- Every decision is urgent — she has 90 days and a lot to do
- She is grieving a life she has spent 22 years building
- Information online is geared toward people who have already been deported, not those preparing
- Her Philippines family connections are thin — she lost touch after so many years

**Questions:**
- "Is voluntary departure really better than being deported? How?"
- "What should I do to prepare financially before I leave?"
- "What will my first 30 days in the Philippines look like?"
- "How do I get a Philippine national ID when I've been gone 15 years?"
- "How do I find work in the Philippines using my U.S. experience?"
- "How do I stay close to my daughter?"

**Device & Access:**
- Laptop (primary) and smartphone
- Careful, deliberate researcher — bookmarks pages, takes notes
- Will return to the site multiple times over 90-day preparation window

**Language:**
- English (primary)
- Tagalog (can speak; reading is difficult)

**Emotional State:**
- Planning mode — grief is present but channeled into preparation
- Highly motivated to make the best of a situation she cannot change
- Values accuracy and specificity over reassurance

**Likely Conversion Path:**
1. Finds platform via attorney recommendation or search
2. Reads `/legal-resources` for voluntary departure information
3. Navigates to `/philippines` country guide — reads extensively
4. Subscribes to newsletter for ongoing country updates
5. Downloads checklist
6. Returns weekly for detailed planning

---

## Persona 6: Immigration Attorney

### "Claire" — 39 years old, Miami, FL

**Background:**  
Claire runs a boutique immigration law firm with 4 attorneys. About 30% of her cases involve clients who are facing or have received deportation orders. She frequently gets asked by clients: "What will my life look like if I'm deported?" She cannot answer this well within a legal consultation — it's outside her scope. She has been looking for a resource she can confidently recommend to clients for years.

**Goals:**
- Find a resource she trusts enough to give to clients
- Verify that the legal content is accurate and appropriately disclaimed
- Stay updated on country-specific practical information (her clients go to Mexico, Honduras, DR, Jamaica)
- Eventually: list her firm in an attorney directory if one exists

**Pain Points:**
- Most "deportation resources" online are either advocacy content or inaccurate amateur information
- She has been burned before recommending websites that clients later found misleading
- She doesn't have time to vet content deeply — needs to trust at a glance

**Questions (evaluation questions):**
- "Does this site clearly disclaim that it is not providing legal advice?"
- "Is the legal content accurate and up to date?"
- "Would a recently deported client actually find this useful, or is it too general?"
- "Is this professionally presented enough that I can send it to clients without embarrassment?"
- "Is there a way to list my firm here if I want to?"

**Device & Access:**
- Laptop (office)
- High information literacy — will evaluate quickly and thoroughly

**Language:**
- English (primary); Spanish (professional level for client communication)

**Emotional State:**
- Professional, evaluative, skeptical
- Time-constrained — first impression matters enormously
- Will become a powerful referral source if the platform meets her standards

**Likely Conversion Path:**
1. Discovers platform via colleague recommendation or search
2. Reviews legal disclaimer pages
3. Reviews legal content for accuracy
4. Bookmarks several country guides
5. Begins recommending to relevant clients
6. Lists firm in attorney directory (future)

---

## Persona 7: NGO Case Worker

### "David" — 31 years old, Mexico City

**Background:**  
David works for a small NGO in Mexico City that provides transitional support to recently deported individuals in their first 60 days. He has a caseload of 15–20 active clients at any time. He gives out printed resource sheets to clients but is always looking for better digital resources to recommend. He does not speak English well, but his clients do (many were deported from the U.S.).

**Goals:**
- Find a resource he can share with English-speaking deported clients
- Access country-specific practical information that is more current than his organization's printed guides
- Understand what specific help the platform can offer vs. what it cannot
- Stay updated on services available to deportees in Mexico

**Pain Points:**
- His organization's printed guides go out of date quickly
- Many NGO resources are in English, which makes it hard for him to evaluate them for clients
- His clients need digital resources — he often helps them access information on their phone
- He is skeptical of platforms that make legal promises or create unrealistic expectations

**Likely Conversion Path:**
1. Discovers platform through network or peer recommendation
2. Navigates `/mexico` guide — shares it with relevant clients
3. Bookmarks platform as a go-to recommendation
4. Potentially becomes a data source for local directory listings

---

## Persona 8: Employer in Destination Country

### "Maria" — 44 years old, Guatemala City

**Background:**  
Maria runs a mid-size call center in Guatemala City. She actively recruits English-speaking workers. Deported individuals with American backgrounds are extremely valuable to her — they are native-level English speakers with U.S. work experience and professionalism. She has informally hired several deported workers who approached her and has been impressed. She wants a more systematic way to find them.

**Goals:**
- Find qualified English-speaking job candidates in Guatemala City
- Post job listings to reach deported individuals specifically
- Build a talent pipeline of U.S.-experienced workers

**Likely Conversion Path:**
1. Discovers platform via peer recommendation or search
2. Reviews `/guatemala/find-work` section
3. Interest in future employer marketplace listing
4. Posts job listing when employer marketplace launches

---

## Persona 9: Journalist / Researcher

### "Alex" — 29 years old, Washington, D.C.

**Background:**  
Alex is a journalist covering immigration and deportation policy for a digital news outlet. They frequently write about the human experience of deportation and are looking for both data and personal stories. They are also working on a longer-form piece about how deported individuals rebuild their lives.

**Goals:**
- Understand what practical information is available to deportees
- Find story leads — individuals willing to share their experience
- Cite accurate statistics and country-specific information
- Evaluate the platform as a potential source for a story

**Likely Conversion Path:**
1. Discovers platform via search or peer recommendation
2. Reviews country guides for accuracy and depth
3. May request an interview with the platform founder
4. Cites platform in article → generates referral traffic

---

## Persona Comparison Matrix

| Dimension | Marco (Crisis) | Phuong (Rebuilder) | Diane (Family) | Jordan (Child) | Anita (Voluntary) | Claire (Attorney) |
|-----------|---------------|-------------------|----------------|----------------|-------------------|-------------------|
| Device | Mobile (data-limited) | Laptop + Mobile | Mobile + Laptop | Mobile | Laptop | Laptop |
| Language | Spanish/English | English | English | English | English | English/Spanish |
| Emotional state | Crisis | Stable | Anxious | Grief | Planning | Professional |
| Session length | Short (crisis) | Long | Medium | Long | Long | Short (evaluating) |
| Depth needed | Immediate action items | Detailed career info | Travel planning | Legal pathways | Preparation planning | Trust signals |
| Affiliate value | Medium (remittance) | Medium (career tools) | High (travel) | Low | Medium | Low (referral source) |
| Return visits | High (ongoing needs) | High | Medium | Medium | High (planning) | Low then ongoing |
| Newsletter value | High | High | Medium | Medium | High | Low |

---

## Design Implications

These personas surface several non-obvious design requirements:

### 1. Speed and Simplicity for Persona 1
Marco in crisis is the most constrained user. Every page must load within 3 seconds on a mid-range Android with a 4G connection. Content must be scannable within 30 seconds. The most critical information (where to sleep, how to get money) must be in the first screen.

### 2. Depth and Return-Ability for Personas 2 and 5
Phuong and Anita are repeat, deep-reading users. The site must reward multiple visits with new information (newsletter, returning user CTAs) and must allow users to pick up where they left off (bookmarkable sections, persistent page anchors).

### 3. Trust Signals are Critical for All Personas
Every persona arrives with some level of skepticism. Trust signals must be present immediately: clear disclaimer language, transparent affiliate disclosure, real photography (not stock art), no sensationalist headlines, and legal content that is careful and hedged.

### 4. Separate Paths for Family Members
Diane and Jordan are arriving with completely different questions than Marco. The navigation and content architecture must clearly separate the "I was deported" path from the "My family member was deported" path. The Family Visit Travel section serves this purpose, but the division should be reinforced in the homepage hero and navigation.

### 5. Attorney as a Trust Multiplier
If Claire recommends the platform to 50 clients per year, that is 50 high-intent users arriving with pre-established trust. Designing for Claire — clear disclaimers, accurate content, professional presentation — has a multiplier effect far beyond the single user.

### 6. NGO Partnership Potential
David in Mexico City is a multiplier similar to Claire. If the platform becomes the default recommendation from 10 NGOs serving deported populations, each serving 200 clients per year, that is 2,000 high-intent users per year from that channel alone. Making the platform easy for NGOs to recommend (clear URL, mobile-friendly, no account required) is a distribution strategy, not just a design choice.

---

*Document End — Version 1.0*
