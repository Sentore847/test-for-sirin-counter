import type ITransport from "./ITransport";

const API_URL = import.meta.env.VITE_API_URL_HTTP;

export const httpTransport: ITransport = {
    async get() {
        const res = await fetch(`${API_URL}/counter`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        console.log("HTTP GET response:", data);
        return data.value.value;
    },
    async increment(amount = 1) {
        const res = await fetch(`${API_URL}/counter/increment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
        });
        const data = await res.json();
        console.log("HTTP INC response:", data);
        return data.value.value;
    },
    async decrement(amount = 1) {
        const res = await fetch(`${API_URL}/counter/decrement`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount }),
        });
        const data = await res.json();
        console.log("HTTP DEC response:", data);
        return data.value.value;
    },
};
