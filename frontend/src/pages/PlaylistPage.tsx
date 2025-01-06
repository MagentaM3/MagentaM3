import { columns, PlaylistTrack } from '@/components/playlist/columns';
import { DataTable } from '@/components/playlist/data-table';
import { Button } from '@/components/ui/button';
import { ButtonLoading } from '@/components/ui/button-loading';
import { trpc } from '@/utils/trpc';
import { useState } from 'react';
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
	const syncMutation = trpc.user.syncSpotifyData.useMutation({
    onSuccess: () => {
      setLoading(false);
    }
  });

	const [loading, setLoading] = useState(false);

	const handleClick = () => {
		setLoading(true);
		syncMutation.mutate();
	}

  return (
		<>
			<div className="container mx-auto py-10">
				<DataTable columns={columns} data={data} />
				<br/>
				{loading ? <ButtonLoading>Syncing</ButtonLoading> : <Button onClick={handleClick}>Sync Spotify</Button>}
			</div>
		</>
  )
}

export default PlaylistPage;