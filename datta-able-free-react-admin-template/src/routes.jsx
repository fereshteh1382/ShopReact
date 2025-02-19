import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';
import AuthContextProvider from 'context/Auth/AuthContext';



export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
     <AuthContextProvider>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
    </AuthContextProvider>
  </Suspense>
);

const routes = [
  {
    exact: 'true',
    path: '/login',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signin-1',
    element: lazy(() => import('./views/auth/signin/SignIn1'))
  },
  {
    exact: 'true',
    path: '/auth/signup-1',
    element: lazy(() => import('./views/auth/signup/SignUp1'))
  },
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/app/dashboard/default',
        element: lazy(() => import('./views/dashboard'))
      },
      {
        exact: 'true',
        path: '/basic/button',
        element: lazy(() => import('./views/ui-elements/basic/BasicButton'))
      },
      {
        exact: 'true',
        path: '/basic/badges',
        element: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
      },
      {
        exact: 'true',
        path: '/basic/breadcrumb-paging',
        element: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
      },
      {
        exact: 'true',
        path: '/basic/collapse',
        element: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
      },
      {
        exact: 'true',
        path: '/basic/tabs-pills',
        element: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
      },
      {
        exact: 'true',
        path: '/basic/typography',
        element: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      },
      {
        exact: 'true',
        path: '/forms/form-basic',
        element: lazy(() => import('./views/forms/FormsElements'))
      },
      {
        exact: 'true',
        path: '/tables/bootstrap',
        element: lazy(() => import('./views/tables/BootstrapTable'))
      },
      {
        exact: 'true',
        path: '/charts/nvd3',
        element: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: 'true',
        path: '/maps/google-map',
        element: lazy(() => import('./views/maps/GoogleMaps'))
      },
      {
        exact: 'true',
        path: '/sample-page',
        element: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      },
      {
        exact: 'true',
        path: 'media/addmedia',
        element: lazy(() => import('./views/Media/AddMedia'))
      },
      {
        exact: 'true',
        path: 'media/allmedia',
        element: lazy(() => import('./views/Media/AllMedia'))
      },
      
      {
        exact: 'true',
        path: 'shop/addcategory',
        element: lazy(() => import('./views/Shop/AddCategory'))
      },
      
      {
        exact: 'true',
        path: 'shop/allcategory',
        element: lazy(() => import('./views/Shop/AllCategory'))
      },
      {
        exact: 'true',
        path: 'shop/addbrands',
        element: lazy(() => import('./views/Shop/AddBrands'))
      },
      {
        exact: 'true',
        path: 'shop/allbrands',
        element: lazy(() => import('./views/Shop/AllBrands'))
      },
      {
        exact: 'true',
        path: 'shop/addscoring',
        element: lazy(() => import('./views/Shop/AddScoring'))
      },
      {
        exact: 'true',
        path: 'shop/allscoring',
        element: lazy(() => import('./views/Shop/AllScoring'))
      },
      {
        exact: 'true',
        path: 'shop/specifications',
        element: lazy(() => import('./views/Shop/Specifications'))
      },
      {
        exact: 'true',
        path: 'shop/subspecifications',
        element: lazy(() => import('./views/Shop/SubSpecifications'))
      },
      {
        exact: 'true',
        path: 'products/seller',
        element: lazy(() => import('./views/Products/Seller'))
      },
      {
        exact: 'true',
        path: 'products/warranty',
        element: lazy(() => import('./views/Products/Warranty'))
      },
      {
        exact: 'true',
        path: 'products/addproduct',
        element: lazy(() => import('./views/Products/AddProduct'))
      },
      {
        exact: 'true',
        path: 'products/products',
        element: lazy(() => import('./views/Products/Products'))
      },
    ]
  }
];

export default routes;
