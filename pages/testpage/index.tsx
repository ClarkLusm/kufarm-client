import { useEffect } from "react";

declare global {
  interface Window {
    safePal: any;
  }
}

export default function TestPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      alert(window.safePal);
    }
  }, []);

  return (
    <div>
      <p>This is Test Page</p>
    </div>
  );
}
