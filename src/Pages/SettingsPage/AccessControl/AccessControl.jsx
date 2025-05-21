import { Card , Table, TableCell} from "flowbite-react"
import { IoAccessibility } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever} from "react-icons/md";
import { TbShieldPlus, TbUserCancel} from "react-icons/tb";
import { PrimaryButtons, DangerButtons } from "@/components/ui/Buttons";
import { RoleForm } from "./RoleForm";
import { useState, useEffect, useContext } from "react";
import RoleService from "@/services/roleService";
import { ErrorAlert , SuccessAlert, AlertWithResponse} from '@/utils/Alerts';
import { TransparentLoader } from "@/components/ui/TransparentLoader";
import { AuthUserContext } from "@/contextManager/context/AppContext";
import { hasPermission, shouldDisableEdit } from "@/utils/utilityFunction";

function AccessControl() {
  const {user} = useContext(AuthUserContext)
  const [selectedRole, setSelectedRole] = useState(null);
  const [rolesData, setRolesData] = useState([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const handleCreateUpdateRole = async(roleData) => {
    const action = roleData.action;
    const data = roleData.data
    if (action === "create") {
      handleCreateRole(data)
      setIsDisabled(true)
      setSelectedRole(null)
    }else {
      handleUpdateRole(roleData)
      setIsDisabled(true)
      setSelectedRole(null)
    }
  }

  useEffect(()=> {
    if (selectedRole) {
      setIsDisabled(false)
    }else {
      setIsDisabled(true)
    }
  },[selectedRole])
  
  const handleCreateRole = async(data) => {
    setIsSubmitting(true)
    const response = await RoleService.createRole(data)
    if (response.success) {
      SuccessAlert(response.message)
      setSelectedRole(null) // reset the selected role for form to reset
      fetchRolesData(); // refresh role list
    } else {
      ErrorAlert("Error!", "Failed to update farmer data!");
    }
    setIsSubmitting(false)
  }
  
  const handleUpdateRole = async(data) => {
    setIsSubmitting(true)
    const roleId = data.id;
    const updateRoleData = data.data 
    const response = await RoleService.updateRole(roleId, updateRoleData)
    if (response.success) {
      SuccessAlert(response.message)
      setSelectedRole(null) // reset the selected role for form to reset
      fetchRolesData(); // refresh role list
    } else {
      ErrorAlert("Error!", "Failed to update farmer data!");
    }
    setIsSubmitting(false)
  }

  //
  const handleRoleEditClick = (role) => {
      setSelectedRole(role)
  }
  const handleDeleteRole = async(role) => {
    const roleId = role.id;
    const roleName = role.name;
    const deleteMessage =  `Are sure you want to delete ${roleName} role`;
    AlertWithResponse(
      "Delete Role",
      deleteMessage,
      async ()=> {
        // setLoading(true);
        const response = await RoleService.deleteRole(roleId)
        if (response.success) {
            const message= `${roleName} role has been deleted successfully`
            SuccessAlert(message)
            fetchRolesData(); // refresh role list
           } else {
            ErrorAlert("Error!", "Failed to update farmer data!");
           }
          // setLoading(false);
      }
    )
  }

  const fetchRolesData = async() => {
    const response = await RoleService.fetchRoles();
    if (response.success) {
      const roles = response.roles
      setRolesData(roles)
    }
  }

  useEffect(()=> {
     fetchRolesData(); 
  },[])


 
  
  
  return (
    <main className="h-[100vh] min-h-[100vh] bg-white rounded-2xl">
    <h1 className="text-base md:text-2xl font-semibold flex items-center gap-2">Access Control<IoAccessibility className="mr-2 h-7 w-7 border-[2px] border-black p-1 rounded-full" /></h1>
    <div className="flex justify-between items-center">
      <h1 className="text-base md:text-xl mb-4">Manage User Roles and Permissions</h1>
      {hasPermission(user, "create") && (isDisabled &&  <PrimaryButtons 
        btnIcon = {<TbShieldPlus className="mr-2 h-6 w-6 cursor-pointer"/>} 
        text = "Create Role"
        className = "p-0"
        onClick = {()=> setIsDisabled(false)}
      />)}
      {!isDisabled && <DangerButtons
        text = "Cancel"
        btnIcon = {<TbUserCancel className="mr-2 h-6 w-6 cursor-pointer"/>}
        className = "p-0" 
        onClick = {()=> {
          setIsDisabled(true)
          setSelectedRole(null)
        }}
      />}
    </div>
    <article className="grid md:grid-cols-[19%_80%] grid-cols-1 gap-[1%] min-h-[95vh] p-2">
     <div className="flex  flex-col gap-6">
      {/* <Card className=" h-[25vh]"></Card> */}
      <Card theme={{root: {children: "h-fit min-h-[70vh] p-2 overflow-x-auto"}}}>
        <Table striped hoverable>
          <Table.Head >
            <Table.HeadCell className="text-center bg-green-600 text-white border-r-[1px] border-gray-50">Role</Table.HeadCell>
            <Table.HeadCell className="text-center bg-green-600 text-white border-r-[1px] border-gray-50">Action</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {rolesData.map((role, index) => (
              <Table.Row key={index}>
                <TableCell className="border-r-[1px] border-gray-200">{role.name}</TableCell>
                <TableCell>
                  <div className="flex gap-2 items-center justify-center">
                    {hasPermission(user, "edit") && <PrimaryButtons disabled= {shouldDisableEdit(user, role.name)} className = "p-0" onClick= {()=> handleRoleEditClick(role)} text="Edit" btnIcon={<FaEdit className="mr-2 h-4 w-4" />} />}
                    {hasPermission(user, "delete") && <DangerButtons disabled= {shouldDisableEdit(user, role.name)} className = "p-0" onClick= {()=> handleDeleteRole(role)} text="Del" btnIcon={<MdDeleteForever className="mr-2 h-4 w-4" />}/>}
                  </div>
                </TableCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Card>
     </div>
     <div className="right flex flex-col gap-6">
      {/* <Card theme={{root: {children: "h-[6vh] p-2"}}}></Card> */}
      <Card theme={{ root: { children: "h-fit p-2 relative" } }}>
        {isDisabled && (
            <div className="absolute inset-0 bg-white bg-opacity-50 z-10 cursor-not-allowed"></div>
          )}
           <div className={isDisabled ? "pointer-events-none opacity-60" : ""}>
            <RoleForm
              initialData={selectedRole ? selectedRole : null}
              onSubmit={handleCreateUpdateRole}
            />
          </div>
      </Card>
     </div> 
     
    </article>
    {isSubmitting &&  <TransparentLoader/>}
</main>
  )
}

export default AccessControl