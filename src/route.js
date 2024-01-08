import React from "react";

const SignUp = React.lazy(() => import("../src/App/screens/signUp/index"));
const SignIn = React.lazy(() => import("../src/App/screens/signIn/index"));
const SuccessActivate = React.lazy(() =>
  import("../src/App/screens/externas/successActivate")
);
const InvalidTokenActivate = React.lazy(() =>
  import("../src/App/screens/externas/invalidTokenActivate")
);
const ActivatedAccount = React.lazy(() =>
  import("./App/screens/externas/activatedAcount")
);
const SendResetPassword = React.lazy(() =>
  import("./App/screens/externas/sendResetPassword")
);
const ResetPassword = React.lazy(() =>
  import("./App/screens/externas/resetPassword")
);
const InvalidTokenResetPass = React.lazy(() =>
  import("./App/screens/externas/invalidTokenResetPass")
);

const route = [
  {
    path: "/auth/signup",
    exact: true,
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/auth/signin",
    exact: true,
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/account/validate/success",
    exact: true,
    name: "SuccessActivate",
    component: SuccessActivate,
  },
  {
    path: "/account/validate/invalidToken",
    exact: true,
    name: "InvalidTokenActivate",
    component: InvalidTokenActivate,
  },
  {
    path: "/account/validate/activated",
    exact: true,
    name: "ActivatedAccount",
    component: ActivatedAccount,
  },
  {
    path: "/account/send/resetpassword",
    exact: true,
    name: "SendResetPassword",
    component: SendResetPassword,
  },
  {
    path: "/account/resetPassword/:resetPassword",
    exact: true,
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    path: "/account/reset/password/invalidToken",
    exact: true,
    name: "InvalidTokenResetPass",
    component: InvalidTokenResetPass,
  },
];

export default route;
