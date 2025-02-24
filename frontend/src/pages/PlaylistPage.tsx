import CouldNotFetchImage from '@/assets/illustrations/CouldNotFetchImage';
import { Loader } from '@/components/loader/loader';
import { columns, PlaylistTrack } from '@/components/playlist/columns';
import { DataTable } from '@/components/playlist/data-table';
import { trpc } from '@/utils/trpc';
import { useParams } from 'react-router-dom';

function getData(): PlaylistTrack[] {
	// Fetch data from your API here.
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
	const data = getData();
	const profileQuery = trpc.user.getProfile.useQuery();

	if (profileQuery.isLoading) return <Loader />;

	// TODO: improve fallback content and loader
	const profileData = profileQuery.data;
	if (!profileData) return <CouldNotFetchImage />;

	return (
		<>
			<div className="container mx-auto py-10">
				<DataTable columns={columns} data={data} />
			</div>
		</>
	)
}

export default PlaylistPage;