import type { JSX } from "react";

export default function PlaygroundSkeleton(): JSX.Element {
  return (
    <div className="font-cardwrap">
      <div className="font-card row skeleton">
        <div className="skeleton-title"></div>
        <div className="font">
          <span className="skeleton-text"></span>
          <span className="skeleton-text"></span>
          <span className="skeleton-text"></span>
          <span className="skeleton-text"></span>
        </div>
      </div>
    </div>
  );
}

