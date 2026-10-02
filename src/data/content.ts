/**
 * =========================================================================
 * AYUSHI'S BIRTHDAY & OUR STORY - PERSONAL DATA CONFIGURATION
 * =========================================================================
 * 
 * You can edit this file to replace any text, letters, dates, captions,
 * or media links with your real memories!
 * 
 * MEDIA REPLACEMENT GUIDE:
 * - Photos: Save your pictures in `public/images/` and update the paths below.
 * - Videos: Save your video clips (.mp4 / .webm) in `public/videos/`.
 * - Music: Save your audio track (.mp3) in `public/music/` or use the playlist.
 * =========================================================================
 */

export interface Milestone {
  id: string;
  year: string;
  title: string;
  date: string;
  description: string;
  image: string;
  quote?: string;
  tag: string;
}

export type MemoryCategory = 'Us' | 'Trips' | 'Celebrations' | 'Random' | 'Favorites';

export interface GalleryPhoto {
  id: string;
  slot: string; // e.g. PHOTO_01
  title: string;
  category: MemoryCategory;
  caption: string;
  date: string;
  location?: string;
  image: string;
  layoutSpan?: 'portrait' | 'landscape' | 'vertical' | 'square' | 'wide';
}

export interface FilmstripPhoto {
  id: string;
  title: string;
  date: string;
  image: string;
}

export interface VideoMemory {
  id: string;
  slot: string; // e.g. VIDEO_01
  title: string;
  date: string;
  duration: string;
  caption: string;
  thumbnail: string;
  videoUrl: string; // .mp4 or .webm
}

export interface LoveLetter {
  id: string;
  number: string;
  title: string;
  date: string;
  preview: string;
  content: string[];
  pages?: string[][]; // Optional multi-page support
  signatureDate: string;
  location?: string;
  memoryReference?: string;
  image?: string;
  caption?: string;
  signoff: string;
  waxSealColor: string;
  envelopeColor?: string;
  rotation?: number; // Subtle tilt angle for stationery feel
  isSpecialBirthday?: boolean;
  isAnniversary?: boolean;
}

export interface FavoriteItem {
  id: string;
  category: string;
  title: string;
  description: string;
  iconName: string;
  note?: string;
}

export interface SongItem {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  audioUrl: string; // Set to your audio file (e.g., "/music/our-song.mp3")
  duration?: string; // e.g. "03:45"
  memoryReference?: string;
  externalUrl?: string; // Official Spotify / YouTube link for full track
}

export const PERSONAL_DATA = {
  names: {
    her: "Ayushi",
    him: "Me",
    monogram: "♡",
    combined: "For Ayushi",
    short: "Us",
  },
  
  dates: {
    birthday: "2026-10-03T00:00:00+05:30", // 3 October 2026
    anniversaryStart: "2022-11-17T00:00:00+05:30", // 17 November 2022
    fourYearAnniversary: "2026-11-17T00:00:00+05:30", // 17 November 2026
    formattedBirthday: "3 October 2026",
    formattedStart: "17 November 2022",
    formattedAnniversary: "17 November 2026",
  },

  hero: {
    greeting: "Happy Birthday, Ayushi ❤️",
    dateBadge: "3 October 2026",
    subtleLine: "Four years of memories, countless little moments, and a story that's still being written.",
    cta: "Enter Our Story →",
    scrollText: "Scroll to discover our story",
    heroImage: "/images/homepage.jpg",
    subtitle: "To the girl who made ordinary moments feel extraordinary.",
    ambientPrompt: "Play Ambient Melody ♫",
  },

  personalIntro: {
    tagline: "FOR MY FAVORITE PERSON",
    heading: "The Little Moments That Mean Everything",
    paragraphs: [
      "Ayushi, jab main 17 November 2022 ke baare me sochta hu, toh samajh aata hai ki sabse special cheez koi badi planning nahi thi, balki vo chote-chote aam se pal the jo humne ek dusre ke sath jiye.",
      "Vishi, long distance me hote huye bhi tumne har din ko itna khoobsurat aur shaant bana diya. Late-night video calls, aadhi raat ko bina wajah baatein karna, ye sab mere din ka sabse best hissa ban jata hai.",
      "Thank you meri life me meri sabse badi khushi banne ke liye aur mujhe itna pyaar dene ke liye, My Love. In chaar saalon ka har ek din mere liye anmol hai, aur ye toh bas humari kahani ki shuruwaat hai."
    ],
    signoff: "Dil se hamesha,",
    author: "Always Yours ❤️",
  },

  // -------------------------------------------------------------
  // OUR JOURNEY (TIMELINE)
  // -------------------------------------------------------------
  milestones: [
    {
      id: "milestone-1",
      year: "2022",
      title: "The Beginning ❤️",
      date: "17 November 2022",
      description: "Humari baat online shuru hui thi. Ek aam si conversation kab late-night calls aur ek dusre ki aadat me badal gayi, pata hi nahi chala.",
      image: "chat.jpeg",
      quote: "17 November 2022 — Vo din jab humari kahani shuru hui.",
      tag: "Started Online",
    },
    {
      id: "milestone-video-call",
      year: "Online",
      title: "First Video Call ❤️",
      date: "Late 2022",
      description: "Humari pehli mulaqaat screen ke through hui thi. Pehli baar humne ek dusre ko face-to-face dekha tha — meri thodi si ghabrahat aur tumhari vo sabse pyaari smile jisne mera dil jeet liya tha.",
      image: "/call.jpeg",
      quote: "Vo pehli baar jab humne ek dusre ko screen par dekha tha.",
      tag: "First Video Call",
    },
    {
      id: "milestone-first-met",
      year: "2024",
      title: "Pehli Baar Saamne Milna ❤️",
      date: "28 January 2024",
      description: "Vo din jab hum pehli baar real life me mile the. Saare calls aur intezaar ke baad, jab tum mere saamne aayi, lag raha tha jaise waqt hi ruk gaya ho. Vo feeling hamesha mere dil me rahegi.",
      image: "/firstmeet.jpg",
      quote: "28 January 2024 — Jab hum pehli baar saamne mile.",
      tag: "First In-Person Meeting",
    },
    {
      id: "milestone-3",
      year: "2024",
      title: "More Memories & Small Adventures",
      date: "Throughout 2024",
      description: "Ye jab hum sath mai pehli baar Bhagwan ka aashirwan lene gaye the sabse best and memorable day tha. Har ek aam din tumhare sath special ban gaya.",
      image: "/trip02.jpg",
      quote: "Har aam si shaam ek yaadgaar pal ban gayi.",
      tag: "Adventures",
    },
    {
      id: "milestone-4",
      year: "2025",
      title: "Through Everything",
      date: "2025",
      description: "Chahe din kitna bhi busy ya mushkil raha ho, hum hamesha ek dusre ke sath khade rahe. Har guzarne wale din ne humare rishte ko aur strong banaya.",
      image: "100.jpg",
      quote: "Har situation me ek dusre ka sath dena.",
      tag: "Unconditional",
    },
    {
      id: "milestone-5",
      year: "2026",
      title: "Almost Four Years ❤️",
      date: "October - November 2026",
      description: "Aaj tumhara birthday celebrate kar rahe hain, aur 17 November 2026 ko poore 4 saal ho jayenge. 4 saal ka ye safar aur aage aane wali poori zindagi tumhare sath bitani hai.",
      image: "4saal.jpeg",
      quote: "Four years down, forever to go.",
      tag: "4 Years Together",
    },
  ] as Milestone[],

  // -------------------------------------------------------------
  // MEMORY GALLERY (PHOTOS)
  // Replace the image URLs with your real photos in public/images/
  // -------------------------------------------------------------
  gallerySection: {
    heading: "Little Moments, Big Memories",
    subtitle: "Some memories don't need a reason to be remembered.",
    featuredMemory: {
      id: "featured-memory",
      slot: "FEATURED_01",
      tag: "FEATURED MEMORY",
      heading: "One of my favorite memories.",
      title: "The Quiet Lake That Evening",
      date: "28 April 2024",
      caption: "Some moments are ordinary when they happen, but become priceless when you look back.",
      location: "Lakeside Sunset Point",
      image: "feacher.jpg",
    },
    editorialQuote: {
      quote: "Not every picture captures a perfect moment.\n\nSometimes it captures a moment\nthat became perfect because we were there.",
      author: "Our Story",
    },
    ending: {
      prompt: "More memories waiting to be made.",
      nextSection: "#videos",
      cta: "Explore Our Little Movies →",
    },
    filmstrip: [
      {
        id: "film-01",
        title: "Morning coffee laughter",
        date: "Jan 2023",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "film-02",
        title: "Sunset silhouette",
        date: "May 2023",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "film-03",
        title: "Mid-laugh candid",
        date: "Oct 2023",
        image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "film-04",
        title: "Winter walk together",
        date: "Dec 2023",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "film-05",
        title: "Window seat dreaming",
        date: "Mar 2024",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "film-06",
        title: "Dessert shared in silence",
        date: "Jul 2024",
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "film-07",
        title: "Under fairy lights",
        date: "Oct 2024",
        image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "film-08",
        title: "Golden horizon",
        date: "Spring 2025",
        image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=600&auto=format&fit=crop",
      },
    ] as FilmstripPhoto[],
  },

  gallery: [
    {
      
      title: "That Quiet Afternoon Smile",
      category: "Us",
      caption: "You didn't know I was looking, but this is the exact smile I fell in love with.",
      date: "November 2022",
      location: "Our favorite cafe corner",
      image: "us01.jpg", /* REPLACE WITH: /images/memories/us01.jpg */
      layoutSpan: "portrait",
    },
    {
      
      title: "Golden Hour Glow",
      category: "Trips",
      caption: "The sunlight was beautiful, but nothing in that view matched you.",
      date: "February 2023",
      location: "Sunset viewpoint",
      image: "trip02.jpg",
      layoutSpan: "landscape",
    },
    {
     
      title: "Birthday Midnight Wish",
      category: "Celebrations",
      caption: "Candlelight on your face, laughing while blowing the candles before making a secret wish.",
      date: "October 2023",
      location: "Midnight surprise",
      image: "celebration03.jpg",
      layoutSpan: "wide",
    },
    {
      
      title: "Caught Off Guard",
      category: "Random",
      caption: "One of those candid selfies where neither of us could stop laughing.",
      date: "June 2024",
      location: "Late evening drive",
      image: "04.jpeg",
      layoutSpan: "square",
    },
    {
      
      title: "Under The Warm String Lights",
      category: "Favorites",
      caption: "Dressed up, but all I cared about was having my hand in yours all night.",
      date: "December 2024",
      location: "Anniversary dinner",
      image: "fav05.jpg",
      layoutSpan: "vertical",
    },
    {
      
      title: "The Weekend Getaway",
      category: "Trips",
      caption: "Escaping the city just to sit by the lake and talk about everything and nothing.",
      date: "April 2025",
      location: "Lakeside hills",
      image: "trip06.png",
      layoutSpan: "landscape",
    },
    {
     
      title: "The Softest Hug",
      category: "Us",
      caption: "No matter how heavy the week was, wrapping my arms around you fixed it all.",
      date: "August 2025",
      location: "Home",
      image: "7.jpg",
      layoutSpan: "portrait",
    },
    {
      title: "Celebrating You Always",
      category: "Celebrations",
      caption: "You deserve all the sweetness and love in the world, on your birthday and every single day.",
      date: "October 2025",
      location: "Your favorite rooftop",
      image: "celebration08.jpg",
      layoutSpan: "square",
    },
    {
      
      title: "The Sunset We Watched In Silence",
      category: "Favorites",
      caption: "The sky turned into shades of violet and gold, and neither of us said a word.",
      date: "January 2026",
      location: "Coastline bench",
      image: "fav09.jpg",
      layoutSpan: "wide",
    },
      {
      
      title: "Memory Photo 10",
      category: "Random",
      caption: "Personal memory",
      date: "2024",
      image: "10.jpg",
      layoutSpan: "portrait",
    },
    {
      
      title: "Memory Photo 11",
      category: "Random",
      caption: "Personal memory",
      date: "2024",
      image: "/images/memories/IMG-20250824-WA0044.jpg",
      layoutSpan: "portrait",
    },
    {
     
      title: "Memory Photo 12",
      category: "Random",
      caption: "Personal memory",
      date: "2024",
      image: "/images/memories/IMG-20260205-WA0053.jpg",
      layoutSpan: "portrait",
    },
    {
      
      title: "Memory Photo 13",
      category: "Random",
      caption: "Personal memory",
      date: "2024",
      image: "13.jpg",
      layoutSpan: "portrait",
    },
    {
      
      title: "Memory Photo 14",
      category: "Random",
      caption: "Personal memory",
      date: "2024",
      image: "14.jpg",
      layoutSpan: "portrait",
    },
    {
      
      title: "Memory Photo 15",
      category: "Random",
      caption: "Personal memory",
      date: "2024",
      image: "15.jpg",
      layoutSpan: "portrait",
    },
    {
      
      title: "Memory Photo 16",
      category: "Random",
      caption: "Personal memory",
      date: "2024",
      image: "/images/memories/IMG_20260219_001259.jpg",
      layoutSpan: "portrait",
    },
    {
      
      title: "Memory Photo 17",
      category: "Random",
      caption: "Personal memory",
      date: "2024",
      image: "/images/memories/IMG_20260425_100705.jpg",
      layoutSpan: "portrait",
    },
    {
     
      title: "Memory Photo 18",
      category: "Random",
      caption: "Personal memory",
      date: "2024",
      image: "/images/memories/IMG_20260525_184623.jpg",
      layoutSpan: "portrait",
    },
    {
      
      title: "Memory Photo 19",
      category: "Random",
      caption: "Personal memory",
      date: "2024",
      image: "/images/memories/Snapchat-1216840361.jpg",
      layoutSpan: "portrait",
    },
    {
     
      title: "Memory Photo 20",
      category: "Random",
      caption: "Personal memory",
      date: "2024",
      image: "20.jpg",
      layoutSpan: "portrait",
    },
    {
    
      title: "Memory Photo 21",
      category: "Random",
      caption: "Personal memory",
      date: "2024",
      image: "21.jpeg",
      layoutSpan: "portrait",
    },
    {
      id: "photo-22",
      slot: "PHOTO_22",
      title: "Memory Photo 22",
      category: "Random",
      caption: "Personal memory",
      date: "2024",
      image: "22.jpg",
      layoutSpan: "portrait",
    },
    {
      
      title: "Memory Photo 23",
      category: "Random",
      caption: "Personal memory",
      date: "2024",
      image: "/images/memories/WhatsApp Image 2023-12-31 at 12.37.39 PM.jpeg",
      layoutSpan: "portrait",
    },
    {
      
      title: "Memory Photo 24",
      category: "Random",
      caption: "Personal memory",
      date: "2024",
      image: "/images/memories/WhatsApp Image 2026-09-30 at 2.52.25 PM.jpeg",
      layoutSpan: "portrait",
    },
    {
     
      title: "Memory Photo 25",
      category: "Random",
      caption: "Personal memory",
      date: "2024",
      image: "25.jpeg",
      layoutSpan: "portrait",
    },
    {
   
      title: "Memory Photo 26",
      category: "Random",
      caption: "Personal memory",
      date: "2024",
      image: "26.jpeg",
      layoutSpan: "portrait",
    },
  ] as GalleryPhoto[],

  // -------------------------------------------------------------
  // VIDEO MEMORIES ("Our Little Movies 🎬")
  // -------------------------------------------------------------
  videos: [
    {
      id: "video-01",
      slot: "VIDEO_01",
      title: "Laughing In The Rain",
      date: "July 2023",
      duration: "0:42",
      caption: "When the clouds burst suddenly, we didn't run for shelter — we just stood there laughing.",
      thumbnail: "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?q=80&w=800&auto=format&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", /* REPLACE WITH: /videos/rain-laugh.mp4 */
    },
    {
      id: "video-02",
      slot: "VIDEO_02",
      title: "Roadtrip Playlist & Windows Down",
      date: "May 2024",
      duration: "1:15",
      caption: "Singing terribly off-key with our favorite tracks playing at full blast.",
      thumbnail: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800&auto=format&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", /* REPLACE WITH: /videos/roadtrip.mp4 */
    },
    {
      id: "video-03",
      slot: "VIDEO_03",
      title: "Birthday Cake & Blushing",
      date: "October 2024",
      duration: "0:36",
      caption: "Your expression right when we brought out the sparkler candles.",
      thumbnail: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=800&auto=format&fit=crop",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", /* REPLACE WITH: /videos/birthday-candles.mp4 */
    },
  ] as VideoMemory[],

  // -------------------------------------------------------------
  // LOVE LETTERS ("Letters I Never Want You To Forget")
  // -------------------------------------------------------------
  lettersSection: {
    heading: "Letters I Never Want You To Forget",
    subtitle: "Kuch baatein jo dil me hain, aur jinhe lafzon me kehna zaroori tha.",
  },
  letters: [
    {
      id: "letter-01",
      number: "01",
      title: "Kahaani Ki Shuruwaat ❤️",
      date: "17 November 2022",
      preview: "Yaad hai 17 November 2022 ki vo raat jab phone par ghanto baat karke bhi man nahi bhara tha?",
      location: "Jahan se humari shuruwaat hui",
      memoryReference: "Humari pehli baat",
      content: [
        "Meri Pyaari Vishi,",
        "Yaad hai 17 November 2022 ka vo din? Ek aam si online baat se shuru hua tha sab kuch. Na maine socha tha na tumne, ki ek random message se humari itni pyaari kahani shuru ho jayegi.",
        "Pehli baar jab late night calls shuru huye the, dono ko neend aa rahi hoti thi par koi call cut nahi karna chahta tha. Tumhari awaaz sun kar jo sukoon milta tha, vo aaj 4 saal baad bhi bilkul waisa hi hai, Ayushi.",
        "Door hokar bhi tumne mujhe kabhi akela feel nahi hone diya. Us din sirf ek relationship shuru nahi hua tha, us din mujhe meri life ka sabse favorite insaan mil gaya tha."
      ],
      signatureDate: "17 November 2022",
      signoff: "Dil se sirf tumhara, My Love ❤️",
      waxSealColor: "#8e1f2b",
      envelopeColor: "#1d0b16",
      rotation: -1.5,
    },
    {
      id: "letter-02",
      number: "02",
      title: "Tumhari Vo Choti Choti Baatein ❤️",
      date: "Har Din & Hamesha",
      preview: "Mujhe sirf tumhari khoobsurati se hi pyaar nahi hai, balki tumhari har us aadat se hai jo sirf mujhe pata hai.",
      location: "Jahan bhi tum sath ho",
      memoryReference: "Vo baatein jo sirf mujhe pata hain",
      content: [
        "Suno Ayushi,",
        "Agar koi mujhse pooche ki mujhe tum me kya sabse zyada pasand hai, toh main sirf ye nahi kahunga ki tum kitni khoobsurat lagti ho — waise Darling, tum har look me gazab lagti ho!",
        "Par mujhe sabse zyada pyaar hai tumhari un choti-choti aadato se. Jab tum video call par baat karte huye apni naak sikodti ho, choti baato par bachho ki tarah khush ho jaati ho, aur screen ke us paar se bhi meri har baat samajh jaati ho.",
        "Distance kitna bhi ho, tumhare sath mujhe lagta hai ki main jaisa hu waisa hi reh sakta hu. Tumne mujhe bina kisi condition ke pyaar kiya hai, Vishi, aur yahi mere liye sabse badi khushi hai."
      ],
      signatureDate: "Always & Every Day",
      signoff: "Tumhara sabse bada fan, Darling ♡",
      waxSealColor: "#791522",
      envelopeColor: "#1a0914",
      rotation: 1.2,
    },
    {
      id: "letter-03",
      number: "03",
      title: "Long Distance & Vo Saare Pal ❤️",
      date: "In 4 Saalon Me",
      preview: "Vo baarish, vo aadhi raat ki video calls, aur milne ke din count-down karna...",
      location: "Late night drives & video calls",
      memoryReference: "Moments between milestones",
      content: [
        "Meri Vishi,",
        "Jab main in 4 saalon ke long distance ke baare me sochta hu, toh mujhe lagta hai ki distance ne humare pyaar ko kam nahi balki aur gehra banaya hai.",
        "Vo ghanto video call par rehna, ek dusre ke screen grabs lena, aur calendar me milne ke din count karna... aur jab hum finally mile the, car me saath baith kar tumhara haath pakadna aur shaant reh kar bas ek dusre ko mehsoos karna.",
        "Tumhare sath bitaya har ek second mere liye anmol hai. Dooriyan chahe kitni bhi ho, mera dil hamesha tumhare paas hi rehta hai, My Love."
      ],
      image: "thro.jpeg",
      caption: "Vo shaam jab tumhare sath chup baithna bhi kitna sukoon deta tha.",
      signatureDate: "Har Sham, Har Pal",
      signoff: "Har ek yaad ke sath, tumhara ❤️",
      waxSealColor: "#61101b",
      envelopeColor: "#170812",
      rotation: -0.8,
    },
    {
      id: "letter-04",
      number: "04",
      title: "Humare 4 Saal & Aane Wala Forever ❤️",
      date: "17 November 2022 → 17 November 2026",
      preview: "17 November 2022 se 17 November 2026 tak, 4 saal hone wale hain humare...",
      location: "4 Saal Aur Aage Ki Poori Zindagi",
      memoryReference: "Pehle hello se 4 saal ke safar tak",
      content: [
        "Meri Jaan Ayushi,",
        "17 November 2022 se 17 November 2026 tak, dekhte hi dekhte 4 saal poore hone wale hain. In chaar saalon me humne long distance ka har phase dekha — kabhi milne ki khushi, kabhi door rehne ki tadap, par har baar humara rishta aur mazboot hua.",
        "Tumne mujhe sikhaya ki sacha pyaar kya hota hai — miles door hokar bhi ek dusre ke dil ke paas rehna. Aage aane wale saalon me kitni jagaho par ghoomna hai, kitni nayi yaadein banani hain aur poori zindagi tumhare sath bitani hai, Darling.",
        "Four years down, and a whole lifetime to go! I love you so much, Vishi."
      ],
      pages: [
        [
          "Meri Jaan Ayushi,",
          "17 November 2022 se 17 November 2026 tak, dekhte hi dekhte 4 saal poore hone wale hain. In chaar saalon me humne long distance ka har phase dekha — kabhi milne ki khushi, kabhi door rehne ki tadap, par har baar humara rishta aur mazboot hua.",
          "Tumne mujhe sikhaya ki sacha pyaar kya hota hai — miles door hokar bhi ek dusre ke dil ke paas rehna."
        ],
        [
          "Aage Ka Safar,",
          "Aage aane wale saalon me kitni nayi jagaho par ghoomna hai, kitni nayi yaadein banani hain aur poori zindagi tumhare sath bitani hai, Darling.",
          "Four years down, and a whole lifetime to go! Happy 4 Years Anniversary advance me, My Love ♡"
        ]
      ],
      signatureDate: "17 November 2022 → 17 November 2026",
      signoff: "Happy 4 Years & Forever My Love ♡",
      isAnniversary: true,
      waxSealColor: "#470b16",
      envelopeColor: "#150711",
      rotation: 1.5,
    },
    {
      id: "letter-05",
      number: "05",
      title: "Happy Birthday Meri Jaan ❤️",
      date: "3 October 2026",
      preview: "Kabhi kabhi main sochta hoon ki humari story kitni ajeeb si aur kitni khoobsurat hai...",
      location: "Bas tumhare paas, tumhara din manate huye",
      memoryReference: "Vo din jab meri sabse favorite ladki paida hui thi",
      content: [
        "Ayushi,",
        "kabhi kabhi main sochta hoon ki humari story kitni ajeeb si aur kitni khoobsurat hai. Hum online mile the, aur honestly tab mujhe bilkul idea nahi tha ki tum meri life ka sabse important part ban jaogi, Vishi.",
        "17 November 2022 se lekar aaj tak bahut kuch change hua, bahut saare moments aaye, kuch bahut special the aur kuch bilkul random... par screen ke through bhi tumne mera har din special banaya.",
        "Mujhe sabse achha ye lagta ki tumhare saath mujhe har cheez perfect dikhane ki zarurat nahi padti. Main jaisa hoon waise hi reh sakta hoon, aur fir bhi tum mere saath ho, My Love.",
        "Aur 28 January 2024... us din tumse finally saamne milna mere liye sach mein bahut special tha. Online wali story us din thodi aur real ho gayi.",
        "Bas itna kehna hai ki thank you... meri life ka part banne ke liye, meri random baatein sunne ke liye, mere saath hasne ke liye, aur door hokar bhi mujhe itna pyaar dene ke liye, Darling.",
        "Aaj tumhara birthday hai, aur main bas chahta hoon ki tum genuinely khush raho.",
        "Happy Birthday, Ayushi ❤️",
        "Aur haan... abhi humari story toh bas shuru hui hai!"
      ],
      signatureDate: "3 October 2026",
      signoff: "Hamesha sirf aur sirf tumhara ❤️",
      isSpecialBirthday: true,
      waxSealColor: "#b23a48",
      envelopeColor: "#220c1a",
      rotation: 0,
    },
  ] as LoveLetter[],

  // -------------------------------------------------------------
  // OUR FAVORITE THINGS
  // -------------------------------------------------------------
  favorites: [
    {
      id: "fav-1",
      category: "Our Song",
      title: "The Melody We Repeat",
      description: "That one song that plays in the car and both of us immediately turn up the volume and sing along.",
      iconName: "Music",
      note: "Our special tune",
    },
    {
      id: "fav-2",
      category: "Our Place",
      title: "Our Quiet Corner",
      description: "The spot we retreat to when we want to escape everyone else and just talk for hours.",
      iconName: "MapPin",
      note: "Where time stands still",
    },
    {
      id: "fav-3",
      category: "Our Memory",
      title: "That Unplanned Night",
      description: "When our original plan fell through and ended up being the best evening of the entire year.",
      iconName: "Sparkles",
      note: "Pure magic",
    },
    {
      id: "fav-4",
      category: "Our Inside Joke",
      title: "The Look Across The Room",
      description: "When someone says something and we just make eye contact and have to suppress laughing out loud.",
      iconName: "Smile",
      note: "Unspoken language",
    },
    {
      id: "fav-5",
      category: "Our Favorite Food",
      title: "The Midnight Snack Run",
      description: "Craving that one specific dish at 11 PM and debating for 15 minutes before ordering it anyway.",
      iconName: "UtensilsCrossed",
      note: "Guilty pleasure",
    },
    {
      id: "fav-6",
      category: "Our Favorite Date",
      title: "Doing Nothing, Together",
      description: "Pajamas, a good movie we barely finish, takeout food, and resting my head on your shoulder.",
      iconName: "Heart",
      note: "Absolute comfort",
    },
    {
      id: "fav-7",
      category: "Our Little Tradition",
      title: "The 'Reached Home' Text & Call",
      description: "No matter how late or how busy, never ending the day without checking that you're safe and smiling.",
      iconName: "PhoneCall",
      note: "Every single day",
    },
    {
      id: "fav-8",
      category: "Our Photo",
      title: "The One Where You're Laughing",
      description: "Unfiltered, slightly blurry, but holding the truest snapshot of pure joy between us.",
      iconName: "Camera",
      note: "My lock screen forever",
    },
  ] as FavoriteItem[],

  // -------------------------------------------------------------
  // SPECIAL SURPRISE SECTION
  // -------------------------------------------------------------
  surprise: {
    teaserHeading: "There's something I made only for you...",
    teaserSub: "A secret page held in my heart across four years.",
    openButtonText: "Open Your Surprise ❤️",
    revealTitle: "For My SWTHRT,",
    revealText: [
      "If I could keep one thing from these last four years forever, it would be all the little moments that became special simply because you were there.",
      "The way you look at me when you think I'm not watching. The comfort of your presence when the world feels overwhelming. The certainty that no matter what comes our way, we are a team.",
      "Happy Birthday, my love ❤️",
      "And here's to our upcoming 4-year anniversary on 17 November 2026, and to every single adventure we haven't experienced yet."
    ],
    closing: "Forever & Always,",
    signature: "With all my love ❤️",
  },

  // -------------------------------------------------------------
  // MUSIC PLAYLIST ("The Soundtrack of Our Story ♫")
  // Editable tracks: add your songs in /public/music/
  // -------------------------------------------------------------
  playlist: [
    {
      id: "track-01",
      title: "Tera Mera Milna",
      artist: "Himesh Reshammiya & Shreya Ghoshal",
      albumArt: "s1.jpg",
      audioUrl: "/music/tera-mera-milna.mp3",
      externalUrl: "https://open.spotify.com/search/Tera%20Mera%20Milna",
      duration: "05:01",
      memoryReference: "Tera mera milna rawaa rawaa...",
    },
      {
      id: "track-02",
      title: "Khat",
      artist: "Navjot Ahuja",
      albumArt: "s2.jpg",
      audioUrl: "/music/khat.mpeg",
      externalUrl: "https://open.spotify.com/track/3gixnmepHSsyAuho34rprN?autoplay_ok=1",
      duration: "05:01",
      memoryReference: "Khat",
    },

    {
      id: "track-03",
      title: "Tu Maan Meri Jaan",
      artist: "King",
      albumArt: "s03.jpg",
      audioUrl: "/music/tu-maan-meri-jaan.mp3",
      externalUrl: "https://open.spotify.com/search/Maan%20Meri%20Jaan%20King",
      duration: "03:14",
      memoryReference: "Tu maan meri jaan, main tujhe jaane na doonga...",
    },
    {
      id: "track-04",
      title: "Apna Bana Le Piya",
      artist: "Arijit Singh & Sachin-Jigar",
      albumArt: "s4.jpeg",
      audioUrl: "/music/apna-bana-le.mp3",
      externalUrl: "https://open.spotify.com/search/Apna%20Bana%20Le%20Bhediya",
      duration: "04:21",
      memoryReference: "Apna bana le piya, dil ke nagar mein shehar tu basa le piya...",
    },
    {
      id: "track-05",
      title: "Tu Jaane Na",
      artist: "Atif Aslam & Pritam",
      albumArt: "s5.jpeg",
      audioUrl: "/music/tu-jaane-na.mp3",
      externalUrl: "https://open.spotify.com/search/Tu%20Jaane%20Na%20Atif%20Aslam",
      duration: "05:41",
      memoryReference: "Kaise bataaye kyun tujhko chahe, yaara bata na paaye...",
    },
    {
      id: "track-06",
      title: "Gehra Hua",
      artist: "Arijit Singh & Shashwat Sachdev",
      albumArt: "s06.jpg",
      audioUrl: "/music/gehra-hua.mp3",
      externalUrl: "https://open.spotify.com/search/Gehra%20Hua%20Dhurandhar",
      duration: "03:52",
      memoryReference: "Gehra hua ye ishq mera...",
    },
    {
      id: "track-07",
      title: "In Dino — Life in a Metro",
      artist: "Soham Chakraborty & Pritam",
      albumArt: "s7.jpg",
      audioUrl: "/music/in-dino.mp3",
      externalUrl: "https://open.spotify.com/search/In%20Dino%20Life%20in%20a%20Metro",
      duration: "06:40",
      memoryReference: "In dino dil mera mujhse hai keh raha...",
    },
  ] as SongItem[],

  // -------------------------------------------------------------
  // FINAL SECTION
  // -------------------------------------------------------------
  finalSection: {
    tagline: "BEFORE YOU GO...",
    message1: "Thank you for being the most beautiful part of my life.",
    birthdayWish: "Happy Birthday, Ayushi ❤️",
    journeyTimeline: "17 November 2022 → Forever",
    image: "111.jpg", /* REPLACE WITH: /images/final-cherished.jpg */
    monogramBadge: "FOR MY Cutie pie ♡",
    footerQuote: "Built with all my love, especially for you.",
  },

  // -------------------------------------------------------------
  // SECRET SURPRISE ("There's One More Thing…")
  // -------------------------------------------------------------
  secretSurprise: {
    teaser: {
      line1: "I almost forgot one thing…",
      line2: "There's one more thing waiting for you.",
      cta: "Find it →",
    },
    intro: {
      title: "For My Love.",
      subtitle: "Because four years deserve more than just a birthday wish.",
    },
    timeline: {
      startDate: "17 November 2022",
      endDate: "17 November 2026",
      words: [
        "First hello",
        "Endless laughter",
        "Late night drives",
        "Shared ice cream",
        "Quiet comfort",
        "Growing together",
        "Us",
      ],
    },
    birthdayReveal: {
      heading: "Happy Birthday, Meri Jaan ❤️",
      date: "3 October 2026",
      message: [
        "Four years gave us countless memories, ordinary days that became special, and little moments that I never want to forget.",
        "Today isn't just about celebrating your birthday.",
        "It's about celebrating you — and everything we've shared along the way.",
        "I hope this year gives you more reasons to smile, more moments worth remembering, and everything your heart is quietly wishing for.",
      ],
    },
    memoryReveal: {
      image: "112.jpeg",
      caption: "One of the many moments I'll always remember.",
    },
    finalMessage: {
      lead: "And this is only the beginning.",
      span: "17 November 2022 → 17 November 2026",
      milestone: "Four years of us.",
      closing: "And so many more memories still waiting to be made.",
    },
    ending: {
      title: "Happy Birthday, Darling.",
      signoff: "With all my love ❤️",
      date: "3 October 2026",
      finalQuote: "Forever starts with another memory.",
    },
  },
};
