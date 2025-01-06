import { sql } from "drizzle-orm";
import { Logger, LogModule } from "../logging";
import { db } from "./connection";
import { albums } from "./schema/album";
import { artists } from "./schema/artist";
import { images } from "./schema/images";
import { playlists } from "./schema/playlist";
import { playlistTracks } from "./schema/playlistTrack";
import { tracks } from "./schema/track";
import { users } from "./schema/user";

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
    const query = sql.raw(`TRUNCATE TABLE "${table.table_name as string}" RESTART IDENTITY CASCADE;`);
    await db.execute(query);
  }

  Logger.Info(LM, 'Database has been cleared');

  Logger.Info(LM, 'Begin seeding the database');

  Logger.Info(LM, 'Seeding Artists');

  await db.insert(artists).values({
		id: '1',
    name: 'justin',
    uri: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ id: artists.id });

  await db.insert(artists).values({
		id: '2',
    name: 'justin',
    uri: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ id: artists.id });

  Logger.Info(LM, 'Seeding Albums');

  await db.insert(albums).values({
		id: '1',
    albumType: "single",
    totalTracks: 3,
    name: "best playlist",
    releaseDatePrecision: "year",
    uri: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ id: albums.id });

  Logger.Info(LM, 'Seeding Users');

  await db.insert(users).values({
		id: '1',
    displayName: 'justin',
    country: 'AU',
    email: 'Justin@kitty.com',
    uri: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ userId: users.id });

  await db.insert(users).values({
		id: '2',
    displayName: 'justin',
    country: 'AU',
    email: 'Justin@kitty.com',
    uri: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ userId: users.id });

  Logger.Info(LM, 'Seeding Playlists');

  await db.insert(playlists).values({
		id: '1',
    collaborative: true,
    description: "my favourite playlist ever",
    name: "YEEEE",
    ownerId: '1',
    snapshotId: "snapshot_id",
    uri: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })
  .returning({ playlist : playlists.id });

  Logger.Info(LM, 'Seeding Tracks');

  await db.insert(tracks).values({
		id: '1',
    albumId: '1',
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

  Logger.Info(LM, 'Seeding PlaylistTracks');

  await db.insert(playlistTracks).values({
		id: '1',
    addedById: '2',
    trackId: '1',
    playlistId: '1'
  })
  .returning({ id: playlistTracks.id, added_by : playlistTracks.addedById });

  Logger.Info(LM, 'Seeding Images');

  await db.insert(images).values({
    height: 10,
    width: 12,
    userId: '1',
    url: "https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga",
  })

  Logger.Info(LM, 'Database has been seeded');
};