export const aboutController = {
    index: {
      handler: async function (request, h) {
        const viewData = {
          title: "Playtime About"
        };
        return h.view("about-view", viewData);
      },
    }
};