export interface ReviewItem {
  id: number;
  name: string;
  role: string;
  company: string;
  country: string;
  flag: string;
  rating: number;
  service: string;
  quote: string;
}

export type Testimonial = ReviewItem;
