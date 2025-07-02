export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-yellow-100 to-orange-200">
      {/* Floating Om symbol */}
      <div className="absolute top-10 left-10 text-orange-500 text-7xl animate-slow-bounce select-none">
        🍂
      </div>
    </div>
  );
}
