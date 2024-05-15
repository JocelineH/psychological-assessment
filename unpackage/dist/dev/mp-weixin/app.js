"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_index = require("./store/index.js");
if (!Math) {
  "./pages/login/index.js";
  "./pages/firstPage/index.js";
  "./pages/login/component/logo.js";
  "./pages/assessPage/index.js";
  "./pages/assessPage/search.js";
  "./pages/assessPage/assess/index.js";
  "./pages/assessPage/report/index.js";
  "./pages/personal/index.js";
  "./pages/personal/personalEdit.js";
  "./pages/personal/personalData.js";
  "./pages/API/login/login.js";
}
const _sfc_main = {
  onLaunch: function() {
    var _a, _b;
    console.log("App Launch");
    console.log("===plus.runtime.appid", (_a = plus == null ? void 0 : plus.runtime) == null ? void 0 : _a.appid);
    if (((_b = plus == null ? void 0 : plus.runtime) == null ? void 0 : _b.appid) === "HBuilder") {
      let SUID = common_vendor.index.getStorageSync("user-token");
      console.log("======SUID", SUID);
      if (SUID) {
        console.log("======gogofirstPage");
        setTimeout(() => {
          var _a2;
          (_a2 = plus == null ? void 0 : plus.navigator) == null ? void 0 : _a2.closeSplashscreen();
        }, 1e3);
      } else {
        console.log("======gogologin");
        common_vendor.index.reLaunch({
          url: "/pages/login/index",
          success: () => {
            var _a2;
            (_a2 = plus == null ? void 0 : plus.navigator) == null ? void 0 : _a2.closeSplashscreen();
          }
        });
      }
    }
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  globalData: {
    test: ""
  },
  methods: {
    ...common_vendor.mapMutations(["setUniverifyErrorMsg", "setUniverifyLogin"])
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/hejing/Documents/project/psychological-assessment/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  app.config.globalProperties.$adpid = "1111111111";
  app.config.globalProperties.$backgroundAudioData = {
    playing: false,
    playTime: 0,
    formatedPlayTime: "00:00:00"
  };
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
