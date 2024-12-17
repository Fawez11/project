import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 600 }); // Cache TTL of 10 minutes

export const CACHE_KEYS = {
  PRODUCTS: "products",
  CARTS: "carts",
  CATEGORIES: "categories",
  SUB_CATEGORIES: "subCategories",
  SUB_SUB_CATEGORIES: "subSubCategories",
  CHARACTERISTICS: "characteristics",
  ORDERS: "orders",
};

export const cacheMiddleware = (key) => (req, res, next) => {
  if (req.method === "GET") {
    const cacheKey = typeof key === "function" ? key(req) : key;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(cachedData);
    }
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.set(cacheKey, body);
      res.sendResponse(body);
    };
  }
  next();
};

export const autoCacheInvalidate = (resourceKey) => (req, res, next) => {
  next();
  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    console.log(
      `Invalidating cache for ${resourceKey} due to ${req.method} operation`
    );
    cache.del(resourceKey);
    if (req.params.id) {
      cache.del(`${resourceKey}_${req.params.id}`);
    }
  }
};

export const invalidateCache = (key) => {
  cache.del(key);
};
