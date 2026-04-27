import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';

export interface Video {
  id: string;
  title: string;
  type: 'youtube' | 'instagram';
  videoId: string;
  url: string;
  created_at: string;
  
}

interface VideoStore {
  videos: Video[];
  fetchVideos: () => Promise<void>;
  addVideo: (title: string, type: 'youtube' | 'instagram', url: string) => Promise<boolean>;
  deleteVideo: (id: string) => Promise<void>;
    editVideo: (
    id: string,
    title: string,
    type: 'youtube' | 'instagram',
    url: string
  ) => Promise<boolean>;
}

function extractYouTubeId(url: string): string {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : '';
}

export const useVideoStore = create<VideoStore>((set, get) => ({
  videos: [],

  // ✅ FETCH
  fetchVideos: async () => {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const formatted = data.map((v: any) => ({
        ...v,
        videoId: v.video_id,
      }));
      set({ videos: formatted });
    }
  },

  // ✅ ADD
  addVideo: async (title, type, url) => {
    const videoId = type === 'youtube' ? extractYouTubeId(url) : '';
    if (type === 'youtube' && !videoId) return false;

    const { error } = await supabase.from('videos').insert([
      {
        title,
        type,
        video_id: videoId,
        url,
      },
    ]);

    if (!error) {
      await get().fetchVideos();
      return true;
    }
    return false;
  },

  // ✅ DELETE
  deleteVideo: async (id) => {
    await supabase.from('videos').delete().eq('id', id);
    await get().fetchVideos();
  },

  // ✅ ADD THIS (IMPORTANT 🔥)
  editVideo: async (id, title, type, url) => {
    const videoId = type === 'youtube' ? extractYouTubeId(url) : '';

    if (type === 'youtube' && !videoId) return false;

    const { error } = await supabase
      .from('videos')
      .update({
        title,
        type,
        video_id: videoId,
        url,
      })
      .eq('id', id);

    if (!error) {
      await get().fetchVideos();
      return true;
    }

    return false;
  },
}));