module.exports = function(bookshelf){
    var Bodytype = bookshelf.Model.extend({    
          tableName: 'bodytype'
        });
    return Bodytype;
};