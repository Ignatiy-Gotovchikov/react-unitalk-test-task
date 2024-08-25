import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchOperators, fetchOperatorAddons } from '../store/slices/operatorSlice';
import { RootState, useAppDispatch } from '../store/store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Avatar,
  Box,
  Typography,
  TableSortLabel,
  TablePagination
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchComponent from './SearchComponent';
import { Operator } from '../types';

type Order = 'asc' | 'desc';

export const OperatorTable = () => {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string>('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { operators, operatorAddons, loading } = useSelector((state: RootState) => state.operators);

  useEffect(() => {
    dispatch(fetchOperators());
    dispatch(fetchOperatorAddons());
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getOperatorAddonsText = (operatorId: string): string => {
    const addons = operatorAddons.filter(addon => addon.id === operatorId);
    return addons.map(addon => addon.text).join(', ');
  };

  type OperatorArray = Operator[];

  const sortedOperators = (ops: OperatorArray) => {
    return ops.sort((a, b) => {
      if (orderBy === 'name') {
        return (a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1) * (order === 'asc' ? 1 : -1);
      } else if (orderBy === 'createdAt') {
        return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * (order === 'asc' ? 1 : -1);
      }
      return 0;
    });
  };

  const filteredAndSortedOperators = sortedOperators(
    operators.filter(operator =>
      operator.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const paginatedOperators = filteredAndSortedOperators.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box padding={4} width="100%">
      <Typography sx={{ marginBottom: "40px" }} variant="h4" gutterBottom>
        Оператори
      </Typography>
      <Box display="flex" justifyContent="flex-start" marginBottom={2}>
        <SearchComponent
          title={'Пошук'}
          placeholder='Ім’я користувача...'
          icon={<SearchIcon />}
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ width: "300px", marginBottom: "16px" }}
        />
      </Box>
      <Box
        sx={{
          height: '460px',
          overflow: 'auto',
          width: '100%',

          // Hide scrollbar for Chrome, Safari and Opera
          '::-webkit-scrollbar': {
            width: '0',
          },
          '-ms-overflow-style': 'none', // IE and Edge
          'scrollbar-width': 'none', // Firefox
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={order}
                  onClick={() => handleRequestSort('name')}
                >
                  Користувач
                </TableSortLabel>
              </TableCell>
              <TableCell>Працює</TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'createdAt'}
                  direction={order}
                  onClick={() => handleRequestSort('createdAt')}
                >
                  Дата / Час створення
                </TableSortLabel>
              </TableCell>
              <TableCell>fieldText</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5}>Loading...</TableCell>
              </TableRow>
            ) : (
              paginatedOperators.map((operator, index) => (
                <TableRow key={operator.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar src={operator.avatar} sx={{ marginRight: 2 }} />
                      {operator.name}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Checkbox checked={operator.isWorking} />
                  </TableCell>
                  <TableCell>{operator.createdAt}</TableCell>
                  <TableCell>
                    {getOperatorAddonsText(operator.id)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Box>
      <TablePagination
        component="div"
        count={filteredAndSortedOperators.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
