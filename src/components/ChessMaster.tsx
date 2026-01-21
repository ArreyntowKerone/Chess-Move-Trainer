import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

export default function ChessMaster({ onNext }) {
    const [showName, setShowName] = useState(false);

    const grandmasters = [
        { 
            src: '/masters/alireza.webp', 
            name: 'Alireza Firouzja', 
            quote: 'I want to be World Champion. That is my dream since I was a child.',
            title: 'Chess Prodigy'
        },
        { 
            src: '/masters/Anish.jpg', 
            name: 'Anish Giri', 
            quote: 'In chess, as in life, a man is his own most dangerous opponent.',
            title: 'Strategic Thinker'
        },
        { 
            src: '/masters/capablanca.webp', 
            name: 'José Raúl Capablanca', 
            quote: 'You may learn much more from a game you lose than from a game you win.',
            title: 'The Chess Machine'
        },
        { 
            src: '/masters/Ding.webp', 
            name: 'Ding Liren', 
            quote: 'Sometimes the hardest move to find is the quiet one.',
            title: 'World Champion'
        },
        { 
            src: '/masters/Fabi.webp', 
            name: 'Fabiano Caruana', 
            quote: 'The difference between a good player and a great player is how they handle pressure.',
            title: 'American #1'
        },
        { 
            src: '/masters/Fischer.jpg', 
            name: 'Bobby Fischer', 
            quote: 'All I want to do, ever, is play chess.',
            title: 'The Greatest'
        },
        { 
            src: '/masters/Hans.png', 
            name: 'Hans Niemann', 
            quote: 'I have sacrificed everything for chess.',
            title: 'Young Talent'
        },
        { 
            src: '/masters/Hikaru.jpeg', 
            name: 'Hikaru Nakamura', 
            quote: 'If you play for a win, you get more opportunities.',
            title: 'Speed Chess King'
        },
        { 
            src: '/masters/Kasparov.webp', 
            name: 'Garry Kasparov', 
            quote: 'The ability to play chess is the sign of a gentleman. The ability to play chess well is the sign of a wasted life.',
            title: 'The Beast from Baku'
        },
        { 
            src: '/masters/Magnus.webp', 
            name: 'Magnus Carlsen', 
            quote: 'I try to play the best move. Sometimes I succeed.',
            title: 'GOAT'
        },
        { 
            src: '/masters/Gukesh.webp', 
            name: 'Gukesh Dommaraju', 
            quote: 'Every game is a new opportunity to prove yourself, regardless of your age or opponent.',
            title: 'History Maker'
        },
        { 
            src: '/masters/Vishy.jpg', 
            name: 'Viswanathan Anand', 
            quote: 'You don\'t win with the best moves. You win with the moves your opponent doesn\'t see.',
            title: 'The Tiger of Madras'
        },
    ];

    const currentMaster = useMemo(() => grandmasters[Math.floor(Math.random() * grandmasters.length)], []);

    return (
        <div style={{ 
            textAlign: 'center', 
            color: 'white',
            padding: '40px 20px',
            maxWidth: '500px',
            margin: '0 auto'
        }}>
            {/* Speech Bubble */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                    backgroundColor: 'white',
                    color: '#2c2b29',
                    padding: '20px 25px',
                    borderRadius: '20px',
                    position: 'relative',
                    marginBottom: '40px',
                    fontSize: '1.1rem',
                    lineHeight: '1.5',
                    maxWidth: '400px',
                    margin: '0 auto 40px',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                    fontStyle: 'italic'
                }}
            >
                "{currentMaster.quote}"
                {/* Triangle for the speech bubble tail */}
                <div style={{
                    position: 'absolute',
                    bottom: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 0,
                    height: 0,
                    borderLeft: '10px solid transparent',
                    borderRight: '10px solid transparent',
                    borderTop: '10px solid white'
                }} />
            </motion.div>

            {/* Master Image with Hover Effect */}
            <div 
                style={{ 
                    position: 'relative',
                    display: 'inline-block',
                    marginBottom: '30px'
                }}
                onMouseEnter={() => setShowName(true)}
                onMouseLeave={() => setShowName(false)}
            >
                <motion.img 
                    src={currentMaster.src} 
                    alt={currentMaster.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    style={{ 
                        width: '320px', 
                        height: '220px', 
                        borderRadius: '12px', 
                        boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
                        objectFit: 'cover',
                        border: '3px solid rgba(255, 255, 255, 0.1)'
                    }}
                />
                
                {/* Hover Overlay - Better Arrangement */}
                {showName && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        style={{
                            position: 'absolute',
                            bottom: '0',
                            left: '0',
                            right: '0',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                            color: 'white',
                            padding: '25px 20px 15px',
                            textAlign: 'center',
                            borderBottomLeftRadius: '12px',
                            borderBottomRightRadius: '12px'
                        }}
                    >
                        <div style={{ 
                            fontSize: '1.4rem', 
                            fontWeight: '700',
                            marginBottom: '6px',
                            textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                        }}>
                            {currentMaster.name}
                        </div>
                        <div style={{ 
                            fontSize: '0.95rem',
                            color: '#81b64c',
                            fontWeight: '600',
                            letterSpacing: '0.5px',
                            textTransform: 'uppercase'
                        }}>
                            {currentMaster.title}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Next Button Container */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <motion.button 
                    onClick={onNext}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        padding: '14px 40px',
                        fontSize: '1.1rem',
                        backgroundColor: '#81b64c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 15px rgba(129, 182, 76, 0.4)',
                        transition: 'all 0.2s ease',
                        minWidth: '180px' // Optional: set minimum width
                    }}
                    whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 6px 20px rgba(129, 182, 76, 0.6)'
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    Train Me
                </motion.button>
            </div>

            {/* Optional: Small hint text */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.8 }}
                style={{
                    fontSize: '0.85rem',
                    marginTop: '20px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontStyle: 'italic'
                }}
            >
                Hover over image to reveal details
            </motion.div>
        </div>
    );
}