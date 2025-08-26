import type ITransport from "./ITransport";

const WS_URL = import.meta.env.VITE_API_URL_WS;

export const wsTransport = (): ITransport => {
    const socket = new WebSocket(WS_URL);
    let latestValue = 0;
    let isConnected = false;
    const subscribers: ((value: number) => void)[] = [];
    const pendingMessages: string[] = [];

    socket.onopen = () => {
        console.log('WebSocket connected');
        isConnected = true;
        while (pendingMessages.length > 0) {
            const message = pendingMessages.shift();
            if (message) socket.send(message);
        }
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log('WebSocket received:', data);
        if (data.value !== undefined) {
            latestValue = data.value;
            subscribers.forEach(cb => cb(latestValue));
        }
    };

    socket.onclose = (event) => {
        console.log('WebSocket closed:', event.code, event.reason);
        isConnected = false;
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        isConnected = false;
    };

    const sendMessage = (message: string) => {
        if (isConnected && socket.readyState === WebSocket.OPEN) {
            socket.send(message);
        } else if (socket.readyState === WebSocket.CONNECTING) {
            pendingMessages.push(message);
        } else {
            console.error('WebSocket is not connected');
        }
    };

    return {
        get: async () => {
            sendMessage(JSON.stringify({ type: "get" }));
            return latestValue;
        },
        increment: async () => {
            sendMessage(JSON.stringify({ type: "inc" }));
            return latestValue + 1;
        },
        decrement: async () => {
            sendMessage(JSON.stringify({ type: "dec" }));
            return latestValue - 1;
        },
        subscribe: (cb) => {
            subscribers.push(cb);
            return () => {
                const index = subscribers.indexOf(cb);
                if (index > -1) subscribers.splice(index, 1);
            };
        }
    };
};
