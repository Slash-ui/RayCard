import { LuminousBox } from '@/components/luminous-box';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const backgroundImage = PlaceHolderImages.find(
    (img) => img.id === 'background-1'
  );
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center p-4 antialiased">
      {backgroundImage && (
        <Image
          src={backgroundImage.imageUrl}
          alt={backgroundImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={backgroundImage.imageHint}
        />
      )}
      <div className="relative z-10 w-full max-w-md">
        <LuminousBox>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary/20 p-3 ring-1 ring-inset ring-primary/30">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Luminous Border
            </h1>
            <p className="mt-2 text-muted-foreground">
              Move your cursor around to see the light effect on the border.
            </p>
          </div>
        </LuminousBox>
      </div>
    </main>
  );
}
