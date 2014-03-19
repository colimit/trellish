Trellino.Models.List = Backbone.Model.extend({
	
    cards: function(){
      if(!this._cards){
        this._cards = new Trellino.Collections.ListCards([], {
          list: this
        });
      }
      return this._cards;
    }
	
})