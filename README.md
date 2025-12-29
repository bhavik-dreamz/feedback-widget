# Feedback Widget

A comprehensive visual feedback and bug reporting widget for websites. Users can capture screenshots, annotate pages, add comments, and create detailed feedback reports.

## Features

- 📸 **Screenshot Capture** - Capture any part of the webpage
- ✏️ **Visual Annotations** - Draw and annotate directly on screenshots
- 💬 **Comments & Threads** - Add detailed comments with reply support
- 📎 **File Attachments** - Attach files to feedback reports
- 🎯 **Element Selection** - Click to select specific page elements
- 📱 **Responsive Design** - Works on desktop and mobile
- 🌙 **Dark Mode Support** - Automatic dark mode detection
- 🎨 **Customizable** - Easy to style and configure

## Installation

```bash
npm install
```

## Build

```bash
# Production build
npm run build

# Development build with watch
npm run dev

# Development server
npm start
```

## Usage

Add the widget to your website:

```html
<script src="https://yourcdn.com/feedback.js"></script>
<script>
  Feedback.init({
    apiUrl: 'https://your-api.com/feedback',
    projectId: 'your-project-id'
  });
</script>
```

Or with query parameters:

```html
<script src="https://yourcdn.com/feedback.js?project=PROJECT_ID&api=API_URL"></script>
```

## API Configuration

```javascript
Feedback.init({
  // Required
  apiUrl: 'https://your-api.com/feedback',
  projectId: 'your-project-id',
  
  // Optional
  position: 'bottom-right', // Widget position
  theme: 'light', // 'light' or 'dark'
  allowScreenshot: true,
  allowAnnotation: true,
  allowFileUpload: true,
  maxFileSize: 5242880, // 5MB in bytes
  language: 'en'
});
```

## Project Structure

```
feedback/
├── src/
│   ├── index.js                 # Entry point
│   ├── App.js                   # Main app component
│   ├── App.css                  # Main app styles
│   ├── Render.css               # Render styles
│   ├── component/
│   │   ├── FloatingFeedbackBar.js
│   │   ├── FloatingFeedbackBar.css
│   │   ├── CommentPopup.js
│   │   ├── CommentPopup.css
│   │   ├── ScreenCaptureAnnotation.js
│   │   ├── ScreenCaptureAnnotation.css
│   │   ├── DesignModeOnboarding.js
│   │   ├── DesignModeOnboarding.css
│   │   ├── SideBarComment.js
│   │   ├── SideBarComment.css
│   │   ├── SideBarCommentBox.js
│   │   ├── SideBarCommentBox.css
│   │   ├── CommentEditContainer.js
│   │   ├── CommentEditContainer.css
│   │   ├── EmptyState.js
│   │   ├── EmptyState.css
│   │   ├── UserPopup.js
│   │   ├── UserPopup.css
│   │   ├── RecordingControls.js
│   │   ├── RecordingControls.css
│   │   ├── PathSelector/
│   │   │   ├── PathSelector.js
│   │   │   └── PathSelector.css
│   │   └── utils/
│   │       ├── LoadingSkeleton.js
│   │       ├── LoadingSkeleton.css
│   │       ├── FilePreviewModal/
│   │       │   ├── FilePreviewModal.js
│   │       │   └── FilePreviewModal.css
│   │       └── filepond.min.css
│   └── utils/
│       ├── api.js
│       ├── screenshot.js
│       └── helpers.js
├── package.json
├── webpack.config.js
├── .babelrc
└── build.js                     # Built output
```

## License

MIT
