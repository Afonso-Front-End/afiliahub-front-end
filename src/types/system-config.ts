export type SafeSystemConfig = {
  siteDisplayName: string;
  supportEmail: string;
  publicSiteUrl: string;
  publicApiUrl: string;
  allowUserRegistration: boolean;
  requireEmailVerification: boolean;
};

export type SystemConfigView = SafeSystemConfig & {
  storeOnline: boolean;
  emailServiceConfigured: boolean;
  serverPublicApiUrl: string;
};
