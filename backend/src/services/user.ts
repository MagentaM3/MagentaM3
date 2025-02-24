import { eq } from 'drizzle-orm';
import { db } from "../db/connection";
import { users } from "../db/schema/user";

export const getProfile = async (userId: string) => {
	return await db.select().from(users).where(eq(users.id, userId)).limit(1);
}
