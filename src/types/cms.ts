export type SectionBackground = {
  type: "gradient" | "solid";
  from?: string;
  to?: string;
  color?: string;
  angle?: number;
};

export type HeroMainContent = {
  badge: string;
  title: string;
  description: string;
  highlight: string;
  buttonText: string;
  buttonTarget: string;
  imageUrl: string;
  background: SectionBackground;
};

export type HeroSideCardContent = {
  label: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  /** Card cupom: ID do produto em Produtos em Destaque */
  productId?: string;
  /** Card cupom: link direto na loja (opcional; vazio = usa o produto vinculado) */
  affiliateUrl?: string;
  imageUrl: string;
  background: SectionBackground;
};

export type CategoryItem = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  badge?: string;
  background: SectionBackground;
  active: boolean;
};

export type CategoriesContent = {
  title: string;
  subtitle: string;
  buttonText: string;
  items: CategoryItem[];
};

export type StoreSearchParamStyle = "query" | "hyphen";

export type StoreItem = {
  id: string;
  name: string;
  affiliateUrl: string;
  searchParamStyle: StoreSearchParamStyle;
  badgeClass: string;
  active: boolean;
};

export type StoresContent = {
  title: string;
  subtitle: string;
  items: StoreItem[];
};

export type CmsProduct = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  oldPrice: number;
  rating: number;
  store: string;
  category: string;
  description: string;
  /** Link direto do produto na loja. Vazio/ausente = busca automática pelo nome. */
  affiliateUrl?: string;
  /** Fundo do quadrado da imagem no card (visível em PNG transparente) */
  background?: SectionBackground;
  active: boolean;
};

export type ProductsSectionContent = {
  title: string;
  subtitle: string;
};

export type FlashDealItem = {
  id: string;
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  old: number;
  discount: number;
  /** Link direto na loja (opcional; vazio = usa o produto vinculado) */
  affiliateUrl?: string;
  background: SectionBackground;
};

export type FlashDealsContent = {
  title: string;
  subtitle: string;
  countdownSeconds: number;
  background: SectionBackground;
  items: FlashDealItem[];
};

export type CashbackCardItem = {
  id: string;
  title: string;
  desc: string;
  href: string;
  buttonText: string;
  background: SectionBackground;
};

export type PageStatItem = {
  id: string;
  value: string;
  label: string;
};

export type PageHeroContent = {
  badge: string;
  title: string;
  description: string;
  background: SectionBackground;
  stats: PageStatItem[];
};

export type HowItWorksStep = {
  id: string;
  step: string;
  title: string;
  desc: string;
};

/** Página /cashback — guia para economizar (sem carteira/saques). */
export type PageCashbackContent = {
  hero: PageHeroContent;
  howItWorksTitle: string;
  howItWorks: HowItWorksStep[];
  ctaText: string;
  metaTitle: string;
  metaDescription: string;
};

export type PageCouponItem = {
  id: string;
  code: string;
  store: string;
  discount: string;
  desc: string;
  expires: string;
  hot: boolean;
  /** Link direto na loja para usar o cupom */
  affiliateUrl?: string;
};

export type PageCuponsContent = {
  hero: PageHeroContent;
  listTitle: string;
  listSubtitle: string;
  coupons: PageCouponItem[];
  metaTitle: string;
  metaDescription: string;
};

export type PageMaisClicadosContent = {
  hero: PageHeroContent;
  listTitle: string;
  listSubtitle: string;
  metaTitle: string;
  metaDescription: string;
};

export type CashbackSectionContent = {
  title: string;
  subtitle: string;
  buttonText: string;
  cards: CashbackCardItem[];
};

export type FeaturedCouponItem = {
  id: string;
  code: string;
  discount: string;
  hot: boolean;
  /** Link direto na loja para usar o cupom */
  affiliateUrl?: string;
};

export type FeaturedCouponsContent = {
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
  items: FeaturedCouponItem[];
};

export type SidebarPromoContent = {
  label: string;
  title: string;
  linkText: string;
  linkHref: string;
  background: SectionBackground;
};

export type FooterContent = {
  description: string;
  copyright: string;
  tagline: string;
};

export type SectionId =
  | "hero-main"
  | "hero-cashback"
  | "hero-coupon"
  | "categories"
  | "stores"
  | "products-header"
  | "products"
  | "flash-deals"
  | "cashback"
  | "featured-coupons"
  | "sidebar-promo"
  | "footer"
  | "page-cashback"
  | "page-cupons"
  | "page-maisclicados";

export type SectionContentMap = {
  "hero-main": HeroMainContent;
  "hero-cashback": HeroSideCardContent;
  "hero-coupon": HeroSideCardContent;
  categories: CategoriesContent;
  stores: StoresContent;
  "products-header": ProductsSectionContent;
  products: { items: CmsProduct[] };
  "flash-deals": FlashDealsContent;
  cashback: CashbackSectionContent;
  "featured-coupons": FeaturedCouponsContent;
  "sidebar-promo": SidebarPromoContent;
  footer: FooterContent;
  "page-cashback": PageCashbackContent;
  "page-cupons": PageCuponsContent;
  "page-maisclicados": PageMaisClicadosContent;
};

export type SiteContent = {
  [K in SectionId]: SectionContentMap[K];
};

export type CmsContentResponse = {
  storeOnline: boolean;
  content: SiteContent;
};
