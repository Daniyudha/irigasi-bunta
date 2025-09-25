# CKEditor Image Upload Fix - Network Error Solution

The network error you're experiencing with CKEditor image uploads is likely due to CORS (Cross-Origin Resource Sharing) issues and authentication handling. I've fixed the middleware to properly handle these scenarios.

## Changes Made to [`src/middleware.ts`](src/middleware.ts):

### 1. **CORS Headers for API Routes**
- Added proper CORS headers for all API responses
- Handles OPTIONS preflight requests
- Allows cross-origin requests with proper headers

### 2. **Proper Authentication Handling**
- API routes now return 401 status instead of redirecting for unauthenticated requests
- UI routes still redirect to login page as expected

## Additional Fixes Needed:

### 1. **Update CKEditor Upload Adapter**
The current upload adapter in [`src/components/editor/CKEditorClient.tsx`](src/components/editor/CKEditorClient.tsx:24) needs to include credentials:

```typescript
fetch(this.apiUrl, {
  method: 'POST',
  body: formData,
  credentials: 'include', // Add this line
})
```

### 2. **Test the Fix**
After deploying these changes, test the image upload functionality:

1. **Clear browser cache** and cookies
2. **Log in** to the admin panel
3. **Create or edit a news article**
4. **Try uploading an image** through CKEditor
5. **Check browser console** for any remaining errors

## If the Issue Persists:

### Check Nginx Configuration
Ensure your Nginx configuration includes proper CORS headers:

```nginx
location / {
    # Add CORS headers
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization, x-user-id, x-user-role' always;
    
    # Handle OPTIONS requests
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization, x-user-id, x-user-role';
        add_header 'Access-Control-Max-Age' 86400;
        return 204;
    }
    
    proxy_pass http://localhost:3000;
    # ... rest of proxy settings
}
```

### Test Direct API Calls
Test the upload functionality directly using curl:

```bash
# Test without authentication (should return 401)
curl -X POST -F "file=@test.jpg" https://irigasibunta.com/api/admin/media

# Test with authentication (use your session cookie)
curl -X POST -F "file=@test.jpg" \
  -H "Cookie: next-auth.session-token=YOUR_SESSION_TOKEN" \
  https://irigasibunta.com/api/admin/media
```

## Expected Behavior After Fix:

1. **CKEditor should upload images successfully**
2. **Images should appear in the editor**
3. **No network errors in browser console**
4. **Images should be saved to the database and file system**

## Next Steps:

1. **Deploy the middleware changes** to your server
2. **Test the image upload functionality**
3. **If errors persist**, check the exact error message in browser console
4. **Update the CKEditor upload adapter** if needed

The key issue was that the middleware was redirecting API requests instead of returning proper HTTP status codes, which caused network errors in the CKEditor upload process.