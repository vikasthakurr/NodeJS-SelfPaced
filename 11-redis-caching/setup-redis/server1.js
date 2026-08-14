import express from "express";
import dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config();

const app = express();

app.use(express.json());

//connection to redis
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redis.on("connect", () => {
  console.log("connected to redis successfuly");
});

redis.on("error", (error) => {
  console.log("error while connecting to redis", error);
});

//SET
app.get("/set",async(req,res)=>{
  await redis.set("name","vikas")
  res.json({
    message:"data saved successfuly in redis"
  })
})
//GET

app.get("/get",async(req,res)=>{
  const result=await redis.get("name")

  res.json({
    message:"data fetched successfuly from redis",
    data:result
  })
})
//Delete

app.delete("/delete",async(req,res)=>{
  await redis.del("name");

  res.json({
    message:"data deleted successfuly from redis"
  })
})
//Expiration
app.get("/set-expire",async(req,res)=>{
  await redis.set("email","vikas@gmail.com");
  await redis.expire("email",120);

  res.json({
    message:"data set with expiration of 10 seconds"
  })
})
//Check TTL
app.get("/ttl",async(req, res)=>{
  const result=await redis.ttl("email");
  res.json({
    message:`time to live for email is ${result} seconds`
  })
})

//expire existing

app.get("/expire",async (req,res)=>{
  await redis.expire("email",30)
  res.json({
    message:"expiration time updated"
  })

})

app.listen(3000, () => console.log("server is running on port 3000"));
