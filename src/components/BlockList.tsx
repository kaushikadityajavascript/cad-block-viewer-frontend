
interface Block {
  id: string;
  name: string;
  type: string;
}

const BlockList = ({ blocks, onSelect }: { blocks: Block[]; onSelect: (id: string) => void }) => {
  if (!blocks.length) return <p>No blocks found.</p>;

  return (
    <div className="p-4 bg-white rounded shadow h-96 overflow-y-scroll">
      <h2 className="text-xl font-semibold mb-2">Block List</h2>
      <ul className="space-y-2">
        {blocks.map((block) => (
          <li
            key={block.id}
            onClick={() => onSelect(block.id)}
            className="p-2 border rounded cursor-pointer hover:bg-gray-100"
          >
            {block.name} ({block.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlockList;
