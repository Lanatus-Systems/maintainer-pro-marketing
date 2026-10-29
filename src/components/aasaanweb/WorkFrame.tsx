"use client";

import { useEffect, useState } from "react";

// Same as the admin app's WorkPage: four same-origin live sites (each rendered at 1280px and
// never throttled off screen) exceed mobile Safari's per-tab memory, so phones get a picture.
const PHONE_QUERY = "(max-width: 980px)";

export function WorkFrame({
  name,
  src,
  alt,
  live,
  eager,
}: {
  name: string;
  src: string;
  alt?: string;
  live: string;
  eager: boolean;
}) {
  // null until mounted: the server HTML has the picture, so no iframe loads on a phone.
  const [isPhone, setIsPhone] = useState<boolean | null>(null);
  // The picture stays underneath until the live page has loaded, so the frame is never blank.
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const query = window.matchMedia(PHONE_QUERY);
    const onChange = () => setIsPhone(query.matches);
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return (
    <figure className="studio-study-frame">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt ?? `${name} website`} width={1024} height={580} loading={eager ? "eager" : "lazy"} />
      {isPhone === false ? (
        <iframe
          src={live}
          title={`${name} website`}
          loading={eager ? "eager" : "lazy"}
          className={loaded ? "is-loaded" : undefined}
          onLoad={() => setLoaded(true)}
        />
      ) : null}
    </figure>
  );
}
