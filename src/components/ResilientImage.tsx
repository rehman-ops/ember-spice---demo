import React, { useState } from 'react';
import { Flame } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  priority?: boolean;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  objectPosition = 'center center',
  priority = false,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#1D1B18] via-[#151412] to-[#261D17] text-[#C5A059] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Flame className="w-8 h-8 text-[#D95326] mb-2 opacity-80" />
        <span className="font-display text-sm tracking-wide text-[#FAF7F2]/80 max-w-[20ch]">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
      style={{ objectPosition }}
      className={className}
    />
  );
};
