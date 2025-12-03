export function Llama({ className }: { className?: string }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M18 17a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2" />
        <path d="M14 15V9a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v6" />
        <path d="M6 15v-3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3" />
        <path d="M18 17a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4" />
        <circle cx="9.5" cy="12.5" r="0.5" fill="currentColor" />
        <circle cx="14.5" cy="12.5" r="0.5" fill="currentColor" />
      </svg>
    );
  }
  