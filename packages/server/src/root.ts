import { chirpRouter } from "./routers/chirp";
import { dashboardRouter } from "./routers/dashboard";
import { demo } from "./routers/demo";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  demo: demo,
  chirp: chirpRouter,
  dashboard: dashboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
