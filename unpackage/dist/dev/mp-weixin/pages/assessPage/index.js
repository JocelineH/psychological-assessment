"use strict";
const common_vendor = require("../../common/vendor.js");
const assessList = () => "../../components/assess-list/assess-list.js";
const _sfc_main = {
  components: { assessList },
  data() {
    return {
      classifyList: [],
      classify: null,
      assesses: [],
      sort: "DESC",
      // AES 
      defaultImg: "/static/default-img.png"
    };
  },
  onLoad() {
    this.getClassifies();
  },
  methods: {
    // 获取轮播图
    async getClassifies() {
      this.classifyList = [
        { classify: 1, name: "全部" },
        { classify: 2, name: "性格" },
        { classify: 3, name: "情感" },
        { classify: 4, name: "事业" }
      ];
      this.selectClassify(this.classifyList[0]);
    },
    selectClassify(item) {
      this.classify = item.classify;
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
    gotoSearch() {
      common_vendor.index.navigateTo({
        url: "/pages/assessPage/search"
      });
    },
    onChangeSort() {
      if (this.sort === "DESC") {
        this.sort = "AES";
      } else if (this.sort === "AES") {
        this.sort = "DESC";
      }
      this.getAssessList();
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
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_assess_list2 = common_vendor.resolveComponent("assess-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_icons2 + _easycom_assess_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_assess_list = () => "../../components/assess-list/assess-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_icons + _easycom_assess_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.classifyList, (item, index, i0) => {
      return {
        a: common_vendor.n(item.classify === $data.classify ? "classify_list_item_line_active" : ""),
        b: common_vendor.t(item.name),
        c: common_vendor.n(item.classify === $data.classify ? "classify_list_item_text_active" : ""),
        d: common_vendor.o(($event) => $options.selectClassify(item), `classify_list_${index}`),
        e: `classify_list_${index}`,
        f: "a2119270-1-" + i0 + ",a2119270-0"
      };
    }),
    b: common_vendor.p({
      border: false
    }),
    c: common_vendor.p({
      border: false
    }),
    d: common_vendor.o($options.gotoSearch),
    e: common_vendor.p({
      type: "search",
      size: "20",
      color: _ctx.COLOR
    }),
    f: $data.sort === "DESC" ? "/static/image/arrow_down.png" : "/static/image/arrow_up.png",
    g: common_vendor.o((...args) => $options.onChangeSort && $options.onChangeSort(...args)),
    h: common_vendor.o($options.gotoItem),
    i: common_vendor.p({
      assessList: $data.assesses
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/hejing/Documents/project/newProject/pages/assessPage/index.vue"]]);
wx.createPage(MiniProgramPage);
