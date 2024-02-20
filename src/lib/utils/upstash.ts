// import { Ratelimit } from '@upstash/ratelimit';
// import { Redis } from '@upstash/redis';
// import { building } from '$app/environment';
// import {
//   UPSTASH_REDIS_REST_TOKEN,
//   UPSTASH_REDIS_REST_URL,
// } from '$env/static/private';

// let redis: Redis;
// let ratelimit: Ratelimit;

// if (!building) {
//   redis = new Redis({
//     url: UPSTASH_REDIS_REST_URL,
//     token: UPSTASH_REDIS_REST_TOKEN,
//   });

//   ratelimit = new Ratelimit({
//     redis,
//     limiter: Ratelimit.slidingWindow(2, '1 d'),
//   });
// }

// export { redis, ratelimit };
