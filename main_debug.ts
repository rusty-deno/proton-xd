import ProtonXD from "./mod.ts";



ProtonXD.XD.instantiate("<html><body>hello wrld</body></html>",{
  title: "my-app",
  windowIcon: {
    path: "./xd.png",
    size: {
      height: 768,
      width: 768
    }
  },
  taskbarIcon: {
    path: "./xd.png",
    size: {
      height: 768,
      width: 768
    }
  },
});


