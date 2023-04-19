const redis = require("redis");

const client = redis.createClient(process.env.REDIS_URL);

// Test Redis connection
client.on("connect", () => {
  console.log("Connected to Redis");
});

// // Set a key-value pair in Redis

// // Get a value from Redis
// client.get("myKey", (err, reply) => {
//   if (err) throw err;
//   console.log(reply);
// });

module.exports.setCache = (key, value, time) => {
  const reply = client.set(key, value, (err, reply) => {
    if (err) throw err;
    return reply;
  });
  console.log(reply);
  const expire = client.expire(key, time);
  console.log(expire);
};
