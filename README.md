<<<<<<< HEAD
IN EARLY DEVELOPMENT.
=======
IN EARLY DEVELOPMENT. Still adding code example documentation, there are more componenets than listed below.
>>>>>>> b8412c4dc3dffdfe3f8df535d930c300d136df70

# About

This package allows you to easily add landscapes and shapes to your project that are in the theme of Battlezone, the retro video game!

[GitHub repository](https://github.com/brianmatzelle/battlezone-shapes)

## Quickstart/Code Examples:

### Starfield landscape demo:

![demo](https://github.com/brianmatzelle/battlezone-shapes/blob/main/demo/starfield-demo.gif?raw=true "Starfield Demo")

##### Next.js + Tailwind:

#### layout.tsx

```typescript
"use client";
import "./globals.css";
import { Starfield } from "battlezone-shapes"
import { Inconsolata } from 'next/font/google'

const font = Inconsolata({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} flex flex-col min-h-screen w-full`}>
        <Starfield className="fixed inset-0 -z-10"/>
        {children}
      </body>
    </html>
  );
}
```

## Todo

- [ ] Add documentation for the Star component
- [ ] Starfield component:

  - [ ] Add customization props
  - [ ] Implement occasional supernovas
- [ ] Create shapes

  - [ ] cube
  - [ ] pyramid
  - [ ] ?
