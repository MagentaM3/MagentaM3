import CouldNotFetchImage from "@/assets/illustrations/CouldNotFetchImage";
import { Loader } from "@/components/loader/loader";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious
} from "@/components/ui/carousel";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PlaylistsPage = () => {
	const navigate = useNavigate();
	const utils = trpc.useUtils();

	// Initial Sync
	const [syncing, setSyncing] = useState(true);
	const [error, setError] = useState(false);

	const syncMutation = trpc.user.syncSpotifyData.useMutation({
		onError: () => {
			setError(true);
		},
		onSuccess: () => {
			setSyncing(false);
			utils.playlist.getPlaylists.invalidate();
		}
	});

	useEffect(() => {
		syncMutation.mutate();
	}, []);

	const userPlaylists = trpc.playlist.getPlaylists.useQuery();
	if (syncing || syncMutation.isLoading || userPlaylists.isLoading) return <Loader />;

	const playlistsData = userPlaylists.data;
	if (error || !playlistsData) return <CouldNotFetchImage />;
	console.log(playlistsData);

	return (
		<>
			<header className="pt-8 text-center text-3xl font-semibold">Choose a Playlist to Sort</header>
			<div className="mx-auto max-w-xs grid content-center min-h-screen">

				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					className="w-full max-w-xs">
					<CarouselContent className="-ml-1">
						{
							playlistsData?.map((playlist, index) => (
								<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
									<div className="p-1">
										<img src={playlist.url} onClick={() => { navigate(`/playlist/${playlist.id}`) }}></img>
									</div>
									<div className="py-2 text-center text-sm text-muted-foreground">
										{playlist.name}
									</div>
								</CarouselItem>
							))
							// :
							// <CarouselItem className="md:basis-1/2 lg:basis-1/3">
							// 	<span>You have no playlists available</span>
							// </CarouselItem>
						}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</>
	)
}

export default PlaylistsPage;