"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: ["info", "number", "total", "select", "submit"],
  data() {
    return {
      selectOption: {},
      isLast: false
    };
  },
  methods: {
    onSelect(option) {
      this.selectOption = { ...option };
      if (this.number === this.total) {
        this.handleSubmit(option);
      } else {
        setTimeout(() => {
          this.selectOption = {};
          this.$emit("select", { question: this.info, selectOption: option });
        }, 200);
      }
    },
    handleSubmit(option) {
      common_vendor.index.showModal({
        content: "是否提交并完成本次测评?",
        cancelText: "再看看",
        confirmText: "确定",
        success: (res) => {
          if (res.confirm) {
            this.$emit("submit", { question: this.info, selectOption: option });
          } else if (res.cancel) {
            this.isLast = true;
            this.$emit("select", { question: this.info, selectOption: option });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b;
  return common_vendor.e({
    a: common_vendor.t(`${$props.number}/${$props.total}`),
    b: common_vendor.t((_a = $props.info) == null ? void 0 : _a.title),
    c: common_vendor.f((_b = $props.info) == null ? void 0 : _b.options, (option, index, i0) => {
      return {
        a: common_vendor.t(option == null ? void 0 : option.content),
        b: common_vendor.n(option.value === $data.selectOption.value ? ".question_option_item_active" : ""),
        c: `question_option_item_${index}`,
        d: common_vendor.o(($event) => $options.onSelect(option), `question_option_item_${index}`)
      };
    }),
    d: $data.isLast
  }, $data.isLast ? {
    e: common_vendor.o((...args) => $options.handleSubmit && $options.handleSubmit(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-2b46fc9a"], ["__file", "/Users/hejing/Documents/project/newProject/pages/assessPage/assess/questionComp.vue"]]);
wx.createComponent(Component);
