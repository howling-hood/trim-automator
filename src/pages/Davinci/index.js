import React, { useState } from "react";
import FormDisplay from "../../components/FormDisplay";
import ProgressDisplay from "../../components/ProgressDisplay";

const DavinciPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  return isProcessing ? <ProgressDisplay {...{ setIsProcessing }} /> : <FormDisplay {...{ setIsProcessing }} />;
};
export default DavinciPage;
