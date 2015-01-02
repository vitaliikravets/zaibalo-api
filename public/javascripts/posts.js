function User(displayName) {
	var self = this;
	self.displayName = displayName;
}

function Post(content, displayName) {
	var self = this;
	self.content = content;
	self.author = new User(displayName);
}

function PostsViewModel() {
	var self = this;
	
	self.posts = ko.observableArray([]);
	self.pageIndex = ko.observable(0);

	// Operations
	self.addPost = function() {
		var data = JSON.stringify({ content : $('#new-post-text').val() });
		
		$.post('/posts', data, function(response) {
			self.posts.unshift(new Post($('#new-post-text').val(), response.author.displayName));
		}, 'json');
	}

	self.loadPosts = function(){
		var PAGE_SIZE = 10;
		self.pageIndex(self.pageIndex() + 1);
		$.getJSON("/posts?sort=created_at&count=" + PAGE_SIZE + "&page=" + self.pageIndex(), function(allData) {
			var mappedPosts = $.map(allData, function(item) {
				return new Post(item.content, item.author.displayName);
			});
			self.posts.pushAll(mappedPosts);
		});
	}

	//Initialization
	self.loadPosts();
}

ko.observableArray.fn.pushAll = function(valuesToPush) {
    var underlyingArray = this();
    this.valueWillMutate();
    ko.utils.arrayPushAll(underlyingArray, valuesToPush);
    this.valueHasMutated();
    return this;
};

$.ajaxSetup({
    statusCode: {
        401: function(error, callback){
        	alert(error.responseText);
        },
        403: function(error, callback){
        	alert(error.responseText);
        }
    }
});

$(document).ready(function() {
	ko.applyBindings(new PostsViewModel());
});