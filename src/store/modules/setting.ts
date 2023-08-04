import { defineStore } from 'pinia'

let useLayoutSettingStore = defineStore('layoutSettingStore', {
  state: () => {
    return {
      isFold: false,
      refresh: false,
    }
  },
  actions: {},
})
export default useLayoutSettingStore
