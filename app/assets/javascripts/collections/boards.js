Trellino.Collections.Boards = Backbone.Collection.extend({
	url: "/boards",
	model: Trellino.Models.Board,
	getOrFetch: function(id){
		var board = this.get(id)
		if (!board){
			board = this.create({id: id});
			board.fetch()
		}
		return board;
	}
})


Trellino.Collections.boards = new Trellino.Collections.Boards();
