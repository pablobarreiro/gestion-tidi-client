import { useEffect, useState } from "react";
import useInput from "../hooks/useInput";

const CarpentryInput = ({ id, carpentry_general, remaining, projectsToSend,setProjectsToSend, shippingToPay, setShippingToPay, placementToPay, setPlacementToPay }) => {
  const amount = useInput(0);
  const [shippingPaid, setShippingPaid] = useState(
    carpentry_general.shipping_paid ?? false
  );
  const [placementPaid, setPlacementPaid] = useState(
    carpentry_general.placement_paid ?? false
  );
  
  useEffect(() => {
    if (amount.value > remaining)
      amount.onChange({ target: { value: remaining } });
    if (amount.value < 0) amount.onChange({ target: { value: 0 } });
    if (!projectsToSend.find((project)=> project.projectId===id)) {
      if(amount.value > 0) setProjectsToSend([...projectsToSend,{ projectId: id, amount: Number(amount.value) }])
    } else if (projectsToSend.find((project)=> project.projectId===id)) {
      const index = projectsToSend.findIndex((project)=> project.projectId===id)
      let projects = [...projectsToSend]
      projects[index] = { projectId: id, amount: Number(amount.value) }
      setProjectsToSend([...projects])
    }
  }, [amount.value]);

  useEffect(()=> {
    const index = shippingToPay.findIndex((project)=> project.projectId===id)
    let shippingList = [...shippingToPay]
    if(shippingPaid) {
      if(index >=0) {
        shippingList[index] = {projectId:id,shipping_total:carpentry_general.shipping_total,shipping_paid:true}
        setShippingToPay([...shippingList])
      } else {
        setShippingToPay([...shippingToPay,{projectId:id,shipping_total:carpentry_general.shipping_total,shipping_paid:true}])
      }
    } else {
      if(index >=0) {
        shippingList[index] = {projectId:id,shipping_total:carpentry_general.shipping_total,shipping_paid:false}
        setShippingToPay([...shippingList])
      } else {
        setShippingToPay([...shippingToPay,{projectId:id,shipping_total:carpentry_general.shipping_total,shipping_paid:false}])
      }
    } 
  },[shippingPaid])

  useEffect(()=> {
    const index = placementToPay.findIndex((project)=> project.projectId===id)
    let placementList = [...placementToPay]
    if(placementPaid) {
      if(placementToPay.find((project)=> project.projectId===id)) {
        placementList[index] = {projectId:id,placement_total:carpentry_general.placement_total,placement_paid:true}
        setPlacementToPay([...placementList])
      } else {
        setPlacementToPay([...placementToPay,{projectId:id,placement_total:carpentry_general.placement_total,placement_paid:true}])
      }
    } else {
      if(placementToPay.find((project)=> project.projectId===id)) {
        placementList[index] = {projectId:id,placement_total:carpentry_general.placement_total,placement_paid:false}
        setPlacementToPay([...placementList])
      } else {
        setPlacementToPay([...placementToPay,{projectId:id,placement_total:carpentry_general.placement_total,placement_paid:false}])
      }
    }
  },[placementPaid])

  return (
    <tr>
      <td>TM-{id}:</td>
      <td>{`$${remaining}`}</td>
      <td>
        <input type="number" className="basic-input" {...amount} />
      </td>
      <td>
        <input
          type="checkbox"
          checked={shippingPaid}
          onChange={() => setShippingPaid(!shippingPaid)}
        />{" "}
        {!carpentry_general.shipping_paid && `$${carpentry_general.shipping_total}`}
      </td>
      <td>
        <input
          type="checkbox"
          checked={placementPaid}
          onChange={() => setPlacementPaid(!placementPaid)}
        />{" "}
        {!carpentry_general.placement_paid && `$${carpentry_general.placement_total}`}{" "}
      </td>
    </tr>
  );
};

export default CarpentryInput;
