import { useParams } from "react-router-dom";
import Page from "./Page";

const PageWrapper = () => {
  const { id } = useParams();

  return <Page key={id} />;
};

export default PageWrapper;
