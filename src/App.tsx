import { useState } from 'react';
import { UserProvider } from './context/UserContext';
import Welcome from './components/WelcomeScreen';
import Game from './components/ChessBoard'; // Game component

function AppContent() {
  const [welcomeComplete, setWelcomeComplete] = useState(false);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {!welcomeComplete ? (
        <Welcome onComplete={() => setWelcomeComplete(true)} />
      ) : (
        <Game />
      )}
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}