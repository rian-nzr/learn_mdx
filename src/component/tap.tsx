"use client";  // This must be at the top of the file

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string | null;
  level: string;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLHeadingElement>("h1, h2, h3"));
    const headingsData: Heading[] = elements.map((el) => ({
      id: el.id,
      text: el.textContent,
      level: el.tagName,
    }));
    setHeadings(headingsData);
  }, []);

  return (
    <nav>
      {/* <h2>On This Page</h2> */}
      <ul>
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{ marginLeft: heading.level === "H3" ? "1rem" : "0" }}
          >
            <a href={`#${heading.id}`}>{heading.text}k</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
