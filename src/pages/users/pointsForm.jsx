import React from "react";
import FormInput from "../../components/common/formInput";

function PointsForm({ details, updateValue, handleDisableInput, redeem }) {
  const redeemForm = redeem ?? false;
  return (
    <div>
      <div className="storeDetailsFortm">
        {redeemForm && (
          <>
            <h2>Total user points: {details["points"]}</h2>
            <h4>
              The current ratio for 1 point is :{details["pointsToEuroRatio"]}
              euro
            </h4>
            <FormInput
              label="Redeem points"
              value={details["redeem"]}
              objKey="redeem"
              type="number"
              valueChange={updateValue}
              disableInput={handleDisableInput()}
            />
            <p>
              Current euro for the input points are:
              {details["pointsToEuroRatio"] * details["redeem"]}
            </p>
          </>
        )}
        {!redeemForm && (
          <>
            <h4>
              The current ratio for 1 euro is :{details["euroToPointsRatio"]}{" "}
              points
            </h4>
            <FormInput
              label="euro"
              value={details["euro"]}
              objKey="euro"
              type="number"
              valueChange={updateValue}
              disableInput={handleDisableInput()}
            />
            <p>
              Current points for the input euros are:
              {details["euroToPointsRatio"] * details["euro"]}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default PointsForm;
