import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { ChakraProvider } from "@chakra-ui/react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { customTheme } from "../shared/theme/themeChakra.jsx";
import { queryClient } from "../shared/api/api_events/query-client.js";

import { AppRoutes } from "./AppRoutes/";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={customTheme}>
        <Router>
          <AppRoutes />
        </Router>
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
