import axios from 'axios'

const BASE_URL = "http://localhost:3001/agricom";

const FarmerService = {
    registerFarmer: async (farmerData) => {
        try {
            const response = await axios.post(`${BASE_URL}/farmers/register`, farmerData)
            const data = response.data;
            if (response.status === 200) {
                return { success: true, farmer: data.farmer, message: data.message};
              } else {
                return { success: false, message: data.message || "registration failed" };
              }
        } catch (error) {
            console.error("Registration Error:", error);
            return { success: false, message: "Server error" };
        }
    },
    // Fetch all farmers
    getAllFarmers: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/farmers`, {withCredentials: true})
            const farmers = response.data;
            if (response.status === 200) {
                return { success: true, farmers: farmers };
            } else {
                return { success: false, message: "Failed to fetch farmers" };
            }
        } catch (error) {
            console.error("AuthService Error:", error);
            return null;
        }
    },
    
    updateFarmer: async (farmer_Id,farmerData) => {
        try {
            const response = await axios.put(`${BASE_URL}/farmers/${farmer_Id}`, farmerData)
            const data = response.data;
            if (response.status === 200) {
                return { success: true, message: data.message};
              } else {
                return { success: false, message: data.message || "update failed" };
              }
        } catch (error) {
            console.error("Registration Error:", error);
            return { success: false, message: "Server error" };
        }
    },

    deleteFarmer: async (id) => {
        try {
            const response = await axios.delete(`${BASE_URL}/farmers/${id}`, {
                withCredentials: true,
            });
            const data = response.data;
            if (response.status === 200 && data.success) {
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message || "Failed to delete farmer" };
            }
        } catch (error) {
            console.error("Delete Farmer Error:", error);
            return { success: false, message: "Server error while deleting farmer" };
        }
    },    
    deleteMultipleFarmers: async (farmersIds) => {
        try {
            const response = await axios.delete(`${BASE_URL}/farmers/`, farmersIds, {
                withCredentials: true,
            });
            const data = response.data;
            if (response.status === 200 && data.success) {
                return { success: true, message: data.message };
            } else {
                return { success: false, message: data.message || "Failed to delete farmers" };
            }
        } catch (error) {
            console.error("Delete Farmers Error:", error);
            return { success: false, message: "Server error while deleting farmers" };
        }
    },
}

export default FarmerService;