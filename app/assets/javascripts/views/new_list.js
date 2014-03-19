Trellino.Views.NewList = Backbone.View.extend({
	
	initialize: function(options){
		this.board = options.board
	},
	
	template: JST["lists/new"],
	
	render: function(){
		var renderedContent = this.template({ board: this.board });
		this.$el.html(renderedContent);
		return this;
	},
	

})