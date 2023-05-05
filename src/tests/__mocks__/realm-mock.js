const _cache = {};

const realm = function() {
  return {
    close: jest.fn(),

    objects: function (schemaName) {
     return []
    },

    objectForPrimaryKey: (key, key2) => {
      return {value: _cache[key2]};
    },

    write: jest.fn().mockImplementation((callback) => {
      callback()
    }),

    create: function (schemaName, object) {
      _cache[object.key] = object.value;
    }
  };
};
realm.deleteFile = () => {};
realm.UpdateMode = {
  Never: 'never',
  Modified: 'modified',
  All: 'all',
};


module.exports = realm;