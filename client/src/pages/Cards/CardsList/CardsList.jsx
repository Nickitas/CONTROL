import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import { visuallyHidden } from '@mui/utils'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Card from '../Cards'
import CreationCardsModal from '../CreationCardsModal'
import { ChevronLeft } from '../../../svg.module'
import Btn from '../../../components/UI/buttons/Btn'
import ExtraBtn from '../../../components/UI/buttons/ExtraBtn'
import Input from '../../../components/UI/inputs/Input'
import Select from '../../../components/UI/selects/Select'
import classes from './cards_list.module.scss'

function createData(name, num, subunit, room, data_start, data_end, coment, num_link) {
    return { name, num, subunit, room, data_start, data_end, coment, num_link, };
  }

  const link = <ExtraBtn onClick={()=> {alert('TODO: Переадресация на карточку человека')}}>Ковалев:57612</ExtraBtn>
  
  const rows = [
    createData('Ковалев Артем Сергеевич', '57612', 'Отдел Магистратуры', '2-602', '11.11.2021', '11.11.2025', 'комментарий', link),
    createData('Ковалев Артем Сергеевич', '57612', 'Отдел Магистратуры', '2-602', '11.11.2021', '11.11.2025', 'комментарий', link),
    createData('Ковалев Артем Сергеевич', '57612', 'Отдел Магистратуры', '2-602', '11.11.2021', '11.11.2025', 'комментарий', link),
    createData('Ковалев Артем Сергеевич', '57612', 'Отдел Магистратуры', '2-602', '11.11.2021', '11.11.2025', 'комментарий', link),
    createData('Ковалев Артем Сергеевич', '57612', 'Отдел Магистратуры', '2-602', '11.11.2021', '11.11.2025', 'комментарий', link),
    createData('Ковалев Артем Сергеевич', '57612', 'Отдел Магистратуры', '2-602', '11.11.2021', '11.11.2025', 'комментарий', link),
    createData('Ковалев Артем Сергеевич', '57612', 'Отдел Магистратуры', '2-602', '11.11.2021', '11.11.2025', 'комментарий', link),
    createData('Ковалев Артем Сергеевич', '57612', 'Отдел Магистратуры', '2-602', '11.11.2021', '11.11.2025', 'комментарий', link),
  ];
  
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
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Ф.И.О.',
    },
    {
        id: 'num',
        numeric: false,
        disablePadding: true,
        label: '№',
    },
    {
      id: 'subunit',
      numeric: true,
      disablePadding: false,
      label: 'Подразделение',
    },
    {
      id: 'room',
      numeric: true,
      disablePadding: false,
      label: 'Комната',
    },
    {
      id: 'data_start',
      numeric: true,
      disablePadding: false,
      label: 'Дата начала пропуска',
    },
    {
      id: 'data_end',
      numeric: true,
      disablePadding: false,
      label: 'Дата окончания пропуска',
    },
    {
      id: 'coment',
      numeric: true,
      disablePadding: false,
      label: 'Комментарий',
    },
    {
      id: 'num_link',
      numeric: true,
      disablePadding: false,
      label: 'Номер заявки',
    },
  ];
  
  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;
  
    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            Выбрано: {numSelected}
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
          <div className={classes.table_info}>
            <p>
              <span>Создано: <b>58</b> / <b>22</b>.</span>
              <span>Выполнено: <b>58</b> / <b>22</b>.</span>
              <span>Ожидаются: <b>58</b> / <b>22</b>.</span>
            </p>
              <ExtraBtn onClick={() => {alert('TODO: Формирует модальное окно с выгруженными данными')}}>  
                <span><box-icon name='receipt' type='solid' color='#fff'></box-icon></span>
                Отчет
              </ExtraBtn>
            </div>
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Удалить">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Фильтрация">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  

const CardsList = ({ success, isAuth }) => {

    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('subunit')
    const [selected, setSelected] = useState([])
    const [page, setPage] = useState(0)
    const [dense, setDense] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [back, setBack] = useState(false)
    const [visibleCreationCards, setVisibleCreationCards] = useState(false)

    
  
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
    }
  
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
  
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  

    if(back) {
      return <Card />
    }
    else {
      return (
        <section className={classes.cards_list}>
          <div className='container'>
            <div className={classes.breadcrumb} onClick={() => setBack(true)}><ChevronLeft/>Назад</div>
            <div className={classes.row}>
              <h2 className={classes.title}>Список заявок</h2>
              <ExtraBtn onClick={() => { setVisibleCreationCards(true) }}>
                <span><box-icon name='bookmark-plus' color='#fff'></box-icon></span>
                Создание заявик
              </ExtraBtn>
            </div>
  
            <div className={classes.row} style={{flexWrap:'wrap-reverse'}} >
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Поиск по таблице</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={classes.search_panel}>
                    <div className={classes.search_input}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#848484" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                      </svg>
                      <Input placeholder='Поле поиска...'/>
                    </div>
                    <Select defultValue={'Поиск по...'}
                      options={[
                          {value:'fio', name:'По Ф.И.О.'},
                          {value:'num', name:'По номеру'}
                      ]}
                    /> 
                    <Btn onClick={() => {alert('TODO: Отобразить выбранную категорию в таблице')}}>
                      Показать
                    </Btn>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
            
            <div className={classes.table_wrapp}>
              <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                  <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                      <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                      >
                        <EnhancedTableHead
                          numSelected={selected.length}
                          order={order}
                          orderBy={orderBy}
                          onSelectAllClick={handleSelectAllClick}
                          onRequestSort={handleRequestSort}
                          rowCount={rows.length}
                        />
                        <TableBody>
                          {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                              const isItemSelected = isSelected(row.name);
                              const labelId = `enhanced-table-checkbox-${index}`;
                              return (
                                <TableRow
                                  hover
                                  onClick={(event) => handleClick(event, row.name)}
                                  role="checkbox"
                                  aria-checked={isItemSelected}
                                  tabIndex={-1}
                                  key={row.name}
                                  selected={isItemSelected}
                                >
                                  <TableCell padding="checkbox">
                                    <Checkbox
                                      color="primary"
                                      checked={isItemSelected}
                                      inputProps={{'aria-labelledby': labelId,}}
                                    />
                                    </TableCell>
                                      <TableCell
                                        component="th"
                                        id={labelId}
                                        scope="row"
                                        padding="none"
                                      >
                                        {row.name}
                                    </TableCell>
                                      <TableCell >{row.num}</TableCell>
                                      <TableCell >{row.subunit}</TableCell>
                                      <TableCell >{row.room}</TableCell>
                                      <TableCell >{row.data_start}</TableCell>
                                      <TableCell >{row.data_end}</TableCell>
                                      <TableCell >{row.coment}</TableCell>
                                      <TableCell >{row.num_link}</TableCell>
                                    </TableRow>
                                      )
                                  })}
                                  {emptyRows > 0 && (
                                    <TableRow style={{height: (dense ? 33 : 53) * emptyRows,}}>
                                      <TableCell colSpan={6} />
                                </TableRow>
                              )}
                              </TableBody>
                        </Table>
                      </TableContainer>
                      <div style={{padding:'0 20px', display:'flex', alignContent:'center', justifyContent:'space-around'}}>
                        <FormControlLabel
                          control={<Switch checked={dense} onChange={handleChangeDense} />}
                          label="Ужать"
                        />
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={rows.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                      </div>
                </Paper>
              </Box>
            </div>
          </div>

          { visibleCreationCards && (
            <CreationCardsModal 
              setVisibleCreationCards={setVisibleCreationCards}
            />
          )}

        </section>
    )
  }
}

export default CardsList