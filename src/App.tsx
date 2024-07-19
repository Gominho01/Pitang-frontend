import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import AppointmentPage from './pages/formsPage';
import { ModalProvider } from './context/modalContext';
import AppointmentList from './pages/listPage';
import Navbar from './components/header/header'
import theme from './theme';

const App: React.FC = () => {
  return (
    <ModalProvider>
      <ChakraProvider theme={theme}>
        <Router>
          <Navbar />
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