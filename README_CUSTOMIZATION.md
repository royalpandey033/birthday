# Ayushi's Birthday & Romantic Memory Website — Customization Guide

This website has been built specifically for **Ayushi's birthday on 3 October 2026** and to celebrate the 4-year journey from **17 November 2022 to 17 November 2026**.

Everything is structured so you can customize photos, videos, music, and love letters in minutes.

---

## 1. Where to Edit Content & Text

Open:
📂 `src/data/content.ts`

In this single file, you can easily change:
- **Personal Letters**: Edit the 5 love letters under `letters`.
- **Milestones**: Add or change your real story for 2022, 2023, 2024, 2025, and 2026 under `milestones`.
- **Photo Captions & Dates**: Edit `gallery` items (`PHOTO_01` to `PHOTO_08`).
- **Videos**: Edit `videos` items (`VIDEO_01`, `VIDEO_02`, `VIDEO_03`).
- **Our Favorites**: Edit your actual song, place, food, memory, and traditions under `favorites`.
- **Surprise Message**: Edit the secret message inside `surprise.revealText`.

---

## 2. Where to Add Your Photos

1. Put your photos inside the folder:
   📂 `public/images/`
2. Name them something clean like:
   - `hero.jpg` (Hero opening memory)
   - `photo-01.jpg`
   - `photo-02.jpg`
   - `timeline-2022.jpg`
   - `final-photo.jpg`
3. In `src/data/content.ts`, update the `image` path:
   ```ts
   image: "/images/photo-01.jpg"
   ```

---

## 3. Where to Add Your Personal Videos

1. Put your video clips (.mp4 or .webm) in:
   📂 `public/videos/`
2. In `src/data/content.ts`, update the `videoUrl`:
   ```ts
   videoUrl: "/videos/our-trip.mp4"
   ```
*(Note: Videos never autoplay with sound so Ayushi can browse comfortably!)*

---

## 4. Where to Add Your Song

1. Put your MP3 audio file into:
   📂 `public/music/our-song.mp3`
2. In `src/data/content.ts`, under `playlist`:
   ```ts
   {
     id: "song-1",
     title: "Our Special Song",
     artist: "Theme For Ayushi",
     albumArt: "/images/album.jpg",
     audioUrl: "/music/our-song.mp3"
   }
   ```
*(If `audioUrl` is left empty, the website automatically plays a soothing romantic ambient piano melody created with the Web Audio synthesizer!)*

---

## 5. How to Run Locally

```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser!

## 6. How to Build for Hosting

```bash
npm run build
```
This generates the optimized production build in `dist/`, which you can deploy to Vercel, Netlify, or GitHub Pages for free!
