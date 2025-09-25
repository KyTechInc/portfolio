import { Section } from '@/components/Section';
import { tech } from '@/data/tech';
import { cn } from '@/lib/utils';
import { VerifiedIcon } from 'lucide-react';
import Image from 'next/image';
import groupBy from 'lodash.groupby';

interface AppItem {
    title: string;
    description: string;
    url: string;
    category: string;
    featured: boolean;
    imageUrl: string;
}

export const Apps = () => {
    const data = tech.stack;
    
    return (
        <>
            {Object.entries(groupBy(data, 'category')).map(([category, apps]) => (
                <Section
                    className="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0"
                    key={category}
                >
                    <div className="bg-dashed p-8">
                        <h2 className="font-semibold text-2xl">{category}</h2>
                    </div>
                    <div className="grid sm:col-span-2 sm:grid-cols-2">
                        {apps
                            .sort((a, b) => Number(b.featured) - Number(a.featured))
                            .map((app: AppItem, index: number) => (
                                <a
                                    key={app.url}
                                    className={cn(
                                        ' group flex items-start gap-4 p-8 transition-colors hover:bg-background bg-background',
                                        index > 1 && 'border-t',
                                        index % 2 === 0 && 'sm:border-r'
                                    )}
                                    href={app.url}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    <Image
                                        src={`https://img.logo.dev/${app.imageUrl}?token=${process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN}&size=175&format=png&retina=true`}
                                        alt={app.title}
                                        width={36}
                                        height={36}
                                        className="rounded-md group-hover:scale-[110%] transition-all duration-100 hover:shadow-lg group-hover:rotate-[9deg] ease-in-out bg-background"
                                        quality={100}
                                    />
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <h3 className="font-semibold tracking-tight">
                                                {app.title}
                                            </h3>
                                            {app.featured && (
                                                <VerifiedIcon className="text-success" size={16} />
                                            )}
                                        </div>
                                        <p className="text-muted-foreground text-sm">
                                            {app.description}
                                        </p>
                                    </div>
                                </a>
                            ))}
                        {apps.length % 2 === 1 && (
                            <div className="h-full w-full border-t bg-dashed" />
                        )}
                    </div>
                </Section>
            ))}
        </>
    );
};
