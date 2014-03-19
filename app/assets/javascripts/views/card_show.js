Trellino.Views.CardShow = Backbone.View.extend({
	
	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model, 'change', this.modelChange);
	},
	
	tagName: "li",
	
	className: "list_entry",
	
	template: JST["cards/show"],
	
	render: function(){
		var card = this.model;
		var renderedContent = this.template({ card: card });
		this.$el.html(renderedContent);
		return this;
	},
	
	attributes: function() {
	  return {
	    'data-rank': this.model.get("rank"),
		'data-id': this.model.id,
		'data-list_id': this.model.get("list_id")
	  };
	},
	
	modelChange : function(){
	  this.$el.attr(_.extend({}, _.result(this, 'attributes')));
	}
	
	
})