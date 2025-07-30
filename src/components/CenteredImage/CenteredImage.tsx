import Image from 'next/image';

interface CenteredImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function CenteredImage({ src, alt, width, height }: CenteredImageProps) {
  return (
    <div style={{ textAlign: 'center', margin: '30px 0' }}>
      <Image 
        src={src} 
        alt={alt}
        width={width} 
        height={height} 
        unoptimized={true}
      />
    </div>
  );
}