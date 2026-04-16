# Blog CMS — Quick Start (5 Minutes)

## Step 1: Database Migration
```bash
npx prisma migrate dev --name add_blog_model
```

## Step 2: Update .env.local
```env
# Add these to your existing .env.local:
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password
JWT_SECRET=generate-a-random-secret-here
ADMIN_ROUTE=/dashboard
NEXT_PUBLIC_ADMIN_ROUTE=/dashboard
```

## Step 3: Create Uploads Directory
```bash
mkdir -p public/uploads
```

## Step 4: Install Dependencies
```bash
npm install jose react-markdown
```

## Step 5: Start Development Server
```bash
npm run dev
```

---

## URLs & Routes

### Public (Anyone)
- `http://localhost:3000/blog` — Blog listing
- `http://localhost:3000/blog/[slug]` — Blog post

### Admin (Login Required)
- `http://localhost:3000/secure-login` — Login page
- `http://localhost:3000/dashboard` — Dashboard (after login)
- `http://localhost:3000/dashboard/create` — Create blog
- `http://localhost:3000/dashboard/edit/[id]` — Edit blog

---

## Quick Test

1. **Visit login page**: `http://localhost:3000/secure-login`
2. **Enter credentials** from `.env.local`
3. **Create a blog post**:
   - Title: "My First Blog"
   - Excerpt: "Welcome to my blog"
   - Content: `# Hello\n\nWelcome to my first post!`
   - Upload a cover image
4. **View on public page**: `http://localhost:3000/blog`
5. **Click to read**: Full post with markdown rendering

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Migration fails | Ensure `DATABASE_URL` is correct in `.env.local` |
| Can't upload images | Create `/public/uploads` directory manually |
| Login not working | Verify `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local` |
| Routes not protected | Restart dev server after env changes |
| Markdown not rendering | Check for syntax errors in content field |

---

## File Locations Reference

| Task | File |
|------|------|
| Change admin credentials | `.env.local` |
| Change admin route | `.env.local` + `proxy.ts` |
| Customize blog styling | `components/blog/BlogCard.tsx`, `BlogContent.tsx` |
| Customize admin styling | `components/admin/LoginForm.tsx`, `BlogEditor.tsx` |
| Add new blog fields | `prisma/schema.prisma` → migrate → update forms |
| Change upload directory | `app/api/upload/route.ts` line 21 |
| Markdown syntax help | See `components/blog/BlogContent.tsx` for all tags |

---

## Common Customizations

### Change Admin Route to Hidden URL
1. Update `.env.local`:
```env
ADMIN_ROUTE=/admin-secret-xyz123
NEXT_PUBLIC_ADMIN_ROUTE=/admin-secret-xyz123
```
2. Restart: `npm run dev`
3. Login at: `http://localhost:3000/admin-secret-xyz123/secure-login`

### Add Author Field to Blog Form
Already included! Just update `components/admin/BlogEditor.tsx` if needed.

### Change Blog Grid Layout
In `app/blog/page.tsx`, update grid class:
```typescript
className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
// Change to lg:grid-cols-4 for 4 columns, etc
```

### Customize Markdown Styling
In `components/blog/BlogContent.tsx`, modify component styles:
```typescript
<h1 className="text-4xl font-bold text-white">  // Edit these classes
```

---

## Production Checklist

Before deploying:

- [ ] Change `ADMIN_PASSWORD` to something strong
- [ ] Generate random `JWT_SECRET`
- [ ] Update `ADMIN_EMAIL` if needed
- [ ] Set custom `ADMIN_ROUTE` for hidden dashboard
- [ ] Configure database backups
- [ ] Test image uploads
- [ ] Test blog creation → publishing → viewing
- [ ] Set up CDN for `/public/uploads` (optional)
- [ ] Enable HTTPS (should be automatic on Vercel)

---

## Need More Help?

See `BLOG_CMS_GUIDE.md` for:
- Detailed API documentation
- Database schema explanation
- Security considerations
- Advanced customizations
- Troubleshooting guide
