import UserInfoSvg from "../svgComponenents/adminProfile.tsx/userInfoSvg";

import ChangePasswordSvg from "../svgComponenents/adminProfile.tsx/ChangePasswordSvg";
import ConnectWithSocialSvg from "../svgComponenents/adminProfile.tsx/ConnectWithSocialSvg";
import PaymentMethodSvg from "../svgComponenents/adminProfile.tsx/PaymentMethodSvg";
import NotificationSettingsSvg from "../svgComponenents/adminProfile.tsx/NotificationSettings";
import LoginActivitySvg from "../svgComponenents/adminProfile.tsx/LoginActivitySvg";

// ... existing imports ...
export const navItems = [
  {
    id: "id1",
    title: "Personal Info",
    icon: <UserInfoSvg />,
    href: "/admin", // Updated to point to the main admin route
  },
  // {
  //   id: "id2",
  //   title: "Payment Method",
  //   icon: <PaymentMethodSvg />,
  //   href: "/admin/paymentMethod", // Updated to include /admin
  // },
  // {
  //   id: "id3",
  //   title: "Notification Setting",
  //   icon: <NotificationSettingsSvg />,
  //   href: "/admin/notificationSetting", // Updated to include /admin
  // },
  // {
  //   id: "id4",
  //   title: "Login Activity",
  //   icon: <LoginActivitySvg />,
  //   href: "/admin/login", // Updated to include /admin
  // },
  {
    id: "id5",
    title: "Change Password",
    icon: <ChangePasswordSvg />,
    href: "/admin/changePassword", // Updated to include /admin
  },
  {
    id: "id6",
    title: "Update Profile",
    icon: <ConnectWithSocialSvg />,
    href: "/admin/connect", // Updated to include /admin
  },
];
