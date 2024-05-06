"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      personalInfo: {},
      defaultImg: "/static/default-img.png",
      infoOptions: []
    };
  },
  onLoad() {
    this.getPersonalInfo();
  },
  methods: {
    getPersonalInfo() {
      var _a, _b, _c;
      this.personalInfo = {
        icon: "",
        name: "kessiy",
        sex: 1,
        // 1是男，2是女
        borth: "2001-01-24"
      };
      this.infoOptions = [
        { label: "头像", icon: this.defaultImg, content: "" },
        { label: "昵称", icon: "", content: (_a = this.personalInfo) == null ? void 0 : _a.name },
        { label: "性别", icon: "", content: ((_b = this.personalInfo) == null ? void 0 : _b.sex) === 1 ? "男" : "女" },
        { label: "生日", icon: "", content: (_c = this.personalInfo) == null ? void 0 : _c.borth }
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f4876e48"], ["__file", "/Users/hejing/Documents/project/newProject/pages/personal/personalEdit.vue"]]);
wx.createPage(MiniProgramPage);
