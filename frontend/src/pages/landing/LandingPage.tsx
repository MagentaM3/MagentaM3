import car from '../../assets/magentam3.jpg';

export const LandingPage = () => {

	const handleClick = async () => {
		const scopes = ['user-read-private', 'user-read-email']
		// this is the backend url that is posted the access token :) 
		const postbackUrl = 'http://localhost:8888/login';

		const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID ?? ""
		const redirectUri = import.meta.env.VITE_SPOTIFY_REDIRECT_URI ?? ""

		// your application requests authorization
		const scope = 'user-read-private user-read-email';
		console.log("A")


		const authUrl = new URL("https://accounts.spotify.com/authorize")

		const params = {
			response_type: 'code',
			client_id: clientId,
			scope: scope,
			redirect_uri: redirectUri,
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