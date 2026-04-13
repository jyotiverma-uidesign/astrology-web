import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import PageTransition from '../components/PageTransition';
import { blogPosts } from '../data/astrologers';
import { useStore } from '../store/useStore';

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { language } = useStore();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Blog post not found.</p>
        <Button className="mt-4" onClick={() => navigate('/blog')}>Back to Blog</Button>
      </div>
    );
  }

  return (
    <PageTransition>
      <article className="container mx-auto px-4 py-8 max-w-3xl">
        <Button variant="ghost" className="mb-4" onClick={() => navigate('/blog')}>
          <ArrowLeft className="w-4 h-4 mr-1" /> {language === 'en' ? 'Back to Blog' : 'ब्लॉग पर वापस'}
        </Button>

        <div className="aspect-2/1 rounded-2xl overflow-hidden mb-6">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <span className="text-sm font-medium text-primary">{post.category}</span>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-4">{language === 'en' ? post.title : post.titleHi}</h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {post.author}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.date}</span>
        </div>

        <div className="prose prose-lg max-w-none text-foreground">
          <p>{post.excerpt}</p>
          <p>Astrology has been a guiding force for millions of people throughout history. The alignment of celestial bodies at the time of our birth creates a unique cosmic blueprint that influences our personality, relationships, and life path.</p>
          <h2>Understanding the Basics</h2>
          <p>Every individual's birth chart consists of 12 houses, each representing different aspects of life. The placement of planets in these houses and their aspects to each other creates the unique tapestry of your destiny.</p>
          <h2>Key Takeaways</h2>
          <ul>
            <li>Your birth chart is a snapshot of the sky at your moment of birth</li>
            <li>The 12 houses represent different life areas from self to spirituality</li>
            <li>Planetary transits continue to influence your life throughout your journey</li>
            <li>Understanding your chart helps you make informed decisions</li>
          </ul>
          <p>For a personalized reading, connect with our expert astrologers who can interpret your chart in detail and provide actionable guidance.</p>
        </div>

        <div className="mt-8 p-6 rounded-xl bg-muted text-center">
          <p className="font-heading font-semibold mb-3">{language === 'en' ? 'Want personalized guidance?' : 'व्यक्तिगत मार्गदर्शन चाहिए?'}</p>
          <Button className="gradient-bg text-primary-foreground" onClick={() => navigate('/astrologers')}>
            {language === 'en' ? 'Talk to an Astrologer' : 'ज्योतिषी से बात करें'}
          </Button>
        </div>
      </article>
    </PageTransition>
  );
}
