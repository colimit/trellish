window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {  
	 var router = new Trellino.Routers.Router($("#content"));
	 Backbone.history.start();
  }
  
};



$(document).ready(Trellino.initialize); 