import { useCallback, useEffect, useRef, type CSSProperties } from 'react';

/*
 * The wallpaper scene (DESIGN.md §3.5): the illustrated background, sized like `object-fit: cover`,
 * with animated layers placed in its coordinate space (container units: 1cqh = 1% of scene height).
 *
 * Depth trick: the dolphin lives in a box that ends at LEAP_LINE, a little below the horizon, with
 * overflow hidden. The sea below that line therefore sits "in front" of it, so the dolphin rises out
 * of the water and dives back in without a separate foreground layer.
 */

const LEAP_LINE = 52; // % of scene height
const SCENE = '/scene';

interface FishDef {
  name: string;
  facing: 'left' | 'right';
  /** Where the tail meets the body, as % of image width from the left */
  joint: number;
  /** Image height / width */
  ratio: number;
  /** Width in cqh */
  size: number;
  /** Vertical position, % of scene height */
  top: number;
  /** 1 = swims right, -1 = swims left */
  dir: 1 | -1;
  /** Seconds to cross the screen */
  duration: number;
  delay: number;
  /** Seconds per tail beat */
  wag: number;
  /** 0 = far (small, hazy) … 1 = near */
  depth: number;
  /** A school of this many */
  school?: number;
  /** Hue shift in degrees, so schools of the same sprite read as different species */
  hue?: number;
}

// Tops are kept below the lowest point of the water surface (~67% of the scene height).
const FISH: FishDef[] = [
  // three schools, at different depths and headings
  { name: 'school-fish', facing: 'right', joint: 26, ratio: 180 / 400, size: 3, top: 72, dir: -1, duration: 80, delay: -10, wag: 0.5, depth: 0.15, school: 9, hue: -25 },
  { name: 'school-fish', facing: 'right', joint: 26, ratio: 180 / 400, size: 4.5, top: 79, dir: 1, duration: 56, delay: -30, wag: 0.6, depth: 0.45, school: 7 },
  { name: 'school-fish', facing: 'right', joint: 26, ratio: 180 / 400, size: 5.5, top: 88, dir: -1, duration: 46, delay: -38, wag: 0.55, depth: 0.75, school: 5, hue: 40 },
  { name: 'angel-fish', facing: 'right', joint: 41, ratio: 384 / 400, size: 10, top: 70.5, dir: -1, duration: 62, delay: -40, wag: 1.4, depth: 0.55 },
  { name: 'clown-fish', facing: 'left', joint: 76, ratio: 275 / 400, size: 6, top: 71, dir: 1, duration: 70, delay: -52, wag: 0.9, depth: 0.35 },
  { name: 'reef-fish', facing: 'right', joint: 31, ratio: 351 / 400, size: 13, top: 74, dir: 1, duration: 48, delay: -14, wag: 1.1, depth: 1 },
  { name: 'clown-fish', facing: 'left', joint: 76, ratio: 275 / 400, size: 9, top: 84, dir: -1, duration: 40, delay: -6, wag: 0.8, depth: 0.85 },
];

/** Offsets (in fish lengths) and phase for each member of a school */
const SCHOOL = [
  { x: 0, y: 0, phase: 0 },
  { x: -1.3, y: -0.8, phase: 0.2 },
  { x: -1.1, y: 0.7, phase: 0.45 },
  { x: -2.4, y: -0.1, phase: 0.1 },
  { x: -2.8, y: 1, phase: 0.35 },
  { x: -3.3, y: -0.9, phase: 0.55 },
  { x: -3.9, y: 0.4, phase: 0.25 },
  { x: -4.6, y: -0.4, phase: 0.6 },
  { x: -5, y: 0.8, phase: 0.15 },
];

/** Deterministic pseudo-random numbers, so server and client render the same scene. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Bubble {
  src: string;
  /** width in cqh */
  size: number;
  /** horizontal offset from centre, vw */
  x: number;
  duration: number;
  delay: number;
  sway: number;
  far?: boolean;
}

/**
 * Bubble streams: each source releases a burst of single bubbles in a wobbly line, then rests.
 * Every bubble in a stream shares the cycle length, so the bursts stay together as they rise.
 */
const STREAMS = [
  { x: -36, cycle: 13, burst: 6 },
  { x: -21, cycle: 16, burst: 8 },
  { x: -4, cycle: 12, burst: 5 },
  { x: 14, cycle: 15, burst: 7 },
  { x: 29, cycle: 14, burst: 6 },
  { x: 41, cycle: 17, burst: 8 },
];

function makeBubbles(): Bubble[] {
  const rand = seeded(7);
  const bubbles: Bubble[] = [];
  STREAMS.forEach((st, si) => {
    const offset = -rand() * st.cycle;
    for (let i = 0; i < st.burst; i++) {
      const big = i === 0 || rand() < 0.15;
      bubbles.push({
        src: `${SCENE}/bubbles/bubble-${big ? 1 + Math.floor(rand() * 4) : 4 + Math.floor(rand() * 4)}.webp`,
        size: big ? 2.4 + rand() * 1.8 : 0.8 + rand() * 1.4,
        x: st.x + (rand() - 0.5) * 1.6,
        duration: st.cycle,
        delay: offset - i * (0.35 + rand() * 0.35) - si * 0.01,
        sway: 1.6 + rand() * 1.6,
      });
    }
  });
  // Faint clusters of small single bubbles further back, behind the fish
  const far = [-44, -30, -14, 6, 21, 35, 47];
  far.forEach((x) => {
    const duration = 20 + rand() * 10;
    const offset = -rand() * 30;
    const n = 4 + Math.floor(rand() * 4);
    for (let i = 0; i < n; i++) {
      bubbles.push({
        src: `${SCENE}/bubbles/bubble-${5 + Math.floor(rand() * 3)}.webp`,
        size: 0.5 + rand() * 0.8,
        x: x + (rand() - 0.5) * 2.2,
        duration,
        delay: offset - rand() * 1.6,
        sway: 2.5 + rand() * 2,
        far: true,
      });
    }
  });
  return bubbles;
}

const BUBBLES = makeBubbles();

/**
 * Twinkles on the brightest glints along the wave crests, found by scanning the painting between the
 * horizon and the bottom of the water surface (scene %, measured on art/background.png).
 */
const TWINKLES = [
  { left: 11.2, top: 53.8, size: 1.8, delay: 0 },
  { left: 19.1, top: 57.4, size: 2.4, delay: 1.9 },
  { left: 30.5, top: 58.0, size: 2.6, delay: 0.8 },
  { left: 44.4, top: 60.7, size: 2.6, delay: 2.6 },
  { left: 57.9, top: 64.7, size: 2.2, delay: 1.3 },
  { left: 66.6, top: 63.1, size: 2.3, delay: 3.1 },
  { left: 73.0, top: 54.3, size: 1.8, delay: 0.4 },
  { left: 80.6, top: 57.5, size: 2.5, delay: 2.2 },
  { left: 88.0, top: 56.3, size: 2.6, delay: 1.6 },
  { left: 97.1, top: 52.4, size: 2.1, delay: 2.9 },
];

const LEAP_MS = 2900;

function BubbleView({ b }: { b: Bubble }) {
  return (
    <div
      className={`bubble${b.far ? ' bubble--far' : ''}`}
      style={{
        left: `calc(50% + ${b.x.toFixed(2)}vw)`,
        width: `${b.size.toFixed(2)}cqh`,
        animationDuration: `${b.duration.toFixed(2)}s`,
        animationDelay: `${b.delay.toFixed(2)}s`,
      }}
    >
      <img src={b.src} alt="" style={{ animationDuration: `${b.sway.toFixed(2)}s` }} />
    </div>
  );
}

function Fish({ f }: { f: FishDef }) {
  const mirror = (f.facing === 'right') !== (f.dir === 1);
  const tailOnLeft = f.facing === 'right';
  const img = `url(${SCENE}/fish/${f.name}.webp)`;
  // Slightly overlapping slices so no seam shows at the hinge.
  const tailClip = tailOnLeft ? `inset(0 ${100 - f.joint - 0.5}% 0 0)` : `inset(0 0 0 ${f.joint - 0.5}%)`;
  const headClip = tailOnLeft ? `inset(0 0 0 ${f.joint}%)` : `inset(0 ${100 - f.joint}% 0 0)`;
  const travel = `calc(50vw + ${f.size + 20}cqh)`;
  const members = f.school ? SCHOOL.slice(0, f.school) : [{ x: 0, y: 0, phase: 0 }];

  return (
    <div
      className="fish"
      style={
        {
          top: `${f.top}%`,
          '--from': f.dir === 1 ? `calc(${travel} * -1)` : travel,
          '--to': f.dir === 1 ? travel : `calc(${travel} * -1)`,
          '--haze': 1 - f.depth,
          '--hue': `${f.hue ?? 0}deg`,
          animationDuration: `${f.duration}s`,
          animationDelay: `${f.delay}s`,
        } as CSSProperties
      }
    >
      {members.map((m, i) => (
        <div
          key={i}
          className="fish__bob"
          style={{
            width: `${f.size}cqh`,
            aspectRatio: `1 / ${f.ratio}`,
            translate: `${m.x * f.size * f.dir}cqh ${m.y * f.size * f.ratio * 1.6}cqh`,
            animationDelay: `${-m.phase * 5}s`,
          }}
        >
          <div className="fish__3d" style={{ transform: mirror ? 'scaleX(-1)' : undefined }}>
            {(['tail', 'head'] as const).map((part) => (
              <span
                key={part}
                className={`fish__part fish__${part}`}
                style={{
                  backgroundImage: img,
                  clipPath: part === 'tail' ? tailClip : headClip,
                  transformOrigin: `${f.joint}% 50%`,
                  animationDuration: `${f.wag}s`,
                  animationDelay: `${-m.phase * f.wag * 2}s`,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Wallpaper() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const dolphinRef = useRef<HTMLDivElement>(null);
  const splashRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sparkleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const busy = useRef(false);

  /**
   * One leap along a parabola from a random spot in the visible ocean, in a random direction,
   * pitching to follow the arc, with a splash where it leaves and re-enters the water.
   */
  const leap = useCallback(() => {
    const scene = sceneRef.current;
    const dolphin = dolphinRef.current;
    if (busy.current || !scene || !dolphin || !dolphin.animate) return;
    busy.current = true;

    const S = scene.clientHeight;
    const L = dolphin.offsetHeight;
    const W = Math.min(S * 0.3, window.innerWidth * 0.6); // distance travelled
    const H = S * 0.11; // height above the water
    const sink = L * 0.75; // starts and ends this far below the waterline (hidden)

    // The scene is wider than the screen (cover-fit), so pick a start inside the visible part.
    const dir = Math.random() < 0.5 ? 1 : -1;
    const visibleLeft = (scene.clientWidth - window.innerWidth) / 2;
    const margin = Math.min(80, window.innerWidth * 0.06) + L / 2;
    const room = Math.max(0, window.innerWidth - 2 * margin - W);
    const start = visibleLeft + margin + Math.random() * room + (dir === 1 ? 0 : W);
    const xAt = (t: number) => start + dir * t * W;

    const N = 60;
    const frames: Keyframe[] = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      const y = sink - (sink + H) * 4 * t * (1 - t);
      // Follow the arc, but ease the pitch so it rolls over the top instead of flipping.
      const slope = (-(sink + H) * 4 * (1 - 2 * t)) / W;
      const angle = Math.atan(slope) * (180 / Math.PI) * 0.8;
      // Right-to-left leaps are the mirror image of left-to-right ones.
      frames.push({
        transform: `translate(calc(-50% + ${xAt(t)}px), calc(-50% + ${y}px)) scaleX(${dir}) rotate(${angle}deg)`,
        opacity: 1,
      });
    }
    const run = dolphin.animate(frames, { duration: LEAP_MS, easing: 'linear' });

    // Where the arc crosses the waterline: 4t(1−t) = sink / (sink + H)
    const t0 = (1 - Math.sqrt(1 - sink / (sink + H))) / 2;
    [t0, 1 - t0].forEach((t, i) => {
      const el = splashRefs.current[i];
      if (!el) return;
      const at = `calc(-50% + ${xAt(t)}px)`;
      el.animate(
        [
          { transform: `translateX(${at}) scale(0.2, 0)`, opacity: 0 },
          { transform: `translateX(${at}) scale(1, 1)`, opacity: 1, offset: 0.25 },
          { transform: `translateX(${at}) scale(1.3, 0.6)`, opacity: 0 },
        ],
        { duration: 900, delay: t * LEAP_MS - 60, easing: 'ease-out' },
      );
    });
    // A few sparkles trailing just behind the apex
    sparkleRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.left = `${xAt(0.42 + i * 0.08) - dir * L * 0.4}px`;
      el.animate(
        [
          { transform: 'scale(0.2) rotate(0deg)', opacity: 0 },
          { transform: 'scale(1.2) rotate(45deg)', opacity: 1, offset: 0.4 },
          { transform: 'scale(0.6) rotate(90deg)', opacity: 0 },
        ],
        { duration: 1100, delay: LEAP_MS * (0.38 + i * 0.1), easing: 'ease-out' },
      );
    });

    run.finished.finally(() => {
      busy.current = false;
    });
  }, []);

  // The dolphin moment: every 30-60 seconds, unless the visitor prefers reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let timer: number;
    const schedule = (ms: number) => {
      timer = window.setTimeout(() => {
        if (!document.hidden) leap();
        schedule(30_000 + Math.random() * 30_000);
      }, ms);
    };
    schedule(4_000);
    return () => window.clearTimeout(timer);
  }, [leap]);

  return (
    <div className="wallpaper">
      <div ref={sceneRef} className="scene" style={{ '--leap-line': `${LEAP_LINE}%` } as CSSProperties}>
        <img className="scene__bg" src={`${SCENE}/background.webp`} alt="" width={1916} height={821} fetchPriority="high" />

        {TWINKLES.map((t, i) => (
          <span
            key={i}
            className="twinkle"
            style={{ left: `${t.left}%`, top: `${t.top}%`, width: `${t.size}cqh`, animationDelay: `${t.delay}s` }}
            aria-hidden="true"
          />
        ))}

        <button type="button" className="scene__sun" aria-label="Poke the sun" title="☀️ Poke me" onClick={leap} />

        <div className="scene__above-water" aria-hidden="true">
          <div className="leap">
            <div ref={dolphinRef} className="leap__dolphin">
              <img src={`${SCENE}/dolphin.webp`} alt="" width={329} height={360} />
            </div>
            {[0, 1].map((i) => (
              <div
                key={i}
                ref={(el) => {
                  splashRefs.current[i] = el;
                }}
                className="leap__splash"
              />
            ))}
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                ref={(el) => {
                  sparkleRefs.current[i] = el;
                }}
                className="leap__sparkle"
                style={{ top: `${-12 - (i % 2) * 4}cqh` }}
              >
                ✦
              </span>
            ))}
          </div>
        </div>

        <div className="scene__underwater" aria-hidden="true">
          {BUBBLES.filter((b) => b.far).map((b, i) => (
            <BubbleView key={`far-${i}`} b={b} />
          ))}
          {FISH.map((f, i) => (
            <Fish key={i} f={f} />
          ))}
          {BUBBLES.filter((b) => !b.far).map((b, i) => (
            <BubbleView key={i} b={b} />
          ))}
        </div>
      </div>
    </div>
  );
}
