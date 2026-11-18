// Windows rendered on arrival shouldn't steal focus; windows opened later should.
// Desktop flips this after its first effect (child effects run before the parent's).
let hydrated = false;

export const isHydrated = () => hydrated;
export const markHydrated = () => {
  hydrated = true;
};
