import { Chessboard } from 'react-chessboard';
import { useUser } from '../context/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import playerAvatar from '../assets/annime-default-avatar.jpg';
import { Chess } from 'chess.js';

export default function Game() {
    const { selectedMaster, name, elo } = useUser();
    const [message, setMessage] = useState<string | null>(null);
    const [game, setGame] = useState(new Chess());

    const masterElo = elo + 700;

    // Mock message trigger for testing
    useEffect(() => {
        const timer = setTimeout(() => {
            setMessage("Let's see what you've got!");
        }, 3000);

        const clear = setTimeout(() => {
            setMessage(null);
        }, 8000);

        return () => {
            clearTimeout(timer);
            clearTimeout(clear);
        }
    }, []);

    function onDrop(sourceSquare: string, targetSquare: string) {
        const gameCopy = new Chess(game.fen());
        try {
            const move = gameCopy.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: 'q', // always promote to a queen for example simplicity
            });

            // illegal move
            if (move === null) return false;

            setGame(gameCopy);
            return true;
        } catch (error) {
            return false;
        }
    }

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1a1a1a',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Top Right Opponent Info */}
            {selectedMaster && (
                <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '30px',
                    zIndex: 20, // Ensure it's above board but handled
                    maxWidth: '300px', // Prevent it becoming too wide
                    pointerEvents: 'none'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            {/* Conversation Bubble */}
                            <AnimatePresence>
                                {message && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        style={{
                                            backgroundColor: 'white',
                                            color: '#2c2b29',
                                            padding: '12px 20px',
                                            borderRadius: '15px',
                                            marginRight: '10px',
                                            position: 'relative',
                                            maxWidth: '250px',
                                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                            fontSize: '0.9rem',
                                            fontStyle: 'italic',
                                            fontWeight: '500',
                                            pointerEvents: 'auto'
                                        }}
                                    >
                                        {message}
                                        {/* Triangle pointer */}
                                        <div style={{
                                            position: 'absolute',
                                            right: '-8px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            width: 0,
                                            height: 0,
                                            borderTop: '8px solid transparent',
                                            borderBottom: '8px solid transparent',
                                            borderLeft: '10px solid white'
                                        }} />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Profile Image */}
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                border: '3px solid #81b64c',
                                boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                                backgroundColor: '#2c2b29'
                            }}>
                                <img
                                    src={selectedMaster.src}
                                    alt={selectedMaster.name}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Name and Title - Moved below image or adjusted to ensure no overlap if possible, 
                            but user wanted "Right Top Corner". 
                            We keep it here but ensure the BOARD doesn't hit it. */}
                        <div style={{ textAlign: 'right', color: 'white' }}>
                            <div style={{
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                            }}>
                                {selectedMaster.name}
                            </div>
                            <div style={{
                                fontSize: '0.8rem',
                                color: '#81b64c',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontWeight: '600'
                            }}>
                                {selectedMaster.title} | {masterElo} <span style={{ opacity: 0.7, fontSize: '0.7em', textTransform: 'none' }}>(Limited)</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div style={{
                // Make board responsive so it shrinks on small screens, preventing overlap
                width: 'min(600px, 85vw)',
                height: 'min(600px, 85vw)',
                maxWidth: '80vh', // Also constrain by height
                maxHeight: '80vh',
                padding: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div style={{ width: '100%', height: '100%' }}>
                    <Chessboard
                        // @ts-ignore
                        position={game.fen()}
                        showBoardNotation={true}
                        boardOrientation="white"
                        arePiecesDraggable={true}
                        snapToCursor={true}
                        animationDuration={200}
                        customBoardStyle={{
                            borderRadius: '8px',
                            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)'
                        }}
                        customDarkSquareStyle={{ backgroundColor: '#769656' }}
                        customLightSquareStyle={{ backgroundColor: '#eeeed2' }}
                        onPieceDrop={onDrop}
                    />
                </div>
            </div>

            {/* Bottom Left Player Info */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '30px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                zIndex: 10
            }}>
                {/* Player Avatar */}
                <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                    backgroundColor: '#2c2b29',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img
                        src={playerAvatar}
                        alt="Player Avatar"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                </div>

                {/* Player Details */}
                <div style={{ color: 'white' }}>
                    <div style={{
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}>
                        {name || 'Player'}
                    </div>
                    <div style={{
                        fontSize: '0.9rem',
                        color: '#cccccc',
                        fontWeight: '500'
                    }}>
                        {elo} ELO
                    </div>
                </div>
            </div>
        </div>
    );
}