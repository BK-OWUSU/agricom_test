import PropType from "prop-types";
import { Label, Select } from "flowbite-react";


function TechnologyUse({ formData, updateFormData, errors, setErrors }) {


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

  return (
    <main className="space-y-4">
      {/* Smartphone Ownership */}
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

      {/* USSD/SMS Familiarity */}
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
    </main>
  );
}

TechnologyUse.propTypes = {
  updateFormData: PropType.func.isRequired,
  formData: PropType.object.isRequired,
  errors: PropType.object,
  setErrors: PropType.func,
};

export default TechnologyUse;