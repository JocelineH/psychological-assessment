<template>
	<view class="personaledit_container">
		<view class="info_row" v-for="(option, index) in infoOptions" :key="`personal_edit_${index}`">
			<view class="info_row_label">{{option?.label}}</view>
			<view class="info_row_info">
				<view class="info_row_content">
					<image v-if="option?.icon" class="info_row_content_img" :src="option.icon"/>
					<view v-else class="info_row_content_text">{{option?.content}}</view>
				</view>
			</view>
			<image class="info_row_arrow" src="/static/image/arrow_right.png" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				personalInfo: {},
				defaultImg: '/static/default-img.png',
				infoOptions: [],
			}
		},
		onLoad() {
			this.getPersonalInfo();
		},
		methods: {
			getPersonalInfo() {
				this.personalInfo = {
					icon: '',
					name: 'kessiy',
					sex: 1, // 1是男，2是女
					borth: '2001-01-24',
				};
				this.infoOptions = [
					{ label: '头像', icon: this.defaultImg, content: '' },
					{ label: '昵称', icon: '', content: this.personalInfo?.name },
					{ label: '性别', icon: '', content: this.personalInfo?.sex === 1 ? '男' : '女' },
					{ label: '生日', icon: '', content: this.personalInfo?.borth },
				];
			}
		}
	}
</script>

<style scoped lang="scss">
.personaledit_container {
	height: 100%;
	background: #FFFFFF;
	position: relative;
	display: flex;
	flex: 1;
	flex-direction: column;
	padding: 20rpx 40rpx;
	.info_row {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 1px solid #EEEEEE;
		padding: 20rpx 0;
		.info_row_label {
			display: flex;
			color: #333333;
			font-size: 32rpx;
		}
		.info_row_info {
			display: flex;
			flex: 1;
			flex-direction: row;
			align-items: center;
			justify-content: flex-end;
			.info_row_content {
				display: flex;
				width: 180rpx;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				.info_row_content_img {
					width: 100rpx;
					height: 100rpx;
				}
				.info_row_content_text {
					color: #000000;
					font-size: 32rpx;
				}
			}
		}
		.info_row_arrow {
			margin-left: 10rpx;
			width: 20rpx;
			height: 28rpx;
		}
	}
}
</style>
