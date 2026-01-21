import { RayCard } from '@/components/ray-card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
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
        <RayCard>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold text-foreground">
              Testing Header
            </h1>
            <p className="mt-2 text-foreground text-justify">
            Ready to take the next step? Don't let your big ideas wait. Join thousands of satisfied customers who are already building their dreams with our tools. Sign up today for a free 14-day trial to unlock all premium features, or schedule a personalized demo with one of our experts to see how we can tailor a solution just for you. Your journey to success starts now.
            </p>
          </div>
        </RayCard>
      </div>
    </main>
  );
}
