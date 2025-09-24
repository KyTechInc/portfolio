export const projects = [
  {
    id: 'benchwarmers',
    name: 'Benchwarmers.app',
    description: 'A community-driven platform for tracking your NHL teams stats, salaries, game scores, and more!',
    type: 'Personal Project',
    githubUrl: 'https://github.com/KyTechInc/benchwarmers-oss',
    url: 'https://benchwarmers.app',
    mediaUrl: 'https://data.benchwarmers.app/media/scoreboard%201.mp4',
    mediaType: 'video' as const,
    featured: true,
    tech: [
      { name: 'Next.js', url: 'https://nextjs.org/', domain: 'nextjs.org' },
      { name: 'Supabase', url: 'https://supabase.com/', domain: 'supabase.com' },
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com/', domain: 'tailwindcss.com' },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org/', domain: 'typescriptlang.org' }
    ]
  },
  {
    id: 'personal-os',
    name: 'Personal OS',
    description: 'My personal operating system. Built with NextJS, Tailwind CSS, and Shadcn/UI.',
    type: 'Personal Project',
    url: 'TBD',
    githubUrl: 'https://github.com/KyTechInc/personal-os',
    mediaUrl: 'https://media.kytech.ca/port-terminal%201.mp4',
    mediaType: 'video' as const,
    featured: true,
    tech: [
      { name: 'Next.js', url: 'https://nextjs.org/', domain: 'nextjs.org' },
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com/', domain: 'tailwindcss.com' },
      { name: 'Shadcn/UI', url: 'https://ui.shadcn.com/', domain: 'ui.shadcn.com' },
      { name: 'TypeScript', url: 'https://www.typescriptlang.org/', domain: 'typescriptlang.org' }
    ]
  },
  {
    id: 'hls-compressor',
    name: 'HLS Video Compressor',
    description: 'Simple, script-based HLS (HTTP Live Streaming) compression workflow for generating adaptive bitrate streams from MP4 files. Produces a master playlist plus multiple resolution-specific variant streams and a thumbnail.',
    type: 'OSS Project',
    githubUrl: 'https://github.com/KyTechInc/hls-compressor',
    url: 'https://github.com/KyTechInc/hls-compressor',
    mediaUrl: 'https://media.kytech.ca/hls-demo%201.mp4',
    mediaType: 'video' as const,
    featured: true,
    tech: [
      { name: 'FFmpeg', url: 'https://ffmpeg.org/', domain: 'ffmpeg.org' },
      { name: 'GoLang', url: 'https://go.dev/', domain: 'go.dev' },
      { name: 'Node.js', url: 'https://nodejs.org/', domain: 'nodejs.org' }
    ]
  }
];