import { setupRootStore } from './setup-root-store'
;(async () => {
  console.log('setupRootStore')
  await setupRootStore()

  // setTimeout(() => {
  //   store.confStore.setAppName("Vite");
  // }, 4000);
})()
