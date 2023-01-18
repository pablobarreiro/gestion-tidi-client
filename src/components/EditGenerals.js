import { useEffect, useState } from "react"
import { branchList, salesmanList, stateList, deleteSalesman, deleteBranch, deleteState } from "../uris"
import { FaTrash } from "react-icons/fa"
import useInput from "../hooks/useInput"
import axios from "axios"
import swal from "sweetalert"

const EditGenerals = () => {

    const [salesmen, setSalesmen] = useState([])
    const [branches, setBranches] = useState([])
    const [states, setStates] = useState([])

    const salesmanInput = useInput('')
    const branchInput = useInput('')
    const stateInput = useInput('')

    useEffect(() => {
        const fetchData = async () => {
            const firstSalesmenList = await axios.get(salesmanList())
            setSalesmen(firstSalesmenList.data)
            const firstBranchList = await axios.get(branchList())
            setBranches(firstBranchList.data)
            const firstStateList = await axios.get(stateList())
            setStates(firstStateList.data)
        }
        fetchData()
    },[])
    
    const handleAddSalesman = async (e) => {
        e.preventDefault()
        if(salesmanInput.value.length) {
            await axios.post(salesmanList(),{name:salesmanInput.value})
            const newSalesmenList = await axios.get(salesmanList())
            setSalesmen(newSalesmenList.data)
        }
    }
    const handleAddBranch = async (e) => {
        e.preventDefault()
        if(branchInput.value.length) {
            await axios.post(branchList(),{name:branchInput.value})
            const newBranchList = await axios.get(branchList())
            setBranches(newBranchList.data)
        }
    }
    const handleAddState = async (e) => {
        e.preventDefault()
        if(stateInput.value.length) {
            await axios.post(stateList(),{name:stateInput.value})
            const newStateList = await axios.get(stateList())
            setStates(newStateList.data)
        }
    }
    

    const handleDelete = async (item) => {
        const value = await swal(`Estas Seguro que queres eliminar a ${item.name}?`, {
            buttons: {
              cancel: "Cancelar",
              confirm: true,
            },
        })
        if(value) {
            switch (item.type) {
                case 'salesman' : 
                await axios.delete(deleteSalesman(item.id))
                const newSalesmenList = await axios.get(salesmanList())
                setSalesmen(newSalesmenList.data)
                break
                
                case 'branch' : 
                await axios.delete(deleteBranch(item.id))
                const newBranchList = await axios.get(branchList())
                setBranches(newBranchList.data)
                break
                
                case 'state' : 
                await axios.delete(deleteState(item.id))
                const newStateList = await axios.get(stateList())
                setStates(newStateList.data)
                break
                
            }
        }
    }

    return <div className="generals-container">
        <div className="generals-subcontainer card-container">
            <h4>Lista de empleados</h4>
            {salesmen.length && salesmen.map((item,i) => <li key={`${i} ${item}`}>{item.name} <FaTrash onClick={()=>handleDelete({type:'salesman',...item})} /></li>)}
            <form onSubmit={handleAddSalesman}>
                <input {...salesmanInput} /> <button>Agregar</button>
            </form>
        </div>
        <div className="generals-subcontainer card-container">
            <h4>Lista de sucursales</h4>
            {branches.length && branches.map((item,i) => <li key={`${i} ${item}`}>{item.name} <FaTrash onClick={()=>handleDelete({type:'branch',...item})} /></li>)}
            <form onSubmit={handleAddBranch}>
                <input {...branchInput} /> <button>Agregar</button>
            </form>
        </div>
        <div className="generals-subcontainer card-container">
            <h4>Lista de estados de proyecto</h4>
            {states.length && states.map((item,i) => <li key={`${i} ${item}`}>{item.name} <FaTrash onClick={()=>handleDelete({type:'state',...item})} /></li>)}
            <form onSubmit={handleAddState}>
                <input {...stateInput} /> <button>Agregar</button>
            </form>
        </div>
    </div>
}

export default EditGenerals