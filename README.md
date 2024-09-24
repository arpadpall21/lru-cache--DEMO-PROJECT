# LRU Cache
## Description

This is a ***demo*** LRU Cache Redis implementation, for the demo's sake we are working with demo sizes (small cache size, large db latency). The cache has 5 slots, slots are scored based on how many times the resource is accessed, if the cache is full the lowest-scored slot is replaced

## Setup
- Install and start Redis (Redis server should listen on `http://localhost:6379` (default port)) [[link]](https://redis.io/docs/install/install-redis/)
- Run `npm install` to install packages
- Run `npm server.js` to start the server

## Usage
- The resource can be accessed on `http://localhost:3000/some_resource/<ID>` (the `<ID>` content is automatically generated so you can use any numerical id ex: `123`)
- If the content is not cached the latency will be over `2 seconds`, if cached it'll be about `10 milliseconds`
- By accessing more than 5 different resources you'll see cache slot replacement (the least accessed slot is replaced)
