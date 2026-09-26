export interface FeatureCard {
  title: string;
  description: string;
}

export interface ProductPreviewItem {
  title: string;
  description: string;
  image: string;
  image2?: string;
  link: string;
}

export interface StatItem {
  number: string;
  label: string;
}

export interface AwardItem {
  imageUrl: string;
  title?: string;
}

export interface HomeContent {
  heroHeading: string;
  heroSubheading: string;
  heroBody: string;
  heroBg: string;
  features: FeatureCard[];
  aboutHeading: string;
  aboutBody: string;
  aboutImg: string;
  stats: StatItem[];
  productsPreview: ProductPreviewItem[];
  awardsHeading?: string;
  awards?: AwardItem[];
}

export interface ValueCard {
  title: string;
  description: string;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  body: string;
}

export interface QualityCard {
  title: string;
  description: string;
}

export interface AboutContent {
  heroHeading: string;
  heroSubheading: string;
  heroBg: string;
  whoWeAreBody: string;
  whoWeAreImg: string;
  historyImg: string;
  timeline: TimelineMilestone[];
  values: ValueCard[];
  qualityHeading: string;
  qualityCards: QualityCard[];
}

export interface ProductItem {
  name: string;
  description: string;
  image: string;
  image2?: string;
}

export interface ProductsContent {
  heroHeading?: string;
  heroSubheading?: string;
  heroBg?: string;
  lamb: ProductItem[];
  mutton: ProductItem[];
  offal: ProductItem[];
  skins: ProductItem[];
}

export interface AssuranceSection {
  heading: string;
  body: string;
  image: string;
}

export interface AssuranceContent {
  heroHeading: string;
  heroSubheading: string;
  heroBg: string;
  sections: AssuranceSection[];
}

export interface ContactContent {
  address: string;
  phone: string;
  email: string;
  hours: string;
  saturdayHours: string;
}

export interface BlogEntry {
  title: string;
  date: string;
  description: string;
  link: string;
  image: string;
}

export interface MediaContent {
  heroHeading: string;
  heroSubheading: string;
  heroBg: string;
  instagramPosts: { url: string; thumbnail?: string; caption?: string; }[];
  blogs: BlogEntry[];
}

export interface CultureReview {
  name: string;
  message: string;
  image?: string;
}

export interface CultureGalleryImage {
  url: string;
  caption?: string;
}

export interface CultureContent {
  heroHeading: string;
  heroSubheading: string;
  heroBg: string;
  
  workCultureHeading: string;
  workCultureBody: string;
  workCultureImages: CultureGalleryImage[];
  
  communityHeading: string;
  communityBody: string;
  communityImages: CultureGalleryImage[];
  
  womenHeading: string;
  womenBody: string;
  womenImages: CultureGalleryImage[];
  
  reviews: CultureReview[];
  
  stats: { number: string; label: string; }[];
}

export interface WhoWeAreContent {
  heroHeading: string;
  heroSubheading: string;
  heroBg: string;
  mainHeading: string;
  mainBody: string;
  mainImage: string;
  trustedHeading: string;
  trustedBody: string;
  trustedImage: string;
  valueCards: { title: string }[];
  valueBullets: string[];
}

export interface AtAGlanceContent {
  heroHeading: string;
  heroSubheading: string;
  heroBg: string;
  stats: StatItem[];
}

export interface HistoryMilestone {
  year: string;
  title: string;
  body: string;
  image?: string;
}

export interface HistoryContent {
  heroHeading: string;
  heroSubheading: string;
  heroBg: string;
  timeline: HistoryMilestone[];
}

export interface ValuesContent {
  heroHeading: string;
  heroSubheading: string;
  heroBg: string;
  valueCards: { title: string }[];
  valueBullets: string[];
}

export interface FoodSafetySection {
  heading: string;
  body: string;
  image: string;
}

export interface FoodSafetyContent {
  heroHeading: string;
  heroSubheading: string;
  heroBg: string;
  missionStatement: string;
  sections: FoodSafetySection[];
}

export interface CommunityCharitySection {
  heading: string;
  body: string;
  stat: string;
  statLabel: string;
  quote: string;
  quoteAuthor: string;
  image: string;
}

export interface CommunityContent {
  heroHeading: string;
  heroSubheading: string;
  heroBg: string;
  introText: string;
  charitySections: CommunityCharitySection[];
  reviews: { name: string; message: string; image?: string; }[];
  galleryImages?: string[];
}



