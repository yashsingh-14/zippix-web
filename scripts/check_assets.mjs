import fs from 'fs';

const html = fs.readFileSync('scripts/debug_output/cloned_callofjesus.html', 'utf-8');
const scriptMatches = [...html.matchAll(/<script[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Total scripts:', scriptMatches.length);
console.log('Relative scripts:', scriptMatches.filter(s => !s.startsWith('http') && !s.startsWith('//') && !s.startsWith('data:')));

const linkMatches = [...html.matchAll(/<link[^>]+href=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Total links:', linkMatches.length);
console.log('Relative links:', linkMatches.filter(l => !l.startsWith('http') && !l.startsWith('//') && !l.startsWith('data:')));

const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map(m => m[1]);
console.log('Total images:', imgMatches.length);
console.log('Relative images:', imgMatches.filter(i => !i.startsWith('http') && !i.startsWith('//') && !i.startsWith('data:')));
