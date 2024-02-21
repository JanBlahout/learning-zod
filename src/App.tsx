import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import { Button } from '@/components/ui/button';
import { ShadForm } from './components/ShadForm';
import NakedForm from './components/NakedForm';

function App() {
  const [showZodOnly, setShowZodOnly] = useState<boolean>(true);
  const [showRHF, setShowRHF] = useState<boolean>(false);
  const [showShad, setShowShad] = useState<boolean>(false);

  return (
    <>
      <div className="flex gap-4 mb-4">
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
      </div>
      {showZodOnly && <NakedForm />}
      {showRHF && <Form />}
      {showShad && <ShadForm />}
    </>
  );
}

export default App;
