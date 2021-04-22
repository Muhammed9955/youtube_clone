import gql from "graphql-tag";

// mutations
export const REGISTER_USER = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        id
        username
        email
        confirmed
        blocked
        role {
          id
          name
          description
        }
        # role_type
      }
    }
  }
`;

export const FETCH_USERS_QUERY = gql`
  {
    users {
      id
      created_at
      updated_at
      email
      username
    }
  }
`;
export const FETCH_USER_QUERY = gql`
  query FETCH_USER_QUERY($id: ID!) {
    user(id: $id) {
      id
      created_at
      updated_at
      email
      username
    }
  }
`;
export const UPDATE_USER = gql`
  mutation updateUser($id: ID!, $data: editUserInput) {
    updateUser(input: { where: { id: $id }, data: $data }) {
      user {
        id
        username
        email
        createdAt
        updatedAt
        role_type
        addresses {
          name
        }
      }
    }
  }
`;
export const CREATE_VIDEO = gql`
  mutation createVideo($data: VideoInput) {
    createVideo(input: { data: $data }) {
      video {
        id
        created_at
        title
        description
        channel_Id
        video_url
        owner {
          id
          username
        }
        comments {
          id
          text
          created_at
          user {
            username
          }
        }
      }
    }
  }
`;
export const CREATE_COMMENT = gql`
  mutation createComment($data: CommentInput) {
    createComment(input: { data: $data }) {
      comment {
        id
        text
        created_at
        user {
          username
        }
      }
    }
  }
`;

export const UPDATE_VIDEO = gql`
  mutation updateVideo($id: ID!, $data: editVideoInput) {
    updateVideo(input: { where: { id: $id }, data: $data }) {
      video {
        id
        created_at
        title
        description
        channel_Id
        video_url
        owner {
          id
          username
        }
        comments {
          id
          text
          created_at
          user {
            username
          }
        }
      }
    }
  }
`;

//queries
export const FETCH_VIDEOS = gql`
  query videos($limit: Int!) {
    videos(sort: "created_at:desc", limit: $limit) {
      id
      created_at
      title
      description
      channel_Id
      video_url
      owner {
        id
        username
      }
      comments {
        id
        text
        created_at
        user {
          username
        }
      }
    }
  }
`;
export const FETCH_VIDEO = gql`
  query video($id: ID!) {
    video(id: $id) {
      id
      created_at
      title
      description
      channel_Id
      video_url
      owner {
        id
        username
      }
      comments {
        id
        text
        created_at
        user {
          username
        }
      }
    }
  }
`;

//queries
export const FETCH_COMMENTS = gql`
  query comments($id: ID!) {
    comments(sort: "created_at:desc", where: { video: $id }) {
      id
      text
      created_at
      user {
        username
      }
    }
  }
`;

// delete
export const DELETE_VIDEO = gql`
  mutation deleteVideo($id: ID!) {
    deleteVideo(input: { where: { id: $id } }) {
      video {
        id
      }
    }
  }
`;

//OLD
export const UPDATE_ORDER = gql`
  mutation updateOrder($id: ID!, $data: editOrderInput) {
    updateOrder(input: { where: { id: $id }, data: $data }) {
      order {
        _id
        createdAt
        updatedAt
        with_cash
        cash_on_delivery_cost
        items_number
        package_description
        allow_customers_to_open_packages
        customer_name
        custome_phone
        customer_secondary_phone
        delivery_notes
        customer_city
        customer_street_name
        customer_area
        customer_landmarks
        customer_floor_no
        customer_apartment_no
        customer_building_no
        this_is_a_work_address
        status
        published_at
        items_number
        shipping_cost
        returned_cash
        notes
        user {
          id
          email
          username
          role_type
        }
      }
    }
  }
`;

export const CREATE_ORDER_HISTORY = gql`
  mutation createOrderHistory($order: ID!, $history_note: String!) {
    createOrderHistory(
      input: { data: { order: $order, history_note: $history_note } }
    ) {
      orderHistory {
        id
        createdAt
        history_note
        order {
          id
        }
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation createProduct($data: ProductInput) {
    createProduct(input: { data: $data }) {
      product {
        id
        createdAt
        name
        description
        price
        productVariants {
          id
          name
          quantity
          type
        }
        user {
          id
        }
        varieties {
          variant {
            name
            value
          }
        }
      }
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: ID!, $data: editProductInput) {
    updateProduct(input: { where: { id: $id }, data: $data }) {
      product {
        id
        createdAt
        name
        description
        price
        productVariants {
          id
          name
          quantity
        }
        user {
          id
        }
        varieties {
          variant {
            name
            value
          }
        }
      }
    }
  }
`;

// delete
export const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(input: { where: { id: $id } }) {
      order {
        id
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(input: { where: { id: $id } }) {
      product {
        id
      }
    }
  }
`;
//queries
export const FETCH_ORDER_HISTORIES_QUERY = gql`
  query orderHistories($order: ID!) {
    orderHistories(where: { order: $order }, sort: "createdAt:desc") {
      id
      createdAt
      history_note
      order {
        id
      }
    }
  }
`;
export const FETCH_USER_ADDRESSES_QUERY = gql`
  query userAddresses($user: ID!) {
    addresses(where: { user: $user }) {
      id
      name
      user {
        username
      }
    }
  }
`;

export const FETCH_ORDERS_QUERY = gql`
  {
    orders {
      _id
      createdAt
      updatedAt
      with_cash
      cash_on_delivery_cost
      items_number
      package_description
      allow_customers_to_open_packages
      customer_name
      custome_phone
      customer_secondary_phone
      delivery_notes
      customer_city
      customer_street_name
      customer_area
      customer_landmarks
      customer_floor_no
      customer_apartment_no
      customer_building_no
      this_is_a_work_address
      status
      published_at
      items_number
      shipping_cost
      returned_cash
      notes
      user {
        id
        email
        username
        role_type
      }
    }
  }
`;
export const FETCH_USER_ORDERS_QUERY = gql`
  query userOrders($user: ID!) {
    orders(where: { user: $user }) {
      _id
      createdAt
      updatedAt
      with_cash
      cash_on_delivery_cost
      items_number
      package_description
      allow_customers_to_open_packages
      customer_name
      custome_phone
      customer_secondary_phone
      delivery_notes
      customer_city
      customer_street_name
      customer_area
      customer_landmarks
      customer_floor_no
      customer_apartment_no
      customer_building_no
      this_is_a_work_address
      status
      published_at
      items_number
      shipping_cost
      returned_cash
      notes
      user {
        id
        email
        username
        role_type
      }
    }
  }
`;
export const FETCH_ORDER_QUERY = gql`
  query order($id: ID!) {
    order(id: $id) {
      _id
      createdAt
      updatedAt
      with_cash
      cash_on_delivery_cost
      items_number
      package_description
      allow_customers_to_open_packages
      customer_name
      custome_phone
      customer_secondary_phone
      delivery_notes
      customer_city
      customer_street_name
      customer_area
      customer_landmarks
      customer_floor_no
      customer_apartment_no
      customer_building_no
      this_is_a_work_address
      status
      published_at
      items_number
      shipping_cost
      returned_cash
      notes
      user {
        id
        email
        username
        role_type
      }
    }
  }
`;

export const FETCH_PRODUCT_QUERY = gql`
  query($id: ID!) {
    product(id: $id) {
      id
      createdAt
      name
      description
      price
      productVariants {
        id
        name
        quantity
        type
      }
      user {
        id
      }
      varieties {
        variant {
          name
          value
        }
      }
    }
  }
`;
export const FETCH_PRODUCTS = gql`
  query products($user: ID!) {
    products(where: { user: $user }, sort: "createdAt:desc") {
      id
      createdAt
      name
      description
      price
      productVariants {
        id
        name
        quantity
        type
      }
      user {
        id
      }

      varieties {
        variant {
          name
          value
        }
      }
    }
  }
`;
