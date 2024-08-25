import React from 'react';
import { TextField, SxProps, Theme } from '@mui/material';

interface SearchComponentProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
	placeholder?: string;
}

const SearchComponent = ({ value, onChange, title, icon, sx, placeholder }: SearchComponentProps) => {
  return (
    <TextField
      label={title}
      type="search"
      variant="outlined"
			placeholder={placeholder}
      fullWidth
      value={value}
      onChange={onChange}
      InputProps={{ endAdornment: icon }}
      color="primary"
      size="small"
      sx={{ borderRadius: '10px', ...sx }}
    />
  );
};

export default SearchComponent;
