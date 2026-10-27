/**
 * playWhenAllowed
 * Starts a muted inline video. If the browser refuses autoplay (e.g. iOS Low Power Mode or
 * data saver), playback is retried on the first user interaction, which browsers always allow.
 * Returns a cleanup function that removes any pending interaction listeners.
 */
const INTERACTION_EVENTS = ['touchstart', 'touchend', 'pointerdown', 'click', 'keydown'];

export function playWhenAllowed(video) {
  if (!video) return () => {};

  video.muted = true;
  video.playsInline = true;
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');

  const detach = () => {
    INTERACTION_EVENTS.forEach((type) => window.removeEventListener(type, retry, true));
  };

  // Called synchronously inside the interaction event so it counts as a user gesture
  function retry() {
    const attempt = video.play();
    if (attempt !== undefined) {
      attempt.then(detach).catch(() => {});
    } else {
      detach();
    }
  }

  const attempt = video.play();
  if (attempt !== undefined) {
    attempt.catch(() => {
      INTERACTION_EVENTS.forEach((type) =>
        window.addEventListener(type, retry, { capture: true, passive: true })
      );
    });
  }

  return detach;
}
