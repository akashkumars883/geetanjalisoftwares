export const automixaPlans = [
  {
    id: "starter",
    name: "Starter",
    price: 4999,
    billing: "monthly",
    description: "For creators and small brands that want a clean Instagram automation setup.",
    features: [
      "Meta / Instagram integration",
      "Basic auto-like rules",
      "Comment reply automation",
      "Daily usage tracking",
      "1 account connection",
    ],
    limits: {
      daily_limit: 250,
      max_accounts: 1,
    },
    featureFlags: {
      integration: true,
      auto_like: true,
      influencer: false,
      dm_automation: true,
      comment_reply: true,
      scheduling: false,
      advanced_analytics: false,
      priority_support: false,
    },
  },
  {
    id: "growth",
    name: "Growth",
    price: 9999,
    billing: "monthly",
    description: "For businesses that want lead generation, DM flows, and growth automation.",
    features: [
      "Everything in Starter",
      "Influencer outreach workflows",
      "Lead qualification in DMs",
      "Smart scheduling windows",
      "Advanced automation analytics",
    ],
    limits: {
      daily_limit: 1000,
      max_accounts: 3,
    },
    featureFlags: {
      integration: true,
      auto_like: true,
      influencer: true,
      dm_automation: true,
      comment_reply: true,
      scheduling: true,
      advanced_analytics: true,
      priority_support: false,
    },
  },
  {
    id: "pro",
    name: "Pro",
    price: 19999,
    billing: "monthly",
    description: "For agencies and fast-growing brands that need the full automation stack.",
    features: [
      "Everything in Growth",
      "Multi-account automation",
      "Priority onboarding",
      "Custom knowledge base",
      "White-glove support",
    ],
    limits: {
      daily_limit: 5000,
      max_accounts: 10,
    },
    featureFlags: {
      integration: true,
      auto_like: true,
      influencer: true,
      dm_automation: true,
      comment_reply: true,
      scheduling: true,
      advanced_analytics: true,
      priority_support: true,
    },
  },
];

export function getAutomixaPlan(planId = "starter") {
  return automixaPlans.find((plan) => plan.id === planId) || automixaPlans[0];
}

export function normalizePromoCode(code) {
  return (code || "").trim().toUpperCase();
}

export function applyDiscount(price, promo) {
  if (!promo) {
    return {
      basePrice: price,
      discountAmount: 0,
      finalPrice: price,
    };
  }

  const discountAmount =
    promo.discount_type === "fixed"
      ? Number(promo.discount_value || 0)
      : Math.round((price * Number(promo.discount_value || 0)) / 100);

  const finalPrice = Math.max(0, price - discountAmount);

  return {
    basePrice: price,
    discountAmount,
    finalPrice,
  };
}

export function getEnabledFeatures(plan, promo = null) {
  const featureSet = new Set([
    ...plan.features,
    ...(promo?.feature_unlocks || []).map((feature) => feature),
  ]);

  return Array.from(featureSet);
}

export function getPlanQuote(planId, promo = null) {
  const plan = getAutomixaPlan(planId);
  const pricing = applyDiscount(plan.price, promo);

  return {
    plan,
    pricing,
    enabledFeatures: getEnabledFeatures(plan, promo),
  };
}
