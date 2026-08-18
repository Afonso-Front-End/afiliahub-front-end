import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
const authInputClass = "w-full rounded-xl border border-border px-3 py-2.5 text-sm";
export function AuthEmailPasswordFields({ email, password, onEmailChange, onPasswordChange, passwordMinLength, }) {
    return (_jsxs(_Fragment, { children: [_jsxs("label", { className: "text-xs space-y-1 block", children: ["E-mail", _jsx("input", { type: "email", value: email, onChange: (e) => onEmailChange(e.target.value), className: authInputClass, required: true })] }), _jsxs("label", { className: "text-xs space-y-1 block", children: ["Senha", _jsx("input", { type: "password", value: password, onChange: (e) => onPasswordChange(e.target.value), minLength: passwordMinLength, className: authInputClass, required: true })] })] }));
}
export function AuthSubmitButton({ loading, loadingLabel, label, }) {
    return (_jsx("button", { type: "submit", disabled: loading, className: "w-full bg-foreground text-background rounded-2xl py-3 text-sm font-semibold hover:bg-primary transition-colors disabled:opacity-60", children: loading ? loadingLabel : label }));
}
