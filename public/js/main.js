

$(document).ready(function () {

    getCategories();
    // This function grabs todos from the database and updates the view
    function getCategories() {
        $.get("/api/categories", function (data) {
            // console.log(data)
            createNavBar(data);

            // console.log(data)
        }).then(res => {
            // console.log(data)
        });
    }

    function createNavBar(data) {
        console.log(data)
        if (data.user) {
            $("#UserNameMainTitle").text( data.user)
            $("#signupLink").hide();
            $("#signinLink").hide();
            $("#signoutLink").show();
        }
        else{
            $("#signupLink").show();
            $("#signinLink").show();
            $("#signoutLink").hide();
        }
        data.categories.forEach(element => {
            $("#categoriesMenu").append(`<li class="nav-item">
            <a class="nav-link" href="/products/${element.categoryId}">${element.categoryName}</a></li>`)
        });

    }

    $(document).on("click", "#btnCartMain", event => {

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

    // $(document).on("click", ".buyProductsubmitBtn", event=>{
    //     // $(".buyProductsubmitBtn").on("click", event => {
    //         var obj = {
    //             productId: $("#productId").text(),
    //             quantity: $("#quantity").text(),
    //             price: $("#price").text()
    //         }

    //         $.post("/api/shoppingCart", obj, function (data) {
    //             if (data) {
    //                 alert("Item added to your Shopping Cart")    
    //             }
    //             else{
    //                 alert("Problems adding the item to your shopping cart")    
    //             }

    //         });
    //     })

})