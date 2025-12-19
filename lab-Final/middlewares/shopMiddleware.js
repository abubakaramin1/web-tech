
function checkCartNotEmpty(req, res, next) {
    let cart = req.session.cart;
    if (!cart || cart.length === 0) {
        req.flash("danger", "Your cart is empty!");
        return res.redirect("/");
    }
    next();
}

function adminOnly(req, res, next) {
    if (req.session.user && req.session.user.email === "admin@shop.com") {
        return next();
    }
    req.flash("danger", "Access Denied! Admins only.");
    res.redirect("/login");
}

module.exports = { checkCartNotEmpty, adminOnly };
