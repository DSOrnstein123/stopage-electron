import DocumentContent from "../tiptap/DocumentContent";
import DocumentTitle from "./DocumentTitle";

const Page = () => {
  return (
    <div className="flex h-[calc(100vh-80px)] w-full justify-center p-10">
      <div className="relative h-full w-full max-w-[750px]">
        <DocumentTitle />
        <DocumentContent />
        {/* <Table /> */}
        {/* <Kanban /> */}
      </div>
    </div>
  );
};

export default Page;
