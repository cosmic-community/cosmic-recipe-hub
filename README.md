# Cosmic Recipe Hub

![Recipe Hub Preview](https://imgix.cosmicjs.com/58afc790-7943-11f0-a051-23c10f41277a-photo-1499636136210-6f4ee915583e-1755199060454.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern cooking website built with Next.js 15 and powered by Cosmic CMS. Discover delicious recipes from talented chefs, organized by categories with detailed cooking instructions and chef profiles.

## Features

- 🍳 **Recipe Collection**: Browse comprehensive recipes with ingredients and step-by-step instructions
- 👨‍🍳 **Chef Profiles**: Meet the talented chefs and their specialty cuisines
- 🏷️ **Category Organization**: Explore recipes by Breakfast, Appetizers, Desserts, and more
- ⏱️ **Recipe Details**: View prep time, cook time, servings, and difficulty levels
- 📱 **Responsive Design**: Beautiful layout on desktop, tablet, and mobile
- 🖼️ **Optimized Images**: Fast-loading, high-quality food photography
- 🎯 **SEO Ready**: Built-in metadata and structured content

## ## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=689e35be28031fe3849acec2&clone_repository=689e378528031fe3849acee4)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a Cooking Website with recipes, authors, and categoris"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic CMS** - Headless content management
- **Imgix** - Image optimization and delivery

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cosmic-recipe-hub
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
# Copy the example file
cp .env.example .env.local

# Add your Cosmic credentials
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your recipe website.

## Cosmic SDK Examples

### Fetching All Recipes
```typescript
import { cosmic } from '@/lib/cosmic'

const recipes = await cosmic.objects
  .find({
    type: 'recipes'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Getting Recipe by Slug
```typescript
const recipe = await cosmic.objects
  .findOne({
    type: 'recipes',
    slug: 'chocolate-chip-cookies'
  })
  .depth(1)
```

### Filtering by Category
```typescript
const breakfastRecipes = await cosmic.objects
  .find({
    type: 'recipes',
    'metadata.category': categoryId
  })
  .depth(1)
```

## Cosmic CMS Integration

This website leverages your existing Cosmic bucket structure:

### Content Types
- **Recipes** (🍳): Complete recipe information with ingredients, instructions, and metadata
- **Categories** (🏷️): Recipe organization (Breakfast, Appetizers, Desserts)
- **Authors** (👨‍🍳): Chef profiles with bios and specialty cuisines

### Key Features
- Connected objects for seamless category and author relationships
- Image optimization using Imgix URLs
- Rich text content for ingredients and instructions
- Structured metadata for recipe details

## Deployment Options

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in the Vercel dashboard
3. Deploy automatically on each push

### Netlify
1. Connect your repository to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in site settings

### Environment Variables for Production
Set these in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

For more information about Cosmic, visit [https://www.cosmicjs.com](https://www.cosmicjs.com).
<!-- README_END -->