Trellino.Views.NewCard = Backbone.View.extend({
	tagName: "form",
	
	className: "card-form",
	
	initialize: function(options){
		this.list = options.list;
		this.listenTo(this.list, "all", this.render);
	},
	
	template: JST["cards/new"],
	
	render: function(){
		var renderedContent = this.template({list: this.list});
		this.$el.html(renderedContent);
		return this;
	},
	
})