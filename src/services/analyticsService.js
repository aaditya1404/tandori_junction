import {
  getAllOrders,
} from "./orderService";

import {
  getAllMenuItems,
} from "./menuService";

export const getPopularItems =
  async () => {

    try {

      const orderResult =
        await getAllOrders();

      const menuResult =
        await getAllMenuItems();

      if (
        !orderResult.success ||
        !menuResult.success
      ) {

        return [];

      }

      const sales = {};

      const menuItems =
        menuResult.data;

      const oneWeekAgo =
        Date.now() -
        (
          7 *
          24 *
          60 *
          60 *
          1000
        );

      orderResult.orders.forEach(
        (order) => {

          if (
            !order.createdAt
              ?.seconds
          ) {
            return;
          }

          const orderTime =
            order.createdAt
              .seconds *
            1000;

          if (
            orderTime <
            oneWeekAgo
          ) {
            return;
          }

          order.items?.forEach(
            (item) => {

              if (
                !sales[
                  item.name
                ]
              ) {

                sales[
                  item.name
                ] = 0;

              }

              sales[
                item.name
              ] +=
                Number(
                  item.quantity ||
                  0
                );

            }
          );

        }
      );

      return Object
        .entries(
          sales
        )
        .map(
          ([
            name,
            quantity,
          ]) => {

         const menuItem =
  menuItems.find(
    (menu) =>
      menu.name
        ?.trim()
        .toLowerCase() ===
      name
        ?.trim()
        .toLowerCase()
  );    
              console.log(menuItem);

            return {

              name,

              quantity,

              image:
                menuItem?.image ||
                "/food-placeholder.jpg",

            };

          }
        )
        .sort(
          (a, b) =>
            b.quantity -
            a.quantity
        )
        .slice(0, 6);

    } catch (error) {

      console.error(
        error
      );
console.log(menuItems);
console.log(sales);
      return [];

    }

  };    