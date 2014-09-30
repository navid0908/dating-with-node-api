module.exports = function(bookshelf){
    var Drug = bookshelf.Model.extend({    
          tableName: 'drug'
        });
    return Drug;
};