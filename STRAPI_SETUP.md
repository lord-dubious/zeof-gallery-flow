
# Strapi Integration Setup Instructions

This document outlines the steps needed to set up Strapi as the CMS for your application.

## 1. Install Strapi

```bash
# Create a new Strapi project in a separate directory
npx create-strapi-app@latest my-strapi-cms --quickstart
```

## 2. Content Types Configuration 

When Strapi starts, you'll be prompted to create an admin account. After logging in, create the following content types:

### Navigation Items
- Display name: Navigation Item
- API ID: navigation-item
- Fields:
  - title (Text)
  - path (Text)
  - display_order (Number)
  - is_active (Boolean)
  - is_external (Boolean)

### Site Contents
- Display name: Site Content
- API ID: site-content
- Fields:
  - page (Text)
  - section (Text)
  - title (Text)
  - subtitle (Text)
  - description (Text, Long text)
  - content (JSON)
  - image (Media, single file)

### Categories
- Display name: Category
- API ID: category
- Fields:
  - title (Text)
  - slug (Text)
  - description (Text, Long text)
  - display_order (Number)
  - image (Media, single file)
  - is_active (Boolean)

### Images
- Display name: Image
- API ID: image
- Fields:
  - title (Text)
  - description (Text, Long text)
  - image (Media, single file)
  - thumbnail (Media, single file)
  - is_published (Boolean)
  - image_role (Text)
  - metadata (JSON)

## 3. Preconfigured Content Structure

### For quick setup, here's the content structure you should create:

#### Site Contents:
1. Home > Hero Section
   - page: home
   - section: hero
   - title: The Art of Refined Elegance
   - description: Where timeless craftsmanship meets contemporary sophistication
   - content: JSON with overlay settings and hero text

2. Home > Featured Collections
   - page: home
   - section: featured
   - title: Masterpieces of Craftsmanship
   - description: Discover our curated collections...

3. Home > Atelier Section
   - page: home
   - section: atelier
   - title: The House of Zeof Legacy
   - description: For over three decades...

4. Home > Shop Categories
   - page: home
   - section: shop
   - title: Discover Our Atelier
   - description: Experience the epitome of bespoke craftsmanship

#### Categories:
Create at least these categories:
1. Tropical Suits
2. African Suits
3. Bespoke Shirts

#### Navigation Items:
1. Home (path: /, display_order: 1)
2. Gallery (path: /gallery, display_order: 2)
3. About (path: /about, display_order: 3)
4. Contact (path: /contact, display_order: 4)

## 4. Configure API Permissions

1. Go to Settings > USERS & PERMISSIONS PLUGIN > Roles
2. Select the "Public" role
3. Under Permissions, enable read access for navigation-items, site-contents, categories, and images
4. Save your changes

## 5. Generate API Token

1. Go to Settings > API Tokens
2. Create a new API token with a descriptive name (e.g., "Frontend Access")
3. Set Token type to "Full access" or customize permissions as needed
4. Copy this token as it will only be shown once

## 6. Set Environment Variables

Add these environment variables to your application's .env file:

```
VITE_STRAPI_API_URL=http://localhost:1337
VITE_STRAPI_API_TOKEN=your-api-token
```

## 7. Import Sample Data (Optional)

If you have existing data in Supabase:
1. Export your Supabase data as JSON
2. Use the Strapi import plugin or create entries manually

## 8. Start Both Applications

```bash
# In one terminal (Strapi)
cd path-to-strapi
npm run develop

# In another terminal (React app)
npm run dev
```

## 9. Verify Integration

1. Open your React app and check that it's fetching data from Strapi
2. If data appears correctly, the integration is successful

## Troubleshooting

- If you encounter CORS issues, configure CORS in Strapi's middleware settings
- If images don't load, check the media URL configuration in Strapi
- For authentication issues, verify your API token is correctly set
