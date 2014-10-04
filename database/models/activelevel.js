module.exports = function(bookshelf){
    var Activelevel = bookshelf.Model.extend({    
          tableName: 'activelevel'
        });
    return Activelevel;
};