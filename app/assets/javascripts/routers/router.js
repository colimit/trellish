Trellino.Routers.Router = Backbone.Router.extend({
	initialize: function(el){
		this.$el = el
	},
	
	routes: {
		"": "boardsIndex",
		"boards/:id": "boardShow"
	},
	
	boardsIndex: function(){
		var boards = Trellino.Collections.boards;
		boards.fetch()
		var boardsIndex = new Trellino.Views.BoardsIndex({ 
			collection: boards
		});
		this.$el.html(boardsIndex.render().$el)
	},
	
	boardShow: function(id){
		var board = Trellino.Collections.boards.getOrFetch(id);
		var boardShow = new Trellino.Views.BoardShow({
			model: board
		});
		this.$el.html(boardShow.render().$el);
	}
})