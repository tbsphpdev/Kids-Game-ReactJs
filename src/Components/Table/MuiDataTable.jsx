import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import MedalPosition1 from '../../assets/img/MedalPosition1.svg'
import MedalPosition2 from '../../assets/img/MedalPosition2.svg'
import MedalPosition3 from '../../assets/img/MedalPosition3.svg'

import '../style.css'
import { useTranslation } from 'react-i18next';
// import DeleteIcon from '@material-ui/icons/Delete';
// import FilterListIcon from '@material-ui/icons/FilterList';

function createData(name, qAttempt, marks) {
  return { name, qAttempt, marks };
}




function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}



function EnhancedTableHead(props) {

  const tableClasses = useStyles()

  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, headCells, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };


  return (
    <TableHead className = {clsx(classes.tableHead)}>
      <TableRow>
      <TableCell padding="checkbox"  className = "pl-3">
        <p className = "mt-3 text-white font12 ">Sr.</p>
      </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            
            sortDirection={orderBy === headCell.id ? order : false}
            className = {clsx(classes.tableHead)}
          >
            <TableSortLabel
              // active={true} //orderBy === headCell.id
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {/* {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null} */}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
   background:'#313757',
   color: "white"
  },
    // theme.palette.type === 'light'
    //   ? {
    //       color: theme.palette.secondary.main,
    //       backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    //     }
    //   : {
    //       color: theme.palette.text.primary,
    //       backgroundColor: theme.palette.secondary.dark,
    //     },
  title: {
    flex: '1 1 100%',
  }
 
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={classes.highlight}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title +' text-uppercase'} variant="h6" id="tableTitle" component="div">
          {props.title}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            {/* <DeleteIcon /> */}
            Delete
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            {/* <FilterListIcon /> */}
            
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    border: 'white solid 1px'
  },
  tableContainer:{
    padding:'0 2em',
    background:'#313757'
  },
  table: {
    minWidth: 550,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }, 
  tableHead: {
    background: "#272c45",
    color: "white",
    textAlign:"left",
    fontSize: '12px',
    padding: '6px 0'
},
tableRow:{
  background:"#454B67",
  color: "white"
},
tableFooter: {
  background:'#313757',
  color:"white",
  fontWeight:400
}
}));

export default function MuiDataTable({...props}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const [t] = useTranslation()
  // const createSortHandler = (property) => (event) => {
  //   handleRequestSort(event, property);
  // };

  // setRowsPerPage(props.data.length>15?15:props.data.length)

  // useEffect(() => {
  //   if(props.data)
  //   {
  //     setRowsPerPage(props.data.length>15?15:props.data.length)
  //   }
  // }, [props.data])

  var marksArr = []

  const rows = props.data.map((obj)=>{
      marksArr.push(obj.winningPoint)
      return createData(obj.username, obj.totalAttampt, obj.winningPoint+"%")
  })

  marksArr.sort((a,b)=>{return b-a});
  
  const headCells = [
    { id: 'name', numeric: false, disablePadding: true, label: t('form.label.name') },
    { id: 'qAttempt', numeric: true, disablePadding: false, label: t('component.label.questionsAttempt') },
    { id: 'marks ', numeric: true, disablePadding: false, label:t('component.label.marks')  },
    { id: 'result', numeric: true, disablePadding: false, label:t('component.label.result')  }
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar title = {props.title} numSelected={selected.length} />
        <TableContainer className = {classes.tableContainer}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells = {headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  // if(index==rows.length-1)
                  // {
                  //   setTimeout(() => {
                  //     createSortHandler(row.marks)
                  //   }, 1000);
                  // }
                  console.log(marksArr)

                  return (
                    <TableRow className = {classes.tableRow}
                      hover
                    //   onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox" className = "pl-3 text-white text-left " style = {{width: "4.5em"}}>
                       <h6 className = "mt-2 font12 font-roboto-regular ">{index+1} &nbsp; {<span><img src = {index==0?MedalPosition1:index==1? MedalPosition2: index==2?MedalPosition3:""} alt ="medal" className = {`h-25 ${index<3?"":"d-none"}`}></img></span>}</h6>
                      
                      </TableCell> */}
                      <TableCell padding="checkbox" className = "pl-3 text-white text-left " style = {{width: "4.5em"}}>
                       <h6 className = "mt-2 font12 font-roboto-regular ">{index+1} &nbsp; {<span><img src = {parseInt(row.marks)>75?(marksArr[0] == parseInt(row.marks)?MedalPosition1:marksArr[1]==parseInt(row.marks)? MedalPosition2: marksArr[2]==parseInt(row.marks)?MedalPosition3:""):""} alt ="medal" className = {`h-25 ${parseInt(row.marks)>75&&(parseInt(row.marks)==marksArr[0] || parseInt(row.marks)==marksArr[1] || parseInt(row.marks)==marksArr[2]) ?"":"d-none"}`}></img></span>}</h6>
                      
                      </TableCell>
                      <TableCell  className = "text-white p-0 text-left font12 font-roboto-regular" align="center" component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell  className = "text-white p-0 text-left font12 font-roboto-regular" align="center">{row.qAttempt}</TableCell>
                      <TableCell  className = "text-white p-0 text-left font12 font-roboto-regular" align="center">{row.marks}</TableCell>
                      <TableCell  className = "text-white p-0 text-left font12 font-roboto-regular" align="center">{row.marks>75?t('component.label.won'):t('component.label.lost')}</TableCell>
                    </TableRow>
                  );
                   })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6}  className = "border-0"/>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[15, 30, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage = {t(`component.label.rowsperPage`)}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className = {classes.tableFooter}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </div>
  );
}


