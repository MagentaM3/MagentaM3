// import CouldNotFetchImage from '@/assets/illustrations/CouldNotFetchImage';
// import { Loader } from '@/components/loader/loader';
import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselApi,
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

	// Initial Sync
	// const [syncing, setSyncing] = useState(true);
	// const [error, setError] = useState(false);

	const [api, setApi] = useState<CarouselApi>()
	const [current, setCurrent] = useState(0)
	const [count, setCount] = useState(0)

	// const syncMutation = trpc.user.syncSpotifyData.useMutation({
	// 	onError: () => {
	// 		setError(true);
	// 	},
	// 	onSettled: () => {
	// 		setSyncing(false);
	// 	}
	// });

	// useEffect(() => {
	// 	syncMutation.mutate();
	// }, []);


	// const profileQuery = trpc.user.getProfile.useQuery();

	// if (syncing || syncMutation.isLoading || profileQuery.isLoading) return <Loader />;

	// // TODO: improve fallback content and loader
	// const profileData = profileQuery.data;
	// if (error || !profileData) return <CouldNotFetchImage />;


	useEffect(() => {
		if (!api) {
			return
		}

		setCount(api.scrollSnapList().length)
		setCurrent(api.selectedScrollSnap() + 1)

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1)
		})
	}, [])

	const userPlaylists = trpc.playlist.getPlaylists.useQuery()

	return (
		<>
			<header className="pt-8 text-center text-3xl font-semibold">Choose a Playlist to Sort</header>
			<div className="mx-auto max-w-xs grid content-center min-h-screen">

				<Carousel
					// setApi={setApi}
					opts={{
						align: "start",
						loop: true,
					}}
					className="w-full max-w-xs">
					<CarouselContent className="-ml-1">
						{
							userPlaylists.data?.map((playlist, index) => (
								<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
									<div className="p-1">
										<img src={playlist.url} onClick={() => { navigate('/playlist', { state: { playlistId: playlist.id } }) }}></img>
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
				{/* <div className="py-2 text-center text-sm text-muted-foreground">
					Slide {current % 5 + 1} of {count}
				</div> */}
			</div>
		</>
	)

	return (
		<>
			<div className="flex items-center flex-col">
				<header className="p-8">Choose a Playlist to Sort</header>
				<Carousel
					opts={{
						align: "start",
					}}
					orientation="vertical"
					className="w-full max-w-xs"
				>
					<CarouselContent className="-mt-1 h-[700px]">
						{Array.from({ length: 20 }).map((_, index) => (
							<CarouselItem key={index} className="pt-3 md:basis-1/5">
								<div className="p-1">
									<Card>
										<CardContent className="flex items-center justify-center p-6">
											<span className="text-3xl font-semibold">{index + 1}</span>
										</CardContent>
									</Card>
								</div>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselPrevious />
					<CarouselNext />
				</Carousel>
			</div>
		</>
	)
}

export default PlaylistsPage;