
class Helper {

    static update(element, formdata, formName) {
        const newFormData = {
            ...formdata
        }
        const newElementDetails = {
            ...newFormData[element.id]
        }
        newElementDetails.value = element.event.target.value;
        let validData = this.validate(newElementDetails, formdata, element.id);
        newElementDetails.valid = validData[0];
        newElementDetails.validationMessage = validData[1];
        if (element.id === 'tripType') {
            newElementDetails.value = `${!newElementDetails.checkedState ? 'return trip' : 'one way trip'}`;
            newElementDetails.checkedState = !newElementDetails.checkedState

        }
        newElementDetails.touched = element.blur;

        newFormData[element.id] = newElementDetails;
        return newFormData;

    }
    static populateDropdown(formdata, fieldValues) {
        const newFormData = { ...formdata }
        const keys = Object.keys(fieldValues)
        for (let i = 0; i < keys.length; i++) {
            const newDropdownArray = newFormData[keys[i]].config.options;
            fieldValues[keys[i]].forEach(item => {
                newDropdownArray.push({ key: item.id, value: `${item.terminal.toUpperCase()} - [${item.state.toUpperCase()}]` })
            });
            newFormData[keys[i]].config.options = newDropdownArray;
        }

        return newFormData;
    }
    static validate(elementData, formdata = [], id) {
        let error = [true, ''];
        if (elementData.validation.email) {
            const valid = elementData.value.trim() === '';
            error = valid ? [false, 'This field is required'] :
                ((/\S+@\S+\.\S+/.test(elementData.value.trim())) ? error : [false, 'Must be a valid email']);

        }
        else if (id === 'tripType') {
            return [true, '']
        }
        else if (elementData.validation.confirm === 'password') {
            const valid = elementData.value.trim() === '';
            error = valid ? [false, 'This field is required'] :
                (elementData.value === formdata['password'].value ? error : [false, 'passwords do not match']);
        }
        else {
            return elementData.value.trim() ? error : [false, 'This is Required']
        }
        return error;
    }
    static resetField(formdata, id) {
        const newFormData = { ...formdata };
        newFormData[id].value = '';
        newFormData[id].config.options = []
        return newFormData;
    }
    static validateForm(form, type) {
        let objectToSubmit = {};
        let formIsValid = null;;
        for (let key in form) {
            if (key !== 'confirmPassword') {
                objectToSubmit[key] = form[key].value;
                if (formIsValid === null) {
                    formIsValid = form[key].valid;
                }
                else if (formIsValid) {
                    formIsValid = form[key].valid
                }
            }
            else if (key === 'tripType') {
                form[key].valid = true;
                formIsValid = true
            }
        }
        return { isValid: formIsValid, record: objectToSubmit }
    }
    static resetForm(formdata) {
        for (let key in formdata) {
            if (key === 'images') {
                formdata[key].value = [];
                formdata[key].valid = false;
                formdata[key].validationMessage = '';
            } else {
                formdata[key].value = '';
                formdata[key].valid = false;
                formdata[key].touched = false;
                formdata[key].validationMessage = '';
            }

        }
        return { ...formdata };
    }
    static isEmpty(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
}


export default Helper;