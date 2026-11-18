import type { Win } from '@/stores/windows';
import { AboutApp } from './AboutApp';
import { BoardGameShelf } from './BoardGameShelf';
import { CannonApp } from './CannonApp';
import { ContactApp } from './ContactApp';
import { ExplorerApp } from './ExplorerApp';
import { HobbiesApp } from './HobbiesApp';
import { HomepageApp } from './homepage/HomepageApp';
import { MusicApp } from './music/MusicApp';
import { ResumeApp } from './ResumeApp';
import { SkillsApp } from './SkillsApp';
import { UnderConstruction } from './UnderConstruction';

export function AppView({ win }: { win: Win }) {
  switch (win.app) {
    case 'about':
      return <AboutApp />;
    case 'work':
    case 'projects':
      return <ExplorerApp app={win.app} slug={win.slug} />;
    case 'skills':
      return <SkillsApp />;
    case 'resume':
      return <ResumeApp />;
    case 'hobbies':
      return <HobbiesApp />;
    case 'homepage':
      return <HomepageApp slug={win.slug} />;
    case 'contact':
      return <ContactApp />;
    case 'cannon':
      return <CannonApp />;
    case 'boardgames':
      return (
        <div className="shelf-window">
          <p className="shelf-window__intro">
            These are the board games I own. Search, sort, or filter by player count and length to find something for
            game night, and click any box for the details.
          </p>
          <BoardGameShelf />
        </div>
      );
    case 'photos':
      return <UnderConstruction what="The photo albums" detail="Cat pictures are being lovingly curated." />;
    case 'music':
      return <MusicApp />;
  }
}
