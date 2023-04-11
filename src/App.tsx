import { useState } from "react";
import { LinkedList } from "./LinkedList";

function App() {
  const Node = ({ value }: { value: string }) => {
    return (
      <div className="text-2xl rounded-2xl bg-blue-700  p-4 hover:animate-spin">
        {value}
      </div>
    );
  };
  const Nodes = () => {
    if (linkedList.hasHead()) {
      const values = linkedList.getValues();
      return (
        <>
          {values.map((value, idx) => (
            <Node value={value.toString()} key={idx} />
          ))}
        </>
      );
    }
    return <></>;
  };

  const [linkedList, setlinkedList] = useState<LinkedList<Number>>(
    new LinkedList<number>()
  );
  const [nodeValue, setNodeValue] = useState("");
  const nodeValueAsNumber = Number(nodeValue);

  function handleAppendNode(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newLinkedList = linkedList.append(nodeValueAsNumber);
    setlinkedList(newLinkedList);
    setNodeValue("");
  }

  return (
    <div className="App">
      <div className="p-12 flex gap-6">
        <Nodes />
      </div>
      <div
        className=" 
        fixed
        inset-x-0
        bottom-0
        p-4 flex flex-auto justify-around mb-4"
      >
        <form className="form flex flex-col gap-2" onSubmit={handleAppendNode}>
          <input
            type="number"
            required
            className="bg-slate-500 rounded-full p-1 w-14 text-center"
            placeholder="Value"
            value={nodeValue}
            onChange={(e) => setNodeValue(e.target.value)}
          />
          <button className="p-3 rounded-full bg-zinc-700 hover:bg-zinc-600 ">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
