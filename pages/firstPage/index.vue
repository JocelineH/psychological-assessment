<template>
	<view class="firstpage_container">
		<view class="uni-margin-wrap">
			<swiper 
				class="swiper top_swiper" 
				circular 
				indicator-dots="true" 
				:autoplay="autoplay" 
				:interval="interval"
				:duration="duration"
			>
				<swiper-item v-for="(item, index) in bannerImgs" :key="`swiperimg_${index}`">
					<image v-if="!!item" class="top_swiper_item_img" :src="item" />
					<image v-else class="top_swiper_item_img" :src="defaultImg" />
				</swiper-item>
			</swiper>
		</view>
		<view class="hot_comment">
			<view class="title">
				<text class="title_text">热门推荐</text>
				<text class="title_tag">hot</text>
			</view>
			<text class="title_sub_text">精选热门精选测评</text>
			<view class="hot_comment_list">
				<view class="hot_comment_list_item" v-for="(item, index) in hotRemmends" :key="`hotRemmends_${index}`" @click="gotoItem(item)">
					<image v-if="!!item?.icon" class="hot_comment_list_item_img" :src="item.icon" :style="{ marginLeft: index !== 0 ? '20rpx' : '0rpx' }"/>
					<image v-else class="hot_comment_list_item_img" :src="defaultImg" />
					<text class="hot_comment_list_item_name">{{item?.name}}</text>
				</view>
			</view>
		</view>
		<view class="cherry_pick">
			<view class="title">
				<text class="title_text">精选热门精彩测评</text>
			</view>
			<text class="title_sub_text">不容错过的精选测评</text>
<!-- 			<view class="cherry_pick_list">
				<view class="cherry_pick_list_item" v-for="(item, index) in cherryPicks" :key="`cherryPicks{index}`" @click="gotoItem(item)">
					<view class="cherry_pick_list_item_left">
						<text class="cherry_pick_list_item_name">{{item?.name}}</text>
						<text class="cherry_pick_list_item_name">{{item?.name}}</text>
					</view>
					<view class="cherry_pick_list_item_right">
						<image v-if="!!item?.icon" class="cherry_pick_list_item_img" :src="item.icon" :style="{ marginLeft: index !== 0 ? '20rpx' : '0rpx' }"/>
						<image v-else class="cherry_pick_list_item_img" :src="defaultImg" />
					</view>
				</view>
			</view> -->
			<assess-list :assessList="cherryPicks" @onClick="gotoItem" class="cherry_pick_list"></assess-list>
			<!-- <uni-list class="cherry_pick_list" :border="false">
				<uni-list-item 
					class="cherry_pick_list_item"
					v-for="(item, index) in cherryPicks"
					:key="`cherryPicks_${index}`"
					:title="item.name"
					:note="item.desc"
					:border="false"
				>
					<template v-slot:footer>
						<view class="cherry_pick_list_item_right">
							<image v-if="!!item?.icon" class="cherry_pick_list_item_img" :src="item.icon"/>
							<image v-else class="cherry_pick_list_item_img" :src="defaultImg" />
						</view>
					</template>
				</uni-list-item>
			</uni-list> -->
		</view>
	</view>
</template>

<script>
	import assessList from '/components/assess-list/assess-list.vue';
	export default {
		components: { assessList },
		data() {
			return {
				indicatorDots: true,
				autoplay: false,
				interval: 0,
				duration: 500,
				bannerImgs: [],
				hotRemmends: [],
				cherryPicks: [],
				defaultImg: '/static/default-img.png',
			}
		},
		onLoad() {
			this.getBannerImgs();
			this.getHotRemmend();
			this.getCherryPick();
		},
		methods: {
			// 获取轮播图
			async getBannerImgs() {
				this.bannerImgs = [
					'',
					'https://img0.baidu.com/it/u=1033018635,7901815&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500',
					'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fss2.meipian.me%2Fusers%2F7325191%2F999fd8bb163bd74ccf8e1cd307fa4304.jpg%3Fmeipian-raw%2Fbucket%2Fivwen%2Fkey%2FdXNlcnMvNzMyNTE5MS85OTlmZDhiYjE2M2JkNzRjY2Y4ZTFjZDMwN2ZhNDMwNC5qcGc%3D%2Fsign%2Fde3b8de18ba400d9187e70d3e35de944.jpg&refer=http%3A%2F%2Fss2.meipian.me&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1716550282&t=10bb830e9e3849e4c9d3aa03fe61bc0e',
					'https://img1.baidu.com/it/u=3353985195,2581327310&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500'
				];
				// this.autoplay = true;
				this.interval = Math.round(this.bannerImgs?.length * this.duration);
			},
			// 获取热门推荐
			async getHotRemmend() {
				this.hotRemmends = [
					{ id: 1, icon: '/static/c1.png', name: 'IQ智商测试', url: '' },
					{ id: 2, icon: '/static/c2.png', name: 'EQ情商测试', url: '' },
					{ id: 3, icon: '/static/c3.png', name: '九宫格测试', url: '' },
					{ id: 4, icon: '/static/c4.png', name: '颜色性格测试', url: '' },
					{ id: 5, icon: '/static/c5.png', name: 'MBTI测试', url: '' },
				];
			},
			// 获取精选测评
			async getCherryPick() {
				this.cherryPicks = [
					{ id: 1, icon: '/static/c1.png', name: 'IQ智商测试', desc: '用于测试一个人的智商', url: '' },
					{ id: 2, icon: '/static/c2.png', name: 'EQ情商测试', desc: '用于测试一个人的智商', url: '' },
					{ id: 3, icon: '/static/c3.png', name: '九宫格测试', desc: '用于测试一个人的智商', url: '' },
					{ id: 4, icon: '/static/c4.png', name: '颜色性格测试', desc: '用于测试一个人的智商', url: '' },
					{ id: 5, icon: '/static/c5.png', name: 'MBTI测试', desc: '用于测试一个人的智商', url: '' },
				];
			},
			gotoItem(item) {
				console.log('====item', item?.url);
				// 页面跳转
				if (!item?.url) {
					return;
				}
				uni.navigateTo({
					url: `/pages/assessPage/assess/index?assessId=${item?.id}` //  item?.url
				});
			}
			//
		}
	}
</script>

<style scoped lang="scss">
.firstpage_container{
	width: 100%;
	background: #FFFFFF;	
	.top_swiper {
		height: 300rpx;
		.top_swiper_item_img {
			width: 100%;
			height: 100%;
		}
	}
	.title {
		display: flex;
		flex: 1;
		flex-direction: row;
		.title_text {
			margin-top: 10rpx;
			color: #333333;
			font-size: 36rpx;
			font-weight: 400;
		}
		.title_tag{
			color: #D9001B;
			font-size: 22rpx;
			font-weight: 400;
		}
	}
	.title_sub_text {
		color: #555555;
		font-size: 22rpx;
		font-weight: 400;
	}
	.hot_comment {
		margin-top: 20rpx;
		padding: 0 20rpx;
		.hot_comment_list {
			display: flex;
			flex: 1;
			flex-direction: row;
			overflow-x: scroll;
			.hot_comment_list_item {
				display: flex;
				flex-direction: column;
				align-items: center;
				.hot_comment_list_item_img {
					width: 160rpx;
					height: 120rpx;
				}
				.hot_comment_list_item_name {
					margin-top: 10rpx;
					color: #333333;
					font-size: 26rpx;
					font-weight: 400;
				}
			}
		}
	}
	.cherry_pick {
		margin-top: 20rpx;
		padding: 0 20rpx;
		.cherry_pick_list {
			// display: flex;
			// flex-direction: column;
			// flex: 1;
			// min-height: 0;
			// overflow: visible;
			// position: relative;
			// height: 100%;
			// border: 1px solid red;
		}
	}
}
</style>
