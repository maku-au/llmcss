/**
 * LLMCSS Component Registry Schema
 */

export type ComponentCategory = 'primitive' | 'marketing' | 'application' | 'ecommerce';
export type ComponentTier = 'free' | 'pro';

/**
 * A structural alternative to a component's default layout.
 *
 * Structural means the boxes move: split versus centered, media left versus
 * media top, sidebar versus topbar, one column versus two, dense versus
 * comfortable. A recolour, a radius change or a density change is NOT a
 * variant; those are data-ai-skin, data-ai-accent and data-ai-density.
 *
 * Addressed flat as `parent:variant`, for example `hero-split:centered`.
 */
export interface ComponentVariant {
  /** Unique within the parent. Lowercase, hyphenated. Addressed as `parent:id`. */
  id: string;
  /** Label for the segmented control in the catalog: "Centered", "Media top". */
  name: string;
  /** One line on what moved, not on how it looks. */
  description: string;
  /**
   * When to reach for this instead of the default, and when not to. A string,
   * never an object: placement, best use, what to avoid and what it pairs with
   * are written as sentences in that order.
   */
  guidance: string;
  html: string;
  /** Only when the variant needs custom element markup the default does not. */
  webComponentHtml?: string;
}

export interface ComponentDefinition {
  id: string;
  name: string;
  description: string;
  category: ComponentCategory;
  tier: ComponentTier;
  tags: string[];
  /** The default layout. */
  html: string;
  webComponentHtml?: string;
  css?: string;
  ts?: string;
  dependencies?: string[];
  /** Set when the demo's classes live in an opt-in addon stylesheet, not llmcss.css. */
  addon?: 'motion';
  /** Structural alternatives. Absent means this component has one layout. */
  variants?: ComponentVariant[];
}

export interface RegistryIndex {
  version: string;
  generatedAt: string;
  stats: {
    /** Components. A variant is not a component. */
    total: number;
    free: number;
    pro: number;
    /** Sum of variants.length across every component. */
    variants: number;
    categories: Record<ComponentCategory, number>;
  };
  components: ComponentDefinition[];
}

export interface TemplateGuidance {
  placement: string;
  bestUsedFor: string;
  avoidWhen: string;
  pairsWith: string[];
}

export type TemplateSectionCategory =
  | 'header'
  | 'hero'
  | 'features'
  | 'social-proof'
  | 'comparison'
  | 'pricing'
  | 'faq'
  | 'cta'
  | 'footer'
  | 'app-shell';

export type TemplateKind = 'wireframe' | 'themed';

export interface WireframeTemplate {
  id: string;
  name: string;
  section: TemplateSectionCategory;
  tier: ComponentTier;
  kind?: TemplateKind;
  skin?: string;
  tags: string[];
  placement: string;
  guidance: TemplateGuidance;
  html: string;
}

export interface PageBlueprint {
  id: string;
  name: string;
  description: string;
  recommendedFor: string;
  sections: string[];
  tier?: ComponentTier;
  kind?: TemplateKind;
  skin?: string;
}
