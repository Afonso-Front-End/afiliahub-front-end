import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { StoreApiAffiliateFields, StoreApiCredentialFields, StoreApiWebhookFields, } from "@/components/admin/StoreApiFieldGroups";
export function StoreApiCardFields({ form, onChange, }) {
    return (_jsxs(_Fragment, { children: [_jsx(StoreApiAffiliateFields, { form: form, onChange: onChange }), _jsx(StoreApiCredentialFields, { form: form, onChange: onChange }), _jsx(StoreApiWebhookFields, { form: form, onChange: onChange })] }));
}
