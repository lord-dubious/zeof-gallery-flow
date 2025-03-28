
import GhostContentAPI from '@tryghost/content-api';

// These values should be set in your environment variables in production
const GHOST_URL = import.meta.env.VITE_GHOST_URL || 'https://your-ghost-blog.ghost.io';
const GHOST_CONTENT_API_KEY = import.meta.env.VITE_GHOST_CONTENT_API_KEY || 'your-content-api-key';

// Create API instance with site credentials
export const ghostApi = new GhostContentAPI({
  url: GHOST_URL,
  key: GHOST_CONTENT_API_KEY,
  version: 'v5.0'
});
