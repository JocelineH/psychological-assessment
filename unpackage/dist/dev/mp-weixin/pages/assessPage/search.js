"use strict";
const common_vendor = require("../../common/vendor.js");
const assessList = () => "../../components/assess-list/assess-list.js";
const _sfc_main = {
  components: { assessList },
  data() {
    return {
      keyWord: "",
      assesses: []
    };
  },
  methods: {
    onClearIcon() {
      this.keyWord = "";
    },
    handleConfirm() {
      console.log("=====key", this.keyWord);
      this.getAssessList();
    },
    // 获取分类下的测评列表
    async getAssessList() {
      this.assesses = [
        { id: 1, icon: "/static/c1.png", name: "IQ智商测试", desc: "用于测试一个人的智商", url: "" },
        { id: 2, icon: "/static/c2.png", name: "EQ情商测试", desc: "用于测试一个人的智商", url: "" },
        { id: 3, icon: "/static/c3.png", name: "九宫格测试", desc: "用于测试一个人的智商", url: "" },
        { id: 4, icon: "/static/c4.png", name: "颜色性格测试", desc: "用于测试一个人的智商", url: "" },
        { id: 5, icon: "/static/c5.png", name: "MBTI测试", desc: "用于测试一个人的智商", url: "" }
      ];
    },
    gotoItem(item) {
      console.log("====item", item == null ? void 0 : item.url);
      if (!(item == null ? void 0 : item.url)) {
        return;
      }
      common_vendor.index.navigateTo({
        url: `/pages/assessPage/assess/index?assessId=${item == null ? void 0 : item.id}`
        //  item?.url
      });
    }
    //
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_assess_list2 = common_vendor.resolveComponent("assess-list");
  (_easycom_uni_icons2 + _easycom_assess_list2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_assess_list = () => "../../components/assess-list/assess-list.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_assess_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleConfirm && $options.handleConfirm(...args)),
    b: $data.keyWord,
    c: common_vendor.o(($event) => $data.keyWord = $event.detail.value),
    d: !!$data.keyWord,
    e: common_vendor.o($options.onClearIcon),
    f: common_vendor.p({
      type: "closeempty",
      size: "16",
      color: _ctx.COLOR
    }),
    g: common_vendor.o($options.handleConfirm),
    h: common_vendor.p({
      type: "search",
      size: "20",
      color: _ctx.COLOR
    }),
    i: common_vendor.o($options.gotoItem),
    j: common_vendor.p({
      assessList: $data.assesses
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/hejing/Documents/project/newProject/pages/assessPage/search.vue"]]);
wx.createPage(MiniProgramPage);
