import { useState, useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import "./FeaturedInfo.css";

const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    const getIncome = async () => {
      const res = await userRequest.get("orders/income");
      setIncome(res.data);
      const calculatedPercentage =
        (res.data[1].total * 100) / (res.data[0].total - 100);
      setPercentage(calculatedPercentage);
    };
    getIncome();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[0]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(percentage)}{" "}
            {percentage < 0 && (
              <ArrowDownward className="featuredIcon negative" />
            )}
            {percentage > 0 && <ArrowUpward className="featuredIcon" />}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$1,515</span>
          <span className="featuredMoneyRate">
            +5.2 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
