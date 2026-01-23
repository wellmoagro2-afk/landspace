import Link from "next/link";
import { ChevronRight } from "lucide-react";
import {
  STRATEGY_LABEL,
  STRATEGY_EDITORIAL_SHORT,
  STRATEGY_BRIEFINGS_LABEL,
} from "@/lib/strategy/constants";

interface BriefingBreadcrumbsProps {
  title: string;
}

export default function BriefingBreadcrumbs({ title }: BriefingBreadcrumbsProps) {
  return (
    <nav className="mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-xs uppercase tracking-wider war-room-text">
        <li>
          <Link
            href="/strategy"
            className="editorial-link-hover no-underline war-room-text"
          >
            {STRATEGY_LABEL}
          </Link>
        </li>
        <li>
          <ChevronRight className="w-3 h-3 war-room-text" />
        </li>
        <li>
          <Link
            href="/strategy"
            className="editorial-link-hover no-underline war-room-text"
          >
            {STRATEGY_EDITORIAL_SHORT}
          </Link>
        </li>
        <li>
          <ChevronRight className="w-3 h-3 war-room-text" />
        </li>
        <li>
          <Link
            href="/strategy/briefings"
            className="editorial-link-hover no-underline war-room-text"
          >
            {STRATEGY_BRIEFINGS_LABEL}
          </Link>
        </li>
        <li>
          <ChevronRight className="w-3 h-3 war-room-text" />
        </li>
        <li className="truncate max-w-[200px] war-room-title" aria-current="page">
          {title}
        </li>
      </ol>
    </nav>
  );
}
