import * as React from 'react';
import InputUnstyled from '@mui/core/InputUnstyled';
import { styled } from '@mui/system';

const StyledInputElement = styled('input')`
  width: 96%;
  margin-left:10px;
  font-size: 0.9rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.4375em;
  background: rgb(243, 246, 249);
  border: 1px solid #e5e8ec;
  border-radius: 20px;
  padding: 6px 10px;
  color: #20262d;
  &:focus-visible {
      outline:none;
  }
  &:hover {
    background: #eaeef3;
    border-color: #e5e8ec;
  }
`;

const CustomInput = React.forwardRef(function CustomInput(props, ref) {
  return (
    <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
  );
});

export default function SearchField({ text, value }) {
  const handleChange = (e) => {
    console.log("change", e.target.value);
    value(e.target.value)
  }
  return <CustomInput onChange={handleChange} aria-label="Demo input" placeholder={text} />;
}
