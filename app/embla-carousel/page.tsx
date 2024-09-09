import { EmblaOptionsType } from 'embla-carousel';
import EmblaCarousel from '@/components/carousel/embla-carousel/EmblaCarousel';

const OPTIONS: EmblaOptionsType = { align: 'start' };
const SLIDE_COUNT = 10;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function Page() {
  return (
    <div className="overflow-hidden bg-gray-300 py-20">
      <div className="container">
        <EmblaCarousel slides={SLIDES} options={OPTIONS} />
      </div>
    </div>
  );
}
