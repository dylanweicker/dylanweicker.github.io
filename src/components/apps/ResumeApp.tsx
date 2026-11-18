import { useSiteContent } from '../os/content';
import { ResumeDoc } from './ResumeDoc';

export function ResumeApp() {
  const { work } = useSiteContent();
  return (
    <div className="pdf">
      <div className="pdf__toolbar">
        <span>Page 1 of 2</span>
        <a className="gloss-btn" href="/cv/" target="_blank" rel="noopener">
          Printable version
        </a>
      </div>
      <div className="pdf__page">
        <ResumeDoc work={work} />
      </div>
    </div>
  );
}
