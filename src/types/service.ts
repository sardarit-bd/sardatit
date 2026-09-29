export interface ServiceFeature {
  title: string;
  description?: string;
}

export type HighlightItem = ServiceFeature;

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export type ProcessStep = ServiceProcessStep;

export interface ServiceStat {
  label: string;
  value: string;
}

export interface ServiceItem {
  id: string | number;
  slug: string;
  title: string;
  label?: string;
  shortTitle?: string;
  description: string;
  detailedDescription?: string;
  features: string[] | ServiceFeature[];
  deliverables?: string[];
  image: string;
  fallbackImage: string;
  imageSrc?: string;
  href?: string;
  bgClass?: string;
  color?: string;
  isBtnWhite?: boolean;
  bthIsWhite?: boolean; // Backwards compatibility
  badgeTitle?: string;
  stats?: ServiceStat[];
  processSteps?: ServiceProcessStep[];
}

export interface ServiceSplitViewProps {
  services?: ServiceItem[];
  activeMode?: "hover" | "click";
  className?: string;
  initialServiceId?: string | number;
  onServiceSelect?: (service: ServiceItem) => void;
  showCta?: boolean;
}
