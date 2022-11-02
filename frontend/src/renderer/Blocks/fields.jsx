// Sidebar fields
export const fields = [
  {
    type: 'play',
    title: 'Play Button',
  },
  {
    type: 'sample',
    title: 'Sample Block',
  },
  {
    type: 'loop',
    title: 'Loop Block',
  },
];

// How fields will be rendered when in workspace
export const renderers = {
  play: () => {
    return <div> Play </div>;
  },
  sample: () => {
    return <div> Sample </div>;
  },
  loop: () => {
    return <div> Loop </div>;
  },
  slider: () => {
    return <div> Slider </div>;
  }
};
