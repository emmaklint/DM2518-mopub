'use strict'
Vue.use(VueYouTubeEmbed)

var vm = new Vue({
	el: '#app',
	data: {
		videos: [],
		newTitle: null,
		newURL: null,
		newCategory: null,
		newVideo: false,
		newComment: null,
		allVideos: true,
		oneVideo: false,
		choosenVideo: {id:10100101, title: 'Title', url: 'pm1nzZa2RZQ', category: 'oklart', rating: 0},

		choosenComments: [],		
},

	methods: {
		findIndex: function (id) {
		var i;
		for(i=0; i < this.videos.length; i++) {
			if (this.videos[i].id == id) {
				var index = this.videos.indexOf(this.videos[i])
			}
		}
			return index;

		}, 

		addVideo: function () {
			var newID = this.videos.length;
			this.videos.push({id: newID, title: this.newTitle, url: this.newURL, category: this.newCategory, rating: 0})
			this.update('video');
			this.newTitle = null;
			this.newURL = null;
			this.newCategory = null;
		}, 
		
		removeVideo: function (id) {
			var i;
			for(i=0; i < this.videos.length; i++) {
				if (this.videos[i].id == id) {
					var index = this.videos.indexOf(this.videos[i])
					this.videos.splice(index, 1)
				}
			}
			this.update('video');
		},

		writeComment: function(id) {
			this.comments.push({videoid: id, comment: this.newComment});
			this.getComments(id);
			this.update('comment')
			this.newComment = null;	
		},

		getComments: function(id) {
			var i;
			for(i=0; i < this.comments.length; i++) {
				if (this.comments[i].videoid == id) { 
					this.choosenComments.push(this.comments[i])
				}
			}
		},

		singleView: function(id) {
			var index = this.findIndex(id);
			this.choosenVideo = this.videos[index];
			this.getComments(id);
			this.oneVideo = true;
			this.allVideos = false;
		},

		update: function(item) {
			if (item == 'video') {
				Lockr.set('videos', this.videos)
			} else if (item == 'comment') {
				Lockr.set('comments', this.comments)
			}
		
		},

		setup: function() {

			if (Lockr.get('videos') == null) {
				Lockr.set('videos', [
				{id:0, title: 'Low Poly Portrait', url: 'v0nmI_stsZk', category: 'Low Poly', rating: 1}, 
				{id:1, title: 'Title', url: 'hFDuS-8LHgI', category: 'Logos', rating: 3}, 
				{id:2, title: 'Title', url: 'IsbeqtIIt7I', category: 'Flat Design', rating: 2}
				])
			}
			
			this.videos = Lockr.get('videos')

			if (Lockr.get('comments') == null) {
				Lockr.set('comments', [
				{videoid:0, comment: '111111111'},
				{videoid:0, comment: '222222222'},
				{videoid:1, comment: '333333333'},
				{videoid:1, comment: '444444444'},
				{videoid:2, comment: '555555555'},
				{videoid:2, comment: '666666666'},
				])
			}

			this.comments = Lockr.get('comments')
		},
	}	

})

vm.setup()

