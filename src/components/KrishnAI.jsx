import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import Intro from "../components/Intro.jsx";


export default function KrishnAI() {
  const [shlokas, setShlokas] = useState([]);
  const [matchedShloka, setMatchedShloka] = useState(null);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [showPopup, setShowPopup] = useState(true);




  // Load the JSON
useEffect(() => {
  const loadAllShlokas = async () => {
    const allChapters = await Promise.all(
      Array.from({ length: 18 }, (_, i) =>
        fetch(`/data/shlokas/ch${i + 1}.json`).then(res => res.json())
      )
    );
    const allShlokas = allChapters.flat();
    setShlokas(allShlokas);

    // ⏳ Show intro popup for 2 seconds
    const randomIndex = Math.floor(Math.random() * allShlokas.length);
    setMatchedShloka(allShlokas[randomIndex]); 

    setTimeout(() => {
      setShowPopup(false);
      setMatchedShloka(null); 
    }, 2000);
  };

  loadAllShlokas();
  }, []);



  return (
    <>
    <Intro matchedShloka={matchedShloka} visible={showPopup} />


    <div className=" min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-200 px-4 py-10">

      {/* <h1 className="text-3xl md:text-5xl font-bold text-orange-600 mb-4 text-center">KrishnAI</h1> */}
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
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow w-full sm:w-auto"
          onClick={handleSearch}
        >
          Ask
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
            <p className="text-sm italic mb-1">{matchedShloka.transliteration}</p>
            <p className="text-sm text-gray-700 mb-2">{matchedShloka.translation}</p>
            <p className="text-xs text-orange-500">
              — Chapter {matchedShloka.chapter}, Verse {matchedShloka.verse}
            </p>
          </div>
          )
        )
      }


    </div>
    </>
  );

  // Search Logic (Next step we'll write)
  function handleSearch() {
    const cleanQuery = query.trim().toLowerCase();

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

    if (loading) return; // block multiple submissions

    setLoading(true);

    const words = cleanQuery.split(/\s+/).map(w => w.toLowerCase().replace(/[^a-z]/g, '').replace(/(ing|ed|s)$/g, ''));

    let bestMatch = null;
    let maxMatches = 0;

    for (const shloka of shlokas) {
      const matchCount = (shloka.keywords||[]).filter(keyword =>
        words.includes(keyword.toLowerCase())
      ).length;

      if (matchCount > maxMatches) {
        maxMatches = matchCount;
        bestMatch = shloka;
      }
    }

    setTimeout(() => {
      setMatchedShloka(
        bestMatch || {
          sanskrit: "🙏",
          transliteration: "",
          translation: "KrishnAI couldn't find a match for your query. Try using simple words like 'fear', 'anger', 'duty', etc.",
          chapter: "-",
          verse: "-"
        }
      );
      setLoading(false);
    }, 700);
  }


}
