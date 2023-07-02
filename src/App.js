import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, RadioGroup, Radio, Checkbox, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { styled } from '@mui/system';

const FormContainer = styled('div')`
max-width: 400px;
margin: 0 auto;
padding: 16px;
border: 1px solid #ccc;
border-radius: 4px;
display: flex;
flex-direction: column;
align-items: center;
`;

const FormField = styled(FormControl)`
  margin-bottom: 16px;
`;

const SubmitButton = styled(Button)`
  margin-top: 16px;
`;

const hobbiesFieldStyle = {
  minWidth: '200px', 
  marginBottom: '16px',
};

const initialValues = {
  name: '',
  address: '',
  country: 'Select a country', 
  gender: '',
  hobbies: []
};

const countries = [
  { label: 'Select a country', value: '' },
  { label: 'United States', value: 'US' },
  { label: 'Canada', value: 'CA' },
  { label: 'United Kingdom', value: 'UK' },
  { label: 'India', value: 'IN' },
];

const hobbiesOptions = [
  { label: 'Reading', value: 'reading' },
  { label: 'Sports', value: 'sports' },
  { label: 'Cooking', value: 'cooking' },
];

const App = () => {
  const [submittedData, setSubmittedData] = useState([]);

  const handleSubmit = (values) => {
    setSubmittedData((prevData) => [...prevData, values]);
  };

  const validateForm = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }

    if (!values.address) {
      errors.address = 'Required';
    }

    if (!values.country) {
      errors.country = 'Required';
    }

    if (!values.gender) {
      errors.gender = 'Required';
    }

    if (values.hobbies.length === 0) {
      errors.hobbies = 'Select at least one hobby';
    }

    return errors;
  };

  const style = {
    textAlign: 'center', // Fix: Corrected the inline CSS property
  };

  return (
    <div style={style}>
    <h1>User Information Form</h1>
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validateForm}>
      {({ values }) => (
        <FormContainer>
          <Form>
            <Field name="name" as={TextField} label="Name" fullWidth />
            <ErrorMessage name="name" component="div" style={{ color: 'red' }} />

            <Field name="address" as={TextField} label="Address" multiline rows={4} fullWidth />
            <ErrorMessage name="address" component="div" style={{ color: 'red' }} />

            <Field name="country" as={Select} label="Country" fullWidth>
              {countries.map((country) => (
                <MenuItem key={country.value} value={country.value}>{country.label}</MenuItem>
              ))}
            </Field>
            <ErrorMessage name="country" component="div" style={{ color: 'red' }} />

            <Field name="gender" as={RadioGroup}>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </Field>
            <ErrorMessage name="gender" component="div" style={{ color: 'red' }} />

            <FormControl style={hobbiesFieldStyle}>
              <InputLabel id="hobbies-label">Hobbies/Interests</InputLabel>
              <Field name="hobbies" as={Select} multiple fullWidth>
                {hobbiesOptions.map((hobby) => (
                  <MenuItem key={hobby.value} value={hobby.value}>
                    <Checkbox checked={values.hobbies.includes(hobby.value)} />
                    {hobby.label}
                  </MenuItem>
                ))}
              </Field>
            </FormControl>
            <ErrorMessage name="hobbies" component="div" style={{ color: 'red' }} />

            <SubmitButton type="submit" variant="contained" color="primary">Submit</SubmitButton>
          </Form>
        </FormContainer>
      )}
    </Formik>

      {submittedData.length > 0 && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Hobbies/Interests</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submittedData.map((data, index) => (
                <TableRow key={index}>
                  <TableCell>{data.name}</TableCell>
                  <TableCell>{data.address}</TableCell>
                  <TableCell>{data.country}</TableCell>
                  <TableCell>{data.gender}</TableCell>
                  <TableCell>{data.hobbies.join(', ')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default App;
