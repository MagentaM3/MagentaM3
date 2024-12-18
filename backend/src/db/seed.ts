import { sql } from "drizzle-orm";
import { Logger, LogModule } from "../logging";
import { db } from "./connection";
import { users } from "./schema/user";
import { artists } from "./schema/artist";
import { images } from "./schema/images";
import { albums } from "./schema/album";
import { playlists } from "./schema/playlist";
import { tracks } from "./schema/track";
import { playlistTracks } from "./schema/playlistTrack";

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
    albumType: "single",
    totalTracks: 3,
    name: "best playlist",
    releaseDatePrecision: "year",
    uri: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ id: albums.id });
  console.log(newAlbum);

  Logger.Info(LM, 'Seeding Users');

  const newUser = await db.insert(users).values({
    displayName: 'justin',
    country: 'AU',
    email: 'Justin@kitty.com',
    uri: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ userId: users.id });
  console.log(newUser);

  const newUser2 = await db.insert(users).values({
    displayName: 'justin',
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
    ownerId: 1,
    snapshotId: "snapshot_id",
    uri: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ playlist : playlists.id });
  console.log(newPlaylist);

  Logger.Info(LM, 'Seeding Tracks');

  const newTrack = await db.insert(tracks).values({
    albumId: 1,
    durationMs: 420,
    discNumber: 2,
    explict: true,
    name: "explict",
    popularity: 30,
    previewUrl: "https://test.com",
    trackNumber: 5,
    uri: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ track : tracks.id });
  console.log(newTrack);

  Logger.Info(LM, 'Seeding PlaylistTracks');

  const newPlaylistTrack = await db.insert(playlistTracks).values({
    addedById: 2,
    trackId: 1,
    playlistId: 1
  })
  .returning({ id: playlistTracks.id, added_by : playlistTracks.addedById });
  console.log(newPlaylistTrack);

  Logger.Info(LM, 'Seeding Images');

  const newImage = await db.insert(images).values({
    height: 10,
    width: 12,
    userId: 1,
    albumId: 1,
    url: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ image: images.id });
  console.log(newImage);

  Logger.Info(LM, 'Database has been seeded');
};