# Feedback Widget - Development Guide

## Project Overview

This is a complete source code implementation of a feedback widget library that provides visual feedback, bug reporting, and annotation capabilities for websites.

## Project Structure

```
feedback/
├── src/                          # Source code
│   ├── index.js                  # Entry point & widget initialization
│   ├── App.js                    # Main application component
│   ├── App.css                   # Main app styles
│   ├── Render.css                # Global widget styles
│   ├── component/                # UI components
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
│   │   ├── EmptyState.js
│   │   ├── EmptyState.css
│   │   ├── UserPopup.css
│   │   ├── RecordingControls.css
│   │   ├── CommentEditContainer.css
│   │   ├── PathSelector/
│   │   │   ├── PathSelector.js
│   │   │   └── PathSelector.css
│   │   └── utils/
│   │       ├── LoadingSkeleton.js
│   │       ├── LoadingSkeleton.css
│   │       └── FilePreviewModal/
│   │           ├── FilePreviewModal.js
│   │           └── FilePreviewModal.css
│   └── utils/                    # Utility functions
│       ├── api.js                # API calls
│       ├── screenshot.js         # Screenshot capture
│       └── helpers.js            # Helper functions
├── package.json                  # Dependencies
├── webpack.config.js             # Webpack configuration
├── .babelrc                      # Babel configuration
├── build.js                      # Built output (minified)
├── demo.html                     # Demo page
└── README.md                     # Documentation

## Installation & Setup

```bash
# Install dependencies
npm install

# Development build with watch
npm run dev

# Production build
npm run build

# Start development server
npm start
```

## Key Features

### 1. **Screenshot Capture**
- Uses `html2canvas` to capture webpage screenshots
- Full page, viewport, or element-specific capture
- Annotation support with Excalidraw integration

### 2. **Visual Annotations**
- Drawing tools powered by Excalidraw
- Arrows, shapes, text, and freehand drawing
- Export annotated screenshots

### 3. **Element Selection**
- Click-to-select page elements
- XPath and CSS selector generation
- Visual highlighting of selected elements

### 4. **Comment System**
- Submit feedback with screenshots
- File attachments support
- Comment threads and replies (extensible)

### 5. **User Management**
- Optional user information capture
- Anonymous feedback support
- Session management

## Usage

### Basic Integration

```html
<script src="https://yourcdn.com/feedback.js"></script>
<script>
  Feedback.init({
    apiUrl: 'https://your-api.com/feedback',
    projectId: 'your-project-id'
  });
</script>
```

### Query Parameter Method

```html
<script src="https://yourcdn.com/feedback.js?project=PROJECT_ID&api=API_URL"></script>
```

### Configuration Options

```javascript
Feedback.init({
  // Required
  apiUrl: 'https://your-api.com/feedback',
  projectId: 'your-project-id',
  
  // Optional
  position: 'bottom-right',     // Widget position
  theme: 'light',                // 'light' or 'dark'
  allowScreenshot: true,         // Enable screenshot capture
  allowAnnotation: true,         // Enable annotations
  allowFileUpload: true,         // Enable file uploads
  maxFileSize: 5242880,          // Max file size (5MB)
  language: 'en'                 // Language
});
```

## API Requirements

Your backend API should support the following endpoints:

### GET /comments
Get comments for a specific page
```
Query params:
  - projectId: string
  - url: string (encoded)

Response:
  {
    "comments": [...]
  }
```

### POST /comments
Submit a new comment
```
Body:
  {
    "projectId": "string",
    "url": "string",
    "comment": "string",
    "name": "string",
    "email": "string",
    "screenshot": "base64 data url",
    "element": {...},
    "files": [...],
    "metadata": {...}
  }

Response:
  {
    "comment": {...}
  }
```

### POST /upload
Upload file attachment
```
Body: FormData with file

Response:
  {
    "url": "string"
  }
```

## Development

### Component Structure

Each component follows this pattern:
- Component logic in `.js` file
- Component styles in `.css` file
- Exported as default ES6 module

### Utility Functions

- **api.js**: API communication
- **screenshot.js**: Screenshot capture utilities
- **helpers.js**: General helper functions

### Build Process

Webpack bundles all files into a single `build.js`:
1. Transpiles React/ES6 with Babel
2. Bundles CSS with style-loader
3. Outputs UMD module
4. Minifies for production

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

### Core
- React 18.2.0
- React DOM 18.2.0

### Features
- @excalidraw/excalidraw - Drawing/annotation
- html2canvas - Screenshot capture
- filepond - File uploads

### Development
- Webpack 5
- Babel 7
- CSS Loader
- Style Loader

## Customization

### Styling
All CSS uses class prefixes to avoid conflicts:
- `.feedback-*` for general classes
- `.design-mode-*` for onboarding
- `.sidebar-*` for sidebar
- `.comment-*` for comments

### Theming
Colors and styles can be customized via CSS variables or by modifying the CSS files directly.

## Testing

To test locally:
1. Run `npm start` to start the development server
2. Open `http://localhost:9000/demo.html`
3. Click the feedback button to test features

## Deployment

1. Build for production: `npm run build`
2. Upload `build.js` to your CDN
3. Integrate into your website

## License

MIT

## Support

For issues and feature requests, please create an issue in the repository.
