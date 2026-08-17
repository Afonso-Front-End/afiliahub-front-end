import type { SectionBackground } from "@/types/cms";

export type Product = {
  id: string;
  name: string;
  img: string;
  price: number;
  oldPrice: number;
  rating: number;
  store: string;
  category: string;
  description: string;
  affiliateUrl?: string;
  background?: SectionBackground;
};

export type StoreFilter = string;
