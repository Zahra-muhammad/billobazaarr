# Your photos go here

1. Drop a photo into this folder, e.g. `hero-main.jpg`.
2. Open `content.ts` (project root) and change the matching entry in the `images` map:

   ```ts
   heroMain: "/images/hero-main.jpg",
   ```

3. Update the `alt` text for that photo in the same file (describe what is in the picture).

Tips
- Export JPGs around 2400px on the long edge, quality ~80. Next.js resizes and converts them to AVIF/WebP automatically.
- Each entry in `content.ts` has a comment saying what kind of photo belongs there and roughly what shape (portrait / landscape).
- The site applies a warm, slightly desaturated grade to every photo so they sit together. To turn it off for one image, pass `grade={false}` to its `<Img>`.
