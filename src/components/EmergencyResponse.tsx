import { useState, useEffect } from 'react';
import { ShieldAlert, PhoneCall, MapPin, Mic, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

export default function EmergencyResponse() {
  const [modalOpen, setModalOpen] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (modalOpen && countdown > 0) {
      console.log(`[SafeSpace Debug] Emergency alert countdown: ${countdown}`);
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (modalOpen && countdown === 0 && !isSending) {
      console.log('[SafeSpace Debug] Starting emergency alert send process');
      setIsSending(true);
      toast.loading('Sending alert to emergency contacts...', { id: 'alert' });
      // Simulate API call
      setTimeout(() => {
        console.log('[SafeSpace Debug] Emergency alert sent successfully');
        toast.success('Alert sent successfully!', { id: 'alert' });
        setModalOpen(false);
        setCountdown(5);
        setIsSending(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [modalOpen, countdown, isSending]);

  const cancelAlert = () => {
    setModalOpen(false);
    setCountdown(5);
    toast.info('Alert cancelled.');
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF3B30] text-white font-bold rounded-full shadow-lg hover:bg-red-700 transition-colors"
      >
        <ShieldAlert className="w-6 h-6" />
        <span>EMERGENCY ALERT</span>
      </motion.button>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-md text-center border-4 border-[#FF3B30]"
            >
              <h2 className="text-3xl font-bold text-[#FF3B30]">EMERGENCY ALERT</h2>
              <p className="text-gray-600 mt-2 mb-6">Sending alert to your trusted contacts in...</p>
              
              <div className="text-8xl font-bold text-[#FF3B30] mb-6">{countdown}</div>

              <div className="space-y-3 text-left text-gray-700 mb-8">
                  <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg"><MapPin className="w-5 h-5 text-[#007AFF]" /><span>Sharing your live location</span></div>
                  <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg"><Mic className="w-5 h-5 text-[#007AFF]" /><span>Activating audio recording</span></div>
                  <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg"><PhoneCall className="w-5 h-5 text-[#007AFF]" /><span>Notifying emergency contacts</span></div>
              </div>

              <button
                onClick={cancelAlert}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
                Cancel Alert
              </button>
              <p className="text-xs text-gray-500 mt-3">You can also say your 'safe word' to cancel.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
