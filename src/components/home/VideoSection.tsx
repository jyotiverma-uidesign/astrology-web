import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';

const videos = [
  { title: 'Weigh Loss Tips', id: 'lT0tNK0d59w' },
  { title: 'Why International Men’s Day Matters: Analysis', id: 'zYdcpKUyY4E' },
  { title: 'Marriage Timing & Gold Gain Analysis', id: '45tXzMGGYzU'},
];

export default function VideoSection() {
  const { language } = useStore();

  return (
    <section className="py-2 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center mb-8">
          {language === 'en' ? 'Learn Astrology' : 'ज्योतिष सीखें'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="rounded-xl overflow-hidden shadow-lg bg-card">
              <div className="aspect-video">
                <iframe src={`https://www.youtube.com/embed/${video.id}`} title={video.title} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
              </div>
              <div className="p-3"><h3 className="font-semibold text-sm">{video.title}</h3></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
