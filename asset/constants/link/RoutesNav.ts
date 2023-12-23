export type TRoutesNav = {
  titleParent: string,
  icon: string,
  links: {
    name: string,
    path: string,
  }[]
}

export const routesNav: TRoutesNav[] = [
  {
    titleParent: "Dashboard",
    icon       : "fluent:data-pie-24-filled",

    links: [
      {
        name: "Dashboard",
        path: "/",
      },
    ],
  },
  {
    titleParent: "Transaction",
    icon       : "mdi:trolley",

    links: [
      {
        name: "Orderan",
        path: "/orderan/create",
      }, {
        name: "Table",
        path: "/table/Semua",
        // icon : "ph:table".
      },
    ],
  },
  {
    titleParent: "Product",
    icon       : "icon-park-outline:ad-product",
    links      : [
      {
        name: "List",
        path: "/product/list",
      },
      {
        name: "Create",
        path: "/product/create",
      },
    ],
  },
  {
    titleParent: "Delivery",
    icon       : "carbon:delivery",
    links      : [
      {
        name: "List",
        path: "/delivery/list?page=1&take=10",
      },
      {
        name: "Create",
        path: "/delivery/create",
      },
    ],
  },

  {
    titleParent: "Bank",
    icon       : "tdesign:money",
    links      : [
      {
        name: "List",
        path: "/bank/list?page=1&take=10",
      },
      {
        name: "Create",
        path: "/bank/create",
      },
    ],
  }
]