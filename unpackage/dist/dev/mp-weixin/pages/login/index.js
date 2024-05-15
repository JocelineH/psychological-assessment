"use strict";
const common_vendor = require("../../common/vendor.js");
const logoVue = () => "./component/logo2.js";
const AuthLogin = () => "./authLogin.js";
const mobile_reg = /^1[3-9]{1}[0-9]{9}$/;
const _sfc_main = {
  components: { logoVue, AuthLogin },
  data() {
    return {
      COLOR: "#1AB84E",
      mobile: "",
      code: "",
      validCode: "",
      disabled: false,
      time: "",
      validText: "获取验证码",
      checked: ""
    };
  },
  onLoad() {
    console.log("=====onLoad");
    if (this.setTime) {
      clearInterval(this.setTime);
    }
  },
  methods: {
    onClearIcon() {
      this.mobile = "";
    },
    validMobile() {
      let result = true;
      if (!mobile_reg.test(this.mobile)) {
        common_vendor.wx$1.showToast({
          title: "手机号输入有误！",
          icon: "none"
        });
        result = false;
      }
      return result;
    },
    //随机生成几位数
    getVerificationCode(codeLength) {
      let verification_code_str = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      function getRandom(min, max) {
        return Math.round(Math.random() * (max - min) + min);
      }
      let newStr = "";
      for (var i = 0; i < codeLength; i++) {
        newStr += verification_code_str[getRandom(0, verification_code_str.length - 1)];
      }
      return newStr;
    },
    setIntervalFunc() {
      this.time = 60;
      if (this.setTime) {
        clearInterval(this.setTime);
      }
      this.setTime = setInterval(() => {
        if (this.time - 1 == 0) {
          this.time = "";
          this.validText = "获取验证码";
          this.disabled = false;
          clearInterval(this.setTime);
        } else {
          this.time--;
        }
      }, 1e3);
    },
    onGetValidCode() {
      let that = this;
      if (that.disabled || !that.validMobile()) {
        return;
      }
      that.validCode = that.getVerificationCode(4);
      that.disabled = true;
      that.validText = that.validCode;
    },
    onChangeCheck: function(e) {
      this.checked = e.detail.value;
    },
    onLogin() {
      console.log("======onLogin");
      common_vendor.index.login({
        provider: "weixin",
        onlyAuthorize: true,
        success: (res) => {
          console.log("=====res", JSON.stringify(res));
          common_vendor.index.navigateTo({
            url: "/pages/personal/personalData"
          });
          common_vendor.index.request({
            url: "/login",
            method: "POST",
            data: { code: res == null ? void 0 : res.code },
            success: async (res2) => {
              var _a, _b, _c;
              await common_vendor.index.setStorageSync("user-token", (_a = res2 == null ? void 0 : res2.data) == null ? void 0 : _a.token);
              if ((_c = (_b = res2 == null ? void 0 : res2.data) == null ? void 0 : _b.userInfo) == null ? void 0 : _c.isNew) {
                common_vendor.index.navigateTo({
                  url: "/pages/personal/personalData"
                });
              } else {
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
        }
      });
    }
    //
  }
};
if (!Array) {
  const _component_logoVue = common_vendor.resolveComponent("logoVue");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_AuthLogin = common_vendor.resolveComponent("AuthLogin");
  (_component_logoVue + _easycom_uni_icons2 + _component_AuthLogin)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.mobile,
    b: common_vendor.o(($event) => $data.mobile = $event.detail.value),
    c: !!$data.mobile,
    d: common_vendor.o($options.onClearIcon),
    e: common_vendor.p({
      type: "closeempty",
      size: "20",
      color: $data.COLOR
    }),
    f: $data.code,
    g: common_vendor.o(($event) => $data.code = $event.detail.value),
    h: common_vendor.t(`${$data.time}${$data.validText}`),
    i: common_vendor.n({
      "code_btn_dis": !$data.mobile
    }),
    j: common_vendor.o((...args) => $options.onGetValidCode && $options.onGetValidCode(...args)),
    k: $data.COLOR,
    l: $data.COLOR,
    m: common_vendor.t("《用户隐私协议》"),
    n: common_vendor.o((...args) => $options.onChangeCheck && $options.onChangeCheck(...args)),
    o: common_vendor.o((...args) => $options.onLogin && $options.onLogin(...args)),
    p: common_vendor.p({
      checked: $data.checked
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/hejing/Documents/project/psychological-assessment/pages/login/index.vue"]]);
wx.createPage(MiniProgramPage);
