import CouldNotFetchImage from '@/assets/illustrations/CouldNotFetchImage';
import { Loader } from '@/components/loader/loader';
import { columns, PlaylistTrack } from '@/components/playlist/columns';
import { DataTable } from '@/components/playlist/data-table';
import { trpc } from '@/utils/trpc';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function getData(): PlaylistTrack[] {
	// Fetch data from your API here.

	// Given the playlist id, find all tracks inside
	return [
		{
			id: '123',
			title: 'Settle',
			album: 'Testing',
			artist: ['BAYNK', 'Sinéad Harnett'],
			duration: 174382,
			image: 'https://i.scdn.co/image/ab67616d0000b273adf5288a3712aaee4a5b850f',
		},
		{
			id: '316',
			title: 'Adventure',
			album: 'Harmony',
			artist: ['Justin', 'Felix', 'EZC'],
			duration: 98000,
			image: 'https://i.scdn.co/image/ab67616d0000b273adf5288a3712aaee4a5b850f',
		},
		{
			id: '601',
			title: 'Voyage',
			album: 'Settle',
			artist: ['Tame Impala', 'The Weeknd'],
			duration: 283499,
			image: 'https://i.scdn.co/image/ab67616d0000b273adf5288a3712aaee4a5b850f',
		},
		{
			id: '784',
			title: 'Chords',
			album: 'Echoes',
			artist: ['Alice', 'Bob', 'Charlie'],
			duration: 112485,
			image: 'https://i.scdn.co/image/ab67616d0000b273adf5288a3712aaee4a5b850f',
		},
		{
			id: '254',
			title: 'Rhythm',
			album: 'Testing',
			artist: ['BAYNK', 'Sinéad Harnett'],
			duration: 139402,
			image: 'https://i.scdn.co/image/ab67616d0000b273adf5288a3712aaee4a5b850f',
		},
		{
			id: '405',
			title: 'Harmony',
			album: 'Settle',
			artist: ['Dua Lipa', 'Elton John'],
			duration: 176934,
			image: 'https://i.scdn.co/image/ab67616d0000b273adf5288a3712aaee4a5b850f',
		},
		{
			id: '982',
			title: 'Testing',
			album: 'Adventure',
			artist: ['Justin', 'Felix', 'EZC'],
			duration: 215768,
			image: 'https://i.scdn.co/image/ab67616d0000b273adf5288a3712aaee4a5b850f',
		},
		{
			id: '763',
			title: 'Echoes',
			album: 'Voyage',
			artist: ['Alice', 'Bob', 'Charlie'],
			duration: 195438,
			image: 'https://i.scdn.co/image/ab67616d0000b273adf5288a3712aaee4a5b850f',
		},
		{
			id: '689',
			title: 'Settle',
			album: 'Harmony',
			artist: ['Tame Impala', 'The Weeknd'],
			duration: 259864,
			image: 'https://i.scdn.co/image/ab67616d0000b273adf5288a3712aaee4a5b850f',
		},
		{
			id: '689',
			title: 'Settle',
			album: 'Harmony',
			artist: ['Tame Impala', 'The Weeknd'],
			duration: 259864,
			image: 'https://i.scdn.co/image/ab67616d0000b273adf5288a3712aaee4a5b850f',
		},
		{
			id: '689',
			title: 'Settle',
			album: 'Harmony',
			artist: ['Tame Impala', 'The Weeknd'],
			duration: 259864,
			image: 'https://i.scdn.co/image/ab67616d0000b273adf5288a3712aaee4a5b850f',
		},
		// ...
	]
}

const PlaylistPage = () => {

	// Initial Sync
	const [syncing, setSyncing] = useState(true);
	const [error, setError] = useState(false);

	const syncMutation = trpc.user.syncSpotifyData.useMutation({
		onError: () => {
			setError(true);
		},
		onSettled: () => {
			setSyncing(false);
		}
	});

	useEffect(() => {
		syncMutation.mutate();
	}, []);

	const { playlistId } = useParams();
	const data = getData();
	const profileQuery = trpc.user.getProfile.useQuery();

	if (syncing || syncMutation.isLoading || profileQuery.isLoading) return <Loader />;

	// TODO: improve fallback content and loader
	const profileData = profileQuery.data;
	if (error || !profileData) return <CouldNotFetchImage />;

	return (
		<>
			<div className="container mx-auto py-10">
				<DataTable columns={columns} data={data} />
			</div>
		</>
	)
}

export default PlaylistPage;