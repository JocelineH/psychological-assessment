"use strict";
const common_vendor = require("../../../common/vendor.js");
const resultComp = () => "./resultComp.js";
const _sfc_main = {
  components: { resultComp },
  props: ["assessId"],
  data() {
    return {
      reportInfo: {},
      // defaultImg: '/static/default-img.png',
      showPay: false,
      payAmount: null
    };
  },
  onLoad() {
    console.log("======report", this.assessId);
    this.getReportInfo();
  },
  methods: {
    // 根据this.assessId获取测评信息
    async getReportInfo() {
      this.reportInfo = {
        id: "123456",
        name: "测试报告",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.",
        desc: "说明:图文报告"
      };
      this.showPay = true;
      this.payAmount = 20;
    },
    gotoPay() {
      const res = {
        appId: "123",
        // 微信开发者平台的appId，用于支付签名验证
        nonceStr: "ruy3iifhndjkszf",
        // 随机字符串，用于支付签名验证
        timeStamp: (/* @__PURE__ */ new Date()).valueOf(),
        // 时间戳，用于支付签名验证
        package: "package",
        // 固定值，统一下单接口返回的 prepay_id 参数值，用于发起微信支付
        signType: "MD5",
        // 固定值，签名类型，目前支持 MD5 和 HMAC-SHA256，默认为 MD5
        paySign: "fyueiowafje"
        // 签名
      };
      common_vendor.index.requestPayment({
        provider: "wxpay",
        timeStamp: res == null ? void 0 : res.timeStamp,
        nonceStr: res == null ? void 0 : res.nonceStr,
        package: res == null ? void 0 : res.package,
        signType: res == null ? void 0 : res.signType,
        paySign: res == null ? void 0 : res.paySign,
        success: function(res2) {
          common_vendor.index.showToast({
            title: "支付成功",
            icon: "none"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 2e3);
        },
        fail: function(err) {
          common_vendor.index.showToast({
            title: "支付失败",
            icon: "none"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack({
              delta: 2
            });
          }, 2e3);
        }
      });
    }
    //
  }
};
if (!Array) {
  const _component_result_comp = common_vendor.resolveComponent("result-comp");
  _component_result_comp();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      info: $data.reportInfo
    }),
    b: $data.showPay
  }, $data.showPay ? {
    c: common_vendor.t(`${$data.payAmount ?? "?"}元 解锁深度解读`),
    d: common_vendor.o((...args) => $options.gotoPay && $options.gotoPay(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/hejing/Documents/project/psychological-assessment/pages/assessPage/report/index.vue"]]);
wx.createPage(MiniProgramPage);
