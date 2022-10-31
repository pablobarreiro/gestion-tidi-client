import Card from "./Card";
import Sidebar from "./Sidebar";
import IncomeCard from "../components/IncomeCard";

const Grid = ({ categories, incomeData }) => {
  return (
    <div className="grid-container">
      <Sidebar />
      <div className="main-grid">
        {categories.map((category, i) => (
          <Card key={i} {...category} />
        ))}
        <IncomeCard {...incomeData}/>
      </div>
    </div>
  );
};

export default Grid;
