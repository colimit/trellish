Trellino.Views.NewBoard = Backbone.View.extend({
	initialize: function(){
	},
	
	template: JST["boards/new"],
	
	render: function(){
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},
	
	



})