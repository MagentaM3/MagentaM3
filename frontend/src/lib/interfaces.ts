interface Playlist {
	collaborative: boolean,
	description: string,
	id: string,
	name: string,
	ownerId: string,
	snapshotId: string,
	uri: string
}

interface Image {
	albumId: string | null,
	playlistId: string | null,
	height: number | null,
	width: number | null,
	url: string,
	userId: string | null,
}

interface PlaylistImg {
	images: Image,
	playlists: Playlist,
}

interface CarouselPlaylist {
	id: string,
	name: string,
	url: string,
}