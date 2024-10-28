declare global {
  interface Modal {
    open(): void;
    close(): void;
    active: boolean;
  }
}

export {};
