import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AddressAutocompleteForm = ({addresses, setAddress}) => {

    const handleAddressSelect = (address) => {
        setAddress(address);
        console.log('Selected address:', address);
    };

    return (
        <Autocomplete
            id="address-autocomplete"
            options={addresses}
            autoHighlight
            onChange={(event, newValue) => handleAddressSelect(newValue)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Enter Address"
                    variant="outlined"
                    fullWidth
                />
            )}
        />
    );
};

export default AddressAutocompleteForm;
