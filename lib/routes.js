const express = require("express");
const router = express.Router();

const Nodebb = require("./nodebb");
const controllers = require("./controllers");
const categories = require("./categories");
const helpers = Nodebb.helpers;
const fs = Nodebb.fs;
const util = Nodebb.util;
const path = Nodebb.path;

module.exports = function routes(app, middleware, router) {


  router.get('/wiki', middleware.buildHeader, controllers.renderWikiPage);
  router.get('/api/wiki', controllers.renderWikiPage);
  //router.get('/api/wiki', controllers.renderWikiPage);

  


  router.get("/api/plugins/wiki/categories", (req, res) => {
    categories
      .getCategories()
      .then(categories => {
        res.status(200).send(categories);
      })
      .catch(error => {
        res.status(500).send({ error: error });
      });
  });

  // We create two routes for every view. One API call, and the actual route itself.
  // Just add the buildHeader middleware to your route and NodeBB will take care of everything for you.
  router.get(
    "/admin/plugins/wiki",
    middleware.admin.buildHeader,
    controllers.renderAdminPage
  );
  
  router.get("/api/plugins/wiki", controllers.renderAdminPage);

  router.get("/api/plugins/wiki/categories/:cid", (req, res) => {
    categories
      .getCategory(req.params.cid)
      .then(category => {
        res.status(200).send(category);
      })
      .catch(reason => {
        res.status(500).send(reason);
      });
  });
  router.delete("/api/plugins/wiki/categories/:cid", (req, res) => {
    let cid = req.params.cid;
    categories
      .delete(cid)
      .then(data => {
        res.status(200).send(`successfully deleted category with ID ${cid}`);
      })
      .catch(reason => {
        res.status(500).send(reason);
      });
  });

  router.post("/api/plugins/wiki/categories/reindex", (req, res) => {
    let newIndexList = req.body;
    categories
      .reindex(newIndexList)
      .then(on => {
        res.status(200).send(on);
      })
      .catch(reason => {
        res.status(500).send(reason);
      });
  });
  router.post("/api/plugins/wiki/categories", (req, res) => {
    let cid = req.body.category.cid;
    categories
      .getCategory(cid)
      .then(data => {
        //category exist, return error !!
        res
          .status(400)
          .send({ error: `category with ID ${cid} already exists !` });
      })
      .catch(reason => {
        //category doesn't exist, continue !
        if (cid == "error") {
          res.status(400).send({ error: "invalid data sent to the server !" });
        } else {
          categories
            .create(req.body.category, req.body.index)
            .then(x => {
              res.status(200).send("OK");
            })
            .catch(reason => {
              res
                .status(400)
                .send({ error: "invalid data sent to the server !" });
            });
        }
      });
  });
};
