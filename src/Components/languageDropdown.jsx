import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
}));

const LanguageDropDown = ({changeLanguage,...props}) => {

  const {t, i18n} = useTranslation();
  const classes = useStyles();
  const [lang, setLang] = React.useState('en');

  const handleChange = (event) => {
    setLang(event.target.value);
    changeLanguage(event.target.value);
    // console.log(event.target.value)
  };


  return (
<div id = "langCont">
<FormControl variant="filled"  className={classes.formControl}>
{/* <InputLabel id="">lang</InputLabel> */}
  <Select
    labelId="selectLabel"
    id="langId"
    value={lang}
    onChange={handleChange}
    label="lang"
    className="langDropdown"
  >
   
    <MenuItem value={'en'}><i className = "flag-icon flag-icon-us mr-2"/> <span>en</span></MenuItem>
    <MenuItem value={'sw'}><i className = "flag-icon flag-icon-se mr-2"/> <span>se</span></MenuItem>
  </Select>
</FormControl>

</div>
  )
}

export default LanguageDropDown