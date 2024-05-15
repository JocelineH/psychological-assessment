<template>
	<view class="assesssearch_container">
		<view class="search">
			<view class="search_input">
				<input
					v-model="keyWord" 
					class="uni-input" 
					type="text"
					maxlength="11" 
					placeholder="请输入" 
					placeholder-class="uni-easyinput__placeholder-class"
					@confirm="handleConfirm" confirm-type="done"
				/>
				<uni-icons v-show="!!keyWord" type="closeempty" size="16" :color="COLOR" @click="onClearIcon" />
			</view>
			<uni-icons type="search" size="20" :color="COLOR" @click="handleConfirm" />
		</view>
		<assess-list :assessList="assesses" @onClick="gotoItem" class="assesses_list"></assess-list>
	</view>
</template>

<script>
	import assessList from '/components/assess-list/assess-list.vue';
	export default {
		components: { assessList },
		data() {
			return {
				COLOR: '#1AB84E',
				keyWord: '',
				assesses: [],
			}
		},
		methods: {
			onClearIcon() {
				this.keyWord = '';
			},
			handleConfirm() {
				console.log('=====key', this.keyWord)
				this.getAssessList();
			},
			// 获取分类下的测评列表
			async getAssessList() {
				// 通过this.keyWord获取
				this.assesses = [
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

<style lang="scss">
.assesssearch_container{
	height: 100%;
	background: #FFFFFF;
	padding: 0 20rpx;
	.search {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 85rpx;
		margin-bottom: 20rpx;
		.search_input {
			display: flex;
			flex: 1;
			flex-direction: row;
			align-items: center;
			margin-right: 10rpx;
			padding-right: 10rpx;
			border-radius: 5px;
			border: 1px solid rgba(121, 121, 121, 1);
		}
		.uni-input {
			background: transparent;
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
