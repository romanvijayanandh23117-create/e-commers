import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { CategorySection } from '../components/home/CategorySection';
import { TabbedProducts } from '../components/home/TabbedProducts';
import { PromotionalBanners } from '../components/home/PromotionalBanners';
import { ValueProps } from '../components/home/ValueProps';
import { Testimonials } from '../components/home/Testimonials';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Value Propositions Strip */}
      <ValueProps />

      {/* 3. Product Categories */}
      <CategorySection />

      {/* 4. Tabbed Featured Collections (Bestsellers, New Arrivals, Deals) */}
      <TabbedProducts />

      {/* 5. Promotional Flash Deals & Split Banners */}
      <PromotionalBanners />

      {/* 6. Customer Testimonials */}
      <Testimonials />
    </div>
  );
};

