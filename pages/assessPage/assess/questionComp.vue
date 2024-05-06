<template>
	<view class="question_container">
		<view class="question_top">
			<view class="question_number">{{`${number}/${total}`}}</view>
		</view>
		<scroll-view class="question_body">
			<view style="flex:1;background-color: #EEEEEE;padding: 10rpx 30rpx 80rpx 15rpx;">
				<view class="question_type">单选</view>
				<view class="question_title">{{info?.title}}</view>
				<view class="question_option">
					<view 
						:class="['question_option_item', option.value === selectOption.value ? 'question_option_item_active' : '']"
						v-for="(option, index) in info?.options"
						:key="`question_option_item_${index}`"
						@tap="onSelect(option)"
					>
						<view class="question_option_item_text">{{option?.content}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view v-if="isLast" class="question_bottom">
			<button class="question_bottom_btn" @click="handleSubmit">提交并完成测试</button>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['info', 'number', 'total', 'select', 'submit'],
		data() {
			return {
				selectOption: {},
				isLast: false,
			}
		},
		methods: {
			onSelect(option) {
				this.selectOption = { ...option };
				if (this.number === this.total) {
					this.handleSubmit(option);
				} else {
					setTimeout(()=>{
						this.selectOption = {};
						this.$emit('select', { question: this.info, selectOption: option });
					}, 200);
				}
			},
			handleSubmit(option) {
				uni.showModal({
					content: '是否提交并完成本次测评?',
					cancelText: '再看看',
					confirmText: '确定',
					success: (res)=>{
						if (res.confirm) {
							this.$emit('submit', { question: this.info, selectOption: option });
						} else if (res.cancel) {
							this.isLast = true;
							this.$emit('select', { question: this.info, selectOption: option });
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.question_container {
	// width: 100%;
	height: 100%;
	background: #FFFFFF;
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
	padding: 20rpx 40rpx;
	.question_top {
		.question_number {
			color: #333333;
			font-size: 28rpx;
		}
	}
	.question_body {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
		margin-top: 20rpx;
		// background-color: #EEEEEE;
		// padding: 10rpx 15rpx;
		.question_type {
			color: #333333;
			font-size: 22rpx;
		}
		.question_title {
			margin-top: 20rpx;
			color: #333333;
			font-size: 32rpx;
		}
		.question_option {
			.question_option_item {
				margin-top: 20rpx;
				height: 80rpx;
				text-align: center;
				border-radius: 5px;
				background-color: #FFFFFF;
			}
			.question_option_item_active {
				background-color: rgba(129, 211, 248, 1);
			}
			.question_option_item_text {
				color: #333333;
				font-size: 26rpx;
				line-height: 80rpx;
			}
		}
	}
	.question_bottom {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		margin-bottom: 20rpx;
		padding: 20rpx 0;
	}
	.question_bottom_btn {
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
