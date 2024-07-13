import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import AppointmentPage from './components/AppointmentForm';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppointmentPage />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;