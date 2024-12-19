import { columns, PlaylistTrack } from '@/components/playlist/columns';
import { DataTable } from '@/components/playlist/data-table';
import { trpc } from '@/utils/trpc';
import { useParams } from 'react-router-dom';

function getData(playlistId: string): PlaylistTrack[] {
	console.log(playlistId)
	// Fetch data from your API here.
	return [
		{
			id: '827',
			title: 'Harmony',
			album: 'Voyage',
			artist: ['Tame Impala', 'The Weeknd'],
			duration: 123456,
			image: 'https://i.scdn.co/image/ab67616d0000b273adf5288a3712aaee4a5b850f',
		},
		{
			id: '539',
			title: 'Testing',
			album: 'Chords',
			artist: ['Alice', 'Bob', 'Charlie'],
			duration: 210478,
			image: 'https://i.scdn.co/image/ab67616d0000b273adf5288a3712aaee4a5b850f',
		},
		{
			id: '194',
			title: 'Echoes',
			album: 'Rhythm',
			artist: ['Dua Lipa', 'Elton John'],
			duration: 152394,
			image: 'https://i.scdn.co/image/ab67616d0000b273adf5288a3712aaee4a5b850f',
		},
		{
			id: '438',
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
		// ...
	]
}

const PlaylistPage = () => {
	const { playlistId } = useParams();
	trpc.user.user.useQuery();
	const data = getData(playlistId ?? "");

	return (
		<>
			<div className="container mx-auto py-10">
				<DataTable columns={columns} data={data} />
			</div>
		</>
	)
}

export default PlaylistPage;