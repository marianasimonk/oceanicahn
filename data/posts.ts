
import type { Post, Comment, OceanCategory } from '../types';

// A helper function to create a date string
const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
};

// Generate a series of dates starting from Jan 1, 2025
const generateDates = (count: number): string[] => {
  const dates: string[] = [];
  const startDate = new Date('2025-01-01T10:00:00Z');
  for (let i = 0; i < count; i++) {
    const newDate = new Date(startDate);
    newDate.setHours(startDate.getHours() + i * Math.floor(Math.random() * 8 + 4)); // Add random hours
    dates.push(formatDate(newDate));
  }
  return dates.reverse(); // Show most recent first
};

const postDates = generateDates(310);

const names = [
  "Liam Smith", "Olivia Johnson", "Noah Williams", "Emma Brown", "Oliver Jones", "Ava Garcia", "Elijah Miller", "Sophia Davis", "William Rodriguez", "Isabella Martinez", 
  "James Hernandez", "Charlotte Lopez", "Benjamin Gonzalez", "Amelia Wilson", "Lucas Anderson", "Mia Thomas", "Henry Taylor", "Evelyn Moore", "Alexander Jackson", "Harper Martin",
  "Michael Thompson", "Abigail White", "Ethan Harris", "Emily Clark", "Daniel Lewis", "Madison Robinson", "Matthew Walker", "Ella Perez", "Aiden Hall", "Victoria Young",
  "Joseph Allen", "Chloe King", "David Wright", "Grace Scott", "Samuel Green", "Zoey Adams", "John Baker", "Penelope Nelson", "Andrew Carter", "Lily Mitchell",
  "Ryan Roberts", "Aria Turner", "Christopher Phillips", "Layla Campbell", "Joshua Parker", "Nora Evans", "Dylan Edwards", "Hannah Collins", "Nathan Stewart", "Addison Sanchez",
];

const contents = [
  "Just got back from a dive trip in the Red Sea. The coral reefs were absolutely breathtaking! We need to protect these underwater wonders.",
  "Has anyone seen the latest documentary on Netflix about deep-sea exploration? The footage of bioluminescent creatures is mind-blowing!",
  "Participated in a local beach cleanup today. It's heartbreaking to see how much plastic washes ashore. Every little bit helps, though! Find a cleanup near you: https://www.oceanconservancy.org/volunteer/international-coastal-cleanup/",
  "I'm trying to switch to a more sustainable lifestyle. Does anyone have recommendations for zero-waste bathroom products?",
  "Whale watching season is here! Saw a pod of humpbacks breaching off the coast today. An unforgettable experience.",
  "Reading a fascinating book about octopus intelligence. They are truly remarkable creatures. What's your favorite marine animal?",
  "The issue of overfishing is deeply concerning. How can we, as consumers, make more responsible seafood choices? The Monterey Bay Aquarium's Seafood Watch is a great resource: https://www.seafoodwatch.org/",
  "Planning a trip to the Great Barrier Reef next year. Any tips for responsible tourism operators?",
  "The sound of waves is the most calming thing in the world. Where's your favorite beach to relax and unwind?",
  "Stunned by the beauty of the kelp forests in California. It felt like swimming through an enchanted underwater forest.",
  "Working on a school project about the impact of ocean acidification. The chemistry is complex, but the threat to shelled organisms is very real. Learn more at NOAA: https://www.noaa.gov/education/resource-collections/ocean-coasts/ocean-acidification",
  "Does anyone know of any volunteer opportunities with sea turtle conservation programs? I'd love to get involved.",
  "The diversity of nudibranchs is incredible. They're like tiny, psychedelic jewels of the sea. Post your best macro shots!",
  "Thinking about how interconnected everything is. Protecting mangroves is crucial for protecting coral reefs and fish nurseries.",
  "Let's talk about 'ghost nets'. These abandoned fishing nets are silent killers in our oceans. The Global Ghost Gear Initiative is doing important work: https://www.ghostgear.org/",
  "Saw a Manta Ray for the first time on my last dive. Majestic is an understatement. They glide through the water so effortlessly.",
  "Learning about the 'whale pump' effect and how whale poop is vital for ocean ecosystems. Nature is amazing!",
  "Who else is fascinated by the Mariana Trench? The pressure and darkness down there are extreme, yet life finds a way.",
  "Let's share some good news! I read about a successful coral restoration project in Indonesia. There is hope! Check out Coral Guardian: https://www.coralguardian.org/",
  "What's one simple change you've made in your daily life to reduce your impact on the oceans?",
];

const comments = [
    { name: "EcoWarrior22", content: "That's awesome! I've been wanting to go there." },
    { name: "OceanLover", content: "Totally agree! We must do more. The Ocean Cleanup project is doing great work: https://theoceancleanup.com/" },
    { name: "DeepThinker", content: "Great point. I never thought about it that way." },
    { name: "ReefSeeker", content: "I saw that too! So inspiring." },
    { name: "PlasticPatrol", content: "Thanks for sharing! Very informative." },
    { name: "MarineBioGeek", content: "For anyone interested in cephalopod intelligence, I recommend Peter Godfrey-Smith's book, 'Other Minds'. It's a game-changer." },
    { name: "SustainableSam", content: "Looking for sustainable seafood? The Monterey Bay Aquarium Seafood Watch guide is an excellent resource." },
    { name: "DiveMasterDan", content: "The pictures are amazing! That reminds me of my dive in the Galapagos." },
    { name: "ClimateActivist", content: "This is a direct consequence of climate change. We need policy changes now." },
    { name: "CuriousCurrent", content: "Wow, I had no idea! Thanks for the info." },
    { name: "BeachComber", content: "Beautiful! Thanks for sharing this moment with us." },
    { name: "ScubaSteve", content: "Incredible shot! What camera setup are you using?" },
    { name: "WhaleWatcher", content: "We need to protect their migration routes. Ship strikes are a huge threat." },
    { name: "Conservationist", content: "Policy change is key. Support organizations that lobby for stronger environmental laws, like Oceana: https://oceana.org/"},
    { name: "FutureLeader", content: "I'm doing my thesis on this! It's such a critical area of research." },
];

const oceanKeywords = [
  'coral', 'reef', 'fish', 'whale', 'dolphin', 'turtle', 'shark', 'ocean', 'wave', 'beach', 
  'coast', 'seaweed', 'jellyfish', 'octopus', 'starfish', 'anemone', 'seal', 'seabird', 
  'boat', 'underwater', 'diving', 'seascape', 'crab', 'clam', 'manta', 'ray'
];

const getCategoryFromContent = (content: string): OceanCategory => {
  const lowerContent = content.toLowerCase();
  if (lowerContent.includes('question') || lowerContent.includes('anyone know') || lowerContent.includes('how can we') || lowerContent.includes('any tips')) {
      return 'Q&A';
  }
  if (lowerContent.includes('photo') || lowerContent.includes('documentary') || lowerContent.includes('shots') || lowerContent.includes('footage') || lowerContent.includes('pictures')) {
      return 'Photography & Art';
  }
  if (lowerContent.includes('dive') || lowerContent.includes('diving') || lowerContent.includes('scuba') || lowerContent.includes('exploration') || lowerContent.includes('trip')) {
      return 'Diving & Exploration';
  }
  if (lowerContent.includes('conservation') || lowerContent.includes('cleanup') || lowerContent.includes('plastic') || lowerContent.includes('protect') || lowerContent.includes('sustainable') || lowerContent.includes('overfishing') || lowerContent.includes('acidification')) {
      return 'Conservation Efforts';
  }
  if (lowerContent.includes('intelligence') || lowerContent.includes('creatures') || lowerContent.includes('species') || lowerContent.includes('ecosystems') || lowerContent.includes('bioluminescent') || lowerContent.includes('nudibranchs')) {
      return 'Marine Biology';
  }
  return 'General Discussion';
};

export const initialPosts: Post[] = Array.from({ length: 307 }, (_, i) => {
    const name = names[i % names.length];
    const postKeyword = oceanKeywords[i % oceanKeywords.length];
    
    // 60% of posts will have between 1 and 4 comments
    const numComments = Math.random() > 0.4 ? Math.floor(Math.random() * 4) + 1 : 0;
    const postComments: Comment[] = [];

    if (numComments > 0) {
      const usedCommentIndices = new Set<number>();
      for (let j = 0; j < numComments; j++) {
        // Ensure we don't repeat the same comment on one post
        let commentIndex;
        do {
          commentIndex = Math.floor(Math.random() * comments.length);
        } while (usedCommentIndices.has(commentIndex));
        usedCommentIndices.add(commentIndex);

        const commentData = comments[commentIndex];
        postComments.push({
            id: 2000 + i * 5 + j,
            name: commentData.name,
            avatarSeed: `${oceanKeywords[(i + j * 3 + 5) % oceanKeywords.length]}${i}`,
            timestamp: `${Math.floor(Math.random() * 8) + 1}h ago`,
            content: commentData.content,
            likes: Math.floor(Math.random() * 20),
            replies: [],
        });
      }
    }
    
    return {
        id: 1000 + i,
        name: name,
        avatarSeed: `${postKeyword}${i}`,
        timestamp: postDates[i] || 'A while ago',
        content: contents[i % contents.length],
        category: getCategoryFromContent(contents[i % contents.length]),
        likes: Math.floor(Math.random() * 250),
        comments: postComments.sort((a,b) => a.id - b.id), // Keep comment order consistent
    };
});
