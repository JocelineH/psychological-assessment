"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      sex: "",
      borth: ""
    };
  },
  methods: {
    selectSex(sex) {
      this.sex = sex;
    },
    selectBorth(borth) {
      this.borth = borth;
    },
    submit() {
      console.log("====submit", this.sex, this.borth);
      if (!this.sex) {
        common_vendor.wx$1.showToast({
          title: "请选择性别！",
          icon: "none"
        });
        return;
      }
      if (!this.borth) {
        common_vendor.wx$1.showToast({
          title: "请选择出生日期！",
          icon: "none"
        });
        return;
      }
      common_vendor.wx$1.switchTab({
        url: "/pages/firstPage/index"
      });
    }
    //
  }
};
if (!Array) {
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  _easycom_uni_datetime_picker2();
}
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
if (!Math) {
  _easycom_uni_datetime_picker();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.n({
      "sex_block_item_text_active": $data.sex == 1
    }),
    c: common_vendor.n({
      "sex_block_item_active": $data.sex == 1
    }),
    d: common_vendor.o(($event) => $options.selectSex(1)),
    e: common_assets._imports_1,
    f: common_vendor.n({
      "sex_block_item_text_active": $data.sex == 2
    }),
    g: common_vendor.n({
      "sex_block_item_active": $data.sex == 2
    }),
    h: common_vendor.o(($event) => $options.selectSex(2)),
    i: common_vendor.o($options.selectBorth),
    j: common_vendor.o(($event) => $data.borth = $event),
    k: common_vendor.p({
      type: "date",
      end: (/* @__PURE__ */ new Date()).getTime(),
      ["clear-icon"]: !!$data.borth,
      modelValue: $data.borth
    }),
    l: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/hejing/Documents/project/newProject/pages/personal/personalData.vue"]]);
wx.createPage(MiniProgramPage);
