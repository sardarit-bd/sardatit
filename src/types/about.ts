import React from "react";

export interface AboutValueItem {
  step: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface AboutFeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

export interface AboutAwardItem {
  platform: string;
  badge: string;
  desc: string;
  rating: string;
}
