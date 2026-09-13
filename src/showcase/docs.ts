import { mountChrome } from './chrome';
import { addCopyButtons } from './copy';

mountChrome().then(() => addCopyButtons());
