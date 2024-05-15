<template>
	<view class="persondata_container">
		<view class="title_block">
			<view class="main_title">欢迎来到心理测评小程序</view>
			<view class="main_title_desc">请完善信息，以便我们为您提供更好的服务</view>
		</view>
		<view class="info_block">
			<view class="sub_title">您的性别是？</view>
			<view class="sex_block">
				<view :class="['sex_block_item', { 'sex_block_item_active' : sex == 1 }]" @click="selectSex(1)">
					<image src="@/static/image/man.png" class="sex_block_item_icon" />
					<view :class="['sex_block_item_text', { 'sex_block_item_text_active' : sex == 1 }]">男</view>
				</view>
				<view :class="['sex_block_item', { 'sex_block_item_active' : sex == 2 }]" style="margin-left: 100rpx;" @click="selectSex(2)">
					<image src="@/static/image/women.png" class="sex_block_item_icon" />
					<view :class="['sex_block_item_text', { 'sex_block_item_text_active' : sex == 2 }]">女</view>
				</view>
			</view>
		</view>
		<view class="info_block">
			<view class="borth_block">
				<text class="borth_block_label">您的出生日期？</text>
				<view class="example-body">
					<uni-datetime-picker type="date" :end="new Date().getTime()" :clear-icon="!!borth" v-model="borth" @change="selectBorth" />
				</view>
			</view>
		</view>
		<view class="button_block">
			<button type="primary" style="width: 300rpx;" @click="submit">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sex: '',
				borth: '',
			}
		},
		methods: {
			selectSex(sex) {
				// console.log('====sex', sex);
				this.sex = sex;
			},
			selectBorth(borth) {
				// console.log('====borth', borth);
				this.borth = borth;
			},
			async submit() {
				console.log('====submit', this.sex, this.borth);
				if (!this.sex) {
					wx.showToast({
						title: '请选择性别！',
						icon: 'none'
					})
					return;
				}
				if (!this.borth) {
					wx.showToast({
						title: '请选择出生日期！',
						icon: 'none'
					})
					return;
				}
				const info = await uni.getStorageSync('user-info');
				const personInfo = JSON.parse(info || "");
				const userInfo = Object.assign({ gender: this.sex, borth: this.borth }, personInfo);
				await uni.setStorageSync('user-info', JSON.stringify(userInfo));
				wx.switchTab({
					url: '/pages/firstPage/index'
				})
				// 请求接口提交
				// uni.request({
				// 	url: '',
				// 	method: 'POST',
				// 	data: { sex: this.sex, borth: this.borth },
				// 	success: (res) => {
				// 		uni.switchTab({
				// 			url: '/pages/firstPage/index'
				// 		});
				// 	},
				// 	fail: (err) => {
				// 		wx.showToast({
				// 			title: err,
				// 			icon: 'none'
				// 		})
				// 	}
				// })
			}
			//
		}
	}
</script>

<style lang="scss">
.persondata_container{
	width: 100%;
	height: 100%;
	text-align: center;
	background-color: #FFFFFF;
	
	.title_block {
		padding-top: 20rpx;
		.main_title {
			font-size: 40rpx;
		}
		.main_title_desc {
			margin-top: 20rpx;
			font-size: 32rpx;
		}
	}
	.info_block {
		margin-top: 60rpx;
		text-align: center;
		
		.sub_title{
			color: #666666;
			font-size: 32rpx;
			font-weight: 500;
		}
		.sex_block {
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;	
			padding-top: 60rpx;
		}
		.sex_block_item {
			width: 180rpx;
			padding: 40rpx 0;
			border-radius: 10rpx;
			border: 2rpx solid #BBBBBB;
		}
		.sex_block_item_active {
			border: 2rpx solid $global-color;
		}
		.sex_block_item_icon {
			width: 60rpx;
			height: 60rpx;
			border-radius: 60rpx;
		}
		.sex_block_item_text {
			margin-top: 30rpx;
			color: #666666;
			font-size: 32rpx;
		}
		.sex_block_item_text_active{
			color: $global-color;
		}
		.borth_block {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			.borth_block_label {
				font-size: 28rpx;
			}
			.example-body {
				background-color: #fff;
				padding: 10px;
			}	
			.uni-date-editor--x {
				width: 300rpx;
			}
			.uni-date-x--border {
				// border: 2rpx solid $global-color;
			}	
			.uni-date-x input, .uniui-calendar, .uniui-clear {
				color: $global-color !important;
			}
		}

	}
}
.persondata_container .button_block {
	position: absolute;
	bottom: 200rpx;
	left: 50%;
	transform: translateX(-50%);
}
</style>
