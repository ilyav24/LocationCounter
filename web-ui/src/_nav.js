export default {
  items: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: "icon-chart",
    },
    {
      title: true,
      name: "Menu",
      wrapper: {
        // optional wrapper object
        element: "", // required valid HTML5 element tag
        attributes: {}, // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: "", // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: "Buildings",
      url: "/buildings",
      icon: "icon-home",
    },
    {
      name: "Locations",
      url: "/locations",
      icon: "icon-layers",
    },
    {
      name: "Sensors",
      url: "/sensors",
      icon: "cui-location-pin",
    },
    {
      name: "Users",
      url: "/users",
      icon: "icon-user",
    },
  ],
};
