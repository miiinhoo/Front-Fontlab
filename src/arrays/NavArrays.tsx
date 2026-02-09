export const NavLogout = [
  { text: "HOME", path: "/" },

  { text: "EXPLORE", path: "/explore" },
  { text: "PLAYGROUND", path: "/playground" },
  { text: "LOGIN", path: "/user/login" },
];

export const NavLogin = [
  { text: "EXPLORE", path: "/explore" },
  { text: "HOME", path: "/" },
  { text: "EXPLORE", path: "/explore" },
  { text: "MYPAGE", option:[
    {name: "회원정보수정",path:"/user/edit"},
    {name:"즐겨찾기",path:"user/favorite"},
  ]},

  { text: "PLAYGROUND", path: "/playground" },
  { text: "LOGOUT"},
];
