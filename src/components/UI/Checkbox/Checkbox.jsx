import classes from './checkbox.module.scss'

const Checkbox = ({ onChange, checked, ...props }) => {

  return (<>
    <div className={classes.checkbox_wrapper}>
      <input {...props}
        id={props.id}
        className={checked ? 'checked' : ''}
        type='checkbox' 
        checked={checked} 
        onChange={onChange}
      />
      <label htmlFor={props.id}>{ props.label }</label>
    </div>
    <span>{ checked ? 'Выбрано' : 'Не выбрано'}</span>
  </>)
}

export { Checkbox }