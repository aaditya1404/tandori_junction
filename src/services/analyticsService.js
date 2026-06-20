import { getAllOrders } from "./orderService";
import { getAllMenuItems } from "./menuService";

export const getPopularItems = async () => {
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
      7 * 24 * 60 * 60 * 1000;

    orderResult.orders.forEach(
      (order) => {
        if (
          !order.createdAt?.seconds
        ) {
          return;
        }

        const orderTime =
          order.createdAt.seconds *
          1000;

        if (orderTime < oneWeekAgo) {
          return;
        }

        order.items?.forEach(
          (item) => {
            if (
              !sales[item.name]
            ) {
              sales[item.name] = 0;
            }

            sales[item.name] +=
              Number(
                item.quantity || 0
              );
          }
        );
      }
    );

    return Object.entries(
      sales
    )
      .map(
        ([name, quantity]) => {
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

          return {
            id:
              menuItem?.id || name,

            name,

            quantity,

            image:
              menuItem?.image ||
              "/food-placeholder.jpg",

            price:
              menuItem?.finalPrice ??
              menuItem?.price ??
              0,

            isAvailable:
              menuItem?.isAvailable ?? true,
          };
        }
      )
      .sort(
        (a, b) =>
          b.quantity - a.quantity
      )
      .slice(0, 6);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTopSellingItems =
  async () => {

    try {

      const result =
        await getAllOrders();

      if (
        !result.success
      ) {

        return [];

      }

      const sales = {};

      result.orders.forEach(
        (order) => {

          order.items?.forEach(
            (item) => {

              if (
                !sales[item.name]
              ) {

                sales[
                  item.name
                ] = 0;

              }

              sales[
                item.name
              ] += Number(
                item.quantity || 0
              );

            }
          );

        }
      );

      return Object
        .entries(sales)
        .map(
          ([name, quantity]) => ({
            name,
            quantity,
          })
        )
        .sort(
          (a, b) =>
            b.quantity -
            a.quantity
        )
        .slice(0, 3);

    } catch (error) {

      console.error(
        error
      );

      return [];

    }

  };




export const getBestSellers =
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

      orderResult.orders.forEach(
        (order) => {

          order.items?.forEach(
            (item) => {

              if (
                !sales[item.name]
              ) {

                sales[
                  item.name
                ] = 0;

              }

              sales[
                item.name
              ] += Number(
                item.quantity || 0
              );

            }
          );

        }
      );

      return Object
        .entries(sales)
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

            return {

              id:
                menuItem?.id,

              name,

              quantity,

              image:
                menuItem?.image ||
                "/food-placeholder.jpg",

              price:
                menuItem?.finalPrice ||
                menuItem?.price ||
                0,

            };

          }
        )
        .sort(
          (a, b) =>
            b.quantity -
            a.quantity
        )
        .slice(0, 8);

    } catch (error) {

      console.error(
        error
      );

      return [];

    }

  };