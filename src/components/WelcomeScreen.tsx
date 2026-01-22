import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import ChessMaster from "./ChessMaster";
import { useUser } from "../context/UserContext"; // Adjust import path

interface WelcomeProps {
  onComplete: () => void;
}

export default function Welcome({ onComplete }: WelcomeProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  const { setUserData } = useUser();
  const [tempName, setTempName] = useState('');
  const [tempElo, setTempElo] = useState(100);
  const [selectedMaster, setSelectedMaster] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowMenu(true), 2000);
    const timer_2 = setTimeout(() => setShouldShow(true), 4000);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer_2);
    }
  }, []);

  const handleSubmit = () => {
    // Save to context
    setUserData(tempName, tempElo, selectedMaster);
    setShowPopup(false);

    // Add a small delay for smooth transition
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  return (
    // The main container needs to cover the full screen height
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <AnimatePresence mode="wait">
        {!showMenu ? (
          // This motion.div now centers its children using flexbox
          <motion.div
            key="intro-element"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -70 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',          // Use flexbox
              justifyContent: 'center', // Center horizontally
              alignItems: 'center',     // Center vertically
              height: '100vh',          // Ensure it takes full height to center within view
              width: '100vw',           // Ensure it takes full width
              position: 'fixed'         // Keep it in place during transition
            }}
          >
            <h1>Welcome to Chess Trainer!</h1>
          </motion.div>
        ) : (
          <motion.nav
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: '#2c2b29',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              zIndex: 1000
            }}
          >
            {shouldShow && <ChessMaster onNext={() => setShowPopup(true)} onLoad={setSelectedMaster} />}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Name Entry Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.8)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 2000
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: 'white',
                padding: '50px',
                borderRadius: '10px',
                textAlign: 'center',
                minWidth: '300px'
              }}
            >
              <h2>What's your chess name?</h2>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                style={{ padding: '10px', width: '80%', marginBottom: '20px' }}
                placeholder="Enter your name"
              />
              <br />
              <h2>What's your ELO rating?</h2>
              <input
                type="number"
                value={tempElo}
                onChange={(e) => setTempElo(Number(e.target.value))}
                min="100"
                max="3000"
                style={{ padding: '10px', width: '80%', marginBottom: '20px' }}
              />
              <br />
              <button
                onClick={handleSubmit}
                style={{
                  padding: '10px 30px',
                  backgroundColor: '#2c2b29',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
                disabled={!tempName.trim()}
              >
                Start Training!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
