import type { TRPCRouterRecord } from "@trpc/server";
import { protectedProcedure } from "../trpc";
import { sql, desc } from "drizzle-orm";
import { chirps } from "@repo/db/schema";

export const dashboardRouter = {
  getChirpsByDay: protectedProcedure.query(async ({ ctx }) => {
    const all = await ctx.db
      .select({
        date: chirps.created_at,
        chirps: sql<number>`cast(count(${chirps.id}) as int)`,
      })
      .from(chirps)
      .groupBy(chirps.created_at)
      .orderBy(desc(chirps.created_at));
    return all;
  }),
} satisfies TRPCRouterRecord;
