import Card from "./Card";
import Sidebar from "../components/Sidebar";
import IncomeCard from "../components/IncomeCard";
import BudgetCard from "../components/BudgetCard";

const Grid = ({ categories, incomeData, budgetData }) => {
  return (
    <div className="grid-container">
      <Sidebar />
      <div className="main-grid">
        {categories.map((category, i) => (
          <Card key={i} {...category} />
        ))}
        <IncomeCard {...incomeData}/>
        {budgetData && <BudgetCard {...budgetData}/>}
      </div>
    </div>
  );
};

export default Grid;
