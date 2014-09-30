module.exports = function(bookshelf){
    var Education = bookshelf.Model.extend({    
          tableName: 'education'
        });
    return Education;
};