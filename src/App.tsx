import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import { Button } from '@/components/ui/button';
import { ShadForm } from './components/ShadForm';
import NakedForm from './components/NakedForm';
import { ThemeProvider } from './components/ThemeProvider';
import { ModeToggle } from './components/ModeToggle';

function App() {
  const [showZodOnly, setShowZodOnly] = useState<boolean>(true);
  const [showRHF, setShowRHF] = useState<boolean>(false);
  const [showShad, setShowShad] = useState<boolean>(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex gap-4 mb-4 justify-center flex-wrap">
        <Button
          onClick={() => {
            setShowZodOnly(true);
            setShowRHF(false);
            setShowShad(false);
          }}
        >
          Show Zod only
        </Button>
        <Button
          onClick={() => {
            setShowZodOnly(false);
            setShowRHF(true);
            setShowShad(false);
          }}
        >
          Show Zod With react Hook form
        </Button>
        <Button
          onClick={() => {
            setShowZodOnly(false);
            setShowRHF(false);
            setShowShad(true);
          }}
        >
          Show ShadCN
        </Button>
        <ModeToggle />
      </div>
      {showZodOnly && <NakedForm />}
      {showRHF && <Form />}
      {showShad && <ShadForm />}
    </ThemeProvider>
  );
}

export default App;
