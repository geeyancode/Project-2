// // Get the modal
// var modal = document.getElementById('myModal');

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// btn.onclick = function () {
//     modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function () {
//     modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

$(document).on("click", ".buyProductSubmitBtn", event => {
    event.preventDefault();
    // console.log($(event.target).data('productid'))
    // $(".buyProductsubmitBtn").on("click", event => {

    var productId = $(event.target).data('productid');
    var price = $(event.target).data('price');
    var availableQuantity = $(event.target).data('quantity');
    var quantity = $("#productQuantity" + productId).val();
    var productName = $(event.target).data('productname');
    var imgLink = $(event.target).data('img');

    // console.error("productId:", productId)
    // console.error("Price:", price)
    // console.error($("#productQuantity" + productId).val())

    var obj = {
        productId: productId,
        quantity: quantity,
        price: price,
        availableQuantity: availableQuantity
    }

    // $("#modalProduct").modal("show");



    $.post("/api/shoppingCart", obj, function (data) {
        if (data === "noUser") {

            location.assign("/signin")

            // $.get("/signin", (req, res) => {
            //     console.log(res)
            // })
            // console.log("Problems adding the item to your shopping cart")
        }
        else {
            $("#imgModal").attr("src", imgLink);
            $("#modalProductName").text(productName);
            $("#modalProductPrice").text("Price : $" + price);
            $("#modalProductQuantity").text("Quantity: " + quantity);

            $("#modalProduct").modal("show");

        }

    });
})

$(document).on("click", "#btnModalCart", event => {

    $.get("/cart", function (data) {
        if (data === "noUser") {
            location.assign("/signin")

            // $.get("/signin", (req, res) => {
            //     console.log(res)
            // })
            // console.log("Problems adding the item to your shopping cart")
        }
        else {
            $.get("/cart", function (data) {
                if (data === "noItems") {
                    alert("You have no items on your cart")
                }
                else{
                    location.assign("/cart")
                }
            })
        }

    })
})