
import { Section } from '@/components/Section';
import { Button } from '@/components/ui/base-button';
import { ViewAnimation } from '@/providers/view-animation';
import { ArrowUpRightIcon } from 'lucide-react';
import { Video } from '@/components/ui/video';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/base-avatar';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data/projects';
import { AvatarGroup, AvatarGroupItem, AvatarGroupTooltip } from '@/components/ui/avatar-group';
import { Badge } from './ui/base-badge';
import { GithubButton } from './ui/github-button';

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
                className="flex h-full flex-col items-start justify-between gap-4 p-8"
                initial={{ opacity: 0, translateY: -8 }}
                whileInView={{ opacity: 1, translateY: 0 }}
              >
                <div className="flex flex-col gap-2">
                  <Badge variant={project.type === 'Personal Project' ? 'success' : 'info'} appearance="light" className="text-primary max-w-fit rounded-sm">{project.type || `Project ${index + 1}`}</Badge>
                  <div className="prose-ui">
                    <h2 className="text-primary">{project.name}</h2>
                    <h5 className="text-muted-foreground">{project.description}</h5>
                  </div>
                  <AvatarGroup>
                    {project.tech?.map((tech) => (
                      <AvatarGroupItem key={tech.name}>
                        <Link href={tech.url} target="_blank" rel="noreferrer noopener">
                          <Avatar className="size-12 rounded-full overflow-hidden border-4 border-background">
                            <AvatarImage src={`https://img.logo.dev/${tech.domain}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}&size=175&format=png&retina=true`} />
                            <AvatarFallback>{tech.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        </Link>
                        <AvatarGroupTooltip className="flex flex-col gap-0.5 text-center">
                          <span className="text-sm font-semibold">{tech.name}</span>
                        </AvatarGroupTooltip>
                      </AvatarGroupItem>
                    ))}
                  </AvatarGroup>
                </div>
                <div className="flex items-center justify-between gap-2">
                {project.githubUrl && (
                  <GithubButton 
                  initialStars={0}
                  targetStars={100}
                  label="Github Stars"
                  roundStars={true} 
                  repoUrl={project.githubUrl}
                  variant="outline" 
                  />
                )}
                {project.url && (
                <Button asChild variant="outline" className="gap-2 font-mono">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    View Project
                    <ArrowUpRightIcon size={16} />
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
                className={`relative ${isMediaRight ? 'pt-8 pl-8' : 'pt-8 pr-8'}`}
              >
                <div className={`dashed-line-${isMediaRight ? 'top' : 'top'}`} />
                <div className={`dashed-line-${isMediaRight ? 'left' : 'right'}`} />
                {project.mediaType === 'video' ? (
                  <Video
                    className="w-full aspect-video rounded-tl-2xl border-t border-l"
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
                    className="w-full aspect-video object-cover rounded-tl-2xl border-t border-l"
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
