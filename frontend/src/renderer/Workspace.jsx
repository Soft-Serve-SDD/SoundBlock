import Droppable from "./Components/Droppable";
import LoopChild from './Blocks/LoopBlock';
import './styles/Workspace.css';

function Workspace(props){
    const {itemGroups, itemProps, loopParams, adjustLoopParams, adjustProperties, activeId}=props;
    return <div style={{ width: '80%', background: "#43565e", borderRadius: '10px', padding: '10px', margin: '5px' }}>
            <div class="scrollmenu" >
                {Object.keys(itemGroups).map((group) => (
                  <Droppable
                    id={group}
                    items={itemGroups[group]}
                    activeId={activeId}
                    key={group}
                    props={itemProps[group]}
                    adjustProperties={adjustProperties}
                  >
                    <div style={{width: '320px'}}>
                      {<LoopChild id={group} params={loopParams[group]} adjustLoopParams={adjustLoopParams} />}
                    </div>
                  </Droppable>
              ))}
             </div>
          </div>
}

export default Workspace;