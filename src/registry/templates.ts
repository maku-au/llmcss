import { WireframeTemplate, PageBlueprint } from './schema';
import {
  wireframeTemplates as rawTemplates,
  pageBlueprints as rawBlueprints,
  assembleBlueprintHtml as rawAssemble
} from './templates-data.mjs';

export const wireframeTemplates: WireframeTemplate[] = rawTemplates as WireframeTemplate[];
export const pageBlueprints: PageBlueprint[] = rawBlueprints as PageBlueprint[];
export const assembleBlueprintHtml = rawAssemble as (blueprintId: string) => string | null;
