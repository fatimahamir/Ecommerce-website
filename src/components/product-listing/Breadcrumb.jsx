// src/components/product-listing/Breadcrumb.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Breadcrumb = () => {
  const location = useLocation();
  const { items: products } = useSelector((state) => state.products);

  const getBreadcrumbItems = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const items = [{ label: "Home", path: "/" }];

    const routeLabels = {
      products: "Catalog",
      cart: "My Cart",
      checkout: "Checkout",
      wishlist: "Wishlist",
      deals: "Deals",
      profile: "My Profile",
    };

    pathSegments.forEach((segment, index) => {
      let label = "";
      let path = "/" + pathSegments.slice(0, index + 1).join("/");

      if (pathSegments[index - 1] === "product" && !isNaN(segment)) {
        const product = products.find((p) => p.id === Number(segment));
        label = product ? product.title : `Product #${segment}`;
      } else if (segment === "products") {
        const params = new URLSearchParams(location.search);
        const category = params.get("category");
        label = category || routeLabels[segment];
        path = location.pathname;
      } else if (routeLabels[segment]) {
        label = routeLabels[segment];
      }

      if (label) {
        items.push({ label, path });
      }
    });

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <nav className="flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
      {breadcrumbItems.map((item, i) => {
        const isLast = i === breadcrumbItems.length - 1;

        return (
          <React.Fragment key={i}>
            {i > 0 && <span className="text-gray-300">/</span>}

            {isLast ? (
              <span className="text-gray-600 font-medium">{item.label}</span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;