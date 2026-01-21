import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import ChessMaster from "./ChessMaster";


export default function Welcome(){
    const [showMenu, setShowMenu] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [name, setName] = useState('');
    const [shouldShow, setShouldShow] = useState(false);
    
    useEffect(() => { // Run this side code after rendering the component
        // 2s delay before starting the transition
        const timer = setTimeout(() => setShowMenu(true), 2000);
        const timer_2 = setTimeout(() => setShouldShow(true), 4000);
        return () => {clearTimeout(timer); clearTimeout(timer_2)}
    }, []);

    return (
        <div>
            <AnimatePresence mode="wait">
                {!showMenu ? (
                <motion.div
                    key="intro-element"
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -70 }} // Swipe up and fade out
                    transition={{ duration: 0.5 }}
                >
                    <h1>Welcome to Chess Trainer!</h1>
                </motion.div>
                ) : (
                <motion.nav
                    key="menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: '#2c2b29', // Official Chess.com background color
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        zIndex: 1000
                    }}
                    >
                    {/* Internal content with a slight delay for a polished look */}
                    {shouldShow && <ChessMaster onNext={() => setShowPopup(true)} />}
                    
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
                    style={{
                    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
                    }}
                >
                    <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '10px', textAlign: 'center' }}>
                        <h2>What's your chess name</h2>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            style={{ padding: '10px', width: '80%', marginBottom: '20px' }}
                        />
                        <br />
                        <button onClick={() => setShowPopup(false)}>Submit</button>
                    </div>
                </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}