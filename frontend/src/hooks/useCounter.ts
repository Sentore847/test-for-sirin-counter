import { useState, useEffect } from "react";
import type ITransport from "@transport/ITransport";

export function useCounter(transport: ITransport) {
    const [value, setValue] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    const updateValue = (newValue: number) => {
        setValue(newValue);
        sessionStorage.setItem('counter_value', newValue.toString());
    };

    useEffect(() => {
        let cancelled = false;

        transport.get()
            .then(result => {
                if (!cancelled && typeof result === "number") {
                    updateValue(result);
                }
            })
            .catch(error => {
                console.error("Error in transport.get():", error);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [transport]);

    const inc = async () => {
        try {
            const newValue = await transport.increment();
            if (typeof newValue === "number") {
                updateValue(newValue);
            }
        } catch (error) {
            console.error("Error in transport.increment():", error);
        }
    };

    const dec = async () => {
        try {
            const newValue = await transport.decrement();
            if (typeof newValue === "number") {
                updateValue(newValue);
            }
        } catch (error) {
            console.error("Error in transport.decrement():", error);
        }
    };

    return { value, inc, dec, loading };
}
