# Contact/Inquiry Form System Documentation

## Overview

Complete contact and inquiry form system with backend database, API endpoints, and admin management interface. This system allows visitors to submit inquiries and provides administrators with tools to manage and respond to them.

## Features Implemented

### 1. Database Schema
- **Table**: `contact_messages`
- **Migration File**: `migrations/0005_create_contact_messages.sql`
- **Fields**:
  - `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
  - `name` (TEXT NOT NULL) - Inquirer's name
  - `company` (TEXT) - Optional company name
  - `email` (TEXT NOT NULL) - Contact email
  - `phone` (TEXT NOT NULL) - Contact phone number
  - `inquiry_type` (TEXT NOT NULL) - Type of inquiry
  - `message` (TEXT NOT NULL) - Inquiry message
  - `status` (TEXT DEFAULT 'pending') - Current status
  - `admin_notes` (TEXT) - Administrator's notes
  - `replied_at` (DATETIME) - Timestamp when replied
  - `created_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)
  - `updated_at` (DATETIME DEFAULT CURRENT_TIMESTAMP)

### 2. Inquiry Types
- `membership` - 조합원 가입 문의 (Membership Inquiry)
- `service` - 서비스 이용 문의 (Service Inquiry)
- `partnership` - 협력 제안 (Partnership Proposal)
- `general` - 일반 문의 (General Inquiry)
- `other` - 기타 (Other)

### 3. Status Workflow
- `pending` (대기중) - New inquiry awaiting review
- `reviewing` (검토중) - Inquiry under review
- `replied` (답변완료) - Inquiry has been answered
- `closed` (종료) - Inquiry closed/resolved

### 4. Public Contact Form (`/support` page)
- **Location**: Support page contact section
- **Form ID**: `contactForm`
- **Features**:
  - Name field (required)
  - Company field (optional)
  - Email field (required, validated)
  - Phone field (required)
  - Inquiry type dropdown (required)
  - Message textarea (required)
  - Privacy policy checkbox (required)
  - Real-time form validation
  - Loading state during submission
  - Success/error feedback messages
  - Automatic form reset after successful submission

### 5. API Endpoints

#### Submit Contact Form
```
POST /api/contacts/submit
Content-Type: application/json

Body:
{
  "name": "홍길동",
  "company": "(주)테스트", // optional
  "email": "test@example.com",
  "phone": "010-1234-5678",
  "inquiryType": "service",
  "message": "문의 내용..."
}

Response (Success):
{
  "success": true,
  "message": "문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다."
}

Response (Error):
{
  "success": false,
  "error": "필수 필드를 모두 입력해주세요."
}
```

#### Get Contacts List (Admin Only)
```
GET /api/contacts?status={status}
Authorization: Bearer {adminToken}

Query Parameters:
- status: all|pending|reviewing|replied|closed (optional)

Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "홍길동",
      "company": "(주)테스트",
      "email": "test@example.com",
      "phone": "010-1234-5678",
      "inquiry_type": "service",
      "message": "문의 내용...",
      "status": "pending",
      "admin_notes": null,
      "replied_at": null,
      "created_at": "2025-10-24T07:00:00.000Z",
      "updated_at": "2025-10-24T07:00:00.000Z"
    }
  ]
}
```

#### Get Single Contact (Admin Only)
```
GET /api/contacts/:id
Authorization: Bearer {adminToken}

Response:
{
  "success": true,
  "data": { /* contact object */ }
}
```

#### Update Contact Status (Admin Only)
```
PUT /api/contacts/:id/status
Authorization: Bearer {adminToken}
Content-Type: application/json

Body:
{
  "status": "replied",
  "adminNotes": "답변 완료했습니다."
}

Response:
{
  "success": true,
  "message": "상태가 업데이트되었습니다."
}
```

#### Delete Contact (Admin Only)
```
DELETE /api/contacts/:id
Authorization: Bearer {adminToken}

Response:
{
  "success": true,
  "message": "문의가 삭제되었습니다."
}
```

### 6. Admin Contact Management Page (`/admin/contacts`)
- **URL**: `/admin/contacts`
- **Authentication**: Required (admin token)
- **Features**:
  - Status statistics dashboard (pending, reviewing, replied, closed counts)
  - Filter by status
  - View all contacts in list view
  - Detailed modal view for each contact
  - Update contact status with admin notes
  - Delete contacts
  - Real-time status updates
  - Responsive design with teal gradient theme

### 7. Admin Dashboard Integration
- Contact management section added to main admin dashboard
- Shows 5 most recent contacts
- Displays pending contact count with alert badge
- Quick access link to full contact management page
- Status and inquiry type badges
- Preview of contact details

## Deployment Checklist

### ✅ Completed Steps
1. ✅ Created database migration file (0005_create_contact_messages.sql)
2. ✅ Implemented all API endpoints (submit, list, get, update, delete)
3. ✅ Updated support page contact form with proper attributes
4. ✅ Added JavaScript form submission handler with validation
5. ✅ Created complete admin contact management page
6. ✅ Integrated contacts section into admin dashboard
7. ✅ Committed all changes to Git
8. ✅ Pushed to GitHub repository
9. ✅ Build successful (auto-deploy via Cloudflare Pages)

### ⏳ Pending Steps
1. **Run Database Migration in D1 Console**:
   ```bash
   # In Cloudflare Dashboard > D1 > gumi_digital_coop_db > Console
   # Copy and paste the contents of migrations/0005_create_contact_messages.sql
   # Execute the SQL to create the table and sample data
   ```

2. **Test the System**:
   - Submit a test inquiry from the public form
   - Verify it appears in admin dashboard
   - Test status updates in admin panel
   - Test admin notes functionality
   - Verify all filters work correctly

## Usage Examples

### Public User Journey
1. User visits `/support` page
2. Fills out contact form with inquiry details
3. Submits form
4. Receives immediate confirmation message
5. Form resets automatically

### Admin User Journey
1. Admin logs into dashboard
2. Sees notification of pending contacts
3. Clicks "문의 관리하기" to view all contacts
4. Filters by status or views all
5. Clicks "상세" to view full details
6. Updates status and adds admin notes
7. Optionally deletes spam/invalid contacts

## Design Consistency

### Color Scheme
- **Primary Gradient**: Teal (#00A9CE to #00bcd4)
- **Status Colors**:
  - Yellow: Pending
  - Blue: Reviewing
  - Teal: Replied
  - Gray: Closed
- **Inquiry Type**: Indigo badges

### Button Styles
- Primary actions: Teal gradient with hover effects
- Status changes: Teal solid color
- Delete actions: Red with hover state
- Cancel actions: Gray with hover state

## Database Indexes
The following indexes are automatically created for optimal performance:
- `idx_contact_status` on `status` column
- `idx_contact_created` on `created_at` column
- `idx_contact_email` on `email` column
- `idx_contact_inquiry_type` on `inquiry_type` column

## Sample Data
The migration includes 4 sample contact records for testing:
1. Membership inquiry from 김철수 (pending)
2. Service inquiry from 박영희 (reviewing)
3. Partnership proposal from 이민준 (replied)
4. General inquiry from 최서연 (closed)

## Security Features
- **Email validation**: Regex pattern validation on client and server
- **SQL injection prevention**: Prepared statements for all queries
- **Admin authentication**: All management endpoints require JWT token
- **Input sanitization**: Server-side validation of all fields
- **Type validation**: Inquiry type restricted to predefined values
- **Status validation**: Status changes restricted to valid workflow states

## Mobile Responsiveness
- Fully responsive design for all screen sizes
- Touch-friendly buttons and controls
- Mobile-optimized modals and forms
- Collapsible admin interface on small screens

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- JavaScript ES6+ features used
- Fetch API for HTTP requests
- No polyfills required for target browsers

## Next Steps After Migration
1. Run the D1 database migration
2. Test form submission from public page
3. Verify admin interface displays contacts correctly
4. Test status workflow and admin notes
5. Consider adding email notifications for new contacts
6. Monitor performance and optimize queries if needed

## Related Documentation
- [Quote Request System](./QUOTE_REQUEST_SYSTEM.md)
- [Resource Management](./RESOURCE_MANAGEMENT_COMPLETE.md)
- [Cloudflare D1 Database](https://developers.cloudflare.com/d1/)
- [Hono Framework](https://hono.dev/)

---

**Implementation Date**: October 24, 2025
**Version**: 1.0.0
**Status**: Ready for Production (pending D1 migration)
