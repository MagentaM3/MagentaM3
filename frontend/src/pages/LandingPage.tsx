import LandingImage from '@/assets/illustrations/LandingImage';
import { Button } from '@/components/ui/button';

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
				<div className='flex w-full m-8'>
					<div className='flex flex-col justify-around w-2/5 mr-4'>
						<div className='text-foreground'>
							<h1 className='text-right text-7xl xs:text-4xl text-transparent leading-snug
								bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text'>
								MagentaM3
							</h1>
							<h2 className='text-right text-3xl'>Organize your Playlists</h2>
							<div className='flex flex-row-reverse mt-12'>
								<Button variant='secondary' className='hover:ring-2 ring-offset-2 hover:ring-secondary/80'  
									onClick={handleClick} 
								>
									Login to Spotify
								</Button>
							</div>
						</div>
					</div>
					<div className='w-3/5 max-w-lg'>
						<LandingImage/>
					</div>
				</div>
			</div>
		</header>
	);
};

export default LandingPage;