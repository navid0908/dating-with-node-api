module.exports = function(bookshelf){
    var Drink = bookshelf.Model.extend({    
          tableName: 'drink'
        });
    return Drink;
};