
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/base-button';
import { ViewAnimation } from '@/providers/view-animation';
import { ArrowUpRightIcon } from 'lucide-react';
import { Video } from '@/components/ui/video';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import { projects } from '@/data/projects';
import { AvatarGroup, AvatarGroupTooltip } from '@/components/animate-ui/components/animate/avatar-group';
import { Badge } from './ui/base-badge';
import { GithubButton } from './ui/github-button';
import Link from 'next/link';

export const Currently = () => {
  return (
    <>
      {projects.map((project, index) => {
        const isMediaRight = index % 2 === 0; // Even index = media on right, odd index = media on left

        return (
          <Section key={project.id} className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {/* Text Content Section */}
            <div className={isMediaRight ? '' : 'sm:col-span-1 sm:order-2'}>
              <ViewAnimation
                className="flex h-full flex-col items-start justify-between gap-3 sm:gap-4 p-4 sm:p-6 lg:p-8"
                initial={{ opacity: 0, translateY: -8 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                <div className="flex flex-col gap-2">
                  <Badge variant={project.type === 'Personal Project' ? 'success' : 'info'} appearance="light" className="text-primary max-w-fit rounded-sm text-xs sm:text-sm">{project.type || `Project ${index + 1}`}</Badge>
                  <div className="prose-ui">
                    <h2 className="text-primary text-lg sm:text-xl lg:text-2xl">{project.name}</h2>
                    <h5 className="text-muted-foreground text-sm sm:text-base">{project.description}</h5>
                  </div>
                  <AvatarGroup>
                    {project.tech?.slice(0, 6).map((tech) => (
                      <Link key={tech.name} href={tech.url} target="_blank" rel="noreferrer noopener">
                      <Avatar key={tech.name} className="size-10 sm:size-12 border-3 border-background rounded-full overflow-hidden">
                        <AvatarImage src={`https://img.logo.dev/${tech.domain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}&size=175&format=png&retina=true`} />
                        <AvatarFallback className="text-xs">{tech.name.charAt(0)}</AvatarFallback>
                        <AvatarGroupTooltip className="flex flex-col gap-0.5 text-center">
                          <span className="text-xs sm:text-sm font-semibold">{tech.name}</span>
                        </AvatarGroupTooltip>
                      </Avatar>
                      </Link>
                    ))}
                  </AvatarGroup>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 w-full">
                {project.githubUrl && (
                  <GithubButton
                  initialStars={0}
                  targetStars={100}
                  label="Github Stars"
                  roundStars={true}
                  repoUrl={project.githubUrl}
                  variant="outline"
                  size="sm"
                  />
                )}
                {project.url && (
                <Button asChild variant="outline" size="sm" className="gap-1.5 sm:gap-2 font-mono w-full sm:w-auto">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    View Project
                    <ArrowUpRightIcon size={14} className="sm:w-4 sm:h-4" />
                  </a>
                </Button>
                )}
                </div>
              </ViewAnimation>
            </div>

            {/* Media Section */}
            <div className={`bg-dashed sm:col-span-2 ${isMediaRight ? '' : 'sm:order-1'}`}>
              <ViewAnimation
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                delay={0.4}
                className={`relative ${isMediaRight ? 'pt-6 sm:pt-8 pl-4 sm:pl-6 lg:pl-8' : 'pt-6 sm:pt-8 pr-4 sm:pr-6 lg:pr-8'}`}
              >
                <div className={`dashed-line-${isMediaRight ? 'top' : 'top'}`} />
                <div className={`dashed-line-${isMediaRight ? 'left' : 'right'}`} />
                {project.mediaType === 'video' ? (
                  <Video
                    className="w-full aspect-video rounded-tl-xl sm:rounded-tl-2xl border-t border-l"
                    src={project.mediaUrl as string}
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    controls={false}
                    playsInline={true}
                  />
                ) : (
                  <Image
                    src={project.mediaUrl as string}
                    alt={project.name}
                    width={800}
                    height={450}
                    className="w-full aspect-video object-cover rounded-tl-xl sm:rounded-tl-2xl border-t border-l"
                  />
                )}
              </ViewAnimation>
            </div>
          </Section>
        );
      })}
    </>
  );
};
