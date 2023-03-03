export const scrollPageToRef = (ref: React.RefObject<HTMLDivElement>) => {
  return () => {
    ref.current?.scrollIntoView({
      behavior: "smooth",
    });
  };
};
