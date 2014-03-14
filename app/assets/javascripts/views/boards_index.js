Trellino.Views.BoardsIndex = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.collection, "add sync change", this.render);
	},
	
	template: JST["boards/index"],
	
	render: function(){
		var renderedContent = this.template({boards: this.collection});
		this.$el.html(renderedContent);		
		var newForm = new Trellino.Views.NewBoard();
		this.$("#new-board").html(newForm.render().$el);
		return this;
	},
	
	events: {
		"submit #new-board-form": "createBoard"
	},
	
	createBoard: function(event){
		event.preventDefault();
		var form = $(event.target).serializeJSON();
		this.collection.create(form["board"]);
	}
		
	
	
	
	



})