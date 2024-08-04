import car from '../assets/magentam3.jpg';

export const LandingPage = () => {

	const handleClick = async () => {
		const scope = 'user-read-private user-read-email';
		const authUrl = new URL("https://accounts.spotify.com/authorize")

		const params = {
			client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID ?? "",
			redirect_uri: import.meta.env.VITE_SPOTIFY_REDIRECT_URI ?? "",
			response_type: 'code',
			scope: scope,
		}

		authUrl.search = new URLSearchParams(params).toString();
		window.open(authUrl.toString());
	}

	return (
		<>
			<div className='flex flex-row m-10'>
				<div className='flex flex-col'>
					<h1 className='text-8xl font-bold font-sans'>The best way to manage your playlists</h1>
					<div className='w-full flex'>
						<button
							className='bg-green-600 p-4 text-white rounded m-auto justify-around mt-10 text-2xl'
							onClick={handleClick}
						>
							Login to Spotify
						</button>
					</div>
				</div>
				<img src={car} width={700} />
			</div>
		</>
	);
};