import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectField(props) {
    const { data = [], value = '', newValue = null, label, lid = "select-label-id", id = "select-id", change } = props;
    const [selected, setSelected] = React.useState(value);

    const handleChange = (event) => {
        const { value } = event.target;
        setSelected(value);
        change(value)
    };

    React.useEffect(() => {
        if (newValue != null) setSelected(newValue)
    }, [newValue])

    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}
                style={{ width: '100%' }}>
                <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
                <Select
                    labelId={lid}
                    id={id}
                    value={selected}
                    onChange={handleChange}
                    label={label}
                >
                    {
                        data.map(item => <MenuItem value={item}>{item}</MenuItem>)
                    }

                </Select>
            </FormControl>
        </div>
    );
}
