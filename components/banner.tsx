
import { Section } from '@/components/Section';
import { ViewAnimation } from '@/providers/view-animation';
import Marquee3D from '@/components/marquee/3d';

export const Banner = () => {
  return (
    <Section className="col-span-full">
      <ViewAnimation
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        delay={0.4}
        className="relative pt-8 px-8"
      >
        <div className="w-full rounded-tl-2xl border-t border-l overflow-hidden">
          <Marquee3D />
        </div>
      </ViewAnimation>
    </Section>
  );
};
