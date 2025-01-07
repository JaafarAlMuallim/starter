const ENV_VARS = {
  BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
  DB_URL: process.env.DB_URL,
  SYNC_URL: process.env.SYNC_URL,
  AUTH_TOKEN: process.env.AUTH_TOKEN,
} as const;

export default ENV_VARS;
