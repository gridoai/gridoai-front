import { UploadCard } from "./UploadCard";
import DocumentsList from "./page";

// export default () => <DocumentsList load={false} />;
const Loading = () => (
  <div className={`flex flex-col bg-card p-2 gap-4 md:p-4 rounded-xl`}>
    <UploadCard />
  </div>
);
// const Loading = () => null;
export default Loading;
