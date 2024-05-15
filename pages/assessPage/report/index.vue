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
				// 通过接口 获取微信支付参数信息
				const res = {
					appId: '123', // 微信开发者平台的appId，用于支付签名验证
					nonceStr: 'ruy3iifhndjkszf', // 随机字符串，用于支付签名验证
					timeStamp: new Date().valueOf(), // 时间戳，用于支付签名验证
					package: 'package', // 固定值，统一下单接口返回的 prepay_id 参数值，用于发起微信支付
					signType: 'MD5', // 固定值，签名类型，目前支持 MD5 和 HMAC-SHA256，默认为 MD5
					paySign: 'fyueiowafje' // 签名
				}
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: res?.timeStamp,
					nonceStr: res?.nonceStr,
					package: res?.package,
					signType: res?.signType,
					paySign: res?.paySign,
					success: function(res){
						uni.showToast({
							title: '支付成功',
							icon: 'none'
						})
						setTimeout(()=>{
							uni.navigateBack()
						}, 2000)
					},
					fail: function(err){
						uni.showToast({
							title: '支付失败',
							icon: 'none'
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta: 2
							})
						}, 2000)
					},
				})
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
