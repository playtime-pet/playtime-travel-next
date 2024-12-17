// utils/lruCache.ts
import { LRUCache } from 'lru-cache';
import { PetInfo } from '../models/PetInfo';
import { UserInfo } from '../models/UserInfo';

const options = {
  max: 100, // 最大缓存条目数
  ttl: 1000 * 60 * 5, // 每个条目缓存 5 分钟（以毫秒为单位）
};

const userCache = new LRUCache<string, UserInfo>(options);

const petCache = new LRUCache<string, PetInfo>(options);
export { userCache, petCache };
