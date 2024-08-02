import { trpc } from "../utils/trpc";

export const CollectionPage = () => {
	const syncSpotifyMutation = trpc.user.syncSpotifyData.useMutation();

	const handleClick = async () => {
		syncSpotifyMutation.mutate();
		console.log('hello');
	}

	return (
		<>
			<button
				className='bg-blue-600 p-4 text-white rounded m-auto justify-around mt-10 text-2xl'
				onClick={handleClick}
			>
				User Info
			</button>
		</>
	);
};