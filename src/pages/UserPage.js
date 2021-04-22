import { useQuery } from "@apollo/client";
import React from "react";
// import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ScrollableTabsButtonAuto from "../components/customer/ScrollableTabsButtonAuto";
import { FETCH_USER_QUERY, FETCH_USER_ORDERS_QUERY } from "../utils/graphql";
// import { useOrders, useUsers } from "../utils/hooks";

const UserPage = () => {
  // let user = useSelector((state) => state.users?.user);

  let { id } = useParams();
  const { loading: userLoading, data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      id,
    },
  });
  const { loading: ordersLoading, data: userOrders } = useQuery(
    FETCH_USER_ORDERS_QUERY,
    {
      variables: {
        user: id,
      },
    }
  );
  console.log({ id });
  console.log({ orders: data });
  console.log({ userOrders });
  console.log({ userLoading });
  // const { orders, loading: ordersLoading } = useOrders();
  // const { loading: userInfoLoading } = useUsers(id);
  // const userOrders = orders.filter((i) => i.owner_Id === id);

  return (
    <div>
      <ScrollableTabsButtonAuto
        userFound={data?.user}
        userInfoLoading={userLoading}
        userOrders={userOrders?.orders}
        ordersLoading={ordersLoading}
      />
    </div>
  );
};

export default UserPage;
