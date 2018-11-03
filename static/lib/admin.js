"use strict";
/* globals $, app, socket */

define("admin/plugins/wiki", ["settings"], function(Settings) {
  var ACP = {};

  ACP.init = function() {
    //Settings.load("quickstart", $(".quickstart-settings"));

    onClickInit();
  }; //END - ACP.init

  app.loadJQueryUI(function() {
    reorderCategories();
  }); //END - app.loadJQueryUI

  function onClickInit() {
    //TODO: create edit category

    //***********************DELETE ************************/
    $(".js-category-delete").on("click", function() {
      console.log("delete category :)");
      let categoryEl = $(this).closest(".category");
      let categoryCid = categoryEl.data("category-cid");
      deleteCategory(categoryCid)
        .then(response => {
          //TODO: notify user of successfull / deletion
          $(categoryEl).remove();
          app.alert({
            type: "success",
            alert_id: "category-deleted",
            title: "Category Deleted",
            message: "Please reload your NodeBB to apply these settings",
            clickfn: function() {
              socket.emit("admin.reload");
            }
          });
        })
        .catch(reason => {
          app.alert({
            type: "danger",
            alert_id: "category-not-deleted",
            title: "Category NOT Deleted",
            message: "Something went wrong :o",
            clickfn: function() {
              socket.emit("admin.reload");
            }
          });
        });
    });

    //***********************ADD ************************/

    $("#add").on("click", function() {
      var modal = bootbox.dialog({
        message: $("#wiki-admin__category-add").html(),
        title: "add category",
        buttons: [
          {
            label: "Save",
            className: "btn btn-primary pull-left",
            callback: function() {
              let form = modal.find(".wiki-admin__category-add");
              let submitedData = $(form).serializeObject();
              var errorMessage = "";

              if (submitedData.cid == "" || submitedData.cid < 3) {
                errorMessage +=
                  "Error: cid should be atleast 3 char long !<br>";
              } else if (hasWhiteSpace(submitedData.cid)) {
                errorMessage += "Error: cid can't have white space !!";
              }
              if (submitedData.title < 3 || submitedData.title == "") {
                errorMessage +=
                  "Error: Title should be atleast 3 char long !<br>";
              }
              if (errorMessage.trim()) {
                $(form)
                  .find(".error-message")
                  .html(errorMessage);
                return false;
              }
              let index = getCategoriesAmount();
              createCategory(submitedData,index)
                .then(status => {
                  var clone = $(".category-template")
                    .clone()
                    .removeClass("category-template hidden")
                    .addClass("category");
                  $(clone)
                    .find(".js-title ")
                    .html(submitedData.title);
                  $(clone).find(".js-description").html(submitedData.description);
                  $(clone).find(".js-cid").html(submitedData.cid);
                  $(clone).attr("data-category-cid", submitedData.cid);
                  $(".js-sortable-categories").append(clone);
                  modal.modal("hide");
                  return true;
                })
                .catch(reason => {
                  let x = JSON.parse(reason);
                  $(form)
                    .find(".error-message")
                    .html(x.error);
                  return false;
                });
              return false;
            }
          },
          {
            label: "Close",
            className: "btn btn-default pull-left",
            callback: function() {}
          }
        ],
        show: false,
        onEscape: function() {
          modal.modal("hide");
        }
      });
      modal.modal("show");
    });
  }
function getCategoriesIndex() {
  const $sortableList = $(".js-sortable-categories");
  let listElements = $sortableList.children();
  let categoriesOrder = {};
  $.each(listElements, (key, category) => {
    let categoryCid = $(category).data("category-cid");
    categoriesOrder[key.toString()] = categoryCid;
  });
  return categoriesOrder;
}
function getCategoriesAmount() {
  const $sortableList = $(".js-sortable-categories");
  let listElements = $sortableList.children();
  return listElements.length;
}

function reorderCategories() {
    const $sortableList = $(".js-sortable-categories");
    const sortEventHandler = function(event, ui) {
      let listElements = $sortableList.children();
      let categoriesOrder = {};
      $.each(listElements, (key, category) => {
        let categoryCid = $(category).data("category-cid");
        categoriesOrder[key.toString()] = categoryCid;
      });
      $.post("/api/plugins/wiki/categories/reindex", categoriesOrder, () => {});
    };

    $sortableList.sortable({
      stop: sortEventHandler
    });
  } //END - reorderCategories

  function createCategory(category,index) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "/api/plugins/wiki/categories",
        type: "POST",
        data: {
          'index': index,
          'category': category
        },
        success: (data, textStatus) => {
          resolve(textStatus);
        },
        error: (jqXhr, textStatus, errorThrown) => {
          reject(jqXhr.responseText);
        }
      });
    });
  }
  function deleteCategory(cid) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `/api/plugins/wiki/categories/${cid}`,
        type: "DELETE",
        data: cid,
        success: (data, textStatus) => {
          resolve(textStatus);
        },
        error: (jqXhr, textStatus, errorThrown) => {
          reject(jqXhr.responseText);
        }
      });
    });
  }

  function hasWhiteSpace(s) {
    return /\s/g.test(s);
  }

  return ACP;
}); //END - define....
