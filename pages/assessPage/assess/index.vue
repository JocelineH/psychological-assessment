<template>
	<view class="assess_container">
		<template v-if="!showQuestion">
			<view class="assess_top">
				<image v-if="!!assessInfo?.icon" class="assess_img" :src="assessInfo.icon"/>
				<image v-else class="assess_img" :src="defaultImg" />
				<view class="assess_title">{{assessInfo?.name}}</view>
			</view>
			<scroll-view class="assess_body" scroll-top="scrollTop" scroll-y="true">
				<view class="assess_body_title">测评介绍</view>
				<view class="assess_body_text">{{assessInfo?.introduce?.replace(/\\n/g, '\n')}}</view>
			</scroll-view>
			<view class="assess_bottom">
				<button class="assess_bottom_btn" @click="startAssess">开始测试</button>
			</view>
		</template>
		<template v-else>
			<question-comp 
				:info="question" 
				:number="number" 
				:total="total" 
				@select="gotoNext"
				@submit="onSubmit"
			/>
		</template>
	</view>
</template>

<script>
	import questionComp from './questionComp.vue';
	export default {
		components: { questionComp },
		props: ['assessId'],
		data() {
			return {
				assessInfo: {},
				defaultImg: '/static/default-img.png',
				showQuestion: false,
				number: 1,
				total: 0,
				isLast: false,
				question: {
					title: '',
					type: 'single',
					options: [],
				},
			}
		},
		onLoad() {
			console.log('======assess', this.assessId)
			this.getAssessInfo();
		},
		methods: {
			// 获取测评信息
			async getAssessInfo() {
				// 通过this.classify、this.sort获取
				this.assessInfo = {
					icon: '/static/c1.png', 
					name: '性格色彩测试', 
					introduce: '性格色彩测试是一种心理评估工具，旨在帮助个人深入了解自己的性格特质、偏好和行为模式。通过系列精心设计的问题，参与者可以在多个层面上探索自己的性格构成，包括人生观、决策方式、情感反应、人际关系和工作态度等。\n本测试意在揭示每个人独特的性格色彩组合，让参与者认识到自己在不同情境下可能的反应和倾向。此外，测试结果可以作为自我提升的依据，帮助参与者在个人和职业生活中做出更适合自己性格的选择。', 
				};
				// this.$forceUpdate()
			},
			startAssess() {
				this.number = 1;
				this.showQuestion = true;
				this.getAssessQuestion();
			},
			getAssessQuestion() {
				// 根据this.number获取题目信息
				this.total = 3;
				this.question = {
					title: '如果爬山旅游，大多数状况下，在下山回来的路线我最可能:',
					type: 'single',
					options: [
						{ value: 'A', content: '好玩有趣，所以宁愿新路线回巢' },
						{ value: 'B', content: '安全稳妥，所以宁愿原路线返回' },
						{ value: 'C', content: '挑战闲难，所以宁愿新路线回巢' },
						{ value: 'D', content: '方便省心，所以宁愿原路线返回' },
					]
				};
				this.isLast = this.number === this.total;
			},
			gotoNext({ question, selectOption }) {
				console.log('====question', question, selectOption);
				if (this.isLast){
					return;
				} else {
					this.number++;
					this.getAssessQuestion();
				}
			},
			onSubmit() {
				console.log('=====onSubmit');
				// 请求提交接口
				const res = { code: 0 };
				if (res?.code === 0) {
					uni.navigateTo({
						url: `/pages/assessPage/report/index?assessId=${this.assessId}`
					})
				}
			}
			//
		}
	}
</script>

<style lang="scss">
.assess_container{
	width: 100%;
	height: 100%;
	background: #FFFFFF;
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
	.assess_top {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		// border: 1px solid red;
		.assess_img {
			width: 320rpx;
			height: 260rpx;
		}
		.assess_title {
			margin-top: 10rpx;
			color: #333333;
			font-size: 32rpx;
		}
	}
	.assess_body {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
		margin-top: 30rpx;
		.assess_body_title {
			padding: 0 40rpx;
			color: #333333;
			font-size: 36rpx;
		}
		.assess_body_text {
			margin-top: 10rpx;
			padding: 0 40rpx;
			color: #333333;
			font-size: 26rpx;
			white-space: pre-wrap;
		}
	}
	.assess_bottom {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		margin-bottom: 80rpx;
		padding: 20rpx 0;
	}
	.assess_bottom_btn {
		height: 80rpx;
		color: #FFFFFF;
		font-size: 26rpx;
		text-align: center;
		line-height: 80rpx;
		border-radius: 5px;
		background-color: rgba(236, 128, 141, 1);
	}
}
</style>
