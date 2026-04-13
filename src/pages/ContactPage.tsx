import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Mail, Phone, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { useStore } from '../store/useStore';
import PageTransition from '../components/PageTransition';
import { supabase } from '../lib/supabaseClient';

export default function ContactPage() {
  const { language } = useStore();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' , location: ''
  });
  const [sent, setSent] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const { error } = await supabase.from('enquiry_table').insert([form]);

    if (error) {
      alert("Database error");
      return;
    }

    await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    setSent(true);

  
    const msg = encodeURIComponent(
      `Hi Astro Tulika,
Name: ${form.name}
Phone: ${form.phone}
Message: ${form.message}`
    );

    window.open(`https://wa.me/+918135802073?text=${msg}`, "_blank");

  } catch {
    alert("Something went wrong");
  }
};

  return (
    <PageTransition>
      <section className="py-24" style={{ background: 'var(--gradient-hero)' }}>
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {language === 'en' ? <>Get in <span className="gradient-text">Touch</span></> : <><span className="gradient-text">संपर्क</span> करें</>}
            </h1>
            <p className="text-muted-foreground">
              {language === 'en'
                ? 'For course queries, consultation bookings, collaborations, or general questions.'
                : 'कोर्स प्रश्नों, परामर्श बुकिंग, सहयोग, या सामान्य सवालों के लिए।'}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-xl">
          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
              <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
                <Send className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-heading font-bold mb-2">{language === 'en' ? 'Message Sent!' : 'संदेश भेजा गया!'}</h2>
              <p className="text-muted-foreground">{language === 'en' ? 'We will get back to you soon.' : 'हम जल्द ही आपसे संपर्क करेंगे।'}</p>
            </motion.div>
          ) : (
            <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label className="flex items-center gap-2"><User className="w-4 h-4" /> {language === 'en' ? 'Name' : 'नाम'}</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-1" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label className="flex items-center gap-2"><Phone className="w-4 h-4" /> Phone</Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1" />
                </div>
              </div>
              <div>
  <Label>Current Location</Label>

  <div className="flex gap-2">
    <Input
      placeholder="Click 'Get Location'"
      value={form.location}
      readOnly
      required
      className="mt-1"
    />

    <Button
      type="button"
      onClick={() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;

              try {
                const res = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
                );
                const data = await res.json();

                // 👉 Full address
                const place = data.display_name;

                setForm({ ...form, location: place });
              } catch {
                alert("Location fetch failed");
              }
            },
            () => {
              alert("Permission denied");
            }
          );
        }
      }}
      className="mt-1"
    >
      Get
    </Button>
  </div>
</div>
              <div>
                <Label>{language === 'en' ? 'Message' : 'संदेश'}</Label>
                <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={4} className="mt-1" />
              </div>
              <div className="flex gap-3">
                <Button type="submit" className="flex-1 gradient-bg text-white">
                  <Send className="w-4 h-4 mr-2" /> {language === 'en' ? 'Send Message' : 'संदेश भेजें'}
                </Button>
                <Button type="button" variant="outline" className="border-primary/30" onClick={() => {
                  window.open('https://wa.me/+918135802073', '_blank');
                }}>
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                </Button>
              </div>
            </motion.form>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
