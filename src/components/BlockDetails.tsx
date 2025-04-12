import { useState } from "react";
import BlockPreviewSVG from "./BlockPreviewSVG";

const BlockDetails = ({ block }: { block: any }) => {
  const [showControlPoints, setShowControlPoints] = useState(false);

  if (!block) return <p>Select a block to view its details.</p>;

  const handleToggle = () => setShowControlPoints((prev) => !prev);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Block Details</h2>
      <p><strong>ID:</strong> {block.id}</p>
      <p><strong>Name:</strong> {block.name}</p>
      <p><strong>Type:</strong> {block.type}</p>

      {block.coordinates?.length > 0 && (
        <>
          <h3 className="mt-2 font-semibold">Coordinates:</h3>
          <ul className="ml-4 list-disc">
            {block.coordinates.map((coord: any, i: number) => (
              <li key={i}>X: {coord.x}, Y: {coord.y}</li>
            ))}
          </ul>
        </>
      )}

      {block.properties && (
        <>
          <h3 className="mt-2 font-semibold">Properties:</h3>
          <ul className="ml-4 list-disc">
            {Object.entries(block.properties).map(([key, val]) => (
              <li key={key}>
                {key}:
                {key === "controlPoints" ? (
                  <>
                    <button
                      onClick={handleToggle}
                      className="ml-2 text-blue-500 underline text-sm"
                    >
                      {showControlPoints ? "Hide" : "Show"} Control Points
                    </button>
                    {showControlPoints && (
                      <pre className="bg-gray-100 p-2 rounded mt-1">
                        {JSON.stringify(val, null, 2)}
                      </pre>
                    )}
                  </>
                ) : (
                  ` ${val}`
                )}
              </li>
            ))}
          </ul>
        </>
      )}

      {block.properties?.controlPoints && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Visual Preview:</h3>
          <BlockPreviewSVG
            entities={[
              {
                type: block.type,
                controlPoints: block.properties.controlPoints,
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default BlockDetails;
