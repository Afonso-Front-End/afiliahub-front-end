import { useState } from "react";
export function useAuthCredentials() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return { email, setEmail, password, setPassword };
}
