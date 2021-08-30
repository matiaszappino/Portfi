import React, { useEffect, useContext } from "react";
import { PortfiContext } from "../context/portfiContext";
import delPost from './delPost'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function Datatable() {
  const { dataFromBackend, dataFiltrada, setDataFiltrada, setLoading, setLoadingChart, incomingTicker, listAssets, setListAssets, compositionData , setCompositionData} = useContext(PortfiContext)
  const { data, error, executePost } = delPost();

  useEffect(() => {
    setDataFiltrada(dataFromBackend)
  }, [dataFromBackend])

  useEffect(() => {
    setLoading(true)
  }, [])

  const columns = dataFromBackend[0] && Object.keys(dataFromBackend[0])

  const deleteAsset = (id) => {
    setDataFiltrada(dataFiltrada.filter((data, index) => (id !== index)))
    setCompositionData(listAssets)
    executePost({ data: dataFromBackend[id] })
    setLoading(true)
  }

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(6);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper elevation={0} >
      <TableContainer style={{ maxHeight: '250px', border: '0px'}}>
        <Table cellPadding={6} cellSpacing={1} >
          <TableHead >
            <TableBody >
              {dataFiltrada.map((row, index) => <TableRow key={index} style={{ minWidth: '100%' }}>
                {
                  columns.map(column => <TableCell style={{ columnWidth: '100%' }}>{row[column]}</TableCell>)
                }
                <IconButton aria-label="delete" onClick={() => deleteAsset(index)}><DeleteIcon /></IconButton>
              </TableRow>)}
            </TableBody>
          </TableHead>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={dataFiltrada.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

// <thead>
// <tr>{ data[0] && columns.map((heading) => <th>{heading}</th>) }</tr>
//</thead>
// <button type="button" onClick={() => handleRemove(row.ticker)}></button>
//