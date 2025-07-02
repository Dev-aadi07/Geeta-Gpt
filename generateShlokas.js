import { mkdirSync, writeFileSync } from 'fs';
const totalVerses = [47,72,43,42,29,47,30,28,34,42,55,20,35,27,20,24,28,78];
                    //1,2 ,3, 4, 5, 6, 7, 8, 9, 10,11,12,13,14,15,16,17,18
for (let ch = 1; ch <= 18; ch++) {
  const versesCount = totalVerses[ch - 1];
  const shlokas = [];

  for (let v = 1; v <= versesCount; v++) {
    shlokas.push({
      chapter: ch,
      verse: v,
      sanskrit: "",
      transliteration: "",
      translation: "",
      keywords: []
    });
  }

  const path = `public/data/shlokas/ch${ch}.json`;
  mkdirSync(`public/data/shlokas`, { recursive: true });
  writeFileSync(path, JSON.stringify(shlokas, null, 2));

  console.log(`Generated ${path} with ${versesCount} empty entries.`);
}
