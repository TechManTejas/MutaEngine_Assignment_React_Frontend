export interface RazorpayOptions {
    key: string;
    amount?: string;
    currency?: string;
    name?: string;
    description?: string;
    image?: string;
    order_id: string;
    handler: (response: any) => void;
    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };
    notes?: {
        [key: string]: string;
    };
    theme?: {
        color?: string;
    };
}

export interface Razorpay {
    open: () => void;
}

export declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => Razorpay;
    }
}