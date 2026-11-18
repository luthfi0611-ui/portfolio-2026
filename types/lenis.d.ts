declare global {
  interface Window {
    lenis?: {
      scrollTo: (...args: any[]) => void;
    };
  }
}

export {};
