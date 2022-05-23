export interface Listings {
  id: number;
  mls: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  title: string;
  description: string;
  price: number;
  category: number;
  year_built: string;
  square_feet: number;
  bedrooms: number;
  bathrooms: number;
  main_image: string;
  additional_image: string;
  virtual_tour_url: string;
  featured_listing: number;
  sold_home: number;
  open_house_start_date: string;
  open_house_end_date: string;
  widget_code: string;
  google_map: number;
  zillow: number;
  syndicate_listing: number;
  sort_order: number;
}
