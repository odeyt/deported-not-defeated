import type { CountryData } from "./schema";

const china: CountryData = {
  slug: "china",
  countryName: "China",
  countryCode: "CN",
  flagEmoji: "🇨🇳",
  region: "Asia",
  capital: "Beijing",
  languages: ["Mandarin Chinese"],
  currency: "Chinese Yuan (CNY)",
  summary:
    "China is the world's most populous nation (until recently) and the second-largest economy. Chinese-Americans deported to China may face the Great Firewall restricting internet access, requirements for a hukou (household registration) to access services, and a language barrier if they grew up speaking Cantonese or another dialect rather than Mandarin. Beijing and Shanghai are major economic centers, but Guangdong province (Guangzhou, Shenzhen) has traditionally been the origin region for many Chinese-Americans and may offer stronger community ties.",
  heroTitle: "Deported to China: Your Survival Guide",
  heroSubtitle:
    "Housing, documents, internet access, and practical resources for deportees rebuilding life in China.",
  cities: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen"],
  quickFacts: [
    { label: "Capital", value: "Beijing" },
    { label: "Language", value: "Mandarin Chinese (Putonghua)" },
    { label: "Currency", value: "Chinese Yuan / Renminbi (CNY/RMB)" },
    { label: "Emergency Number", value: "110 (Police) / 120 (Medical)" },
    { label: "U.S. Embassy", value: "Beijing (55 An Jia Lou Road, Chaoyang)" },
    { label: "U.S. Consulates", value: "Shanghai, Guangzhou, Chengdu, Shenyang" },
    { label: "Time Zone", value: "UTC+8 (China Standard Time — no daylight saving)" },
  ],
  returningHome: [
    "Chinese nationals returning from deportation arrive at major international airports — Ministry of Public Security handles immigration.",
    "Obtain your Resident Identity Card (居民身份证, Jūmín Shēnfènzhèng) at your local public security bureau (派出所).",
    "A hukou (户口, household registration) is required to access most government services — register at your local派出所 using your family's household registration.",
    "Contact family in your home province before departure if possible — family connections are critical for housing and document access.",
    "Consider that internet access to many U.S. services (Google, Facebook, WhatsApp) will be restricted — plan for VPN needs (note: VPN use has legal restrictions in China).",
  ],
  travelDocuments: [
    "The Resident Identity Card (身份证) is China's national ID — apply at your local公安局派出所 with your hukou registration.",
    "A Chinese passport is available through the Exit-Entry Administration Bureau once you have your 身份证.",
    "Hukou registration is the foundation for most documents — you must be registered in a household.",
    "Birth certificates can be obtained from civil affairs offices in your city of birth.",
    "U.S. citizen children retain their U.S. passports — note the U.S. Embassy can assist but U.S.-China relations may affect service access.",
  ],
  embassyInfo:
    "Check the official U.S. Embassy website for China for current hours, services, and appointment requirements. Do not travel to the embassy without a scheduled appointment. The U.S. Embassy can assist with emergency passports and limited emergency services for U.S. citizens.",
  housing: [
    "Guangzhou and Shenzhen in Guangdong Province may be the most relevant for Chinese-Americans with family roots there — basic apartments in Guangzhou run CNY 1,500–4,000/month.",
    "Beijing and Shanghai are China's most expensive cities — working-class areas (Beijing: Fangshan, Daxing; Shanghai: Jiading, Qingpu) offer rents from CNY 2,000–4,000/month.",
    "Smaller cities in provinces like Fujian or Zhejiang (origin for many Chinese-Americans) may be more affordable.",
    "Anjuke.com and Lianjia (Beike) are the main real estate portals — Mandarin proficiency needed for these platforms.",
    "Family compounds (祖屋, zǔwū) in home villages are often available at no cost for returnees with rural family roots.",
  ],
  jobs: [
    "English teaching is in demand at private schools and language centers (EF, Wall Street English) across China.",
    "China's tech sector (Alibaba in Hangzhou, Tencent in Shenzhen, Baidu in Beijing, ByteDance) employs professionals in tech-adjacent roles.",
    "Foreign language ability (especially English) is valued in China's international business sectors.",
    "Zhaopin.com, Boss Zhipin, and LinkedIn China (which operates separately from global LinkedIn) are the main job portals.",
    "Manufacturing employment is widely available in Pearl River Delta and Yangtze River Delta industrial zones.",
  ],
  healthcare: [
    "China's public hospitals provide care to citizens with hukou registration in their city.",
    "NRCMS (New Rural Cooperative Medical Scheme) covers rural residents; Urban Resident Insurance covers city dwellers without formal employment.",
    "Major public hospitals (Peking Union Medical College Hospital, Ruijin Hospital in Shanghai) are well-equipped.",
    "Private international hospitals (United Family Healthcare, Raffles Medical) serve expats and those with means.",
    "Traditional Chinese Medicine (TCM) clinics and hospitals are widely available and often covered by public insurance.",
  ],
  mentalHealth: [
    "Mental health services in China are provided through psychiatric hospitals and departments in general hospitals.",
    "Anding Hospital in Beijing and Shanghai Mental Health Center are major public facilities.",
    "Mental health stigma remains significant in China — many prefer private, informal, or online counseling.",
    "Online counseling platforms (Simple, KnowYourself) have emerged to address privacy concerns around in-person mental health treatment.",
    "Community and family support remain the primary mental health resource for most Chinese.",
  ],
  moneyTransfer: [
    "WeChat Pay and Alipay are China's dominant mobile payment platforms — essential for daily life (requires a Chinese bank account and phone number).",
    "Opening a bank account requires your 身份证 — Industrial and Commercial Bank (ICBC), Bank of China, and China Construction Bank are the major banks.",
    "International transfers to China have been more regulated in recent years — Western Union and Wise can transfer but verify current availability.",
    "UnionPay cards from Chinese banks allow ATM withdrawal of CNY.",
    "Receiving USD from family and exchanging at a bank or official money changer is one approach — be aware of China's annual exchange quota of USD $50,000.",
  ],
  phoneInternet: [
    "China Unicom, China Mobile, and China Telecom are the three state carriers.",
    "SIM cards require real-name registration with a 身份证 — without one, activation may be delayed.",
    "All major international social media and many Western websites are blocked by the Great Firewall — Google, YouTube, Facebook, WhatsApp, Instagram, Twitter/X are inaccessible without a VPN.",
    "WeChat is the essential communication platform — used for messaging, payments, services, and social networking.",
    "China's domestic mobile internet (Weibo, Douyin/TikTok China, Taobao) is fast and extensive — VPN needed for foreign sites.",
  ],
  transportation: [
    "China's rail network is the world's largest — high-speed trains (高铁) connect major cities at speeds up to 350 km/h.",
    "Beijing has 27 metro lines; Shanghai has 20 lines — fares from CNY 3–15.",
    "DiDi is China's main ride-hailing app (similar to Uber) — available in cities nationwide.",
    "Long-distance bus and domestic flights supplement rail for routes not well covered by HSR.",
    "Bike-sharing (Mobike, Hello Bike) is widely available in cities for short trips.",
  ],
  legalResources: [
    "China's Legal Aid Center (法律援助中心) provides free legal services for qualifying low-income individuals.",
    "The All China Lawyers Association can refer to private attorneys.",
    "The U.S. Embassy in Beijing or nearest U.S. Consulate can provide a list of attorneys for U.S. citizens.",
    "China's legal system operates under the Communist Party — independent advocacy is very limited.",
    "For human rights concerns, international organizations operate from outside China.",
  ],
  reentryInfo: [
    "Returning to the U.S. under a removal order without authorization could result in permanent inadmissibility.",
    "Some Chinese deportees hold U.S. citizenship — those individuals can return to the U.S. legally.",
    "Chinese community organizations in cities like Flushing (New York), Chinatown (San Francisco), and Monterey Park (Los Angeles) may have family support resources.",
    "CLINIC and AILA Pro Bono programs can connect you with post-deportation legal help.",
    "U.S. citizen children retain the right to return to the U.S. at any time.",
  ],
  faqs: [
    {
      question: "What is the Great Firewall and how will it affect me?",
      answer:
        "The Great Firewall is China's internet censorship system that blocks most Western social media (Facebook, Instagram, WhatsApp, YouTube, Google, Twitter/X) and many news sites. For daily communication, you will need to switch to Chinese apps (WeChat for messaging, Baidu for search, Weibo for social media). VPNs can bypass these restrictions but their use is legally restricted in China.",
    },
    {
      question: "What is the hukou and why does it matter so much?",
      answer:
        "The hukou (户口) is China's household registration system that ties your access to local services — education, healthcare, social benefits — to a specific location. If your family's hukou is in a village in Guangdong but you try to live in Beijing, you may face difficulties accessing local services. Register your hukou at your family's registered location as your first administrative priority.",
    },
    {
      question: "I speak Cantonese, not Mandarin — will I manage in China?",
      answer:
        "Cantonese is widely spoken in Guangdong Province (Guangzhou, Shenzhen) and Hong Kong. If you have family roots in Guangdong, settling there will be linguistically easier. In Beijing, Shanghai, and most other cities, Mandarin (Putonghua) is essential. Consider working with your home province community while you develop Mandarin skills through formal study.",
    },
    {
      question: "How do WeChat Pay and Alipay work?",
      answer:
        "WeChat Pay and Alipay are China's dominant mobile payment systems — used for almost everything from groceries to rent. They require a Chinese bank account linked to a Chinese phone number. Once set up, you scan QR codes to pay at virtually any business. Without these apps, daily life in China is significantly more difficult.",
    },
    {
      question: "Are there communities specifically for Chinese-American deportees?",
      answer:
        "Formal deportee-specific organizations for Chinese-Americans are limited. Your most effective support will come from family networks and community organizations in your home province. Chinese-American community organizations in U.S. cities (CCBA — Chinese Consolidated Benevolent Association chapters, Asian Americans Advancing Justice) may provide support for families of deportees.",
    },
  ],
  seoTitle: "Deported to China: Complete Guide for Deportees | Deported Not Defeated",
  seoDescription:
    "Guide for U.S. deportees returning to China. Hukou, Great Firewall, WeChat Pay, housing in Beijing and Guangzhou, and legal resources.",
  keywords: [
    "deported to China",
    "China deportee guide",
    "hukou China",
    "Great Firewall China deportee",
    "WeChat Pay China",
    "China Mobile Unicom SIM",
    "Beijing Guangzhou housing deportee",
  ],
  relatedCountries: ["vietnam", "cambodia", "indonesia"],
  firstThirtyDays: [
    "Arrive at Beijing Capital, Shanghai Pudong, or Guangzhou Baiyun airport — Chinese immigration processes returning nationals with hukou verification",
    "Register at your local police station (派出所) within 24 hours of arrival — required for all residents including returning citizens",
    "Get a China Mobile, China Unicom, or China Telecom SIM — requires your Resident Identity Card (居民身份证 / shenfenzheng)",
    "Visit the local Public Security Bureau (PSB) to update or obtain your 居民身份证 (Resident Identity Card / RIC)",
    "Set up WeChat Pay and Alipay — both are essential for daily transactions, payments, and receiving money",
    "Open a bank account at Bank of China, ICBC, or Agricultural Bank of China using your RIC",
    "Register your household registration (户口/hukou) at the local police station — required for access to local services",
    "Contact your local street committee (居委会) for community registration and access to local welfare programs",
  ],
  businessDirectory: [
    "Local Public Security Bureau (PSB / 公安局) — RIC (resident ID card) and hukou registration",
    "Bank of China and ICBC branches — banking with RIC documentation",
    "China Mobile and China Unicom stores — SIM cards and mobile data plans",
    "WeChat Pay and Alipay — essential mobile payment platforms for all daily transactions",
    "Local 居委会 (Residents' Committee) — community registration and access to local social services",
    "Ministry of Civil Affairs (民政部) offices — social welfare and transitional assistance programs",
  ],
};

export default china;
