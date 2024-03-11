import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AddressAutocompleteForm = ({addresses, readAddressInput, selectAddress}) => {

    const handleAddressInput = (value) => {
        const address = value;
        readAddressInput(address);
    };

    console.log('add', addresses);
    return (
        <Autocomplete
            id="address-autocomplete"
            options={addresses}
            autoHighlight
            onChange={(event, selectedAddress) => selectAddress(selectedAddress)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Enter Address"
                    variant="outlined"
                    onChange={handleAddressInput}
                    fullWidth
                />
            )}
        />
    );
};

export default AddressAutocompleteForm;
