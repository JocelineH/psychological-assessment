"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  props: ["checked"],
  data() {
    return {
      COLOR: "#1AB84E",
      _visibleInfo: false,
      _userInfo: {},
      canProfile: false
      //
    };
  },
  mounted() {
    const info = common_vendor.index.getSystemInfoSync();
    console.log("====created", info.version);
    if (common_vendor.wx$1.getUserProfile) {
      console.log("======cun zai");
      this.canProfile = true;
    } else {
      console.log("======no cun zai");
    }
  },
  methods: {
    handleGetUserProfile() {
      let that = this;
      common_vendor.wx$1.getUserProfile({
        desc: "获取你的昵称、头像、地区及性别",
        success: async (res) => {
          console.log("=====profile res", JSON.stringify(res.userInfo));
          const { userInfo } = res;
          const { openId, nickName, avatarUrl, gender } = userInfo || {};
          that._userInfo = { openId, nickName, avatarUrl, gender };
          common_vendor.index.setStorageSync("user-info", JSON.stringify(that._userInfo));
          that.showInfoDialog();
        },
        fail: (err) => {
          console.log("=====res", JSON.stringify(err));
          common_vendor.wx$1.showToast({
            title: err,
            icon: "none"
          });
        }
      });
    },
    onAuthLogin() {
      if (!this.checked) {
        common_vendor.wx$1.showToast({
          title: "请同意用户隐私协议",
          icon: "none"
        });
        return;
      } else {
        this.showInfoDialog();
      }
    },
    showInfoDialog() {
      console.log("=====showInfoDialog", this._userInfo);
      this._visibleInfo = true;
    },
    hideDialog() {
      this._visibleInfo = false;
    },
    onChooseAvatar(e) {
      const { avatarUrl } = e.detail;
      console.log("========accva", avatarUrl);
      this._userInfo.avatarUrl = avatarUrl;
    },
    onChangeNickName(e) {
      const { value } = e.detail;
      console.log("========onChangeNickName", value);
      this._userInfo.nickName = value;
    },
    handleAllow() {
      let that = this;
      common_vendor.wx$1.getUserProfile({
        desc: "获取你的昵称、头像、地区及性别",
        success: async (res) => {
          console.log("=====profile res", JSON.stringify(res.userInfo));
          const { userInfo } = res;
          const {
            openId
            /*, nickName, avatarUrl, gender */
          } = userInfo || {};
          that._userInfo = Object.assign({ openId }, that._userInfo);
          common_vendor.index.setStorageSync("user-info", JSON.stringify(that._userInfo));
          common_vendor.index.request({
            url: "",
            method: "POST",
            data: { code: res == null ? void 0 : res.code },
            success: async (res2) => {
              var _a, _b, _c;
              await common_vendor.index.setStorageSync("user-token", (_a = res2 == null ? void 0 : res2.data) == null ? void 0 : _a.token);
              if ((_c = (_b = res2 == null ? void 0 : res2.data) == null ? void 0 : _b.userInfo) == null ? void 0 : _c.isNew)
                ;
              else {
                common_vendor.index.switchTab({
                  url: "/pages/firstPage/index"
                });
              }
            },
            fail: (err) => {
              common_vendor.wx$1.showToast({
                title: err,
                icon: "none"
              });
            }
          });
        },
        fail: (err) => {
          console.log("=====res", JSON.stringify(err));
          common_vendor.wx$1.showToast({
            title: err,
            icon: "none"
          });
        }
      });
    },
    async handleGetPhoneNumber(e) {
      console.log("========", e);
      this.hideDialog();
      const { errMsg, code, iv, encryptedData } = (e == null ? void 0 : e.detail) || {};
      if (errMsg == "getPhoneNumber:ok") {
        await common_vendor.index.setStorageSync("user-info", JSON.stringify(this._userInfo));
        console.log("=======user info", JSON.stringify(this._userInfo));
        common_vendor.index.navigateTo({
          url: "/pages/personal/personalData"
        });
      }
    }
    //
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.onAuthLogin && $options.onAuthLogin(...args)),
    b: $data._visibleInfo
  }, $data._visibleInfo ? {
    c: common_assets._imports_0$2,
    d: (_a = $data._userInfo) == null ? void 0 : _a.avatarUrl,
    e: common_vendor.o((...args) => $options.onChooseAvatar && $options.onChooseAvatar(...args)),
    f: $data._userInfo.nickName,
    g: common_vendor.o((...args) => $options.onChangeNickName && $options.onChangeNickName(...args)),
    h: common_vendor.o((...args) => $options.hideDialog && $options.hideDialog(...args)),
    i: common_vendor.o((...args) => $options.handleGetPhoneNumber && $options.handleGetPhoneNumber(...args)),
    j: common_vendor.o((...args) => _ctx.handleClickDialog && _ctx.handleClickDialog(...args)),
    k: common_vendor.o((...args) => $options.hideDialog && $options.hideDialog(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/hejing/Documents/project/psychological-assessment/pages/login/authLogin.vue"]]);
wx.createComponent(Component);
