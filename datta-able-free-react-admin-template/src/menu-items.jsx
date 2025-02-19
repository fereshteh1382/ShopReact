const menuItems = {
  items: [
    {
      id: 'navigation',
      title: 'Navigation',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/app/dashboard/default'
        }
      ]
    },
   /* {
      id: 'ui-element',
      title: 'UI ELEMENT',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'component',
          title: 'Component',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'Button',
              type: 'item',
              url: '/basic/button'
            },
            {
              id: 'badges',
              title: 'Badges',
              type: 'item',
              url: '/basic/badges'
            },
            {
              id: 'breadcrumb',
              title: 'Breadcrumb & Pagination',
              type: 'item',
              url: '/basic/breadcrumb-paging'
            },
            {
              id: 'collapse',
              title: 'Collapse',
              type: 'item',
              url: '/basic/collapse'
            },
            {
              id: 'tabs-pills',
              title: 'Tabs & Pills',
              type: 'item',
              url: '/basic/tabs-pills'
            },
            {
              id: 'typography',
              title: 'Typography',
              type: 'item',
              url: '/basic/typography'
            }
          ]
        }
      ]
    },*/
    {
      id: 'shop',
      title: 'Shop',
      type: 'group',
      icon: 'icon-ui',
      children: [
        {
          id: 'media',
          title: 'Media',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'AddMedia',
              type: 'item',
              url: '/media/addmedia'
            },
            {
              id: 'allmedia',
              title: 'AllMedia',
              type: 'item',
              url: '/media/allmedia'
            }
            
          ],
        },{
          id: 'category',
          title: 'Category',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
            {
              id: 'button',
              title: 'AddCategory',
              type: 'item',
              url: '/shop/addcategory'
            },
            
            {
              id: 'button',
              title: 'AllCategory',
              type: 'item',
              url: '/shop/allcategory'
            },
            
          ],
        },{
          id: 'brands',
          title: 'Brands',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
           
            {
              id: 'button',
              title: 'AddBrands',
              type: 'item',
              url: '/shop/addbrands'
            },
            {
              id: 'button',
              title: 'AllBrands',
              type: 'item',
              url: '/shop/allbrands'
            },
          ], 
        },{
          id: 'scoring',
          title: 'Scoring',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
           
            {
              id: 'button',
              title: 'AddScoring',
              type: 'item',
              url: '/shop/addscoring'
            },
            {
              id: 'button',
              title: 'AllScoring',
              type: 'item',
              url: '/shop/allscoring'
            },
          ], 
        }
        ,{
          id: 'specifications',
          title: 'Specifications',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
           
            {
              id: 'button',
              title: 'Specifications',
              type: 'item',
              url: '/shop/specifications'
            },
            {
              id: 'button',
              title: 'SubSpecifications',
              type: 'item',
              url: '/shop/subspecifications'
            },
          ], 
        }
        ,{
          id: 'products',
          title: 'Products',
          type: 'collapse',
          icon: 'feather icon-box',
          children: [
           
            {
              id: 'seller',
              title: 'Seller',
              type: 'item',
              url: '/products/seller'
            },
            {
              id: 'warranty',
              title: 'Warranty',
              type: 'item',
              url: '/products/warranty'
            },
            {
              id: 'addproduct',
              title: 'AddProduct',
              type: 'item',
              url: '/products/addproduct'
            },
            {
              id: 'products',
              title: 'Products',
              type: 'item',
              url: '/products/products'
            },
          ], 
        }
        
      ]
    },
   /*  {
      id: 'ui-forms',
      title: 'FORMS & TABLES',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'forms',
          title: 'Form Elements',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/forms/form-basic'
        },
        {
          id: 'table',
          title: 'Table',
          type: 'item',
          icon: 'feather icon-server',
          url: '/tables/bootstrap'
        }
      ]
    },
    {
      id: 'chart-maps',
      title: 'Chart & Maps',
      type: 'group',
      icon: 'icon-charts',
      children: [
        {
          id: 'charts',
          title: 'Charts',
          type: 'item',
          icon: 'feather icon-pie-chart',
          url: '/charts/nvd3'
        },
        {
          id: 'maps',
          title: 'Maps',
          type: 'item',
          icon: 'feather icon-map',
          url: '/maps/google-map'
        }
      ]
    }, */
    {
      id: 'pages',
      title: 'Pages',
      type: 'group',
      icon: 'icon-pages',
      children: [
       
        {
          id: 'auth',
          title: 'Authentication',
          type: 'collapse',
          icon: 'feather icon-lock',
          badge: {
            title: 'New',
            type: 'label-danger'
          },
          children: [
            {
              id: 'signup-1',
              title: 'Sign up',
              type: 'item',
              url: '/auth/signup-1',
              target: true,
              breadcrumbs: false
            },
            {
              id: 'signin-1',
              title: 'Sign in',
              type: 'item',
              url: '/auth/signin-1',
              target: true,
              breadcrumbs: false
            }
          ]
        },
        /* {
          id: 'sample-page',
          title: 'Sample Page',
          type: 'item',
          url: '/sample-page',
          classes: 'nav-item',
          icon: 'feather icon-sidebar'
        },
        {
          id: 'documentation',
          title: 'Documentation',
          type: 'item',
          icon: 'feather icon-book',
          classes: 'nav-item',
          url: 'https://codedthemes.gitbook.io/datta/',
          target: true,
          external: true
        }, */
       /*  {
          id: 'menu-level',
          title: 'Menu Levels',
          type: 'collapse',
          icon: 'feather icon-menu',
          children: [
            {
              id: 'menu-level-1.1',
              title: 'Menu Level 1.1',
              type: 'item',
              url: '#!'
            },
            {
              id: 'menu-level-1.2',
              title: 'Menu Level 2.2',
              type: 'collapse',
              children: [
                {
                  id: 'menu-level-2.1',
                  title: 'Menu Level 2.1',
                  type: 'item',
                  url: '#'
                },
                {
                  id: 'menu-level-2.2',
                  title: 'Menu Level 2.2',
                  type: 'collapse',
                  children: [
                    {
                      id: 'menu-level-3.1',
                      title: 'Menu Level 3.1',
                      type: 'item',
                      url: '#'
                    },
                    {
                      id: 'menu-level-3.2',
                      title: 'Menu Level 3.2',
                      type: 'item',
                      url: '#'
                    }
                  ]
                }
              ]
            }
          ]
        }, */
        /* {
          id: 'disabled-menu',
          title: 'Disabled Menu',
          type: 'item',
          url: '#',
          classes: 'nav-item disabled',
          icon: 'feather icon-power'
        } */
      ]
    }
  ]
};

export default menuItems;
