export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } }
};

export const listStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } }
};

export const springIn = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", damping: 20, stiffness: 220 } }
};
