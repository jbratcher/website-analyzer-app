// utility to convert json object from kebab-case and snake_case to camelCase
// adapted from https://matthiashager.com/converting-snake-case-to-camel-case-object-keys-with-javascript
// and jsfile http://jsfiddle.net/ms734bqn/1/

module.exports = {
    toCamel: (string) => {
        return string.replace(/([-_][a-z])/ig, (word) => {
          return word.toUpperCase()
            .replace('-', '')
            .replace('_', '');
        });
    },
    isArray: function (array) {
    return Array.isArray(array);
    },
    isObject: function (object) {
    return object === Object(object) && !this.isArray(object) && typeof object !== 'function';
    },
    keysToCamel: function (object) {
        if (this.isObject(object)) {
            const newObject = {}; 
            Object.keys(object)
                .forEach((key) => {
                    newObject[this.toCamel(key)] = this.keysToCamel(object[key]);
                });
    
            return newObject;
        } else if (this.isArray(object)) {
            return object.map((index) => {
            return this.keysToCamel(index);
            });
        }
    
        return object;
    }
}
