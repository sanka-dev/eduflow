# Enhanced Manual Enrollment Guide for Sanity Studio

## Overview
The enrollment system has been enhanced to provide comprehensive tracking of manual payments and enrollments while maintaining simplicity for administrators.

## New Features

### Payment Methods
The system now supports multiple payment methods:
- **Bank Transfer** - For wire transfers and bank deposits
- **Check** - For check payments
- **Cash** - For in-person cash payments
- **Online Transfer** - For online payment platforms (PayPal, Venmo, etc.)
- **Credit Card** - For manual credit card processing
- **Free Enrollment** - For complimentary or scholarship enrollments
- **Other** - For any other payment method

### Enhanced Fields

#### Required Fields
- **Student** - Reference to the student record
- **Course** - Reference to the course record
- **Enrolled At** - Automatically set to current date/time

#### Payment Tracking Fields
- **Amount** - Payment amount in Sri Lankan Rupees (Rs) (optional, defaults to 0)
- **Payment Method** - How the payment was received (dropdown selection)
- **Payment Reference** - External reference number (bank reference, check number, etc.)
- **Payment Date** - When the payment was actually received
- **Payment Notes** - Additional notes about the payment or special circumstances
- **Verified By** - Name of the admin who processed and verified the enrollment
- **Internal Payment ID** - Auto-generated system reference for tracking

## How to Create Manual Enrollments

### Step 1: Access Sanity Studio
1. Navigate to `/studio` or `/admin/studio`
2. Sign in with your admin credentials

### Step 2: Navigate to Enrollments
1. Go to "User Management" in the sidebar
2. Select "Enrollments"
3. Click "Create" or the "+" button

### Step 3: Fill Out Enrollment Details

#### Basic Information
1. **Student**: Search and select the student from the dropdown
   - If student doesn't exist, they need to sign in to the platform first
2. **Course**: Search and select the course from the dropdown

#### Payment Information
1. **Amount**: Enter the payment amount (leave blank or 0 for free enrollments)
2. **Payment Method**: Select from the dropdown:
   - Choose "Free Enrollment" for scholarship or complimentary access
   - Choose appropriate method for paid enrollments
3. **Payment Reference**: Enter external reference if applicable:
   - Bank transfer reference number
   - Check number
   - Transaction ID from payment platform
4. **Payment Date**: Select when the payment was received
5. **Payment Notes**: Add any relevant notes:
   - Special arrangements
   - Partial payment schedules
   - Scholarship details
6. **Verified By**: Enter your name as the verifying admin

#### System Fields
- **Internal Payment ID**: Auto-generated, no action needed
- **Enrolled At**: Auto-set to current time

### Step 4: Save and Publish
1. Click "Save" to create the enrollment
2. The student will immediately have access to the course

## Payment Method Guidelines

### Free Enrollment
- Use for scholarships, staff access, or promotional enrollments
- Leave amount as 0
- Still fill in "Verified By" field
- Use "Payment Notes" to explain the reason for free access

### Bank Transfer
- Always get and record the bank reference number
- Verify the transfer in your bank account before creating enrollment
- Include transfer date as "Payment Date"

### Check Payments
- Record check number in "Payment Reference"
- Note check date as "Payment Date"
- Consider adding note about when check cleared in "Payment Notes"

### Cash Payments
- Record receipt number if available
- Note location of payment in "Payment Notes"
- Ensure secure handling according to your organization's policies

### Online Transfers
- Record transaction ID from the platform
- Include platform name in "Payment Notes" (e.g., "PayPal", "Venmo")
- Verify payment in the platform before enrollment

## Enrollment Preview
The enrollment list now shows enhanced information:
- Student name
- Course title
- Payment method and amount
- Enrollment date

Example: "John Doe • Web Development Course • Bank Transfer (Rs 299) • 8/10/2025"

## Best Practices

### Verification Process
1. Always verify payment before creating enrollment
2. Double-check student and course information
3. Fill in "Verified By" field with your name
4. Use consistent naming in payment references

### Record Keeping
- Use "Payment Notes" for important details
- Include partial payment arrangements
- Note any special circumstances
- Record communication with students

### Quality Control
- Review enrollments regularly
- Ensure all paid enrollments have proper payment information
- Check for duplicate enrollments
- Maintain consistent data entry standards

## Troubleshooting

### Student Not Found
If a student doesn't appear in the dropdown:
1. Confirm they have signed in to the platform at least once
2. Check their email address for typos
3. They may need to complete account setup first

### Course Access Issues
If student reports no access after enrollment:
1. Verify enrollment was saved and published
2. Check if course is published and accessible
3. Confirm student is using correct login credentials
4. Allow a few minutes for system refresh

### Payment Tracking
- All payment fields are optional except payment method
- Use "Free Enrollment" method for any non-paid access
- Payment reference helps with financial reconciliation
- Payment notes provide context for future reference

## Migration Notes
- Existing enrollments continue to work normally
- Legacy payment data is preserved
- New fields are optional and don't affect existing functionality
- System maintains backward compatibility

This enhanced system provides comprehensive tracking while keeping the enrollment process straightforward for administrators.
