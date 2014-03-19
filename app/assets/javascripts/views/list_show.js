Trellino.Views.ListShow = Backbone.CompositeView.extend({
	
	tagName: 'li',
	
	className: "board_entry",
	
	events: {
		"submit .card-form": "createCard",
		"sortstop": "handleStop"
	},
	
	initialize: function(options){
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model, 'change', this.modelChange);						// 
		// this.listenTo(this.model.cards(), "add", this.addCard);
		this.listenTo(this.model.cards(), "sort reset", this.render);
		var newCardView = new Trellino.Views.NewCard({ list: this.model });
		this.addSubview("#new-card-form", newCardView );
		this.board = options.board;
	},
	
	template: JST["lists/show"],
	
	render: function(){
		var list = this.model;
		this.setCards();
		var renderedContent = this.template({ list: list });
		this.$el.html(renderedContent);
		this.renderSubviews();	
		this.$(".cards").sortable({
			opacity: 0.3, 
			connectWith: ".cards"
		});
		// this.$("#new-list").html(newForm.render().$el);
		return this;
	},
		
	createCard: function(event){
		event.preventDefault();
		var form = $(event.target).serializeJSON();
		newCard = this.model.cards().create(_.extend(form["card"], {
				rank: this.model.cards().last().get("rank") + 1
			})
		);
	},
	
	setCards: function(){
		this.clearSubviews(".cards");
		var that = this;
		this.model.cards().forEach(function(card){
			that.addCard(card);
		});
	},
	
	addCard: function(card){
		var cardShowView = new Trellino.Views.CardShow({
			model: card
		});
		this.addSubview(".cards", cardShowView);
	},
	
	
	handleStop: function(event, ui){
		var thisItem = ui.item;
		var thisCard = this.model.cards().get(thisItem.data("id"));
		var nextItem = thisItem.next();
		var prevItem = thisItem.prev();
		var oldListId = thisItem.attr("data-list_id");
		var newListId = thisItem.parent().attr("data-list_id");

		thisCard.set("rank", this.newRank(nextItem, prevItem));
		thisCard.set("list_id", newListId);
		thisCard.save();
		var oldList = this.board.lists().get(oldListId);
		oldList.cards().remove({id: thisCard});
		this.model.cards().add(thisCard);
	},
	
	newRank: function(nextItem, prevItem){
		
		var firstRank = (parseFloat(prevItem.attr("data-rank")) ||
			 				parseFloat(nextItem.attr("data-rank")) - 1 || 0);
		var secondRank = (parseFloat(nextItem.attr("data-rank")) || 
							parseFloat(prevItem.attr("data-rank")) + 1 || 0);
		return ((firstRank + secondRank) / 2.0)
	},
	
	
	attributes: function() {
	  return {
	    'data-rank': this.model.get("rank")
	  };
	},
	
	
	modelChange : function(){
	  this.$el.attr(_.extend({}, _.result(this, 'attributes')));
	}
	
	
	
	
	
	
});