"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: ["info"],
  data() {
    return {};
  },
  methods: {}
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e;
  return {
    a: common_vendor.t((_a = $props.info) == null ? void 0 : _a.name),
    b: common_vendor.t(`NO.${(_b = $props.info) == null ? void 0 : _b.id}`),
    c: common_vendor.t((_d = (_c = $props.info) == null ? void 0 : _c.content) == null ? void 0 : _d.replace(/\\n/g, "\n")),
    d: common_vendor.t((_e = $props.info) == null ? void 0 : _e.desc)
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-86f87183"], ["__file", "/Users/hejing/Documents/project/newProject/pages/assessPage/report/resultComp.vue"]]);
wx.createComponent(Component);
