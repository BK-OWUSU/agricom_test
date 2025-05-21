import axios from 'axios'

const BASE_URL = "http://localhost:3001/agricom";

const RoleService = {
    createRole: async (roleData) => {
        try {
          const response = await axios.post(`${BASE_URL}/roles`, roleData);
          const data =  response.data;
          if (response.status === 201) {
            return { success: true, role: data.role, message: data.role};
          } else {
            return { success: false, message: data.message || "creation of role failed" };
          }
        } catch (error) {
          console.error("Error creating role:", error.response?.data || error.message);
          return { success: false, message: "Server error" };
        }
      },

      updateRole: async (roleId, roleData) => {
        try {
          const response = await axios.put(`${BASE_URL}/roles/${roleId}`, roleData);
          const data =  response.data;
          if (response.status === 200) {
            return { success: true, role: data.role, message: data.message};
          } else {
            return { success: false, message: data.message || "update of role failed" };
          }
        } catch (error) {
          console.error("Error updating role:", error.response?.data || error.message);
          return { success: false, message: "Server error" };
        }
      },
         // Fetch all farmers
    fetchRoles: async () => {
      try {
          const response = await axios.get(`${BASE_URL}/roles`, {withCredentials: true})
          const data = response.data;
          if (response.status === 200) {
              return { success: data.success, roles: data.roles };
          } else {
              return { success: false, message: "Failed to fetch roles and permissions" };
          }
      } catch (error) {
          console.error("AuthService Error:", error);
          return null;
      }
  },

  deleteRole: async (id) => {
    try {
        const response = await axios.delete(`${BASE_URL}/roles/${id}`, {
            withCredentials: true,
        });
        const data = response.data;
        if (response.status === 200 && data.success) {
            return { success: true, message: data.message };
        } else {
            return { success: false, message: data.message || "Failed to delete role" };
        }
    } catch (error) {
        console.error("Delete Farmer Error:", error);
        return { success: false, message: "Server error while deleting farmer" };
    }
},    
}

export default RoleService;