import { renderers } from './fields';
import { Draggable } from '../Components/draggable';
import Slider from '../Components/Slider';
export function PlayBlock() {
  const Component = renderers['play'];
  return (
    <Draggable>
      <Component />
    </Draggable>
  );
}

export function SampleBlock() {
  const Component = renderers['sample'];
  return (
    <Draggable handle={true}>
      <Component />
    </Draggable>
  );
}

export function AudioBlock(Props) {
  return (
    <div style={{ border: '1px solid black', borderRadius: '5px' }}>
      <h4 style={{ marginTop: '5px', marginBottom: '0px' }}>{Props.title}</h4>
      <br />
      <h5 style={{ marginTop: '5px', marginBottom: '0px' }}>
        {' '}
        Duration: {Props.duration}
      </h5>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          Attack
          <Slider />
        </div>
        <div>
          Stretch
          <Slider />
        </div>
      </div>
    </div>
  );
}
