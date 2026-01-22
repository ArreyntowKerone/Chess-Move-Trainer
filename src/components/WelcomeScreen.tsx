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
    <div style={{ 
      height: '100vh', 
      width: '100vw',
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      <AnimatePresence mode="wait">
        {!showMenu ? (
          <motion.div
            key="intro-element"
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -70 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              position: 'fixed',
              textAlign: 'center',
              padding: '20px',
              boxSizing: 'border-box'
            }}
          >
            <h1 style={{ 
              fontSize: 'clamp(30px, 6vw, 50px)',
              margin: 0,
              padding: '0 20px'
            }}>
              Welcome to Chess Trainer!
            </h1>
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
              zIndex: 1000,
              padding: '20px',
              boxSizing: 'border-box'
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
              zIndex: 2000,
              padding: '20px',
              boxSizing: 'border-box'
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                backgroundColor: 'white',
                padding: 'clamp(20px, 5vw, 50px)',
                borderRadius: '10px',
                textAlign: 'center',
                minWidth: '300px',
                maxWidth: '90vw',
                width: 'auto',
                boxSizing: 'border-box'
              }}
            >
              <h2 style={{ color: '#2c2b29', marginBottom: '20px' }}>
                What's your chess name?
              </h2>
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                style={{ 
                  padding: '12px', 
                  width: '100%', 
                  marginBottom: '20px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  color: '#2c2b29'
                }}
                placeholder="Enter your name"
              />
              
              <h2 style={{ color: '#2c2b29', marginBottom: '20px' }}>
                What's your ELO rating?
              </h2>
              <input
                type="number"
                value={tempElo}
                onChange={(e) => setTempElo(Number(e.target.value))}
                min="100"
                max="3000"
                style={{ 
                  padding: '12px', 
                  width: '100%', 
                  marginBottom: '30px',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  color: '#2c2b29'
                }}
              />
              
              <button
                onClick={handleSubmit}
                style={{
                  padding: '12px 30px',
                  backgroundColor: '#2c2b29',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  width: '100%',
                  maxWidth: '250px',
                  opacity: !tempName.trim() ? 0.6 : 1
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