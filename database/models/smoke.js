module.exports = function(bookshelf){
    var Smoke = bookshelf.Model.extend({    
          tableName: 'smoke'
        });
    return Smoke;
};