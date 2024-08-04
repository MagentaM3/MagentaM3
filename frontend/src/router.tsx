import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import LandingPage from "@/pages/LandingPage";
import PlaylistPage from "@/pages/PlaylistPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
			<Route path="/playlist/" element={<PlaylistPage />} />
    </>
  )
);