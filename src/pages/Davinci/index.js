import React, { useState } from "react";
import FormDisplay from "../../components/FormDisplay";
import ProgressDisplay from "../../components/ProgressDisplay";

const DavinciPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);

  return isProcessing ? <ProgressDisplay {...{ setIsProcessing }} /> : <FormDisplay {...{ setIsProcessing }} />;
};
export default DavinciPage;
