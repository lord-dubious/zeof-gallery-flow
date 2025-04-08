
# Strapi Integration Setup Instructions

This document outlines the steps needed to set up Strapi as the CMS for your application.

## 1. Install Strapi

```bash
# Create a new Strapi project in a separate directory
npx create-strapi-app@latest my-project --quickstart
```

## 2. Configure Content Types

Once Strapi is running, create the following content types in the Strapi admin panel:

### Navigation Items
- Fields:
  - title (Text)
  - path (Text)
  - display_order (Number)
  - is_active (Boolean)
  - is_external (Boolean)

### Site Contents
- Fields:
  - page (Text)
  - section (Text)
  - title (Text)
  - subtitle (Text)
  - description (Text, Long text)
  - content (JSON)
  - image (Media, single file)

### Categories
- Fields:
  - title (Text)
  - slug (Text)
  - description (Text, Long text)
  - display_order (Number)
  - image (Media, single file)
  - is_active (Boolean)

### Images
- Fields:
  - title (Text)
  - description (Text, Long text)
  - image (Media, single file)
  - thumbnail (Media, single file)
  - is_published (Boolean)
  - image_role (Text)
  - metadata (JSON)

## 3. Configure API Permissions

1. Go to Settings > USERS & PERMISSIONS PLUGIN > Roles
2. Select the "Public" role
3. Give Read permission to all the content types you've created
4. Give Write permission if you need to allow public creation or updates

## 4. Generate API Token

1. Go to Settings > API Tokens
2. Create a new API token with the appropriate permissions
3. Copy this token as it will only be shown once

## 5. Set Environment Variables

Add these environment variables to your application's .env file:

```
VITE_STRAPI_API_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=your-api-token
```

## 6. Import Sample Data (Optional)

If you have existing data in Supabase, you can migrate it to Strapi:

1. Export your Supabase data as JSON
2. Use the Strapi import feature or write a migration script
3. Make sure to properly map the data structure between Supabase and Strapi

## 7. Start Both Applications

Run your React application and Strapi server:

```bash
# In one terminal (Strapi)
cd path-to-strapi
npm run develop

# In another terminal (React app)
npm run dev
```

## 8. Verify Integration

1. Check that your application is successfully fetching data from Strapi
2. Test creating, updating, and deleting content through the admin interface
3. Verify that the content appears correctly in your frontend

## Troubleshooting

- If you encounter CORS issues, configure CORS in Strapi's config/middleware.js
- Check the network tab in DevTools to see the API requests and responses
- Look for error messages in the browser console and Strapi server logs
