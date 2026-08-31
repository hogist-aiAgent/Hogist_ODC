// src/utils/razorpay.js
const RAZORPAY_SCRIPT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';

let scriptPromise = null;

export function loadRazorpayScript() {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_SRC;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

  return scriptPromise;
}

export async function openRazorpayCheckout({ payreq, prefill, onSuccess, onDismiss, onError }) {
  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

  if (!keyId) {
    onError?.(new Error('Missing VITE_RAZORPAY_KEY_ID — Razorpay Checkout cannot open without it.'));
    return;
  }

  const loaded = await loadRazorpayScript();
  if (!loaded || !window.Razorpay) {
    onError?.(new Error('Could not load Razorpay Checkout script.'));
    return;
  }

  const rzp = new window.Razorpay({
    key: keyId,
    amount: payreq.amount,
    currency: payreq.currency || 'INR',
    order_id: payreq.id,
    name: 'Hogist',
    description: 'ODC catering order',
    prefill: prefill || {},
    theme: { color: '#D6293E' },
    handler: (response) => onSuccess?.(response),
    modal: {
      ondismiss: () => onDismiss?.(),
    },
  });

  rzp.on('payment.failed', (response) => onError?.(response.error));
  rzp.open();
}

export default { loadRazorpayScript, openRazorpayCheckout };