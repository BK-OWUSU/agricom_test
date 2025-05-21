import PropType from "prop-types";
import { Label, TextInput, Select } from "flowbite-react";
import { useState } from "react";
import LocationPicker from "@/components/ui/LocationPicker";
import { ModalComponent } from "@/components/ui/Modal";
import { PrimaryButtons } from "@/components/ui/Buttons";

function FarmInfo({ formData, updateFormData, errors, setErrors }) {
  const [showMap, setShowMap] = useState(false);
  // Handling the changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    // Remove error when field is filled
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectLocation = (coords) => {
    formData.farm_gps_coordinate = coords;
    setShowMap(false);
  };

  return (
    <main className="space-y-4">
        <ModalComponent header= "Choose Farm GPS Location" openModal={showMap} onClose={()=> setShowMap(false)}>
            <div className="mt-4">
              <LocationPicker onSelect={handleSelectLocation} />
            </div>
        </ModalComponent>
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
       
    </main>
  );
}

export default FarmInfo;

FarmInfo.propTypes = {
  updateFormData: PropType.func,
  formData: PropType.object,
  errors: PropType.object,
  setErrors: PropType.func,
};
