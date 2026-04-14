import { Suspense, lazy, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {  Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/Sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import Navbar from "./pages/Navbar/Navbar";
import Footer from "./pages/Footer/Footer";
import { useLocation } from "react-router-dom";




const Home = lazy(() => import("./pages/Home"));
const AboutPage = lazy(() => import("./pages/AboutPages"));
const CoursesPage = lazy(() => import("./pages/CoursesPage"));
const ConsultationsPage = lazy(() => import("./pages/ConsultationsPage"));
const TarotPage = lazy(() => import("./pages/TarotPage"));
const CrystalsPage = lazy(() => import("./pages/CrystalsPage"));
const FAQPage = lazy(() => import("./pages/FAQPages"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CourseDetail = lazy(() => import("./pages/CourseDetails"));
const KundliPage = lazy(() => import("./pages/KundliPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const RefundPage = lazy(() => import("./pages/RefundPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
  </div>
);

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />

        <Navbar />

        <main className="min-h-screen">
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/consultations" element={<ConsultationsPage />} />
              <Route path="/tarot" element={<TarotPage />} />
              <Route path="/crystals" element={<CrystalsPage />} />
              <Route path="/faqs" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/course/:slug" element={<CourseDetail />} />
              <Route path="/kundli" element={<KundliPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/refund" element={<RefundPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
