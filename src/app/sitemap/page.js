import fs from 'fs';
import path from 'path';
import SitemapTree from '@/components/SitemapTree';

// Helper to determine if a directory should be ignored
const shouldIgnore = (name) => {
  const ignoreList = ['api', 'components', 'styles', 'lib', 'utils', 'hooks', 'constants', 'types', 'assets', 'favicon.ico', '.DS_Store'];
  return name.startsWith('_') || name.startsWith('.') || ignoreList.includes(name);
};

// Recursive function to walk the directory
const buildFileTree = (dir, baseRoute = '') => {
  const name = path.basename(dir);
  
  let stats;
  try {
      stats = fs.statSync(dir);
  } catch(e) {
      return null;
  }

  if (!stats.isDirectory()) {
      return null;
  }

  const items = fs.readdirSync(dir);
  const children = [];
  let hasPage = false;

  // First pass: check for page.js/page.jsx to see if this is a route
  if (items.includes('page.js') || items.includes('page.jsx') || items.includes('page.tsx')) {
      hasPage = true;
  }

  for (const item of items) {
    if (shouldIgnore(item)) continue;
    
    const fullPath = path.join(dir, item);
    const itemStats = fs.statSync(fullPath);

    if (itemStats.isDirectory()) {
      const childNode = buildFileTree(fullPath, `${baseRoute}/${item}`);
      if (childNode) {
        children.push(childNode);
      }
    }
  }
  
  const isRoot = baseRoute === '';
  
  // Show if it has a page OR has children
  if (!hasPage && children.length === 0 && !isRoot) {
      return null;
  }

  return {
    name: isRoot ? 'src' : name, // Changing root to 'src' or 'root' based on preference, 'src' feels truer to file structure
    type: 'folder',
    path: hasPage ? (isRoot ? '/' : baseRoute) : null,
    children: children.sort((a, b) => a.name.localeCompare(b.name))
  };
};

export const metadata = {
  title: 'Sitemap',
  description: 'Project file structure.',
};

export default function SitemapPage() {
  const appDir = path.join(process.cwd(), 'src', 'app');
  const tree = buildFileTree(appDir);

  return (
    <main className="min-h-screen w-full bg-black text-white p-4 pt-32 flex flex-col items-center">
       <div className="max-w-4xl w-full">
            <h1 className="text-3xl font-bold mb-8 tracking-tighter">Index of /</h1>
            <SitemapTree tree={tree} />
       </div>
    </main>
  );
}
