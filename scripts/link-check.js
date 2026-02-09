import fs from 'fs';
import path from 'path';
import YAML from 'yaml';

const CONTENT_DIR = path.resolve('src/content/groups');

async function checkUrl(url) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const response = await fetch(url, { method: 'HEAD', signal: controller.signal });
    clearTimeout(timeoutId);
    return response.ok;
  } catch (e) {
    return false;
  }
}

async function main() {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
  let hasError = false;

  for (const file of files) {
    console.log(`Checking ${file}...`);
    const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const data = YAML.parse(content);
    
    if (data.items) {
      for (const item of data.items) {
        if (item.url) {
          const isOk = await checkUrl(item.url);
          if (!isOk) {
            console.error(`❌ [FAIL] ${item.name}: ${item.url}`);
            hasError = true;
          } else {
            console.log(`✅ [OK] ${item.name}`);
          }
        }
      }
    }
  }

  if (hasError) {
    process.exit(1);
  }
}

main();
