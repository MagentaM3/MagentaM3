import CouldNotFetchImage from "@/assets/illustrations/CouldNotFetchImage";
import { ColumnSelector } from "@/components/ColumnSelector";
import { Loader } from "@/components/loader/loader";
import { DataTable } from "@/components/playlist/data-table";
import { useColumns } from "@/stores/columnStore";
import { trpc } from "@/utils/trpc";
import { useParams } from "react-router-dom";

const PlaylistPage = () => {
  const { playlistId } = useParams();
  const { columns } = useColumns();

  // TODO: Make it so that it checks for an empty / invalid playlistId below
  const userPlaylist = trpc.playlist.getPlaylist.useQuery({
    playlistId: playlistId ?? " ",
  });
  const profileQuery = trpc.user.getProfile.useQuery();
  if (userPlaylist.isLoading) return <Loader />;

  const playlistData = userPlaylist.data;

  if (!playlistData) return <CouldNotFetchImage />;
  // TODO: improve fallback content and loader

  if (profileQuery.isLoading) return <Loader />;
  const profileData = profileQuery.data;
  if (!profileData) return <CouldNotFetchImage />;
  // console.log(playlistData.tracks)

  return (
    <>
      <div className="container mx-auto py-10">
        <ColumnSelector />
        <DataTable
          columns={columns}
          data={playlistData.tracks.map((track) => ({
            id: track.track.id,
            title: track.track.name,
            album: track.track.album.name,
            artist: track.track.artists.map((artist) => artist.name),
            duration: track.track.durationMs,
            image:
              track.track.images.length == 0 ? "" : track.track.images[0].url,
          }))}
        />
      </div>
    </>
  );
};

export default PlaylistPage;
