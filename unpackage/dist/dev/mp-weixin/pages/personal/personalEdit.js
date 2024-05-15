"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      defaultImg: "/static/default-img.png",
      infoOptions: []
    };
  },
  onLoad() {
    this.getPersonalInfo();
  },
  methods: {
    async getPersonalInfo() {
      const info = await common_vendor.index.getStorageSync("user-info");
      const personInfo = JSON.parse(info || "");
      const { avatarUrl, nickName, gender, borth } = personInfo || {};
      this.infoOptions = [
        { label: "头像", icon: avatarUrl || this.defaultImg, content: "" },
        { label: "昵称", icon: "", content: nickName },
        { label: "性别", icon: "", content: gender ? gender === 1 ? "男" : "女" : "-" },
        { label: "生日", icon: "", content: borth || "-" }
      ];
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.infoOptions, (option, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(option == null ? void 0 : option.label),
        b: option == null ? void 0 : option.icon
      }, (option == null ? void 0 : option.icon) ? {
        c: option.icon
      } : {
        d: common_vendor.t(option == null ? void 0 : option.content)
      }, {
        e: `personal_edit_${index}`
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f4876e48"], ["__file", "/Users/hejing/Documents/project/psychological-assessment/pages/personal/personalEdit.vue"]]);
wx.createPage(MiniProgramPage);
