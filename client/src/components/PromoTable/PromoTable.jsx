import * as React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Modal,
  FormControlLabel,
  Switch,
  Collapse,
} from "@mui/material";

import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";

import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  FilterList as FilterListIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";

import { deleteMenuItem } from "../../services/menuItemService";
import UpdateMenuItemForm from "../UpdateMenuItemForm/UpdateMenuItemForm";

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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
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
    id: "promoId",
    numeric: false,
    disablePadding: true,
    label: "Promo ID",
  },
  {
    id: "promoCode",
    numeric: false,
    disablePadding: false,
    label: "Code",
  },

  {
    id: "discount",
    numeric: true,
    disablePadding: false,
    label: "Discount",
  },
  {
    id: "maxUses",
    numeric: true,
    disablePadding: false,
    label: "Max Uses",
  },
  {
    id: "usesRemaining",
    numeric: true,
    disablePadding: false,
    label: "Uses Remaining",
  },
  {
    id: "active",
    numeric: false,
    disablePadding: false,
    label: "Active",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Created At",
  },
  {
    id: "updatedAt",
    numeric: false,
    disablePadding: false,
    label: "Updated At",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
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
              "aria-label": "select all menu items",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EditModal = ({ open, handleClose, selectedMenuItemId }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "33vw",
    height: "70vh",
    bgcolor: "#F5DEB3",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <UpdateMenuItemForm selectedMenuItemId={selectedMenuItemId} />
      </Box>
    </Modal>
  );
};

function EnhancedTableToolbar(props) {
  const { numSelected, onDelete, selectedMenuItemId } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Menu Item
        </Typography>
      )}

      {numSelected === 1 ? (
        <Tooltip title="Actions">
          <Box display={"flex"}>
            <IconButton onClick={handleOpen}>
              <EditIcon />
            </IconButton>
            <EditModal
              open={open}
              handleClose={handleClose}
              selectedMenuItemId={selectedMenuItemId}
            />
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Tooltip>
      ) : numSelected > 1 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  selectedMenuItemId: PropTypes.string.isRequired,
};

const PromoTable = (props) => {
  const { rows, setRows } = props;
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.itemId);
      setSelected(newSelected);
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
        selected.slice(selectedIndex + 1)
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

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [rows, order, orderBy, page, rowsPerPage]
  );

  const handleDelete = () => {
    selected.forEach(async (itemId) => {
      const response = await deleteMenuItem(itemId);
      if (response.success) {
        setRows((prevRows) => prevRows.filter((row) => row.itemId !== itemId));
      }
    });
    setSelected([]);
  };

  const Row = (props) => {
    const { row, index } = props;
    const [open, setOpen] = React.useState(false);
    const isItemSelected = isSelected(row.promoId);
    const labelId = `enhanced-table-checkbox-${index}`;
    return (
      <React.Fragment>
        <TableRow
          hover
          onClick={(event) => handleClick(event, row.promoId)}
          role="checkbox"
          aria-checked={isItemSelected}
          tabIndex={-1}
          key={row.promoId}
          selected={isItemSelected}
          sx={{ "& > *": { borderBottom: "unset" }, cursor: "pointer" }}
        >
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              checked={isItemSelected}
              inputProps={{
                "aria-labelledby": labelId,
              }}
            />
          </TableCell>
          <TableCell component="th" id={labelId} scope="row" padding="none">
            {row.promoId}
          </TableCell>
          <TableCell align="left">{row.promoCode}</TableCell>
          <TableCell align="right">
            {row.discountType === "Percentage"
              ? row.discountValue + "% OFF"
              : "$" + row.discountValue + " OFF"}
          </TableCell>
          <TableCell align="right">{row.maxUses}</TableCell>
          <TableCell align="right">{row.usesRemaining}</TableCell>
          <TableCell align="left">
            {row.active === true ? "active" : "inactive"}
          </TableCell>
          <TableCell align="left">{row.createdAt}</TableCell>
          <TableCell align="left">{row.updatedAt}</TableCell>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                setOpen(!open);
              }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Promotion Conditions
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">Specific Products</TableCell>
                      <TableCell align="left">Specific Categories</TableCell>
                      <TableCell align="left">Specific Users</TableCell>
                      <TableCell align="right">
                        Minimum Order Amount ($)
                      </TableCell>
                      <TableCell align="right">Limited Time</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={index}>
                      <TableCell component="th" scope="row" align="left">
                        {row.applicableTo.specificProducts &&
                        row.applicableTo.specificProducts.length > 0
                          ? row.applicableTo.specificProducts.map(
                              (productName) => {
                                return productName + ", ";
                              }
                            )
                          : "None"}
                      </TableCell>
                      <TableCell component="th" scope="row" align="left">
                        {row.applicableTo.specificCategories &&
                        row.applicableTo.specificCategories.length > 0
                          ? row.applicableTo.specificCategories
                          : "None"}
                      </TableCell>
                      <TableCell align="left">
                        {row.applicableTo.specificUser &&
                        row.applicableTo.specificUser.length > 0
                          ? row.applicableTo.specificUser.map((user) => {
                              return user;
                            })
                          : "None"}
                      </TableCell>
                      <TableCell align="right">
                        {row.applicableTo.minOrderAmount}
                      </TableCell>
                      <TableCell align="right">
                        {row.applicableTo.limitedTimeOffer &&
                        row.applicableTo.limitedTimeOffer.startDate &&
                        row.applicableTo.limitedTimeOffer.endDate
                          ? row.applicableTo.limitedTimeOffer.startDate
                          : "Unlimited Time Offer"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          onDelete={handleDelete}
          selectedMenuItemId={selected[0] ? selected[0] : ""}
          promoList
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
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
              {visibleRows.map((row, index) => (
                <Row key={index} row={row} index={index} />
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default PromoTable;
