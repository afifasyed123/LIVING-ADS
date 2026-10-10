const fs = require('fs');

const indexPath = 'C:/Users/AFIFA SYED/.gemini/antigravity-ide/scratch/livingads-clone/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const regex = /\/\/ ---- signing in and out [\s\S]*?F\.on\('POST', \/^\/api\/\(auth\/\)\?logout\$\/, \(\) => \{ auth\.signedIn = false; return \{ ok: true \}; \}\);/;

const newAuthSnippet = `// ---- signing in and out (universal mock support) --------------------------------
  const auth = (F.auth = { signedIn: true });
  const defaultSession = F.recorded('GET /api/auth/session') || {
    authenticated: true,
    user: { id: '1', email: 'asha@northwind.example', name: 'Asha' },
    organizations: [{ id: 'fa35c642-b8cb-47ef-94d4-86093f3f5975', name: 'Northwind Coffee Co.', slug: 'northwind', role: 'owner' }],
    selected_workspace: { id: '4dcf67d9-ccc5-4f81-85d0-2a8621d07b2d', organization_id: 'fa35c642-b8cb-47ef-94d4-86093f3f5975', name: 'Northwind Coffee Co.', slug: 'test' },
    selected_connections: {},
    selected_product: { id: 'b2a81416-0474-4913-a3aa-fff8a24ddc6', name: 'Northwind Coffee', status: 'active' }
  };

  F.on('GET', /^\\/api\\/(auth\\/)?session$/, () => defaultSession);
  F.on('POST', /^\\/api\\/(auth\\/)?(login|signup|register|create-account|signin|accounts|users).*$/, () => {
    auth.signedIn = true;
    return defaultSession;
  });
  F.on('POST', /^\\/api\\/(auth\\/)?logout$/, () => {
    auth.signedIn = false;
    return { ok: true };
  });`;

if (regex.test(html)) {
  html = html.replace(regex, newAuthSnippet);
  fs.writeFileSync(indexPath, html);
  console.log('Successfully updated auth handler in index.html via regex!');
} else {
  console.log('Regex did not match.');
}
