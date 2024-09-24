import { columns, Payment } from '@/components/playlist/columns';
import { DataTable } from '@/components/playlist/data-table';
import { trpc } from '@/utils/trpc';
import { useParams } from 'react-router-dom';

function getData(playlistId: string): Payment[] {
  // Fetch data from your API here.
  return [
    {
      id: playlistId,
      amount: 100,
      status: "pending",
      email: "m@example.com",
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