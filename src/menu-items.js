import "../node_modules/font-awesome/css/font-awesome.css";

export default {
  items: [
    {
      id: "navigation",
      title: "Explora",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "dashboard",
          title: "Dashboard",
          type: "item",
          url: "/dashboard",
          icon: "feather icon-home",
        },
      ],
    },

    {
      id: "pages",
      title: "Opera",
      type: "group",
      icon: "icon-pages",
      children: [
        {
          id: "personal",
          title: "Personal",
          type: "item",
          url: "/human_resources",
          classes: "nav-item",
          icon: "fa fa-users",
        },
        {
          id: "ciclos",
          title: "Ciclos",
          type: "item",
          url: "/cycles",
          classes: "nav-item",
          icon: "fa fa-clock-o",
        },
        {
          id: "lotes",
          title: "Lotes",
          type: "item",
          url: "/lots",
          classes: "nav-item",
          icon: "fa fa-map-signs",
        },
        {
          id: "siembras",
          title: "Siembras",
          type: "item",
          url: "/sowings",
          classes: "nav-item",
          icon: "fa fa-leaf",
        },
        {
          id: "bitacoras",
          title: "Bitácoras",
          type: "item",
          url: "/binnacle",
          classes: "nav-item",
          icon: "fa fa-list-alt",
        },
        {
          id: "cosechas",
          title: "Cosechas",
          type: "item",
          url: "/harvests",
          classes: "nav-item",
          icon: "fa fa-truck",
        },
        {
          id: "finanzas",
          title: "Finanzas",
          type: "item",
          url: "/finances",
          classes: "nav-item",
          icon: "fa fa-line-chart",
        },
        /*{
                    id: 'buy-now',
                    title: 'Buy Now',
                    type: 'item',
                    icon: 'feather icon-user',
                    classes: 'nav-item',
                    url: 'https://codedthemes.com',
                    target: true,
                    external: true,
                    badge: {
                        title: 'v1.0',
                        type: 'label-primary'
                    }
                }*/
      ],
    },
  ],
};
