# Blog + Admin CMS System

A complete, production-ready blog and admin CMS system built with Next.js 14, Prisma, and PostgreSQL.

## Features

- ✅ **Blog System**
  - Dynamic blog listing page (`/blog`)
  - Individual blog detail pages (`/blog/[slug]`)
  - Auto-generated, unique slugs
  - SEO optimized metadata per blog
  - Markdown content support

- ✅ **Admin Dashboard**
  - Hidden admin route (customizable)
  - Static, environment-based authentication
  - JWT token-based sessions
  - Create, read, update, delete blogs
  - Rich markdown editor
  - Image upload to `/public/uploads`
  - Cover image management

- ✅ **Security**
  - Protected admin routes via proxy
  - Secure cookie-based sessions
  - HTTPS-ready (production)
  - Basic input sanitization

- ✅ **Database**
  - PostgreSQL + Prisma ORM
  - Blog model with all necessary fields
  - Easy to extend

## Setup Instructions

### 1. Install Dependencies

```bash
npm install jose react-markdown
```

### 2. Update Environment Variables

Copy `.env.example` to `.env.local` and update:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/lead4s"

# Admin credentials (change these!)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-secure-password-here"
JWT_SECRET="generate-a-random-secret-key"

# Admin dashboard route (change to random string for hidden route)
# Examples: /dashboard-x7k92lmq, /admin-secret-abc123
ADMIN_ROUTE="/dashboard"
NEXT_PUBLIC_ADMIN_ROUTE="/dashboard"
```

### 3. Run Prisma Migration

```bash
npx prisma migrate dev --name add_blog_model
```

This creates:
- `Blog` table in PostgreSQL
- Migration file for version control

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Create `/public/uploads` Directory

```bash
mkdir -p public/uploads
```

## Usage

### Public Blog Pages

**Blog Listing** (`/blog`)
- Displays all published blogs in grid layout
- Shows: title, excerpt, cover image, author, date
- Links to individual blog posts

**Blog Detail** (`/blog/[slug]`)
- Full blog post with cover image
- Markdown content rendered with proper styling
- Meta info: author, date, reading time
- Dynamic SEO metadata
- Back link to blog listing

### Admin Dashboard

**Login** (`/secure-login`)
- Enter email and password from environment variables
- Creates JWT token stored in secure HTTP-only cookie
- Redirects to admin dashboard on success

**Dashboard** (`/dashboard`)
- List all blog posts
- Edit, delete, or create new posts
- Quick actions for each blog

**Create Blog** (`/dashboard/create`)
- Form with fields:
  - Title (auto-generates slug)
  - Excerpt (summary)
  - Cover image (upload or URL)
  - Author name
  - Markdown content
  - Real-time preview

**Edit Blog** (`/dashboard/edit/[id]`)
- Update any blog field
- Preserve or change cover image
- All changes saved to database

## API Routes

### Public
- `GET /api/blogs` — Get all blogs
- `GET /api/blogs/[id]` — Get single blog by ID

### Admin (Protected)
- `POST /api/blogs` — Create blog
- `PUT /api/blogs/[id]` — Update blog
- `DELETE /api/blogs/[id]` — Delete blog
- `POST /api/upload` — Upload image
- `POST /api/auth` — Login
- `GET /api/auth` — Logout

## Database Schema

```prisma
model Blog {
  id         String   @id @default(uuid())
  title      String
  slug       String   @unique
  excerpt    String
  content    String   // markdown
  coverImage String?
  author     String   @default("Admin")
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

## File Structure

```
app/
├── blog/
│   ├── page.tsx              # Blog listing
│   └── [slug]/
│       └── page.tsx          # Blog detail
├── (admin)/
│   ├── layout.tsx            # Admin layout
│   ├── secure-login/
│   │   └── page.tsx          # Login page
│   └── dashboard/
│       ├── page.tsx          # Dashboard
│       ├── create/
│       │   └── page.tsx      # Create blog
│       └── edit/
│           └── [id]/
│               └── page.tsx  # Edit blog
├── api/
│   ├── blogs/
│   │   ├── route.ts          # GET all, POST create
│   │   └── [id]/
│   │       └── route.ts      # GET, PUT, DELETE single
│   ├── auth/
│   │   └── route.ts          # POST login, GET logout
│   └── upload/
│       └── route.ts          # POST image upload

components/
├── admin/
│   ├── LoginForm.tsx         # Login form
│   └── BlogEditor.tsx        # Blog CRUD form
└── blog/
    ├── BlogCard.tsx          # Blog list card
    └── BlogContent.tsx       # Markdown renderer

lib/
├── auth.ts                   # Auth utilities
├── blog.ts                   # Slug generation, excerpt, etc
└── db.ts                     # Prisma client

proxy.ts                      # Route protection

prisma/
├── schema.prisma             # Database schema
└── migrations/               # Migration files
```

## Customization

### Change Admin Route

1. Update `.env.local`:
```env
ADMIN_ROUTE=/dashboard-secret-xyz
NEXT_PUBLIC_ADMIN_ROUTE=/dashboard-secret-xyz
```

2. Update `proxy.ts` auth route checks if needed

3. Restart development server

### Add Blog Fields

1. Update Prisma schema:
```prisma
model Blog {
  // ... existing fields
  featured    Boolean  @default(false)
  category    String?
  tags        String[] @default([])
}
```

2. Run migration:
```bash
npx prisma migrate dev --name add_featured_tags
```

3. Update API routes and forms accordingly

### Change Upload Directory

By default, images are saved to `/public/uploads`.

To change, modify `app/api/upload/route.ts`:
```typescript
const UPLOAD_DIR = "public/uploads"; // Change this
```

### Markdown Styling

Customize markdown rendering in `components/blog/BlogContent.tsx`:
```typescript
<h1 className="your-custom-classes">
```

## Security Notes

⚠️ **Important for Production:**

1. **Change default credentials** in `.env.local`
2. **Use strong JWT secret** (generate random string)
3. **Enable HTTPS** on production
4. **Use environment-specific secrets** (don't commit `.env.local`)
5. **Validate file uploads** (already done, but extend as needed)
6. **Consider rate limiting** on login endpoint
7. **Add CSRF protection** if needed
8. **Monitor admin access logs**

## Troubleshooting

### Proxy Not Protecting Routes
- Verify `ADMIN_ROUTE` matches your actual route
- Check `proxy.ts` auth route checks
- Restart dev server: `npm run dev`

### Images Not Uploading
- Ensure `/public/uploads` directory exists
- Check file size limit (5MB default in `app/api/upload/route.ts`)
- Verify allowed image types (JPEG, PNG, WebP, GIF)

### Slug Conflicts
- Unique slugs auto-append random string: `my-blog-a1b2c3`
- Check `lib/blog.ts` `generateUniqueSlug()` function

### Database Errors
- Run `npx prisma db push` to sync schema
- Check PostgreSQL connection string
- Verify database exists

## Next Steps

1. **Customize styling** in components (match your design system)
2. **Add blog categories/tags** (extend Prisma schema)
3. **Implement blog search** (add endpoint + UI)
4. **Add draft/published status** (extend Blog model)
5. **Implement pagination** (add limit/offset to API)
6. **Add comments system** (extend schema)
7. **Set up automated backups** (PostgreSQL)
8. **Deploy to production** (Vercel, Railway, etc.)

## Support

For issues or questions, refer to:
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [React Markdown Docs](https://github.com/remarkjs/react-markdown)
