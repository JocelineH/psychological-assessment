<template>
	<view class="login_container">
		<view style="height: 60rpx"/>
		<logoVue />
		<view class="form_row">
			<text class="label">手机号：</text>
			<view class="uni-input-wrapper form_row_content">
				<input 
					v-model="mobile" 
					class="uni-input" 
					type="number"
					maxlength="11" 
					placeholder="请输入手机号" 
					placeholder-class="uni-easyinput__placeholder-class"
				/>
				<uni-icons v-show="!!mobile" type="closeempty" size="20" :color="COLOR" @click="onClearIcon" />
			</view>
		</view>
		<view class="form_row">
			<text class="label">验证码：</text> 
			<view class="uni-input-wrapper form_row_content">
				<input
					v-model="code" 
					class="uni-input" 
					type="text"
					placeholder="请输入验证码" 
					placeholder-class="uni-easyinput__placeholder-class"
				/>
				<text :class="['code_btn', { 'code_btn_dis' : !mobile }]" @click="onGetValidCode">{{`${time}${validText}`}}</text>
			</view>
		</view>
		<view class="sign_agreement">
			<checkbox-group @change="onChangeCheck">
				<label>
					<checkbox value="1" shape="circle" :color="COLOR" :borderColor="COLOR"/>
					<text class="sign_agreement_text">
						我已阅读并同意
						<text class="sign_agreement_link">{{'《用户隐私协议》'}}</text>
					</text>
				</label>
			</checkbox-group>
		</view>
		<view class="login_btn" @click="onLogin">
			<text class="login_btn_text">登录</text>
		</view>
		<!-- <block v-if="hasApply === false">
			<text>请完成微信授权以继续使用</text>
		</block> -->
		<AuthLogin :checked="checked"/>
	</view>
</template>

<script>
	import logoVue from './component/logo.vue';
	import AuthLogin from './authLogin.vue'
	const mobile_reg = /^1[3-9]{1}[0-9]{9}$/;
	export default {
		components: { logoVue, AuthLogin },
		data() {
			return {
				COLOR: '#1AB84E',
				mobile: '',
				code: '',
				validCode: '',
				disabled: false,
				time: '',
				validText: '获取验证码',
				checked: '',
			}
		},
		onLoad() {
			console.log('=====onLoad')
			if (this.setTime) {
				clearInterval(this.setTime);
			}
			// if (this.hasLogin && this.isUniverifyLogin) {
			// 	this.getPhoneNumber(uni.getStorageSync(univerifyInfoKey)).then((phoneNumber) => {
			// 		this.phoneNumber = phoneNumber
			// 	})
			// }
		},
		methods: {
			onClearIcon() {
				this.mobile = '';
			},
			validMobile() {
				let result = true;
				if (!mobile_reg.test(this.mobile)) {
					wx.showToast({
						title: '手机号输入有误！',
						icon: 'none'
					})
					result = false;
				}
				return result;
			},
			//随机生成几位数
			getVerificationCode(codeLength){ //传入需要的字符串长度，不传默认为4
				// 准备一个用来抽取码的字符串，或者字典
				let verification_code_str = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";  //数字和字母
				// let verification_code_str = "0123456789";     //纯数字
				// 获取某个范围的随机整数，封装的函数，在上面抽取字典的时候进行了调用
				function getRandom(min, max) {//意思是获取min-max数字之间的某个随机数，直接调用即可
					return Math.round(Math.random() * (max - min) + min);
				}
				let newStr = '';                    //创建一个空字符串，用来拼接四位随机码
				for (var i = 0; i < codeLength; i++) {       //for循环四次，则拼接四次随机码
					newStr += verification_code_str[getRandom(0, verification_code_str.length - 1)];   //从字典中随机选一个下标，并拼接到空字符串中
				}
				return newStr
			},
			setIntervalFunc() {
				this.time = 60;
				// this.validText = '';
				if (this.setTime) {
					clearInterval(this.setTime);
				}
				this.setTime = setInterval(()=>{
					if (this.time - 1 == 0) {
						this.time = '';
						this.validText = '获取验证码';
						this.disabled = false;
						clearInterval(this.setTime);
					} else {
						this.time--;
					}
				}, 1000)
			},
			onGetValidCode() {
				let that = this;
				if (that.disabled || !that.validMobile()) {
					return;
				}
				that.validCode = that.getVerificationCode(4);
				that.disabled = true;
				that.validText = that.validCode;
				// that.setIntervalFunc();
				// 通过接口请求获取验证码
				// uni.request({
				// 	url: '',
				// 	method: 'POST',
				// 	data: { mobile: that.mobile },
				// 	success: (res) => {
				// 		that.validCode = res?.data?.validCode;
				// 		that.disabled = true;
				// 		wx.showToast({
				// 			title: '验证码已发送！',
				// 			icon: 'none'
				// 		})
				//      that.setIntervalFunc();
				// 	},
				// 	fail: (err) => {
				// 		that.time = '';
				// 		that.disabled = false;
				// 		wx.showToast({
				// 			title: err,
				// 			icon: 'none'
				// 		})
				// 	}
				// })
			},
			onChangeCheck: function(e) {
				this.checked = e.detail.value
			},
			onLogin() {
				console.log('======onLogin');
				let that = this;
				// if (!that.validMobile()) {
				// 	return;
				// }
				// if (!that.code || that.code !== that.validCode) {
				// 	wx.showToast({
				// 		title: '验证码输入有误',
				// 		icon: 'none'
				// 	})
				// 	return;
				// }
				// if (!that.checked) {
				// 	wx.showToast({
				// 		title: '请同意用户隐私协议',
				// 		icon: 'none'
				// 	})
				// 	return;
				// }
				uni.login({
					provider: "weixin",
					onlyAuthorize: true,
					success: (res)=>{
						console.log('=====res', JSON.stringify(res));
						uni.navigateTo({
							url: '/pages/personal/personalData'
						});
						// 获取到code后，提交给服务端请求登录接口，并判断是新用户还是老用户
						uni.request({
							url: '/login',
							method: 'POST',
							data: { code: res?.code },
							success: async (res) => {
								await uni.setStorageSync('user-token', res?.data?.token);
								if (res?.data?.userInfo?.isNew) {
									uni.navigateTo({
										url: '/pages/personal/personalData'
									});
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
					}
				})
			}
			//
		}
	}
</script>

<style lang="scss">
.login_container {
	height: 100%;
	text-align: center;
	background: #FFFFFF; 
	display: flex;
    flex-direction: column;
	padding: 0 40rpx;
	.form_row {
		/* width: 100%; */
		margin-top: 20rpx;
		padding: 0 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow: hidden;
		border: 2rpx solid $global-color;
		border-radius: 50rpx;
	}
	.label {
		color: black;
		font-size: 32rpx;
		/* line-height: 14rpx; */
	}
	.form_row_content {
		display: flex;
		flex: 1;
		flex-direction: row;
		align-items: center;
	}
	.form_row_content input {
		flex: 1;
		text-align: left;
		font-size: 32rpx;
	}
	.code_btn {
		padding: 10rpx 10rpx;
		color: $global-color;
		font-size: 32rpx;
/* 		border: 1rpx solid $global-color; */
	}
	.code_btn_dis {
		color: #999999;
		/* border: 1rpx solid #DDDDDD; */
	}
	.sign_agreement {
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		checkbox .wx-checkbox-input {
			width: 36rpx;
			height: 36rpx;
			border-radius: 50% !important;
			border-color: $global-color;
		}
	}
	.sign_agreement_text {
		text-align: center;
		font-size: 30rpx;
	}
	.sign_agreement_link {
		color: $global-color;
	}
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
}
</style>
