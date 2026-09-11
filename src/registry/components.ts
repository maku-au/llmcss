import { ComponentDefinition } from './schema';
import { components as rawComponents } from './data.mjs';

export const components: ComponentDefinition[] = rawComponents as ComponentDefinition[];
