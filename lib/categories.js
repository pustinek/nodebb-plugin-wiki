var Nodebb, db, async, util;
var Categories = {};

var getSorted, getObjs, getObj, setObj, sortedSetAdd, delObj, sortedSetRemove;

Categories.init = function() {
  Nodebb = module.require("./nodebb");
  db = Nodebb.db;
  async = Nodebb.async;
  util = Nodebb.util;

  getSorted = util.promisify(db.getSortedSetRange);
  getObjs = util.promisify(db.getObjects);
  getObj = util.promisify(db.getObject);
  setObj = util.promisify(db.setObject);
  sortedSetAdd = util.promisify(db.sortedSetAdd);
  delObj = util.promisify(db.delete);
  sortedSetRemove = util.promisify(db.sortedSetRemove);
};

Categories.getCategories = function() {
  return new Promise((resolve, reject) => {
    getSorted("nodebb-plugin-wiki:categories", 0, -1)
      .then(data => {
        return data;
      })
      .then(y => {
        return getObjs(
          y.map(cid => `nodebb-plugin-wiki:categories:cid:${cid}`)
        );
      })
      .then(data => {
        resolve(data);
      })
      .catch(reason => {
        reject(reason);
      });
  });
};

Categories.getCategory = function(cid) {
  return new Promise((resolve, reject) => {
    getObj(`nodebb-plugin-wiki:categories:cid:${cid}`)
      .then(category => {
        category
          ? resolve(category)
          : reject({ error: `couldnt find category with ID: ${cid}` });
      })
      .catch(reason => {
        reject(reason);
      });
  });
};

Categories.create = function(category, index) {
  //console.log(category, index);
  return new Promise((resolve, reject) => {
    let { cid } = category;
    setObj(`nodebb-plugin-wiki:categories:cid:${cid}`, category)
      .then(() => {
        return sortedSetAdd(`nodebb-plugin-wiki:categories`, index, cid);
      })
      .then(() => {
        resolve(category);
      })
      .catch(reason => {
        reject(reason);
      });
  });
};

Categories.delete = function(cid) {
  return new Promise((resolve, reject) => {
    delObj(`nodebb-plugin-wiki:categories:cid:${cid}`)
      .then(() => {
        return sortedSetRemove(`nodebb-plugin-wiki:categories`, cid);
      })
      .then(() => {
        return treindex();
      })
      .then(data => {
        resolve(data);
      })
      .catch(reason => {
        console.log(reason);
        reject(reason);
      });
  });
};

Categories.reindex = function(data) {
  return new Promise((resolve, reject) => {
    async.eachOf(data, (x, index) => {
      sortedSetAdd("nodebb-plugin-wiki:categories", index, x).catch(reason => {
        reject(error);
      });
    });
    resolve("OK");
  });
};

let treindex = function(data) {
  return new Promise((resolve, reject) => {
    getSorted("nodebb-plugin-wiki:categories", 0, -1)
      .then(data => {
        async.eachOf(data, (cid, index) => {
          sortedSetAdd("nodebb-plugin-wiki:categories", index, cid)
            .then()
            .catch(r => {
              return r;
            });
        });
      })
      .then(() => {
        console.log("treindex done !");
        resolve("Successfully reindexed !");
      })
      .catch(reason => {
        reject(reason);
      });
  });
};

module.exports = Categories;
