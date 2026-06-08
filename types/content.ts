export interface FeatureCard {
  title: string;
  description: string;
}

export interface ProductPreviewItem {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface StatItem {
  number: string;
  label: string;
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
