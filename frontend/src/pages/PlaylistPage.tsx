import { Loading } from "@/components/loading/Loading";

const PlaylistPage = () => {
	const mockTrpcQuery = { isLoading: true, isSuccess: false, isError: false };

	if (mockTrpcQuery.isLoading) {
		return <Loading />;
	}

	if (mockTrpcQuery.isError) {
		return <div>Error</div>;
	}

	return (
		<>
			Success!
		</>
	);
};

export default PlaylistPage