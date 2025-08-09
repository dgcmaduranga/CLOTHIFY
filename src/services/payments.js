// src/services/payments.js
// Very small fake gateway. In production use Stripe/Razorpay/PayHere, etc.

const TEST_MAP = {
  "4111111111111111": { ok: true,  code: "APPROVED" },        // Visa - success
  "4000000000000002": { ok: false, code: "DECLINED" },        // decline
  "4000000000009995": { ok: false, code: "INSUFFICIENT_FUNDS" },
  "4242424242424242": { ok: true,  code: "APPROVED" },        // common Stripe test
};

function luhnOk(num) {
  // Basic Luhn check for realism
  const s = (num || "").replace(/\s|-/g, "");
  if (!s) return false;
  let sum = 0, dbl = false;
  for (let i = s.length - 1; i >= 0; i--) {
    let d = parseInt(s[i], 10);
    if (dbl) { d *= 2; if (d > 9) d -= 9; }
    sum += d; dbl = !dbl;
  }
  return sum % 10 === 0;
}

/**
 * Simulate payment
 * @param {object} p  {number, exp, cvc, amount}
 * Resolves: { ok:true, transactionId, code }
 * Rejects:  { ok:false, code }
 */
export function chargeCard(p) {
  return new Promise((resolve, reject) => {
    const number = (p.number || "").replace(/\s|-/g, "");
    // Hard-coded outcomes first
    if (TEST_MAP[number]) {
      const r = TEST_MAP[number];
      return setTimeout(() => {
        r.ok ? resolve({
          ok: true,
          transactionId: "txn_" + Math.random().toString(36).slice(2,10),
          code: r.code
        }) : reject({ ok:false, code: r.code });
      }, 800);
    }

    // Otherwise, use Luhn as a generic success/fail
    if (!luhnOk(number)) {
      return setTimeout(() => reject({ ok:false, code:"INVALID_CARD" }), 600);
    }
    if (!/^\d{2}\/\d{2}$/.test(p.exp || "")) {
      return setTimeout(() => reject({ ok:false, code:"INVALID_EXP" }), 600);
    }
    if (!/^\d{3,4}$/.test(p.cvc || "")) {
      return setTimeout(() => reject({ ok:false, code:"INVALID_CVC" }), 600);
    }

    // Success
    setTimeout(() => {
      resolve({
        ok: true,
        transactionId: "txn_" + Math.random().toString(36).slice(2,10),
        code: "APPROVED"
      });
    }, 800);
  });
}
export const TEST_CARDS = [
  { number:"4111 1111 1111 1111", label:"Visa (success)" },
  { number:"4242 4242 4242 4242", label:"Visa (success)" },
  { number:"4000 0000 0000 0002", label:"Declined" },
  { number:"4000 0000 0000 9995", label:"Insufficient funds" }
];