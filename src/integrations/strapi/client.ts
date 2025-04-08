
// Strapi client configuration
import Strapi from 'strapi-sdk-js';

const STRAPI_URL = import.meta.env.VITE_STRAPI_API_URL || 'http://localhost:1337';
const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN || '';

export const strapi = new Strapi({
  url: STRAPI_URL,
  prefix: '/api',
  store: {
    key: 'strapi_jwt',
    useLocalStorage: true,
    cookieOptions: { path: '/' }
  },
  axiosOptions: {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
  },
});
