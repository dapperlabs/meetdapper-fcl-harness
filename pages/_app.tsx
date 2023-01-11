import type { AppProps } from "next/app";
import { theme } from "../styles/charka-ui";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import AppProvider from "../providers/AppProvider";
import FullWidthLayout from "../components/FullWidthLayout";
import "flow/fcl/config";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppProvider>
        <FullWidthLayout>
          <Component {...pageProps} />
        </FullWidthLayout>
      </AppProvider>
    </ChakraProvider>
  );
}
