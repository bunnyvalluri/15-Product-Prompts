import { useState } from 'react';
import { Check, Zap, Sparkles, Shield, Star } from 'lucide-react';
import pricingData from '../data/pricing.json';
import { Badge } from '../components/common/Badge';
import { useToast } from '../context/ToastContext';

export function Pricing() {
  const { addToast } = useToast();
  const [annualBilling, setAnnualBilling] = useState(true);

  const handleSelectTier = (tier) => {
    addToast(`Selected ${tier.name} plan! (Display Only - No Backend Required)`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <Badge variant="cyan">Transparent Plans</Badge>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          Simple, Transparent Pricing For Power Prompt Engineers
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Everything is stored client-side in LocalStorage. Pick a plan for display & feature tier overview.
        </p>

        {/* Annual Toggle Switch */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <span className={`text-xs font-semibold ${!annualBilling ? 'text-cyan-500' : 'text-slate-400'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setAnnualBilling(!annualBilling)}
            className="w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-800 p-1 relative transition-colors focus:outline-none"
          >
            <div
              className={`w-4 h-4 rounded-full bg-cyan-500 transition-transform ${
                annualBilling ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs font-semibold flex items-center gap-1.5 ${annualBilling ? 'text-cyan-500' : 'text-slate-400'}`}>
            Annual Billing
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
              Save 25%
            </span>
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {pricingData.map((tier) => {
          const price = annualBilling ? tier.priceYearly : tier.priceMonthly;
          return (
            <div
              key={tier.id}
              className={`relative flex flex-col justify-between glass-panel rounded-3xl p-8 border transition-all ${
                tier.popular
                  ? 'border-cyan-500 shadow-2xl shadow-cyan-500/15 scale-105 z-10'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tier.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{tier.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
                    {price}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">/{tier.period}</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleSelectTier(tier)}
                  className={`w-full py-3 rounded-xl text-xs font-bold transition-all ${
                    tier.popular
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                      : 'bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-300 dark:border-slate-800'
                  }`}
                >
                  {tier.ctaText}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
