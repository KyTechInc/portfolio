import { Section } from '@/components/Section';
import { getAllArticles } from '@/lib/articles';
import BlogSectionClient from '@/components/blog-section.client';

export default async function BlogSection() {
    const articles = await getAllArticles();

    return (
        <Section className="grid divide-y sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <BlogSectionClient articles={articles} />
        </Section>
    );
}
