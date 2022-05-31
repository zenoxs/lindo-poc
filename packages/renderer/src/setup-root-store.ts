import { IPCEvents, RootStoreModel } from '@lindo/shared'
import { Instance, onPatch, types } from 'mobx-state-tree'
/**
 * The key we'll be saving our state as within async storage.
 */
// const ROOT_STATE_STORAGE_KEY = 'root'

/**
 * Setup the root state.
 */
export async function setupRootStore() {
  // prepare the environment that will be associated with the RootStore.
  const env = await Promise.resolve({});

  const state = await window.fetchInitialStateAsync();
  console.log("Got state: ", state);

  // const optionsPlugin = await SystemJS.import("http://localhost:3001/dist/plugin-test.js");

  // const ExtendedRootStoreModel = RootStoreModel.props({
  //   optionsStore: types.optional(optionsPlugin.PluginStoreModel, {}),
  // })

  const rootStore: Instance<typeof RootStoreModel> = RootStoreModel.create(state, env)

  onPatch(rootStore, patch => {
    window.forwardPatchToMain(patch);
  })

  return rootStore
}
