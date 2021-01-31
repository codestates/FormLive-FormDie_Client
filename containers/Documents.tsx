import React from "react";
import { Document } from "@react-pdf/renderer";
import Id1 from "./documents/Id1";
import Id2 from "./documents/Id2";
import Id3 from "./documents/Id3";
import Id4 from "./documents/Id4";
import Id5 from "./documents/Id5";
import Id6 from "./documents/Id6";
import Id7 from "./documents/Id7";
import Id8 from "./documents/Id8";
import Id9 from "./documents/Id9";
import Id10 from "./documents/Id10";
import Id11 from "./documents/Id11";
import Id12 from "./documents/Id12";
import Id13 from "./documents/Id13";
import Id14 from "./documents/Id14";
import Id15 from "./documents/Id15";
import Id16 from "./documents/Id16";

const Documents = ({ formList }) => {
  return (
    <Document>
      {formList.findIndex((form) => form.id === "Id1") >= 0 && (
        <Id1
          formData={
            formList[formList.findIndex((form) => form.id === "Id1")].contents
          }
        />
      )}
      {formList.findIndex((form) => form.id === "Id2") >= 0 && (
        <Id2
          formData={
            formList[formList.findIndex((form) => form.id === "Id2")].contents
          }
        />
      )}
      {formList.findIndex((form) => form.id === "Id3") >= 0 && (
        <Id3
          formData={
            formList[formList.findIndex((form) => form.id === "Id3")].contents
          }
        />
      )}
      {formList.findIndex((form) => form.id === "Id4") >= 0 && (
        <Id4
          formData={
            formList[formList.findIndex((form) => form.id === "Id4")].contents
          }
        />
      )}
      {formList.findIndex((form) => form.id === "Id5") >= 0 && (
        <Id5
          formData={
            formList[formList.findIndex((form) => form.id === "Id5")].contents
          }
        />
      )}
      {formList.findIndex((form) => form.id === "Id6") >= 0 && (
        <Id6
          formData={
            formList[formList.findIndex((form) => form.id === "Id6")].contents
          }
        />
      )}
      {formList.findIndex((form) => form.id === "Id7") >= 0 && (
        <Id7
          formData={
            formList[formList.findIndex((form) => form.id === "Id7")].contents
          }
        />
      )}
      {formList.findIndex((form) => form.id === "Id8") >= 0 && (
        <Id8
          formData={
            formList[formList.findIndex((form) => form.id === "Id8")].contents
          }
        />
      )}
      {formList.findIndex((form) => form.id === "Id9") >= 0 && (
        <Id9
          formData={
            formList[formList.findIndex((form) => form.id === "Id9")].contents
          }
        />
      )}
      {formList.findIndex((form) => form.id === "Id10") >= 0 && (
        <Id10
          formData={
            formList[formList.findIndex((form) => form.id === "Id10")].contents
          }
        />
      )}
      {formList.findIndex((form) => form.id === "Id11") >= 0 && (
        <Id11
          formData={
            formList[formList.findIndex((form) => form.id === "Id11")].contents
          }
        />
      )}
      {formList.findIndex((form) => form.id === "Id12") >= 0 && (
        <Id12
          formData={
            formList[formList.findIndex((form) => form.id === "Id12")].contents
          }
        />
      )}
      {formList.findIndex((form) => form.id === "Id13") >= 0 && (
        <Id13
          formData={
            formList[formList.findIndex((form) => form.id === "Id13")].contents
          }
        />
      )}
      {formList.findIndex((form) => form.id === "Id14") >= 0 && (
        <Id14
          formData={
            formList[formList.findIndex((form) => form.id === "Id14")].contents
          }
        />
      )}
      {formList.findIndex((form) => form.id === "Id15") >= 0 && (
        <Id15
          formData={
            formList[formList.findIndex((form) => form.id === "Id15")].contents
          }
        />
      )}
      {formList.findIndex((form) => form.id === "Id16") >= 0 && (
        <Id16
          formData={
            formList[formList.findIndex((form) => form.id === "Id16")].contents
          }
        />
      )}
    </Document>
  );
};

export default Documents;
