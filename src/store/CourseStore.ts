import { create } from 'zustand';
import { supabase } from '../lib/supabaseClient';

export interface Course {
  id: string;
  price: number;
  duration: string;
  slug: string;
  en: string;
  hi: string;
  descEn: string;
  descHi: string;
  featured?: boolean;
  topics: string[];
  idealFor: string[];
}

interface CourseState {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id'>) => Promise<boolean>;
  deleteCourse: (id: string) => Promise<void>;
  fetchCourses: () => Promise<void>;
    editCourse: (
    id: string,
    updatedCourse: Omit<Course, 'id'>
  ) => Promise<boolean>;

}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],

  // ✅ FETCH FROM SUPABASE
  fetchCourses: async () => {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('id', { ascending: false });

    if (!error && data) {
      set({ courses: data });
    } else {
      console.error('Fetch error:', error);
    }
  },

  // ✅ ADD TO SUPABASE
  addCourse: async (course) => {
    const { data, error } = await supabase
      .from('courses')
      .insert([course])
      .select();

    console.log("INSERT:", data, error);

    if (error) return false;

    // UI instantly update
    set((state) => ({
      courses: [...(data || []), ...state.courses],
    }));

    return true;
  },

  // ✅ DELETE FROM SUPABASE
  deleteCourse: async (id) => {
    const { error } = await supabase
      .from('courses')
      .delete()
      .eq('id', id);

    if (!error) {
      set((state) => ({
        courses: state.courses.filter((c) => c.id !== id),
      }));
    } else {
      console.error('Delete error:', error);
    }
  },
  editCourse: async (id, updatedCourse) => {
  const { data, error } = await supabase
    .from('courses')
    .update(updatedCourse)
    .eq('id', id)
    .select();

  if (!error && data) {
    set((state) => ({
      courses: state.courses.map((c) =>
        c.id === id ? data[0] : c
      ),
    }));
    return true;
  }

  console.error(error);
  return false;
},
}));