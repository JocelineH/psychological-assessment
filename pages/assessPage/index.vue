<template>
	<view class="assesspage_container">
		<view class="assesspage_left">
			<view class="assesspage_top assesspage_top_title">测评分类</view>
			<scroll-view class="classify_list" scroll-top="scrollTop" scroll-y="true">
				<uni-list :border="false">
					<uni-list-item v-for="(item, index) in classifyList" :key="`classify_list_${index}`" :border="false">
						<template v-slot:body>
							<view class="classify_list_item" @click="selectClassify(item)">
								<view :class="['classify_list_item_line', item.classify === classify ? 'classify_list_item_line_active' : '']" />
								<text :class="['classify_list_item_text', item.classify === classify ? 'classify_list_item_text_active' : '']">{{item.name}}</text>
							</view>
						</template>
					</uni-list-item>
				</uni-list>
			</scroll-view>
		</view>
		<view class="assesspage_right">
			<view class="assesspage_top">
				<view class="assesspage_top_search">
					<uni-icons type="search" size="20" :color="COLOR" @click="gotoSearch" />
				</view>
			</view>
			<view class="sort">
				<view class="sort_title">排序</view>
				<view class="sort_btn" @click="onChangeSort">
					<view class="sort_btn_text">按时间</view>
					<image class="sort_btn_icon" :src="sort === 'DESC' ? '/static/image/arrow_down.png' : '/static/image/arrow_up.png'" />
				</view>
			</view>
			<assess-list :assessList="assesses" @onClick="gotoItem" class="assesses_list"></assess-list>
		</view>
	</view>
</template>

<script>
	import assessList from '/components/assess-list/assess-list.vue';
	export default {
		components: { assessList },
		data() {
			return {
				classifyList: [],
				classify: null,
				assesses: [],
				sort: 'DESC', // AES 
				defaultImg: '/static/default-img.png',
			}
		},
		onLoad() {
			this.getClassifies();
		},
		methods: {
			// 获取轮播图
			async getClassifies() {
				this.classifyList = [
					{ classify: 1, name: '全部' },
					{ classify: 2, name: '性格' },
					{ classify: 3, name: '情感' },
					{ classify: 4, name: '事业' },
				];
				this.selectClassify(this.classifyList[0]);
			},
			selectClassify(item) {
				this.classify = item.classify;
				this.getAssessList();
			},
			// 获取分类下的测评列表
			async getAssessList() {
				// 通过this.classify、this.sort获取
				this.assesses = [
					{ id: 1, icon: '/static/c1.png', name: 'IQ智商测试', desc: '用于测试一个人的智商', url: '' },
					{ id: 2, icon: '/static/c2.png', name: 'EQ情商测试', desc: '用于测试一个人的智商', url: '' },
					{ id: 3, icon: '/static/c3.png', name: '九宫格测试', desc: '用于测试一个人的智商', url: '' },
					{ id: 4, icon: '/static/c4.png', name: '颜色性格测试', desc: '用于测试一个人的智商', url: '' },
					{ id: 5, icon: '/static/c5.png', name: 'MBTI测试', desc: '用于测试一个人的智商', url: '' },
				];
			},
			gotoSearch() {
				uni.navigateTo({
					url: '/pages/assessPage/search'
				});
			},
			onChangeSort() {
				if (this.sort === 'DESC') {
					this.sort = 'AES';
				} else if (this.sort === 'AES') {
					this.sort = 'DESC';
				}
				this.getAssessList();
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

<style lang="scss">
.assesspage_container{
	width: 100%;
	height: 100%;
	background: #FFFFFF;
	display: flex;
	flex: 1;
	flex-direction: row;
	.assesspage_left {
		display: flex;
		flex-direction: column;
		position: relative;
		padding-left: 20rpx;
		width: 160rpx;
		height: 100%;
		// border: 1px solid red;
	}
	.classify_list {
		flex: 1;
		height: 0;
		// border: 1px solid red;
		.classify_list_item {
			display: flex;
			align-items: center;
		}
		.classify_list_item_line {
			margin-right: 10rpx;
			width: 5rpx;
			height: 40rpx;
			background-color: transparent;
		}
		.classify_list_item_line_active {
			background-color: green;
		}
		.classify_list_item_text {
			color: #333333;
			font-size: 30rpx;
			font-weight: 400;
		}
		.classify_list_item_text_active {
			font-size: 32rpx;
			color: green; 
		}
	}
	.assesspage_top {
		width: 100%;
		height: 80rpx;
		display: flex;
		align-items: center;
	}
	.assesspage_top_title {
		color: #333333;
		font-size: 36rpx;
		font-weight: 400;
	}
	.assesspage_top_search {
		width: 100%;
		text-align: right;
	} 
	.assesspage_right {
		display: flex;
		flex-direction: column;
		flex: 1;
		position: relative;
		padding-right: 20rpx;
		height: 100%;
		// border: 1px solid red;
	}
	.sort {
		width: 100%;
		height: 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		.sort_title {
			color: #333333;
			font-size: 30rpx;
		}
		.sort_btn {
			display: flex;
			flex-direction: row;
			align-items: center;
			.sort_btn_text {
				color: #333333;
				font-size: 30rpx;
			}
			.sort_btn_icon {
				margin-left: 8rpx;
				width: 28rpx;
				height: 20rpx;
			}
		}
	}
	.assesses_list {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-height: 0;
		overflow: visible;
		position: relative;
		padding-left: 20rpx;
		// height: 100%;
		// border: 1px solid red;
	}
}
</style>
