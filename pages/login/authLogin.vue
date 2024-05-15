<template>
	<view class="login_container">
		<view class="login_btn auth_login_btn" @tap="onAuthLogin">
			<text class="login_btn_text auth_login_btn_text">微信授权登录</text>
		</view>
		<view class="dialog" v-if="_visibleInfo" animation="animationInfoData" @tap="hideDialog">
			<div class="dialog_container" @click.stop="handleClickDialog">
				<div class="dialog_top">
					<img class="dialog_top_img" src="@/static/uni.png" alt="" />
					<text class="dialog_top_name">心里测评</text>
					<text class="dialog_top_text">申请</text>
				</div>
				<div class="dialog_title">获取你的昵称、头像、地区及性别</div>
				<div class="dialog_user">
					<button class="avatar-wrapper dialog_user_ava" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
  						<img class="dialog_user_img" :src="_userInfo?.avatarUrl" alt="" />
					</button>
					<div class="dialog_user_name">
						<input type="nickname" class="weui-input dialog_user_name_input" placeholder="请输入昵称" :value="_userInfo.nickName" @change="onChangeNickName"/>
					</div>
				</div>
				<div class="dialog_bottom">
					<button class="dialog_btn" @tap="hideDialog">拒绝</button>
					<!-- <button class="dialog_btn dialog_btn_confirm" :disabled="!_userInfo?.avatarUrl || !_userInfo.nickName" open-type="getPhoneNumber" @getphonenumber="handleGetPhoneNumber">允许</button> -->
					<button class="dialog_btn dialog_btn_confirm" open-type="getPhoneNumber" @getphonenumber="handleGetPhoneNumber">允许</button>
				</div>
			</div>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['checked'],
		data() {
			return {
				COLOR: '#1AB84E',
				_visibleInfo: false,
				_userInfo: {},
				canProfile: false, //
			}
		},
		mounted() {
			const info = uni.getSystemInfoSync();
			console.log('====created', info.version);
			if (wx.getUserProfile) {
				console.log('======cun zai');
				this.canProfile = true;
			} else {
				console.log('======no cun zai');
			}
		// 	if (this.hasLogin && this.isUniverifyLogin) {
		// 		this.getPhoneNumber(uni.getStorageSync(univerifyInfoKey)).then((phoneNumber) => {
		// 			this.phoneNumber = phoneNumber
		// 		})
		// 	}
		},
		methods: {
			handleGetUserProfile() {
				let that = this;
				wx.getUserProfile({
					desc: '获取你的昵称、头像、地区及性别',
					success: async(res) => {
						console.log('=====profile res', JSON.stringify(res.userInfo));
						const { userInfo } = res;
						const { openId, nickName, avatarUrl, gender  } = userInfo || {}; // gender 0未知 1男 2女
						that._userInfo = { openId, nickName, avatarUrl, gender };
						uni.setStorageSync('user-info', JSON.stringify(that._userInfo));
						that.showInfoDialog();
					},
					fail: (err)=>{
						console.log('=====res', JSON.stringify(err));
						wx.showToast({
							title: err,
							icon: 'none'
						})
					}
				})
			},
			onAuthLogin() {
				if (!this.checked) {
					wx.showToast({
						title: '请同意用户隐私协议',
						icon: 'none'
					})
					return;
				} else {
					this.showInfoDialog();
				}
			},
			showInfoDialog() {
				console.log('=====showInfoDialog', this._userInfo)
				this._visibleInfo = true;
			},
			hideDialog() {
				this._visibleInfo = false;
			},
			onChooseAvatar(e) {
				const { avatarUrl } = e.detail;
				console.log('========accva', avatarUrl)
				this._userInfo.avatarUrl = avatarUrl;
			},
			onChangeNickName(e) {
				const { value } = e.detail;
				console.log('========onChangeNickName', value)
				this._userInfo.nickName = value;
			},
			handleAllow() {
				let that = this;
				wx.getUserProfile({
					desc: '获取你的昵称、头像、地区及性别',
					success: async(res) => {
						console.log('=====profile res', JSON.stringify(res.userInfo));
						const { userInfo } = res;
						const { openId /*, nickName, avatarUrl, gender */  } = userInfo || {}; // gender 0未知 1男 2女
						that._userInfo = Object.assign({ openId }, that._userInfo);
						uni.setStorageSync('user-info', JSON.stringify(that._userInfo));
						// 提交给服务端请求登录接口，并判断是新用户还是老用户
						uni.request({
							url: '',
							method: 'POST',
							data: { code: res?.code },
							success: async (res) => {
								await uni.setStorageSync('user-token', res?.data?.token);
								if (res?.data?.userInfo?.isNew) {
									// 获取手机号
									
								} else {
									uni.switchTab({
										url: '/pages/firstPage/index'
									});
								}
							},
							fail: (err) => {
								wx.showToast({
									title: err,
									icon: 'none'
								})
							}
						})
					},
					fail: (err)=>{
						console.log('=====res', JSON.stringify(err));
						wx.showToast({
							title: err,
							icon: 'none'
						})
					}
				})
			},
			async handleGetPhoneNumber(e) {
				console.log('========', e)
				this.hideDialog();
				const { errMsg, code, iv, encryptedData } = e?.detail || {};
				if (errMsg == 'getPhoneNumber:ok') {
					await uni.setStorageSync('user-info', JSON.stringify(this._userInfo));
					console.log('=======user info', JSON.stringify(this._userInfo))
					// 提交给服务端请求登录接口，并判断是新用户还是老用户
					uni.navigateTo({
						url: '/pages/personal/personalData'
					});
					// uni.request({
					// 	url: '/login',
					// 	method: 'POST',
					// 	data: { code: code },
					// 	success: async (res) => {
					// 		await uni.setStorageSync('user-token', res?.data?.token);
					// 		if (res?.data?.userInfo?.isNew) {
					// 			uni.navigateTo({
					// 				url: '/pages/personal/personalData'
					// 			});
					// 		} else {
					// 			uni.switchTab({
					// 				url: '/pages/firstPage/index'
					// 			});
					// 		}
					// 	},
					// 	fail: (err) => {
					// 		wx.showToast({
					// 			title: err,
					// 			icon: 'none'
					// 		})
					// 	}
					// })
				}
			}
			//
		}
	}
</script>

<style lang="scss">
.login_container {
	.login_btn {
		margin-top: 20rpx;
		padding: 20rpx;
		height: 50rpx;
		background: $global-color;
		border-radius: 50rpx;
	}
	.auth_login_btn {
		background: none;
	}
	.login_btn_text {
		color: white;
		font-size: 34rpx;
		font-weight: 500;
	}
	.auth_login_btn_text {
		color: $global-color;
	}
	.dialog{
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #000000a1;
		// border: 1px solid red;
		overflow: hidden;
		z-index: 10;
		.dialog_container{
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			padding: 45rpx 30rpx;
			border-top-left-radius: 10rpx;
			border-top-right-radius: 10rpx;
			background: #FFFFFF;
			// border: 1px solid red;
		}
		.dialog_top {
			display: flex;
			flex: 1;
			flex-direction: row;
			align-items: center;
			.dialog_top_img {
				width: 40rpx;
				height: 40rpx;
				border-radius: 40rpx;
			}
			.dialog_top_name {
				margin-left: 20rpx;
				color: #131313;
    			font-size: 25rpx;
			}
			.dialog_top_text {
				margin-left: 10rpx;
				color: #131313;
				font-size: 25rpx;
			}
		}
		.dialog_title {
			margin-top: 50rpx;
			padding-bottom: 30rpx;
			color: #666666;
			font-size: 28rpx;
    		font-weight: 500;
			text-align: left;
			border-bottom: 0.5rpx solid #efefef;
		}
		.dialog_user {
			padding: 30rpx 0;
			display: flex;
			flex: 1;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			border-bottom: 0.5rpx solid #efefef;
			.dialog_user_ava {
				display: flex;
				padding: 0;
				.dialog_user_img {
					width: 100rpx;
					height: 100rpx;
				}
			}
			.dialog_user_name {
				margin-left: 40rpx;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.dialog_user_name_text {
					text-align: left;
					// border: 1px solid red;
				}
				.dialog_user_name_input {
					text-align: left;
					font-size: 25rpx;
					// border: 1px solid red;
				}
			}
		}
		.dialog_bottom {
			margin: 50rpx 0;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			.dialog_btn {
				margin: 0;
				width: 180rpx;
				display: flex;
				justify-content: center;
				font-size: 24rpx;
				color: $global-color;
				background-color: #ffffff;
				border-radius: 0;
			}
			.dialog_btn_confirm {
				margin-left: 30rpx;
				color: #ffffff;
				background-color: $global-color;
			}
		}
	}
}
</style>
