import PropTypes from "prop-types";
import { Label, TextInput, Select, Checkbox } from "flowbite-react";
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { GrDocumentUpdate } from "react-icons/gr";
import { PrimaryButtons } from "@/components/ui/Buttons";
import { farmerSchema } from "@/schemas/FarmerSchema";
import FarmerService from '@/services/farmerService';
import { ErrorAlert , SuccessAlert} from '@/utils/Alerts';
import { TransparentLoader } from "@/components/ui/TransparentLoader";
import { farmerKeys } from "@/utils/ArraysData";
import { allowNumbersOnly, allowTextOnly } from "@/utils/utilityFunction";
import LocationPicker from "@/components/ui/LocationPicker";
import { ModalComponent } from "@/components/ui/Modal";

export const EditFarmer = ({selectedFarmer, fetchData, setIsEditFarmerModalOpen}) => {
   //navigate  
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [formData, setFormData] = useState({
      farmer_Id: "",
      first_name: "",
      last_name: "",
      surname: "",
      gender: "",
      date_of_birth: "",
      marital_status: "",
      national_id: "",
      contact_details: "",
      residential_address: "",
      region: "",
      district: "",
      community_or_village: "",
      educational_level: "",
      farm_location: "",
      farm_gps_coordinate: "",
      land_size: "",
      land_ownership: "",
      farming_practice: "",
      crop_type: "",
      livestock_type: "",
      harvest_dates: "",
      farming_experience: "",
      mechanization: "",
      soil_type: "",
      revenue: "",
      market_prices: "",
      yield_per_acre: "",
      smartphone_ownership: "",
      internet_access: "",
      digital_platform_use: "",
      ussd_sms_familiarity: "",
      date_created: "",
      is_active: "" 
  });

  useEffect(() => {
    if (selectedFarmer) {
      // Converting harvest_dates to 'YYYY-MM-DD' if present
      const mappedData = {
        ...selectedFarmer,
        harvest_dates: selectedFarmer.harvest_dates
        ? selectedFarmer.harvest_dates.split("T")[0]
        : "",
        date_of_birth: selectedFarmer.date_of_birth
        ? selectedFarmer.date_of_birth.split("T")[0]
        : "",
      };
      //Keeping keys that exist in formData to avoid adding extra fields
      const filteredData = Object.fromEntries(
        Object.entries(mappedData).filter(([key]) =>
          farmerKeys.includes(key)
      )
    );
    console.log(selectedFarmer.farmer_Id)
      setStatus(selectedFarmer.is_active)
      setFormData(filteredData);
    }
  }, [selectedFarmer]);

  
  const handleToggle = (selectedStatus) => {
    if (status !== selectedStatus) {
      setStatus(selectedStatus);
    }
  };
  
  const handleChange = (e) => {
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

  const handleSubmit = async() => {
    // Call API to update farmer data
    const result = farmerSchema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      console.log("Validation Errors:", errors);
      ErrorAlert("Error!", "Fill all required fields!")
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    // Proceeding if valid
    const editedFarmerData = result.data;
    const editedFarmer= {...editedFarmerData, is_active: status}
    const farmer_id = selectedFarmer.farmer_Id;
    setIsSubmitting(true)
      const response = await FarmerService.updateFarmer(farmer_id, editedFarmer);
      if (response.success) {
        SuccessAlert(response.message)
        setFormData({});
        setErrors({}); // clear errors if all is valid
        setIsEditFarmerModalOpen(false)
        fetchData();
        navigate("/manage-farmer")
        } else {
          ErrorAlert("Error!", "Failed to update farmer data!");
        }
     setIsSubmitting(false);   
  }

  const handleSelectLocation = (coords) => {
    formData.farm_gps_coordinate = coords;
    setShowMap(false);
  };

  return (
    <main className="h-[100vh] bg-white rounded-2xl">
      <fieldset className="border-2 border-green-500 rounded-md py-0 px-4 bg-gray-100 w-fit">
        <legend className="text-sm font-medium text-green-700 px-2">Status</legend>
        <div className="flex gap-4 items-center mb-2">
          <label className="flex items-center gap-2">
            <Checkbox
              color="success"
              checked={status === true}
              onChange={() => handleToggle(true)}
            />
            Active
          </label>
          <label className="flex items-center gap-2">
            <Checkbox
              color="success"
              checked={status === false}
              onChange={() => handleToggle(false)}
            />
            Inactive
          </label>
        </div>
      </fieldset>
      <div className="text-center md:text-xl text-green-800 font-bold py-3">Personal Information</div>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
        <div>
          <span className="flex gap-1">
            <Label htmlFor="first_name" value="First Name" />
            <span className="text-red-500 ml-1">*</span>
          </span>
          <TextInput
            color={errors.first_name ? "failure" : "success"}
            onKeyDown={allowTextOnly}
            id="first_name"
            value={formData.first_name || ""}
            name="first_name"
            onChange={handleChange}
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm">{errors.first_name[0]}</p>
          )}
        </div>
        <div>
          <span className="flex gap-1">
            <Label htmlFor="surname" value="Surname" />
            <span className="text-red-500 ml-1">*</span>
          </span>
          <TextInput
            color={errors.surname ? "failure" : "success"}
            onKeyDown={allowTextOnly}
            id="surname"
            value={formData.surname || ""}
            name="surname"
            onChange={handleChange}
          />
          {errors.surname && (
            <p className="text-red-500 text-sm">{errors.surname[0]}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
        <div>
          <Label htmlFor="last_name" value="Last Name" />
          <TextInput
            color="success"
            onKeyDown={allowTextOnly}
            id="last_name"
            value={formData.last_name || ""}
            name="last_name"
            onChange={handleChange}
          />
        </div>
        <div>
          <span className="flex gap-1">
            <Label htmlFor="gender" value="Gender" />
            <span className="text-red-500 ml-1">*</span>
          </span>
          <Select
            color={errors.gender ? "failure" : "success"}
            id="gender"
            name="gender"
            value={formData.gender || ""}
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender[0]}</p>
          )}
        </div>
      </div>

      {/* New row: date_of_birth and national_id */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
        <div>
          <span className="flex gap-1">
            <Label htmlFor="date_of_birth" value="Date of Birth" />
            <span className="text-red-500 ml-1">*</span>
          </span>
          <TextInput
            color={errors.date_of_birth ? "failure" : "success"}
            id="date_of_birth"
            name="date_of_birth"
            type="date"
            value={formData.date_of_birth || ""}
            onChange={handleChange}
          />
          {errors.date_of_birth && (
            <p className="text-red-500 text-sm">{errors.date_of_birth[0]}</p>
          )}
        </div>
        <div>
          <span className="flex gap-1">
            <Label htmlFor="national_id" value="National ID" />
            <span className="text-red-500 ml-1">*</span>
          </span>
          <TextInput
            color={errors.national_id ? "failure" : "success"}
            id="national_id"
            name="national_id"
            value={formData.national_id || ""}
            onChange={handleChange}
          />
          {errors.national_id && (
            <p className="text-red-500 text-sm">{errors.national_id[0]}</p>
          )}
        </div>
      </div>

      {/* New row: marital_status and contact_details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
        <div>
          <span className="flex gap-1">
            <Label htmlFor="marital_status" value="Marital Status" />
            <span className="text-red-500 ml-1">*</span>
          </span>
          <Select
            color={errors.marital_status ? "failure" : "success"}
            id="marital_status"
            name="marital_status"
            value={formData.marital_status || ""}
            onChange={handleChange}
          >
            <option value="">Select marital status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
            <option value="Other">Other</option>
          </Select>
          {errors.marital_status && (
            <p className="text-red-500 text-sm">{errors.marital_status[0]}</p>
          )}
        </div>
        <div>
          <span className="flex gap-1">
            <Label htmlFor="contact_details" value="Contact Details" />
            <span className="text-red-500 ml-1">*</span>
          </span>
          <TextInput
            maxLength={10}
            type="tel"
            color={errors.contact_details ? "failure" : "success"}
            onKeyDown={allowNumbersOnly}
            id="contact_details"
            value={formData.contact_details || ""}
            name="contact_details"
            onChange={handleChange}
          />
          {errors.contact_details && (
            <p className="text-red-500 text-sm">{errors.contact_details[0]}</p>
          )}
        </div>
      </div>

      <div>
        <span className="flex gap-1">
          <Label htmlFor="residential_address" value="Residential Address" />
          <span className="text-red-500 ml-1">*</span>
        </span>
        <TextInput
          color={errors.residential_address ? "failure" : "success"}
          id="residential_address"
          name="residential_address"
          value={formData.residential_address || ""}
          onChange={handleChange}
        />
        {errors.residential_address && (
          <p className="text-red-500 text-sm">{errors.residential_address[0]}</p>
        )}
      </div>

      {/* New row: region and district */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
        <div>
          <span className="flex gap-1">
            <Label htmlFor="region" value="Region" />
            <span className="text-red-500 ml-1">*</span>
          </span>
          <TextInput
            color={errors.region ? "failure" : "success"}
            id="region"
            name="region"
            value={formData.region || ""}
            onChange={handleChange}
          />
          {errors.region && (
            <p className="text-red-500 text-sm">{errors.region[0]}</p>
          )}
        </div>
        <div>
          <span className="flex gap-1">
            <Label htmlFor="district" value="District" />
            <span className="text-red-500 ml-1">*</span>
          </span>
          <TextInput
            color={errors.district ? "failure" : "success"}
            id="district"
            name="district"
            value={formData.district || ""}
            onChange={handleChange}
          />
          {errors.district && (
            <p className="text-red-500 text-sm">{errors.district[0]}</p>
          )}
        </div>
      </div>

      {/* New field: community_or_village */}
      <div>
        <span className="flex gap-1">
          <Label htmlFor="community_or_village" value="Community or Village" />
          <span className="text-red-500 ml-1">*</span>
        </span>
        <TextInput
          color={errors.community_or_village ? "failure" : "success"}
          id="community_or_village"
          name="community_or_village"
          value={formData.community_or_village || ""}
          onChange={handleChange}
        />
        {errors.community_or_village && (
          <p className="text-red-500 text-sm">{errors.community_or_village[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
        <div>
          <span className="flex gap-1">
            <Label htmlFor="farming_experience" value="Farming Experience (years)" />
            <span className="text-red-500 ml-1">*</span>
          </span>
          <TextInput
            color={errors.farming_experience ? "failure" : "success"}
            min={0}
            id="farming_experience"
            name="farming_experience"
            value={formData.farming_experience || ""}
            type="number"
            onChange={handleChange}
          />
          {errors.farming_experience && (
            <p className="text-red-500 text-sm">{errors.farming_experience[0]}</p>
          )}
        </div>
        <div>
          <span className="flex gap-1">
            <Label htmlFor="educational_level" value="Education Level" />
            <span className="text-red-500 ml-1">*</span>
          </span>
          <Select
            color={errors.educational_level ? "failure" : "success"}
            id="educational_level"
            name="educational_level"
            value={formData.educational_level || ""}
            onChange={handleChange}
          >
            <option value="">Select education level</option>
            <option value="Primary">Primary</option>
            <option value="Secondary">Secondary</option>
            <option value="Tertiary">Tertiary</option>
            <option value="Other">Other</option>
          </Select>
          {errors.educational_level && (
            <p className="text-red-500 text-sm">{errors.educational_level[0]}</p>
          )}
        </div>
      </div>

        {/* FARM INFORMATION*/}
          <div className="text-center md:text-xl text-green-800 font-bold py-3">Farm Information</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
          <div>
              <span className="flex gap-1">
                <Label htmlFor="farm_gps_coordinate" value="Farm GPS Coordinate" />
                <span className="text-red-500 ml-1">*</span>
              </span>
              <div className="grid grid-cols-[_63%_35%] gap-[2%]">
                <TextInput
                  color={errors.farm_gps_coordinate ? "failure" : "success"}
                  id="farm_gps_coordinate"
                  name="farm_gps_coordinate"
                  value={formData.farm_gps_coordinate || ""}
                  type="text"
                  onChange={handleChange}
                />
                <PrimaryButtons 
                  text = "Pick from Map"
                  onClick={() => setShowMap(!showMap)}
                  />
              </div>
              {errors.farm_gps_coordinate && <p className="text-red-500 text-sm">{errors.farm_gps_coordinate[0]}</p>}
            </div>

            <div>
              <span className="flex gap-1">
                <Label htmlFor="farm_location" value="Farm Location" />
                <span className="text-red-500 ml-1">*</span>
              </span>
              <TextInput
                color={errors.farm_location ? "failure" : "success"}
                id="farm_location"
                name="farm_location"
                value={formData.farm_location || ""}
                type="text"
                onChange={handleChange}
                />
                {errors.farm_location && <p className="text-red-500 text-sm">{errors.farm_location[0]}</p>}
            </div>          
        </div>  
        <div>
          <span className="flex gap-1">
            <Label htmlFor="land_size" value="Land Size (acres)" />
            <span className="text-red-500 ml-1">*</span>
          </span>
          <TextInput
            color={errors.land_size ? "failure" : "success"}
            id="land_size"
            min={0}
            name="land_size"
            value={formData.land_size || ""}
            type="number"
            onChange={handleChange}
          />
          {errors.land_size && <p className="text-red-500 text-sm">{errors.land_size[0]}</p>}
        </div>
      
        <div>
          <span className="flex gap-1">
            <Label htmlFor="crop_type" value="Crop Type" />
            <span className="text-red-500 ml-1">*</span>
          </span>
          <Select
            color={errors.crop_type ? "failure" : "success"}
            id="crop_type"
            name="crop_type"
            value={formData.crop_type || ""}
            onChange={handleChange}
          >
            <option value="">Select crop type</option>
            <option value="Legumes">Legumes</option>
            <option value="Cereals">Cereals</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Root & Tuber">Root & Tuber</option>
            <option value="Cash Crops">Cash Crops</option>
          </Select>
          {errors.crop_type && <p className="text-red-500 text-sm">{errors.crop_type[0]}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
            {/* Harvest Dates */}
            <div>
              <span className="flex gap-1">
                <Label htmlFor="harvest_dates" value="Harvest Dates" />
                <span className="text-red-500 ml-1">*</span>
              </span>
              <TextInput
                color={errors.harvest_dates ? "failure" : "success"}
                id="harvest_dates"
                name="harvest_dates"
                value={formData.harvest_dates || ""}
                type="date"
                onChange={handleChange}
              />
              {errors.harvest_dates && <p className="text-red-500 text-sm">{errors.harvest_dates[0]}</p>}
            </div>

            {/* Market Prices */}
            <div>
              <span className="flex gap-1">
                <Label htmlFor="market_prices" value="Market Prices (GHS)" />
                <span className="text-red-500 ml-1">*</span>
              </span>
              <TextInput
                color={errors.market_prices ? "failure" : "success"}
                id="market_prices"
                name="market_prices"
                value={formData.market_prices || ""}
                type="number"
                min={0}
                onChange={handleChange}
              />
              {errors.market_prices && <p className="text-red-500 text-sm">{errors.market_prices[0]}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
            {/* Revenue */}
            <div>
              <span className="flex gap-1">
                <Label htmlFor="revenue" value="Revenue (GHS)" />
                <span className="text-red-500 ml-1">*</span>
              </span>
              <TextInput
                color={errors.revenue ? "failure" : "success"}
                id="revenue"
                name="revenue"
                value={formData.revenue || ""}
                type="number"
                min={0}
                onChange={handleChange}
              />
              {errors.revenue && <p className="text-red-500 text-sm">{errors.revenue[0]}</p>}
            </div>

            {/* Yield Per Acre */}
            <div>
              <span className="flex gap-1">
                <Label htmlFor="yield_per_acre" value="Yield Per Acre (kg)" />
                <span className="text-red-500 ml-1">*</span>
              </span>
              <TextInput
                color={errors.yield_per_acre ? "failure" : "success"}
                id="yield_per_acre"
                name="yield_per_acre"
                value={formData.yield_per_acre || ""}
                type="number"
                min={0}
                onChange={handleChange}
              />
              {errors.yield_per_acre && <p className="text-red-500 text-sm">{errors.yield_per_acre[0]}</p>}
            </div>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
          <div>
            <span className="flex gap-1">
              <Label htmlFor="soil_type" value="Soil Type" />
              <span className="text-red-500 ml-1">*</span>
            </span>
            <Select
              color={errors.soil_type ? "failure" : "success"}
              id="soil_type"
              name="soil_type"
              value={formData.soil_type || ""}
              onChange={handleChange}
            >
              <option value="">Select soil type</option>
              <option value="Clay">Clay</option>
              <option value="Sandy">Sandy</option>
              <option value="Silt">Silt</option>
              <option value="Loam">Loam</option>
              <option value="Other">Other</option>
            </Select>
            {errors.soil_type && <p className="text-red-500 text-sm">{errors.soil_type[0]}</p>}
          </div>
          <div>
            <span className="flex gap-1">
              <Label htmlFor="farming_practice" value="Farming Practice" />
              <span className="text-red-500 ml-1">*</span>
            </span>
            <Select
              color={errors.farming_practice ? "failure" : "success"}
              id="farming_practice"
              name="farming_practice"
              value={formData.farming_practice || ""}
              onChange={handleChange}
            >
              <option value="">Select farming practice</option>
              <option value="Organic">Organic</option>
              <option value="Conventional">Conventional</option>
              <option value="Mixed">Mixed</option>
              <option value="Other">Other</option>
            </Select>
            {errors.farming_practice && <p className="text-red-500 text-sm">{errors.farming_practice[0]}</p>}
          </div>
        </div>

        <div>
          <span className="flex gap-1">
            <Label htmlFor="mechanization" value="Mechanization" />
            <span className="text-red-500 ml-1">*</span>
          </span>
          <Select
            color={errors.mechanization ? "failure" : "success"}
            id="mechanization"
            name="mechanization"
            value={formData.mechanization || ""}
            onChange={handleChange}
          >
            <option value="">Select mechanization level</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>
          {errors.mechanization && <p className="text-red-500 text-sm">{errors.mechanization[0]}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
          {/* Added new field: land_ownership */}
          <div>
            <span className="flex gap-1">
              <Label htmlFor="land_ownership" value="Land Ownership" />
              <span className="text-red-500 ml-1">*</span>
            </span>
            <Select
              color={errors.land_ownership ? "failure" : "success"}
              id="land_ownership"
              name="land_ownership"
              value={formData.land_ownership || ""}
              onChange={handleChange}
            >
              <option value="">Select ownership type</option>
              <option value="Owned">Owned</option>
              <option value="Rented">Rented</option>
              <option value="Leased">Leased</option>
              <option value="Communal">Communal</option>
              <option value="Family">Family</option>
              <option value="Other">Other</option>
            </Select>
            {errors.land_ownership && <p className="text-red-500 text-sm">{errors.land_ownership[0]}</p>}
          </div>

          {/* Added new field: livestock_type */}
          <div>
            <span className="flex gap-1">
              <Label htmlFor="livestock_type" value="Livestock Type" />
              <span className="text-red-500 ml-1">*</span>
            </span>
            <Select
              color={errors.livestock_type ? "failure" : "success"}
              id="livestock_type"
              name="livestock_type"
              value={formData.livestock_type || ""}
              onChange={handleChange}
            >
              <option value="">Select livestock type</option>
              <option value="None">None</option>
              <option value="Cattle">Cattle</option>
              <option value="Goats">Goats</option>
              <option value="Sheep">Sheep</option>
              <option value="Poultry">Poultry</option>
              <option value="Pigs">Pigs</option>
              <option value="Other">Other</option>
            </Select>
            {errors.livestock_type && <p className="text-red-500 text-sm">{errors.livestock_type[0]}</p>}
          </div>
        </div>
        {/* TECHNOLOGY USE INFORMATION*/}
        <div className="text-center md:text-xl text-green-800 font-bold py-3">Technology Use</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">
          
            <div>
            <span className="flex gap-1">
              <Label htmlFor="smartphone_ownership" value="Smartphone Ownership" />
              <span className="text-red-500 ml-1">*</span>
            </span>
            <Select
              id="smartphone_ownership"
              name="smartphone_ownership"
              value={formData.smartphone_ownership || ""}
              onChange={handleChange}
              color={errors.smartphone_ownership ? "failure" : "success"}
            >
              <option value="">Select option</option>
              <option value="Yes">Yes</option>
              <option value="Yes">No</option>
            </Select>
            {errors.smartphone_ownership && (
              <p className="text-red-500 text-sm">{errors.smartphone_ownership[0]}</p>
            )}
          </div>

          {/* Internet Access */}
          <div>
            <span className="flex gap-1">
              <Label htmlFor="internet_access" value="Internet Access" />
              <span className="text-red-500 ml-1">*</span>
            </span>
            <Select
              id="internet_access"
              name="internet_access"
              value={formData.internet_access || ""}
              onChange={handleChange}
              color={errors.internet_access ? "failure" : "success"}
            >
              <option value="">Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
            {errors.internet_access && (
              <p className="text-red-500 text-sm">{errors.internet_access[0]}</p>
            )}
          </div>
        </div>
      {/* USSD/SMS Familiarity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-16">

          <div>
            <span className="flex gap-1">
              <Label htmlFor="ussd_sms_familiarity" value="USSD/SMS Familiarity" />
              <span className="text-red-500 ml-1">*</span>
            </span>
            <Select
              id="ussd_sms_familiarity"
              name="ussd_sms_familiarity"
              value={formData.ussd_sms_familiarity || ""}
              onChange={handleChange}
              color={errors.ussd_sms_familiarity ? "failure" : "success"}
            >
              <option value="">Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
            {errors.ussd_sms_familiarity && (
              <p className="text-red-500 text-sm">{errors.ussd_sms_familiarity[0]}</p>
            )}
          </div>

          {/* Digital Platform Use */}
          <div>
            <span className="flex gap-1">
              <Label htmlFor="digital_platform_use" value="Digital Platform Use" />
              <span className="text-red-500 ml-1">*</span>
            </span>
            <Select
              id="digital_platform_use"
              name="digital_platform_use"
              value={formData.digital_platform_use || ""}
              onChange={handleChange}
              color={errors.digital_platform_use ? "failure" : "success"}
            >
              <option value="">Select option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
            {errors.digital_platform_use && (
              <p className="text-red-500 text-sm">{errors.digital_platform_use[0]}</p>
            )}
          </div>
        </div>
            <div className="py-4 flex justify-end">
              <PrimaryButtons 
                btnIcon ={<GrDocumentUpdate className="mr-2 h-5 w-5" />} 
                text = "Update"
                onClick={handleSubmit}
                disabled = {isSubmitting}
                />
            </div>
             {/* Loading component */}
          {isSubmitting &&  <TransparentLoader/>}
        <ModalComponent header= "Choose Farm GPS Location" openModal={showMap} onClose={()=> setShowMap(false)}>
          <div className="mt-4">
            <LocationPicker onSelect={handleSelectLocation} />
          </div>
        </ModalComponent>
    </main>
  )
}

//SETTING THE PROPERTIES DATA TYPES
EditFarmer.propTypes = {
  selectedFarmer: PropTypes.array,
  fetchData: PropTypes.func.isRequired,
  setIsEditFarmerModalOpen: PropTypes.func
};