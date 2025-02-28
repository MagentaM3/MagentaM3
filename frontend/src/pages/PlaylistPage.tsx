import CouldNotFetchImage from '@/assets/illustrations/CouldNotFetchImage';
import { Loader } from '@/components/loader/loader';
import { columns, PlaylistTrack } from '@/components/playlist/columns';
import { DataTable } from '@/components/playlist/data-table';
import { trpc } from '@/utils/trpc';
import { useParams } from 'react-router-dom';

function getData(): PlaylistTrack[] {
	// Fetch data from your API here.


	// const userPlaylist = trpc.playlist.getPlaylist.useQuery({ playlistId });

	return [
		{
			id: '123',
			title: 'Settle',
			album: 'Settle',
			artist: ['BAYNK', 'Sinéad Harnett'],
			duration: 205128,
			image: 'https://i.scdn.co/image/ab67616d0000b273adf5288a3712aaee4a5b850f'
		},
		// ...
	]
}

const PlaylistPage = () => {
	const { playlistId } = useParams();

	// TODO: Make it so that it checks for an empty / invalid playlistId below
	const userPlaylist = trpc.playlist.getPlaylist.useQuery({ playlistId: playlistId ?? " " });
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
				<DataTable columns={columns} data={playlistData.tracks.map(track => ({
					id: track.track.id,
					title: track.track.name,
					album: track.track.album.name,
					artist: track.track.artists.map(artist => artist.name),
					duration: track.track.durationMs,
					image: track.track.images.length == 0 ? "" : track.track.images[0].url
				}
				))} />
			</div>
		</>
	)
}

export default PlaylistPage;

// Type 'ColumnDef<PlaylistTrack>[]' is not assignable to type 
// 'ColumnDef<{ id: string; title: string | null; album: string; 
// artist: unknown; duration: number | null; image: string | null; }, 
// unknown>[]'.

// export type PlaylistTrack = {
// 	id: string
// 	title: string
// 	album: string
// 	artist: string[]
// 	duration: number
// 	image: string
//   }

// const allTracks: {
//     id: string;
//     title: string | null;
//     album: string;
//     artist: unknown;
//     duration: number | null;
//     image: string | null;
// }[]