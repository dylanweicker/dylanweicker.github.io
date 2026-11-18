// The Unity WebGL build lives in its own repo, published at /cannon-dodger/.
// The absolute URL keeps it playable from `npm run dev` too.
const GAME_URL = 'https://dylanweicker.github.io/cannon-dodger/';

export function CannonApp() {
  return (
    <div className="game">
      <iframe className="game__frame" src={GAME_URL} title="Cannon Dodger game" loading="lazy" allow="fullscreen" />
      <p className="game__hint">Steer the penguin with your mouse. Dodge the ice cream!</p>
    </div>
  );
}
