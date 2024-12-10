import LandingImage from '@/assets/illustrations/LandingImage';

const LandingPage = () => {

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
		<header className='grid content-center min-h-screen'>
			<div className='flex justify-around'>
				<div className='flex w-2/3'>
					<div className='flex flex-col justify-around w-2/5 mr-4'>
						<div>
							<h1 className='text-right text-7xl text-transparent leading-snug
								bg-gradient-to-r from-pink-600 via-rose-600 to-amber-500 bg-clip-text'>
								MagentaM3
							</h1>
							<h2 className='text-right text-3xl'>Organize your Playlists</h2>
							<div className='flex flex-row-reverse mt-12'>
								<button onClick={handleClick} 
									className='btn btn-amber btn-amber-hover-ring w-1/2'>
									Login to Spotify
								</button>
							</div>
						</div>
					</div>
					<div className='w-3/5'>
						<LandingImage/>
					</div>
				</div>
			</div>
		</header>
	);
};

export default LandingPage;