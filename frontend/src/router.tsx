import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { CollectionPage } from "./pages/CollectionPage";
import { LandingPage } from "./pages/LandingPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
			<Route path="/collection" element={<CollectionPage />} />
    </>
  )
);