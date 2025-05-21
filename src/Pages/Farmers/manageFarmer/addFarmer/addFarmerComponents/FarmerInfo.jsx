import PropType from "prop-types";
import { Label, TextInput, Select } from "flowbite-react";
import { allowNumbersOnly, allowTextOnly } from "@/utils/utilityFunction";

function FarmerInfo({ formData, updateFormData, errors, setErrors }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <main className="space-y-4">
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
    </main>
  );
}

export default FarmerInfo;

FarmerInfo.propTypes = {
  updateFormData: PropType.func,
  formData: PropType.object,
  errors: PropType.object,
  setErrors: PropType.func,
};
