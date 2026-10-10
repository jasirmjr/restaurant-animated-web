import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { StorySection } from '../components/home/StorySection';
import { MenuShowcase } from '../components/home/MenuShowcase';
import { QualitySection } from '../components/home/QualitySection';
import { Testimonials } from '../components/home/Testimonials';

import { BurgerDissectionSection } from '../components/home/BurgerDissectionSection';

export const HomePage = () => {
  return (
    <div className="relative">
      {/* 1. Main Reference Hero Slider */}
      <HeroSection />

      {/* 2. Curated Chef's Selection Grid */}
      <MenuShowcase />

      {/* 3. Cinematic 4K Burger Dissection & Layer Breakdown */}
      <BurgerDissectionSection />

      {/* 4. Ingredient Quality & Benchmarks */}
      <QualitySection />

      
    </div>
  );
};
