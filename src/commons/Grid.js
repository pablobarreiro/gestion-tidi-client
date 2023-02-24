import Card from "./Card";
import Sidebar from "../components/Sidebar";
import BudgetCard from "../components/BudgetCard";

const Grid = ({ categories, budgetData }) => {
  return (
    <div className="grid-container">
      <Sidebar />
      <div className="main-grid">
        {categories.map((category, i) => (
          <Card key={i} {...category} />
        ))}
        {budgetData && <BudgetCard {...budgetData}/>}
      </div>
    </div>
  );
};

export default Grid;
