"use client";

import TagChipsFilter from "./TagChipsFilter";
import SearchInput from "./SearchInput";

interface FilterBarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  searchPlaceholder?: string;
}

export default function FilterBar({
  searchValue,
  onSearchChange,
  tags,
  selectedTags,
  onTagToggle,
  searchPlaceholder = "Buscar...",
}: FilterBarProps) {
  return (
    <div className="mb-12 space-y-6">
      <SearchInput
        value={searchValue}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
      />
      <TagChipsFilter
        tags={tags}
        selectedTags={selectedTags}
        onTagToggle={onTagToggle}
      />
    </div>
  );
}
