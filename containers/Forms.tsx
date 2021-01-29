import React from "react";
import Id1 from "./forms/Id1";
import Id2 from "./forms/Id2";
import Id3 from "./forms/Id3";
import Id4 from "./forms/Id4";
import Id5 from "./forms/Id5";
import Id6 from "./forms/Id6";
import Id7 from "./forms/Id7";
import Id8 from "./forms/Id8";
import Id9 from "./forms/Id9";
import Id10 from "./forms/Id10";
import Id11 from "./forms/Id11";
import Id12 from "./forms/Id12";
import Id13 from "./forms/Id13";
import Id14 from "./forms/Id14";
import Id15 from "./forms/Id15";
import Id16 from "./forms/Id16";

const Forms = ({
  formId,
  changeCurrentFormHandler,
  currentFormIndex,
  recordCompleteForm,
  currentFormInfo,
  deleteCompleteForm,
  setSaveTempForm,
  saveTempForm,
}) => {
  return (
    <div style={{ marginRight: "2.162rem", height: "100%" }}>
      {formId === "Id1" && (
        <Id1
          changeCurrentFormHandler={changeCurrentFormHandler}
          currentFormIndex={currentFormIndex}
          currentFormInfo={currentFormInfo}
          recordCompleteForm={recordCompleteForm}
          deleteCompleteForm={deleteCompleteForm}
          saveTempForm={saveTempForm}
          setSaveTempForm={setSaveTempForm}
        />
      )}
      {formId === "Id2" && (
        <Id2
          changeCurrentFormHandler={changeCurrentFormHandler}
          currentFormIndex={currentFormIndex}
          currentFormInfo={currentFormInfo}
          recordCompleteForm={recordCompleteForm}
          deleteCompleteForm={deleteCompleteForm}
          saveTempForm={saveTempForm}
          setSaveTempForm={setSaveTempForm}
        />
      )}
      {formId === "Id3" && (
        <Id3
          changeCurrentFormHandler={changeCurrentFormHandler}
          currentFormInfo={currentFormInfo}
          currentFormIndex={currentFormIndex}
          deleteCompleteForm={deleteCompleteForm}
          recordCompleteForm={recordCompleteForm}
          saveTempForm={saveTempForm}
          setSaveTempForm={setSaveTempForm}
        />
      )}
      {formId === "Id4" && (
        <Id4
          changeCurrentFormHandler={changeCurrentFormHandler}
          currentFormInfo={currentFormInfo}
          currentFormIndex={currentFormIndex}
          deleteCompleteForm={deleteCompleteForm}
          recordCompleteForm={recordCompleteForm}
          saveTempForm={saveTempForm}
          setSaveTempForm={setSaveTempForm}
        />
      )}
      {formId === "Id5" && (
        <Id5
          changeCurrentFormHandler={changeCurrentFormHandler}
          currentFormInfo={currentFormInfo}
          currentFormIndex={currentFormIndex}
          deleteCompleteForm={deleteCompleteForm}
          recordCompleteForm={recordCompleteForm}
          saveTempForm={saveTempForm}
          setSaveTempForm={setSaveTempForm}
        />
      )}
      {formId === "Id6" && (
        <Id6
          changeCurrentFormHandler={changeCurrentFormHandler}
          currentFormInfo={currentFormInfo}
          currentFormIndex={currentFormIndex}
          deleteCompleteForm={deleteCompleteForm}
          recordCompleteForm={recordCompleteForm}
          saveTempForm={saveTempForm}
          setSaveTempForm={setSaveTempForm}
        />
      )}
      {formId === "Id7" && (
        <Id7
          changeCurrentFormHandler={changeCurrentFormHandler}
          currentFormInfo={currentFormInfo}
          currentFormIndex={currentFormIndex}
          deleteCompleteForm={deleteCompleteForm}
          recordCompleteForm={recordCompleteForm}
          saveTempForm={saveTempForm}
          setSaveTempForm={setSaveTempForm}
        />
      )}
      {formId === "Id8" && (
        <Id8
          changeCurrentFormHandler={changeCurrentFormHandler}
          currentFormInfo={currentFormInfo}
          currentFormIndex={currentFormIndex}
          deleteCompleteForm={deleteCompleteForm}
          recordCompleteForm={recordCompleteForm}
          saveTempForm={saveTempForm}
          setSaveTempForm={setSaveTempForm}
        />
      )}
      {formId === "Id9" && (
        <Id9
          changeCurrentFormHandler={changeCurrentFormHandler}
          currentFormInfo={currentFormInfo}
          currentFormIndex={currentFormIndex}
          deleteCompleteForm={deleteCompleteForm}
          recordCompleteForm={recordCompleteForm}
          saveTempForm={saveTempForm}
          setSaveTempForm={setSaveTempForm}
        />
      )}
      {formId === "Id10" && (
        <Id10
          changeCurrentFormHandler={changeCurrentFormHandler}
          currentFormInfo={currentFormInfo}
          currentFormIndex={currentFormIndex}
          deleteCompleteForm={deleteCompleteForm}
          recordCompleteForm={recordCompleteForm}
          saveTempForm={saveTempForm}
          setSaveTempForm={setSaveTempForm}
        />
      )}
      {formId === "Id11" && (
        <Id11
          changeCurrentFormHandler={changeCurrentFormHandler}
          currentFormInfo={currentFormInfo}
          currentFormIndex={currentFormIndex}
          deleteCompleteForm={deleteCompleteForm}
          recordCompleteForm={recordCompleteForm}
          saveTempForm={saveTempForm}
          setSaveTempForm={setSaveTempForm}
        />
      )}
      {formId === "Id12" && (
        <Id12
          changeCurrentFormHandler={changeCurrentFormHandler}
          currentFormInfo={currentFormInfo}
          currentFormIndex={currentFormIndex}
          deleteCompleteForm={deleteCompleteForm}
          recordCompleteForm={recordCompleteForm}
          saveTempForm={saveTempForm}
          setSaveTempForm={setSaveTempForm}
        />
      )}
      {formId === "Id13" && (
        <Id13
          changeCurrentFormHandler={changeCurrentFormHandler}
          currentFormIndex={currentFormIndex}
          currentFormInfo={currentFormInfo}
          deleteCompleteForm={deleteCompleteForm}
          recordCompleteForm={recordCompleteForm}
          saveTempForm={saveTempForm}
          setSaveTempForm={setSaveTempForm}
        />
      )}
      {formId === "Id14" && (
        <Id14
          changeCurrentFormHandler={changeCurrentFormHandler}
          currentFormInfo={currentFormInfo}
          currentFormIndex={currentFormIndex}
          deleteCompleteForm={deleteCompleteForm}
          recordCompleteForm={recordCompleteForm}
          saveTempForm={saveTempForm}
          setSaveTempForm={setSaveTempForm}
        />
      )}
      {formId === "Id15" && (
        <Id15
          changeCurrentFormHandler={changeCurrentFormHandler}
          currentFormInfo={currentFormInfo}
          currentFormIndex={currentFormIndex}
          deleteCompleteForm={deleteCompleteForm}
          recordCompleteForm={recordCompleteForm}
          saveTempForm={saveTempForm}
          setSaveTempForm={setSaveTempForm}
        />
      )}
      {formId === "Id16" && (
        <Id16
          changeCurrentFormHandler={changeCurrentFormHandler}
          currentFormInfo={currentFormInfo}
          currentFormIndex={currentFormIndex}
          deleteCompleteForm={deleteCompleteForm}
          recordCompleteForm={recordCompleteForm}
          saveTempForm={saveTempForm}
          setSaveTempForm={setSaveTempForm}
        />
      )}
    </div>
  );
};

export default Forms;
