import * as React from 'react';
// import "./Search.scss";
// import { Search } from '@mui/icons-material';
// export default function SearchField() {
//     return (
//         <div id="search">
//             <div className="input">
//                 <div className="search-icon">
//                     <Search />
//                 </div>
//                 <div className="search-lable">
//                     Search or start new chat
//                 </div>
//             </div>
//         </div>
//     )
// }
import InputUnstyled from '@mui/core/InputUnstyled';
import { styled } from '@mui/system';

const StyledInputElement = styled('input')`
  width: 90%;
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

export default function SearchField() {
    return <CustomInput aria-label="Demo input" placeholder="Search or start a new chat" />;
}
