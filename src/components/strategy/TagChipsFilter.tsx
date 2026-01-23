"use client";

interface TagChipsFilterProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  showAll?: boolean;
  allLabel?: string;
}

export default function TagChipsFilter({
  tags,
  selectedTags,
  onTagToggle,
  showAll = true,
  allLabel = "Todos",
}: TagChipsFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {showAll && (
        <button
          onClick={() => onTagToggle("all")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            selectedTags.length === 0 || selectedTags.includes("all")
              ? "bg-[rgba(0,184,107,0.16)] border border-[#00B86B]/50 text-[#00B86B]"
              : "bg-[#070B14]/60 border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.66)] hover:border-[#00B86B]/30"
          }`}
        >
          {allLabel}
        </button>
      )}
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isSelected
                ? "bg-[rgba(0,184,107,0.16)] border border-[#00B86B]/50 text-[#00B86B]"
                : "bg-[#070B14]/60 border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.66)] hover:border-[#00B86B]/30"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
