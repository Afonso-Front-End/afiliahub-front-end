import type { StoreApiConfig } from "@/types/user";
import {
  StoreApiAffiliateFields,
  StoreApiCredentialFields,
  StoreApiWebhookFields,
} from "@/components/admin/StoreApiFieldGroups";

export function StoreApiCardFields({
  form,
  onChange,
}: {
  form: StoreApiConfig;
  onChange: (next: StoreApiConfig) => void;
}) {
  return (
    <>
      <StoreApiAffiliateFields form={form} onChange={onChange} />
      <StoreApiCredentialFields form={form} onChange={onChange} />
      <StoreApiWebhookFields form={form} onChange={onChange} />
    </>
  );
}
