import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import AppointmentPage from './components/AppointmentForm/AppointmentForm';
import { ModalProvider } from './context/modalContext';
import AppointmentList from './components/AppointmentList/AppointmentList';

function App() {
  return (
    <ModalProvider>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<AppointmentPage />} />
            <Route path="/list" element={<AppointmentList />} />
          </Routes>
        </Router>
      </ChakraProvider>
    </ModalProvider>
  );
}

export default App;