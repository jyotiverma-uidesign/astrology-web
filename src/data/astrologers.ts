export interface Astrologer {
  id: string;
  name: string;
  nameHi: string;
  speciality: string;
  specialityHi: string;
  experience: number;
  rating: number;
  reviews: number;
  pricePerMin: number;
  languages: string[];
  avatar: string;
  isOnline: boolean;
  expertise: string[];
}

export const astrologers: Astrologer[] = [
  { id: "1", name: "Pandit Rajesh Sharma", nameHi: "पंडित राजेश शर्मा", speciality: "Vedic Astrology", specialityHi: "वैदिक ज्योतिष", experience: 15, rating: 4.9, reviews: 2340, pricePerMin: 30, languages: ["Hindi", "English"], avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face", isOnline: true, expertise: ["Kundli", "Marriage", "Career"] },
  { id: "2", name: "Acharya Meera Devi", nameHi: "आचार्य मीरा देवी", speciality: "Tarot Reading", specialityHi: "टैरो रीडिंग", experience: 10, rating: 4.8, reviews: 1890, pricePerMin: 25, languages: ["Hindi", "English", "Gujarati"], avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face", isOnline: true, expertise: ["Tarot", "Love", "Relationships"] },
  { id: "3", name: "Guru Vikram Joshi", nameHi: "गुरु विक्रम जोशी", speciality: "Numerology", specialityHi: "अंक ज्योतिष", experience: 20, rating: 4.9, reviews: 3100, pricePerMin: 40, languages: ["Hindi", "English"], avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face", isOnline: false, expertise: ["Numerology", "Vastu", "Gemstone"] },
  { id: "4", name: "Jyotishi Priya Patel", nameHi: "ज्योतिषी प्रिया पटेल", speciality: "Palmistry", specialityHi: "हस्तरेखा", experience: 8, rating: 4.7, reviews: 1200, pricePerMin: 20, languages: ["Hindi", "English", "Marathi"], avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face", isOnline: true, expertise: ["Palmistry", "Face Reading", "Health"] },
  { id: "5", name: "Pandit Suresh Mishra", nameHi: "पंडित सुरेश मिश्रा", speciality: "Vedic Astrology", specialityHi: "वैदिक ज्योतिष", experience: 25, rating: 5.0, reviews: 4500, pricePerMin: 50, languages: ["Hindi", "English", "Sanskrit"], avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face", isOnline: true, expertise: ["Kundli", "Puja", "Remedies"] },
  { id: "6", name: "Acharya Lakshmi Iyer", nameHi: "आचार्य लक्ष्मी अय्यर", speciality: "Vastu Shastra", specialityHi: "वास्तु शास्त्र", experience: 12, rating: 4.8, reviews: 1650, pricePerMin: 35, languages: ["Hindi", "English", "Tamil"], avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face", isOnline: false, expertise: ["Vastu", "Feng Shui", "Home"] },
];

export const tarotCards = [
  { id: 1, name: "The Fool", nameHi: "मूर्ख", meaning: { love: "New beginnings in love, open your heart to adventure.", career: "A fresh start awaits, take the leap of faith.", health: "Time to try new wellness routines." }, image: "🃏" },
  { id: 2, name: "The Magician", nameHi: "जादूगर", meaning: { love: "You have the power to manifest the love you desire.", career: "Your skills are aligned for success, act now.", health: "Mind-body connection is strong." }, image: "🎩" },
  { id: 3, name: "The High Priestess", nameHi: "उच्च पुजारिन", meaning: { love: "Trust your intuition in matters of the heart.", career: "Hidden knowledge will guide your path.", health: "Listen to your body's subtle signals." }, image: "🌙" },
  { id: 4, name: "The Empress", nameHi: "महारानी", meaning: { love: "Abundance and nurturing energy in relationships.", career: "Creative projects will flourish.", health: "Fertility and vitality are highlighted." }, image: "👑" },
  { id: 5, name: "The Emperor", nameHi: "सम्राट", meaning: { love: "Stability and structure in your love life.", career: "Leadership opportunities are coming.", health: "Discipline in health routines pays off." }, image: "🏛️" },
  { id: 6, name: "The Lovers", nameHi: "प्रेमी", meaning: { love: "A significant choice in love approaches.", career: "Partnership opportunities arise.", health: "Balance between mind and heart." }, image: "💕" },
  { id: 7, name: "The Chariot", nameHi: "रथ", meaning: { love: "Determination leads to romantic triumph.", career: "Victory through willpower and focus.", health: "Physical energy is at its peak." }, image: "⚡" },
  { id: 8, name: "Strength", nameHi: "शक्ति", meaning: { love: "Patience and compassion win the day.", career: "Inner strength overcomes obstacles.", health: "Courage to face health challenges." }, image: "🦁" },
  { id: 9, name: "The Star", nameHi: "तारा", meaning: { love: "Hope and inspiration in romantic connections.", career: "Your dreams are within reach.", health: "Healing energy surrounds you." }, image: "⭐" },
  { id: 10, name: "The Moon", nameHi: "चंद्रमा", meaning: { love: "Hidden emotions surface, trust your feelings.", career: "Beware of illusions, seek clarity.", health: "Pay attention to sleep and dreams." }, image: "🌕" },
  { id: 11, name: "The Sun", nameHi: "सूर्य", meaning: { love: "Joy, warmth, and happiness in love.", career: "Success and recognition shine on you.", health: "Vitality and energy overflow." }, image: "☀️" },
  { id: 12, name: "The World", nameHi: "विश्व", meaning: { love: "Completion and fulfillment in relationships.", career: "A major achievement is at hand.", health: "Wholeness and well-being achieved." }, image: "🌍" },
];

export const blogPosts = [
  { slug: "understanding-kundli", title: "Understanding Your Kundli", titleHi: "अपनी कुंडली को समझना", excerpt: "Learn the basics of reading your birth chart and what the planets reveal about your destiny.", date: "2024-03-15", author: "Pandit Rajesh", image: "https://images.unsplash.com/photo-1532968961962-8a0cb3a2d4f0?w=600&h=400&fit=crop", category: "Vedic Astrology" },
  { slug: "tarot-beginners-guide", title: "Tarot for Beginners", titleHi: "शुरुआती लोगों के लिए टैरो", excerpt: "A comprehensive guide to understanding tarot cards and their meanings.", date: "2024-03-10", author: "Acharya Meera", image: "https://images.unsplash.com/photo-1600430188203-c5ee64de89d9?w=600&h=400&fit=crop", category: "Tarot" },
  { slug: "vastu-home-tips", title: "Vastu Tips for Your Home", titleHi: "घर के लिए वास्तु टिप्स", excerpt: "Transform your living space with ancient Vastu Shastra principles.", date: "2024-03-05", author: "Guru Vikram", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop", category: "Vastu" },
  { slug: "numerology-life-path", title: "Your Numerology Life Path", titleHi: "आपका अंक ज्योतिष जीवन पथ", excerpt: "Discover what your life path number says about your purpose and destiny.", date: "2024-02-28", author: "Priya Patel", image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&h=400&fit=crop", category: "Numerology" },
];
