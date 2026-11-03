import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones, Award, CreditCard } from 'lucide-react';

export const ValueProps: React.FC = () => {
  const values = [
    {
      icon: Truck,
      title: 'Free Express Shipping',
      description: 'On all orders with real-time live package tracking.',
    },
    {
      icon: ShieldCheck,
      title: '100% Authentic Quality',
      description: 'Brand-direct verified inventory with authentic warranty cards.',
    },
    {
      icon: RotateCcw,
      title: '7-Day Easy Returns',
      description: 'Zero questions asked doorstep exchange and swift refund processing.',
    },
    {
      icon: CreditCard,
      title: 'Secure Payment Options',
      description: 'Encrypted UPI, Cards, NetBanking, and Cash on Delivery supported.',
    },
    {
      icon: Award,
      title: 'Amazon SmartBiz Inspired',
      description: 'Reliable merchant infrastructure ensuring 99.9% order fulfillment.',
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support',
      description: 'Toll-free customer hotline and rapid WhatsApp assistance.',
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center p-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-brand flex items-center justify-center mb-3 shadow-2xs">
                  <Icon className="w-6 h-6 text-brand-dark" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">{val.title}</h4>
                <p className="text-[11px] text-slate-500 leading-tight">{val.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

