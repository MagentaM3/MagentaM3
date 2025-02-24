import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import LandingPage from "@/pages/LandingPage";
import PlaylistPage from "@/pages/PlaylistPage";
import PlaylistsPage from "@/pages/PlaylistsPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LandingPage />} />
      <Route path="/playlists/" element={<PlaylistsPage />} />
      <Route path="/playlist/:playlistId" element={<PlaylistPage />} />
    </>
  )
);