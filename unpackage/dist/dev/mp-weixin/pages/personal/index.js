"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      personalInfo: {},
      defaultImg: "/static/default-img.png",
      myAssessList: []
    };
  },
  onLoad() {
    this.getPersonalInfo();
  },
  methods: {
    getPersonalInfo() {
      this.personalInfo = {
        icon: "",
        name: "kessiy",
        total: 20
      };
      this.getMyAssessList();
    },
    getMyAssessList() {
      this.myAssessList = [
        { id: 1, icon: "/static/c1.png", name: "IQ智商测试", desc: "用于测试一个人的智商", time: 17040816e5, url: "" },
        { id: 2, icon: "/static/c2.png", name: "EQ情商测试", desc: "用于测试一个人的智商", time: 17040816e5, hasPay: true, url: "" },
        { id: 3, icon: "/static/c3.png", name: "九宫格测试", desc: "用于测试一个人的智商", time: 17040816e5, url: "" },
        { id: 4, icon: "/static/c4.png", name: "颜色性格测试", desc: "用于测试一个人的智商", time: 17040816e5, url: "" },
        { id: 5, icon: "/static/c5.png", name: "MBTI测试", desc: "用于测试一个人的智商", time: 17040816e5, url: "" }
      ];
    },
    formatTime(timestamp) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    gotoEdit() {
      common_vendor.index.navigateTo({
        url: `/pages/personal/personalEdit`
      });
    },
    gotoReport() {
      common_vendor.index.navigateTo({
        url: `/pages/assessPage/report/index?assessId=${this.assessId}`
      });
    }
    //
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
  var _a, _b, _c, _d;
  return common_vendor.e({
    a: !!((_a = $data.personalInfo) == null ? void 0 : _a.icon)
  }, !!((_b = $data.personalInfo) == null ? void 0 : _b.icon) ? {
    b: $data.personalInfo.icon
  } : {
    c: $data.defaultImg
  }, {
    d: common_vendor.t((_c = $data.personalInfo) == null ? void 0 : _c.name),
    e: common_vendor.o((...args) => $options.gotoEdit && $options.gotoEdit(...args)),
    f: common_vendor.t(`共有${((_d = $data.personalInfo) == null ? void 0 : _d.total) || "-"}个测评报告`),
    g: common_vendor.f($data.myAssessList, (item, index, i0) => {
      return common_vendor.e({
        a: !!(item == null ? void 0 : item.icon)
      }, !!(item == null ? void 0 : item.icon) ? {
        b: item.icon
      } : {
        c: $data.defaultImg
      }, {
        d: common_vendor.t(item == null ? void 0 : item.name),
        e: common_vendor.t(item == null ? void 0 : item.desc),
        f: item == null ? void 0 : item.hasPay
      }, (item == null ? void 0 : item.hasPay) ? {} : {}, {
        g: common_vendor.o((...args) => $options.gotoReport && $options.gotoReport(...args), `my_assess_list_${index}`),
        h: common_vendor.t(`测评时间:${$options.formatTime(item == null ? void 0 : item.time)}`),
        i: `my_assess_list_${index}`,
        j: "3327436b-1-" + i0 + ",3327436b-0"
      });
    }),
    h: common_vendor.p({
      border: false
    }),
    i: common_vendor.p({
      border: false
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-3327436b"], ["__file", "/Users/hejing/Documents/project/newProject/pages/personal/index.vue"]]);
wx.createPage(MiniProgramPage);
