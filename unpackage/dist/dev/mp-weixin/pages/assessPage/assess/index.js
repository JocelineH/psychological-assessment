"use strict";
const common_vendor = require("../../../common/vendor.js");
const questionComp = () => "./questionComp.js";
const _sfc_main = {
  components: { questionComp },
  props: ["assessId"],
  data() {
    return {
      assessInfo: {},
      defaultImg: "/static/default-img.png",
      showQuestion: false,
      number: 1,
      total: 0,
      isLast: false,
      question: {
        title: "",
        type: "single",
        options: []
      }
    };
  },
  onLoad() {
    console.log("======assess", this.assessId);
    this.getAssessInfo();
  },
  methods: {
    // 获取测评信息
    async getAssessInfo() {
      this.assessInfo = {
        icon: "/static/c1.png",
        name: "性格色彩测试",
        introduce: "性格色彩测试是一种心理评估工具，旨在帮助个人深入了解自己的性格特质、偏好和行为模式。通过系列精心设计的问题，参与者可以在多个层面上探索自己的性格构成，包括人生观、决策方式、情感反应、人际关系和工作态度等。\n本测试意在揭示每个人独特的性格色彩组合，让参与者认识到自己在不同情境下可能的反应和倾向。此外，测试结果可以作为自我提升的依据，帮助参与者在个人和职业生活中做出更适合自己性格的选择。"
      };
    },
    startAssess() {
      this.number = 1;
      this.showQuestion = true;
      this.getAssessQuestion();
    },
    getAssessQuestion() {
      this.total = 3;
      this.question = {
        title: "如果爬山旅游，大多数状况下，在下山回来的路线我最可能:",
        type: "single",
        options: [
          { value: "A", content: "好玩有趣，所以宁愿新路线回巢" },
          { value: "B", content: "安全稳妥，所以宁愿原路线返回" },
          { value: "C", content: "挑战闲难，所以宁愿新路线回巢" },
          { value: "D", content: "方便省心，所以宁愿原路线返回" }
        ]
      };
      this.isLast = this.number === this.total;
    },
    gotoNext({ question, selectOption }) {
      console.log("====question", question, selectOption);
      if (this.isLast) {
        return;
      } else {
        this.number++;
        this.getAssessQuestion();
      }
    },
    onSubmit() {
      console.log("=====onSubmit");
      {
        common_vendor.index.navigateTo({
          url: `/pages/assessPage/report/index?assessId=${this.assessId}`
        });
      }
    }
    //
  }
};
if (!Array) {
  const _component_question_comp = common_vendor.resolveComponent("question-comp");
  _component_question_comp();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e;
  return common_vendor.e({
    a: !$data.showQuestion
  }, !$data.showQuestion ? common_vendor.e({
    b: !!((_a = $data.assessInfo) == null ? void 0 : _a.icon)
  }, !!((_b = $data.assessInfo) == null ? void 0 : _b.icon) ? {
    c: $data.assessInfo.icon
  } : {
    d: $data.defaultImg
  }, {
    e: common_vendor.t((_c = $data.assessInfo) == null ? void 0 : _c.name),
    f: common_vendor.t((_e = (_d = $data.assessInfo) == null ? void 0 : _d.introduce) == null ? void 0 : _e.replace(/\\n/g, "\n")),
    g: common_vendor.o((...args) => $options.startAssess && $options.startAssess(...args))
  }) : {
    h: common_vendor.o($options.gotoNext),
    i: common_vendor.o($options.onSubmit),
    j: common_vendor.p({
      info: $data.question,
      number: $data.number,
      total: $data.total
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/hejing/Documents/project/psychological-assessment/pages/assessPage/assess/index.vue"]]);
wx.createPage(MiniProgramPage);
