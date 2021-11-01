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
  height:calc(100% - 14px);
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
    <InputUnstyled components={{ Input: StyledInputElement }} {...props} className={props.cls} ref={ref} />
  );
});

export default function SearchField(props) {
  const { text, KeyDown, setVal, value } = props
  const [textVal, setTextVal] = React.useState()
  const handleChange = (e) => {
    console.log("change", e.target.value);
    setTextVal(e.target.value)
    setVal(e.target.value)
  }
  return <CustomInput value={value} onKeyDown={KeyDown} onChange={handleChange} aria-label="Demo input" placeholder={text} />;
}
