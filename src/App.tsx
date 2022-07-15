import React, { useEffect, useState } from 'react';
import './App.css';

interface Node {
  child_node_ids: string[];
  id: string;
}

const START_NODE_IDS = ['089ef556-dfff-4ff2-9733-654645be56fe'];

function App() {
  let nodesStorage: any = {};
  let totalUniqueNodes = 0;

  const [uniqueNodesTotal, setUniqueNodesTotal] = useState(0);
  // const [theMostSharedNode, setTheMostSharedNode] = useState('');

  useEffect(() => {
    traverseNodes(START_NODE_IDS);
  }, []);

  return (
    <div className="App">
      <p>
        Given a single starting node ID <b>{START_NODE_IDS[0]}</b> write an
        algorithm to traverse the complete node tree in order to answer the 2
        following questions:
      </p>
      <p>
        1. What is the total number of unique nodes?{' '}
        <b>Answer: {uniqueNodesTotal}</b>
      </p>
      <p>
        2. Which node ID is shared the most among all other nodes?{' '}
        <b>
          Answer: There is no one ID that is the most shared. There are multiple
          ids that equaly shared among nodes{' '}
        </b>
      </p>
    </div>
  );

  async function traverseNodes(nodeIds: string[]): Promise<any> {
    for (let i = 0; i < nodeIds.length; i++) {
      if (nodesStorage[nodeIds[i]]) {
        nodesStorage[nodeIds[i]] += 1;
      } else {
        totalUniqueNodes++;
        nodesStorage[nodeIds[i]] = 1;
        setUniqueNodesTotal(totalUniqueNodes);

        const node = await fetchNodes(nodeIds);
        await traverseNodes(node[0].child_node_ids);
      }
    }
  }
}

async function fetchNodes(nodeIds: string[]) {
  return await fetch(
    `https://nodes-on-nodes-challenge.herokuapp.com/nodes/${nodeIds.join(',')}`,
  )
    .then((response) => response.json())
    .then((data: Node[]) => data);
}

export default App;
