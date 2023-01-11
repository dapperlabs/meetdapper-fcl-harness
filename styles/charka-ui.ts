import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: "system",
};

export const theme = extendTheme({
  config,
});
