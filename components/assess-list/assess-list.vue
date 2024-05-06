<template>
	<view class="assess_list_container">
		<scroll-view class="assess_list" scroll-top="scrollTop" scroll-y="true">
			<uni-list :border="false">
				<uni-list-item
					v-for="(item, index) in assessList"
					:key="`assess_list_${index}`"
					:title="item.name"
					:note="item.desc"
					:border="false"
				>
					<template v-slot:footer>
						<view class="assess_list_item" @click="onClickItem(item)">
							<image v-if="!!item?.icon" class="assess_list_item_img" :src="item.icon"/>
							<image v-else class="assess_list_item_img" :src="defaultImg" />
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'assessList',
		props: ['assessList', 'onClick'],
		data() {
			return {
				assesses: [],
				defaultImg: '/static/default-img.png',
			}
		},
		onLoad() {
		},
		methods: {
			onClickItem(item){
				// this.$emit('onClick', item);
				console.log('====comp item', item?.url, item?.id);
				// // 页面跳转
				// if (!item?.url) {
				// 	return;
				// }
				uni.navigateTo({
					url: `/pages/assessPage/assess/index?assessId=${item?.id}`
				});
			}
		}
	}
</script>

<style lang="scss">
.assess_list_container {
	display: flex;
	flex-direction: column;
	height: 100%;
	.assess_list {
		flex: 1;
		height: 0;
		// border: 1px solid red;
		.assess_list_item {
			width: 160rpx;
			.assess_list_item_img {
				width: 160rpx;
				height: 120rpx;
			}
		}
	}
}
.uni-list::after {
	height: 0;
}
.uni-list-item .uni-list-item__container {
	padding-left: 0 !important;
}
.uni-list-item .uni-list-item__content-title {
	font-size: 32rpx;
}
.uni-list-item .uni-list-item__content {
	justify-content: flex-start !important;
}
.uni-list-item .uni-list-item__content-note {
	margin-top: 20rpx !important;
}
</style>
