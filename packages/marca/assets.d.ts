declare module "*.png" {
  const src: { src: string; width: number; height: number };
  export default src;
}
