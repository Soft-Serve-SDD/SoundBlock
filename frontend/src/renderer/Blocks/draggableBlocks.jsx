import { renderers } from './fields';
import { Draggable } from '../Components/draggable';

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
