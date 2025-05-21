export const Capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  export const IsActiveText  = (isActive) => {
    if (isActive) return "Active";
    return "Inactive";
 }
 
 export const isDeletedText = (isDeleted) => {
    if (isDeleted) return "Deleted";
    return "Not Deleted";
 }

 export const allowNumbersOnly = (e) => {
  if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
    e.preventDefault();
  }
}

export const allowTextOnly = (e) => {
  if (!/^[a-zA-Z\s]*$/.test(e.key) && e.key !== "Backspace") {
    e.preventDefault();
  }
}

//Access control function
export const hasAccess = (user, access) => {
    // Admin should see everything
    if (user?.role?.toLowerCase() === "super_admin") return true;
    //for other users with custom access 
    return user?.access?.includes(access.toLowerCase());
}

//Permission control
export const hasPermission = (user, permission) => {
    // Admin should have permission to everything
    if (user?.role?.toLowerCase() === "super_admin") return true;
    //for other users with custom permissions 
    return user?.permissions?.map(p => p.toLowerCase()).includes(permission.toLowerCase());
};

export const shouldDisableEdit = (user, role) => {
  const userRole = user.role.toLowerCase();
  const editRole = role.toLowerCase();
  return userRole !== "super_admin" && editRole === "super_admin";
};
