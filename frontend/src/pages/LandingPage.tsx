import car from '@/assets/magentam3.jpg';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const LandingPage = () => {

	const handleClick = async () => {
		const scopes = ['user-read-private', 'user-read-email']
		// this is the backend url that is posted the access token :) 
		const postbackUrl = 'http://localhost:8888/login';

		const res = await SpotifyApi.performUserAuthorization(
			import.meta.env.VITE_SPOTIFY_CLIENT_ID ?? "", 
			// please change below to like 'http://localhost:5173/callback'
			import.meta.env.VITE_SPOTIFY_REDIRECT_URI ?? "", 
			scopes, postbackUrl
		);

		console.log(res);
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
				<img src={car} width={700}/>
			</div>
		</>
  );
};

export default LandingPage;