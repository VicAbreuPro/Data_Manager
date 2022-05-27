const routes = [{
        path: "/",
        component: () =>
            import ("layouts/MainLayout.vue"),
        children: [{
                path: "",
                name: "loginPg",
                component: () =>
                    import ("pages/LoginPg.vue")
            },
            {
                path: "RegisterPg",
                name: "registerPg",
                component: () =>
                    import ("pages/RegisterPg.vue")
            },
        ],
    },
    {
        path: "/",
        component: () =>
            import ("layouts/HomeLayout.vue"),
        children: [{
                path: "Home",
                name: "homePg",
                component: () =>
                    import ("pages/HomePg.vue")
            },
            {
                path: "Stock",
                name: "ProductPg",
                component: () =>
                    import ("src/pages/ProductPg.vue")
            },
            {
                path: "Client",
                name: "cliPg",
                component: () =>
                    import ("pages/ClientPg.vue")
            },
            {
                path: "Sales",
                name: "salePg",
                component: () =>
                    import ("src/pages/SalePg.vue")
            },
            {
                path: "Supplier",
                name: "supplierPg",
                component: () =>
                    import ("src/pages/SupplierPg.vue")
            },
            {
                path: "Message",
                name: "MessagePg",
                component: () =>
                    import ("src/pages/MessagePg.vue")
            },
        ],
        meta: {
            requiresAuth: true
        }
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: "/:catchAll(.*)*",
        component: () =>
            import ("pages/Error404.vue"),
    },
];

export default routes;