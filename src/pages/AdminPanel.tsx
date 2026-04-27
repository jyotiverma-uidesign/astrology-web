import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit3, Lock, Video, LogOut } from 'lucide-react';
import { Button } from '../components/ui/button';
import { FaYoutube, FaInstagram } from "react-icons/fa";
import { Input } from '../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/Select';
import { useVideoStore, type Video as VideoType } from '../store/videoStore';
import { toast } from '../hook/use-toast';
import PageTransition from '../components/PageTransition';
import { useEffect } from "react";
import { useCourseStore } from '../store/CourseStore';
import type { Course } from '../store/CourseStore';
const ADMIN_PASSWORD = 'astrotulika2026';

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin-auth', 'true');
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm p-8 rounded-2xl border border-primary/20 bg-card shadow-lg"
      >
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="w-7 h-7 text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Admin Access</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter password to manage videos</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error ? 'border-destructive' : ''}
          />
          {error && <p className="text-xs text-destructive">Incorrect password</p>}
          <Button type="submit" className="w-full gradient-bg text-primary-foreground">
            <Lock className="w-4 h-4 mr-2" /> Login
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

function VideoForm({ editingVideo, onDone }: { editingVideo?: VideoType; onDone: () => void }) {
  const [title, setTitle] = useState(editingVideo?.title ?? '');
  const [type, setType] = useState<'youtube' | 'instagram'>(editingVideo?.type ?? 'youtube');
  const [url, setUrl] = useState(editingVideo?.url ?? '');
const { addVideo, editVideo, videos } = useVideoStore();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!title.trim() || !url.trim()) {
    toast({ title: 'Please fill all fields', variant: 'destructive' });
    return;
  }

  // ✅ LIMIT CHECK (only for adding new video)
  if (!editingVideo && videos.length >= 6) {
    toast({ title: 'Maximum 6 videos allowed', variant: 'destructive' });
    return;
  }

  const success = editingVideo
    ? await editVideo(editingVideo.id, title, type, url)
    : await addVideo(title, type, url);

  if (success) {
    toast({ title: editingVideo ? 'Video updated!' : 'Video added!' });
    onDone();
    if (!editingVideo) {
      setTitle('');
      setUrl('');
    }
  } else {
    toast({ title: 'Invalid YouTube URL', variant: 'destructive' });
  }
};

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-xl border border-primary/15 bg-card space-y-4">
      <h2 className="font-heading text-lg font-semibold flex items-center gap-2">
        {editingVideo ? <Edit3 className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
        {editingVideo ? 'Edit Video' : 'Add New Video'}
      </h2>
      <Input placeholder="Video Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Select value={type} onValueChange={(v) => setType(v as 'youtube' | 'instagram')} >
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent className='bg-white'>
          <SelectItem value="youtube"><span className="flex items-center  gap-2">< FaYoutube className="w-4 h-4" /> YouTube</span></SelectItem>
          <SelectItem value="instagram"><span className="flex items-center   gap-2"><FaInstagram className="w-4 h-4" /> Instagram</span></SelectItem>
        </SelectContent>
      </Select>
      <Input placeholder={type === 'youtube' ? 'YouTube URL (e.g. https://youtube.com/watch?v=...)' : 'Instagram Post/Reel URL'} value={url} onChange={(e) => setUrl(e.target.value)} />
      <div className="flex gap-2">
        <Button type="submit"  disabled={!editingVideo && videos.length >= 6} className="gradient-bg  text-white ">
          {editingVideo ? 'Update' : 'Add Video'}
        </Button>
        {editingVideo && <Button type="button" variant="outline" onClick={onDone}>Cancel</Button>}
      </div>
    </form>
  );
}
function CourseForm({
  editingCourse,
  onDone,
}: {
  editingCourse?: Course;
  onDone: () => void;
}) {
  const [title, setTitle] = useState(editingCourse?.en ?? '');
  const [price, setPrice] = useState(editingCourse?.price?.toString() ?? '');
  const [duration, setDuration] = useState(editingCourse?.duration ?? '');
  const [descEn, setDescEn] = useState(editingCourse?.descEn ?? '');
  const [descHi, setDescHi] = useState(editingCourse?.descHi ?? '');

  const { addCourse, editCourse } = useCourseStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price) {
      toast({ title: 'Fill all fields', variant: 'destructive' });
      return;
    }

    const payload = {
      slug: editingCourse
        ? editingCourse.slug
        : title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      en: title,
      hi: title,
      descEn,
      descHi,
      price: Number(price),
      duration,
      topics: [],
      idealFor: [],
      featured: false,
    };

    const success = editingCourse
      ? await editCourse(editingCourse.id, payload)
      : await addCourse(payload);

    if (success) {
      toast({
        title: editingCourse ? 'Course updated!' : 'Course added!',
      });
      onDone();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-xl border bg-card space-y-4 mt-10">
      <h2 className="font-heading text-lg font-semibold">
        {editingCourse ? 'Edit Course' : 'Add Course'}
      </h2>

      <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Course Title" />

      <Input value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration" />

      <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />

      <textarea value={descEn} onChange={(e) => setDescEn(e.target.value)} className="w-full p-2 border rounded" />

      <textarea value={descHi} onChange={(e) => setDescHi(e.target.value)} className="w-full p-2 border rounded" />

      <Button type="submit" className='gradient-bg text-primary-foreground text-white'>
        {editingCourse ? 'Update Course' : 'Add Course'}
      </Button>

      {editingCourse && (
        <Button type="button" variant="outline" onClick={onDone}>
          Cancel
        </Button>
      )}
    </form>
  );
}
export default function AdminPanel() {
  const [authed, setAuthed] = useState(sessionStorage.getItem('admin-auth') === 'true');
  const [editingId, setEditingId] = useState<string | null>(null);
  const { courses, deleteCourse, fetchCourses } = useCourseStore();
const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

const editingCourse = editingCourseId
  ? courses.find((c) => c.id === editingCourseId)
  : undefined;

const { videos, deleteVideo, fetchVideos } = useVideoStore();
useEffect(() => {
  fetchVideos();
  fetchCourses();
}, [fetchVideos, fetchCourses]);
  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const editingVideo = editingId ? videos.find((v) => v.id === editingId) : undefined;

 return (
  <PageTransition>
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground flex items-center gap-2">
              <Video className="w-8 h-8 text-primary" /> Video Manager
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Add YouTube & Instagram videos to your website
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              sessionStorage.removeItem('admin-auth');
              setAuthed(false);
            }}
          >
            <LogOut className="w-4 h-4 mr-1" /> Logout
          </Button>
        </div>
<VideoForm
  key={editingId ? `video-${editingId}` : 'video-new'}
  editingVideo={editingVideo}
  onDone={() => setEditingId(null)}
/>

<CourseForm
  key={editingCourseId ? `course-${editingCourseId}` : 'course-new'}
  editingCourse={editingCourse}
  onDone={() => setEditingCourseId(null)}
/>

        {/* ================= VIDEOS ================= */}
        <div className="mt-10">
          <h2 className="font-heading text-xl font-semibold mb-4">
            All Videos ({videos.length})
          </h2>

          {videos.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">
              No videos added yet.
            </p>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {videos.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {video.type === 'youtube' ? (
                        <FaYoutube className="w-5 h-5 text-destructive shrink-0" />
                      ) : (
                        <FaInstagram className="w-5 h-5 text-primary shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">
                          {video.title}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {video.url}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setEditingId(video.id)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          deleteVideo(video.id);
                          toast({ title: 'Video deleted' });
                        }}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* ================= COURSES (FIXED POSITION) ================= */}
        <div className="mt-12">
          <h2 className="font-heading text-xl font-semibold mb-4">
            All Courses ({courses.length})
          </h2>

          {courses.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No courses added yet.
            </p>
          ) : (
            <div className="space-y-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-4 rounded-xl border bg-card"
                >
                  <div>
                    <p className="font-medium"> {course.en} / {course.hi}</p>
                    <p className="text-xs text-muted-foreground">
                      ₹{course.price} • {course.duration}
                    </p>
                  </div>
<Button
  size="icon"
  variant="ghost"
  onClick={() => setEditingCourseId(course.id)}
>
  <Edit3 className="w-4 h-4" />
</Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                      deleteCourse(course.id);
                      toast({ title: 'Course deleted' });
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  </PageTransition>
);
}
