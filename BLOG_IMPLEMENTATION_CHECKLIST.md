# Blog CMS Implementation Checklist

Use this checklist to verify everything is set up correctly.

## Prerequisites ✓
- [ ] Node.js 18+ installed
- [ ] PostgreSQL database running
- [ ] Project uses Next.js 14 with App Router
- [ ] TypeScript enabled
- [ ] Tailwind CSS configured

## Step 1: Install Dependencies
- [ ] Run: `npm install jose react-markdown`
- [ ] Verify no errors in console

## Step 2: Database Setup
- [ ] Update `.env.local` with `DATABASE_URL`
- [ ] Run: `npx prisma migrate dev --name add_blog_model`
- [ ] Verify migration created `Blog` table
- [ ] Run: `npx prisma generate`
- [ ] Check: `prisma/migrations/[timestamp]_add_blog_model/migration.sql` exists

## Step 3: Environment Variables
- [ ] Copy `.env.example` values to `.env.local`
- [ ] Set `ADMIN_EMAIL` (e.g., admin@example.com)
- [ ] Set `ADMIN_PASSWORD` (secure value, not "password123")
- [ ] Set `JWT_SECRET` (generate random: `openssl rand -base64 32`)
- [ ] Set `ADMIN_ROUTE` (or use default `/dashboard`)
- [ ] Set `NEXT_PUBLIC_ADMIN_ROUTE` (same as ADMIN_ROUTE)
- [ ] Verify `.env.local` is in `.gitignore`

## Step 4: Create Uploads Directory
- [ ] Run: `mkdir -p public/uploads`
- [ ] Verify directory exists
- [ ] Add to `.gitignore` if needed: `public/uploads/`

## Step 5: File Structure Verification
Check these files/directories exist:

**Utilities**
- [ ] `lib/auth.ts` — Authentication logic
- [ ] `lib/blog.ts` — Blog utilities (slug, excerpt, etc)

**API Routes**
- [ ] `app/api/blogs/route.ts` — Blog CRUD
- [ ] `app/api/blogs/[id]/route.ts` — Single blog ops
- [ ] `app/api/auth/route.ts` — Login/logout
- [ ] `app/api/upload/route.ts` — Image upload

**Public Pages**
- [ ] `app/blog/page.tsx` — Blog listing
- [ ] `app/blog/[slug]/page.tsx` — Blog detail

**Admin Pages**
- [ ] `app/(admin)/layout.tsx` — Admin layout
- [ ] `app/(admin)/secure-login/page.tsx` — Login page
- [ ] `app/(admin)/dashboard/page.tsx` — Dashboard
- [ ] `app/(admin)/dashboard/create/page.tsx` — Create page
- [ ] `app/(admin)/dashboard/edit/[id]/page.tsx` — Edit page

**Components**
- [ ] `components/admin/LoginForm.tsx` — Login form
- [ ] `components/admin/BlogEditor.tsx` — Blog editor
- [ ] `components/blog/BlogCard.tsx` — Blog card
- [ ] `components/blog/BlogContent.tsx` — Markdown renderer

**Config**
- [ ] `proxy.ts` — Route protection
- [ ] `prisma/schema.prisma` — Updated with Blog model
- [ ] `BLOG_CMS_GUIDE.md` — Documentation
- [ ] `BLOG_QUICKSTART.md` — Quick start

## Step 6: Test Development Server
- [ ] Run: `npm run dev`
- [ ] Check console for errors
- [ ] Build succeeds without TypeScript errors
- [ ] Server starts at `http://localhost:3000`

## Step 7: Test Login Flow
- [ ] Navigate to `/secure-login`
- [ ] Page loads without errors
- [ ] Try invalid credentials → see error message
- [ ] Login with correct credentials
- [ ] Redirected to `/dashboard`
- [ ] Should NOT be able to access `/dashboard` without login

## Step 8: Test Blog Creation
- [ ] On dashboard, click "New Blog"
- [ ] Fill form:
  - Title: "Test Blog Post"
  - Excerpt: "This is a test excerpt"
  - Author: "Test Author"
  - Content: "# Hello World\n\nThis is a test blog post with **markdown**."
  - Cover image: Upload an image from your computer
- [ ] Click "Create Blog"
- [ ] Should redirect to dashboard
- [ ] New blog appears in table

## Step 9: Test Blog Listing
- [ ] Navigate to `/blog`
- [ ] See blog card with:
  - Cover image
  - Title
  - Excerpt
  - Author and date
  - "Read More" link
- [ ] Click "Read More"

## Step 10: Test Blog Detail Page
- [ ] On blog post page (`/blog/test-blog-post`):
  - [ ] Cover image displayed
  - [ ] Title shown
  - [ ] Author, date, reading time visible
  - [ ] Markdown rendered correctly (H1, bold text)
  - [ ] "Back to Blog" link works
- [ ] Check browser title (should be blog title)
- [ ] Inspect meta tags: `og:title`, `og:description`, `og:image`

## Step 11: Test Blog Editing
- [ ] Dashboard → Find blog → Click "Edit"
- [ ] Update title: "Updated Test Blog"
- [ ] Update content with more markdown
- [ ] Click "Update Blog"
- [ ] Check `/blog` — title changed
- [ ] Visit blog detail → content updated

## Step 12: Test Blog Deletion
- [ ] Dashboard → Find blog → Click "Delete"
- [ ] Confirm deletion
- [ ] Blog removed from list
- [ ] Check `/blog` — blog no longer there
- [ ] Try to visit old URL → 404 error

## Step 13: Test Image Upload
- [ ] Create new blog
- [ ] Click cover image upload area
- [ ] Select image from computer
- [ ] Image preview appears
- [ ] Submit blog
- [ ] Check `/public/uploads` — image file exists
- [ ] Image displays on blog listing and detail pages
- [ ] View page source → image URL is `/uploads/[filename]`

## Step 14: Test Markdown Features
Create a blog with various markdown:
```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

- Bullet point 1
- Bullet point 2

1. Numbered point 1
2. Numbered point 2

[Link text](https://example.com)

> This is a blockquote

`inline code` and code blocks

![Image alt](https://example.com/image.jpg)
```

Verify rendering:
- [ ] All headings styled correctly
- [ ] Bold/italic renders properly
- [ ] Lists display correctly
- [ ] Links are clickable and open in new tab
- [ ] Blockquotes have left border styling
- [ ] Code snippets have background color
- [ ] Images display (if available)

## Step 15: Test Logout
- [ ] On dashboard, click "Logout"
- [ ] Redirected to `/secure-login`
- [ ] Try to access `/dashboard` → redirected to login
- [ ] Cookie cleared (no auth token in browser)

## Step 16: Test Security
- [ ] Open browser DevTools → Application → Cookies
- [ ] Verify `admin_token` cookie:
  - [ ] HttpOnly flag set (not visible in JS)
  - [ ] SameSite=Strict
  - [ ] Expires in 7 days
- [ ] Try accessing `/api/blogs` with POST (no auth):
  - Should get 401 Unauthorized
- [ ] Try accessing admin pages without login:
  - Should redirect to `/secure-login`

## Step 17: Production Preparation
- [ ] `.env.local` file NOT committed (in `.gitignore`)
- [ ] `.env.example` file committed (with safe defaults)
- [ ] Change `ADMIN_PASSWORD` to strong value
- [ ] Generate new `JWT_SECRET`
- [ ] Test on staging/production database
- [ ] Set up database backups
- [ ] Consider CDN for image uploads

## Step 18: Optional Enhancements
- [ ] Add blog categories/tags
- [ ] Implement search functionality
- [ ] Add draft/published status
- [ ] Implement pagination
- [ ] Add comment system
- [ ] Set up analytics
- [ ] Add social sharing buttons
- [ ] Optimize images with next/image
- [ ] Add reading time calculation
- [ ] Implement related posts

## Step 19: Documentation
- [ ] Review `BLOG_CMS_GUIDE.md` for advanced features
- [ ] Review `BLOG_QUICKSTART.md` for common tasks
- [ ] Document any customizations you made
- [ ] Share setup instructions with team

## Verification Checklist
Final verification before considering complete:

- [ ] Blog listing page shows all blogs
- [ ] Blog detail pages render markdown correctly
- [ ] Admin login works
- [ ] Admin can create blogs
- [ ] Admin can edit blogs
- [ ] Admin can delete blogs
- [ ] Admin can upload images
- [ ] Images save to `/public/uploads`
- [ ] Routes are protected (can't access without login)
- [ ] Slugs are unique and URL-friendly
- [ ] SEO metadata is generated dynamically
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] No compiler warnings

## Troubleshooting
If any tests fail, refer to `BLOG_CMS_GUIDE.md` troubleshooting section or check:
1. Console for error messages
2. Network tab in DevTools for API errors
3. Database with `npx prisma studio`
4. Middleware settings
5. Environment variables

---

✅ **When all checkboxes are complete, your Blog CMS is production-ready!**
