import { trackAffiliateClick } from "@/api/cashback";

export async function openTrackedAffiliateUrl(
  opts: {
    storeName: string;
    productName: string;
    productId?: string;
    url: string;
  },
  notify: (message: string) => void,
) {
  const baseUrl = opts.url.trim();
  if (!baseUrl || baseUrl === "#") {
    notify("Configure o link do produto no painel admin.");
    return;
  }

  try {
    const click = await trackAffiliateClick({
      storeName: opts.storeName,
      productName: opts.productName,
      productId: opts.productId,
      baseUrl,
    });
    window.open(click.redirectUrl, "_blank", "noopener,noreferrer");
    notify(
      click.trackingEnabled
        ? `Redirecionando para ${opts.storeName} com rastreio ativo…`
        : `Redirecionando para ${opts.storeName}…`,
    );
  } catch {
    window.open(baseUrl, "_blank", "noopener,noreferrer");
    notify(`Redirecionando para ${opts.storeName}…`);
  }
}
