module.exports = function(bookshelf){
    var Children = bookshelf.Model.extend({    
          tableName: 'children'
        });
    return Children;
};