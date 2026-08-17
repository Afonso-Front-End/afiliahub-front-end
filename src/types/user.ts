export type PublicUser = {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
};

export type CashbackActivation = {
  storeName: string;
  active: boolean;
  activatedAt: string;
};

export type StoreApiConfig = {
  storeName: string;
  enabled: boolean;
  affiliateId: string;
  affiliateParam: string;
  apiKey: string;
  apiSecret: string;
  trackingParam: string;
  trackingPrefix: string;
  webhookSecret: string;
  notes: string;
  postbackUrl: string;
  updatedAt?: string;
};
