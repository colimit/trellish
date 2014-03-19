Trellino.Collections.BoardLists = Backbone.Collection.extend({
	comparator: "rank",
	
	initialize: function(board){
		this.board = board;
	},
	
	url: "/lists",
	
	model: Trellino.Models.List,
	
	setWithCards: function(lists){
		this.reset()
		var that = this
		lists.forEach(function(list){
			if (list.cards) {
				var cards = list.cards;
				delete list.cards;
				modelized_list = that.add(list);
				modelized_list.cards().set(cards);
				modelized_list.cards().sort();
			} else { 
				that.add(list)
			}
		})
	}
	
})

