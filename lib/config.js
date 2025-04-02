const config = {
  env: {
    databaseUrl: process.env.DATABASE_URL,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL,
      redisToken: process.env.UPSTASH_REDIS_TOKEN,
    },
  },
};

export default config;
