"use client";

import EditorialActionsClient from "./EditorialActionsClient";

interface EditorialContentWrapperProps {
  briefing: {
    title: string;
    mapUrl?: string;
    mapDownloadUrl?: string;
    shareUrl?: string;
  };
}

export default function EditorialContentWrapper({
  briefing,
}: EditorialContentWrapperProps) {
  return (
    <EditorialActionsClient briefing={briefing} />
  );
}
