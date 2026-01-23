interface EditorialShellProps {
  children: React.ReactNode;
}

export default function EditorialShell({ children }: EditorialShellProps) {
  return (
    <div data-editorial="briefing">
      <div className="editorial-container min-h-screen">
        {children}
      </div>
    </div>
  );
}
