IN EARLY DEVELOPMENT.

## Code Examples:

### Next.js + Tailwind:

#### StarfieldWrapper.tsx

```
"use client";
import { Starfield } from "battlezone-shapes"

export default function StarfieldWrapper() {
	return <div className="fixed inset-0 -z-10">
		<Starfield />
	</div>
}

```

#### layout.tsx

```typescript
import type { Metadata } from "next";
import "./globals.css";
import StarfieldWrapper from "@/components/StarfieldWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen w-full`}>
        <StarfieldWrapper />
        {children}
      </body>
    </html>
  );
}
```
