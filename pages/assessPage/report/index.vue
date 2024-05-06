<template>
	<view class="report_container">
		<result-comp class="report_body" :info="reportInfo" />
		<view v-if="showPay" class="report_bottom">
			<button class="report_bottom_btn" @click="gotoPay">{{`${payAmount ?? '?'}元 解锁深度解读`}}</button>
		</view>
	</view>
</template>

<script>
	import resultComp from './resultComp.vue';
	export default {
		components: { resultComp },
		props: ['assessId'],
		data() {
			return {
				reportInfo: {},
				// defaultImg: '/static/default-img.png',
				showPay: false,
				payAmount: null,
			}
		},
		onLoad() {
			console.log('======report', this.assessId)
			this.getReportInfo();
		},
		methods: {
			// 根据this.assessId获取测评信息
			async getReportInfo() {
				// 通过this.classify、this.sort获取
				this.reportInfo = {
					id: '123456',
					name: '测试报告', 
					content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.',
					desc: '说明:图文报告', 
				};
				this.showPay = true;
				this.payAmount = 20;
				// this.$forceUpdate()
			},
			gotoPay() {
			}
			//
		}
	}
</script>

<style lang="scss">
.report_container{
	width: 100%;
	height: 100%;
	background: #FFFFFF;
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
	.report_body {
		display: flex;
		flex: 1;
		min-height: 0;
	}
	.report_bottom {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		margin-bottom: 80rpx;
		padding: 20rpx 0;
	}
	.report_bottom_btn {
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
