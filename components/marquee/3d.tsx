import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/marquee';

// NHL game data
const nhlGames = [
  {
    awayTeam: 'BOS',
    awayScore: 0,
    homeTeam: 'PIT',
    homeScore: 3,
    status: 'FINAL',
    time: '00:00',
    awayLogo: 'https://assets.nhle.com/logos/nhl/svg/BOS_light.svg',
    homeLogo: 'https://assets.nhle.com/logos/nhl/svg/PIT_light.svg',
  },
  {
    awayTeam: 'EDM',
    awayScore: 4,
    homeTeam: 'CBJ',
    homeScore: 4,
    status: 'FINAL',
    time: '00:00',
    awayLogo: 'https://assets.nhle.com/logos/nhl/svg/EDM_light.svg',
    homeLogo: 'https://assets.nhle.com/logos/nhl/svg/CBJ_light.svg',
  },
  {
    awayTeam: 'DET',
    awayScore: 3,
    homeTeam: 'OTT',
    homeScore: 2,
    status: 'FINAL',
    time: '00:00',
    awayLogo: 'https://assets.nhle.com/logos/nhl/svg/DET_light.svg',
    homeLogo: 'https://assets.nhle.com/logos/nhl/svg/OTT_light.svg',
  },
  {
    awayTeam: 'TBL',
    awayScore: 3,
    homeTeam: 'CAR',
    homeScore: 2,
    status: 'FINAL',
    time: '00:00',
    awayLogo: 'https://assets.nhle.com/logos/nhl/svg/TBL_light.svg',
    homeLogo: 'https://assets.nhle.com/logos/nhl/svg/CAR_light.svg',
  },
  {
    awayTeam: 'NYR',
    awayScore: 3,
    homeTeam: 'DAL',
    homeScore: 2,
    status: 'FINAL',
    time: '00:00',
    awayLogo: 'https://assets.nhle.com/logos/nhl/svg/NYR_light.svg',
    homeLogo: 'https://assets.nhle.com/logos/nhl/svg/DAL_light.svg',
  },
];

function ScoreCard({
  awayTeam,
  awayScore,
  homeTeam,
  homeScore,
  status,
  time,
  awayLogo,
  homeLogo
}: (typeof nhlGames)[number]) {
  return (
    <Card className="w-64 bg-card border-border/50 hover:border-border shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarImage src={awayLogo} alt={awayTeam} />
              <AvatarFallback className="bg-muted text-muted-foreground font-bold text-sm">
                {awayTeam}
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <div className="text-xs font-medium text-muted-foreground">{awayTeam}</div>
              <div className="text-xl font-bold text-foreground">{awayScore}</div>
            </div>
          </div>

          <div className="text-center px-2">
            <div className="text-xs font-semibold text-green-400">{status}</div>
            <div className="text-xs text-muted-foreground">{time}</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-xs font-medium text-muted-foreground">{homeTeam}</div>
              <div className="text-xl font-bold text-foreground">{homeScore}</div>
            </div>
            <Avatar className="size-12">
              <AvatarImage src={homeLogo} alt={homeTeam} />
              <AvatarFallback className="bg-muted text-muted-foreground font-bold text-sm">
                {homeTeam}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Marquee3D() {
  return (
    <div className="relative flex h-96 w-full flex-row items-center justify-center overflow-hidden gap-1.5 [perspective:1200px]">
      <div
        className="flex flex-row items-center gap-8"
        style={{
          transform:
            'translateX(-120px) translateY(0px) translateZ(-100px) rotateX(25deg) rotateY(-8deg) rotateZ(18deg)',
        }}
      >
        {/* Vertical Marquee (downwards) */}
        <Marquee vertical pauseOnHover repeat={4} className="[--duration:35s]">
          {nhlGames.map((game, index) => (
            <ScoreCard key={`${game.awayTeam}-${game.homeTeam}-${index}`} {...game} />
          ))}
        </Marquee>
        {/* Vertical Marquee (upwards) */}
        <Marquee vertical pauseOnHover reverse repeat={4} className="[--duration:35s]">
          {nhlGames.map((game, index) => (
            <ScoreCard key={`${game.awayTeam}-${game.homeTeam}-reverse-${index}`} {...game} />
          ))}
        </Marquee>
        {/* Vertical Marquee (downwards) */}
        <Marquee vertical pauseOnHover repeat={4} className="[--duration:35s]">
          {nhlGames.map((game, index) => (
            <ScoreCard key={`${game.awayTeam}-${game.homeTeam}-third-${index}`} {...game} />
          ))}
        </Marquee>
        {/* Vertical Marquee (upwards) */}
        <Marquee vertical pauseOnHover reverse repeat={4} className="[--duration:35s]">
          {nhlGames.map((game, index) => (
            <ScoreCard key={`${game.awayTeam}-${game.homeTeam}-fourth-${index}`} {...game} />
          ))}
        </Marquee>
      </div>

      {/* Gradient overlays for vertical marquee */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
