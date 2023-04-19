const redis = require("redis");

const client = redis.createClient(process.env.REDIS_URL);

// Test Redis connection
client.on("connect", () => {
  console.log("Connected to Redis");
});

// Set a key-value pair in Redis
client.set("myKey", "myValue", (err, reply) => {
  if (err) throw err;
  console.log(reply);
});
client.expire("myKey", 10);

// Get a value from Redis
client.get("myKey", (err, reply) => {
  if (err) throw err;
  console.log(reply);
});
