import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/label';
import PageTransition from '../components/PageTransition';
import { useStore } from '../store/useStore';
import tulikaPhoto from '../assets/tulikadevi.jpeg';

const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'];

export default function BookingPage() {
  const navigate = useNavigate();
  const { language } = useStore();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [concern, setConcern] = useState('');

  const handleConfirm = () => {
    const msg = encodeURIComponent(
      `Hi Tulika Devi, I'd like to book a consultation.\n\nName: ${name}\nPhone: ${phone}\nDate: ${selectedDate}\nTime: ${selectedTime}\nConcern: ${concern || 'General consultation'}`
    );
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
    setStep(3);
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Tulika Devi info */}
        <div className="flex items-center gap-4 mb-6 glass-card rounded-xl p-4">
          <img src={tulikaPhoto} alt="Tulika Devi" className="w-16 h-16 rounded-full object-cover border-2 border-primary/30" />
          <div>
            <h2 className="font-heading font-bold text-lg">{language === 'en' ? 'Consult with Tulika Devi' : 'तुलिका देवी से परामर्श करें'}</h2>
            <p className="text-sm text-muted-foreground">{language === 'en' ? 'Astrologer • Numerologist • Tarot Reader • Healer' : 'ज्योतिषी • अंकशास्त्री • टैरो रीडर • हीलर'}</p>
          </div>
        </div>

        <h1 className="text-3xl font-heading font-bold mb-2">{language === 'en' ? 'Book a Session' : 'सत्र बुक करें'}</h1>
        <p className="text-muted-foreground mb-8">{language === 'en' ? 'Schedule a personalized consultation with Tulika Devi' : 'तुलिका देवी के साथ व्यक्तिगत परामर्श शेड्यूल करें'}</p>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= s ? 'gradient-bg text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{s}</div>
              {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-primary' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="font-heading font-semibold text-lg mb-4">
              <Calendar className="w-5 h-5 inline mr-2 text-primary" />
              {language === 'en' ? 'Your Details & Date' : 'आपकी जानकारी और तारीख'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>{language === 'en' ? 'Your Name' : 'आपका नाम'}</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={language === 'en' ? 'Enter your name' : 'अपना नाम दर्ज करें'} className="mt-1" />
              </div>
              <div>
                <Label>{language === 'en' ? 'Phone Number' : 'फ़ोन नंबर'}</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 98765 43210" className="mt-1" />
              </div>
            </div>
            <div>
              <Label>{language === 'en' ? 'Your Concern (optional)' : 'आपकी चिंता (वैकल्पिक)'}</Label>
              <Input value={concern} onChange={(e) => setConcern(e.target.value)} placeholder={language === 'en' ? 'e.g., Career, Marriage, Health...' : 'जैसे, करियर, विवाह, स्वास्थ्य...'} className="mt-1" />
            </div>
            <div>
              <Label>{language === 'en' ? 'Select Date' : 'तारीख चुनें'}</Label>
              <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="mt-1" min={new Date().toISOString().split('T')[0]} />
            </div>
            <Button className="w-full gradient-bg text-primary-foreground" disabled={!name || !selectedDate} onClick={() => setStep(2)}>
              {language === 'en' ? 'Next: Select Time' : 'अगला: समय चुनें'}
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="font-heading font-semibold text-lg mb-4">
              <Clock className="w-5 h-5 inline mr-2 text-primary" />
              {language === 'en' ? 'Select Time Slot' : 'समय स्लॉट चुनें'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <button key={time} onClick={() => setSelectedTime(time)} className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${selectedTime === time ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/30'}`}>
                  {time}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>{language === 'en' ? 'Back' : 'वापस'}</Button>
              <Button className="flex-1 gradient-bg text-primary-foreground" disabled={!selectedTime} onClick={handleConfirm}>
                <MessageCircle className="w-4 h-4 mr-2" /> {language === 'en' ? 'Confirm via WhatsApp' : 'WhatsApp से पुष्टि करें'}
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-heading font-bold mb-2">{language === 'en' ? 'Request Sent!' : 'अनुरोध भेजा गया!'}</h2>
            <p className="text-muted-foreground mb-6">{language === 'en' ? 'Tulika Devi will confirm your session on WhatsApp shortly.' : 'तुलिका देवी जल्द ही WhatsApp पर आपके सत्र की पुष्टि करेंगी।'}</p>
            <Button className="gradient-bg text-primary-foreground" onClick={() => navigate('/')}>{language === 'en' ? 'Back to Home' : 'होम पर वापस'}</Button>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
