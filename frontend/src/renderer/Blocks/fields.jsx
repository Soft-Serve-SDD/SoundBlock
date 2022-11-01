// Sidebar fields
export const fields = [
  {
    type: "play",
    title: "Play Button"
  },
  {
    type: "sample",
    title: "Sample Block"
  },
  {
    type: "loop",
    title: "Text"
  }
];

// How fields will be rendered when in workspace
export const renderers = {
    play: () => (<div> Play </div>),
    sample: () => (<div> Sample </div>),
    loop: () => (<div> Loop </div>),
};
