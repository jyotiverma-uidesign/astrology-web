export interface CourseModule {
  id: number;
  title: string;
  titleHi: string;
  duration: string;
  lessons: { name: string; nameHi: string; type: 'video' | 'notes' | 'quiz'; detail: string }[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  titleHi: string;
  subtitle: string;
  subtitleHi: string;
  description: string;
  descriptionHi: string;
  price: number;
  originalPrice: number;
  image: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  levelHi: string;
  duration: string;
  modules: number;
  language: string;
  learners: number;
  rating: number;
  reviews: number;
  instructor: string;
  instructorHi: string;
  whatsappNumber: string;
  highlights: { en: string; hi: string }[];
  whatYouLearn: { en: string; hi: string }[];
  courseModules: CourseModule[];
  faqs: { q: string; a: string; qHi: string; aHi: string }[];
}

export const courses: Course[] = [
  {
    id: '1',
    slug: 'basic-numerology-course',
    title: 'Basic Numerology Course',
    titleHi: 'बुनियादी अंकशास्त्र कोर्स',
    subtitle: 'Build a clear and practical foundation in numerology',
    subtitleHi: 'अंकशास्त्र में एक स्पष्ट और व्यावहारिक नींव बनाएं',
    description: 'A beginner-friendly course designed to help you understand the fundamentals of numerology, personality patterns, core numbers, Lo Shu basics and practical interpretation.',
    descriptionHi: 'अंकशास्त्र की मूल बातें, व्यक्तित्व पैटर्न, कोर नंबर, लो शू बेसिक्स और व्यावहारिक व्याख्या को समझने के लिए डिज़ाइन किया गया शुरुआती-अनुकूल कोर्स।',
    price: 5000,
    originalPrice: 7000,
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=500&fit=crop',
    level: 'Beginner',
    levelHi: 'शुरुआती',
    duration: '1 Month',
    modules: 12,
    language: 'Hindi / English',
    learners: 3200,
    rating: 4.8,
    reviews: 890,
    instructor: 'Astro Tulika',
    instructorHi: 'Astro Tulika',
    whatsappNumber: '+918135802073',
    highlights: [
      { en: 'Duration: 1 Month', hi: 'अवधि: 1 महीना' },
      { en: 'Beginner Friendly', hi: 'शुरुआती अनुकूल' },
      { en: 'Practical Approach', hi: 'व्यावहारिक दृष्टिकोण' },
      { en: 'WhatsApp Support', hi: 'WhatsApp सहायता' },
    ],
    whatYouLearn: [
      { en: 'Introduction to Numerology', hi: 'अंकशास्त्र का परिचय' },
      { en: 'Meaning of Numbers 1 to 9', hi: '1 से 9 तक संख्याओं का अर्थ' },
      { en: 'Mulank / Birth Number', hi: 'मूलांक / जन्म संख्या' },
      { en: 'Bhagyank / Life Path Number', hi: 'भाग्यांक / जीवन पथ संख्या' },
      { en: 'Name Energy Basics', hi: 'नाम ऊर्जा बेसिक्स' },
      { en: 'Personality & Pattern Reading', hi: 'व्यक्तित्व और पैटर्न पठन' },
      { en: 'Lo Shu Grid Basics', hi: 'लो शू ग्रिड बेसिक्स' },
      { en: 'Missing & Repeating Numbers', hi: 'गायब और दोहराई जाने वाली संख्याएं' },
      { en: 'Compatibility & Relationships', hi: 'अनुकूलता और रिश्ते' },
      { en: 'Career & Life Direction', hi: 'करियर और जीवन दिशा' },
      { en: 'Personal Year & Time Cycles', hi: 'व्यक्तिगत वर्ष और समय चक्र' },
      { en: 'Practice & Interpretation', hi: 'अभ्यास और व्याख्या' },
    ],
    courseModules: [
      { id: 1, title: 'Introduction to Numerology', titleHi: 'अंकशास्त्र का परिचय', duration: '45 min', lessons: [{ name: 'What is Numerology', nameHi: 'अंकशास्त्र क्या है', type: 'video', detail: '45 min' }] },
      { id: 2, title: 'Numbers 1-9 Meaning', titleHi: '1-9 संख्या अर्थ', duration: '60 min', lessons: [{ name: 'Deep dive into numbers', nameHi: 'संख्याओं में गहराई', type: 'video', detail: '60 min' }] },
      { id: 3, title: 'Mulank & Bhagyank', titleHi: 'मूलांक और भाग्यांक', duration: '45 min', lessons: [{ name: 'Calculation & meaning', nameHi: 'गणना और अर्थ', type: 'video', detail: '45 min' }] },
      { id: 4, title: 'Lo Shu Grid', titleHi: 'लो शू ग्रिड', duration: '50 min', lessons: [{ name: 'Grid mastery', nameHi: 'ग्रिड', type: 'video', detail: '50 min' }] },
    ],
    faqs: [
      { q: 'Do I need prior knowledge?', a: 'No, this course starts from absolute basics.', qHi: 'क्या मुझे पहले से ज्ञान चाहिए?', aHi: 'नहीं, यह कोर्स बिल्कुल शुरुआत से है।' },
      { q: 'How do I enroll?', a: 'Click Enroll Now and connect via WhatsApp.', qHi: 'मैं कैसे नामांकन करूं?', aHi: 'अभी नामांकन पर क्लिक करें और WhatsApp से जुड़ें।' },
    ],
  },
  {
    id: '2',
    slug: 'premium-numerology-course',
    title: 'Premium Numerology Course',
    titleHi: 'प्रीमियम अंकशास्त्र कोर्स',
    subtitle: 'Deeper learning with Vedic understanding & Lagna alignment',
    subtitleHi: 'वैदिक समझ और लग्न संरेखण के साथ गहरा शिक्षण',
    description: 'A deeper and more guided learning experience covering numerology in greater depth along with Vedic understanding, Lagna-based observation and stronger interpretation clarity.',
    descriptionHi: 'अंकशास्त्र को अधिक गहराई से कवर करने वाला एक गहरा शिक्षण अनुभव, वैदिक समझ और लग्न-आधारित अवलोकन के साथ।',
    price: 15000,
    originalPrice: 20000,
    image: 'https://img.freepik.com/free-vector/gradient-numerology-illustration_23-2150037592.jpg?semt=ais_hybrid&w=740&q=80',
    level: 'Intermediate',
    levelHi: 'मध्यवर्ती',
    duration: '3 Months',
    modules: 20,
    language: 'Hindi / English',
    learners: 1800,
    rating: 4.9,
    reviews: 520,
    instructor: 'Astro Tulika',
    instructorHi: 'Astro Tulika',
    whatsappNumber: '+918135802073',
    highlights: [
      { en: 'Duration: 3 Months', hi: 'अवधि: 3 महीने' },
      { en: 'Includes Basic + Advanced', hi: 'बेसिक + एडवांस्ड शामिल' },
      { en: 'Vedic & Lagna Integration', hi: 'वैदिक और लग्न एकीकरण' },
      { en: 'Personal Guidance', hi: 'व्यक्तिगत मार्गदर्शन' },
    ],
    whatYouLearn: [
      { en: 'Everything in Basic Course', hi: 'बुनियादी कोर्स में सब कुछ' },
      { en: 'Deeper interpretation methods', hi: 'गहरी व्याख्या विधियां' },
      { en: 'Practical case study approach', hi: 'व्यावहारिक केस स्टडी दृष्टिकोण' },
      { en: 'Numerology through a Vedic lens', hi: 'वैदिक दृष्टिकोण से अंकशास्त्र' },
      { en: 'Aligning numbers with Lagna chart', hi: 'लग्न चार्ट के साथ संख्याओं का संरेखण' },
      { en: 'Pattern analysis in real-life situations', hi: 'वास्तविक जीवन स्थितियों में पैटर्न विश्लेषण' },
    ],
    courseModules: [
      { id: 1, title: 'Advanced Number Analysis', titleHi: 'उन्नत संख्या विश्लेषण', duration: '60 min', lessons: [{ name: 'Deep patterns', nameHi: 'गहरे पैटर्न', type: 'video', detail: '60 min' }] },
      { id: 2, title: 'Vedic Integration', titleHi: 'वैदिक एकीकरण', duration: '75 min', lessons: [{ name: 'Vedic lens', nameHi: 'वैदिक दृष्टिकोण', type: 'video', detail: '75 min' }] },
    ],
    faqs: [
      { q: 'Do I need to complete Basic first?', a: 'It is recommended but not mandatory.', qHi: 'क्या मुझे पहले बेसिक पूरा करना होगा?', aHi: 'अनुशंसित है लेकिन अनिवार्य नहीं।' },
    ],
  },
  {
    id: '3',
    slug: 'tarot-crystal-course',
    title: 'Tarot & Crystal Course',
    titleHi: 'टैरो और क्रिस्टल कोर्स',
    subtitle: 'Understand tarot and crystal energy as supportive intuitive tools',
    subtitleHi: 'टैरो और क्रिस्टल ऊर्जा को सहायक सहज उपकरणों के रूप में समझें',
    description: 'A spiritually grounded course designed to help you understand tarot basics, card energy, intuitive reading approach, crystal support and practical spiritual application.',
    descriptionHi: 'टैरो मूल बातें, कार्ड ऊर्जा, सहज पठन दृष्टिकोण, क्रिस्टल सहायता और व्यावहारिक आध्यात्मिक अनुप्रयोग को समझने के लिए डिज़ाइन किया गया कोर्स।',
    price: 10000,
    originalPrice: 14000,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM2M-SQYUeMuvFL2_J7NdWdysWjx-QUJb7vg&s',
    level: 'Beginner',
    levelHi: 'शुरुआती',
    duration: '2 Months',
    modules: 10,
    language: 'Hindi / English',
    learners: 1200,
    rating: 4.7,
    reviews: 350,
    instructor: 'Astro Tulika',
    instructorHi: 'Astro Tulika',
    whatsappNumber: '+918135802073',
    highlights: [
      { en: 'Duration: 2 Months', hi: 'अवधि: 2 महीने' },
      { en: 'Tarot + Crystal Combined', hi: 'टैरो + क्रिस्टल संयुक्त' },
      { en: 'Intuitive Approach', hi: 'सहज दृष्टिकोण' },
      { en: 'Practical Application', hi: 'व्यावहारिक अनुप्रयोग' },
    ],
    whatYouLearn: [
      { en: 'Introduction to tarot', hi: 'टैरो का परिचय' },
      { en: 'Understanding card energy', hi: 'कार्ड ऊर्जा को समझना' },
      { en: 'Reading approach for clarity', hi: 'स्पष्टता के लिए पठन दृष्टिकोण' },
      { en: 'Tarot as intuitive support tool', hi: 'सहज सहायता उपकरण के रूप में टैरो' },
      { en: 'Introduction to crystal energy', hi: 'क्रिस्टल ऊर्जा का परिचय' },
      { en: 'Emotional & energetic balance with crystals', hi: 'क्रिस्टल के साथ भावनात्मक और ऊर्जावान संतुलन' },
      { en: 'Basic practical application', hi: 'बुनियादी व्यावहारिक अनुप्रयोग' },
    ],
    courseModules: [
      { id: 1, title: 'Introduction to Tarot', titleHi: 'टैरो का परिचय', duration: '45 min', lessons: [{ name: 'What is Tarot?', nameHi: 'टैरो क्या है?', type: 'video', detail: '45 min' }] },
      { id: 2, title: 'Crystal Energy Basics', titleHi: 'क्रिस्टल ऊर्जा बेसिक्स', duration: '40 min', lessons: [{ name: 'Crystal fundamentals', nameHi: 'क्रिस्टल मूल बातें', type: 'video', detail: '40 min' }] },
    ],
    faqs: [
      { q: 'Do I need tarot cards to start?', a: 'Not immediately, but having a deck helps for practice.', qHi: 'क्या शुरू करने के लिए टैरो कार्ड चाहिए?', aHi: 'तुरंत नहीं, लेकिन अभ्यास के लिए डेक होना मदद करता है।' },
    ],
  },
];
