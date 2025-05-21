import PropTypes from "prop-types";
import { useState, useEffect , useMemo} from "react";
import { TextInput, Checkbox, TabItem, Tabs , Textarea } from "flowbite-react";
import { sidebarItems } from "@/components/layoutComponents/sidebarItems";
import { ErrorAlert } from '@/utils/Alerts';
import { RoleSchema } from "@/schemas/RoleSchema";
import { PrimaryButtonsMd } from "@/components/ui/Buttons";
import { GrDocumentUpdate } from "react-icons/gr";
import CustomTheme from "@/themes/customThemes";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { MdCreditScore } from "react-icons/md";

const permissionsList = ["Export", "Import", "Create", "Delete", "Edit"];
const roleModel = {
  name: "",
  description: "",
  access: [],
  permissions: [],
}

export function RoleForm({ initialData = null, onSubmit }) {
  const [formData, setFormData] = useState(roleModel);
  const [errors, setErrors] = useState({});

  const handleTextChange = (e) => {
    const {name, value} = e.target
    setFormData((prev)=> ({...prev, [name]:value}))
    //clear error for error fields
    if(errors[name]) {
      setErrors((prev)=> {
        const newErrors = {...prev}
        delete newErrors[name]
        return newErrors
      })
    }
  }

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }else{
      setFormData(roleModel)
    };
  }, [initialData]);

  const isChecked = (key) => formData.access.includes(key);

  const handleCheckboxChange = (field, value) => {
    setFormData((prev) => {
      const values = prev[field];
      const updated = values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value];
      return { ...prev, [field]: updated };
    });
  };

  const handleParentToggle = (parent) => {
    const childKeys = parent.children?.map((c) => c.access) || [];
    const allSelected = childKeys.every((k) => formData.access.includes(k));
    const newAccess = allSelected
      ? formData.access.filter((k) => !childKeys.includes(k) && k !== parent.access)
      : [...new Set([...formData.access, ...childKeys, parent.access])];

    setFormData((prev) => ({ ...prev, access: newAccess }));
  };

  const handleChildToggle = (child, parent) => {
    let newAccess = formData.access.includes(child.access)
      ? formData.access.filter((a) => a !== child.access)
      : [...formData.access, child.access];
    // Get all current selected child keys of this parent
    const selectedChildKeys = parent.children.filter((c) => newAccess.includes(c.access));
     if (selectedChildKeys.length > 0 && !newAccess.includes(parent.access)) {
      // At least one child is selected → ensure parent is included
      newAccess.push(parent.access);
     } else if (selectedChildKeys.length === 0 && newAccess.includes(parent.access)) {
      // No child selected → remove parent
      newAccess = newAccess.filter((a) => a !== parent.access);
     }
  
    setFormData((prev) => ({ ...prev, access: newAccess }));
  };
  

 //Function to handle select all access checkbox toggle 
 const getAllAccessKeys = () => {
  return sidebarItems.flatMap(item => [
    item.access,
    ...(item.children?.map(child => child.access) || [])
  ]);
};
  
  const allAccessKeys = getAllAccessKeys();
  const isAllSelected = useMemo(() => {
    return allAccessKeys.every((key) => formData.access.includes(key));
  }, [formData.access, allAccessKeys]);
  
  const handleSelectAllToggleAccess = () => {
    const newAccess = isAllSelected ? [] : allAccessKeys;
    setFormData((prev) => ({ ...prev, access: newAccess }));
  };
  //End

  //function to handle selection state of all permission
  const isAllPermissionsSelected = permissionsList.every((perm) =>
    formData.permissions.includes(perm)
  );
  
  const handleSelectAllPermissions = () => {
    const newPermissions = isAllPermissionsSelected ? [] : permissionsList;
    setFormData((prev) => ({ ...prev, permissions: newPermissions }));
  };
  
  //End
  const handleSubmit = (e) => {
    e.preventDefault();
    const result = RoleSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      fieldErrors.access && ErrorAlert("Error!", fieldErrors.access);
      fieldErrors.permissions && ErrorAlert("Error!", fieldErrors.permissions);
    } else {
      setErrors({});
      const roleId = formData.id;
      const roleData = result.data;
      const submitData = initialData ? {id: roleId, data: roleData, action: "edit" } : {id: roleId, data: roleData, action: "create" }
      onSubmit(submitData); // Pass to parent
    }
  };
  
  return (
    <div className="max-w-5xl mx-auto p-4">
      <article>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-xl font-bold">
            {!initialData && "Create New Role"}
          </div>
          <div> 
            <label className="block mb-1 font-medium">Role Name</label>
            <TextInput color={errors.name ? "failure": "success"} type="text" name="name" value={formData.name}
              onChange={handleTextChange}
              placeholder="e.g. Administrator"
            />
            {errors.name && (<p className="text-red-500 text-sm mt-1">{errors.name}</p>)}
          </div>
          <div> 
            <label className="block mb-1 font-medium">Description</label>
            <Textarea 
              color= {errors.description ? "failure" : "success"} 
              name="description" 
              placeholder="Short description..." rows={3}
              value={formData.description}
              onChange={handleTextChange}
             />
            {errors.description && (<p className="text-red-500 text-sm mt-1">{errors.description}</p>)}
          </div>
          <Tabs aria-label="Tabs with icons" variant="underline"theme={CustomTheme.themeTabs}>
          <TabItem icon={IoShieldCheckmarkSharp} active title="Access Control">
          <div>
            <label className="flex items-center justify-between mb-2 font-medium">
              <span>Access Routes</span>
              <div className=" flex gap-3 items-center mb-2">
                <label htmlFor="selectAllAccess">Select All</label>
                <Checkbox
                checked = {isAllSelected}
                onChange={handleSelectAllToggleAccess}
                id="selectAllAccess"
                color="success"
                />
              </div>
            </label>
            <div className="max-h-[35vh] h-[35vh] overflow-y-auto border p-3 rounded-md space-y-4">
              {sidebarItems.map((item) => (
                <div key={item.access}>
                  <label htmlFor={initialData ? `edit-access_item-${item.access}`: `create-access_item-${item.access}`} 
                   className="flex items-center gap-2 font-semibold">
                    <Checkbox
                      id={initialData ? `edit-access_item-${item.access}`: `create-access_item-${item.access}`}
                      color = "success"
                      checked={isChecked(item.access)}
                      onChange={() =>
                        item.children
                          ? handleParentToggle(item)
                          : handleCheckboxChange("access", item.access)
                      }
                    />
                    {item.label}
                  </label>
              
                  {item.children && (
                    <div className="ml-6 mt-2 space-y-1">
                      {item.children.map((child) => (
                        <label
                          key={child.access}
                          className="flex items-center gap-2"
                        >
                          <Checkbox
                            color = "success"
                            checked={isChecked(child.access)}
                            onChange={() => handleChildToggle(child, item)}
                          />
                          {child.label}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          </TabItem>
          <TabItem icon={MdCreditScore} active title="Permission">
          <div>
          <label className="flex items-center justify-between mb-2 font-medium">
              <span>Permission</span>
              <div className=" flex gap-3 items-center mb-2">
                <label htmlFor="selectAllPermissions">Select All</label>
                <Checkbox
                checked={isAllPermissionsSelected}
                onChange={handleSelectAllPermissions}
                id="selectAllPermissions"
                color="success"
                />
              </div>
            </label>
            <div className="max-h-[35vh] h-[35vh] flex flex-col flex-wrap gap-4">
              {permissionsList.map((perm) => (
                <label key={perm} htmlFor={`perm-${perm}`}  className="flex items-center gap-2">
                  <Checkbox
                    color = "success"
                    id={`perm-${perm}`}
                    checked={formData.permissions.includes(perm)}
                    onChange={() => handleCheckboxChange("permissions", perm)}
                  />
                  {perm}
                </label>
              ))}
            </div>
          </div>
          </TabItem>
          </Tabs>    
          <PrimaryButtonsMd 
            className = "p-0"
            btnIcon ={<GrDocumentUpdate className="mr-2 h-5 w-5" />} 
            text = {initialData ? "Update Role" : "Save Role"}
            type="submit"
            />
        </form>
      </article>
    </div>
  );
}

//SETTING THE PROPERTIES DATA TYPES
RoleForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func,
};

