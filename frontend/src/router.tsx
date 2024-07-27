import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { LandingPage } from "./pages/landing/LandingPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
    </>
  )
);