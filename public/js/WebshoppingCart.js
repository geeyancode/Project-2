function removeProduct(productId) {

  console.log("/api/shoppingCart/" + productId)

  var productUrl = "/api/shoppingCart/" + productId

  $.ajax({
    type: "DELETE",
    url: productUrl
  }).then(function (product) {
    if (product === "deleted") {
      location.assign("/cart")
    } else if ("noItems") {
      location.assign("/products")
    }
  });
  //$.delete("/api/shoppingCart/" + productId)
}

function updateProduct(productId) {

  var newQuantity = $("#quantity" + productId).val()

  console.log("/api/shoppingCart/" + productId + "/" +newQuantity)

  var productUrl = "/api/shoppingCart/" + productId + "/" + newQuantity

  $.ajax({
    type: "PUT",
    url: productUrl
  }).then(function (product) {
    if (product === "updated") {
      location.assign("/cart")
    } else if ("noItems") {
      location.assign("/products")
    }
  });
  //$.delete("/api/shoppingCart/" + productId)
}