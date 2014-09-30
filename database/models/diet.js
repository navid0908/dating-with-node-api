module.exports = function(bookshelf){
    var Diet = bookshelf.Model.extend({    
          tableName: 'diet'
        });
    return Diet;
};