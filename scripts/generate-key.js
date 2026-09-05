import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

const envPath = path.resolve(process.cwd(), '.env');
const secret = crypto.randomBytes(32).toString('hex');

if (fs.existsSync(envPath)) {
  let envContent = fs.readFileSync(envPath, 'utf8');

  if (envContent.includes('APP_KEY=')) {
    envContent = envContent.replace(/^APP_KEY=.*$/m, `APP_KEY=${secret}`);
  } else {
    envContent += `\nAPP_KEY=${secret}\n`;
  }

  fs.writeFileSync(envPath, envContent, 'utf8');
  console.log('APP_KEY successfully generated and added to .env file.');
} else {
  console.log('File .env not found.');
}
