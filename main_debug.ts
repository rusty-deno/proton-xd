import ProtonXD from "./mod.ts";



ProtonXD.XD.instantiate(`
<html>
  <head>
  <style>
    body {
      color: #ff00ff;
    }
  </style>
  </head>
  <body>
    hello wrld
  </body>
</html>`,{
  title: "my-app",
  windowIcon: {
    path: "./xd.png",
    size: {
      height: 100,
      width: 100
    }
  },
  taskbarIcon: {
    path: "./xd.png",
    size: {
      height: 100,
      width: 100
    }
  },
});


