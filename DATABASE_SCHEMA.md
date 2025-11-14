# Firebase Database Schema - Barsam Reviews System

## Collection: `reviews`

### Document Structure

```javascript
{
  id: "auto-generated-firestore-id",
  name: "John Doe",                    // Required: Reviewer name
  email: "john@example.com",           // Optional: Email (not displayed publicly)
  rating: 5,                           // Required: 1-5 stars
  review: "Beautiful book...",         // Required: Review text
  language: "en",                      // Required: en|nl|fa
  status: "pending",                   // Required: pending|approved|rejected
  timestamp: Timestamp,                // Auto: Submission time
  approvedAt: Timestamp,               // Auto: Approval time (null if pending)
  approvedBy: "admin",                 // Auto: Who approved it
  ipAddress: "xxx.xxx.xxx.xxx",       // Optional: For spam detection
  userAgent: "Mozilla/5.0...",        // Optional: For spam detection
}
```

## Status Flow

```
pending → approved → displayed on website
        ↘ rejected → hidden forever
```

## Indexes (for performance)

```
- status (for filtering pending/approved)
- language (for language-specific queries)
- timestamp (for sorting)
- composite: [status, language, timestamp]
```

## Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /reviews/{reviewId} {
      // Anyone can read approved reviews
      allow read: if resource.data.status == 'approved';

      // Only authenticated admins can read all reviews
      allow read: if request.auth != null;

      // Anyone can create reviews (set to pending)
      allow create: if request.resource.data.status == 'pending' &&
                      request.resource.data.name is string &&
                      request.resource.data.rating >= 1 &&
                      request.resource.data.rating <= 5 &&
                      request.resource.data.review is string &&
                      request.resource.data.language in ['en', 'nl', 'fa'];

      // Only authenticated admins can update status
      allow update: if request.auth != null &&
                      request.resource.data.status in ['approved', 'rejected'];

      // Only authenticated admins can delete
      allow delete: if request.auth != null;
    }
  }
}
```

## Query Patterns

### Get approved reviews for English version:
```javascript
db.collection('reviews')
  .where('status', '==', 'approved')
  .where('language', '==', 'en')
  .orderBy('timestamp', 'desc')
  .limit(50)
```

### Get pending reviews for admin:
```javascript
db.collection('reviews')
  .where('status', '==', 'pending')
  .orderBy('timestamp', 'desc')
```

### Get all approved reviews (admin view):
```javascript
db.collection('reviews')
  .where('status', '==', 'approved')
  .orderBy('timestamp', 'desc')
```

## Spam Prevention

1. **Rate Limiting**: Max 3 reviews per IP per day
2. **Validation**: Required fields, length limits
3. **Manual Approval**: All reviews need admin approval
4. **Duplicate Detection**: Check for similar content

## Privacy Compliance

- Email addresses stored but NEVER displayed publicly
- IP addresses hashed for privacy
- Users can request deletion (GDPR compliant)
- No tracking cookies or analytics on submission

## Performance Optimization

- Client-side caching (5 minutes)
- Pagination (50 reviews per page)
- Real-time listeners only on admin dashboard
- Static queries for public display

## Backup Strategy

- Firebase automatic daily backups
- Manual export option in admin dashboard
- Export to JSON for migration
