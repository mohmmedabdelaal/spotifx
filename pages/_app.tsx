import {ChakraProvider,extendTheme} from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import  'reset-css';
import Player from "../components/Player";


const theme = extendTheme({
  colors: {
    gray: {
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ":focus": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

export default function App({ Component, pageProps }) {
  return <ChakraProvider theme={theme}>
    {Component.authPage ? (<Component {...pageProps} />) : (
        <Player>
        <Component {...pageProps} />
        </Player>
    )}

  </ChakraProvider>
}
