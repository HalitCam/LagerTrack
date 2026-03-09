const Redis = require("ioredis");
const redis = new Redis({
    host: "redis-server",
    port: 6379,
});

export default redis;
