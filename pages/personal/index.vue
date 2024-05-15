<template>
	<view class="personalPage_container">
		<view class="personalPage_top">
			<view class="personalPage_top_info">
				<view class="personalPage_top_left">
					<image v-if="!!personalInfo?.avatarUrl" class="personalPage_top_left_img" :src="personalInfo.avatarUrl"/>
					<image v-else class="personalPage_top_left_img" :src="defaultImg" />
				</view>
				<view class="personalPage_top_center">{{personalInfo?.nickName}}</view>
				<view class="personalPage_top_right" @click="gotoEdit">
					<image class="personalPage_top_edit_img" src="/static/image/edit.png"/>
				</view>
			</view>
			<view class="personalPage_top_total">{{`共有${personalInfo?.total || '-'}个测评报告`}}</view>
		</view>
		<scroll-view class="personalPage_body" scroll-top="scrollTop" scroll-y="true">
			<uni-list :border="false">
				<uni-list-item
					v-for="(item, index) in myAssessList"
					:key="`my_assess_list_${index}`"
					:border="false"
				>
					<template v-slot:body>
						<view class="my_assess_list_item">
							<view class="my_assess_list_item_info">
								<view class="my_assess_list_item_left">
									<image v-if="!!item?.icon" class="my_assess_list_item_left_img" :src="item.icon"/>
									<image v-else class="my_assess_list_item_left_img" :src="defaultImg" />
								</view>
								<view class="my_assess_list_item_center">
									<view class="my_assess_list_item_center_text">{{item?.name}}</view>
									<view class="my_assess_list_item_center_text2">{{item?.desc}}</view>
								</view> 
								<view class="my_assess_list_item_right" @click="gotoReport">
									<view class="my_assess_list_item_right_show">查看报告</view>
									<view v-if="item?.hasPay" class="my_assess_list_item_right_pay">深度</view>
								</view>
							</view>
							<view class="my_assess_list_item_time">{{`测评时间:${formatTime(item?.time)}`}}</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				personalInfo: {},
				defaultImg: '/static/default-img.png',
				myAssessList: [],
			}
		},
		onLoad() {
			this.getPersonalInfo();
		},
		methods: {
			async getPersonalInfo() {
				const info = await uni.getStorageSync('user-info');
				const personInfo = JSON.parse(info || "");
				this.personalInfo = { ...personInfo };
				this.getMyAssessList();
			},
			getMyAssessList() {
				this.personalInfo.total = 20;
				this.myAssessList = [
					{ id: 1, icon: '/static/c1.png', name: 'IQ智商测试', desc: '用于测试一个人的智商', time: 1704081600000, url: '' },
					{ id: 2, icon: '/static/c2.png', name: 'EQ情商测试', desc: '用于测试一个人的智商', time: 1704081600000, hasPay: true, url: '' },
					{ id: 3, icon: '/static/c3.png', name: '九宫格测试', desc: '用于测试一个人的智商', time: 1704081600000, url: '' },
					{ id: 4, icon: '/static/c4.png', name: '颜色性格测试', desc: '用于测试一个人的智商', time: 1704081600000, url: '' },
					{ id: 5, icon: '/static/c5.png', name: 'MBTI测试', desc: '用于测试一个人的智商', time: 1704081600000, url: '' },
				];
			},
			formatTime(timestamp) {
			  const date = new Date(timestamp);
			  const year = date.getFullYear();
			  const month = (date.getMonth() + 1).toString().padStart(2, '0');
			  const day = date.getDate().toString().padStart(2, '0');
			  const hours = date.getHours().toString().padStart(2, '0');
			  const minutes = date.getMinutes().toString().padStart(2, '0');
			  const seconds = date.getSeconds().toString().padStart(2, '0');
			  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
			},
			gotoEdit() {
				uni.navigateTo({
					url: `/pages/personal/personalEdit`
				})
			},
			gotoReport() {
				uni.navigateTo({
					url: `/pages/assessPage/report/index?assessId=${this.assessId}`
				})
			}
			//
		}
	}
</script>

<style scoped lang="scss">
.personalPage_container {
	// width: 100%;
	height: 100%;
	background: #FFFFFF;
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
	padding: 20rpx 40rpx;
	.personalPage_top {
		// width: 100%;
		display: flex;
		flex-direction: column;
		padding: 30rpx 10rpx;
		background-color: #EEEEEE;
		.personalPage_top_info {
			// width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.personalPage_top_left {
				display: flex;
				flex-direction: row;
				align-items: center;
				.personalPage_top_left_img {
					width: 150rpx;
					height: 120rpx;
				}
				.personalPage_top_left_text {
					color: #333333;
					font-size: 32rpx;
				}
			}
			.personalPage_top_center {
				display: flex;
				flex: 1;
				margin-left: 20rpx;
			}
			.personalPage_top_right {
				width: 50rpx;
				.personalPage_top_edit_img {
					width: 40rpx;
					height: 40rpx;
				}
			}
		}
		.personalPage_top_total {
			margin-top: 30rpx;
			color: #333333;
			font-size: 32rpx;
		}
	}
	.personalPage_body {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-height: 0;
		margin-top: 30rpx;
		.my_assess_list_item {
			// width: 100%;
			display: flex;
			flex: 1;
			flex-direction: column;
			padding: 30rpx 10rpx;
			.my_assess_list_item_info {
				// width: 100%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				.my_assess_list_item_left {
					display: flex;
					flex-direction: row;
					align-items: center;
					.my_assess_list_item_left_img {
						width: 120rpx;
						height: 100rpx;
					}
				}
				.my_assess_list_item_center {
					display: flex;
					flex: 1;
					flex-direction: column;
					margin-left: 20rpx;
					.my_assess_list_item_center_text {
						color: #333333;
						font-size: 36rpx;
					}
					.my_assess_list_item_center_text2 {
						margin-top: 20rpx;
						color: #333333;
						font-size: 28rpx;
					}
				}
				.my_assess_list_item_right {
					display: flex;
					flex-direction: column;
					justify-content: center;
					height: 70rpx;
					padding-right: 40rpx;
					position: relative;
					.my_assess_list_item_right_show {
						color: #333333;
						font-size: 32rpx;
						background-color: #EEEEEE;
					}
					.my_assess_list_item_right_pay {
						position: absolute;
						top: 0;
						right: 0;
						color: #D9001B;
						font-size: 24rpx;
					}
				}
			}
			.my_assess_list_item_time {
				margin-top: 20rpx;
				color: #333333;
				font-size: 22rpx;
			}
		}
	}
}
.personalPage_body .uni-list-item__container {
	padding: 0 !important;
}
</style>
