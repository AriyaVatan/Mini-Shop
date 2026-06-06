interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative group w-full">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <span className="text-slate-500">🔍</span>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-2xl border border-slate-800 bg-slate-900/50 py-4 pl-12 pr-4 text-white outline-none transition focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10"
      />
    </div>
  );
};

export default SearchBar;
