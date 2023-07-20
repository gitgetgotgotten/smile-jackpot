import {describe, test, expect} from 'vitest';
import path from 'path';
import fs from 'fs';

describe('SlotBlock', () => {
  test('all SVGs should exist', () => {
    const icons = [
      'arrow-down', 'cherry', 'lemon',
      'orange', 'spinner', 'watermelon',
    ];
    for (let i = 0; i < icons.length; i++) {
      const relativeFilePath = `../../../src/assets/icons/${icons[i]}.svg`;
      const scriptUrl = new URL(import.meta.url);
      const scriptDir = path.dirname(scriptUrl.pathname.slice(1));
      const absoluteFilePath = path.resolve(scriptDir, relativeFilePath);
      const fileExists = fs.existsSync(absoluteFilePath);

      if (!fileExists) {
        expect(true).toBe(false);
      }
    }
  });
});