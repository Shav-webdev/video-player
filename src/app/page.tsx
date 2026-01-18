import { VideoPlayer } from '@/components/VideoPlayer/VideoPlayer';
import { testVideoData } from '@/utils/data/video';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-8 items-center justify-center p-4 overflow-x-hidden">
      <h1 className="text-black text-4xl font-bold text-center">
        Custom Video Player
      </h1>
      <VideoPlayer data={testVideoData} />
    </div>
  );
}
