import { sql } from "drizzle-orm";
import { Logger, LogModule } from "../logging";
import { db } from "./connection";
import { users } from "./schema/user";
import { artists } from "./schema/artist";
import { images } from "./schema/images";
import { albums } from "./schema/album";
import { playlists } from "./schema/playlist";
import { tracks } from "./schema/track";
import { playlist_tracks } from "./schema/playlistTrack";

const LM = new LogModule('SEEDER');

export const seedDB = async () => {
  Logger.Info(LM, 'Begin clearing the database');

  // select all tables in the database and delete every row
  const query = sql<string>`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public'
    AND table_type='BASE TABLE'
;`;

  const tables = await db.execute(query);
  for (const table of tables) {
    console.log(table.table_name)
    const query = sql.raw(`TRUNCATE TABLE "${table.table_name as string}" RESTART IDENTITY CASCADE;`);
    await db.execute(query);
  }

  Logger.Info(LM, 'Database has been cleared');

  Logger.Info(LM, 'Begin seeding the database');

  Logger.Info(LM, 'Seeding Artists');

  const newArtist = await db.insert(artists).values({
    name: 'justin',
    uri: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ id: artists.id });
  console.log(newArtist);

  const artist2 = await db.insert(artists).values({
    name: 'justin',
    uri: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ id: artists.id });
  console.log(artist2);

  Logger.Info(LM, 'Seeding Albums');

  const newAlbum = await db.insert(albums).values({
    album_type: "single",
    total_tracks: 3,
    name: "best playlist",
    release_date_precision: "year",
    uri: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ id: albums.id });
  console.log(newAlbum);

  Logger.Info(LM, 'Seeding Users');

  const newUser = await db.insert(users).values({
    display_name: 'justin',
    country: 'AU',
    email: 'Justin@kitty.com',
    uri: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ userId: users.id });
  console.log(newUser);

  const newUser2 = await db.insert(users).values({
    display_name: 'justin',
    country: 'AU',
    email: 'Justin@kitty.com',
    uri: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ userId: users.id });
  console.log(newUser2);

  Logger.Info(LM, 'Seeding Playlists');

  const newPlaylist = await db.insert(playlists).values({
    collaborative: true,
    description: "my favourite playlist ever",
    name: "YEEEE",
    owner_Id: 1,
    snapshot_id: "snapshot_id",
    uri: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ playlist : playlists.id });
  console.log(newPlaylist);

  Logger.Info(LM, 'Seeding Tracks');

  const newTrack = await db.insert(tracks).values({
    album_id: 1,
    duration_ms: 420,
    disc_number: 2,
    explict: true,
    name: "explict",
    popularity: 30,
    preview_url: "https://test.com",
    track_number: 5,
    uri: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ track : tracks.id });
  console.log(newTrack);

  Logger.Info(LM, 'Seeding PlaylistTracks');

  const newPlaylistTrack = await db.insert(playlist_tracks).values({
    added_by_id: 2,
    track_id: 1,
    playlist_id: 1
  })
  .returning({ id: playlist_tracks.id, added_by : playlist_tracks.added_by_id });
  console.log(newPlaylistTrack);

  Logger.Info(LM, 'Seeding Images');

  const newImage = await db.insert(images).values({
    height: 10,
    width: 12,
    user_id: 1,
    album_id: 1,
    url: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ image: images.id });
  console.log(newImage);

  Logger.Info(LM, 'Database has been seeded');
};