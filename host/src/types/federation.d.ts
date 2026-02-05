declare module 'products/ProductsApp' {
  import { LifeCycles } from 'single-spa';
  const lifecycles: LifeCycles;
  export const bootstrap: LifeCycles['bootstrap'];
  export const mount: LifeCycles['mount'];
  export const unmount: LifeCycles['unmount'];
  export default lifecycles;
}