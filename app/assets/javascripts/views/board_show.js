Trellino.Views.BoardShow = Backbone.CompositeView.extend({
	initialize: function(){
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.lists(), "sort", this.render);
	},
	
	
	template: JST["boards/show"],
	
	render: function(){
		var board = this.model;
		var renderedContent = this.template({board: board});
		this.$el.html(renderedContent);
		this.setLists();
		this.renderSubviews();
		var newForm = new Trellino.Views.NewList({board: board});
		this.$("#new-list").html(newForm.render().$el);
		this.$(".lists").sortable({update: this.handleStop.bind(this)});
		return this;
	},
		// 
	// renderLists: function(){
	// 	this.$("#lists").empty();
	// 	var board = this.model;
	// 	var that = this;
	// 	board.lists().forEach(function(list){
	// 		listView = new Trellino.Views.ListShow({ model: list });
	// 		listEl = listView.render().$el.children();
	// 		that.$("#lists").append(listEl);
	// 	});
	// },
	
	events: {
		"submit .newList": "createList"
	},
	
	createList: function(event){
		event.preventDefault();
		var form = $(event.target).serializeJSON();
		newList = this.model.lists().create(_.extend(form["list"], {
				rank: this.model.lists().length + 1
			})
		);
	},
	
	addList: function(list){
		var listShowView = new Trellino.Views.ListShow({
			board: this.model,
			model: list
		});
		this.addSubview(".lists", listShowView);
	},
	
	
	setLists: function(){
		this.clearSubviews(".lists");
		var that = this;
		this.model.lists().forEach(function(list){
			that.addList(list);
		});
	},
	
	
	handleStop: function(event, ui){
		var thisItem = ui.item;
		var thisListId = thisItem.find("ul.cards").data("list_id");
		var thisList = this.model.lists().get(thisListId);
		var nextItem = thisItem.next();
		var prevItem = thisItem.prev();

		thisList.set("rank", this.newRank(nextItem, prevItem));
		thisList.save();
	},
	
	newRank: function(nextItem, prevItem){
		
		var firstRank = (parseFloat(prevItem.attr("data-rank")) ||
			 				parseFloat(nextItem.attr("data-rank")) - 1 || 0);
		var secondRank = (parseFloat(nextItem.attr("data-rank")) || 
							parseFloat(prevItem.attr("data-rank")) + 1 || 0);
		return ((firstRank + secondRank) / 2.0)
	},
	
	
	
})