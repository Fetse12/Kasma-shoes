# Hero Video Setup

## How to add your own video:

1. **Add your video file** to the `frontend/public/` directory
2. **Name it** `hero-video.mp4` (or update the source in Hero.jsx)
3. **Recommended specs**:
   - Format: MP4 (H.264 codec)
   - Resolution: 1920x1080 or higher
   - Duration: 10-30 seconds (will loop)
   - File size: Under 10MB for web performance
   - Content: Shoe-related, luxury, or abstract footage

## Current fallback sources:

- Vimeo sample video (luxury/fashion related)
- Google sample video (Big Buck Bunny)
- Sample videos.com
- Local file: `/hero-video.mp4`

## If video doesn't work:

The component automatically falls back to a beautiful background image from Unsplash.

## Video requirements for autoplay:

- Must be muted
- Must have `playsInline` attribute
- Modern browsers require user interaction for unmuted autoplay
