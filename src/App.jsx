import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import AppointmentPage from './components/AppointmentForm';
import { ModalProvider } from './context/modalContext';
import CustomModal from './utils/customModal';

function App() {
  return (
    <ChakraProvider>
      <ModalProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AppointmentPage />} />
          </Routes>
          <CustomModal />
        </Router>
      </ModalProvider>
    </ChakraProvider>
  );
}

export default App;