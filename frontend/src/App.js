import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import './App.css';

function App() {
	const handleClick = () => {
		const res = SpotifyApi.performUserAuthorization(
			process.env.REACT_APP_SPOTIFY_CLIENT_ID, 
			process.env.REACT_APP_SPOTIFY_REDIRECT_URI, 
			['user-read-private', 'user-read-email'],
			'http://localhost:8888/login');
		console.log(res);
		console.log("HELLO");
	}

  return (
    <div className="App">
      <div onClick={handleClick}>CLICK ME</div>
    </div>
  );
}

export default App;
