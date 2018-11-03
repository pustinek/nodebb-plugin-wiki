"use strict";
const Nodebb = require("./nodebb");
const categories = require("./categories");
const path = Nodebb.path;
const nconf = Nodebb.nconf;
const controllerHelpers = Nodebb.controllerHelpers;
const util = Nodebb.util;
const bjs = Nodebb.bjs;
const fs = Nodebb.fs;
const mkdirp = Nodebb.mkdirp;
const express = Nodebb.express;
const async = Nodebb.async;
const helpers = Nodebb.helpers;
var hotswap = module.parent.parent.require("./hotswap");
//====	Promisified functions	=====
const readFile = util.promisify(fs.readFile);
//====	Global Variables	=====
var Controllers = {};
var middleware;

Controllers.init = function(params) {
  middleware = params.middleware;
  const { app, router } = params;
  reloadRoutes(router);
};

Controllers.renderAdminPage = function(req, res, next) {
  categories.getCategories().then(data => {
    let renderData = {
      categories: data
    };
    res.render("admin/plugins/wiki", renderData);
  });
};

function renderCategoryPages(req, res, next) {
  var path = req.path.replace(/\/(api\/)?/, "").replace(/\/$/, "");
  console.log(`rendering page -> ${path}`);
  let preBreadcrumbs = createBreadcrumbsArray(path);
  let x = controllerHelpers.buildBreadcrumbs(
    preBreadcrumbs
  );
  res.render(`${path}`,{
    breadcrumbs: x
  });
};

function reloadRoutes(router) {
  var pagesRouter = express.Router();
  var tpl = "";
  readFile(path.join(__dirname, "../static/templates/wiki-category.tpl"))
    .then(binaryTPL => {
      tpl = binaryTPL.toString();
      return categories.getCategories();
    })
    .then(categories => {
      console.log(categories);
      async.each(
        categories,
        (pageObj, next) => {
		  let route = pageObj.cid;
		  let name = `/wiki/${route}`;
		  console.log(route);
		  pagesRouter.hotswapId = "wiki-pages";
		  //TODO: make the helpers.setupPageRoute work !!
        //   helpers.setupPageRoute(
        //     pagesRouter,
        //     `/wiki/${route}`,
        //     middleware,
        //     [],
        //     renderCategoryPages
		//   );
			let middlewares_ = []
			const middlewares = [middleware.maintenanceMode, middleware.registrationComplete, middleware.pageView, middleware.pluginHooks].concat(middlewares_);
			router.get(name,middleware.buildHeader,middlewares, renderCategoryPages);
			router.get('/api' + name, middlewares, renderCategoryPages);
			preCompileBJS(tpl,`wiki/${route}`);
        },
        error => {
		  console.log(error);
        }
	  );
    });
};

Controllers.renderWikiPage = function(req, res, next) {
  let results = {
    plugin: {
      breadcrumbs: [],
      categories: []
    }
  };
  let sdata = {};
  var rpath = req.path.replace(/\/(api\/)?/, "").replace(/\/$/, "");
  let route = "wiki";
  var preBreadcrumbs = createBreadcrumbsArray(rpath);
  results.plugin.breadcrumbs = controllerHelpers.buildBreadcrumbs(
    preBreadcrumbs
  );
  categories.getCategories().then(data => {
	results.plugin.categories = data;
	return readFile(path.join(__dirname, "../static/templates/wiki.tpl"))
  }) .then(tpl => {
      sdata.tpl = tpl.toString();
      return bjs.precompile(tpl.toString(), {});
    })
    .then(compiled => {
      let jsPath = path.join(nconf.get("views_dir"), route + ".js");
      let tplPath = path.join(nconf.get("views_dir"), route + ".tpl");
      if (path.dirname(route) !== ".") {
        // Subdirectories specified
        mkdirp(path.join(nconf.get("views_dir"), path.dirname(route)), function(
          err
        ) {
          if (err) {
            throw err;
          }

          fs.writeFile(jsPath, compiled, function(err) {
            if (err) {
              throw err;
            }

            fs.writeFile(tplPath, sdata.tpl, next);
          });
        });
      } else {
        fs.writeFile(jsPath, compiled, function(err) {
          if (err) {
            throw err;
          }

          fs.writeFile(tplPath, sdata.tpl);
        });
      }
      res.render("wiki", results.plugin);
    })
    .catch(reason => {
      res.status(500).send(reason);
    });
};

function createBreadcrumbsArray(breadPath) {
  var preBreadcrumbs = [];

  var arr = breadPath.split("/");
  //console.log(breadPath);
  arr.forEach(element => {
    let reg = ".+?(?=" + element + ")";
    let x = breadPath.match(reg);
    //console.log(element);
    //onsole.log(x);
    if (x == null) {
      preBreadcrumbs.push({
        text: element,
        url: "/" + element
      });
    }
    if (x != null) {
      preBreadcrumbs.push({
        text: element,
        url: "/" + nconf.get("relative_path") + x[0] + element
      });
    }

    //console.log(element);
  });
  return preBreadcrumbs;
}

function preCompileBJS(customTPL, route) {
  return new Promise((resolve, reject) => {
    bjs.precompile(customTPL, {}).then(compiledTPL => {
      let jsPath = path.join(nconf.get("views_dir"), route + ".js");
	  let tplPath = path.join(nconf.get("views_dir"), route + ".tpl");
	  console.log(tplPath);
      if (path.dirname(route) !== ".") {
        // Subdirectories specified
        mkdirp(path.join(nconf.get("views_dir"), path.dirname(route)), function(
          err
        ) {
          if (err) {
            reject(err);
          }
          fs.writeFile(jsPath, compiledTPL, function(err) {
            if (err) {
				reject(err);
            }

			fs.writeFile(tplPath, customTPL);
			resolve("OK");
          });
        });
      } else {
        fs.writeFile(jsPath, compiledTPL, function(err) {
          if (err) {
            reject(err);
          }

		  fs.writeFile(tplPath, customTPL);
		  resolve("OK");
        });
      }
    });
  });
};

module.exports = Controllers;
