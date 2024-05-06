<template>
	<view class="result_container">
		<view class="result_top">
			<view class="result_title">{{info?.name}}</view>
			<view class="result_id">{{`NO.${info?.id}`}}</view>
		</view>
		<scroll-view class="result_body">
			<view class="result_cont">{{info?.content?.replace(/\\n/g, '\n')}}</view>
			<view class="result_desc">{{info?.desc}}</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: ['info'],
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style scoped lang="scss">
.result_container {
	// width: 100%;
	// height: 100%;
	background: #FFFFFF;
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
	padding: 20rpx 40rpx;
	.result_top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		.result_title {
			color: #333333;
			font-size: 40rpx;
			font-weight: 650;
		}
		.result_id {
			color: #333333;
			font-size: 32rpx;
		}
	}
	.result_body {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
		// background-color: #FFFFFF;
		padding: 10rpx 15rpx;
		.result_cont {
			color: #333333;
			font-size: 24rpx;
			white-space: break-spaces;
		}
		.result_desc {
			color: #333333;
			font-size: 24rpx;
		}
	}
}
</style>
