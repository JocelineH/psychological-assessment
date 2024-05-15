"use strict";
const common_vendor = require("../../common/vendor.js");
const assessList = () => "../../components/assess-list/assess-list.js";
const _sfc_main = {
  components: { assessList },
  data() {
    return {
      indicatorDots: true,
      autoplay: false,
      interval: 0,
      duration: 500,
      bannerImgs: [],
      hotRemmends: [],
      cherryPicks: [],
      defaultImg: "/static/default-img.png"
    };
  },
  onLoad() {
    this.getBannerImgs();
    this.getHotRemmend();
    this.getCherryPick();
  },
  methods: {
    // 获取轮播图
    async getBannerImgs() {
      var _a;
      this.bannerImgs = [
        "",
        "https://img0.baidu.com/it/u=1033018635,7901815&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500",
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F7325191%2F999fd8bb163bd74ccf8e1cd307fa4304.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvNzMyNTE5MS85OTlmZDhiYjE2M2JkNzRjY2Y4ZTFjZDMwN2ZhNDMwNC5qcGc%3D%2Fsign%2Fde3b8de18ba400d9187e70d3e35de944.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1716550282&t=10bb830e9e3849e4c9d3aa03fe61bc0e",
        "https://img1.baidu.com/it/u=3353985195,2581327310&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500"
      ];
      this.interval = Math.round(((_a = this.bannerImgs) == null ? void 0 : _a.length) * this.duration);
    },
    // 获取热门推荐
    async getHotRemmend() {
      this.hotRemmends = [
        { id: 1, icon: "/static/c1.png", name: "IQ智商测试", url: "" },
        { id: 2, icon: "/static/c2.png", name: "EQ情商测试", url: "" },
        { id: 3, icon: "/static/c3.png", name: "九宫格测试", url: "" },
        { id: 4, icon: "/static/c4.png", name: "颜色性格测试", url: "" },
        { id: 5, icon: "/static/c5.png", name: "MBTI测试", url: "" }
      ];
    },
    // 获取精选测评
    async getCherryPick() {
      this.cherryPicks = [
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
  const _easycom_assess_list2 = common_vendor.resolveComponent("assess-list");
  _easycom_assess_list2();
}
const _easycom_assess_list = () => "../../components/assess-list/assess-list.js";
if (!Math) {
  _easycom_assess_list();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.bannerImgs, (item, index, i0) => {
      return common_vendor.e({
        a: !!item
      }, !!item ? {
        b: item
      } : {
        c: $data.defaultImg
      }, {
        d: `swiperimg_${index}`
      });
    }),
    b: $data.autoplay,
    c: $data.interval,
    d: $data.duration,
    e: common_vendor.f($data.hotRemmends, (item, index, i0) => {
      return common_vendor.e({
        a: !!(item == null ? void 0 : item.icon)
      }, !!(item == null ? void 0 : item.icon) ? {
        b: item.icon,
        c: index !== 0 ? "20rpx" : "0rpx"
      } : {
        d: $data.defaultImg
      }, {
        e: common_vendor.t(item == null ? void 0 : item.name),
        f: `hotRemmends_${index}`,
        g: common_vendor.o(($event) => $options.gotoItem(item), `hotRemmends_${index}`)
      });
    }),
    f: common_vendor.o($options.gotoItem),
    g: common_vendor.p({
      assessList: $data.cherryPicks
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f18b3c3f"], ["__file", "/Users/hejing/Documents/project/psychological-assessment/pages/firstPage/index.vue"]]);
wx.createPage(MiniProgramPage);
