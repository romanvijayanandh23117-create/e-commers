import React from 'react';
import { Star, CheckCircle, Quote } from 'lucide-react';
import { SAMPLE_REVIEWS } from '../../data/mockData';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand uppercase tracking-wider bg-brand/10 px-3 py-1 rounded-full border border-brand/20">
            Real Customer Voices
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
            Trusted by 50,000+ Happy Shoppers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Read authentic, verified purchase reviews from buyers across Bengaluru, Mumbai, Delhi, and beyond.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAMPLE_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-card transition flex flex-col justify-between relative"
            >
              <div>
                {/* Rating & Verified Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    Verified Buyer
                  </span>
                </div>

                <Quote className="w-6 h-6 text-slate-200 mb-2" />

                <h4 className="text-xs font-bold text-slate-900 mb-1 leading-snug">
                  "{rev.title}"
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 mt-4 border-t border-slate-100">
                <img
                  src={rev.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=120'}
                  alt={rev.userName}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h5 className="text-xs font-bold text-slate-800">{rev.userName}</h5>
                  <span className="text-[10px] text-slate-400">{rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

