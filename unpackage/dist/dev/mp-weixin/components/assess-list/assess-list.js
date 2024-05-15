"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "assessList",
  props: ["assessList", "onClick"],
  data() {
    return {
      assesses: [],
      defaultImg: "/static/default-img.png"
    };
  },
  onLoad() {
  },
  methods: {
    onClickItem(item) {
      console.log("====comp item", item == null ? void 0 : item.url, item == null ? void 0 : item.id);
      common_vendor.index.navigateTo({
        url: `/pages/assessPage/assess/index?assessId=${item == null ? void 0 : item.id}`
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.assessList, (item, index, i0) => {
      return common_vendor.e({
        a: !!(item == null ? void 0 : item.icon)
      }, !!(item == null ? void 0 : item.icon) ? {
        b: item.icon
      } : {
        c: $data.defaultImg
      }, {
        d: common_vendor.o(($event) => $options.onClickItem(item), `assess_list_${index}`),
        e: `assess_list_${index}`,
        f: "78f513a8-1-" + i0 + ",78f513a8-0",
        g: common_vendor.p({
          title: item.name,
          note: item.desc,
          border: false
        })
      });
    }),
    b: common_vendor.p({
      border: false
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/hejing/Documents/project/psychological-assessment/components/assess-list/assess-list.vue"]]);
wx.createComponent(Component);
