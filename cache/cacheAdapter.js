import { createClient as createRedisClient } from 'redis';

const cacheSize = 5;

class CacheAdapter {
  constructor() {
    this.cacheRankName = 'cacheRank';
    this.redisClient = null;
    this.#connect();
  }

  #connect() {
    createRedisClient().on('error', err => console.log('Redis Client Error', err)).connect()
      .then(redisClient => {
        this.redisClient = redisClient;
        console.log('Redis connection OK');
      })
      .catch(err => console.error(`Redis connection failed: ${err}`))
  }

  async getContent(id) {
    const content = await this.redisClient.get(id);

    if (!content) {
      return null;
    }

    await this.redisClient.sendCommand(['ZINCRBY', this.cacheRankName, '1', id]);
    return content;
  }

  async setContent(id, content) {
    if (await this.redisClient.sendCommand(['ZCARD', this.cacheRankName]) > cacheSize) {
      const lastMember = await this.redisClient.sendCommand(['ZPOPMIN', this.cacheRankName]);
      await this.redisClient.del(lastMember[0]);
    }

    await this.redisClient.set(id, content);
    await this.redisClient.sendCommand(['ZADD', this.cacheRankName, '1', id]);
  }
}

const cache = new CacheAdapter();
export default cache;
