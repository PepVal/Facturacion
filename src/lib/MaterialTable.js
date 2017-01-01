import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow,
  TableRowColumn} from 'material-ui/Table';
import PaperContainer from './PaperContainer'
import IconTextFieldRow from './formTable/IconTextFieldRow'
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Clear from 'material-ui/svg-icons/content/clear';
import Search from 'material-ui/svg-icons/action/search';

const black54p = '#757575'

const ButtonsColumn = (index, onEditItem, onDeleteItem) => {
  const iconStyle = {
    display: 'inline-block',
  }

  let editCol = null
  let deleteCol = null
  if (onDeleteItem) {
    deleteCol =
      <IconButton style={iconStyle} onTouchTap={() => onDeleteItem(index)}>
        <Clear color={black54p}/>
      </IconButton>
  }
  if (onEditItem) {
    editCol =
      <IconButton style={iconStyle} onTouchTap={() => onEditItem(index)}>
        <ModeEdit color={black54p}/>
      </IconButton>
  }

  let buttons = null
  if (editCol || deleteCol) {
    buttons =
      <TableRowColumn>
        <div>
          {editCol}
          {deleteCol}
        </div>
      </TableRowColumn>
  }

  return buttons
}

const SearchBox = (hint, requestFunc) => {
  const inlineStyle = {
    display: 'inline-block',
  }

  const input = {
    icon: Search,
    hintText: hint,
    onChange: requestFunc,
  }

  const tableStyle = {
    width: 'auto',
    marginLeft: 'auto',
    marginRight: '0px',
  }

  return (
    <table style={tableStyle}>
      <tbody >
        <IconTextFieldRow leftInput={input} inverted={true}/>
      </tbody>
    </table>
  )
}

export default class MaterialTable extends React.Component {

  render() {


    const {
      columns,
      enableCheckbox,
      keys,
      onEditItem,
      onDeleteItem,
      rows,
      searchHint,
    } = this.props

    if (onEditItem || onDeleteItem)
      columns.push('')

    return (
      <div style={{height:'100%', overflow:'auto'}} >
        <PaperContainer padding={'15px'}>
          { SearchBox(searchHint) }
          <Table selectable={enableCheckbox}>
             <TableHeader displaySelectAll={enableCheckbox}
               adjustForCheckbox={enableCheckbox}>
               <TableRow>
                 { columns.map((colName, i) => {
                   return <TableHeaderColumn key={i}>{colName}</TableHeaderColumn>
                 })}
              </TableRow>
             </TableHeader>
             <TableBody displayRowCheckbox={enableCheckbox}>
              {
                rows.map((item, i) => {
                  const row = rows[i]
                  return (
                  <TableRow key={i}>
                    { keys.map((propName, j) => {
                      return <TableRowColumn key={j}>{row[propName]}</TableRowColumn>
                    })}
                    { ButtonsColumn(i, onEditItem, onDeleteItem) }
                  </TableRow>
                )
                })
              }
              </TableBody>
          </Table>
        </PaperContainer>
      </div>
    )
  }
}