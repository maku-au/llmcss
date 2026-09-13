/**
 * LLMCSS Component Registry Schema
 */

export type ComponentCategory = 'primitive' | 'marketing' | 'application' | 'ecommerce';
export type ComponentTier = 'free' | 'pro';

export interface ComponentDefinition {
  id: string;
  name: string;
  description: string;
  category: ComponentCategory;
  tier: ComponentTier;
  tags: string[];
  html: string;
  webComponentHtml?: string;
  css?: string;
  ts?: string;
  dependencies?: string[];
}

export interface RegistryIndex {
  version: string;
  generatedAt: string;
  stats: {
    total: number;
    free: number;
    pro: number;
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
