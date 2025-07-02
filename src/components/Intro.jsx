// src/components/Intro.jsx


export default function Intro({ matchedShloka, visible }) {
  if (!visible || !matchedShloka) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 transition-opacity duration-500">
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg max-w-md w-[90%] transform animate-slide-in">
        <h2 className="text-orange-600 font-semibold mb-2 text-center font-body">
          ✨ A Thought from the Gita
        </h2>
        <p className="text-md font-sanskrit mb-1 text-center">
          {matchedShloka.sanskrit}
        </p>
        <p className="text-sm italic text-center">
          {matchedShloka.transliteration}
        </p>
        <p className="text-sm text-gray-700 text-center mt-2">
          {matchedShloka.translation}
        </p>
        <p className="text-xs text-orange-500 text-center mt-2">
          — Chapter {matchedShloka.chapter}, Verse {matchedShloka.verse}
        </p>
      </div>
    </div>
  );
}
