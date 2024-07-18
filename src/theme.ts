import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        backgroundColor: '#BCC2C8',
        minHeight: '100vh',
      },
    },
  },
});

export default theme;
