import ProtonXD from "./mod.ts";

ProtonXD.XD.instantiate("<html><body>hello wrld</body></html>",{
    title: "my-app",
    windowIcon: {
        size: {
            height: 768,
            width: 768
        },
        path: new URL("./xd.png",import.meta.url).href
    }
});

