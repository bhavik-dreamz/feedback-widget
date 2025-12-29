# Feedback Widget - Usage Guide

## URL Parameters

The feedback widget supports automatic activation via URL parameters. This is useful for sharing specific feedback or opening the widget automatically.

### Auto-Activate Widget

Add `?feedback=true` to any URL to automatically open the feedback widget sidebar:

```
https://yourwebsite.com/?feedback=true
https://yourwebsite.com/page?feedback=true
```

### Navigate to Specific Feedback

Add both `feedback=true` and `feedbackID` parameters to open the sidebar and scroll to a specific feedback item:

```
https://yourwebsite.com/?feedback=true&feedbackID=abc123
https://yourwebsite.com/page?feedback=true&feedbackID=xyz789
```

**Note:** Both `feedbackID` and `feedbackId` are supported (case-insensitive).

## Usage Examples

### 1. Share a Specific Feedback Item

When you want to share a specific piece of feedback with your team:

```javascript
// Get the feedback ID from your comment
const feedbackId = "comment-12345";

// Create shareable URL
const shareUrl = `${window.location.origin}${window.location.pathname}?feedback=true&feedbackID=${feedbackId}`;

// Share this URL
console.log(shareUrl);
// https://yoursite.com/dashboard?feedback=true&feedbackID=comment-12345
```

### 2. Open Widget Programmatically

You can also open the widget programmatically:

```javascript
// Redirect to current page with feedback parameter
window.location.href = window.location.pathname + '?feedback=true';

// Or use pushState to avoid page reload
const url = new URL(window.location);
url.searchParams.set('feedback', 'true');
window.history.pushState({}, '', url);
```

### 3. Email/Slack Integration

Include feedback URLs in automated notifications:

```
New feedback received on Dashboard page:
https://yourapp.com/dashboard?feedback=true&feedbackID=fb-789

Click the link to view and respond to this feedback.
```

### 4. Check for Feedback Parameter in Code

```javascript
// Check if feedback mode is active
const urlParams = new URLSearchParams(window.location.search);
const isFeedbackMode = urlParams.get('feedback') === 'true';

if (isFeedbackMode) {
  console.log('Feedback widget will auto-open');
  
  // Get specific feedback ID if present
  const feedbackId = urlParams.get('feedbackID') || urlParams.get('feedbackId');
  if (feedbackId) {
    console.log('Will scroll to feedback:', feedbackId);
  }
}
```

## Behavior

When `?feedback=true` is present in the URL:

1. **Widget Loads Normally** - The feedback widget initializes as usual
2. **Sidebar Auto-Opens** - The comments sidebar automatically opens
3. **Comments Load** - All feedback comments for the current page are loaded
4. **Scroll to Feedback** (if feedbackID provided) - Automatically scrolls to and highlights the specific feedback item
5. **Highlight Animation** - The target feedback item pulses to draw attention

## URL Parameter Reference

| Parameter | Values | Description |
|-----------|--------|-------------|
| `feedback` | `true` / `false` | Auto-opens the feedback sidebar when `true` |
| `feedbackID` | Any string | ID of specific feedback to highlight and scroll to |
| `feedbackId` | Any string | Alternative spelling (case-insensitive) |

## Integration with Backend

Your backend should generate shareable URLs when feedback is created:

```javascript
// Example: Backend API Response
{
  "feedbackId": "fb-12345",
  "url": "https://app.example.com/dashboard",
  "shareableUrl": "https://app.example.com/dashboard?feedback=true&feedbackID=fb-12345",
  "comment": "The button color should be blue",
  "createdAt": "2025-12-29T10:30:00Z"
}
```

## Best Practices

1. **Always Include feedback=true** when sharing specific feedback
2. **Use HTTPS** for secure sharing of feedback URLs
3. **Validate feedbackID** exists before sharing
4. **Handle Missing Feedback** gracefully (show message if ID not found)
5. **Track Analytics** on feedback URL opens

## Advanced Usage

### Deep Linking with State

```javascript
// Save current state before redirecting
sessionStorage.setItem('feedbackContext', JSON.stringify({
  scrollPosition: window.scrollY,
  activeTab: 'design',
  filters: {...}
}));

// Redirect with feedback parameter
window.location.href = '?feedback=true&feedbackID=xyz';

// On page load, restore state
const context = JSON.parse(sessionStorage.getItem('feedbackContext'));
if (context) {
  // Restore scroll, tabs, filters, etc.
}
```

### Remove Parameter After Use

```javascript
// After opening feedback, clean URL
if (window.history.replaceState) {
  const url = new URL(window.location);
  url.searchParams.delete('feedback');
  url.searchParams.delete('feedbackID');
  window.history.replaceState({}, document.title, url);
}
```

## Troubleshooting

**Widget doesn't open:**
- Verify `?feedback=true` is in the URL (check browser address bar)
- Check browser console for errors
- Ensure widget is properly initialized

**Feedback item not found:**
- Verify the feedbackID exists in the database
- Check if feedback belongs to a different page
- Ensure the feedback hasn't been deleted

**Scroll doesn't work:**
- Wait for comments to fully load (500ms delay is built-in)
- Check if element has correct `data-feedback-id` attribute
- Verify the feedback is on the current page

## Examples

### React Component

```jsx
function FeedbackLink({ feedbackId, children }) {
  const url = `${window.location.pathname}?feedback=true&feedbackID=${feedbackId}`;
  
  return (
    <a href={url} className="feedback-link">
      {children}
    </a>
  );
}

// Usage
<FeedbackLink feedbackId="fb-123">
  View Feedback #123
</FeedbackLink>
```

### Node.js Email Template

```javascript
const generateFeedbackEmail = (feedback) => {
  const url = `${process.env.APP_URL}${feedback.page}?feedback=true&feedbackID=${feedback.id}`;
  
  return `
    New feedback received:
    
    "${feedback.comment}"
    
    View and respond: ${url}
  `;
};
```

## Related Documentation

- [Installation Guide](README.md)
- [API Reference](DEVELOPMENT.md)
- [Configuration Options](README.md#api-configuration)
