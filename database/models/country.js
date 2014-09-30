module.exports = function(bookshelf){
    var Country = bookshelf.Model.extend({    
          tableName: 'country'
        });
    return Country;
};