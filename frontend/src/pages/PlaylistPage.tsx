import { SortAnimation } from "@/components/loading";

const PlaylistPage = () => {
	const mockTrpcQuery = { isLoading: true, isSuccess: false, isError: false };

	if (mockTrpcQuery.isLoading) {
		return <SortAnimation />;
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