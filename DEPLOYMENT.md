# Deployment Guide for Vercel

This guide will help you deploy the TanStack Markdown Editor to Vercel successfully.

## Prerequisites

- A GitHub repository with your code
- A Vercel account (free tier works fine)

## Deployment Steps

### 1. Push to GitHub

Make sure your code is pushed to a GitHub repository:

```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect it's a Vite project
5. Click "Deploy"

### 3. Configuration

The project includes a `vercel.json` file with the correct settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install --legacy-peer-deps"
}
```

## Troubleshooting

### Dependency Conflicts

If you encounter dependency conflicts (like the React 19 + lucide-react issue):

1. **Use the provided vercel.json** - It includes `--legacy-peer-deps` flag
2. **Update dependencies** - Make sure you're using compatible versions
3. **Clear cache** - In Vercel dashboard, go to project settings → General → Clear build cache

### Build Failures

Common issues and solutions:

1. **TypeScript errors**: The build includes `tsc --noEmit` to check types
2. **Missing dependencies**: Ensure all dependencies are in `package.json`
3. **Node version**: Vercel uses Node 18+ by default (should work fine)

### Environment Variables

If you need environment variables:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add any required variables

## Post-Deployment

After successful deployment:

1. **Test the application** - Make sure all features work
2. **Check performance** - Use Vercel's built-in analytics
3. **Set up custom domain** (optional) - In project settings

## Monitoring

Vercel provides:

- **Build logs** - Check for any issues
- **Function logs** - If using serverless functions
- **Analytics** - Performance and usage data
- **Real-time previews** - For each deployment

## Support

If you continue to have issues:

1. Check the [Vercel documentation](https://vercel.com/docs)
2. Review the build logs in your Vercel dashboard
3. Ensure your local build works: `npm run build`

---

**Happy deploying! 🚀** 