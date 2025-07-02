import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import Intro from "../components/Intro.jsx";
import { getOpenAIResponse, classifyPrompt } from "../utils/openAI.js";
import Background from './Background.jsx';

export default function KrishnAI() {
  const [shlokas, setShlokas] = useState([]);
  const [matchedShloka, setMatchedShloka] = useState(null);
  const [introShloka, setIntroShloka] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const loadAllShlokas = async () => {
      const allChapters = await Promise.all(
        Array.from({ length: 18 }, (_, i) =>
          fetch(`/data/shlokas/ch${i + 1}.json`)
            .then(res => res.ok ? res.json() : [])
            .catch(() => [])
        )
      );

      const allShlokas = allChapters.flat();
      setShlokas(allShlokas);

      const randomIndex = Math.floor(Math.random() * allShlokas.length);
      setIntroShloka(allShlokas[randomIndex]);

      const timeoutId = setTimeout(() => {
        setShowPopup(false);
      }, 2000);

      // Click to close
      const dismissPopup = () => {
        setShowPopup(false);
        clearTimeout(timeoutId);
      };

      window.addEventListener("click", dismissPopup);

      return () => {
        window.removeEventListener("click", dismissPopup);
        clearTimeout(timeoutId);
      };
    };

    loadAllShlokas();
  }, []);


  async function handleSearch() {
    const cleanQuery = query.trim();

    if (!cleanQuery || cleanQuery.length < 3) {
      setMatchedShloka({
        sanskrit: "🧘‍♂️",
        transliteration: "",
        translation: "Please ask something meaningful, dear seeker 🙏",
        chapter: "-",
        verse: "-"
      });
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      const classification = await classifyPrompt(cleanQuery);

      if (!classification.valid) {
        setMatchedShloka({
          sanskrit: "🙏",
          transliteration: "",
          translation: classification.message || "⚠️ Not a valid spiritual question.",
          chapter: "-",
          verse: "-"
        });
        setLoading(false);
        return;
      }

      const keywords = classification.keywords.map(k => k.toLowerCase());
      let bestMatch = null;
      let maxMatches = 0;

      for (const shloka of shlokas) {
        const matchCount =
          (shloka.keywords || []).filter(keyword =>
            keywords.includes(keyword.toLowerCase())
          ).length +
          keywords.filter(kw =>
            shloka.translation?.toLowerCase().includes(kw)
          ).length;

        if (matchCount > maxMatches) {
          maxMatches = matchCount;
          bestMatch = shloka;
        }
      }

      if (!bestMatch) {
        bestMatch = shlokas.find(s => s.chapter == 2 && s.verse == 47);
      }

      const explainPrompt = `The user asked: "${cleanQuery}"\n\nA relevant Bhagavad Gita shloka is:\n"${bestMatch.translation}"\n\nGive a short, calm, spiritual explanation using this shloka.`;

      const explanation = await getOpenAIResponse(explainPrompt);

      setMatchedShloka({
        ...bestMatch,
        explanation
      });

    } catch (err) {
      console.error("❌ Error in search:", err);
      setMatchedShloka({
        sanskrit: "🙏",
        transliteration: "",
        translation: "⚠️ Something went wrong. Please try again.",
        chapter: "-",
        verse: "-"
      });
    }

    setLoading(false);
  }

  return (
    <>
      {showPopup && introShloka && (
        <Intro matchedShloka={introShloka} visible={showPopup} />
      )}

      <Background />
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
        <img src={logo} alt="KrishnAI Logo" className="h-48 mb-4" />
        <p className="text-md md:text-lg text-gray-700 italic mb-6 text-center">
          Your guide through the wisdom of the Bhagavad Gita
        </p>

        {/* Input Field */}
        <div className="flex flex-col sm:flex-row w-full max-w-xl gap-3 mb-8">
          <input
            type="text"
            placeholder="Ask KrishnAI..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 py-3 rounded-full border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm w-full"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="ml-2 px-6 py-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-md flex items-center justify-center min-w-[80px]"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            ) : (
              "Ask"
            )}
          </button>
        </div>

        {/* Result Display */}
        {loading ? (
          <div className="bg-white/70 animate-pulse p-6 rounded-xl max-w-xl w-full text-center border border-orange-200 shadow">
            <div className="h-6 bg-orange-200/50 rounded mb-3"></div>
            <div className="h-4 bg-orange-100/50 rounded w-2/3 mx-auto mb-2"></div>
            <div className="h-4 bg-orange-100/50 rounded w-3/4 mx-auto mb-1"></div>
            <div className="h-4 bg-orange-100/50 rounded w-1/4 mx-auto"></div>
          </div>
        ) : (
          matchedShloka && !showPopup && (
            <div
              key={`${matchedShloka.chapter}-${matchedShloka.verse}`}
              className="bg-white/80 p-5 sm:p-6 w-full max-w-xl text-center rounded-xl shadow border border-orange-200 transition-all duration-500 ease-in-out animate-fade"
            >
              <p className="text-lg sm:text-xl font-sanskrit mb-2">{matchedShloka.sanskrit}</p>
              <p className="text-sm italic font-body mb-1">{matchedShloka.transliteration}</p>
              <p className="text-sm text-gray-700 font-body mb-2">{matchedShloka.translation}</p>
              <p className="text-xs text-orange-500">
                — Chapter {matchedShloka.chapter}, Verse {matchedShloka.verse}
              </p>

              {matchedShloka.explanation && (
                <div className="mt-4 p-3 bg-orange-50 rounded-lg border text-sm">
                  <strong className="text-orange-700">🧘 Explanation:</strong><br />
                  {matchedShloka.explanation}
                </div>
              )}
            </div>
          )
        )}

        <footer className="mt-12 text-center text-xs text-orange-700 opacity-80">
          <div className="py-4">
            🕉️ Powered by the timeless wisdom of the <span className="font-semibold">Bhagavad Gita</span> • Built with ❤️ by <a href="https://github.com/Dev-aadi07/Geeta-Gpt" target="_blank" className="underline">Adarsh</a>
          </div>
        </footer>
      </div>
    </>
  );
}
