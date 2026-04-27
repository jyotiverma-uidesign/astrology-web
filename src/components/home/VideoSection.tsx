import { motion } from 'framer-motion';
import { Play, } from 'lucide-react';
import { FaYoutube, FaInstagram } from "react-icons/fa";
import { useVideoStore } from '../../store/videoStore';
import { useEffect } from "react";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function VideoSection() {
  const { videos, fetchVideos } = useVideoStore();

 useEffect(() => {
  fetchVideos();
}, [fetchVideos]);

  return (
    <section className="py-5 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Play className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium tracking-widest uppercase text-primary">Watch & Learn</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Videos & <span className="gradient-text">Insights</span>
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Explore spiritual knowledge through curated video content
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={cardVariants}
              className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/20 transition-all group"
            >
         <div className="relative w-full aspect-video overflow-hidden">
  {video.type === 'youtube' ? (
    <iframe
      src={`https://www.youtube.com/embed/${video.videoId}`}
      title={video.title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="w-full h-full border-0"
      loading="lazy"
    />
  ) : (
    <iframe
      src={`${video.url}embed/`}
      title={video.title}
      allowFullScreen
      className="w-full h-full border-0"
      scrolling="no"   // 👈 important
      loading="lazy"
    />
  )}
</div>
              <div className="p-4 flex items-center gap-2">
                {video.type === 'youtube' ? (
                  <FaYoutube className="w-4 h-4 text-destructive shrink-0" />
                ) : (
                  <FaInstagram className="w-4 h-4 text-primary shrink-0" />
                )}
                <p className="font-medium text-sm text-foreground truncate">{video.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
