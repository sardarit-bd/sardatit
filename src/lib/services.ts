import { ServiceItem } from "@/types/service";
import { SERVICES_DATA } from "@/data/services";

export { SERVICES_DATA };

/**
 * Retrieve all active services.
 */
export function getAllServices(): ServiceItem[] {
  return SERVICES_DATA;
}

/**
 * Retrieve a specific service by its slug.
 */
export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES_DATA.find((service) => service.slug === slug);
}

/**
 * Helper to get adjacent services for navigation links.
 */
export function getAdjacentServices(currentSlug: string): {
  prev?: ServiceItem;
  next?: ServiceItem;
} {
  const index = SERVICES_DATA.findIndex((s) => s.slug === currentSlug);
  if (index === -1) return {};

  const prev = index > 0 ? SERVICES_DATA[index - 1] : SERVICES_DATA[SERVICES_DATA.length - 1];
  const next = index < SERVICES_DATA.length - 1 ? SERVICES_DATA[index + 1] : SERVICES_DATA[0];

  return { prev, next };
}
