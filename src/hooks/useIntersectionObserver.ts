import { useEffect } from 'react';

interface observerParams {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
  target: React.RefObject<HTMLDivElement>;
  onIntersect: IntersectionObserverCallback;
}

const useIntersectionObserver = (params: observerParams): void => {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 1.0,
    target,
    onIntersect,
  } = params;

  useEffect(() => {
    if (!target.current) {
      return;
    }

    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });
    observer.observe(target.current);

    // eslint-disable-next-line consistent-return
    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [target, root, rootMargin, onIntersect, threshold]);
};

export default useIntersectionObserver;
