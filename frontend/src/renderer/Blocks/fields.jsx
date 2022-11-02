import Slider from '../Components/Slider';
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
    return (
      <div style={{ border: '1px solid black' }}>
        Attack
        <Slider />
        Stretch
        <Slider />
        Mod 1
        <Slider />
        Mod 2
        <Slider />
      </div>
    );
  },
  loop: () => {
    return <div> Loop </div>;
  },
};
