import  { useEffect, useState } from "react";
import axios from "axios";
import FileUpload from "./components/FileUpload";
import BlockList from "./components/BlockList";
import BlockDetails from "./components/BlockDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
 const [blocks, setBlocks] = useState<any[]>([]);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
const [limit] = useState(10); 
  const [totalPages, setTotalPages] = useState(1);
  const [isUploadView, setIsUploadView] = useState(false);

  const fetchBlocks = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/blocks`, {
         params: {
        page,
        limit,
         ...(search && { name: search }), 
        showProperties: true,
      },
      });
      const { data, meta } = res.data.data;
      // setBlocks(res.data.data.data);
      setBlocks(data);
      setTotalPages(meta.totalPages);
    } catch (err) {
      console.error("Failed to fetch blocks", err);
    }
  };

  const handleSelectBlock = async (id: string) => {
    console.log("Clicked block ID:", id);
    if (isUploadView) {
    const block = blocks.find((b) => b.id === id); 
      console.log("🚀 ~ handleSelectBlock ~ block:", block.entities)
      if (block) {
       setSelectedBlock({ ...block });
    }
    return;
  }
    try {
      const res = await axios.get(`http://localhost:8080/api/blocks/${id}`);
      setSelectedBlock(res.data.data);
      console.log("🚀 ~ handleSelectBlock ~ res:", res.data.data.name);
    } catch (err) {
      console.error("Failed to fetch block details", err);
    }
  };

  const filteredBlocks = blocks.filter((block: any) =>
    block.name.toLowerCase().includes(search.toLowerCase())
  );

 useEffect(() => {
   if (!isUploadView) {
      setPage(1);
    fetchBlocks();
    }
  }, [search]);

  // Fetch blocks when current page changes
 useEffect(() => {
  if (!isUploadView) {
    fetchBlocks();
  }
}, [page]);

  // Basic pagination controls: Previous, Next, and display current page
  const Pagination = () => (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="min-h-screen p-8 bg-gray-100 space-y-6">
      <FileUpload
  onUpload={(fileId: string, uploadedBlocks: any[]) => {
    setSearch("");                  // Clear search
    setPage(1);                     // Reset page
    setBlocks(uploadedBlocks);      // Set new blocks directly
    setSelectedBlock(null);         // Clear previous selection
          setTotalPages(1);               // If you want to disable pagination
          setIsUploadView(true)
  }}
      />
      
      {isUploadView && (
  <button
    onClick={() => {
      setIsUploadView(false);
      setSearch("");      
      setSelectedBlock(null);
    }}
    className="mt-4 px-4 py-2 bg-gray-700 text-white rounded"
  >
    🔙 Back to All Blocks
  </button>
)}

      {/* Search field */}
      <input
        type="text"
        placeholder="Search by block name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 border rounded w-full"
      />

      {/* Block list and details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BlockList
          blocks={isUploadView?filteredBlocks: blocks}
          onSelect={handleSelectBlock}
        />
        <BlockDetails block={selectedBlock} />
      </div>

      {/* Pagination Controls */}
      <Pagination />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;