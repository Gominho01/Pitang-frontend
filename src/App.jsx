import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import AppointmentPage from './components/AppointmentForm';
import { ModalProvider } from './context/modalContext';
import CustomModal from './utils/customModal';

function App() {
  return (
    <ModalProvider>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AppointmentPage />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </ModalProvider>
  );
}

export default App;