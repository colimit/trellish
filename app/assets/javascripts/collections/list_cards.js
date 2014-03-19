Trellino.Collections.ListCards = Backbone.Collection.extend({
	comparator: "rank",
	
	initialize: function(list){
		this.list = list;
	},
	
	url: "cards"
});